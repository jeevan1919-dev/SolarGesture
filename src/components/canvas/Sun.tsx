import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { PlanetData } from '../../types/solar';
import { PlanetSign } from './PlanetSign';
import { planetTextureGenerator } from '../../services/planetTextureGenerator';

interface SunProps {
  data: PlanetData;
  isSelected: boolean;
  onSelect: () => void;
  starColor?: string;
  starGlow?: string;
  showSigns?: boolean;
}

export function Sun({
  data,
  isSelected,
  onSelect,
  starColor,
  starGlow,
  showSigns = true
}: SunProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const coronaRef = useRef<THREE.Mesh>(null);

  const activeColor = starColor || data.color;
  const activeGlow = starGlow || data.glowColor;

  // Authentic NASA SOHO/SDO solar photosphere map
  const sunTexture = useMemo(() => {
    return planetTextureGenerator.loadNasaTexture('/textures/sunmap.jpg', true);
  }, []);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += data.rotationSpeed * delta * 60;
    }
    if (glowRef.current) {
      glowRef.current.rotation.z -= 0.002;
      const scale = 1.08 + Math.sin(Date.now() * 0.0015) * 0.015;
      glowRef.current.scale.set(scale, scale, scale);
    }
    if (coronaRef.current) {
      coronaRef.current.rotation.y += 0.0008;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Central Omnidirectional Solar Radiance Light */}
      <pointLight
        color={activeColor}
        intensity={4.5}
        distance={450}
        decay={1.05}
      />

      {/* Photorealistic NASA Solar Photosphere */}
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'auto';
        }}
      >
        <sphereGeometry args={[data.radius, 64, 64]} />
        <meshBasicMaterial
          map={sunTexture}
          color={activeColor}
        />
      </mesh>

      {/* Natural Solar Corona Flare Layer */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[data.radius * 1.08, 48, 48]} />
        <meshBasicMaterial
          color={activeGlow}
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Subtle Outer Coronal Atmosphere */}
      <mesh ref={coronaRef}>
        <sphereGeometry args={[data.radius * 1.25, 36, 36]} />
        <meshBasicMaterial
          color={activeColor}
          transparent
          opacity={0.10}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Selection Reticle if Selected */}
      {isSelected && (
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[data.radius * 1.45, data.radius * 1.53, 64]} />
          <meshBasicMaterial color="#00F0FF" side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* Sign beacon for the Sun */}
      {showSigns && (
        <PlanetSign
          planet={data}
          isSelected={isSelected}
          onSelect={onSelect}
          accentColor={activeGlow}
        />
      )}
    </group>
  );
}
