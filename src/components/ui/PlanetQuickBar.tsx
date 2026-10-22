import type { PlanetData } from '../../types/solar';
import { PLANETS_DATA } from '../../data/planets';
import { soundService } from '../../services/soundEffects';

interface PlanetQuickBarProps {
  selectedPlanet: PlanetData | null;
  onSelectPlanet: (planet: PlanetData | null) => void;
}

export function PlanetQuickBar({ selectedPlanet, onSelectPlanet }: PlanetQuickBarProps) {
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-30 max-w-[calc(100vw-2rem)] overflow-x-auto no-scrollbar">
      <div className="glass-panel px-3 py-1.5 rounded-2xl flex items-center gap-1 shadow-glass border border-white/10">
        {PLANETS_DATA.map((planet) => {
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
                className="w-2 h-2 rounded-full shrink-0"
                style={{
                  backgroundColor: planet.color,
                  boxShadow: isSelected ? `0 0 8px ${planet.glowColor}` : 'none'
                }}
              />
              <span className="hidden sm:inline">{planet.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
