import { FilesetResolver, HandLandmarker } from '@mediapipe/tasks-vision';
import type { NormalizedLandmark } from '../types/solar';

export class HandTrackerService {
  private handLandmarker: HandLandmarker | null = null;
  private isInitializing: boolean = false;

  public async initialize(): Promise<HandLandmarker> {
    if (this.handLandmarker) return this.handLandmarker;
    if (this.isInitializing) {
      while (this.isInitializing) {
        await new Promise((resolve) => setTimeout(resolve, 50));
      }
      if (this.handLandmarker) return this.handLandmarker;
    }

    this.isInitializing = true;

    try {
      // 1. Try local wasm first, fallback to CDN
      let vision;
      try {
        vision = await FilesetResolver.forVisionTasks('/wasm');
      } catch {
        vision = await FilesetResolver.forVisionTasks(
          'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.18/wasm'
        );
      }

      // 2. Try local model first, fallback to Google CDN
      const modelAssetPath = '/models/hand_landmarker.task';
      const cdnModelAssetPath =
        'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task';

      try {
        this.handLandmarker = await HandLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath,
            delegate: 'GPU'
          },
          runningMode: 'VIDEO',
          numHands: 1,
          minHandDetectionConfidence: 0.6,
          minHandPresenceConfidence: 0.6,
          minTrackingConfidence: 0.6
        });
      } catch {
        // Fallback to CPU or CDN
        this.handLandmarker = await HandLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: cdnModelAssetPath,
            delegate: 'CPU'
          },
          runningMode: 'VIDEO',
          numHands: 1,
          minHandDetectionConfidence: 0.5,
          minHandPresenceConfidence: 0.5,
          minTrackingConfidence: 0.5
        });
      }

      return this.handLandmarker;
    } finally {
      this.isInitializing = false;
    }
  }

  public detectVideo(video: HTMLVideoElement, timestamp: number) {
    if (!this.handLandmarker || video.readyState < 2) return null;
    try {
      return this.handLandmarker.detectForVideo(video, timestamp);
    } catch {
      return null;
    }
  }

  public dispose() {
    if (this.handLandmarker) {
      this.handLandmarker.close();
      this.handLandmarker = null;
    }
  }
}

export const handTrackerService = new HandTrackerService();

/**
 * Draws hand landmarks & skeleton connections onto a 2D canvas overlay
 */
export const HAND_CONNECTIONS = [
  [0, 1], [1, 2], [2, 3], [3, 4],       // Thumb
  [0, 5], [5, 6], [6, 7], [7, 8],       // Index
  [5, 9], [9, 10], [10, 11], [11, 12],  // Middle
  [9, 13], [13, 14], [14, 15], [15, 16],// Ring
  [13, 17], [17, 18], [18, 19], [19, 20],// Pinky
  [0, 17]                               // Palm base
];

export function drawHandSkeleton(
  ctx: CanvasRenderingContext2D,
  landmarks: NormalizedLandmark[],
  width: number,
  height: number,
  accentColor: string = '#00F0FF'
) {
  ctx.save();
  ctx.clearRect(0, 0, width, height);

  const toScreen = (lm: NormalizedLandmark) => ({
    x: (1 - lm.x) * width,
    y: lm.y * height
  });

  // 1. Draw glowing bones
  ctx.strokeStyle = accentColor;
  ctx.lineWidth = 3;
  ctx.shadowColor = accentColor;
  ctx.shadowBlur = 8;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  for (const [startIdx, endIdx] of HAND_CONNECTIONS) {
    const start = toScreen(landmarks[startIdx]);
    const end = toScreen(landmarks[endIdx]);
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
  }

  // 2. Draw joints
  for (let i = 0; i < landmarks.length; i++) {
    const pt = toScreen(landmarks[i]);
    const isTip = [4, 8, 12, 16, 20].includes(i);
    const radius = isTip ? 6 : 4;

    ctx.beginPath();
    ctx.arc(pt.x, pt.y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = isTip ? '#48E5C2' : '#FFFFFF';
    ctx.shadowColor = isTip ? '#48E5C2' : '#FFFFFF';
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = '#060B1E';
    ctx.stroke();
  }

  ctx.restore();
}
