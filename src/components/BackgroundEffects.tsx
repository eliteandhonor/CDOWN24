import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store';

export default function BackgroundEffects() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useStore();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Particle[] = [];
    const particleCount = 150; // Increased particle count

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      color: string;
      angle: number;
      angleSpeed: number;
      amplitude: number;

      constructor() {
        this.reset();
        // Start particles from random positions
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
      }

      reset() {
        // Start new particles from bottom
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 10;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = -Math.random() * 3 - 1; // Negative for upward movement
        this.opacity = Math.random() * 0.6 + 0.2;
        this.color = theme.includes('sunset') ? '#FFE4E1' : '#FFFFFF';
        this.angle = Math.random() * Math.PI * 2;
        this.angleSpeed = Math.random() * 0.02 - 0.01;
        this.amplitude = Math.random() * 1.5;
      }

      update() {
        this.y += this.speedY;
        this.x += Math.sin(this.angle) * this.amplitude + this.speedX;
        this.angle += this.angleSpeed;

        // Fade out as particles rise
        this.opacity -= 0.002;

        // Reset particle when it goes off screen or becomes transparent
        if (this.y < -10 || this.opacity <= 0) {
          this.reset();
        }
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // Create initial particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let animationFrameId: number;

    function animate() {
      if (!ctx || !canvas) return;
      
      // Clear canvas with slight fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
      />
      <motion.div
        className="fixed inset-0 bg-gradient-to-br opacity-30"
        style={{ zIndex: 0 }}
        animate={{ 
          background: theme.includes('sunset') 
            ? ['linear-gradient(to bottom right, #ff6b6b, #4ecdc4)', 'linear-gradient(to bottom right, #4ecdc4, #ff6b6b)'] 
            : undefined 
        }}
        transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
      />
    </>
  );
}