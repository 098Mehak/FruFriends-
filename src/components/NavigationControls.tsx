import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Sparkles
} from 'lucide-react';
import { sounds } from '../utils/sound';

interface NavigationControlsProps {
  currentSlide: number;
  totalSlides: number;
  onPrev: () => void;
  onNext: () => void;
  onSelectSlide: (index: number) => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  isAutoplay: boolean;
  onToggleAutoplay: () => void;
  autoplayProgress: number; // 0 to 100
  soundEnabled: boolean;
  onToggleSound: () => void;
}

const SLIDE_TITLES = [
  'Grand Introduction',
  'Meet The 6 FruFriends',
  'Unique Value Proposition',
  'Market Opportunity',
  'The FruFriends Experience',
];

export const NavigationControls: React.FC<NavigationControlsProps> = ({
  currentSlide,
  totalSlides,
  onPrev,
  onNext,
  onSelectSlide,
  isFullscreen,
  onToggleFullscreen,
  isAutoplay,
  onToggleAutoplay,
  autoplayProgress,
  soundEnabled,
  onToggleSound,
}) => {
  return (
    <>
      {/* Top Header Bar */}
      <header className="relative z-30 flex items-center justify-between px-6 py-3 border-b border-[#E5C378]/30 bg-[#FFFBF7]/90 backdrop-blur-md shadow-xs">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#6B1D2F] to-[#E5C378] flex items-center justify-center shadow-md border border-[#E5C378]/40">
            <Sparkles className="w-4 h-4 text-[#FFFBF7]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif-brand text-lg font-bold tracking-widest text-[#2E1810]">
                FRUFRIENDS
              </span>
              <span className="text-[11px] uppercase tracking-wider text-[#6B1D2F] font-semibold hidden sm:inline">
                · Anime Fruit Chocolate
              </span>
            </div>
          </div>
        </div>

        {/* Current slide indicator & titles */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {SLIDE_TITLES.map((title, idx) => {
            const isActive = currentSlide === idx;
            return (
              <button
                key={idx}
                onClick={() => {
                  sounds.playSelect();
                  onSelectSlide(idx);
                }}
                className={`group flex items-center gap-2 px-3 py-1.5 rounded-full text-xs transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#6B1D2F] to-[#8B263E] text-white shadow-sm border border-[#E5C378]/50 font-semibold'
                    : 'text-[#5C382A] hover:text-[#2E1810] hover:bg-[#2E1810]/5 border border-transparent'
                }`}
                title={`Slide ${idx + 1}: ${title}`}
              >
                <span className="text-[10px] font-mono opacity-80">0{idx + 1}</span>
                <span className="hidden lg:inline whitespace-nowrap">{title}</span>
              </button>
            );
          })}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Autoplay toggle */}
          <button
            onClick={onToggleAutoplay}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs transition-all border ${
              isAutoplay
                ? 'bg-[#E5C378]/30 border-[#C99C42] text-[#2E1810] font-semibold'
                : 'bg-white/80 border-[#E5C378]/30 text-[#5C382A] hover:text-[#2E1810] hover:bg-white shadow-xs'
            }`}
            title={isAutoplay ? 'Pause auto-presentation' : 'Play auto-presentation (10s per slide)'}
          >
            {isAutoplay ? <Pause className="w-3.5 h-3.5 text-[#6B1D2F]" /> : <Play className="w-3.5 h-3.5 text-[#6B1D2F]" />}
            <span className="hidden md:inline font-mono text-[11px]">
              {isAutoplay ? 'Auto' : 'Play'}
            </span>
          </button>

          {/* Sound toggle */}
          <button
            onClick={onToggleSound}
            className="p-1.5 rounded-lg text-xs bg-white/80 border border-[#E5C378]/30 text-[#5C382A] hover:text-[#2E1810] hover:bg-white shadow-xs transition-colors"
            title={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-[#C99C42]" /> : <VolumeX className="w-3.5 h-3.5 opacity-50" />}
          </button>

          {/* Fullscreen toggle */}
          <button
            onClick={onToggleFullscreen}
            className="p-1.5 rounded-lg text-xs bg-white/80 border border-[#E5C378]/30 text-[#5C382A] hover:text-[#2E1810] hover:bg-white shadow-xs transition-colors"
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen Presentation Mode'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5 text-[#2E1810]" /> : <Maximize2 className="w-3.5 h-3.5 text-[#2E1810]" />}
          </button>
        </div>
      </header>

      {/* Autoplay progress line */}
      {isAutoplay && (
        <div className="h-0.5 w-full bg-[#FFE4EC] relative z-30 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#FF94AD] via-[#C99C42] to-[#6B1D2F] transition-all duration-100 ease-linear"
            style={{ width: `${autoplayProgress}%` }}
          />
        </div>
      )}

      {/* Bottom Floating Navigation Bar */}
      <footer className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 px-4 py-2 rounded-full glass-panel shadow-xl border border-[#E5C378]/40">
        <button
          onClick={onPrev}
          disabled={currentSlide === 0}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
            currentSlide === 0
              ? 'opacity-30 cursor-not-allowed text-[#2E1810]/40'
              : 'text-[#2E1810] hover:bg-[#2E1810]/5 active:scale-95'
          }`}
          title="Previous slide (Left Arrow)"
        >
          <ChevronLeft className="w-4 h-4 text-[#6B1D2F]" />
          <span className="hidden sm:inline font-semibold">Prev</span>
        </button>

        <div className="flex items-center gap-2 px-3 border-x border-[#E5C378]/30 text-xs">
          <span className="font-mono text-[#6B1D2F] font-bold">0{currentSlide + 1}</span>
          <span className="text-[#2E1810]/30">/</span>
          <span className="font-mono text-[#2E1810]/60">0{totalSlides}</span>
        </div>

        <button
          onClick={onNext}
          disabled={currentSlide === totalSlides - 1}
          className={`flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
            currentSlide === totalSlides - 1
              ? 'opacity-30 cursor-not-allowed text-[#2E1810]/40'
              : 'bg-gradient-to-r from-[#6B1D2F] to-[#C99C42] text-white hover:brightness-105 active:scale-95 shadow-md'
          }`}
          title="Next slide (Right Arrow or Spacebar)"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Keyboard hint */}
        <div className="hidden md:flex items-center gap-1.5 pl-2 text-[10px] text-[#5C382A]/70 font-mono">
          <kbd className="px-1.5 py-0.5 rounded bg-[#2E1810]/5 border border-[#E5C378]/30">←</kbd>
          <kbd className="px-1.5 py-0.5 rounded bg-[#2E1810]/5 border border-[#E5C378]/30">→</kbd>
          <span>or Space</span>
        </div>
      </footer>
    </>
  );
};
