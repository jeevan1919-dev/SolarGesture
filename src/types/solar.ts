export type PlanetId = 
  | 'sun'
  | 'mercury'
  | 'venus'
  | 'earth'
  | 'mars'
  | 'jupiter'
  | 'saturn'
  | 'uranus'
  | 'neptune'
  // Exoplanet Multiverse IDs
  | 'trappist1e'
  | 'kepler452b'
  | 'cancri55e'
  | 'hd189733b'
  | 'proximab';

export type UniverseId = 'prime' | 'cyberpunk' | 'inferno' | 'cryo' | 'exoplanets';

export interface UniverseTheme {
  id: UniverseId;
  name: string;
  subtitle: string;
  description: string;
  badge: string;
  starColor: string;
  starGlow: string;
  ambientLightColor: string;
  ambientIntensity: number;
  spaceBackgroundColor: string;
  orbitLineColor: string;
  hudAccentColor: string;
  warpEffectColor: string;
}

export interface MoonInfo {
  name: string;
  diameterKm: number;
  orbitalPeriodDays: number;
  highlight: string;
}

export interface SpaceMission {
  name: string;
  agency: string;
  year: string;
  achievement: string;
}

export interface PlanetData {
  id: PlanetId;
  name: string;
  glyph: string; // Astronomical symbol e.g. ☉, ☿, ♀, ⊕, ♂, ♃, ♄, ♅, ♆
  tagline: string;
  category: 'Star' | 'Terrestrial Planet' | 'Gas Giant' | 'Ice Giant' | 'Exoplanet' | 'Super-Earth' | 'Lava Planet';
  color: string;
  glowColor: string;
  accentColor: string;
  surfaceType: 'sun' | 'rocky' | 'cloudy' | 'earth' | 'mars' | 'gas_bands' | 'saturn_bands' | 'ice_blue' | 'deep_blue' | 'lava' | 'crystal';
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
  escapeVelocityKps: number;
  atmosphericPressure: string;
  surfaceAreaMillionKm2: number;
  moonsCount: number;
  atmosphere: string[];
  description: string;
  geology: string;
  habitability: {
    score: number; // 0 to 100
    verdict: string;
    details: string;
  };
  moonsList?: MoonInfo[];
  missions?: SpaceMission[];
  funFacts: string[];
  hasRings?: boolean;
  ringsRadiusInner?: number;
  ringsRadiusOuter?: number;
  ringColor?: string;
  hasMoons?: boolean;
  hasClouds?: boolean;
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
