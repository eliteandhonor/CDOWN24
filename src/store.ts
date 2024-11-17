import { create } from 'zustand';

interface State {
  targetDate: Date;
  customText: string;
  textColor: string;
  theme: string;
  textStyle: string;
  setTargetDate: (date: Date) => void;
  setCustomText: (text: string) => void;
  setTextColor: (color: string) => void;
  setTheme: (theme: string) => void;
  setTextStyle: (style: string) => void;
}

export const useStore = create<State>((set) => ({
  targetDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
  customText: '',
  textColor: '#ffffff',
  theme: 'bg-gradient-to-br from-blue-900 via-black to-purple-900',
  textStyle: 'modern',
  setTargetDate: (date) => set({ targetDate: date }),
  setCustomText: (text) => set({ customText: text }),
  setTextColor: (color) => set({ textColor: color }),
  setTheme: (theme) => set({ theme }),
  setTextStyle: (style) => set({ textStyle: style })
}));