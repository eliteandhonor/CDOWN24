import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text3D, Float } from '@react-three/drei';
import { motion } from 'framer-motion-3d';
import { useCountdownStore } from '../store/countdownStore';
import { useCountdown } from '../hooks/useCountdown';
import { ParticleField } from './ParticleField';

export function CountdownScene() {
  const { theme, animation, effects, customText } = useCountdownStore();
  const groupRef = useRef<THREE.Group>(null);
  const timeLeft = useCountdown();

  useFrame((state) => {
    if (groupRef.current && animation.pattern === 'wave') {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2 * animation.intensity;
    }
  });

  const displayText = customText ? `${customText}\n${timeLeft}` : timeLeft;
  const lines = displayText.split('\n');

  return (
    <group ref={groupRef}>
      {effects.particles && <ParticleField />}
      {lines.map((line, i) => (
        <motion.group
          key={i}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          position={[0, -i * 2, 0]}
        >
          <Float
            speed={animation.speed}
            rotationIntensity={animation.pattern === 'rotate' ? animation.intensity : 0}
            floatIntensity={animation.pattern === 'float' ? animation.intensity : 0}
          >
            <Text3D
              font="/fonts/helvetiker_bold.typeface.json"
              size={1}
              height={0.2}
              curveSegments={32}
              bevelEnabled
              bevelThickness={0.05}
              bevelSize={0.02}
              bevelOffset={0}
              bevelSegments={5}
            >
              {line}
              <meshPhysicalMaterial
                color={theme.primary}
                emissive={theme.accent}
                emissiveIntensity={1}
                metalness={0.8}
                roughness={0.2}
                clearcoat={1}
                clearcoatRoughness={0.2}
                toneMapped={false}
              />
            </Text3D>
          </Float>
        </motion.group>
      ))}
    </group>
  );
}