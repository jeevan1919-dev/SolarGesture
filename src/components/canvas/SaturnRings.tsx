import * as THREE from 'three';

interface SaturnRingsProps {
  innerRadius: number;
  outerRadius: number;
  color?: string;
}

export function SaturnRings({ innerRadius, outerRadius, color = '#E0C59D' }: SaturnRingsProps) {
  return (
    <mesh rotation={[-Math.PI / 2.2, 0, 0]}>
      <ringGeometry args={[innerRadius, outerRadius, 64]} />
      <meshStandardMaterial
        color={color}
        side={THREE.DoubleSide}
        transparent
        opacity={0.85}
        roughness={0.6}
        metalness={0.1}
      />
    </mesh>
  );
}
