import React from 'react';
import { motion } from 'motion/react';
import { Realistic3DLantern } from './Chinese3DLantern';

// 1. Classical Chinese Ocean Wave Crest Pattern (海水江崖纹)
export const ChineseWaveBorder: React.FC<{
  className?: string;
  height?: number;
  colorTheme?: 'dark' | 'light' | 'gold' | 'red';
}> = ({ className = '', height = 48, colorTheme = 'red' }) => {
  const strokeColors = {
    red: { primary: '#b91c1c', secondary: '#ef4444', gold: '#f59e0b', fill: '#7f1d1d' },
    dark: { primary: '#1e293b', secondary: '#334155', gold: '#d97706', fill: '#0f172a' },
    light: { primary: '#dc2626', secondary: '#f87171', gold: '#fbbf24', fill: '#fef2f2' },
    gold: { primary: '#b45309', secondary: '#d97706', gold: '#fef08a', fill: '#78350f' },
  }[colorTheme];

  return (
    <div className={`w-full overflow-hidden leading-none relative ${className}`} style={{ height }}>
      <svg
        className="w-full h-full min-w-[800px]"
        viewBox="0 0 1200 80"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="wavePattern" width="120" height="80" patternUnits="userSpaceOnUse">
            {/* Wave Arches Tiers */}
            <path
              d="M 0 80 Q 30 20 60 80 Q 90 20 120 80 Z"
              fill={strokeColors.fill}
              opacity="0.3"
            />
            <path
              d="M 0 80 C 20 40, 40 40, 60 80 C 80 40, 100 40, 120 80"
              fill="none"
              stroke={strokeColors.primary}
              strokeWidth="2.5"
            />
            <path
              d="M 10 80 C 25 50, 35 50, 50 80 M 70 80 C 85 50, 95 50, 110 80"
              fill="none"
              stroke={strokeColors.secondary}
              strokeWidth="1.8"
              strokeDasharray="4 2"
            />
            <path
              d="M 20 80 C 30 62, 30 62, 40 80 M 80 80 C 90 62, 90 62, 100 80"
              fill="none"
              stroke={strokeColors.gold}
              strokeWidth="1.2"
            />
            {/* Wave Foam Spray Dots */}
            <circle cx="30" cy="38" r="1.5" fill={strokeColors.gold} />
            <circle cx="90" cy="38" r="1.5" fill={strokeColors.gold} />
            <circle cx="25" cy="45" r="1" fill="#ffffff" />
            <circle cx="95" cy="45" r="1" fill="#ffffff" />
          </pattern>
        </defs>

        <rect width="1200" height="80" fill="url(#wavePattern)" />
      </svg>
    </div>
  );
};

// 2. Animated Flying Cranes (仙鹤/飞鸟)
export const FlyingCranes: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden z-10 ${className}`}>
      {/* Crane 1 */}
      <motion.div
        initial={{ x: '-10%', y: '20%', opacity: 0, scale: 0.6 }}
        animate={{
          x: ['-10%', '110%'],
          y: ['20%', '10%'],
          opacity: [0, 0.85, 0.85, 0],
        }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear', delay: 2 }}
        className="absolute top-12 left-0"
      >
        <svg width="42" height="32" viewBox="0 0 64 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Crane silhouette */}
          <path
            d="M 2 24 Q 16 8 32 20 Q 48 4 62 18 Q 44 26 32 24 Q 20 38 2 24 Z"
            fill="#1c1917"
            opacity="0.85"
          />
          <path d="M 32 20 L 52 2" stroke="#dc2626" strokeWidth="2" /> {/* Red crown tip */}
        </svg>
      </motion.div>

      {/* Crane 2 (Smaller follower) */}
      <motion.div
        initial={{ x: '-15%', y: '28%', opacity: 0, scale: 0.45 }}
        animate={{
          x: ['-15%', '105%'],
          y: ['28%', '16%'],
          opacity: [0, 0.7, 0.7, 0],
        }}
        transition={{ duration: 32, repeat: Infinity, ease: 'linear', delay: 5 }}
        className="absolute top-20 left-0"
      >
        <svg width="32" height="24" viewBox="0 0 64 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M 2 24 Q 16 8 32 20 Q 48 4 62 18 Q 44 26 32 24 Q 20 38 2 24 Z"
            fill="#1c1917"
            opacity="0.75"
          />
        </svg>
      </motion.div>
    </div>
  );
};

// 3. Falling Plum Blossom Petals (落花/梅花瓣)
export const FallingPlumPetals: React.FC<{ count?: number }> = ({ count = 12 }) => {
  const petals = Array.from({ length: count });

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {petals.map((_, i) => {
        const leftPos = (i * 8.5) % 95; // Distribute across width
        const duration = 10 + (i % 5) * 2.5; // Random durations
        const delay = (i * 1.8) % 12;
        const size = 12 + (i % 3) * 4;

        return (
          <motion.div
            key={i}
            initial={{ y: -30, x: `${leftPos}%`, rotate: 0, opacity: 0 }}
            animate={{
              y: ['0vh', '100vh'],
              x: [`${leftPos}%`, `${leftPos + (i % 2 === 0 ? 12 : -12)}%`],
              rotate: [0, 360],
              opacity: [0, 0.8, 0.8, 0],
            }}
            transition={{
              duration,
              repeat: Infinity,
              ease: 'linear',
              delay,
            }}
            className="absolute top-0"
          >
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
              {/* Petal Shape */}
              <path
                d="M12 2C10 7 4 10 4 15C4 18.866 7.58172 22 12 22C16.4183 22 20 18.866 20 15C20 10 14 7 12 2Z"
                fill={i % 2 === 0 ? '#dc2626' : '#f87171'}
                opacity={0.8}
              />
            </svg>
          </motion.div>
        );
      })}
    </div>
  );
};

// 4. Ink Plum Blossom Branch Overlay (梅花枝)
export const PlumBlossomBranch: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 200 200"
    className={`w-40 h-40 pointer-events-none ${className}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Branch stroke */}
    <path
      d="M 200 0 C 160 30, 120 20, 80 60 C 50 90, 30 110, 0 130"
      stroke="#271c19"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <path
      d="M 120 20 C 100 40, 80 30, 60 35"
      stroke="#271c19"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <path
      d="M 80 60 C 65 80, 45 75, 30 85"
      stroke="#271c19"
      strokeWidth="2"
      strokeLinecap="round"
    />

    {/* Blossoms (Red Dots) */}
    <circle cx="160" cy="22" r="6" fill="#dc2626" />
    <circle cx="140" cy="18" r="5" fill="#f87171" />
    <circle cx="110" cy="22" r="7" fill="#dc2626" />
    <circle cx="95" cy="32" r="5" fill="#ef4444" />
    <circle cx="80" cy="60" r="8" fill="#dc2626" />
    <circle cx="60" cy="35" r="6" fill="#f87171" />
    <circle cx="50" cy="80" r="7" fill="#dc2626" />
    <circle cx="30" cy="85" r="5" fill="#ef4444" />
    <circle cx="30" cy="110" r="6" fill="#dc2626" />
  </svg>
);

