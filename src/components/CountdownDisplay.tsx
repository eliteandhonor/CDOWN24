import { motion } from 'framer-motion';
import { useStore } from '../store';
import { useCountdown } from '../hooks/useCountdown';

const textStyles = {
  modern: 'font-sans',
  neon: 'font-sans drop-shadow-[0_0_10px_rgba(255,255,255,0.7)] animate-pulse',
  retro: 'font-mono',
  futuristic: 'font-sans tracking-widest',
  pixel: 'font-mono tracking-tight',
  glitch: 'font-mono animate-glitch',
  hologram: 'font-sans animate-hologram opacity-90',
  shadow: 'font-sans drop-shadow-[2px_2px_8px_rgba(0,0,0,0.5)]',
  outline: 'font-sans text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300',
  gradient: 'font-sans text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500'
};

export default function CountdownDisplay() {
  const { customText, textStyle, textColor } = useStore();
  const timeLeft = useCountdown();

  const displayText = customText ? `${customText}\n${timeLeft}` : timeLeft;
  const lines = displayText.split('\n');

  return (
    <div className="text-center">
      {lines.map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ color: textColor }}
          className={`text-6xl md:text-8xl font-bold mb-4
            ${textStyles[textStyle as keyof typeof textStyles]}`}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {line}
        </motion.div>
      ))}
    </div>
  );
}