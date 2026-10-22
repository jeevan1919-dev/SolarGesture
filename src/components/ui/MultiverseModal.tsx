import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Orbit, Zap, Flame, Snowflake, Globe, ArrowRight } from 'lucide-react';
import type { UniverseId, UniverseTheme } from '../../types/solar';
import { UNIVERSES } from '../../data/planets';
import { soundService } from '../../services/soundEffects';

interface MultiverseModalProps {
  isOpen: boolean;
  activeUniverseId: UniverseId;
  onSelectUniverse: (universe: UniverseTheme) => void;
  onClose: () => void;
}

export function MultiverseModal({
  isOpen,
  activeUniverseId,
  onSelectUniverse,
  onClose
}: MultiverseModalProps) {
  if (!isOpen) return null;

  const getUniverseIcon = (id: UniverseId) => {
    switch (id) {
      case 'prime':
        return <Orbit className="w-5 h-5 text-space-cyan" />;
      case 'cyberpunk':
        return <Zap className="w-5 h-5 text-pink-400" />;
      case 'inferno':
        return <Flame className="w-5 h-5 text-amber-500" />;
      case 'cryo':
        return <Snowflake className="w-5 h-5 text-sky-400" />;
      case 'exoplanets':
        return <Globe className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="glass-panel w-full max-w-3xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/15 max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-5 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-space-void border border-space-electric/40 flex items-center justify-center shadow-glow-cyan">
                <Sparkles className="w-6 h-6 text-space-cyan animate-pulse" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold font-heading text-white flex items-center gap-2">
                  MULTIVERSE <span className="text-space-electric">GATEWAY</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Quantum spacetime warping across alternate cosmic realities and exotic alien star systems.
                </p>
              </div>
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

          {/* Universe Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mt-6">
            {UNIVERSES.map((universe) => {
              const isActive = activeUniverseId === universe.id;

              return (
                <div
                  key={universe.id}
                  onClick={() => {
                    soundService.playWhoosh();
                    onSelectUniverse(universe);
                    onClose();
                  }}
                  className={`p-4 rounded-3xl border cursor-pointer transition-all duration-300 relative overflow-hidden group ${
                    isActive
                      ? 'bg-white/10 border-space-electric shadow-glow-cyan'
                      : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10'
                  }`}
                >
                  {/* Subtle color flare in corner */}
                  <div
                    className="absolute -top-12 -right-12 w-28 h-28 rounded-full blur-2xl opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity"
                    style={{ backgroundColor: universe.starGlow }}
                  />

                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center border shrink-0"
                        style={{
                          backgroundColor: `${universe.starGlow}20`,
                          borderColor: `${universe.starGlow}40`
                        }}
                      >
                        {getUniverseIcon(universe.id)}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold font-heading text-white tracking-wide">
                            {universe.name}
                          </h3>
                          <span className="text-[10px] px-1.5 py-0.5 rounded font-mono font-bold bg-white/10 text-slate-200">
                            {universe.badge}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400">{universe.subtitle}</p>
                      </div>
                    </div>

                    {isActive && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-space-electric/20 text-space-electric font-semibold border border-space-electric/40">
                        WARPED IN
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {universe.description}
                  </p>

                  <div className="mt-3.5 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-400">Stellar Corona:</span>
                      <span
                        className="w-3 h-3 rounded-full shadow-sm"
                        style={{
                          backgroundColor: universe.starColor,
                          boxShadow: `0 0 8px ${universe.starGlow}`
                        }}
                      />
                    </div>

                    <span className="text-space-cyan font-semibold text-xs flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      {isActive ? 'Current Timeline' : 'Warp Here'}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer note */}
          <div className="mt-6 pt-4 border-t border-white/10 text-center text-xs text-slate-400">
            Warping shifts stellar classification, orbital geometries, atmospheric hues, and unlocks exotic exoplanetary systems!
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
