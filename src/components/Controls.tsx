import { Clock, Type, Palette } from 'lucide-react';
import { useStore } from '../store';

export default function Controls() {
  const store = useStore();

  return (
    <div className="fixed inset-y-0 left-0 w-80 bg-black/80 p-6 text-white space-y-6 overflow-y-auto backdrop-blur-sm">
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
          <Type className="text-yellow-400" size={18} />
          Font Size
        </label>
        <div className="space-y-2">
          <input
            type="range"
            min="0.5"
            max="3"
            step="0.1"
            value={store.fontSize}
            onChange={(e) => store.setFontSize(Number(e.target.value))}
            className="w-full accent-yellow-500"
          />
          <div className="text-right text-sm text-yellow-400">
            {store.fontSize.toFixed(1)}x
          </div>
        </div>
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
          Background Color
        </label>
        <input
          type="color"
          value={store.background}
          onChange={(e) => store.setBackground(e.target.value)}
          className="w-full h-10 rounded-lg cursor-pointer bg-transparent"
        />
      </div>
    </div>
  );
}