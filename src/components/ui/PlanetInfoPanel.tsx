import { motion } from 'framer-motion';
import {
  X,
  Compass,
  Thermometer,
  RotateCw,
  Orbit,
  CircleDot,
  Scale,
  Sparkles,
  Info
} from 'lucide-react';
import type { PlanetData } from '../../types/solar';
import { soundService } from '../../services/soundEffects';

interface PlanetInfoPanelProps {
  planet: PlanetData | null;
  onClose: () => void;
}

export function PlanetInfoPanel({ planet, onClose }: PlanetInfoPanelProps) {
  if (!planet) return null;

  return (
    <motion.aside
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '100%', opacity: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed right-4 top-20 bottom-24 w-96 max-w-[calc(100vw-2rem)] z-30 glass-panel rounded-2xl flex flex-col shadow-2xl border border-white/10 overflow-hidden"
    >
      {/* Header with glow accent */}
      <div
        className="relative p-5 border-b border-white/10"
        style={{
          background: `linear-gradient(135deg, ${planet.glowColor}15, transparent)`
        }}
      >
        <div className="flex items-start justify-between">
          <div>
            <span
              className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-1 border"
              style={{
                borderColor: `${planet.color}40`,
                backgroundColor: `${planet.color}15`,
                color: planet.color
              }}
            >
              {planet.category}
            </span>
            <h2 className="text-2xl font-bold font-heading text-white tracking-wide flex items-center gap-2">
              <span
                className="w-3.5 h-3.5 rounded-full shadow-lg"
                style={{
                  backgroundColor: planet.color,
                  boxShadow: `0 0 12px ${planet.glowColor}`
                }}
              />
              {planet.name}
            </h2>
            <p className="text-xs text-slate-400 mt-1 italic">{planet.tagline}</p>
          </div>

          <button
            onClick={() => {
              soundService.playClick();
              onClose();
            }}
            className="p-1.5 rounded-xl bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-colors"
            title="Close Panel (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Scrollable details */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5 text-sm">
        {/* Description */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-space-cyan" /> Overview
          </h3>
          <p className="text-slate-300 text-xs leading-relaxed">{planet.description}</p>
        </div>

        {/* Quick scientific stats grid */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-space-electric" /> Astronomical Data
          </h3>

          <div className="grid grid-cols-2 gap-2 text-xs">
            {/* Radius */}
            <div className="bg-white/5 p-2.5 rounded-xl border border-white/5">
              <div className="text-slate-400 flex items-center gap-1 mb-0.5">
                <CircleDot className="w-3 h-3 text-space-cyan" /> Diameter
              </div>
              <div className="font-semibold text-white">
                {(planet.actualRadiusKm * 2).toLocaleString()} km
              </div>
            </div>

            {/* Distance from Sun */}
            <div className="bg-white/5 p-2.5 rounded-xl border border-white/5">
              <div className="text-slate-400 flex items-center gap-1 mb-0.5">
                <Orbit className="w-3 h-3 text-space-violet" /> Distance
              </div>
              <div className="font-semibold text-white">
                {planet.actualDistanceKm === 0
                  ? 'Center'
                  : `${planet.actualDistanceKm.toLocaleString()}M km`}
              </div>
            </div>

            {/* Orbital Period */}
            <div className="bg-white/5 p-2.5 rounded-xl border border-white/5">
              <div className="text-slate-400 flex items-center gap-1 mb-0.5">
                <Orbit className="w-3 h-3 text-space-gold" /> Orbit Period
              </div>
              <div className="font-semibold text-white">
                {planet.orbitPeriodDays === 0
                  ? 'N/A'
                  : planet.orbitPeriodDays > 365
                  ? `${(planet.orbitPeriodDays / 365.25).toFixed(1)} yrs`
                  : `${planet.orbitPeriodDays} days`}
              </div>
            </div>

            {/* Day Length */}
            <div className="bg-white/5 p-2.5 rounded-xl border border-white/5">
              <div className="text-slate-400 flex items-center gap-1 mb-0.5">
                <RotateCw className="w-3 h-3 text-space-cyan" /> Day Length
              </div>
              <div className="font-semibold text-white">
                {Math.abs(planet.rotationPeriodHours) > 24
                  ? `${(Math.abs(planet.rotationPeriodHours) / 24).toFixed(1)} Earth days`
                  : `${Math.abs(planet.rotationPeriodHours)} hrs`}
              </div>
            </div>

            {/* Temperature */}
            <div className="bg-white/5 p-2.5 rounded-xl border border-white/5">
              <div className="text-slate-400 flex items-center gap-1 mb-0.5">
                <Thermometer className="w-3 h-3 text-red-400" /> Avg Temp
              </div>
              <div className="font-semibold text-white">{planet.temperatureAvgC}°C</div>
            </div>

            {/* Surface Gravity */}
            <div className="bg-white/5 p-2.5 rounded-xl border border-white/5">
              <div className="text-slate-400 flex items-center gap-1 mb-0.5">
                <Scale className="w-3 h-3 text-purple-400" /> Gravity
              </div>
              <div className="font-semibold text-white">{planet.gravityMps2} m/s²</div>
            </div>
          </div>
        </div>

        {/* Atmosphere */}
        {planet.atmosphere.length > 0 && (
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Atmosphere Composition
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {planet.atmosphere.map((gas, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-xs text-slate-300"
                >
                  {gas}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Geology */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
            Geology & Structure
          </h3>
          <p className="text-slate-300 text-xs leading-relaxed">{planet.geology}</p>
        </div>

        {/* Fun Facts */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-space-gold mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-space-gold" /> Astronomical Fun Facts
          </h3>
          <ul className="space-y-2">
            {planet.funFacts.map((fact, idx) => (
              <li
                key={idx}
                className="p-2.5 rounded-xl bg-space-gold/5 border border-space-gold/20 text-xs text-slate-200 leading-snug flex items-start gap-2"
              >
                <span className="text-space-gold font-bold">✦</span>
                <span>{fact}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom return action */}
      <div className="p-3 border-t border-white/10 bg-black/30">
        <button
          onClick={() => {
            soundService.playClick();
            onClose();
          }}
          className="w-full py-2 px-4 rounded-xl bg-gradient-to-r from-space-nebula to-space-accent hover:from-space-accent hover:to-space-violet text-white text-xs font-medium tracking-wide transition-all shadow-md flex items-center justify-center gap-2"
        >
          <Orbit className="w-4 h-4 text-space-cyan" />
          Return to Solar Overview
        </button>
      </div>
    </motion.aside>
  );
}
