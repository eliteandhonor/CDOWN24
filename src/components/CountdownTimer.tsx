import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import gsap from 'gsap';

interface CountdownTimerProps {
  targetDate: Date;
  textColor: string;
  customText: string;
  rotationSpeed: number;
  particleColor: string;
  showCustomText: boolean;
  textStyle: '3d' | 'neon' | 'metallic';
  textSize: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDate,
  textColor,
  customText,
  rotationSpeed,
  particleColor,
  showCustomText,
  textStyle,
  textSize,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const textMeshRef = useRef<THREE.Mesh>();
  const currentTextRef = useRef<string>('');
  const particlesMeshRef = useRef<THREE.Points>();
  const glowLightRef = useRef<THREE.PointLight>();

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    sceneRef.current = new THREE.Scene();
    cameraRef.current = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    rendererRef.current = new THREE.WebGLRenderer({ antialias: true });

    const scene = sceneRef.current;
    const camera = cameraRef.current;
    const renderer = rendererRef.current;

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Background
    scene.background = new THREE.Color(0x0a0a0a);

    // Camera position
    camera.position.z = 15;

    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 5000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 50;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: new THREE.Color(particleColor),
    });

    particlesMeshRef.current = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMeshRef.current);

    // Font loader
    const fontLoader = new FontLoader();
    fontLoader.load('https://threejs.org/examples/fonts/helvetiker_bold.typeface.json', (font) => {
      const createText = (text: string) => {
        if (textMeshRef.current) {
          scene.remove(textMeshRef.current);
        }
        if (glowLightRef.current) {
          scene.remove(glowLightRef.current);
        }

        const textGeometry = new TextGeometry(text, {
          font,
          size: textSize,
          height: textStyle === '3d' ? 0.2 : 0.1,
          curveSegments: textStyle === 'neon' ? 32 : 12,
          bevelEnabled: true,
          bevelThickness: textStyle === '3d' ? 0.03 : 0.01,
          bevelSize: textStyle === '3d' ? 0.02 : 0.01,
          bevelOffset: 0,
          bevelSegments: textStyle === 'neon' ? 16 : 5,
        });

        textGeometry.center();

        const textMaterial = (() => {
          switch (textStyle) {
            case 'neon':
              return [
                new THREE.MeshPhongMaterial({ 
                  color: new THREE.Color(textColor),
                  emissive: new THREE.Color(textColor),
                  emissiveIntensity: 0.5,
                  shininess: 100 
                }),
                new THREE.MeshPhongMaterial({ 
                  color: new THREE.Color(textColor),
                  emissive: new THREE.Color(textColor),
                  emissiveIntensity: 0.5,
                  shininess: 100 
                })
              ];
            case 'metallic':
              return new THREE.MeshStandardMaterial({
                color: new THREE.Color(textColor),
                metalness: 1,
                roughness: 0.1,
                envMapIntensity: 1
              });
            default:
              return new THREE.MeshStandardMaterial({
                color: new THREE.Color(textColor),
                metalness: 0.7,
                roughness: 0.2
              });
          }
        })();

        textMeshRef.current = new THREE.Mesh(textGeometry, textMaterial);
        scene.add(textMeshRef.current);

        if (textStyle === 'neon') {
          glowLightRef.current = new THREE.PointLight(new THREE.Color(textColor), 1, 3);
          glowLightRef.current.position.copy(textMeshRef.current.position);
          scene.add(glowLightRef.current);
        }

        // Animate text appearance
        gsap.from(textMeshRef.current.scale, {
          x: 0,
          y: 0,
          z: 0,
          duration: 1,
          ease: 'elastic.out(1, 0.3)',
        });
      };

      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);

        if (showCustomText && customText) {
          if (customText !== currentTextRef.current) {
            currentTextRef.current = customText;
            createText(customText);
          }
        } else {
          const now = new Date().getTime();
          const distance = targetDate.getTime() - now;

          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);

          let timeString = '';
          
          if (distance < 0) {
            timeString = 'TIME IS UP!';
          } else if (days > 0) {
            timeString = `${days}d ${hours}h ${minutes}m`;
          } else {
            timeString = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
          }

          if (timeString !== currentTextRef.current) {
            currentTextRef.current = timeString;
            createText(timeString);
          }
        }

        if (particlesMeshRef.current) {
          particlesMeshRef.current.rotation.y += 0.0005 * rotationSpeed;
        }
        
        if (textMeshRef.current) {
          textMeshRef.current.rotation.y += 0.003 * rotationSpeed;
        }

        renderer.render(scene, camera);
      };

      animate();
    });

    // Handle window resize
    const handleResize = () => {
      if (!camera || !renderer) return;
      
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, [targetDate, textColor, customText, rotationSpeed, particleColor, showCustomText, textStyle, textSize]);

  return <div ref={containerRef} className="w-full h-screen" />;
};

export default CountdownTimer;