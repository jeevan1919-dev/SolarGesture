export type PlanetId = 
  | 'sun'
  | 'mercury'
  | 'venus'
  | 'earth'
  | 'mars'
  | 'jupiter'
  | 'saturn'
  | 'uranus'
  | 'neptune';

export interface PlanetData {
  id: PlanetId;
  name: string;
  tagline: string;
  category: 'Star' | 'Terrestrial Planet' | 'Gas Giant' | 'Ice Giant';
  color: string;
  glowColor: string;
  accentColor: string;
  radius: number; // visual scale in Three.js units
  actualRadiusKm: number;
  orbitDistance: number; // visual scale
  actualDistanceKm: number; // million km from Sun
  orbitPeriodDays: number;
  rotationPeriodHours: number;
  orbitalSpeed: number; // visual animation speed multiplier
  rotationSpeed: number; // visual spin speed
  axialTiltDeg: number; // tilt in degrees
  temperatureAvgC: number;
  gravityMps2: number;
  moonsCount: number;
  atmosphere: string[];
  description: string;
  geology: string;
  funFacts: string[];
  hasRings?: boolean;
  ringsRadiusInner?: number;
  ringsRadiusOuter?: number;
  ringColor?: string;
  hasMoons?: boolean;
}

export type GestureType = 
  | 'NONE'
  | 'OPEN_PALM'    // Pause/Resume orbit
  | 'PINCH'        // Select / Click focused object
  | 'POINTING'     // Point & Pan camera
  | 'FIST'         // Drag-rotate or brake
  | 'PEACE'        // Reset camera to overview
  | 'THUMBS_UP'    // Zoom In
  | 'THUMBS_DOWN'  // Zoom Out
  | 'TWO_HAND_ZOOM';

export type TrackingStatus = 
  | 'idle'
  | 'loading_model'
  | 'requesting_permission'
  | 'tracking'
  | 'no_hand'
  | 'permission_denied'
  | 'error';

export interface NormalizedLandmark {
  x: number;
  y: number;
  z: number;
}

export interface HandGestureState {
  gesture: GestureType;
  confidence: number;
  rawPosition: { x: number; y: number; z: number } | null;
  smoothedPosition: { x: number; y: number; z: number } | null;
  delta: { x: number; y: number };
  pinchDistance: number;
  isPinching: boolean;
  palmNormal: { x: number; y: number; z: number };
  detectedAt: number;
  handedness: 'Left' | 'Right' | 'Unknown';
}

export interface CameraControlCommand {
  type: 'rotate' | 'zoom' | 'pan' | 'reset' | 'focus';
  deltaX?: number;
  deltaY?: number;
  zoomFactor?: number;
  targetPlanet?: PlanetId | null;
}
