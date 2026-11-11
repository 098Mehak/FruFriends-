import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import {
  Sparkles,
  ArrowRight,
  Award,
  Compass,
  Heart,
  Swords,
  Flame,
  RotateCcw,
  Droplets,
  Layers
} from 'lucide-react';
import { CHARACTERS, IMAGES } from '../../data/frufriends';
import { sounds } from '../../utils/sound';
import { AssetImage } from '../AssetImage';

interface Slide1Props {
  onExploreCollection: () => void;
}

export const Slide1Introduction: React.FC<Slide1Props> = ({ onExploreCollection }) => {
  const [activeFruitHover, setActiveFruitHover] = useState<string | null>(null);
  const [actionViewMode, setActionViewMode] = useState<'water_dragon' | 'sun_breathing' | 'chocolates'>('water_dragon');
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  // GSAP Animation target references
  const containerRef = useRef<HTMLDivElement>(null);
  const logoWordmarkRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLSpanElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const slashArcRef = useRef<SVGPathElement>(null);
  const waterSpiralRef = useRef<SVGPathElement>(null);
  const flashOverlayRef = useRef<HTMLDivElement>(null);
  const heroCardRef = useRef<HTMLDivElement>(null);
  const floatingBonbonsRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Master GSAP animation sequence
  const playTanjiroSwordSlashSequence = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    // Audio cue
    sounds.playSwordSlash();

    const tl = gsap.timeline({
      onComplete: () => {
        setIsAnimating(false);
      }
    });

    timelineRef.current = tl;

    // Reset initial states
    tl.set(flashOverlayRef.current, { opacity: 0, display: 'block' })
      .set(slashArcRef.current, { strokeDashoffset: 1400, opacity: 1 })
      .set(waterSpiralRef.current, { strokeDashoffset: 1600, opacity: 1 })
      .set(logoWordmarkRef.current, { scale: 1.6, opacity: 0, filter: 'blur(8px) brightness(1.4)' })
      .set(subtitleRef.current, { y: 20, opacity: 0 })
      .set(taglineRef.current, { y: 15, opacity: 0 })
      .set(heroCardRef.current, { scale: 0.94, y: 15, opacity: 0.7 });

    // Step 1: Tanjiro's heroic stance surges forward with graceful perspective
    tl.to(heroCardRef.current, {
      duration: 0.4,
      scale: 1.02,
      y: 0,
      opacity: 1,
      ease: 'power3.out'
    });

    // Step 2: Serpentine Water Dragon & Solar Flame sword trail spirals across
    tl.to(slashArcRef.current, {
      duration: 0.45,
      strokeDashoffset: 0,
      ease: 'power4.inOut'
    }, '-=0.25')
    .to(waterSpiralRef.current, {
      duration: 0.5,
      strokeDashoffset: 0,
      ease: 'power3.out'
    }, '-=0.4');

    // Step 3: Gentle crystalline starlight flash at the strike point
    tl.to(flashOverlayRef.current, {
      duration: 0.15,
      opacity: 0.7,
      ease: 'power2.in',
      onStart: () => {
        sounds.playLogoImpact();
      }
    }, '-=0.15')
    .to(flashOverlayRef.current, {
      duration: 0.45,
      opacity: 0,
      ease: 'power2.out'
    });

    // Step 4: The FRUFRIENDS chocolate gold embossed logo appears with crisp impact!
    tl.to(logoWordmarkRef.current, {
      duration: 0.65,
      scale: 1,
      opacity: 1,
      filter: 'blur(0px) brightness(1)',
      ease: 'back.out(2.2)'
    }, '-=0.35');

    // Step 5: Subtitle & Tagline emerge smoothly
    tl.to(subtitleRef.current, {
      duration: 0.4,
      y: 0,
      opacity: 1,
      ease: 'power2.out'
    }, '-=0.3')
    .to(taglineRef.current, {
      duration: 0.35,
      y: 0,
      opacity: 1,
      ease: 'power2.out'
    }, '-=0.2');

    // Step 6: Floating character bonbons orbit into place
    tl.fromTo(floatingBonbonsRef.current,
      { scale: 0.8, opacity: 0 },
      { duration: 0.5, scale: 1, opacity: 1, ease: 'back.out(1.8)' },
      '-=0.2'
    );

    // Fade out blade trail
    tl.to([slashArcRef.current, waterSpiralRef.current], {
      duration: 0.6,
      opacity: 0,
      ease: 'power1.out'
    }, '-=0.1');
  };

  // Run GSAP sequence on initial mount
  useEffect(() => {
    const timer = setTimeout(() => {
      playTanjiroSwordSlashSequence();
    }, 200);

    return () => {
      clearTimeout(timer);
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, []);

  const getHeroImage = () => {
    if (activeFruitHover) {
      return CHARACTERS.find(c => c.id === activeFruitHover)?.sculptedChocolateImage || IMAGES.collectionLineup;
    }
    if (actionViewMode === 'water_dragon') {
      return IMAGES.tanjiroWaterDragon;
    }
    if (actionViewMode === 'sun_breathing') {
      return IMAGES.tanjiroSunBreathing;
    }
    return IMAGES.collectionLineup;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex flex-col justify-between overflow-hidden px-6 lg:px-16 py-6 lg:py-8 bg-gradient-to-br from-[#FFF0F7] via-[#FAF5FF] to-[#FDF2F8] text-[#2E1825]"
    >
      {/* Light crystalline flash overlay during Tanjiro's sword strike */}
      <div
        ref={flashOverlayRef}
        className="absolute inset-0 pointer-events-none z-50 bg-gradient-to-r from-[#FCE7F3]/80 via-[#FFFBEB]/90 to-[#EDE9FE]/80 backdrop-blur-xs hidden"
      />

      {/* Elegant Sapphire Water Dragon & Solar Flame Arc SVG Trail */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-40"
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          ref={slashArcRef}
          d="M 120 780 C 420 580, 820 460, 1380 200"
          stroke="url(#waterDragonGrad)"
          strokeWidth="12"
          strokeLinecap="round"
          style={{
            strokeDasharray: 1400,
            strokeDashoffset: 1400,
            filter: 'drop-shadow(0 0 12px rgba(59, 130, 246, 0.8)) drop-shadow(0 0 24px rgba(192, 132, 252, 0.6))'
          }}
        />
        <path
          ref={waterSpiralRef}
          d="M 200 820 C 500 700, 780 400, 1150 260"
          stroke="url(#solarFlameGrad)"
          strokeWidth="6"
          strokeLinecap="round"
          style={{
            strokeDasharray: 1600,
            strokeDashoffset: 1600,
            filter: 'drop-shadow(0 0 10px rgba(245, 158, 11, 0.8))'
          }}
        />
        <defs>
          <linearGradient id="waterDragonGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="40%" stopColor="#38BDF8" />
            <stop offset="75%" stopColor="#C084FC" />
            <stop offset="100%" stopColor="#F472B6" />
          </linearGradient>
          <linearGradient id="solarFlameGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="50%" stopColor="#FB7185" />
            <stop offset="100%" stopColor="#FFF1C5" />
          </linearGradient>
        </defs>
      </svg>

      {/* Soft ambient background cherry blossom glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-[#FFCCD5]/30 via-[#E9D5FF]/35 to-[#F5D77F]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#FBCFE8]/25 rounded-full blur-3xl pointer-events-none" />

      {/* Top Brand Kicker */}
      <div className="relative z-20 flex items-center justify-between">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-[#E9D5FF] shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#9333EA] animate-pulse" />
          <span className="text-xs uppercase tracking-widest text-[#7E22CE] font-bold">
            Luxury Anime Confectionery · 2025 Collection
          </span>
        </div>

        <div className="hidden md:flex items-center gap-6 text-xs text-[#5C382A] font-body font-medium">
          <span className="flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-[#C99C42]" />
            6 Artisanal Fillings
          </span>
          <span className="flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-[#C99C42]" />
            Collectible Mystery Box
          </span>
          <span className="flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-[#EC4899]" />
            Single-Origin Cocoa
          </span>
        </div>
      </div>

      {/* Main Hero Split Content */}
      <div className="relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto">
        {/* Left Column: Brand Typography, GSAP Animated Logo, & Sequence Trigger */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-4 text-left">
          <div className="space-y-1.5">
            <div className="inline-block">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#9333EA] font-bold">
                Artisanal Confectionery Pitch
              </span>
            </div>
            
            {/* GSAP Target: Logo Wordmark with Sword Slash Impact */}
            <h1
              ref={logoWordmarkRef}
              className="font-serif-brand text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-[#2E1825]"
            >
              <span className="text-gold-gradient block drop-shadow-xs">FRUFRIENDS</span>
              <span
                ref={subtitleRef}
                className="text-2xl sm:text-3xl lg:text-4xl font-display-modern font-medium text-[#7E22CE] block mt-0.5"
              >
                Anime Fruit Chocolate Collection
              </span>
            </h1>

            <p
              ref={taglineRef}
              className="text-base lg:text-lg font-display-modern italic font-semibold text-[#BE185D] border-l-3 border-[#9333EA] pl-3 py-0.5"
            >
              “Eat the Magic. Discover Your Friend!”
            </p>
          </div>

          <p className="text-xs lg:text-sm text-[#4A2D22] leading-relaxed font-body max-w-lg">
            Not just chocolate. A friendship waiting to be unwrapped. Six iconic anime heroes transformed into handcrafted character-sculpted chocolates filled with slow-simmered real fruit purées.
          </p>

          {/* GSAP Sequence Replay Controller Card */}
          <div className="p-3 rounded-2xl bg-white/95 border border-[#E9D5FF] shadow-xs space-y-2">
            <div className="flex items-center justify-between text-xs font-mono font-bold text-[#7E22CE]">
              <span className="flex items-center gap-1.5">
                <Swords className="w-4 h-4 text-[#3B82F6]" />
                Tanjiro Sword-Swinging Action
              </span>
              <span className="text-[10px] text-[#9333EA] bg-[#FAF5FF] px-2 py-0.5 rounded-full border border-[#E9D5FF]">
                GSAP ANIMATED
              </span>
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={playTanjiroSwordSlashSequence}
                disabled={isAnimating}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 ${
                  isAnimating
                    ? 'bg-[#9333EA]/60 text-white cursor-wait'
                    : 'bg-gradient-to-r from-[#2563EB] via-[#9333EA] to-[#C026D3] text-white hover:brightness-105 hover:scale-[1.02]'
                }`}
              >
                <RotateCcw className={`w-3.5 h-3.5 ${isAnimating ? 'animate-spin' : ''}`} />
                <span>{isAnimating ? 'Swinging Sword...' : 'Replay Sword Swing & Logo Sequence'}</span>
              </button>

              {/* View Switchers */}
              <div className="flex items-center gap-1 p-0.5 rounded-lg bg-[#FAF5FF] border border-[#E9D5FF] text-[11px] font-medium text-[#7E22CE]">
                <button
                  onClick={() => setActionViewMode('water_dragon')}
                  className={`px-2 py-1 rounded-md transition-colors ${actionViewMode === 'water_dragon' ? 'bg-white shadow-xs font-bold text-[#2563EB]' : 'hover:text-[#2563EB]'}`}
                  title="Water Dragon Constant Flux Tenth Form"
                >
                  Water Dragon
                </button>
                <button
                  onClick={() => setActionViewMode('sun_breathing')}
                  className={`px-2 py-1 rounded-md transition-colors ${actionViewMode === 'sun_breathing' ? 'bg-white shadow-xs font-bold text-[#D97706]' : 'hover:text-[#D97706]'}`}
                  title="Sun Breathing Solar Arch"
                >
                  Sun Breathing
                </button>
                <button
                  onClick={() => setActionViewMode('chocolates')}
                  className={`px-2 py-1 rounded-md transition-colors ${actionViewMode === 'chocolates' ? 'bg-white shadow-xs font-bold text-[#7E22CE]' : 'hover:text-[#7E22CE]'}`}
                  title="All 6 Character Chocolates Lineup"
                >
                  Chocolates
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Fruit Flavor Badges */}
          <div className="space-y-1.5">
            <div className="text-xs uppercase tracking-wider text-[#7E22CE] font-mono font-bold">
              Six Hero Fruit Essences:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {CHARACTERS.map((char) => {
                const isHovered = activeFruitHover === char.id;
                return (
                  <button
                    key={char.id}
                    onMouseEnter={() => {
                      setActiveFruitHover(char.id);
                      sounds.playSelect();
                    }}
                    onMouseLeave={() => setActiveFruitHover(null)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs transition-all duration-200 border ${
                      isHovered
                        ? 'bg-gradient-to-r from-[#9333EA] to-[#C026D3] border-[#9333EA] text-white scale-105 shadow-md'
                        : 'bg-white/90 border-[#E9D5FF] text-[#4A2D22] hover:bg-white shadow-xs'
                    }`}
                  >
                    <span>{char.fruitEmoji}</span>
                    <span className="font-semibold">{char.fruit}</span>
                    <span className="opacity-60 text-[10px]">({char.name.split(' ')[0]})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Primary CTA Button to advance to Slide 2 */}
          <div className="pt-1 flex items-center gap-4">
            <button
              onClick={() => {
                sounds.playSelect();
                onExploreCollection();
              }}
              className="group flex items-center gap-2.5 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#9333EA] via-[#C026D3] to-[#C99C42] text-white font-semibold text-xs shadow-md hover:brightness-105 hover:scale-[1.02] active:scale-95 transition-all"
            >
              <span>Explore The 6 Characters</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <span className="text-xs text-[#7E22CE]/80 font-mono hidden sm:inline">
              Slide 01 of 05
            </span>
          </div>
        </div>

        {/* Right Column: Hero Visual Asset Showcase with Tanjiro Action & Chocolates */}
        <div className="lg:col-span-7 relative flex flex-col items-center justify-center">
          {/* Main Visual Container */}
          <div
            ref={heroCardRef}
            className="relative w-full max-w-2xl rounded-2xl overflow-hidden glass-card p-2 shadow-xl border-2 border-[#E9D5FF] group"
          >
            <div className="relative aspect-video rounded-xl overflow-hidden bg-[#FAF5FF]">
              <AssetImage
                src={getHeroImage()}
                alt={actionViewMode === 'water_dragon' ? 'Tanjiro Kamado Water Breathing Tenth Form Dragon Slash' : 'FruFriends Anime Confectionery'}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                fallbackCandidates={[
                  '/assets/images/tanjiro_water_dragon_slash_1794421346328.jpg',
                  '/assets/images/anime_character_chocolates_six_1794419628329.jpg'
                ]}
                fallbackTitle={actionViewMode === 'water_dragon' ? 'Tanjiro Kamado · Water Dragon' : 'FruFriends Confectionery'}
                fallbackSubtitle="Artisanal Anime Chocolate Collection"
              />

              {/* Gradient scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-80" />

              {/* Floating feature pills on image */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white bg-black/65 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/20">
                <div className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${actionViewMode === 'water_dragon' ? 'bg-[#38BDF8]' : actionViewMode === 'sun_breathing' ? 'bg-[#F59E0B]' : 'bg-[#C084FC]'} animate-ping`} />
                  <span className="font-semibold text-[#FFFBF7]">
                    {actionViewMode === 'water_dragon'
                      ? 'Water Breathing Tenth Form · Constant Flux Dragon Slash'
                      : actionViewMode === 'sun_breathing'
                      ? 'Hinokami Kagura · Solar Flame Blade Arch'
                      : 'Six Anime Character-Sculpted Chocolates'}
                  </span>
                </div>
                <span className="text-[11px] text-[#FDF4FF] font-mono">
                  {actionViewMode === 'water_dragon' ? 'Nichirin Katana Art' : 'Gourmet Real Fruit Cocoa'}
                </span>
              </div>
            </div>

            {/* Floating Satellite Chocolates */}
            <div
              ref={floatingBonbonsRef}
              className="contents"
            >
              <div className="absolute -top-3 -right-3 p-3 rounded-2xl glass-panel border border-[#E9D5FF] shadow-md animate-float hidden sm:block">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">🍓</span>
                  <div>
                    <div className="text-xs font-bold text-[#7E22CE]">Tanjiro-Shaped Cocoa</div>
                    <div className="text-[10px] text-[#5C382A] font-mono">64% Cocoa · Strawberry Coulis</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-3 -left-3 p-3 rounded-2xl glass-panel border border-[#E9D5FF] shadow-md animate-float-delayed hidden sm:block">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">🥭</span>
                  <div>
                    <div className="text-xs font-bold text-[#7E22CE]">Rengoku Flame Bust</div>
                    <div className="text-[10px] text-[#5C382A] font-mono">Scarlet & Gold Cocoa Butter</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom ticker notes */}
      <div className="relative z-20 flex items-center justify-between text-[11px] text-[#7E22CE]/80 pt-2 border-t border-[#E9D5FF] font-mono">
        <span>GSAP POWERED SWORD SLICE SEQUENCE · FRUFRIENDS BRAND INTRODUCTION</span>
        <span className="hidden sm:inline">DEMON SLAYER & JUJUTSU KAISEN INSPIRATIONS</span>
        <span>PRESS [SPACE] OR ARROWS TO ADVANCE</span>
      </div>
    </div>
  );
};
