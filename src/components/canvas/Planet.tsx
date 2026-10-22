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

  // Authentic NASA high-resolution textures (diffuse, bump, specular, clouds)
  const textures = useMemo(() => {
    return planetTextureGenerator.getPlanetTextures(
      data.id,
      data.surfaceType,
      data.color,
      data.accentColor
    );
  }, [data.id, data.surfaceType, data.color, data.accentColor]);

  // Authentic NASA Moon textures for Earth
  const moonTextures = useMemo(() => {
    if (data.id === 'earth') {
      return planetTextureGenerator.getMoonTextures();
    }
    return null;
  }, [data.id]);

  // Initial random orbit angle offset
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
    // 1. Planetary revolution around the Sun
    if (orbitGroupRef.current && !isPaused) {
      orbitGroupRef.current.rotation.y += data.orbitalSpeed * speedMultiplier * delta * 25;
    }

    // 2. Planet rotation on its own axis
    if (planetMeshRef.current) {
      planetMeshRef.current.rotation.y += data.rotationSpeed * delta * 50;
    }

    // 3. Clouds differential rotation for realistic planetary atmosphere
    if (cloudsMeshRef.current && !isPaused) {
      cloudsMeshRef.current.rotation.y += data.rotationSpeed * delta * 58;
    }

    // 4. Moon orbit around Earth
    if (moonOrbitRef.current && !isPaused) {
      moonOrbitRef.current.rotation.y += 0.05 * speedMultiplier * delta * 25;
    }
  });

  // Determine whether planet has a visible atmospheric limb haze
  const hasAtmosphericHaze = ['earth', 'venus', 'uranus', 'neptune'].includes(data.id);

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
            {/* Photorealistic NASA Planetary Sphere */}
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
              <sphereGeometry args={[data.radius, 64, 64]} />
              <meshStandardMaterial
                map={textures.map}
                bumpMap={textures.bumpMap || undefined}
                bumpScale={
                  data.id === 'mercury' ? 0.045 :
                  data.id === 'mars' ? 0.038 :
                  data.id === 'venus' ? 0.015 :
                  data.id === 'earth' ? 0.025 : 0
                }
                roughnessMap={textures.specularMap || undefined}
                roughness={
                  data.id === 'mercury' ? 0.98 :
                  data.id === 'mars' ? 0.92 :
                  data.id === 'venus' ? 0.85 :
                  data.id === 'earth' ? 0.65 :
                  data.category === 'Gas Giant' ? 0.55 : 0.50
                }
                metalness={
                  data.id === 'mercury' ? 0.08 :
                  data.id === 'mars' ? 0.05 : 0.02
                }
              />
            </mesh>

            {/* Earth's Authentic NASA Cloud Cover Layer */}
            {data.id === 'earth' && textures.cloudsMap && (
              <mesh ref={cloudsMeshRef}>
                <sphereGeometry args={[data.radius * 1.015, 64, 64]} />
                <meshStandardMaterial
                  map={textures.cloudsMap}
                  transparent
                  opacity={0.82}
                  blending={THREE.NormalBlending}
                  depthWrite={false}
                />
              </mesh>
            )}

            {/* Delicate, Photorealistic Atmospheric Rayleigh Limb Haze (Earth/Venus/Ice Giants) */}
            {hasAtmosphericHaze && (
              <mesh>
                <sphereGeometry args={[data.radius * 1.018, 48, 48]} />
                <meshBasicMaterial
                  color={data.id === 'earth' ? '#5FA8D3' : data.id === 'venus' ? '#E8C991' : data.glowColor}
                  transparent
                  opacity={0.18}
                  blending={THREE.AdditiveBlending}
                  side={THREE.BackSide}
                />
              </mesh>
            )}

            {/* Saturn's Photorealistic Rings with Cassini Division */}
            {data.hasRings && data.ringsRadiusInner && data.ringsRadiusOuter && (
              <SaturnRings
                innerRadius={data.ringsRadiusInner}
                outerRadius={data.ringsRadiusOuter}
              />
            )}

            {/* Earth's Moon with Authentic NASA LRO Mare and Craters */}
            {data.hasMoons && data.id === 'earth' && moonTextures && (
              <group ref={moonOrbitRef}>
                <mesh position={[data.radius + 1.8, 0, 0]}>
                  <sphereGeometry args={[0.32, 32, 32]} />
                  <meshStandardMaterial
                    map={moonTextures.map}
                    bumpMap={moonTextures.bumpMap}
                    bumpScale={0.025}
                    roughness={0.96}
                    metalness={0.04}
                  />
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

          {/* 3D Planet Sign / Navigation Beacon */}
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
