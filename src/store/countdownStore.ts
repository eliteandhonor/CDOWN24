import { create } from 'zustand';

interface CountdownState {
  targetDate: Date;
  customText: string;
  theme: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
  effects: {
    bloom: boolean;
    particles: boolean;
    noise: boolean;
    glitch: boolean;
  };
  animation: {
    speed: number;
    intensity: number;
    pattern: 'rotate' | 'float' | 'bounce' | 'wave';
  };
  setTargetDate: (date: Date) => void;
  setCustomText: (text: string) => void;
  setTheme: (theme: Partial<CountdownState['theme']>) => void;
  setEffects: (effects: Partial<CountdownState['effects']>) => void;
  setAnimation: (animation: Partial<CountdownState['animation']>) => void;
}

export const useCountdownStore = create<CountdownState>((set) => ({
  targetDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
  customText: '',
  theme: {
    primary: '#00ff88',
    secondary: '#ff00ff',
    accent: '#00ffff',
    background: '#000033'
  },
  effects: {
    bloom: true,
    particles: true,
    noise: false,
    glitch: false
  },
  animation: {
    speed: 1,
    intensity: 1,
    pattern: 'float'
  },
  setTargetDate: (date) => set({ targetDate: date }),
  setCustomText: (text) => set({ customText: text }),
  setTheme: (theme) => set((state) => ({ theme: { ...state.theme, ...theme } })),
  setEffects: (effects) => set((state) => ({ effects: { ...state.effects, ...effects } })),
  setAnimation: (animation) => set((state) => ({ animation: { ...state.animation, ...animation } }))
}));