import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  TrendingUp,
  Users,
  Gift,
  HeartHandshake,
  ShieldAlert,
  BarChart3,
  Calendar,
  Percent
} from 'lucide-react';
import { AGE_SEGMENTS, MARKET_STATS } from '../../data/frufriends';
import { sounds } from '../../utils/sound';

export const Slide4Market: React.FC = () => {
  const [selectedAge, setSelectedAge] = useState<number>(2); // Default Young Adults
  const [animatedMarketSize, setAnimatedMarketSize] = useState<number>(0);
  const [animatedProjectedSize, setAnimatedProjectedSize] = useState<number>(0);
  const [animatedCagr, setAnimatedCagr] = useState<number>(0);

  // Smooth upward counter effect when slide renders
  useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 1400; // 1.4s

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      setAnimatedMarketSize(Math.round(25245 * ease));
      setAnimatedProjectedSize(Math.round(47878 * ease));
      setAnimatedCagr(parseFloat((7.3 * ease).toFixed(1)));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden px-6 lg:px-16 py-6 lg:py-8 bg-gradient-to-br from-[#FFFBF8] via-[#FFF7F3] to-[#FFF0F4] text-[#2E1810]">
      {/* Background ambient gradient */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-[#FFCCD5]/20 via-[#FFE4EC]/30 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Slide Header */}
      <div className="border-b border-[#E5C378]/30 pb-3">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#C99C42] font-bold">
          <TrendingUp className="w-3.5 h-3.5" />
          Market Opportunity & Multi-Generational Demand
        </div>
        
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-2 mt-0.5">
          <div>
            <h2 className="font-serif-brand text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#2E1810]">
              A CHOCOLATE <span className="text-gold-gradient">EVERY GENERATION CAN ENJOY</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#6B1D2F] font-semibold mt-0.5">
              Demographic versatility spanning playground treats to luxury artisanal gifting.
            </p>
          </div>

          {/* Business Core Insight Pill */}
          <div className="max-w-md p-2.5 rounded-xl bg-white/90 border border-[#E5C378]/40 text-xs text-[#2E1810] shadow-xs">
            <span className="font-bold text-[#6B1D2F]">Strategic Trifecta: </span>
            “FruFriends connects three consumer interests: chocolate indulgence, character fandom and collectible gifting.”
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start my-auto">
        {/* Left Column: 4 Age-Group Segmentation Cards */}
        <div className="lg:col-span-7 flex flex-col space-y-2 text-left">
          <div className="flex items-center justify-between text-xs font-mono text-[#5C382A] font-bold mb-0.5">
            <span>TARGET DEMOGRAPHIC SEGMENTS</span>
            <span>TAP TO HIGHLIGHT</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {AGE_SEGMENTS.map((seg, idx) => {
              const isSelected = selectedAge === idx;
              return (
                <div
                  key={seg.group}
                  onClick={() => {
                    setSelectedAge(idx);
                    sounds.playSelect();
                  }}
                  className={`p-3.5 rounded-xl border transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-white border-[#6B1D2F] shadow-md scale-[1.02]'
                      : 'bg-white/70 border-[#E5C378]/30 hover:border-[#6B1D2F]/40 hover:bg-white/90 shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-serif-brand text-sm font-bold text-[#2E1810] tracking-wide">
                      {seg.group}
                    </span>
                    <span className="text-[11px] font-mono font-bold text-[#6B1D2F] bg-[#6B1D2F]/10 px-2 py-0.5 rounded-full border border-[#6B1D2F]/20">
                      Age {seg.ageRange}
                    </span>
                  </div>

                  <p className="text-xs text-[#4A2D22] leading-snug font-body mb-2">
                    {seg.description}
                  </p>

                  <div className="pt-2 border-t border-[#E5C378]/25 flex items-center justify-between text-[11px]">
                    <span className="text-[#8B263E] font-semibold font-display-modern">
                      {seg.badge}
                    </span>
                    <span className="text-[10px] text-[#5C382A] font-mono font-medium">
                      {seg.drivers[0]}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Segment Detail Callout */}
          <div className="p-3 rounded-xl bg-white/90 border border-[#E5C378]/35 shadow-xs text-xs">
            <div className="font-mono text-[10px] text-[#C99C42] uppercase mb-1 font-bold">
              Core Drivers for {AGE_SEGMENTS[selectedAge].group} (Age {AGE_SEGMENTS[selectedAge].ageRange}):
            </div>
            <div className="flex flex-wrap gap-1.5">
              {AGE_SEGMENTS[selectedAge].drivers.map((driver, i) => (
                <span
                  key={i}
                  className="px-2 py-1 rounded-md bg-[#FFF5F7] text-[#4A2D22] border border-[#E5C378]/30 text-[11px] font-medium font-body"
                >
                  ✦ {driver}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Indian Chocolate Market Expansion Figures & Graph */}
        <div className="lg:col-span-5 flex flex-col space-y-4">
          <div className="p-5 rounded-2xl glass-card border border-[#E5C378]/40 shadow-xl text-left space-y-3.5 bg-white/90">
            <div className="flex items-center justify-between border-b border-[#E5C378]/30 pb-2.5">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#C99C42] font-bold">
                  Market Intelligence
                </span>
                <h3 className="font-serif-brand text-lg font-bold text-[#2E1810]">
                  INDIAN CHOCOLATE MARKET
                </h3>
              </div>
              <BarChart3 className="w-5 h-5 text-[#6B1D2F]" />
            </div>

            {/* Live Count-Up KPI Cards */}
            <div className="grid grid-cols-2 gap-3">
              {/* 2024 Market Size */}
              <div className="p-3 rounded-xl bg-[#FFFBF8] border border-[#E5C378]/40 shadow-xs">
                <div className="text-[10px] font-mono uppercase text-[#5C382A] font-bold flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-[#6B1D2F]" />
                  2024 Market Size
                </div>
                <div className="font-mono text-xl sm:text-2xl font-bold text-[#2E1810] mt-1 tabular-nums">
                  ₹{animatedMarketSize.toLocaleString('en-IN')} <span className="text-xs text-[#5C382A] font-sans font-normal">cr</span>
                </div>
                <div className="text-[10px] text-[#5C382A] font-mono mt-0.5">
                  Base estimated year
                </div>
              </div>

              {/* 2033 Projected Size */}
              <div className="p-3 rounded-xl bg-gradient-to-br from-[#FFF5F7] to-[#FFFBF8] border border-[#6B1D2F]/30 shadow-xs">
                <div className="text-[10px] font-mono uppercase text-[#6B1D2F] font-bold flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-[#6B1D2F]" />
                  2033 Projection
                </div>
                <div className="font-mono text-xl sm:text-2xl font-bold text-[#6B1D2F] mt-1 tabular-nums">
                  ₹{animatedProjectedSize.toLocaleString('en-IN')} <span className="text-xs text-[#6B1D2F]/80 font-sans font-normal">cr</span>
                </div>
                <div className="text-[10px] text-[#059669] font-mono font-bold mt-0.5">
                  Almost +90% expansion
                </div>
              </div>
            </div>

            {/* CAGR Card */}
            <div className="p-3 rounded-xl bg-[#FFFBF8] border border-[#E5C378]/35 flex items-center justify-between shadow-xs">
              <div>
                <div className="text-[10px] font-mono uppercase text-[#5C382A] font-bold">
                  Projected CAGR (2025–2033)
                </div>
                <div className="font-mono text-2xl font-extrabold text-[#059669] mt-0.5 tabular-nums">
                  {animatedCagr}% <span className="text-xs text-[#5C382A] font-sans font-normal">per annum</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#059669]/10 border border-[#059669]/30 flex items-center justify-center text-[#059669]">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>

            {/* Visual Growth Comparison Bar */}
            <div className="space-y-1.5 pt-0.5">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-[#5C382A] font-medium">2024: ₹25,245 cr</span>
                <span className="text-[#6B1D2F] font-bold">2033: ₹47,878 cr (+1.9x)</span>
              </div>
              <div className="h-3 w-full bg-[#FFE4EC] rounded-full overflow-hidden p-0.5 border border-[#E5C378]/30">
                <div
                  className="h-full bg-gradient-to-r from-[#8B263E] via-[#C99C42] to-[#059669] rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${Math.min((animatedProjectedSize / 47878) * 100, 100)}%` }}
                />
              </div>
            </div>

            {/* Strict Statutory Attribution & Disclaimer */}
            <div className="pt-2 border-t border-[#E5C378]/30 space-y-1">
              <div className="flex items-center justify-between text-[10px] font-mono text-[#5C382A]">
                <span className="font-semibold">Source: {MARKET_STATS.source}</span>
                <span>Third-Party Industry Report</span>
              </div>
              <p className="text-[10px] text-[#5C382A]/80 leading-tight font-mono">
                * Note: Figures represent estimates for the overall Indian chocolate confectionery market, not FruFriends revenue or market share.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Subtext */}
      <div className="flex items-center justify-between text-[11px] text-[#5C382A]/70 pt-2 border-t border-[#E5C378]/30 font-mono">
        <span>DATA SOURCE: IBEF CITING IMARC · ALL-AGE DEMOGRAPHIC FIT</span>
        <span>SLIDE 04 OF 05</span>
      </div>
    </div>
  );
};
