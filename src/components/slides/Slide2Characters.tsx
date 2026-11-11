import React, { useState } from 'react';
import { Eye, Sparkles, Layers, ShieldCheck, Quote, Heart, HeartHandshake } from 'lucide-react';
import { CHARACTERS, IMAGES, FruFriendCharacter } from '../../data/frufriends';
import { sounds } from '../../utils/sound';
import { AssetImage } from '../AssetImage';

export const Slide2Characters: React.FC = () => {
  const [selectedCharIndex, setSelectedCharIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'sculpted' | 'filling' | 'lineup' | 'cute_action'>('sculpted');

  const char: FruFriendCharacter = CHARACTERS[selectedCharIndex];

  // Pick the right image based on view mode and selected character
  const getProductImage = () => {
    if (viewMode === 'cute_action') {
      return IMAGES.nezukoCuteAction;
    }
    if (viewMode === 'lineup') {
      return IMAGES.collectionLineup;
    }
    if (viewMode === 'filling') {
      return IMAGES.crossSection;
    }
    // 'sculpted': natural character-shaped edible chocolate
    return char.sculptedChocolateImage || IMAGES.collectionLineup;
  };

  const handleCharSelect = (index: number) => {
    setSelectedCharIndex(index);
    sounds.playSelect();
    if (viewMode === 'cute_action' && CHARACTERS[index].id !== 'nezuko') {
      setViewMode('sculpted');
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden px-6 lg:px-16 py-6 lg:py-8 bg-gradient-to-br from-[#FFFBF8] via-[#FFF7F4] to-[#FFF2F5] text-[#2E1810]">
      {/* Dynamic ambient background glow tied to character's fruit accent */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-700 -z-10 opacity-70"
        style={{
          background: `radial-gradient(circle at 60% 40%, ${char.themeColor.glow} 0%, rgba(255, 251, 248, 0.95) 75%)`
        }}
      />

      {/* Slide Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#E5C378]/30 pb-3">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#C99C42] font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            Natural Artisanal Character-Sculpted Chocolates
          </div>
          <h2 className="font-serif-brand text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#2E1810] mt-0.5">
            SIX CHARACTERS. <span className="text-gold-gradient">SIX FRUIT SURPRISES.</span>
          </h2>
        </div>

        {/* View mode toggle: Anime-Sculpted vs Fruit Filling vs 6-Hero Lineup */}
        <div className="flex items-center p-1 rounded-xl bg-white/90 border border-[#E5C378]/40 shadow-xs self-start sm:self-auto">
          <button
            onClick={() => {
              setViewMode('sculpted');
              sounds.playSelect();
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewMode === 'sculpted'
                ? 'bg-gradient-to-r from-[#6B1D2F] to-[#8B263E] text-white shadow-xs'
                : 'text-[#5C382A] hover:text-[#2E1810]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Natural Sculpted Form
          </button>
          
          <button
            onClick={() => {
              setViewMode('filling');
              sounds.playSelect();
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewMode === 'filling'
                ? 'bg-gradient-to-r from-[#6B1D2F] to-[#8B263E] text-white shadow-xs'
                : 'text-[#5C382A] hover:text-[#2E1810]'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            Fruit Core Filling
          </button>

          <button
            onClick={() => {
              setViewMode('lineup');
              sounds.playSelect();
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hidden md:flex ${
              viewMode === 'lineup'
                ? 'bg-gradient-to-r from-[#6B1D2F] to-[#8B263E] text-white shadow-xs'
                : 'text-[#5C382A] hover:text-[#2E1810]'
            }`}
          >
            All 6 Lineup
          </button>
        </div>
      </div>

      {/* Character Selector Horizontal Strip */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 my-2">
        {CHARACTERS.map((item, index) => {
          const isSelected = selectedCharIndex === index;
          return (
            <button
              key={item.id}
              onClick={() => handleCharSelect(index)}
              className={`relative flex flex-col items-center p-2 rounded-xl border transition-all duration-300 ${
                isSelected
                  ? 'bg-white border-[#6B1D2F] shadow-md scale-[1.02] -translate-y-0.5'
                  : 'bg-white/70 border-[#E5C378]/30 hover:border-[#6B1D2F]/40 hover:bg-white/90 opacity-80 hover:opacity-100 shadow-xs'
              }`}
            >
              {/* Little active indicator line */}
              {isSelected && (
                <div className="absolute -top-1 w-8 h-1 rounded-full bg-[#6B1D2F]" />
              )}
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#FFF0F4] text-lg mb-1 shadow-inner">
                {item.fruitEmoji}
              </div>
              <div className="text-xs font-bold text-[#2E1810] truncate max-w-full">
                {item.name.split(' ')[0]}
              </div>
              <div className="text-[10px] text-[#6B1D2F] font-mono font-semibold">
                {item.fruit}
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Showcase Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center my-auto">
        {/* Left: Product Visual Presentation with Shell/Filling/Cute Action Switch */}
        <div className="lg:col-span-6 relative flex flex-col items-center justify-center">
          <div className="relative w-full max-w-lg aspect-4/3 rounded-2xl overflow-hidden glass-card p-2 border border-[#E5C378]/40 shadow-xl">
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#FFF5F7]">
              <AssetImage
                src={getProductImage()}
                alt={`${char.name} ${char.fruit} Edible Chocolate Sculpted Form`}
                className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
                fallbackCandidates={[
                  char.sculptedChocolateImage,
                  IMAGES.collectionLineup,
                  '/assets/images/anime_character_chocolates_six_1794419628329.jpg'
                ]}
                fallbackTitle={`${char.name} · ${char.fruit} Chocolate`}
                fallbackSubtitle={char.flavorProfile}
              />

              {/* Gradient scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-85" />

              {/* Status overlay */}
              <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/90 backdrop-blur-md border border-[#E5C378]/40 text-[#6B1D2F] shadow-xs">
                  {char.fruitEmoji} {char.fruit} Purée
                </span>
                <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-black/60 backdrop-blur-md text-[#FFFBF7]">
                  {viewMode === 'cute_action' ? 'Kawaii Blossom Action' : 'Handcrafted Sculpt'}
                </span>
              </div>

              {/* Nezuko Cute Action Button (Available on Nezuko card) */}
              {char.id === 'nezuko' && (
                <div className="absolute top-3.5 right-3.5">
                  <button
                    onClick={() => {
                      sounds.playSelect();
                      setViewMode(viewMode === 'cute_action' ? 'sculpted' : 'cute_action');
                    }}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EC4899] text-white text-xs font-bold shadow-md hover:bg-[#DB2777] active:scale-95 transition-all"
                  >
                    <Heart className="w-3.5 h-3.5 fill-white" />
                    <span>{viewMode === 'cute_action' ? 'Show Chocolate' : 'Nezuko Cute Action!'}</span>
                  </button>
                </div>
              )}

              {/* Bottom Caption on Image */}
              <div className="absolute bottom-3 left-3 right-3 text-xs text-white bg-black/75 backdrop-blur-md p-3 rounded-xl border border-white/20">
                <div className="font-bold text-[#FFFBF7] flex items-center justify-between">
                  <span>
                    {viewMode === 'cute_action'
                      ? 'Nezuko Kamado · Kawaii Cuteness Action'
                      : viewMode === 'sculpted'
                      ? `${char.name} Natural Sculpted Chocolate`
                      : viewMode === 'filling'
                      ? `${char.name} · Velvety Fruit Coulis Core`
                      : 'All Six Anime Character Chocolates'}
                  </span>
                  <span className="text-[10px] font-mono text-[#E5C378]">NATURAL CONFECTIONERY</span>
                </div>
                <div className="text-[11px] text-white/80 mt-1 leading-snug">
                  {viewMode === 'cute_action'
                    ? 'Nezuko peeking out with wide sparkling eyes, bamboo muzzle, and cherry blossom hearts!'
                    : viewMode === 'sculpted'
                    ? `Artisanal edible chocolate sculpted into ${char.name}'s character likeness with realistic cocoa textures and fresh ${char.fruit}.`
                    : viewMode === 'filling'
                    ? `Luscious cut-open view showing the rich, soft ${char.fruit} reduction center oozing from the tempered chocolate.`
                    : 'The complete set of six handcrafted character-shaped chocolates on a luxury marble counter with fresh fruit.'}
                </div>
              </div>
            </div>

            {/* Floating Fruit Accent Tag */}
            <div className="absolute -bottom-2.5 -right-2.5 px-3 py-1.5 rounded-xl glass-panel border border-[#E5C378]/50 shadow-md flex items-center gap-2">
              <span className="text-xl animate-bounce">{char.fruitEmoji}</span>
              <div>
                <div className="text-[11px] font-bold text-[#6B1D2F]">{char.fruit} Infusion</div>
                <div className="text-[9px] text-[#5C382A] font-mono">100% Real Fruit Purée</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Character Chocolate Dossier */}
        <div className="lg:col-span-6 flex flex-col space-y-3.5 text-left">
          {/* Header & Lore */}
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#6B1D2F] font-bold">
              <span>CHARACTER 0{selectedCharIndex + 1}</span>
              <span>·</span>
              <span>{char.anime}</span>
            </div>
            <h3 className="font-serif-brand text-2xl sm:text-3xl font-extrabold text-[#2E1810]">
              {char.name}
            </h3>
            <p className="text-xs text-[#8B263E] font-display-modern font-semibold">
              {char.characterTitle}
            </p>
          </div>

          {/* Flavor Profile Callout */}
          <div className="p-3 rounded-xl bg-white/90 border border-[#E5C378]/40 shadow-xs">
            <div className="text-[11px] font-mono uppercase tracking-wider text-[#7A4B13] font-bold">
              Flavor Experience
            </div>
            <p className="text-xs sm:text-sm font-semibold text-[#2E1810] mt-0.5 leading-snug">
              {char.flavorProfile}
            </p>
          </div>

          {/* Chocolate & Filling Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
            <div className="p-2.5 rounded-lg bg-white/80 border border-[#E5C378]/30 shadow-xs space-y-0.5">
              <div className="text-[#5C382A] text-[10px] font-mono uppercase font-bold">Chocolate Shell</div>
              <div className="text-[#2E1810] font-semibold leading-tight">{char.chocolateShell}</div>
            </div>
            <div className="p-2.5 rounded-lg bg-white/80 border border-[#E5C378]/30 shadow-xs space-y-0.5">
              <div className="text-[#5C382A] text-[10px] font-mono uppercase font-bold">Fruit Filling</div>
              <div className="text-[#2E1810] font-semibold leading-tight">{char.fruitFilling}</div>
            </div>
          </div>

          {/* Tasting Notes */}
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#5C382A] font-bold mb-1">
              Artisanal Tasting Notes:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {char.tastingNotes.map((note, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-white border border-[#E5C378]/40 text-xs text-[#6B1D2F] font-semibold font-body shadow-xs"
                >
                  {note}
                </span>
              ))}
            </div>
          </div>

          {/* Character Quote */}
          <div className="flex items-start gap-2 pt-1 border-t border-[#E5C378]/30">
            <Quote className="w-4 h-4 text-[#C99C42] shrink-0 mt-0.5" />
            <p className="text-xs italic text-[#4A2D22] font-body">
              “{char.quote}”
            </p>
          </div>

          {/* Quality Guarantee */}
          <div className="flex items-center gap-2 text-[11px] text-[#059669] font-mono font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Sculpted with Food-Grade Cocoa Butter & Real Fruit Compote</span>
          </div>
        </div>
      </div>

      {/* Bottom Subtext */}
      <div className="flex items-center justify-between text-[11px] text-[#5C382A]/70 pt-2 border-t border-[#E5C378]/30 font-mono">
        <span>CLICK ANY CHARACTER OR VIEW MODE TO INSPECT SCULPTED CHOCOLATES</span>
        <span>SLIDE 02 OF 05</span>
      </div>
    </div>
  );
};
