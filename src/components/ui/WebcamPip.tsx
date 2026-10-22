import React, { useState } from 'react';
import { Camera, CameraOff, Minimize2, Maximize2, AlertCircle, RefreshCw, Hand } from 'lucide-react';
import type { TrackingStatus } from '../../types/solar';
import { soundService } from '../../services/soundEffects';

interface WebcamPipProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  status: TrackingStatus;
  errorMessage: string | null;
  fps: number;
  hasHand: boolean;
  onRetry: () => void;
  onToggleEnabled: () => void;
  enabled: boolean;
}

export function WebcamPip({
  videoRef,
  canvasRef,
  status,
  errorMessage,
  fps,
  hasHand,
  onRetry,
  onToggleEnabled,
  enabled
}: WebcamPipProps) {
  const [isMinimized, setIsMinimized] = useState(false);

  if (!enabled) {
    return (
      <div className="fixed top-4 left-4 z-40">
        <button
          onClick={() => {
            soundService.playClick();
            onToggleEnabled();
          }}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl glass-panel text-slate-300 hover:text-white hover:border-space-cyan transition-all text-xs font-medium shadow-glass"
          title="Enable Hand Tracking"
        >
          <Camera className="w-4 h-4 text-space-cyan" />
          <span>Enable Hand Tracking</span>
        </button>
      </div>
    );
  }

  return (
    <div
      className={`fixed top-4 left-4 z-40 glass-panel rounded-2xl shadow-glass border border-white/10 overflow-hidden transition-all duration-300 ${
        isMinimized ? 'w-56' : 'w-64 sm:w-72'
      }`}
    >
      {/* Pip Header */}
      <div className="p-2.5 px-3 bg-black/40 border-b border-white/5 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          {/* Status Dot */}
          <span
            className={`w-2 h-2 rounded-full ${
              status === 'tracking'
                ? hasHand
                  ? 'bg-space-cyan animate-pulse shadow-glow-cyan'
                  : 'bg-yellow-400'
                : status === 'loading_model' || status === 'requesting_permission'
                ? 'bg-blue-400 animate-ping'
                : 'bg-red-400'
            }`}
          />
          <span className="font-medium text-slate-200">
            {status === 'tracking'
              ? hasHand
                ? 'Hand Detected'
                : 'Searching Hand...'
              : status === 'loading_model'
              ? 'Loading AI...'
              : status === 'requesting_permission'
              ? 'Requesting...'
              : status === 'permission_denied'
              ? 'Permission Denied'
              : 'Camera Error'}
          </span>
        </div>

        <div className="flex items-center gap-1">
          {status === 'tracking' && (
            <span className="text-[10px] text-slate-400 font-mono mr-1">{fps} FPS</span>
          )}
          <button
            onClick={() => {
              soundService.playClick();
              setIsMinimized(!isMinimized);
            }}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/10"
            title={isMinimized ? 'Expand Preview' : 'Minimize Preview'}
          >
            {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => {
              soundService.playClick();
              onToggleEnabled();
            }}
            className="p-1 rounded-md text-slate-400 hover:text-red-400 hover:bg-white/10"
            title="Disable Camera"
          >
            <CameraOff className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Pip Body */}
      {!isMinimized && (
        <div className="relative aspect-[4/3] bg-space-darkest flex items-center justify-center overflow-hidden">
          {/* Underlying Webcam Video (Mirrored horizontally) */}
          <video
            ref={videoRef}
            playsInline
            muted
            className="absolute inset-0 w-full h-full object-cover scale-x-[-1] opacity-60"
          />

          {/* Canvas for Skeleton Overlay */}
          <canvas
            ref={canvasRef}
            width={320}
            height={240}
            className="absolute inset-0 w-full h-full pointer-events-none"
          />

          {/* Status Overlay when loading or error */}
          {status !== 'tracking' && (
            <div className="absolute inset-0 bg-space-darkest/90 p-4 flex flex-col items-center justify-center text-center z-10">
              {status === 'loading_model' || status === 'requesting_permission' ? (
                <>
                  <RefreshCw className="w-6 h-6 text-space-cyan animate-spin mb-2" />
                  <p className="text-xs text-slate-300 font-medium">Initializing MediaPipe...</p>
                  <p className="text-[10px] text-slate-400 mt-1">Preparing computer vision models</p>
                </>
              ) : (
                <>
                  <AlertCircle className="w-6 h-6 text-red-400 mb-2" />
                  <p className="text-xs text-slate-200 font-medium">{errorMessage || 'Camera Error'}</p>
                  <button
                    onClick={() => {
                      soundService.playClick();
                      onRetry();
                    }}
                    className="mt-3 px-3 py-1 rounded-lg bg-space-nebula hover:bg-space-accent text-white text-xs transition-colors flex items-center gap-1.5"
                  >
                    <RefreshCw className="w-3 h-3" /> Retry
                  </button>
                </>
              )}
            </div>
          )}

          {/* Subtle guide when tracking but no hand found */}
          {status === 'tracking' && !hasHand && (
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none bg-black/30">
              <div className="w-20 h-20 rounded-full border-2 border-dashed border-space-cyan/40 animate-pulse flex items-center justify-center mb-1">
                <Hand className="w-8 h-8 text-space-cyan/50" />
              </div>
              <p className="text-[11px] text-space-cyan/80 font-medium">Raise hand into frame</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
