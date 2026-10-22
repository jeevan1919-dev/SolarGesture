import { useState, useCallback, useEffect } from 'react';
import type { PlanetData, GestureType } from './types/solar';
import { PLANETS_DATA } from './data/planets';
import { SolarCanvas } from './components/canvas/SolarCanvas';
import { useHandTracking } from './hooks/useHandTracking';
import { WebcamPip } from './components/ui/WebcamPip';
import { GestureIndicator } from './components/ui/GestureIndicator';
import { PlanetInfoPanel } from './components/ui/PlanetInfoPanel';
import { ControlBar } from './components/ui/ControlBar';
import { PlanetQuickBar } from './components/ui/PlanetQuickBar';
import { WelcomeModal } from './components/ui/WelcomeModal';
import { GestureGuideModal } from './components/ui/GestureGuideModal';
import { ScaleModal } from './components/ui/ScaleModal';
import { soundService } from './services/soundEffects';

export default function App() {
  // App state
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [showOrbits, setShowOrbits] = useState<boolean>(true);
  const [showLabels, setShowLabels] = useState<boolean>(true);
  const [showAsteroids, setShowAsteroids] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Modals & UI states
  const [showWelcome, setShowWelcome] = useState<boolean>(true);
  const [showGuide, setShowGuide] = useState<boolean>(false);
  const [showScaleModal, setShowScaleModal] = useState<boolean>(false);
  const [handTrackingEnabled, setHandTrackingEnabled] = useState<boolean>(false);

  // Handle discrete gesture triggers
  const handleGestureAction = useCallback(
    (gesture: GestureType) => {
      if (gesture === 'OPEN_PALM') {
        setIsPaused((prev) => {
          soundService.playToggle(!prev);
          return !prev;
        });
      } else if (gesture === 'PEACE') {
        soundService.playGestureTrigger();
        setSelectedPlanet(null);
      } else if (gesture === 'PINCH') {
        soundService.playGestureTrigger();
        // If not focused on a planet, focus on Earth as default or cycle
        setSelectedPlanet((prev) => {
          if (!prev) {
            const earth = PLANETS_DATA.find((p) => p.id === 'earth');
            return earth || null;
          }
          return prev;
        });
      }
    },
    []
  );

  // Hand tracking hook
  const {
    videoRef,
    canvasRef,
    status,
    errorMessage,
    fps,
    landmarks,
    gestureState,
    startCamera
  } = useHandTracking({
    enabled: handTrackingEnabled,
    onGestureAction: handleGestureAction
  });

  // Sound toggle handler
  const handleToggleSound = useCallback(() => {
    const muted = soundService.toggleMute();
    setIsMuted(muted);
  }, []);

  // Keyboard controls fallback
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in an input
      if (['input', 'textarea'].includes((e.target as HTMLElement).tagName.toLowerCase())) {
        return;
      }

      switch (e.code) {
        case 'Space':
          e.preventDefault();
          setIsPaused((prev) => {
            soundService.playToggle(!prev);
            return !prev;
          });
          break;
        case 'KeyR':
          soundService.playClick();
          setSelectedPlanet(null);
          break;
        case 'Escape':
          setSelectedPlanet(null);
          setShowGuide(false);
          setShowScaleModal(false);
          break;
        case 'KeyM':
          handleToggleSound();
          break;
        case 'KeyH':
          setHandTrackingEnabled((prev) => !prev);
          break;
        case 'KeyG':
          setShowGuide((prev) => !prev);
          break;
        // Numbers 1-9 to select planets directly
        case 'Digit1':
        case 'Digit2':
        case 'Digit3':
        case 'Digit4':
        case 'Digit5':
        case 'Digit6':
        case 'Digit7':
        case 'Digit8':
        case 'Digit9': {
          const index = parseInt(e.code.replace('Digit', ''), 10) - 1;
          if (PLANETS_DATA[index]) {
            soundService.playPlanetSelect();
            setSelectedPlanet(PLANETS_DATA[index]);
          }
          break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleToggleSound]);

  return (
    <div className="w-full h-full relative overflow-hidden bg-space-darkest text-slate-100 select-none">
      {/* 1. 3D WebGL Solar System Canvas */}
      <SolarCanvas
        selectedPlanet={selectedPlanet}
        onSelectPlanet={(planet) => {
          if (planet) {
            soundService.playPlanetSelect();
          }
          setSelectedPlanet(planet);
        }}
        isPaused={isPaused}
        speedMultiplier={speedMultiplier}
        showOrbits={showOrbits}
        showLabels={showLabels}
        showAsteroids={showAsteroids}
        gestureState={gestureState}
      />

      {/* 2. Top Quick Navigation Bar */}
      <PlanetQuickBar
        selectedPlanet={selectedPlanet}
        onSelectPlanet={setSelectedPlanet}
      />

      {/* 3. Webcam Preview PIP with live landmark skeleton */}
      <WebcamPip
        videoRef={videoRef}
        canvasRef={canvasRef}
        status={status}
        errorMessage={errorMessage}
        fps={fps}
        hasHand={!!landmarks}
        onRetry={startCamera}
        onToggleEnabled={() => setHandTrackingEnabled((prev) => !prev)}
        enabled={handTrackingEnabled}
      />

      {/* 4. Active Gesture HUD Badge */}
      <GestureIndicator
        gestureState={gestureState}
        isPaused={isPaused}
        enabled={handTrackingEnabled}
      />

      {/* 5. Selected Planet Telemetry & Info Panel */}
      <PlanetInfoPanel
        planet={selectedPlanet}
        onClose={() => setSelectedPlanet(null)}
      />

      {/* 6. Bottom Floating Control Dock */}
      <ControlBar
        isPaused={isPaused}
        onTogglePause={() => setIsPaused((prev) => !prev)}
        speedMultiplier={speedMultiplier}
        onChangeSpeed={setSpeedMultiplier}
        showOrbits={showOrbits}
        onToggleOrbits={() => setShowOrbits((prev) => !prev)}
        showLabels={showLabels}
        onToggleLabels={() => setShowLabels((prev) => !prev)}
        showAsteroids={showAsteroids}
        onToggleAsteroids={() => setShowAsteroids((prev) => !prev)}
        onResetView={() => setSelectedPlanet(null)}
        handTrackingEnabled={handTrackingEnabled}
        onToggleHandTracking={() => setHandTrackingEnabled((prev) => !prev)}
        isMuted={isMuted}
        onToggleSound={handleToggleSound}
        onOpenGuide={() => setShowGuide(true)}
        onOpenScaleModal={() => setShowScaleModal(true)}
      />

      {/* 7. Welcome Onboarding Modal */}
      {showWelcome && (
        <WelcomeModal
          onStartWithHand={() => {
            setShowWelcome(false);
            setHandTrackingEnabled(true);
          }}
          onStartWithMouse={() => {
            setShowWelcome(false);
            setHandTrackingEnabled(false);
          }}
        />
      )}

      {/* 8. Illustrated Gesture Guide Modal */}
      <GestureGuideModal
        isOpen={showGuide}
        onClose={() => setShowGuide(false)}
      />

      {/* 9. Scientific Scale Explanation Modal */}
      <ScaleModal
        isOpen={showScaleModal}
        onClose={() => setShowScaleModal(false)}
      />
    </div>
  );
}
