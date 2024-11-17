import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text3D, Float, Stars } from '@react-three/drei';
import { useStore } from '../store';
import { useCountdown } from '../hooks/useCountdown';
import * as THREE from 'three';

export default function Scene() {
  const { textColor, customText, fontSize, background } = useStore();
  const timeLeft = useCountdown();
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useThree();

  // Update background color
  scene.background = new THREE.Color(background);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01;
    }
  });

  const displayText = customText ? `${customText}\n${timeLeft}` : timeLeft;
  const lines = displayText.toUpperCase().split('\n');

  return (
    <>
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
      
      <group ref={groupRef}>
        {lines.map((line, i) => (
          <Float key={i} speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <Text3D
              font="/fonts/helvetiker_bold.typeface.json"
              size={fontSize}
              height={0.2}
              position={[0, -i * fontSize * 1.2, 0]}
              curveSegments={32}
              bevelEnabled
              bevelThickness={0.02}
              bevelSize={0.02}
              bevelOffset={0}
              bevelSegments={5}
            >
              {line}
              <meshPhysicalMaterial
                color={textColor}
                emissive={textColor}
                emissiveIntensity={0.5}
                metalness={0.8}
                roughness={0.2}
              />
            </Text3D>
          </Float>
        ))}
      </group>

      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <spotLight
        position={[-10, -10, -10]}
        angle={0.15}
        penumbra={1}
        intensity={1}
      />
    </>
  );
}