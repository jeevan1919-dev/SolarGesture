import {
  Play,
  Pause,
  RotateCcw,
  Orbit,
  Tag,
  Volume2,
  VolumeX,
  HelpCircle,
  Camera,
  CameraOff,
  Sparkles,
  Info
} from 'lucide-react';
import { soundService } from '../../services/soundEffects';

interface ControlBarProps {
  isPaused: boolean;
  onTogglePause: () => void;
  speedMultiplier: number;
  onChangeSpeed: (speed: number) => void;
  showOrbits: boolean;
  onToggleOrbits: () => void;
  showLabels: boolean;
  onToggleLabels: () => void;
  showAsteroids: boolean;
  onToggleAsteroids: () => void;
  onResetView: () => void;
  handTrackingEnabled: boolean;
  onToggleHandTracking: () => void;
  isMuted: boolean;
  onToggleSound: () => void;
  onOpenGuide: () => void;
  onOpenScaleModal: () => void;
}

export function ControlBar({
  isPaused,
  onTogglePause,
  speedMultiplier,
  onChangeSpeed,
  showOrbits,
  onToggleOrbits,
  showLabels,
  onToggleLabels,
  showAsteroids,
  onToggleAsteroids,
  onResetView,
  handTrackingEnabled,
  onToggleHandTracking,
  isMuted,
  onToggleSound,
  onOpenGuide,
  onOpenScaleModal
}: ControlBarProps) {
  const speeds = [0.25, 0.5, 1, 2, 4];

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 max-w-[calc(100vw-2rem)]">
      <div className="glass-panel px-3 py-2 rounded-2xl flex items-center gap-1.5 sm:gap-2 shadow-2xl border border-white/10 text-xs overflow-x-auto no-scrollbar">
        {/* 1. Play / Pause */}
        <button
          onClick={() => {
            soundService.playToggle(!isPaused);
            onTogglePause();
          }}
          className={`p-2 rounded-xl transition-all flex items-center gap-1 font-semibold ${
            isPaused
              ? 'bg-space-gold/20 text-space-gold border border-space-gold/40'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
          title={isPaused ? 'Resume Orbit (Space)' : 'Pause Orbit (Space)'}
        >
          {isPaused ? <Play className="w-4 h-4 fill-current" /> : <Pause className="w-4 h-4 fill-current" />}
          <span className="hidden md:inline">{isPaused ? 'Resume' : 'Pause'}</span>
        </button>

        {/* 2. Speed selector */}
        <div className="flex items-center bg-black/40 p-0.5 rounded-xl border border-white/5">
          {speeds.map((s) => (
            <button
              key={s}
              onClick={() => {
                soundService.playClick();
                onChangeSpeed(s);
              }}
              className={`px-1.5 py-1 rounded-lg text-[11px] font-mono transition-all ${
                speedMultiplier === s
                  ? 'bg-space-electric text-space-darkest font-bold shadow-glow-cyan'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {s}x
            </button>
          ))}
        </div>

        <div className="w-[1px] h-6 bg-white/10 mx-0.5 hidden sm:block" />

        {/* 3. Reset View */}
        <button
          onClick={() => {
            soundService.playClick();
            onResetView();
          }}
          className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-colors"
          title="Reset Camera Overview (R)"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* 4. Toggle Orbits */}
        <button
          onClick={() => {
            soundService.playClick();
            onToggleOrbits();
          }}
          className={`p-2 rounded-xl transition-colors ${
            showOrbits ? 'bg-space-cyan/20 text-space-cyan' : 'bg-white/5 text-slate-400'
          }`}
          title="Toggle Orbit Lines"
        >
          <Orbit className="w-4 h-4" />
        </button>

        {/* 5. Toggle Labels */}
        <button
          onClick={() => {
            soundService.playClick();
            onToggleLabels();
          }}
          className={`p-2 rounded-xl transition-colors ${
            showLabels ? 'bg-space-violet/20 text-space-violet' : 'bg-white/5 text-slate-400'
          }`}
          title="Toggle Planet Names"
        >
          <Tag className="w-4 h-4" />
        </button>

        {/* 6. Toggle Asteroids */}
        <button
          onClick={() => {
            soundService.playClick();
            onToggleAsteroids();
          }}
          className={`p-2 rounded-xl transition-colors ${
            showAsteroids ? 'bg-space-gold/20 text-space-gold' : 'bg-white/5 text-slate-400'
          }`}
          title="Toggle Asteroid Belt"
        >
          <Sparkles className="w-4 h-4" />
        </button>

        <div className="w-[1px] h-6 bg-white/10 mx-0.5 hidden sm:block" />

        {/* 7. Toggle Webcam Hand Tracking */}
        <button
          onClick={() => {
            soundService.playClick();
            onToggleHandTracking();
          }}
          className={`p-2 rounded-xl transition-all ${
            handTrackingEnabled
              ? 'bg-space-electric/20 text-space-electric border border-space-electric/40'
              : 'bg-white/5 text-slate-400'
          }`}
          title={handTrackingEnabled ? 'Turn Off Webcam Tracking' : 'Enable Webcam Hand Tracking'}
        >
          {handTrackingEnabled ? <Camera className="w-4 h-4" /> : <CameraOff className="w-4 h-4" />}
        </button>

        {/* 8. Toggle Sound */}
        <button
          onClick={() => {
            soundService.playClick();
            onToggleSound();
          }}
          className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-colors"
          title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-space-cyan" />}
        </button>

        {/* 9. Scale Disclaimer */}
        <button
          onClick={() => {
            soundService.playClick();
            onOpenScaleModal();
          }}
          className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-colors"
          title="Astronomical Scale Disclaimer"
        >
          <Info className="w-4 h-4" />
        </button>

        {/* 10. Gesture Guide Modal Trigger */}
        <button
          onClick={() => {
            soundService.playClick();
            onOpenGuide();
          }}
          className="p-2 rounded-xl bg-space-electric/15 hover:bg-space-electric/25 text-space-electric border border-space-electric/30 transition-colors flex items-center gap-1 font-medium"
          title="Open Gesture & Controls Guide"
        >
          <HelpCircle className="w-4 h-4" />
          <span className="hidden lg:inline text-xs">Guide</span>
        </button>
      </div>
    </div>
  );
}
