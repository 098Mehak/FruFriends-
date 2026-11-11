import React from 'react';
import { Sparkles, RefreshCw, Heart } from 'lucide-react';
import { useAssetImage } from '../hooks/useAssetImage';

export interface AssetImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackCandidates?: string[];
  containerClassName?: string;
  fallbackTitle?: string;
  fallbackSubtitle?: string;
  showFallbackCard?: boolean;
}

export const AssetImage: React.FC<AssetImageProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  fallbackCandidates = [],
  fallbackTitle = 'FruFriends Confectionery',
  fallbackSubtitle = 'Artisanal Anime Chocolate Collection',
  showFallbackCard = true,
  ...imgProps
}) => {
  const { currentSrc, status, isLoading, isLoaded, isError, onNativeLoad, onNativeError, retry } =
    useAssetImage(src, {
      fallbackCandidates,
      timeoutMs: 6000,
    });

  return (
    <div className={`relative w-full h-full overflow-hidden ${containerClassName}`}>
      {/* 1. Loading Shimmer & Elegant Brand Placeholder (Prevents Blank Spaces) */}
      {isLoading && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gradient-to-br from-[#FFF5F7] via-[#FAF5FF] to-[#FDF2F8] animate-pulse pointer-events-none">
          {/* Subtle animated pink/lavender circular halo */}
          <div className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-[#F472B6]/20 via-[#C084FC]/30 to-[#E5C378]/25 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-[#A855F7] animate-spin" style={{ animationDuration: '4s' }} />
            <div className="absolute inset-0 rounded-full border-2 border-[#E9D5FF] border-t-[#C084FC] animate-spin" />
          </div>

          <div className="mt-3 text-center px-4">
            <span className="text-[11px] font-mono tracking-widest text-[#7E22CE] font-bold uppercase">
              Loading FruFriends Art...
            </span>
            <p className="text-[10px] text-[#86198F]/70 font-body mt-0.5">
              Artisanal Anime Confectionery
            </p>
          </div>

          {/* Starlight foil shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
        </div>
      )}

      {/* 2. Error Fallback Card (Prevents Blank Space or Broken Icon on Complete Failure) */}
      {isError && showFallbackCard && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#FFF5F7] via-[#FAF5FF] to-[#F3E8FF] border-2 border-dashed border-[#C084FC]/40 text-center">
          <div className="w-14 h-14 rounded-2xl bg-white shadow-md border border-[#E9D5FF] flex items-center justify-center mb-3">
            <Heart className="w-7 h-7 text-[#EC4899] fill-[#FBCFE8]" />
          </div>

          <h4 className="font-serif-brand text-base font-bold text-[#4A154B] mb-1">
            {fallbackTitle}
          </h4>
          <p className="text-xs text-[#7E22CE] max-w-xs font-body mb-4 leading-relaxed">
            {fallbackSubtitle}
          </p>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              retry();
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#8B263E] text-white hover:bg-[#6B1D2F] transition-all shadow-xs cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reload Artwork</span>
          </button>
        </div>
      )}

      {/* 3. Rendered Image with Direct Native Event Listeners */}
      {currentSrc && (
        <img
          {...imgProps}
          src={currentSrc}
          alt={alt}
          onLoad={onNativeLoad}
          onError={onNativeError}
          className={`${className} transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-90'
          }`}
          referrerPolicy="no-referrer"
        />
      )}
    </div>
  );
};
