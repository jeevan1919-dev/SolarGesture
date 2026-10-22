import { useState, useCallback, useEffect } from 'react';
import type { PlanetData, GestureType, UniverseTheme } from './types/solar';
import { PRIME_PLANETS_DATA, EXOPLANETS_DATA, UNIVERSES } from './data/planets';
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
import { MultiverseModal } from './components/ui/MultiverseModal';
import { soundService } from './services/soundEffects';

export default function App() {
  // Multiverse Universe State
  const [universeTheme, setUniverseTheme] = useState<UniverseTheme>(UNIVERSES[0]);
  const [isWarping, setIsWarping] = useState<boolean>(false);

  // Active Planets list based on Universe
  const activePlanets = universeTheme.id === 'exoplanets' ? EXOPLANETS_DATA : PRIME_PLANETS_DATA;

  // App state
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [showOrbits, setShowOrbits] = useState<boolean>(true);
  const [showSigns, setShowSigns] = useState<boolean>(true);
  const [showAsteroids, setShowAsteroids] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Modals & UI states
  const [showWelcome, setShowWelcome] = useState<boolean>(true);
  const [showGuide, setShowGuide] = useState<boolean>(false);
  const [showScaleModal, setShowScaleModal] = useState<boolean>(false);
  const [showMultiverse, setShowMultiverse] = useState<boolean>(false);
  const [handTrackingEnabled, setHandTrackingEnabled] = useState<boolean>(false);

  // Universe switch handler with warp sequence
  const handleSelectUniverse = useCallback((newUniverse: UniverseTheme) => {
    setIsWarping(true);
    soundService.playWhoosh();
    setSelectedPlanet(null);

    setTimeout(() => {
      setUniverseTheme(newUniverse);
      setTimeout(() => {
        setIsWarping(false);
      }, 600);
    }, 400);
  }, []);

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
        // If not focused on a planet, focus on Earth / First habitable planet
        setSelectedPlanet((prev) => {
          if (!prev) {
            const defaultTarget = activePlanets.find((p) => p.id === 'earth') || activePlanets[1];
            return defaultTarget || null;
          }
          return prev;
        });
      }
    },
    [activePlanets]
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
        case 'KeyU':
          soundService.playClick();
          setShowMultiverse((prev) => !prev);
          break;
        case 'Escape':
          setSelectedPlanet(null);
          setShowGuide(false);
          setShowScaleModal(false);
          setShowMultiverse(false);
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
          if (activePlanets[index]) {
            soundService.playPlanetSelect();
            setSelectedPlanet(activePlanets[index]);
          }
          break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleToggleSound, activePlanets]);

  return (
    <div className="w-full h-full relative overflow-hidden bg-space-darkest text-slate-100 select-none">
      {/* Multiverse Quantum Spacetime Warp Flash Overlay */}
      {isWarping && (
        <div
          className="fixed inset-0 z-50 pointer-events-none transition-opacity duration-500 animate-pulse"
          style={{
            background: `radial-gradient(circle, ${universeTheme.warpEffectColor}99 0%, ${universeTheme.starColor}55 40%, transparent 80%)`
          }}
        />
      )}

      {/* 1. 3D WebGL Solar System Canvas with Realistic Procedural Textures */}
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
        showSigns={showSigns}
        showAsteroids={showAsteroids}
        gestureState={gestureState}
        universeTheme={universeTheme}
        activePlanets={activePlanets}
      />

      {/* 2. Top Quick Navigation Bar with Astronomical Glyphs & Multiverse Pill */}
      <PlanetQuickBar
        selectedPlanet={selectedPlanet}
        onSelectPlanet={setSelectedPlanet}
        activePlanets={activePlanets}
        universeTheme={universeTheme}
        onOpenMultiverse={() => setShowMultiverse(true)}
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

      {/* 5. Deep Planetary Telemetry, Moons, Missions & Voice Briefing Panel */}
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
        showSigns={showSigns}
        onToggleSigns={() => setShowSigns((prev) => !prev)}
        showAsteroids={showAsteroids}
        onToggleAsteroids={() => setShowAsteroids((prev) => !prev)}
        onResetView={() => setSelectedPlanet(null)}
        handTrackingEnabled={handTrackingEnabled}
        onToggleHandTracking={() => setHandTrackingEnabled((prev) => !prev)}
        isMuted={isMuted}
        onToggleSound={handleToggleSound}
        onOpenGuide={() => setShowGuide(true)}
        onOpenScaleModal={() => setShowScaleModal(true)}
        onOpenMultiverse={() => setShowMultiverse(true)}
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

      {/* 8. Multiverse Spacetime Portal Modal */}
      <MultiverseModal
        isOpen={showMultiverse}
        activeUniverseId={universeTheme.id}
        onSelectUniverse={handleSelectUniverse}
        onClose={() => setShowMultiverse(false)}
      />

      {/* 9. Illustrated Gesture Guide Modal */}
      <GestureGuideModal
        isOpen={showGuide}
        onClose={() => setShowGuide(false)}
      />

      {/* 10. Scientific Scale Explanation Modal */}
      <ScaleModal
        isOpen={showScaleModal}
        onClose={() => setShowScaleModal(false)}
      />
    </div>
  );
}
