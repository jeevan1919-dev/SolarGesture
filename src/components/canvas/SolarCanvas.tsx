import { useRef, useCallback, memo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import type { HandGestureState, PlanetData, UniverseTheme } from '../../types/solar';
import { Sun } from './Sun';
import { Planet } from './Planet';
import { AsteroidBelt } from './AsteroidBelt';
import { HandCameraController } from './HandCameraController';

interface SolarCanvasProps {
  selectedPlanet: PlanetData | null;
  onSelectPlanet: (planet: PlanetData | null) => void;
  isPaused: boolean;
  speedMultiplier: number;
  showOrbits: boolean;
  showSigns: boolean;
  showAsteroids: boolean;
  gestureState: HandGestureState;
  universeTheme: UniverseTheme;
  activePlanets: PlanetData[];
}

export const SolarCanvas = memo(function SolarCanvas({
  selectedPlanet,
  onSelectPlanet,
  isPaused,
  speedMultiplier,
  showOrbits,
  showSigns,
  showAsteroids,
  gestureState,
  universeTheme,
  activePlanets
}: SolarCanvasProps) {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const planetPositionsRef = useRef<Record<string, () => THREE.Vector3>>({});

  const registerPlanetMesh = useCallback((id: string, getPosition: () => THREE.Vector3) => {
    planetPositionsRef.current[id] = getPosition;
  }, []);

  const getPlanetPosition = useCallback((id: string): THREE.Vector3 | null => {
    const fn = planetPositionsRef.current[id];
    return fn ? fn() : null;
  }, []);

  const sunData = activePlanets.find((p) => p.id === 'sun') || activePlanets[0];
  const planetList = activePlanets.filter((p) => p.id !== 'sun');

  return (
    <div className="w-full h-full absolute inset-0 cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 55, 115], fov: 50, near: 0.1, far: 3000 }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        onPointerMissed={(e) => {
          if (e.type === 'click') {
            onSelectPlanet(null);
          }
        }}
      >
        <color attach="background" args={[universeTheme.spaceBackgroundColor]} />

        {/* Dynamic cosmic ambient starlight based on universe theme */}
        <ambientLight
          color={universeTheme.ambientLightColor}
          intensity={universeTheme.ambientIntensity}
        />

        {/* Starfield */}
        <Stars
          radius={500}
          depth={90}
          count={7000}
          factor={4}
          saturation={universeTheme.id === 'cyberpunk' ? 0.8 : 0.4}
          fade
          speed={0.9}
        />

        {/* The Central Star */}
        <Sun
          data={sunData}
          isSelected={selectedPlanet?.id === sunData.id}
          onSelect={() => onSelectPlanet(sunData)}
          starColor={universeTheme.starColor}
          starGlow={universeTheme.starGlow}
          showSigns={showSigns}
        />

        {/* The Orbiting Planets / Exoplanets */}
        {planetList.map((planet) => (
          <Planet
            key={planet.id}
            data={planet}
            isSelected={selectedPlanet?.id === planet.id}
            isPaused={isPaused}
            speedMultiplier={speedMultiplier}
            showOrbits={showOrbits}
            showSigns={showSigns}
            onSelect={(p) => onSelectPlanet(p)}
            registerPlanetMesh={registerPlanetMesh}
            orbitLineColor={universeTheme.orbitLineColor}
          />
        ))}

        {/* Asteroid Belt (only in Prime, Cyberpunk, and Inferno) */}
        {showAsteroids && universeTheme.id !== 'exoplanets' && (
          <AsteroidBelt count={700} innerRadius={35} outerRadius={41} />
        )}

        {/* Gesture camera controller */}
        <HandCameraController
          selectedPlanet={selectedPlanet}
          gestureState={gestureState}
          getPlanetPosition={getPlanetPosition}
          controlsRef={controlsRef}
        />

        {/* OrbitControls for smooth mouse/touch fallback */}
        <OrbitControls
          ref={controlsRef}
          makeDefault
          enableDamping
          dampingFactor={0.06}
          minDistance={8}
          maxDistance={380}
          maxPolarAngle={Math.PI / 2.05}
        />
      </Canvas>
    </div>
  );
});
