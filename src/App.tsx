import { useState } from 'react';
import { Clock, Type, Palette, Layout } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from './store';
import CountdownDisplay from './components/CountdownDisplay';
import BackgroundEffects from './components/BackgroundEffects';
import ExportButton from './components/ExportButton';

const themes = [
  { id: 'cyber', name: 'Cyber', bg: 'bg-gradient-to-br from-blue-900 via-black to-purple-900' },
  { id: 'neon', name: 'Neon', bg: 'bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500' },
  { id: 'minimal', name: 'Minimal', bg: 'bg-gradient-to-br from-gray-900 to-gray-800' },
  { id: 'nature', name: 'Nature', bg: 'bg-gradient-to-br from-green-800 via-green-900 to-black' },
  { id: 'ocean', name: 'Ocean', bg: 'bg-gradient-to-br from-blue-800 via-blue-900 to-black' },
  { id: 'sunset', name: 'Sunset', bg: 'bg-gradient-to-br from-orange-500 via-red-500 to-pink-500' },
  { id: 'galaxy', name: 'Galaxy', bg: 'bg-gradient-to-br from-purple-900 via-violet-900 to-black' },
  { id: 'aurora', name: 'Aurora', bg: 'bg-gradient-to-br from-green-400 via-cyan-900 to-blue-900' },
  { id: 'synthwave', name: 'Synthwave', bg: 'bg-gradient-to-br from-pink-700 via-purple-800 to-indigo-900' },
  { id: 'matrix', name: 'Matrix', bg: 'bg-gradient-to-br from-green-900 via-green-800 to-black' }
];

const textStyles = [
  { id: 'modern', name: 'Modern' },
  { id: 'neon', name: 'Neon' },
  { id: 'retro', name: 'Retro' },
  { id: 'futuristic', name: 'Futuristic' },
  { id: 'pixel', name: 'Pixel' },
  { id: 'glitch', name: 'Glitch' },
  { id: 'hologram', name: 'Hologram' },
  { id: 'shadow', name: 'Shadow' },
  { id: 'outline', name: 'Outline' },
  { id: 'gradient', name: 'Gradient' }
];

export default function App() {
  const store = useStore();
  const [showControls, setShowControls] = useState(true);

  return (
    <div className={`min-h-screen ${store.theme} transition-colors duration-700`}>
      <BackgroundEffects />
      
      <div className="relative w-full min-h-screen flex items-center justify-center">
        <CountdownDisplay />

        <button 
          onClick={() => setShowControls(!showControls)}
          className="fixed top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          <Layout size={24} />
        </button>

        <ExportButton />

        <AnimatePresence>
          {showControls && (
            <motion.div
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              className="fixed inset-y-0 left-0 w-80 bg-black/80 p-6 text-white space-y-6 overflow-y-auto backdrop-blur-sm"
            >
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Clock className="text-blue-400" size={24} />
                Countdown Controls
              </h2>
              
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <Clock className="text-blue-400" size={18} />
                  Target Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={store.targetDate.toISOString().slice(0, 16)}
                  onChange={(e) => store.setTargetDate(new Date(e.target.value))}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm 
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <Type className="text-purple-400" size={18} />
                  Custom Text
                </label>
                <textarea
                  value={store.customText}
                  onChange={(e) => store.setCustomText(e.target.value)}
                  placeholder="Enter custom text..."
                  rows={2}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm
                           focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <Palette className="text-red-400" size={18} />
                  Text Color
                </label>
                <input
                  type="color"
                  value={store.textColor}
                  onChange={(e) => store.setTextColor(e.target.value)}
                  className="w-full h-10 rounded-lg cursor-pointer bg-transparent"
                />
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <Palette className="text-green-400" size={18} />
                  Theme
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {themes.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => store.setTheme(theme.bg)}
                      className={`px-3 py-2 rounded-lg text-sm transition-colors
                        ${store.theme === theme.bg 
                          ? 'bg-green-500 hover:bg-green-600' 
                          : 'bg-white/10 hover:bg-white/20'
                        }`}
                    >
                      {theme.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <Type className="text-yellow-400" size={18} />
                  Text Style
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {textStyles.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => store.setTextStyle(style.id)}
                      className={`px-3 py-2 rounded-lg text-sm transition-colors
                        ${store.textStyle === style.id
                          ? 'bg-yellow-500 hover:bg-yellow-600' 
                          : 'bg-white/10 hover:bg-white/20'
                        }`}
                    >
                      {style.name}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}