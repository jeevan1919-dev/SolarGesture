import { useMemo } from 'react';
import * as THREE from 'three';
import { planetTextureGenerator } from '../../services/planetTextureGenerator';

interface SaturnRingsProps {
  innerRadius: number;
  outerRadius: number;
  color?: string;
}

export function SaturnRings({ innerRadius, outerRadius }: SaturnRingsProps) {
  // Generate ring geometry with custom radial UV mapping
  const ringGeometry = useMemo(() => {
    const geo = new THREE.RingGeometry(innerRadius, outerRadius, 128);
    const pos = geo.attributes.position;
    const uvs = geo.attributes.uv;

    // Map vertex UVs radially from inner to outer radius
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const r = Math.sqrt(x * x + y * y);
      const u = Math.max(0, Math.min(1, (r - innerRadius) / (outerRadius - innerRadius)));
      uvs.setXY(i, u, 0.5);
    }

    geo.attributes.uv.needsUpdate = true;
    return geo;
  }, [innerRadius, outerRadius]);

  // Authentic NASA Cassini ring texture with Cassini Division & A/B/C rings
  const ringTexture = useMemo(() => {
    return planetTextureGenerator.getSaturnRingTexture();
  }, []);

  return (
    <mesh geometry={ringGeometry} rotation={[-Math.PI / 2.2, 0, 0]}>
      <meshStandardMaterial
        map={ringTexture}
        side={THREE.DoubleSide}
        transparent
        opacity={0.92}
        roughness={0.7}
        metalness={0.02}
        depthWrite={false}
      />
    </mesh>
  );
}
