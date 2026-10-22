import { useState, useEffect } from 'react';
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
  Info,
  Rocket,
  Moon,
  ShieldAlert,
  Volume2,
  VolumeX,
  Gauge
} from 'lucide-react';
import type { PlanetData } from '../../types/solar';
import { soundService } from '../../services/soundEffects';

interface PlanetInfoPanelProps {
  planet: PlanetData | null;
  onClose: () => void;
}

type TabType = 'overview' | 'telemetry' | 'moons' | 'missions' | 'habitability';

export function PlanetInfoPanel({ planet, onClose }: PlanetInfoPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // Stop speech when changing planets or unmounting
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [planet?.id]);

  if (!planet) return null;

  // Browser Text-to-Speech audio briefing
  const toggleSpeechBriefing = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const text = `${planet.name}. ${planet.tagline}. ${planet.description} Average surface temperature is ${planet.temperatureAvgC} degrees Celsius. Gravity is ${planet.gravityMps2} meters per second squared. Habitability verdict: ${planet.habitability.verdict}.`;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.05;

    // Pick English voice if available
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find((v) => v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural')));
    if (englishVoice) utterance.voice = englishVoice;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  return (
    <motion.aside
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '100%', opacity: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed right-4 top-20 bottom-24 w-[420px] max-w-[calc(100vw-2rem)] z-30 glass-panel rounded-3xl flex flex-col shadow-2xl border border-white/15 overflow-hidden"
    >
      {/* 1. Header with Glow Accent & Celestial Glyph */}
      <div
        className="relative p-5 pb-3 border-b border-white/10"
        style={{
          background: `linear-gradient(135deg, ${planet.glowColor}20, transparent)`
        }}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            {/* Astronomical Glyph Crest */}
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-bold border shadow-lg shrink-0 mt-0.5"
              style={{
                backgroundColor: `${planet.color}20`,
                borderColor: `${planet.color}60`,
                color: planet.color,
                boxShadow: `0 0 16px ${planet.glowColor}40`
              }}
            >
              {planet.glyph || '✦'}
            </div>

            <div>
              <span
                className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase mb-1 border"
                style={{
                  borderColor: `${planet.color}40`,
                  backgroundColor: `${planet.color}15`,
                  color: planet.color
                }}
              >
                {planet.category}
              </span>
              <h2 className="text-2xl font-bold font-heading text-white tracking-wide">
                {planet.name}
              </h2>
              <p className="text-xs text-slate-300 italic leading-snug">{planet.tagline}</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Audio Voice Telemetry Button */}
            <button
              onClick={() => {
                soundService.playClick();
                toggleSpeechBriefing();
              }}
              className={`p-2 rounded-xl transition-all ${
                isSpeaking
                  ? 'bg-space-electric text-space-darkest shadow-glow-cyan animate-pulse'
                  : 'bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white'
              }`}
              title={isSpeaking ? 'Stop Audio Briefing' : 'Listen to Audio Briefing'}
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-space-cyan" />}
            </button>

            {/* Close Button */}
            <button
              onClick={() => {
                soundService.playClick();
                if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                  window.speechSynthesis.cancel();
                }
                onClose();
              }}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-colors"
              title="Close Panel (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 mt-4 border-t border-white/5 pt-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'overview', label: 'Overview', icon: <Info className="w-3.5 h-3.5" /> },
            { id: 'telemetry', label: 'Telemetry', icon: <Compass className="w-3.5 h-3.5" /> },
            { id: 'moons', label: `Moons (${planet.moonsCount})`, icon: <Moon className="w-3.5 h-3.5" /> },
            { id: 'missions', label: 'Missions', icon: <Rocket className="w-3.5 h-3.5" /> },
            { id: 'habitability', label: 'Habitability', icon: <ShieldAlert className="w-3.5 h-3.5" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                soundService.playClick();
                setActiveTab(tab.id as TabType);
              }}
              className={`px-2.5 py-1 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? 'bg-space-electric/20 text-space-electric border border-space-electric/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5 text-sm">
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-space-cyan mb-1.5 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5" /> Celestial Profile
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed">{planet.description}</p>
            </div>

            {/* Atmosphere */}
            {planet.atmosphere.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Atmospheric Chemistry
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {planet.atmosphere.map((gas, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-300"
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
                Geology & Interior Structure
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed">{planet.geology}</p>
            </div>

            {/* Astronomical Fun Facts */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-space-gold mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-space-gold" /> Astronomical Highlights
              </h3>
              <ul className="space-y-2">
                {planet.funFacts.map((fact, idx) => (
                  <li
                    key={idx}
                    className="p-3 rounded-2xl bg-space-gold/5 border border-space-gold/20 text-xs text-slate-200 leading-snug flex items-start gap-2.5"
                  >
                    <span className="text-space-gold font-bold">✦</span>
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* TAB 2: TELEMETRY & PHYSICAL DATA */}
        {activeTab === 'telemetry' && (
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-space-electric mb-2 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" /> High-Precision Astrometry
            </h3>

            <div className="grid grid-cols-2 gap-2 text-xs">
              {/* Diameter */}
              <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
                <div className="text-slate-400 flex items-center gap-1 mb-0.5">
                  <CircleDot className="w-3 h-3 text-space-cyan" /> Equatorial Diameter
                </div>
                <div className="font-semibold text-white">
                  {(planet.actualRadiusKm * 2).toLocaleString()} km
                </div>
              </div>

              {/* Distance from Sun */}
              <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
                <div className="text-slate-400 flex items-center gap-1 mb-0.5">
                  <Orbit className="w-3 h-3 text-space-violet" /> Mean Solar Distance
                </div>
                <div className="font-semibold text-white">
                  {planet.actualDistanceKm === 0
                    ? '0 km (Core)'
                    : `${planet.actualDistanceKm.toLocaleString()}M km`}
                </div>
              </div>

              {/* Orbital Period */}
              <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
                <div className="text-slate-400 flex items-center gap-1 mb-0.5">
                  <Orbit className="w-3 h-3 text-space-gold" /> Orbital Period
                </div>
                <div className="font-semibold text-white">
                  {planet.orbitPeriodDays === 0
                    ? 'N/A'
                    : planet.orbitPeriodDays > 365
                    ? `${(planet.orbitPeriodDays / 365.25).toFixed(1)} Earth yrs`
                    : `${planet.orbitPeriodDays} days`}
                </div>
              </div>

              {/* Day Length */}
              <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
                <div className="text-slate-400 flex items-center gap-1 mb-0.5">
                  <RotateCw className="w-3 h-3 text-space-cyan" /> Rotational Period
                </div>
                <div className="font-semibold text-white">
                  {Math.abs(planet.rotationPeriodHours) > 24
                    ? `${(Math.abs(planet.rotationPeriodHours) / 24).toFixed(1)} Earth days`
                    : `${Math.abs(planet.rotationPeriodHours)} hrs`}
                </div>
              </div>

              {/* Average Temperature */}
              <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
                <div className="text-slate-400 flex items-center gap-1 mb-0.5">
                  <Thermometer className="w-3 h-3 text-red-400" /> Avg Temperature
                </div>
                <div className="font-semibold text-white">{planet.temperatureAvgC}°C</div>
              </div>

              {/* Surface Gravity */}
              <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
                <div className="text-slate-400 flex items-center gap-1 mb-0.5">
                  <Scale className="w-3 h-3 text-purple-400" /> Surface Gravity
                </div>
                <div className="font-semibold text-white">{planet.gravityMps2} m/s²</div>
              </div>

              {/* Escape Velocity */}
              <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
                <div className="text-slate-400 flex items-center gap-1 mb-0.5">
                  <Rocket className="w-3 h-3 text-emerald-400" /> Escape Velocity
                </div>
                <div className="font-semibold text-white">{planet.escapeVelocityKps} km/s</div>
              </div>

              {/* Axial Tilt */}
              <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
                <div className="text-slate-400 flex items-center gap-1 mb-0.5">
                  <Compass className="w-3 h-3 text-amber-400" /> Obliquity (Tilt)
                </div>
                <div className="font-semibold text-white">{planet.axialTiltDeg}°</div>
              </div>
            </div>

            {/* Atmospheric Pressure */}
            <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
              <div className="text-slate-400 flex items-center gap-1.5 mb-1 text-xs font-medium">
                <Gauge className="w-3.5 h-3.5 text-space-cyan" /> Atmospheric Surface Pressure
              </div>
              <div className="text-xs font-semibold text-white">{planet.atmosphericPressure}</div>
            </div>
          </div>
        )}

        {/* TAB 3: MOONS */}
        {activeTab === 'moons' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-space-violet flex items-center gap-1.5">
                <Moon className="w-3.5 h-3.5" /> Satellite System
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-space-violet/20 text-space-violet text-xs font-semibold">
                {planet.moonsCount} Confirmed Moons
              </span>
            </div>

            {planet.moonsList && planet.moonsList.length > 0 ? (
              <div className="space-y-3">
                {planet.moonsList.map((moon, i) => (
                  <div key={i} className="bg-white/5 p-3.5 rounded-2xl border border-white/5 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-xs flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-slate-300" />
                        {moon.name}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        Ø {moon.diameterKm.toLocaleString()} km
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-snug">{moon.highlight}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-400 text-xs bg-white/5 rounded-2xl p-4">
                <Moon className="w-8 h-8 text-slate-500 mx-auto mb-2 opacity-50" />
                This celestial body has no natural satellites.
              </div>
            )}
          </div>
        )}

        {/* TAB 4: EXPLORATION MISSIONS */}
        {activeTab === 'missions' && (
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-space-cyan mb-2 flex items-center gap-1.5">
              <Rocket className="w-3.5 h-3.5" /> Historic & Active Spacecraft
            </h3>

            {planet.missions && planet.missions.length > 0 ? (
              <div className="space-y-3">
                {planet.missions.map((mission, i) => (
                  <div key={i} className="bg-white/5 p-3.5 rounded-2xl border border-white/5 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-xs">{mission.name}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-space-cyan font-mono">
                        {mission.agency} ({mission.year})
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-snug">{mission.achievement}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-400 text-xs bg-white/5 rounded-2xl p-4">
                <Rocket className="w-8 h-8 text-slate-500 mx-auto mb-2 opacity-50" />
                Observations conducted via space-based telescopes (Hubble, JWST, Kepler).
              </div>
            )}
          </div>
        )}

        {/* TAB 5: HABITABILITY & ASTROBIOLOGY */}
        {activeTab === 'habitability' && (
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-space-electric mb-2 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5" /> Astrobiological Index
            </h3>

            {/* Gauge card */}
            <div className="bg-white/5 p-4 rounded-2xl border border-white/5 text-center">
              <div className="text-xs text-slate-400 mb-1">Biological Compatibility Score</div>
              <div className="text-3xl font-extrabold font-heading text-white tracking-wider flex items-center justify-center gap-1">
                <span
                  style={{
                    color:
                      planet.habitability.score > 70
                        ? '#4ADE80'
                        : planet.habitability.score > 30
                        ? '#FBBF24'
                        : '#F87171'
                  }}
                >
                  {planet.habitability.score}
                </span>
                <span className="text-slate-500 text-sm">/ 100</span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 rounded-full bg-white/10 mt-3 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${planet.habitability.score}%`,
                    backgroundColor:
                      planet.habitability.score > 70
                        ? '#4ADE80'
                        : planet.habitability.score > 30
                        ? '#FBBF24'
                        : '#F87171'
                  }}
                />
              </div>

              <div className="mt-2 text-xs font-semibold text-slate-200 uppercase tracking-wide">
                {planet.habitability.verdict}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 text-xs text-slate-300 leading-relaxed">
              {planet.habitability.details}
            </div>
          </div>
        )}
      </div>

      {/* 3. Bottom Return Action */}
      <div className="p-3 border-t border-white/10 bg-black/40">
        <button
          onClick={() => {
            soundService.playClick();
            if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
              window.speechSynthesis.cancel();
            }
            onClose();
          }}
          className="w-full py-2.5 px-4 rounded-2xl bg-gradient-to-r from-space-nebula to-space-accent hover:from-space-accent hover:to-space-violet text-white text-xs font-medium tracking-wide transition-all shadow-md flex items-center justify-center gap-2"
        >
          <Orbit className="w-4 h-4 text-space-cyan" />
          Return to Solar Overview
        </button>
      </div>
    </motion.aside>
  );
}
