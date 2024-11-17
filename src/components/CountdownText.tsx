import React, { useRef } from 'react';
import { Text3D, Float } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { TextStyleType } from '../types';
import * as THREE from 'three';

interface CountdownTextProps {
  text: string;
  textColor: string;
  textStyle: TextStyleType;
  textSize: number;
  rotationSpeed: number;
}

const CountdownText: React.FC<CountdownTextProps> = ({
  text,
  textColor,
  textStyle,
  textSize,
  rotationSpeed
}) => {
  const textRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (textRef.current) {
      textRef.current.rotation.y += 0.01 * rotationSpeed;
    }
  });

  const getMaterial = () => {
    switch (textStyle) {
      case 'neon':
        return new THREE.MeshPhysicalMaterial({
          color: textColor,
          emissive: textColor,
          emissiveIntensity: 2,
          metalness: 0.2,
          roughness: 0.1,
        });
      case 'crystal':
        return new THREE.MeshPhysicalMaterial({
          color: textColor,
          metalness: 0.9,
          roughness: 0,
          transmission: 0.9,
          thickness: 0.5,
          opacity: 0.8,
          transparent: true,
        });
      case 'metallic':
        return new THREE.MeshPhysicalMaterial({
          color: textColor,
          metalness: 1,
          roughness: 0.1,
          clearcoat: 1,
          clearcoatRoughness: 0.1,
        });
      case 'fire':
        return new THREE.MeshPhysicalMaterial({
          color: textColor,
          emissive: '#ff4400',
          emissiveIntensity: 2,
          metalness: 0.3,
          roughness: 0.7,
        });
      case 'hologram':
        return new THREE.MeshPhysicalMaterial({
          color: textColor,
          metalness: 0.5,
          roughness: 0.1,
          transmission: 0.6,
          opacity: 0.8,
          transparent: true,
          emissive: textColor,
          emissiveIntensity: 0.5,
        });
      default:
        return new THREE.MeshPhysicalMaterial({
          color: textColor,
          metalness: 0.7,
          roughness: 0.2,
        });
    }
  };

  const lines = text.toUpperCase().split('\n');

  return (
    <group ref={textRef}>
      {lines.map((line, index) => (
        <Float key={index} speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <Text3D
            font="/fonts/helvetiker_bold.typeface.json"
            size={textSize}
            height={0.2}
            curveSegments={32}
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.02}
            bevelOffset={0}
            bevelSegments={5}
            position={[0, -index * textSize * 1.2, 0]}
            material={getMaterial()}
          >
            {line}
          </Text3D>
        </Float>
      ))}
    </group>
  );
};

export default CountdownText;