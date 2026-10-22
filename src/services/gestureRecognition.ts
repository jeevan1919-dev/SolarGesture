import type { GestureType, NormalizedLandmark } from '../types/solar';

export interface GestureRecognitionResult {
  gesture: GestureType;
  confidence: number;
  pinchDistance: number;
  isPinching: boolean;
  palmCenter: { x: number; y: number; z: number };
}

/**
 * Euclidean distance between two 3D landmarks
 */
export function euclideanDistance(a: NormalizedLandmark, b: NormalizedLandmark): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  const dz = (a.z || 0) - (b.z || 0);
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

/**
 * Recognizes hand gestures from 21 MediaPipe hand landmarks.
 * Inverts X coordinate for mirrored webcam UX (moving hand right rotates camera right).
 */
export function recognizeGesture(landmarks: NormalizedLandmark[]): GestureRecognitionResult {
  if (!landmarks || landmarks.length < 21) {
    return {
      gesture: 'NONE',
      confidence: 0,
      pinchDistance: 1,
      isPinching: false,
      palmCenter: { x: 0.5, y: 0.5, z: 0 }
    };
  }

  const wrist = landmarks[0];
  const thumbMcp = landmarks[2];
  const thumbTip = landmarks[4];
  const indexMcp = landmarks[5];
  const indexPip = landmarks[6];
  const indexTip = landmarks[8];
  const middleMcp = landmarks[9];
  const middlePip = landmarks[10];
  const middleTip = landmarks[12];
  const ringMcp = landmarks[13];
  const ringPip = landmarks[14];
  const ringTip = landmarks[16];
  const pinkyMcp = landmarks[17];
  const pinkyPip = landmarks[18];
  const pinkyTip = landmarks[20];

  // Palm size metric (Wrist to Middle MCP distance)
  const palmScale = Math.max(euclideanDistance(wrist, middleMcp), 0.05);

  // Palm Center (midpoint between wrist, index MCP, and pinky MCP)
  const palmCenter = {
    x: (wrist.x + indexMcp.x + pinkyMcp.x) / 3,
    y: (wrist.y + indexMcp.y + pinkyMcp.y) / 3,
    z: (wrist.z + indexMcp.z + pinkyMcp.z) / 3
  };

  // Pinch distance normalized by palm size
  const rawPinchDist = euclideanDistance(thumbTip, indexTip);
  const normalizedPinchDist = rawPinchDist / palmScale;
  const isPinching = normalizedPinchDist < 0.32;

  // Finger extension checks relative to wrist distance
  const isExtended = (tip: NormalizedLandmark, pip: NormalizedLandmark) => {
    return euclideanDistance(tip, wrist) > euclideanDistance(pip, wrist) * 1.15;
  };

  const isCurled = (tip: NormalizedLandmark, pip: NormalizedLandmark, mcp: NormalizedLandmark) => {
    const tipToWrist = euclideanDistance(tip, wrist);
    const mcpToWrist = euclideanDistance(mcp, wrist);
    return tipToWrist < mcpToWrist * 1.25 || tip.y > pip.y;
  };

  const indexExtended = isExtended(indexTip, indexPip);
  const middleExtended = isExtended(middleTip, middlePip);
  const ringExtended = isExtended(ringTip, ringPip);
  const pinkyExtended = isExtended(pinkyTip, pinkyPip);

  const indexCurled = isCurled(indexTip, indexPip, indexMcp);
  const middleCurled = isCurled(middleTip, middlePip, middleMcp);
  const ringCurled = isCurled(ringTip, ringPip, ringMcp);
  const pinkyCurled = isCurled(pinkyTip, pinkyPip, pinkyMcp);

  // Thumb extension
  const thumbExtended = euclideanDistance(thumbTip, pinkyMcp) > palmScale * 1.05;

  let gesture: GestureType = 'NONE';
  let confidence = 0.5;

  // 1. PINCH Gesture (Highest priority for selection)
  if (isPinching) {
    gesture = 'PINCH';
    confidence = Math.min(1, Math.max(0.6, 1 - normalizedPinchDist / 0.35));
  }
  // 2. PEACE / VICTORY Gesture (Index + Middle extended, Ring + Pinky curled) -> Reset Camera
  else if (indexExtended && middleExtended && ringCurled && pinkyCurled) {
    gesture = 'PEACE';
    confidence = 0.92;
  }
  // 3. THUMBS UP (Thumb pointed up, all 4 fingers curled) -> Zoom In
  else if (
    thumbTip.y < thumbMcp.y - 0.05 &&
    thumbTip.y < indexMcp.y &&
    indexCurled &&
    middleCurled &&
    ringCurled &&
    pinkyCurled
  ) {
    gesture = 'THUMBS_UP';
    confidence = 0.88;
  }
  // 4. THUMBS DOWN (Thumb pointed down, all 4 fingers curled) -> Zoom Out
  else if (
    thumbTip.y > thumbMcp.y + 0.05 &&
    thumbTip.y > wrist.y &&
    indexCurled &&
    middleCurled &&
    ringCurled &&
    pinkyCurled
  ) {
    gesture = 'THUMBS_DOWN';
    confidence = 0.88;
  }
  // 5. POINTING Gesture (Only Index extended, others curled) -> Directional Navigation / Pan
  else if (indexExtended && middleCurled && ringCurled && pinkyCurled) {
    gesture = 'POINTING';
    confidence = 0.9;
  }
  // 6. FIST (All fingers curled) -> Brake / Drag Rotate
  else if (!indexExtended && !middleExtended && !ringExtended && !pinkyExtended && !thumbExtended) {
    gesture = 'FIST';
    confidence = 0.85;
  }
  // 7. OPEN PALM (All 5 fingers extended & spread) -> Pause / Resume
  else if (indexExtended && middleExtended && ringExtended && pinkyExtended) {
    gesture = 'OPEN_PALM';
    confidence = 0.95;
  }

  return {
    gesture,
    confidence,
    pinchDistance: normalizedPinchDist,
    isPinching,
    palmCenter
  };
}
