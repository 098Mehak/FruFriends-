import React, { useState } from 'react';
import {
  Sparkles,
  PackageOpen,
  RotateCcw,
  Gift,
  Award,
  Dices,
  ShieldCheck,
  Wand2,
  Eye,
  Star
} from 'lucide-react';
import { CHARACTERS, IMAGES } from '../../data/frufriends';
import { sounds } from '../../utils/sound';

interface Slide5Props {
  onRestart: () => void;
  onJumpToSlide: (slideIdx: number) => void;
}

export const Slide5Experience: React.FC<Slide5Props> = ({ onRestart }) => {
  const [isUnboxed, setIsUnboxed] = useState<boolean>(true);
  const [giftCharIdx, setGiftCharIdx] = useState<number>(0); // Default Tanjiro
  const [showPitchSummary, setShowPitchSummary] = useState<boolean>(false);
  const [activeView, setActiveView] = useState<'model_gift' | 'mystery_box'>('model_gift');

  const currentGift = CHARACTERS[giftCharIdx];

  // Draw / roll a new character model gift
  const handleDrawGift = () => {
    sounds.playUnbox();
    const nextIdx = (giftCharIdx + 1) % CHARACTERS.length;
    setGiftCharIdx(nextIdx);
    setIsUnboxed(true);
    setActiveView('model_gift');
  };

  const handleBoxClick = () => {
    sounds.playUnbox();
    if (!isUnboxed) {
      setIsUnboxed(true);
      setActiveView('model_gift');
    } else {
      // Toggle between inspecting the magical mystery box and the anime model
      setActiveView(activeView === 'mystery_box' ? 'model_gift' : 'mystery_box');
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden px-6 lg:px-16 py-6 lg:py-8 bg-gradient-to-br from-[#FFF0F7] via-[#FAF5FF] to-[#FDF2F8] text-[#2E1825]">
      {/* Background magical lavender and soft pink ethereal glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[550px] bg-gradient-to-tr from-[#F472B6]/25 via-[#C084FC]/30 to-[#DDD6FE]/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-10 w-80 h-80 bg-[#E9D5FF]/30 rounded-full blur-3xl pointer-events-none" />

      {/* Slide Header */}
      <div className="border-b border-[#E9D5FF]/60 pb-3 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#9333EA] font-bold">
            <Wand2 className="w-3.5 h-3.5 text-[#A855F7]" />
            Enchanted Mystery Box & Collectible Anime Model Gifts
          </div>
          <h2 className="font-serif-brand text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#2E1825] mt-0.5">
            DON'T JUST EAT CHOCOLATE. <span className="text-lavender-gradient">DISCOVER YOUR FRIEND!</span>
          </h2>
        </div>

        {/* Interactive action controls */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={handleDrawGift}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#9333EA] to-[#C026D3] text-white font-bold text-xs active:scale-95 transition-all shadow-md hover:brightness-105"
            title="Draw another random anime character model gift"
          >
            <Dices className="w-4 h-4 text-[#FDF4FF]" />
            <span>Draw Another Anime Model Gift</span>
          </button>

          <button
            onClick={handleBoxClick}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-bold shadow-xs transition-all active:scale-95 ${
              activeView === 'mystery_box'
                ? 'bg-[#FAF5FF] border-[#C084FC] text-[#7E22CE]'
                : 'bg-white/90 border-[#E9D5FF] text-[#2E1825] hover:bg-white'
            }`}
          >
            <PackageOpen className="w-4 h-4 text-[#A855F7]" />
            <span>{activeView === 'mystery_box' ? 'View Anime Model' : 'Inspect Magical Box'}</span>
          </button>
        </div>
      </div>

      {/* Main Experience Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center my-auto">
        {/* Left Column: Interactive Magical Mystery Box & Character Model Viewport */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <div
            onClick={handleBoxClick}
            className="relative w-full max-w-lg aspect-4/3 rounded-2xl overflow-hidden glass-card p-2 border-2 border-[#E9D5FF] shadow-[0_16px_40px_-8px_rgba(168,85,247,0.22)] cursor-pointer group"
          >
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#FAF5FF]">
              {/* Display either the Magical Mystery Box or the Specific Anime Model Gift */}
              <img
                src={activeView === 'mystery_box' ? IMAGES.mysteryUnboxing : currentGift.miniModelGift.modelImage}
                alt={activeView === 'mystery_box' ? 'FruFriends Enchanted Magical Mystery Box' : `${currentGift.name} Miniature Collectible Anime Model`}
                className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
                referrerPolicy="no-referrer"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-85" />

              {/* Magical foil / starlight shimmer effect */}
              <div className="absolute inset-0 foil-shimmer opacity-25 pointer-events-none" />

              {/* Top Banner Status with View Toggle Pills */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-white/95 backdrop-blur-md border border-[#C084FC]/40 text-[#7E22CE] flex items-center gap-1.5 shadow-xs">
                  {activeView === 'mystery_box' ? (
                    <>
                      <Wand2 className="w-3.5 h-3.5 text-[#A855F7]" />
                      <span>Enchanted Sakura & Lavender Mystery Box</span>
                    </>
                  ) : (
                    <>
                      <Star className="w-3.5 h-3.5 text-[#EAB308] fill-current" />
                      <span>{currentGift.name} · Anime Model Gift</span>
                    </>
                  )}
                </span>

                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#9333EA] text-white shadow-xs">
                  {currentGift.miniModelGift.rarity}
                </span>
              </div>

              {/* Bottom Caption on Image */}
              <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-black/75 backdrop-blur-md border border-white/20">
                <div className="flex items-center justify-between text-xs font-bold text-[#FFFBF7]">
                  <span className="flex items-center gap-1.5">
                    <span>{currentGift.fruitEmoji}</span>
                    <span>
                      {activeView === 'mystery_box'
                        ? 'Magical Mystery Box (Click to reveal Model)'
                        : currentGift.miniModelGift.title}
                    </span>
                  </span>
                  <span className="text-[10px] font-mono text-[#E9D5FF] font-bold">
                    {activeView === 'mystery_box' ? 'MYSTICAL GIFT' : 'COLLECTIBLE FIGURE'}
                  </span>
                </div>
                <div className="text-[11px] text-white/80 mt-1 leading-snug">
                  {activeView === 'mystery_box'
                    ? 'Pastel cherry blossom lacquer and gold filigree box bursting with celestial lavender starlight and ribbons!'
                    : currentGift.miniModelGift.description}
                </div>
              </div>
            </div>

            {/* Quick View Switcher button in bottom-right corner */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                sounds.playSelect();
                setActiveView(activeView === 'mystery_box' ? 'model_gift' : 'mystery_box');
              }}
              className="absolute -bottom-2 -right-2 px-3 py-1.5 rounded-xl bg-white border border-[#C084FC]/60 shadow-md text-xs font-bold text-[#7E22CE] flex items-center gap-1.5 hover:bg-[#FAF5FF]"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{activeView === 'mystery_box' ? 'See Model Gift' : 'See Mystery Box'}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Your Surprise Anime Model Gift Dossier & Collectible Stats */}
        <div className="lg:col-span-6 flex flex-col space-y-3 text-left">
          {/* Quick Character Gift Selector Tabs */}
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#7E22CE] mb-1 font-bold flex items-center justify-between">
              <span>Choose Your Anime Companion Model Gift:</span>
              <span className="text-[#6B21A8] font-medium">{giftCharIdx + 1} of {CHARACTERS.length}</span>
            </div>
            <div className="flex gap-1.5 overflow-x-auto pb-1">
              {CHARACTERS.map((c, i) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setGiftCharIdx(i);
                    setIsUnboxed(true);
                    setActiveView('model_gift');
                    sounds.playSelect();
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all flex items-center gap-1 shrink-0 ${
                    giftCharIdx === i
                      ? 'bg-gradient-to-r from-[#9333EA] to-[#C026D3] text-white font-bold shadow-md'
                      : 'bg-white/90 text-[#4A1535] hover:bg-white border border-[#E9D5FF] shadow-xs'
                  }`}
                >
                  <span>{c.fruitEmoji}</span>
                  <span>{c.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Model Gift Card Dossier */}
          <div className="relative p-4 rounded-xl glass-panel border border-[#E9D5FF] shadow-md space-y-2.5 bg-white/95">
            <div className="relative z-10 flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#9333EA] font-bold">
                  Surprise Anime Model Companion
                </span>
                <h4 className="font-serif-brand text-xl font-extrabold text-[#2E1825]">
                  {currentGift.miniModelGift.title}
                </h4>
                <div className="text-xs text-[#9333EA] font-display-modern font-semibold mt-0.5">
                  {currentGift.miniModelGift.series} · {currentGift.anime}
                </div>
              </div>

              <div className="text-right">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#FAF5FF] border border-[#C084FC]/50 text-[#7E22CE]">
                  {currentGift.miniModelGift.rarity}
                </span>
              </div>
            </div>

            {/* Model Dimensions and Specifications */}
            <div className="relative z-10 grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-[#FAF5FF] border border-[#E9D5FF] shadow-xs space-y-0.5">
                <div className="text-[10px] font-mono text-[#7E22CE] uppercase font-bold">Model Height</div>
                <div className="text-[#2E1825] font-semibold font-mono">{currentGift.miniModelGift.height}</div>
              </div>
              <div className="p-2.5 rounded-lg bg-[#FFF0F7] border border-[#FBCFE8] shadow-xs space-y-0.5">
                <div className="text-[10px] font-mono text-[#BE185D] uppercase font-bold">Fruit Pairing</div>
                <div className="text-[#9D174D] font-semibold">{currentGift.fruitEmoji} {currentGift.fruit} Purée</div>
              </div>
            </div>

            {/* Special Feature */}
            <div className="relative z-10 p-2.5 rounded-lg bg-gradient-to-r from-[#FAF5FF] to-[#FFF0F7] border border-[#E9D5FF] text-xs">
              <span className="text-[10px] font-mono text-[#7E22CE] uppercase block font-bold">Special Model Feature:</span>
              <span className="text-[#2E1825] font-medium">{currentGift.miniModelGift.specialFeature}</span>
            </div>

            {/* Guaranteed Authenticity */}
            <div className="relative z-10 flex items-center justify-between text-[11px] text-[#059669] font-mono font-semibold pt-1 border-t border-[#E9D5FF]/60">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                Hand-Painted Plinth with Official Anime License Seal
              </span>
              <span className="text-[#7E22CE]">Limited Box Edition #1</span>
            </div>
          </div>

          {/* Final Brand Statement Quote */}
          <div className="p-3.5 rounded-xl bg-gradient-to-r from-[#FFF0F7] to-[#FAF5FF] border border-[#E9D5FF] space-y-1 shadow-xs">
            <p className="text-xs sm:text-sm font-display-modern italic font-semibold text-[#8B263E] leading-relaxed">
              “Every box holds a surprise. Every chocolate tells a story. Every FruFriend brings a little happiness.”
            </p>
            <div className="font-serif-brand text-xs font-extrabold tracking-widest text-[#2E1825] uppercase pt-0.5">
              EAT THE MAGIC. DISCOVER YOUR FRIEND!
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-0.5">
            <button
              onClick={() => {
                sounds.playSlideTransition();
                onRestart();
              }}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white hover:bg-white/90 border border-[#E9D5FF] text-[#2E1825] text-xs font-bold active:scale-95 transition-all shadow-xs"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#7E22CE]" />
              <span>Replay Presentation</span>
            </button>

            <button
              onClick={() => {
                sounds.playSelect();
                setShowPitchSummary(true);
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#9333EA] to-[#C026D3] text-white hover:brightness-105 font-bold text-xs shadow-md active:scale-95 transition-all"
            >
              <Award className="w-3.5 h-3.5" />
              <span>Pitch Executive Summary</span>
            </button>
          </div>
        </div>
      </div>

      {/* Pitch Executive Summary Modal */}
      {showPitchSummary && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl p-6 rounded-2xl bg-white text-[#2E1825] shadow-2xl border-2 border-[#C084FC] max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#E9D5FF] pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#9333EA] font-bold">
                  FruFriends Confectionery Pitch Deck
                </span>
                <h3 className="font-serif-brand text-2xl font-extrabold text-[#2E1825]">
                  Executive Pitch Summary
                </h3>
              </div>
              <button
                onClick={() => setShowPitchSummary(false)}
                className="w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center font-bold text-sm text-[#2E1825]"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 py-4 text-xs font-body leading-relaxed text-[#2E1825]/90">
              <div className="p-3 rounded-xl bg-[#FAF5FF] border border-[#E9D5FF]">
                <span className="font-bold text-[#7E22CE]">Brand Core: </span>
                FruFriends transforms luxury confectionery into an emotional connection by pairing six anime icons with authentic soft fruit fillings inside character-sculpted chocolates and collectible companion mini models.
              </div>

              <div className="grid grid-cols-2 gap-3 font-mono">
                <div className="p-2.5 rounded-lg bg-[#FFF0F7] border border-[#FBCFE8]">
                  <span className="text-[#9D174D] block text-[10px] font-bold">2024 Market Size</span>
                  <span className="font-bold text-sm text-[#2E1825]">₹25,245 crore</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#FAF5FF] border border-[#E9D5FF]">
                  <span className="text-[#7E22CE] block text-[10px] font-bold">2033 Projection (7.3% CAGR)</span>
                  <span className="font-bold text-sm text-[#7E22CE]">₹47,878 crore</span>
                </div>
              </div>

              <div>
                <span className="font-bold text-[#2E1825] block mb-1">Six Flavour Pairings & Sculpted Characters:</span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {CHARACTERS.map((c) => (
                    <div key={c.id} className="p-2 rounded bg-[#FAF5FF] border border-[#E9D5FF] flex items-center gap-1.5 shadow-2xs">
                      <span>{c.fruitEmoji}</span>
                      <span className="font-semibold">{c.name.split(' ')[0]}</span>
                      <span className="text-[#7E22CE] font-mono">({c.fruit})</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-[#E9D5FF] flex items-center justify-between">
                <span className="font-mono text-[10px] text-[#7E22CE]">
                  Tagline: Eat the Magic. Discover Your Friend!
                </span>
                <button
                  onClick={() => setShowPitchSummary(false)}
                  className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-[#9333EA] to-[#C026D3] text-white font-semibold text-xs hover:brightness-105"
                >
                  Close Summary
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Subtext */}
      <div className="flex items-center justify-between text-[11px] text-[#7E22CE]/80 pt-2 border-t border-[#E9D5FF] font-mono">
        <span>CLICK MYSTERY BOX OR DRAW BUTTON TO UNBOX DIFFERENT ANIME MODEL GIFTS</span>
        <span>SLIDE 05 OF 05</span>
      </div>
    </div>
  );
};
