import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import type { PlanetData } from '../../types/solar';
import { SaturnRings } from './SaturnRings';

interface PlanetProps {
  data: PlanetData;
  isSelected: boolean;
  isPaused: boolean;
  speedMultiplier: number;
  showOrbits: boolean;
  showLabels: boolean;
  onSelect: (planet: PlanetData) => void;
  registerPlanetMesh?: (id: string, getPosition: () => THREE.Vector3) => void;
}

export function Planet({
  data,
  isSelected,
  isPaused,
  speedMultiplier,
  showOrbits,
  showLabels,
  onSelect,
  registerPlanetMesh
}: PlanetProps) {
  const orbitGroupRef = useRef<THREE.Group>(null);
  const planetMeshRef = useRef<THREE.Mesh>(null);
  const moonOrbitRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Initial random orbit angle offset so planets don't all align in a straight line at start
  const initialAngle = useMemo(() => Math.random() * Math.PI * 2, []);

  // Set initial orbit position
  useMemo(() => {
    if (orbitGroupRef.current) {
      orbitGroupRef.current.rotation.y = initialAngle;
    }
  }, [initialAngle]);

  // Register position getter for camera focus
  useMemo(() => {
    if (registerPlanetMesh) {
      registerPlanetMesh(data.id, () => {
        const targetPos = new THREE.Vector3();
        if (planetMeshRef.current) {
          planetMeshRef.current.getWorldPosition(targetPos);
        } else {
          targetPos.set(data.orbitDistance, 0, 0);
        }
        return targetPos;
      });
    }
  }, [data.id, data.orbitDistance, registerPlanetMesh]);

  useFrame((_, delta) => {
    // 1. Orbit revolution around the Sun
    if (orbitGroupRef.current && !isPaused) {
      orbitGroupRef.current.rotation.y += data.orbitalSpeed * speedMultiplier * delta * 25;
    }

    // 2. Planet rotation on its own axis
    if (planetMeshRef.current) {
      planetMeshRef.current.rotation.y += data.rotationSpeed * delta * 50;
    }

    // 3. Moon orbit around Earth
    if (moonOrbitRef.current && !isPaused) {
      moonOrbitRef.current.rotation.y += 0.05 * speedMultiplier * delta * 25;
    }
  });

  return (
    <>
      {/* 1. Orbit Path Ring (Static in World space) */}
      {showOrbits && data.orbitDistance > 0 && (
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[data.orbitDistance - 0.08, data.orbitDistance + 0.08, 128]} />
          <meshBasicMaterial
            color={isSelected ? '#00F0FF' : hovered ? '#48E5C2' : '#3A506B'}
            transparent
            opacity={isSelected ? 0.8 : hovered ? 0.6 : 0.25}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* 2. Revolving Orbit Group */}
      <group ref={orbitGroupRef} rotation={[0, initialAngle, 0]}>
        {/* Planet Container at orbitDistance along X axis */}
        <group position={[data.orbitDistance, 0, 0]}>
          {/* Axial Tilt Group */}
          <group rotation={[0, 0, (data.axialTiltDeg * Math.PI) / 180]}>
            {/* The Planet Sphere Mesh */}
            <mesh
              ref={planetMeshRef}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(data);
              }}
              onPointerOver={(e) => {
                e.stopPropagation();
                setHovered(true);
                document.body.style.cursor = 'pointer';
              }}
              onPointerOut={() => {
                setHovered(false);
                document.body.style.cursor = 'auto';
              }}
            >
              <sphereGeometry args={[data.radius, 36, 36]} />
              <meshStandardMaterial
                color={data.color}
                roughness={0.7}
                metalness={0.1}
                emissive={hovered || isSelected ? data.accentColor : '#000000'}
                emissiveIntensity={hovered || isSelected ? 0.45 : 0}
              />
            </mesh>

            {/* Atmosphere / Glow Aura */}
            <mesh>
              <sphereGeometry args={[data.radius * 1.05, 24, 24]} />
              <meshBasicMaterial
                color={data.glowColor}
                transparent
                opacity={hovered || isSelected ? 0.35 : 0.12}
                side={THREE.BackSide}
              />
            </mesh>

            {/* Planetary Rings (e.g. Saturn, Uranus) */}
            {data.hasRings && data.ringsRadiusInner && data.ringsRadiusOuter && (
              <SaturnRings
                innerRadius={data.ringsRadiusInner}
                outerRadius={data.ringsRadiusOuter}
                color={data.ringColor}
              />
            )}

            {/* Earth's Moon */}
            {data.hasMoons && data.id === 'earth' && (
              <group ref={moonOrbitRef}>
                <mesh position={[data.radius + 1.8, 0, 0]}>
                  <sphereGeometry args={[0.3, 16, 16]} />
                  <meshStandardMaterial color="#CCCCCC" roughness={0.9} />
                </mesh>
              </group>
            )}
          </group>

          {/* Selection Target Ring */}
          {isSelected && (
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[data.radius * 1.4, data.radius * 1.48, 48]} />
              <meshBasicMaterial color="#00F0FF" side={THREE.DoubleSide} />
            </mesh>
          )}

          {/* Hover Pulsing Ring */}
          {hovered && !isSelected && (
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[data.radius * 1.25, data.radius * 1.3, 32]} />
              <meshBasicMaterial color="#48E5C2" transparent opacity={0.6} side={THREE.DoubleSide} />
            </mesh>
          )}

          {/* 3. Planet Floating Tag / Label */}
          {showLabels && (
            <Html
              position={[0, data.radius + 1.2, 0]}
              center
              distanceFactor={45}
              style={{
                pointerEvents: 'none',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease'
              }}
            >
              <div
                className={`px-2 py-0.5 rounded-full text-xs font-heading font-medium tracking-wide flex items-center gap-1.5 shadow-lg border backdrop-blur-md ${
                  isSelected
                    ? 'bg-space-electric/20 text-space-electric border-space-electric shadow-glow-cyan'
                    : hovered
                    ? 'bg-space-cyan/20 text-space-cyan border-space-cyan'
                    : 'bg-space-deep/80 text-slate-300 border-white/10'
                }`}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: data.glowColor }}
                />
                {data.name}
              </div>
            </Html>
          )}
        </group>
      </group>
    </>
  );
}
