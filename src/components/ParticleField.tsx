import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useCountdownStore } from '../store/countdownStore';

export function ParticleField() {
  const { theme, animation } = useCountdownStore();
  const pointsRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const temp = new Float32Array(2000 * 3);
    for (let i = 0; i < temp.length; i += 3) {
      temp[i] = (Math.random() - 0.5) * 20;
      temp[i + 1] = (Math.random() - 0.5) * 20;
      temp[i + 2] = (Math.random() - 0.5) * 20;
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.001 * animation.speed;
      pointsRef.current.rotation.x += 0.001 * animation.speed;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color={theme.secondary}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}