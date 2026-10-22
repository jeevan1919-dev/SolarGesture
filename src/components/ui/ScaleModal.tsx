import { motion, AnimatePresence } from 'framer-motion';
import { X, Info, Globe, Compass } from 'lucide-react';
import { SCALE_DISCLAIMER } from '../../data/planets';
import { soundService } from '../../services/soundEffects';

interface ScaleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ScaleModal({ isOpen, onClose }: ScaleModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="glass-panel w-full max-w-md rounded-3xl p-6 border border-white/15 shadow-2xl"
        >
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h3 className="text-sm font-semibold font-heading text-white flex items-center gap-2">
              <Info className="w-4 h-4 text-space-cyan" />
              {SCALE_DISCLAIMER.title}
            </h3>
            <button
              onClick={() => {
                soundService.playClick();
                onClose();
              }}
              className="p-1.5 rounded-xl bg-white/5 hover:bg-white/15 text-slate-300"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-4 space-y-3 text-xs text-slate-300 leading-relaxed">
            <p>{SCALE_DISCLAIMER.content}</p>

            <div className="bg-white/5 p-3 rounded-xl border border-white/5 space-y-2 text-[11px]">
              <div className="flex items-start gap-2">
                <Globe className="w-3.5 h-3.5 text-space-gold shrink-0 mt-0.5" />
                <span>
                  <strong>Planetary Sizes:</strong> Real planets are vastly different in size; Jupiter is 1,300 times larger than Earth, while Mercury is barely larger than our Moon.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Compass className="w-3.5 h-3.5 text-space-electric shrink-0 mt-0.5" />
                <span>
                  <strong>Cosmic Distances:</strong> Space is mostly empty void. True-to-scale planets would be microscopic sub-pixels invisible at solar-system distances!
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              soundService.playClick();
              onClose();
            }}
            className="mt-5 w-full py-2.5 rounded-xl bg-space-nebula hover:bg-space-accent text-white text-xs font-semibold transition-colors"
          >
            Understood
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
