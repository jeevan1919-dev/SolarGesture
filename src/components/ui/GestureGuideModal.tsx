import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Hand,
  Focus,
  MousePointer,
  RotateCcw,
  ZoomIn,
  Grab,
  Keyboard,
  Mouse
} from 'lucide-react';
import { soundService } from '../../services/soundEffects';

interface GestureGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GestureGuideModal({ isOpen, onClose }: GestureGuideModalProps) {
  if (!isOpen) return null;

  const gestures = [
    {
      name: 'Open Palm',
      action: 'Pause / Resume Orbit',
      description: 'Hold all 5 fingers spread out to pause or resume planetary motion.',
      icon: <Hand className="w-5 h-5 text-space-gold" />,
      tag: '🖐️ 5 Fingers Open'
    },
    {
      name: 'Pinch Fingers',
      action: 'Select Planet / Target',
      description: 'Bring thumb and index fingertips together to lock onto celestial bodies.',
      icon: <Focus className="w-5 h-5 text-space-electric" />,
      tag: '👌 Thumb + Index'
    },
    {
      name: 'Pointing Finger',
      action: 'Rotate Camera',
      description: 'Extend only your index finger and move it across the frame to rotate the 3D scene.',
      icon: <MousePointer className="w-5 h-5 text-space-cyan" />,
      tag: '☝️ 1 Finger'
    },
    {
      name: 'Closed Fist',
      action: 'Drag Orbit',
      description: 'Curl all fingers into a fist to grab and rotate the cosmic perspective smoothly.',
      icon: <Grab className="w-5 h-5 text-purple-400" />,
      tag: '✊ Fist'
    },
    {
      name: 'Peace Sign (V)',
      action: 'Reset to Overview',
      description: 'Raise index and middle fingers in a V-shape to center the camera on the Sun.',
      icon: <RotateCcw className="w-5 h-5 text-green-400" />,
      tag: '✌️ 2 Fingers'
    },
    {
      name: 'Thumbs Up / Down',
      action: 'Zoom In / Out',
      description: 'Point your thumb upward to fly in closer, or downward to pull back into deep space.',
      icon: <ZoomIn className="w-5 h-5 text-sky-400" />,
      tag: '👍 / 👎 Thumbs'
    }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 15 }}
          className="glass-panel w-full max-w-2xl rounded-3xl p-6 shadow-2xl border border-white/15 max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div>
              <h2 className="text-xl font-bold font-heading text-white flex items-center gap-2">
                <span className="text-space-cyan">✦</span> Hand Gesture & Controls Guide
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Master intuitive webcam gestures or seamless keyboard & mouse shortcuts.
              </p>
            </div>
            <button
              onClick={() => {
                soundService.playClick();
                onClose();
              }}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Gesture Cards Grid */}
          <div className="mt-5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-space-cyan mb-3 flex items-center gap-2">
              <Hand className="w-4 h-4" /> Real-Time Hand Gestures
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {gestures.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white/5 p-3.5 rounded-2xl border border-white/5 hover:border-space-cyan/30 transition-all flex items-start gap-3"
                >
                  <div className="p-2.5 rounded-xl bg-space-void border border-white/10 shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white text-xs">{item.name}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/10 text-slate-300">
                        {item.tag}
                      </span>
                    </div>
                    <div className="text-xs font-medium text-space-electric mt-0.5">
                      {item.action}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1 leading-snug">
                      {item.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mouse & Keyboard Fallback */}
          <div className="mt-6 pt-5 border-t border-white/10">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-space-gold mb-3 flex items-center gap-2">
              <Mouse className="w-4 h-4" /> Mouse & Keyboard Fallbacks
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
              <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                <div className="font-semibold text-white flex items-center gap-1.5 mb-1">
                  <Mouse className="w-3.5 h-3.5 text-space-cyan" /> Click & Drag
                </div>
                <div className="text-slate-400 text-[11px]">
                  Left-click and drag to rotate the camera around any planet.
                </div>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                <div className="font-semibold text-white flex items-center gap-1.5 mb-1">
                  <Keyboard className="w-3.5 h-3.5 text-space-violet" /> Spacebar & R
                </div>
                <div className="text-slate-400 text-[11px]">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-[10px]">Space</kbd> = Pause/Resume<br />
                  <kbd className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-[10px]">R</kbd> = Reset view
                </div>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                <div className="font-semibold text-white flex items-center gap-1.5 mb-1">
                  <ZoomIn className="w-3.5 h-3.5 text-space-gold" /> Scroll Wheel
                </div>
                <div className="text-slate-400 text-[11px]">
                  Scroll up or down to zoom smoothly in and out.
                </div>
              </div>
            </div>
          </div>

          {/* Close button */}
          <div className="mt-6 text-center">
            <button
              onClick={() => {
                soundService.playClick();
                onClose();
              }}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-space-nebula to-space-accent hover:from-space-accent hover:to-space-violet text-white text-xs font-semibold tracking-wide transition-all shadow-lg"
            >
              Got It, Let's Explore!
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
