import React, { useMemo } from 'react';

interface Petal {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  rotation: number;
  swayAmount: number;
  opacity: number;
}

export const PetalBackground: React.FC<{ density?: number }> = ({ density = 18 }) => {
  const petals = useMemo<Petal[]>(() => {
    return Array.from({ length: density }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 14 + 10,
      duration: Math.random() * 8 + 10,
      delay: Math.random() * 8,
      rotation: Math.random() * 360,
      swayAmount: Math.random() * 40 + 20,
      opacity: Math.random() * 0.45 + 0.25,
    }));
  }, [density]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10" aria-hidden="true">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute -top-8"
          style={{
            left: `${petal.left}%`,
            animation: `petalFall ${petal.duration}s linear infinite`,
            animationDelay: `${petal.delay}s`,
            opacity: petal.opacity,
          }}
        >
          <svg
            width={petal.size}
            height={petal.size * 1.3}
            viewBox="0 0 30 40"
            fill="none"
            style={{
              transform: `rotate(${petal.rotation}deg)`,
              filter: 'drop-shadow(0 2px 4px rgba(74, 21, 37, 0.2))',
            }}
          >
            <path
              d="M15 0 C25 10 30 25 15 40 C0 25 5 10 15 0 Z"
              fill={petal.id % 2 === 0 ? "url(#sakuraGrad)" : "url(#lavenderGrad)"}
            />
            <defs>
              <linearGradient id="sakuraGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF0F5" />
                <stop offset="50%" stopColor="#FBCFE8" />
                <stop offset="100%" stopColor="#F472B6" />
              </linearGradient>
              <linearGradient id="lavenderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FAF5FF" />
                <stop offset="50%" stopColor="#E9D5FF" />
                <stop offset="100%" stopColor="#C084FC" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      ))}

      <style>{`
        @keyframes petalFall {
          0% {
            transform: translate3d(0, -20px, 0) rotate(0deg);
          }
          50% {
            transform: translate3d(30px, 50vh, 0) rotate(180deg);
          }
          100% {
            transform: translate3d(-20px, 105vh, 0) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};
