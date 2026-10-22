import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { PlanetData } from '../../types/solar';

interface SunProps {
  data: PlanetData;
  isSelected: boolean;
  onSelect: () => void;
}

export function Sun({ data, isSelected, onSelect }: SunProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += data.rotationSpeed * delta * 60;
    }
    if (glowRef.current) {
      glowRef.current.rotation.z -= 0.002;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Central Omnidirectional Solar Light */}
      <pointLight
        color="#FFF6E0"
        intensity={3.8}
        distance={250}
        decay={1.2}
      />
      <ambientLight intensity={0.12} />

      {/* Core Sun Sphere */}
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
        <sphereGeometry args={[data.radius, 48, 48]} />
        <meshBasicMaterial
          color={data.color}
        />
      </mesh>

      {/* Outer Corona Glow Layer */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[data.radius * 1.15, 32, 32]} />
        <meshBasicMaterial
          color={data.glowColor}
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Atmospheric Flare Aura */}
      <mesh>
        <sphereGeometry args={[data.radius * 1.35, 32, 32]} />
        <meshBasicMaterial
          color="#FF4500"
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Selection Reticle if Selected */}
      {isSelected && (
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[data.radius * 1.45, data.radius * 1.52, 64]} />
          <meshBasicMaterial color="#00F0FF" side={THREE.DoubleSide} />
        </mesh>
      )}
    </group>
  );
}
