import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { PlanetData } from '../../types/solar';
import { PlanetSign } from './PlanetSign';

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

  // Procedural solar granule texture
  const sunTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;

    // Solar plasma gradient
    const grad = ctx.createLinearGradient(0, 0, 0, 256);
    grad.addColorStop(0, activeColor);
    grad.addColorStop(0.5, '#FFF2A7');
    grad.addColorStop(1, activeColor);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 256);

    // Churning granules / sunspots
    ctx.fillStyle = 'rgba(215, 60, 0, 0.45)';
    for (let i = 0; i < 90; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 256;
      const r = 3 + Math.random() * 9;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    return tex;
  }, [activeColor]);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += data.rotationSpeed * delta * 60;
    }
    if (glowRef.current) {
      glowRef.current.rotation.z -= 0.003;
      const scale = 1.15 + Math.sin(Date.now() * 0.002) * 0.02;
      glowRef.current.scale.set(scale, scale, scale);
    }
    if (coronaRef.current) {
      coronaRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Central Omnidirectional Solar Radiance Light */}
      <pointLight
        color={activeColor}
        intensity={4.2}
        distance={350}
        decay={1.1}
      />

      {/* Core Star Sphere with Procedural Plasma Map */}
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
          map={sunTexture}
          color={activeColor}
        />
      </mesh>

      {/* Inner Corona Glow Layer */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[data.radius * 1.15, 32, 32]} />
        <meshBasicMaterial
          color={activeGlow}
          transparent
          opacity={0.45}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Outer Atmospheric Flare Aura */}
      <mesh ref={coronaRef}>
        <sphereGeometry args={[data.radius * 1.38, 32, 32]} />
        <meshBasicMaterial
          color={activeColor}
          transparent
          opacity={0.16}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Selection Reticle if Selected */}
      {isSelected && (
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[data.radius * 1.5, data.radius * 1.58, 64]} />
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
