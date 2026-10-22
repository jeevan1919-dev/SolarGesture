import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AsteroidBeltProps {
  count?: number;
  innerRadius?: number;
  outerRadius?: number;
}

export function AsteroidBelt({
  count = 600,
  innerRadius = 35,
  outerRadius = 40
}: AsteroidBeltProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  // Initialize random asteroid matrices
  const { dummy, asteroids } = useMemo(() => {
    const dummy = new THREE.Object3D();
    const asteroids = [];

    for (let i = 0; i < count; i++) {
      const radius = innerRadius + Math.random() * (outerRadius - innerRadius);
      const angle = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 2.5;

      const scale = 0.08 + Math.random() * 0.16;
      const speed = (0.002 + Math.random() * 0.003) * (innerRadius / radius);

      asteroids.push({
        radius,
        angle,
        speed,
        y,
        scale,
        rotSpeedX: (Math.random() - 0.5) * 0.02,
        rotSpeedY: (Math.random() - 0.5) * 0.02,
        rotX: Math.random() * Math.PI,
        rotY: Math.random() * Math.PI
      });
    }

    return { dummy, asteroids };
  }, [count, innerRadius, outerRadius]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    for (let i = 0; i < count; i++) {
      const a = asteroids[i];
      a.angle += a.speed * delta * 60;
      a.rotX += a.rotSpeedX;
      a.rotY += a.rotSpeedY;

      dummy.position.set(
        Math.cos(a.angle) * a.radius,
        a.y,
        Math.sin(a.angle) * a.radius
      );
      dummy.rotation.set(a.rotX, a.rotY, 0);
      dummy.scale.set(a.scale, a.scale * (0.8 + Math.random() * 0.4), a.scale);
      dummy.updateMatrix();

      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, count]}
    >
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color="#8B7D6B"
        roughness={0.9}
        metalness={0.1}
      />
    </instancedMesh>
  );
}
