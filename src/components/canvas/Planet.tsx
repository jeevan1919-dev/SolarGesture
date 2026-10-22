import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { PlanetData } from '../../types/solar';
import { SaturnRings } from './SaturnRings';
import { PlanetSign } from './PlanetSign';
import { planetTextureGenerator } from '../../services/planetTextureGenerator';

interface PlanetProps {
  data: PlanetData;
  isSelected: boolean;
  isPaused: boolean;
  speedMultiplier: number;
  showOrbits: boolean;
  showSigns: boolean;
  onSelect: (planet: PlanetData) => void;
  registerPlanetMesh?: (id: string, getPosition: () => THREE.Vector3) => void;
  orbitLineColor?: string;
}

export function Planet({
  data,
  isSelected,
  isPaused,
  speedMultiplier,
  showOrbits,
  showSigns,
  onSelect,
  registerPlanetMesh,
  orbitLineColor
}: PlanetProps) {
  const orbitGroupRef = useRef<THREE.Group>(null);
  const planetMeshRef = useRef<THREE.Mesh>(null);
  const cloudsMeshRef = useRef<THREE.Mesh>(null);
  const moonOrbitRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Generate realistic procedural texture for planet
  const surfaceTexture = useMemo(() => {
    return planetTextureGenerator.getTexture(
      data.surfaceType,
      data.color,
      data.accentColor
    );
  }, [data.surfaceType, data.color, data.accentColor]);

  // Clouds texture for planets with cloud covers (Earth)
  const cloudsTexture = useMemo(() => {
    if (data.hasClouds) {
      return planetTextureGenerator.getEarthClouds();
    }
    return null;
  }, [data.hasClouds]);

  // Initial random orbit angle offset so planets don't start in a single straight row
  const initialAngle = useMemo(() => Math.random() * Math.PI * 2, []);

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

    // 3. Clouds differential rotation for realistic planetary atmosphere
    if (cloudsMeshRef.current && !isPaused) {
      cloudsMeshRef.current.rotation.y += data.rotationSpeed * delta * 60;
    }

    // 4. Moon orbit around Earth
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
            color={isSelected ? '#00F0FF' : hovered ? '#48E5C2' : orbitLineColor || '#3A506B'}
            transparent
            opacity={isSelected ? 0.9 : hovered ? 0.7 : 0.28}
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
            {/* The Realistic Planet Sphere Mesh */}
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
              <sphereGeometry args={[data.radius, 48, 48]} />
              <meshStandardMaterial
                map={surfaceTexture}
                roughness={data.category === 'Gas Giant' || data.category === 'Ice Giant' ? 0.4 : 0.8}
                metalness={0.08}
                emissive={hovered || isSelected ? data.accentColor : '#000000'}
                emissiveIntensity={hovered || isSelected ? 0.35 : 0}
              />
            </mesh>

            {/* Earth's Dynamic Atmosphere Cloud Layer */}
            {data.hasClouds && cloudsTexture && (
              <mesh ref={cloudsMeshRef}>
                <sphereGeometry args={[data.radius * 1.025, 40, 40]} />
                <meshStandardMaterial
                  map={cloudsTexture}
                  transparent
                  opacity={0.75}
                  blending={THREE.NormalBlending}
                  depthWrite={false}
                />
              </mesh>
            )}

            {/* Atmosphere / Fresnel Rim Glow Layer */}
            <mesh>
              <sphereGeometry args={[data.radius * 1.05, 32, 32]} />
              <meshBasicMaterial
                color={data.glowColor}
                transparent
                opacity={hovered || isSelected ? 0.4 : 0.15}
                blending={THREE.AdditiveBlending}
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
                  <sphereGeometry args={[0.3, 20, 20]} />
                  <meshStandardMaterial color="#CCCCCC" roughness={0.9} />
                </mesh>
              </group>
            )}
          </group>

          {/* Selection Target Reticle Ring */}
          {isSelected && (
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[data.radius * 1.45, data.radius * 1.54, 48]} />
              <meshBasicMaterial color="#00F0FF" side={THREE.DoubleSide} />
            </mesh>
          )}

          {/* Hover Pulsing Ring */}
          {hovered && !isSelected && (
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[data.radius * 1.25, data.radius * 1.32, 36]} />
              <meshBasicMaterial color="#48E5C2" transparent opacity={0.65} side={THREE.DoubleSide} />
            </mesh>
          )}

          {/* 3. 3D Planet Sign / Navigation Beacon */}
          {showSigns && (
            <PlanetSign
              planet={data}
              isSelected={isSelected}
              onSelect={onSelect}
              accentColor={data.glowColor}
            />
          )}
        </group>
      </group>
    </>
  );
}
