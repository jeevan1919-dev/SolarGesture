import { useRef, useCallback, memo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import type { HandGestureState, PlanetData } from '../../types/solar';
import { PLANETS_DATA } from '../../data/planets';
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
  showLabels: boolean;
  showAsteroids: boolean;
  gestureState: HandGestureState;
}

export const SolarCanvas = memo(function SolarCanvas({
  selectedPlanet,
  onSelectPlanet,
  isPaused,
  speedMultiplier,
  showOrbits,
  showLabels,
  showAsteroids,
  gestureState
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

  const sunData = PLANETS_DATA.find((p) => p.id === 'sun')!;
  const planetList = PLANETS_DATA.filter((p) => p.id !== 'sun');

  return (
    <div className="w-full h-full absolute inset-0 cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 55, 115], fov: 50, near: 0.1, far: 2500 }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        onPointerMissed={(e) => {
          // If clicked empty space, do not unselect if dragging
          if (e.type === 'click') {
            onSelectPlanet(null);
          }
        }}
      >
        <color attach="background" args={['#030712']} />

        {/* Ambient cosmic starlight */}
        <ambientLight intensity={0.15} />

        {/* Starfield with glowing stars */}
        <Stars
          radius={450}
          depth={80}
          count={6500}
          factor={4}
          saturation={0.5}
          fade
          speed={0.8}
        />

        {/* The Central Sun */}
        <Sun
          data={sunData}
          isSelected={selectedPlanet?.id === 'sun'}
          onSelect={() => onSelectPlanet(sunData)}
        />

        {/* The 8 Planets */}
        {planetList.map((planet) => (
          <Planet
            key={planet.id}
            data={planet}
            isSelected={selectedPlanet?.id === planet.id}
            isPaused={isPaused}
            speedMultiplier={speedMultiplier}
            showOrbits={showOrbits}
            showLabels={showLabels}
            onSelect={(p) => onSelectPlanet(p)}
            registerPlanetMesh={registerPlanetMesh}
          />
        ))}

        {/* Asteroid Belt between Mars & Jupiter */}
        {showAsteroids && <AsteroidBelt count={700} innerRadius={35} outerRadius={40} />}

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
          maxDistance={350}
          maxPolarAngle={Math.PI / 2.05}
        />
      </Canvas>
    </div>
  );
});
