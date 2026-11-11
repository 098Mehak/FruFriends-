import React, { useState, useEffect, useCallback, useRef } from 'react';
import { PetalBackground } from './components/PetalBackground';
import { NavigationControls } from './components/NavigationControls';
import { Slide1Introduction } from './components/slides/Slide1Introduction';
import { Slide2Characters } from './components/slides/Slide2Characters';
import { Slide3USP } from './components/slides/Slide3USP';
import { Slide4Market } from './components/slides/Slide4Market';
import { Slide5Experience } from './components/slides/Slide5Experience';
import { sounds } from './utils/sound';

export default function App() {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isAutoplay, setIsAutoplay] = useState<boolean>(false);
  const [autoplayProgress, setAutoplayProgress] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const AUTOPLAY_DURATION = 10000; // 10 seconds per slide

  const totalSlides = 5;

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < totalSlides) {
      setCurrentSlide(index);
      setAutoplayProgress(0);
      sounds.playSlideTransition();
    }
  }, [totalSlides]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => {
      if (prev < totalSlides - 1) {
        sounds.playSlideTransition();
        setAutoplayProgress(0);
        return prev + 1;
      }
      return prev;
    });
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => {
      if (prev > 0) {
        sounds.playSlideTransition();
        setAutoplayProgress(0);
        return prev - 1;
      }
      return prev;
    });
  }, []);

  // Keyboard navigation listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is in an input or modal form
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === 'Space') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      } else if (['1', '2', '3', '4', '5'].includes(e.key)) {
        e.preventDefault();
        goToSlide(parseInt(e.key, 10) - 1);
      } else if (e.key.toLowerCase() === 'f') {
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, goToSlide]);

  // Autoplay timer loop
  useEffect(() => {
    if (!isAutoplay) {
      setAutoplayProgress(0);
      return;
    }

    const interval = 100; // Update every 100ms
    const step = (100 / (AUTOPLAY_DURATION / interval));

    const timer = setInterval(() => {
      setAutoplayProgress((prev) => {
        if (prev >= 100) {
          setCurrentSlide((curr) => {
            if (curr < totalSlides - 1) {
              sounds.playSlideTransition();
              return curr + 1;
            } else {
              // Loop back to start or pause
              sounds.playSlideTransition();
              return 0;
            }
          });
          return 0;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isAutoplay, totalSlides]);

  // Fullscreen handler
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const onFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  const toggleSound = () => {
    sounds.enabled = !soundEnabled;
    setSoundEnabled(!soundEnabled);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-screen h-screen flex flex-col bg-gradient-to-br from-[#FFF0F7] via-[#FAF5FF] to-[#FDF2F8] text-[#2E1825] select-none overflow-hidden font-body"
    >
      {/* Sakura petals ambient background */}
      <PetalBackground density={currentSlide === 0 || currentSlide === 4 ? 22 : 12} />

      {/* Top Header & Floating Bottom Navigation */}
      <NavigationControls
        currentSlide={currentSlide}
        totalSlides={totalSlides}
        onPrev={prevSlide}
        onNext={nextSlide}
        onSelectSlide={goToSlide}
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
        isAutoplay={isAutoplay}
        onToggleAutoplay={() => setIsAutoplay(!isAutoplay)}
        autoplayProgress={autoplayProgress}
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
      />

      {/* Presentation Stage Canvas (16:9 ratio responsive enclosure) */}
      <main className="relative flex-1 w-full h-[calc(100vh-56px)] flex items-center justify-center p-2 sm:p-4 pb-16">
        <div className="relative w-full h-full max-w-[1560px] max-h-[880px] aspect-video rounded-3xl overflow-hidden bg-white/95 border-2 border-[#E9D5FF] shadow-[0_20px_70px_-15px_rgba(168,85,247,0.18)] flex flex-col">
          {/* Active Slide Rendering with smooth transitions */}
          <div className="relative w-full h-full overflow-hidden transition-all duration-500">
            {currentSlide === 0 && (
              <Slide1Introduction onExploreCollection={() => goToSlide(1)} />
            )}
            {currentSlide === 1 && <Slide2Characters />}
            {currentSlide === 2 && <Slide3USP />}
            {currentSlide === 3 && <Slide4Market />}
            {currentSlide === 4 && (
              <Slide5Experience
                onRestart={() => goToSlide(0)}
                onJumpToSlide={goToSlide}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
