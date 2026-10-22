import { motion, AnimatePresence } from 'framer-motion';
import {
  Hand,
  MousePointer,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Pause,
  Focus,
  Grab
} from 'lucide-react';
import type { GestureType, HandGestureState } from '../../types/solar';

interface GestureIndicatorProps {
  gestureState: HandGestureState;
  isPaused: boolean;
  enabled: boolean;
}

export function GestureIndicator({ gestureState, isPaused, enabled }: GestureIndicatorProps) {
  if (!enabled || gestureState.gesture === 'NONE') return null;

  const getGestureInfo = (gesture: GestureType) => {
    switch (gesture) {
      case 'OPEN_PALM':
        return {
          label: isPaused ? 'Resume Orbit' : 'Pause Orbit',
          sub: 'Open Palm',
          icon: <Pause className="w-5 h-5 text-space-gold" />,
          color: '#FDB813',
          border: 'border-yellow-400/40'
        };
      case 'PINCH':
        return {
          label: 'Select Target',
          sub: 'Index & Thumb Pinch',
          icon: <Focus className="w-5 h-5 text-space-electric" />,
          color: '#00F0FF',
          border: 'border-cyan-400/50'
        };
      case 'POINTING':
        return {
          label: 'Pan & Rotate',
          sub: 'Pointing Finger',
          icon: <MousePointer className="w-5 h-5 text-space-cyan" />,
          color: '#48E5C2',
          border: 'border-emerald-400/40'
        };
      case 'FIST':
        return {
          label: 'Drag Orbit',
          sub: 'Closed Fist',
          icon: <Grab className="w-5 h-5 text-purple-400" />,
          color: '#A855F7',
          border: 'border-purple-400/40'
        };
      case 'PEACE':
        return {
          label: 'Reset Overview',
          sub: 'Peace Sign (V)',
          icon: <RotateCcw className="w-5 h-5 text-green-400" />,
          color: '#4ADE80',
          border: 'border-green-400/40'
        };
      case 'THUMBS_UP':
        return {
          label: 'Zooming In',
          sub: 'Thumbs Up',
          icon: <ZoomIn className="w-5 h-5 text-sky-400" />,
          color: '#38BDF8',
          border: 'border-sky-400/40'
        };
      case 'THUMBS_DOWN':
        return {
          label: 'Zooming Out',
          sub: 'Thumbs Down',
          icon: <ZoomOut className="w-5 h-5 text-amber-400" />,
          color: '#F59E0B',
          border: 'border-amber-400/40'
        };
      default:
        return {
          label: 'Hand Active',
          sub: 'Detected',
          icon: <Hand className="w-5 h-5 text-slate-300" />,
          color: '#FFFFFF',
          border: 'border-white/20'
        };
    }
  };

  const info = getGestureInfo(gestureState.gesture);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 15, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.95 }}
        transition={{ duration: 0.15 }}
        className="fixed bottom-24 left-4 z-30 pointer-events-none"
      >
        <div
          className={`glass-panel px-4 py-2.5 rounded-2xl flex items-center gap-3.5 shadow-2xl border ${info.border}`}
        >
          {/* Animated Icon Circle */}
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg relative"
            style={{
              backgroundColor: `${info.color}20`,
              boxShadow: `0 0 16px ${info.color}35`
            }}
          >
            {info.icon}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-white">
                {info.label}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                {Math.round(gestureState.confidence * 100)}%
              </span>
            </div>
            <div className="text-[11px] text-slate-300">{info.sub}</div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
