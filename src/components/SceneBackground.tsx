import React, { useMemo } from 'react';
import { useThree } from '@react-three/fiber';
import { Cloud, Sky } from '@react-three/drei';
import * as THREE from 'three';
import { BackgroundType } from '../types';

interface SceneBackgroundProps {
  type: BackgroundType;
}

const SceneBackground: React.FC<SceneBackgroundProps> = ({ type }) => {
  const { scene } = useThree();

  useMemo(() => {
    switch (type) {
      case 'ocean':
        scene.background = new THREE.Color('#001B3A');
        scene.fog = new THREE.FogExp2('#001B3A', 0.002);
        break;
      case 'sunset':
        scene.background = new THREE.Color('#FF6B6B');
        scene.fog = new THREE.FogExp2('#FF6B6B', 0.001);
        break;
      case 'cyber':
        scene.background = new THREE.Color('#000033');
        scene.fog = new THREE.FogExp2('#000033', 0.002);
        break;
      case 'aurora':
        scene.background = new THREE.Color('#001122');
        scene.fog = new THREE.FogExp2('#001122', 0.001);
        break;
      case 'galaxy':
        scene.background = new THREE.Color('#000000');
        scene.fog = new THREE.FogExp2('#000000', 0.001);
        break;
      default:
        scene.background = new THREE.Color('#0a0a0a');
        scene.fog = new THREE.FogExp2('#0a0a0a', 0.002);
    }
  }, [type, scene]);

  switch (type) {
    case 'ocean':
      return (
        <>
          <Sky
            distance={450000}
            sunPosition={[0, 0.2, -1]}
            inclination={0.3}
            azimuth={0.25}
            mieCoefficient={0.01}
            mieDirectionalG={0.8}
            rayleigh={3}
            turbidity={10}
          />
          <Cloud
            opacity={0.5}
            speed={0.4}
            width={20}
            depth={5}
            segments={20}
            position={[0, -2, -15]}
          />
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]}>
            <planeGeometry args={[100, 100, 50, 50]} />
            <meshPhysicalMaterial
              color="#006994"
              metalness={0.9}
              roughness={0.1}
              transmission={0.6}
              thickness={0.5}
              opacity={0.8}
              transparent
            />
          </mesh>
        </>
      );
    case 'sunset':
      return (
        <>
          <Sky
            distance={450000}
            sunPosition={[0, 0.05, -1]}
            inclination={0.6}
            azimuth={0.5}
            mieCoefficient={0.01}
            mieDirectionalG={0.8}
            rayleigh={2}
            turbidity={10}
          />
          <Cloud
            opacity={0.6}
            speed={0.3}
            width={30}
            depth={4}
            segments={25}
            position={[0, 5, -20]}
            color="#FF9999"
          />
          <directionalLight
            position={[0, 3, -10]}
            intensity={2}
            color="#FF6B6B"
          />
        </>
      );
    case 'cyber':
      return (
        <>
          <Sky
            distance={450000}
            sunPosition={[0, -0.5, -1]}
            inclination={0.1}
            azimuth={0.25}
            mieCoefficient={0.01}
            mieDirectionalG={0.8}
            rayleigh={1}
            turbidity={10}
          />
          <Cloud
            opacity={0.3}
            speed={0.2}
            width={20}
            depth={3}
            segments={20}
            position={[0, 5, -15]}
            color="#00ffff"
          />
        </>
      );
    case 'aurora':
      return (
        <>
          <Sky
            distance={450000}
            sunPosition={[0, -0.3, -1]}
            inclination={0.2}
            azimuth={0.25}
            mieCoefficient={0.01}
            mieDirectionalG={0.8}
            rayleigh={2}
            turbidity={10}
          />
          <Cloud
            opacity={0.4}
            speed={0.1}
            width={30}
            depth={4}
            segments={25}
            position={[0, 8, -20]}
            color="#00ff88"
          />
        </>
      );
    default:
      return null;
  }
};

export default SceneBackground;