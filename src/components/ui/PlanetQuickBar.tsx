import type { PlanetData, UniverseTheme } from '../../types/solar';
import { soundService } from '../../services/soundEffects';
import { Sparkles } from 'lucide-react';

interface PlanetQuickBarProps {
  selectedPlanet: PlanetData | null;
  onSelectPlanet: (planet: PlanetData | null) => void;
  activePlanets: PlanetData[];
  universeTheme: UniverseTheme;
  onOpenMultiverse: () => void;
}

export function PlanetQuickBar({
  selectedPlanet,
  onSelectPlanet,
  activePlanets,
  universeTheme,
  onOpenMultiverse
}: PlanetQuickBarProps) {
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-30 max-w-[calc(100vw-2rem)] flex items-center gap-2 overflow-x-auto no-scrollbar">
      {/* 1. Multiverse Portal Button */}
      <button
        onClick={() => {
          soundService.playClick();
          onOpenMultiverse();
        }}
        className="glass-panel px-3 py-1.5 rounded-2xl flex items-center gap-1.5 shadow-glass border border-space-electric/40 hover:border-space-electric text-xs font-semibold text-white whitespace-nowrap transition-all group shrink-0"
        title="Open Multiverse Spacetime Portal"
      >
        <Sparkles className="w-3.5 h-3.5 text-space-cyan animate-pulse group-hover:rotate-45 transition-transform" />
        <span className="text-[11px] font-heading text-space-electric tracking-wide">
          {universeTheme.badge}
        </span>
      </button>

      {/* 2. Planetary Navigation Carousel with Astronomical Glyphs */}
      <div className="glass-panel px-3 py-1.5 rounded-2xl flex items-center gap-1 shadow-glass border border-white/10 shrink-0">
        {activePlanets.map((planet) => {
          const isSelected = selectedPlanet?.id === planet.id;
          return (
            <button
              key={planet.id}
              onClick={() => {
                soundService.playPlanetSelect();
                onSelectPlanet(isSelected ? null : planet);
              }}
              className={`px-2.5 py-1 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
                isSelected
                  ? 'bg-space-electric/20 text-space-electric border border-space-electric/50 shadow-glow-cyan'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
              title={`View ${planet.name}`}
            >
              <span
                className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
                style={{
                  backgroundColor: `${planet.color}30`,
                  color: planet.color,
                  boxShadow: isSelected ? `0 0 8px ${planet.glowColor}` : 'none'
                }}
              >
                {planet.glyph || '✦'}
              </span>
              <span className="hidden sm:inline">{planet.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
