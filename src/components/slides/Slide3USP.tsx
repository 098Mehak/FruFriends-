import React, { useState } from 'react';
import { Sparkles, Utensils, HeartHandshake, Layers, CheckCircle2 } from 'lucide-react';
import { USP_PILLARS, IMAGES, CHARACTERS } from '../../data/frufriends';
import { sounds } from '../../utils/sound';
import { AssetImage } from '../AssetImage';

export const Slide3USP: React.FC = () => {
  const [activePillar, setActivePillar] = useState<number>(1); // default on 02 Real-Fruit
  const [isBrokenOpen, setIsBrokenOpen] = useState<boolean>(true);

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden px-6 lg:px-16 py-6 lg:py-8 bg-gradient-to-br from-[#FFFBF8] via-[#FFF7F3] to-[#FFF0F4] text-[#2E1810]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-10 w-[600px] h-[500px] bg-gradient-to-bl from-[#FFCCD5]/25 via-[#FFE4EC]/30 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Header section */}
      <div className="border-b border-[#E5C378]/30 pb-3">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#C99C42] font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          Our Unique Selling Proposition · Why FruFriends Wins
        </div>
        
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-2 mt-0.5">
          <div>
            <h2 className="font-serif-brand text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#2E1810]">
              MORE THAN <span className="text-gold-gradient">JUST CHOCOLATE</span>
            </h2>
            <p className="text-xs sm:text-sm font-display-modern text-[#6B1D2F] font-semibold italic mt-0.5">
              “The only chocolate experience where every bite introduces you to a new friend.”
            </p>
          </div>

          <div className="px-3.5 py-1.5 rounded-full bg-white/90 border border-[#E5C378]/40 text-xs font-mono font-bold text-[#6B1D2F] shadow-xs">
            SIX HEROES · SIX FRUITS · ONE MAGICAL EXPERIENCE
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center my-auto">
        {/* Left: 3 Core Differentiator Cards */}
        <div className="lg:col-span-6 flex flex-col space-y-3 text-left">
          {USP_PILLARS.map((pillar, idx) => {
            const isActive = activePillar === idx;
            return (
              <div
                key={pillar.id}
                onClick={() => {
                  setActivePillar(idx);
                  sounds.playSelect();
                }}
                className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-white border-[#6B1D2F] shadow-md scale-[1.01]'
                    : 'bg-white/70 border-[#E5C378]/30 hover:border-[#6B1D2F]/40 hover:bg-white/90 shadow-xs'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-lg font-mono text-xs font-bold shrink-0 transition-colors ${
                      isActive
                        ? 'bg-[#6B1D2F] text-white shadow-xs'
                        : 'bg-[#2E1810]/10 text-[#5C382A]'
                    }`}
                  >
                    {pillar.number}
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif-brand text-base sm:text-lg font-bold text-[#2E1810] tracking-wide">
                        {pillar.title}
                      </h3>
                      {isActive && (
                        <span className="text-[10px] font-mono uppercase text-[#6B1D2F] bg-[#6B1D2F]/10 px-2 py-0.5 rounded-full border border-[#6B1D2F]/20 font-bold">
                          Core Differentiator
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-[#8B263E] font-semibold">
                      {pillar.subtitle}
                    </p>

                    <p className="text-xs text-[#4A2D22] leading-relaxed font-body">
                      {pillar.description}
                    </p>

                    {isActive && (
                      <div className="flex items-center gap-1.5 pt-1.5 text-[11px] text-[#059669] font-mono font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        <span>{pillar.highlight}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Interactive Chocolate Break-Open & Fruit Core Visual */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <div className="relative w-full max-w-lg rounded-2xl overflow-hidden glass-card p-2 border border-[#E5C378]/40 shadow-xl">
            {/* Visual Box */}
            <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-[#FFF5F7]">
              <AssetImage
                src={isBrokenOpen ? IMAGES.crossSection : IMAGES.collectionLineup}
                alt="FruFriends Chocolate Break-Open Fruit Core"
                className={`w-full h-full object-cover transition-all duration-700 ${
                  isBrokenOpen ? 'scale-105' : 'scale-100'
                }`}
                fallbackCandidates={[
                  IMAGES.crossSection,
                  IMAGES.collectionLineup,
                  '/assets/images/frufriends_chocolate_cross_section_1794418957185.jpg',
                  '/assets/images/anime_character_chocolates_six_1794419628329.jpg'
                ]}
                fallbackTitle="Real-Fruit Chocolate Core"
                fallbackSubtitle="Artisanal Fruit Purée & Single-Origin Cocoa Shell"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-85" />

              {/* Oozing fruit animation highlight */}
              {isBrokenOpen && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <div className="w-48 h-48 rounded-full bg-red-500/15 animate-ping blur-xl" />
                </div>
              )}

              {/* Top Interactive Banner on Media */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/90 backdrop-blur-md border border-[#E5C378]/40 text-[#6B1D2F] flex items-center gap-1.5 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-[#C99C42]" />
                  {isBrokenOpen ? 'Velvety Fruit Core Revealed' : 'Character-Sculpted Shell'}
                </span>

                <button
                  onClick={() => {
                    setIsBrokenOpen(!isBrokenOpen);
                    sounds.playSelect();
                  }}
                  className="px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-[#6B1D2F] to-[#8B263E] text-white hover:brightness-105 active:scale-95 transition-all shadow-md"
                >
                  {isBrokenOpen ? 'Reset Shell' : 'Break Open Bonbon'}
                </button>
              </div>

              {/* Six fruits bar preview on bottom */}
              <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-black/75 backdrop-blur-md border border-white/20">
                <div className="text-[10px] font-mono uppercase text-[#FFF1C5] mb-1 text-center font-bold">
                  Six Real-Fruit Compote Fillings:
                </div>
                <div className="flex items-center justify-around text-xs">
                  {CHARACTERS.map((c) => (
                    <div key={c.id} className="flex flex-col items-center">
                      <span className="text-base">{c.fruitEmoji}</span>
                      <span className="text-[9px] text-[#FFFBF7] font-mono mt-0.5 font-semibold">{c.fruit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pillar context callout banner */}
            <div className="mt-2 p-2.5 rounded-xl bg-white/80 border border-[#E5C378]/30 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#059669]" />
                <span className="text-[#4A2D22] font-body font-medium">
                  Zero artificial syrup: 100% slow-simmered real fruit purées.
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#6B1D2F] font-bold">PREMIUM TASTE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Subtext */}
      <div className="flex items-center justify-between text-[11px] text-[#5C382A]/70 pt-2 border-t border-[#E5C378]/30 font-mono">
        <span>CLICK "BREAK OPEN BONBON" TO WITNESS THE INNER TEXTURE</span>
        <span>SLIDE 03 OF 05</span>
      </div>
    </div>
  );
};
