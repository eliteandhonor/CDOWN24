import React from 'react';
import { Environment as DreiEnvironment, Stars, Cloud } from '@react-three/drei';
import { useCountdownStore } from '../store/countdownStore';

export function Environment() {
  const { theme } = useCountdownStore();

  return (
    <>
      <DreiEnvironment preset="night" />
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
      <Cloud
        opacity={0.5}
        speed={0.4}
        width={20}
        depth={5}
        segments={20}
        position={[0, 5, -15]}
        color={theme.accent}
      />
      <ambientLight intensity={0.4} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        intensity={1}
        color={theme.primary}
      />
    </>
  );
}