import { motion } from 'framer-motion';
import { Hand, Mouse, Sparkles, Orbit, Compass, ArrowRight } from 'lucide-react';
import { soundService } from '../../services/soundEffects';

interface WelcomeModalProps {
  onStartWithHand: () => void;
  onStartWithMouse: () => void;
}

export function WelcomeModal({ onStartWithHand, onStartWithMouse }: WelcomeModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-space-darkest/85 backdrop-blur-xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="glass-panel max-w-xl w-full rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl text-center relative overflow-hidden"
      >
        {/* Decorative background glow */}
        <div className="absolute -top-24 -left-24 w-60 h-60 bg-space-electric/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-space-violet/20 rounded-full blur-3xl pointer-events-none" />

        {/* Orbit icon badge */}
        <div className="mx-auto w-16 h-16 rounded-2xl bg-space-void border border-space-cyan/40 flex items-center justify-center shadow-glow-cyan mb-5 relative">
          <Orbit className="w-8 h-8 text-space-cyan animate-spin-slow" />
          <div className="absolute inset-0 rounded-2xl bg-space-cyan/10 animate-pulse" />
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-white tracking-wide glow-text-cyan">
          SOLAR<span className="text-space-electric">GESTURE</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-2 font-medium">
          Hand-Controlled 3D Solar System Explorer
        </p>

        {/* Feature bullets */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-6 text-left">
          <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
            <Hand className="w-4 h-4 text-space-cyan mb-1.5" />
            <h3 className="text-xs font-semibold text-white">MediaPipe AI</h3>
            <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
              Webcam hand tracking recognizes palm, pinch, point, & fist in real time.
            </p>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
            <Orbit className="w-4 h-4 text-space-gold mb-1.5" />
            <h3 className="text-xs font-semibold text-white">3D Solar System</h3>
            <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
              Sun, 8 planets, Saturn’s rings, Earth’s moon, and asteroid belt.
            </p>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
            <Compass className="w-4 h-4 text-space-violet mb-1.5" />
            <h3 className="text-xs font-semibold text-white">Planetary Telemetry</h3>
            <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
              Curated astronomical data, geology, atmospheres, and fun facts.
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-4">
          <button
            onClick={() => {
              soundService.playClick();
              onStartWithHand();
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-space-electric to-space-cyan text-space-darkest font-bold text-xs sm:text-sm tracking-wide shadow-glow-cyan hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <Hand className="w-4 h-4 text-space-darkest" />
            <span>Enable Hand Controls</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              soundService.playClick();
              onStartWithMouse();
            }}
            className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-slate-200 hover:text-white font-medium text-xs sm:text-sm tracking-wide border border-white/10 transition-all flex items-center justify-center gap-2"
          >
            <Mouse className="w-4 h-4 text-space-violet" />
            <span>Explore with Mouse</span>
          </button>
        </div>

        {/* Privacy Note */}
        <p className="text-[10px] text-slate-500 mt-5 flex items-center justify-center gap-1">
          <Sparkles className="w-3 h-3 text-space-cyan" />
          Camera streams are processed 100% locally in your browser. No video is ever stored or transmitted.
        </p>
      </motion.div>
    </div>
  );
}
