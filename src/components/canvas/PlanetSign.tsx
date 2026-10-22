import { useState } from 'react';
import { Html } from '@react-three/drei';
import { Compass, ExternalLink } from 'lucide-react';
import type { PlanetData } from '../../types/solar';
import { soundService } from '../../services/soundEffects';

interface PlanetSignProps {
  planet: PlanetData;
  isSelected: boolean;
  onSelect: (planet: PlanetData) => void;
  accentColor?: string;
}

export function PlanetSign({ planet, isSelected, onSelect, accentColor = '#00F0FF' }: PlanetSignProps) {
  const [hovered, setHovered] = useState(false);

  // Position the sign comfortably above the planet radius
  const yOffset = planet.radius + 1.8;

  return (
    <Html
      position={[0, yOffset, 0]}
      center
      distanceFactor={42}
      style={{
        pointerEvents: 'auto',
        userSelect: 'none',
        transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
      }}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          soundService.playPlanetSelect();
          onSelect(planet);
        }}
        onMouseEnter={() => {
          setHovered(true);
          soundService.playClick(900);
        }}
        onMouseLeave={() => setHovered(false)}
        className={`group cursor-pointer flex flex-col items-center transition-all duration-300 transform ${
          hovered || isSelected ? 'scale-110 -translate-y-1' : 'scale-95 opacity-90 hover:opacity-100'
        }`}
      >
        {/* Holographic vertical beacon tether */}
        <div
          className="w-0.5 h-4 mb-1 transition-all"
          style={{
            background: `linear-gradient(to top, ${planet.glowColor}, transparent)`,
            boxShadow: `0 0 8px ${planet.glowColor}`
          }}
        />

        {/* 3D Celestial Signpost Badge */}
        <div
          className={`px-3 py-1.5 rounded-2xl backdrop-blur-xl border transition-all flex items-center gap-2 shadow-2xl ${
            isSelected
              ? 'bg-space-deep/90 border-space-electric shadow-glow-cyan text-white'
              : hovered
              ? 'bg-space-deep/90 border-space-cyan shadow-glow-cyan text-white'
              : 'bg-space-darkest/75 border-white/15 text-slate-200 hover:border-white/30'
          }`}
          style={{
            boxShadow: isSelected
              ? `0 0 20px ${planet.glowColor}60, 0 8px 32px rgba(0,0,0,0.6)`
              : undefined
          }}
        >
          {/* Astronomical Glyph Circle */}
          <div
            className="w-6 h-6 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 transition-transform group-hover:rotate-12"
            style={{
              backgroundColor: `${planet.color}25`,
              color: planet.color,
              border: `1px solid ${planet.color}60`,
              boxShadow: `0 0 10px ${planet.glowColor}40`
            }}
          >
            {planet.glyph || '✦'}
          </div>

          {/* Planet Name and Subtitle */}
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-1.5 leading-none">
              <span className="font-heading text-xs font-bold tracking-wider">{planet.name}</span>
              {isSelected && (
                <span className="text-[9px] px-1 py-0.2 rounded bg-space-electric/20 text-space-electric font-mono font-semibold">
                  ACTIVE
                </span>
              )}
            </div>

            <span className="text-[10px] text-slate-400 font-mono mt-0.5">
              {planet.actualDistanceKm === 0
                ? 'Solar Core'
                : `${planet.actualDistanceKm.toLocaleString()}M km`}
            </span>
          </div>

          {/* Interactive Action Icon */}
          <div className="ml-1 text-slate-400 group-hover:text-space-cyan transition-colors">
            {isSelected ? (
              <Compass className="w-3.5 h-3.5 text-space-electric animate-spin-slow" />
            ) : (
              <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
            )}
          </div>
        </div>

        {/* Hover Hint Pill */}
        {hovered && !isSelected && (
          <div
            className="mt-1 px-2 py-0.5 rounded-full text-[9px] font-medium text-space-cyan bg-black/80 border border-space-cyan/40 shadow-lg tracking-wide uppercase animate-pulse"
            style={{ color: accentColor }}
          >
            Click or Pinch to Inspect
          </div>
        )}
      </div>
    </Html>
  );
}