// 5. Complete Guofeng Mid-Autumn Heritage Showcase Card
export const GuofengHeritageShowcaseCard: React.FC = () => {
  return (
    <div className="relative w-full rounded-3xl overflow-hidden bg-[#faf7f2] border-2 border-[#e8dfd1] shadow-2xl my-12 text-[#1c1917] p-6 sm:p-12">
      {/* Background Rice Paper Texture Overlay */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #7c2d12 1px, transparent 0)',
          backgroundSize: '16px 16px',
        }}
      />

      {/* Plum Blossom Branch Top Right */}
      <div className="absolute top-0 right-0 z-20 hidden sm:block opacity-90">
        <PlumBlossomBranch className="w-56 h-56" />
      </div>

      {/* Flying Cranes across sky */}
      <FlyingCranes />

      {/* Falling Petals Effect */}
      <FallingPlumPetals count={8} />

      {/* Giant Crimson Sun Disc */}
      <div className="absolute top-1/2 -right-12 sm:right-12 -translate-y-1/2 w-72 h-72 sm:w-[420px] sm:h-[420px] rounded-full bg-gradient-to-br from-[#dc2626] via-[#b91c1c] to-[#7f1d1d] opacity-90 shadow-[0_0_80px_rgba(220,38,38,0.25)] pointer-events-none" />

      {/* Floating 3D Lantern */}
      <div className="absolute top-8 right-16 sm:right-36 z-30">
        <Realistic3DLantern size="lg" floatDuration={5} />
      </div>

      {/* Traditional Pagoda Silhouette */}
      <div className="absolute bottom-10 right-0 w-3/4 sm:w-1/2 h-44 pointer-events-none opacity-25 flex items-end justify-end">
        <svg viewBox="0 0 500 180" className="w-full h-full text-[#291b16]" fill="currentColor">
          <path d="M0 180 H500 V110 C440 110 400 70 340 50 C280 30 240 5 200 0 C160 5 120 30 60 50 C20 70 0 110 0 110 Z" />
          <path d="M120 180 H380 V100 C340 100 310 70 270 55 C230 40 210 15 180 10 C150 15 130 40 90 55 C50 70 20 100 120 100 Z" opacity="0.6" />
        </svg>
      </div>

      {/* Content Container */}
      <div className="relative z-20 max-w-2xl">
        {/* Seal Stamps Row */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="chinese-stamp px-2.5 py-1 text-xs font-serif font-bold border-red-700 text-red-700 bg-red-50/80">
            平安喜乐
          </span>
          <span className="chinese-stamp px-2.5 py-1 text-xs font-serif font-bold border-amber-700 text-amber-800 bg-amber-50/80">
            月满中秋
          </span>
          <span className="text-xs font-bold tracking-widest text-slate-600 uppercase font-serif">
            Peace, Joy & Prosperity
          </span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#1c1917] tracking-tight mb-4 leading-[1.15]">
          A Journey to China.<br />
          <span className="bg-gradient-to-r from-red-700 via-amber-700 to-amber-600 bg-clip-text text-transparent">
            Your Gateway to Heritage & Higher Education.
          </span>
        </h2>

        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-8 max-w-lg font-sans">
          Embrace the rich cultural tapestry of Hangzhou, Shanghai, and Beijing. Join over 500+ international scholars studying at China’s top tier double first-class universities.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <a
            href="https://wa.me/8615968141445"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#b91c1c] hover:bg-[#991b1b] text-white px-7 py-3.5 rounded-2xl font-bold text-sm shadow-xl shadow-red-900/20 hover:scale-105 transition-all flex items-center gap-2"
          >
            <span>Apply Now</span>
            <span className="chinese-stamp text-[10px] px-1.5 py-0 border-white text-white bg-transparent">
              即刻申请
            </span>
          </a>
        </div>
      </div>

      {/* Bottom Wave Crest Pattern Footer */}
      <div className="absolute bottom-0 left-0 right-0 z-10 opacity-80">
        <ChineseWaveBorder height={40} colorTheme="red" />
      </div>
    </div>
  );
};
