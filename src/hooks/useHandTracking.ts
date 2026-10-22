import { useEffect, useRef, useState, useCallback } from 'react';
import { handTrackerService, drawHandSkeleton } from '../services/handTracker';
import { recognizeGesture } from '../services/gestureRecognition';
import type { GestureType, HandGestureState, NormalizedLandmark, TrackingStatus } from '../types/solar';

interface UseHandTrackingOptions {
  enabled: boolean;
  onGestureAction?: (gesture: GestureType) => void;
}

export function useHandTracking({ enabled, onGestureAction }: UseHandTrackingOptions) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const [status, setStatus] = useState<TrackingStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fps, setFps] = useState<number>(0);
  const [landmarks, setLandmarks] = useState<NormalizedLandmark[] | null>(null);

  // Gesture state with smoothing
  const [gestureState, setGestureState] = useState<HandGestureState>({
    gesture: 'NONE',
    confidence: 0,
    rawPosition: null,
    smoothedPosition: null,
    delta: { x: 0, y: 0 },
    pinchDistance: 1,
    isPinching: false,
    palmNormal: { x: 0, y: 0, z: 1 },
    detectedAt: 0,
    handedness: 'Unknown'
  });

  // Smoothing & Cooldown refs
  const prevSmoothedPos = useRef<{ x: number; y: number } | null>(null);
  const lastActionTime = useRef<number>(0);
  const recentGestures = useRef<GestureType[]>([]);
  const frameCount = useRef<number>(0);
  const lastFpsTime = useRef<number>(performance.now());

  // Start webcam stream
  const startCamera = useCallback(async () => {
    try {
      setStatus('requesting_permission');
      setErrorMessage(null);

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Webcam access is not supported by your browser.');
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user'
        },
        audio: false
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await new Promise<void>((resolve) => {
          if (!videoRef.current) return resolve();
          videoRef.current.onloadedmetadata = () => {
            videoRef.current?.play().then(() => resolve()).catch(() => resolve());
          };
        });
      }

      setStatus('loading_model');
      await handTrackerService.initialize();
      setStatus('tracking');
    } catch (err: unknown) {
      const error = err as Error;
      console.warn('Camera or MediaPipe initialization warning:', error);
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        setStatus('permission_denied');
        setErrorMessage('Webcam access was denied. You can still explore using mouse and keyboard!');
      } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
        setStatus('error');
        setErrorMessage('No camera found on your device. Mouse and keyboard controls are active.');
      } else {
        setStatus('error');
        setErrorMessage(error.message || 'Unable to start camera.');
      }
    }
  }, []);

  // Stop camera & tracking
  const stopCamera = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setStatus('idle');
    setLandmarks(null);
  }, []);

  // Detection loop
  useEffect(() => {
    if (!enabled) {
      stopCamera();
      return;
    }

    startCamera();

    return () => {
      stopCamera();
    };
  }, [enabled, startCamera, stopCamera]);

  useEffect(() => {
    if (status !== 'tracking') return;

    let isActive = true;

    const detectLoop = () => {
      if (!isActive) return;

      const video = videoRef.current;
      const canvas = canvasRef.current;

      if (video && video.readyState >= 2) {
        const now = performance.now();

        frameCount.current++;
        if (now - lastFpsTime.current >= 1000) {
          setFps(Math.round((frameCount.current * 1000) / (now - lastFpsTime.current)));
          frameCount.current = 0;
          lastFpsTime.current = now;
        }

        const result = handTrackerService.detectVideo(video, now);

        if (result && result.landmarks && result.landmarks.length > 0) {
          const rawLandmarks = result.landmarks[0] as NormalizedLandmark[];
          setLandmarks(rawLandmarks);

          if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
              drawHandSkeleton(ctx, rawLandmarks, canvas.width, canvas.height);
            }
          }

          const recognition = recognizeGesture(rawLandmarks);
          const rawPos = recognition.palmCenter;

          const mirroredRawX = 1 - rawPos.x;
          const mirroredRawY = rawPos.y;

          const alpha = 0.3;
          let smoothedX = mirroredRawX;
          let smoothedY = mirroredRawY;
          let deltaX = 0;
          let deltaY = 0;

          if (prevSmoothedPos.current) {
            smoothedX = alpha * mirroredRawX + (1 - alpha) * prevSmoothedPos.current.x;
            smoothedY = alpha * mirroredRawY + (1 - alpha) * prevSmoothedPos.current.y;
            deltaX = smoothedX - prevSmoothedPos.current.x;
            deltaY = smoothedY - prevSmoothedPos.current.y;
          }

          prevSmoothedPos.current = { x: smoothedX, y: smoothedY };

          recentGestures.current.push(recognition.gesture);
          if (recentGestures.current.length > 5) {
            recentGestures.current.shift();
          }

          const gestureCounts: Record<string, number> = {};
          recentGestures.current.forEach((g) => {
            gestureCounts[g] = (gestureCounts[g] || 0) + 1;
          });

          let dominantGesture = recognition.gesture;
          let maxCount = 0;
          for (const [g, count] of Object.entries(gestureCounts)) {
            if (count > maxCount) {
              maxCount = count;
              dominantGesture = g as GestureType;
            }
          }

          const timeSinceLastAction = now - lastActionTime.current;
          if (
            timeSinceLastAction > 600 &&
            maxCount >= 3 &&
            ['OPEN_PALM', 'PEACE', 'PINCH'].includes(dominantGesture)
          ) {
            lastActionTime.current = now;
            if (onGestureAction) {
              onGestureAction(dominantGesture);
            }
          }

          setGestureState({
            gesture: dominantGesture,
            confidence: recognition.confidence,
            rawPosition: { x: mirroredRawX, y: mirroredRawY, z: rawPos.z },
            smoothedPosition: { x: smoothedX, y: smoothedY, z: rawPos.z },
            delta: { x: deltaX, y: deltaY },
            pinchDistance: recognition.pinchDistance,
            isPinching: recognition.isPinching,
            palmNormal: { x: 0, y: 0, z: 1 },
            detectedAt: now,
            handedness: 'Right'
          });
        } else {
          setLandmarks(null);
          prevSmoothedPos.current = null;
          if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
          }
          setGestureState((prev) => ({
            ...prev,
            gesture: 'NONE',
            confidence: 0,
            delta: { x: 0, y: 0 }
          }));
        }
      }

      animationFrameRef.current = requestAnimationFrame(detectLoop);
    };

    animationFrameRef.current = requestAnimationFrame(detectLoop);

    return () => {
      isActive = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [status, onGestureAction]);

  return {
    videoRef,
    canvasRef,
    status,
    errorMessage,
    fps,
    landmarks,
    gestureState,
    startCamera,
    stopCamera
  };
}
