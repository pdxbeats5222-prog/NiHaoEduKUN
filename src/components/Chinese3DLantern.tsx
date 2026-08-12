import React from 'react';
import { motion } from 'motion/react';

interface LanternProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  floatDuration?: number;
  glowColor?: string;
  hasTassel?: boolean;
}

export const Realistic3DLantern: React.FC<LanternProps> = ({
  className = '',
  size = 'md',
  floatDuration = 6,
  hasTassel = true,
}) => {
  const sizeDimensions = {
    sm: { width: 48, height: 72 },
    md: { width: 72, height: 110 },
    lg: { width: 110, height: 160 },
    xl: { width: 160, height: 230 },
  }[size];

  const w = sizeDimensions.width;
  const h = sizeDimensions.height;

  return (
    <motion.div
      animate={{
        y: [0, -14, 0],
        rotateZ: [-2, 2, -2],
        rotateY: [0, 8, -8, 0],
      }}
      transition={{
        duration: floatDuration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className={`relative inline-block pointer-events-none select-none filter drop-shadow-[0_15px_25px_rgba(185,28,28,0.35)] ${className}`}
      style={{ perspective: 800 }}
    >
      <svg
        width={w}
        height={h}
        viewBox="0 0 160 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        <defs>
          {/* Top/Bottom Mahogany Wood Texture */}
          <linearGradient id="woodGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1c0a00" />
            <stop offset="30%" stopColor="#4a1805" />
            <stop offset="50%" stopColor="#7a2a0a" />
            <stop offset="70%" stopColor="#4a1805" />
            <stop offset="100%" stopColor="#1c0a00" />
          </linearGradient>

          {/* Gold Trim Gradient */}
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9a6e00" />
            <stop offset="25%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#d97706" />
            <stop offset="75%" stopColor="#fef08a" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>

          {/* 3D Silk Red Body Radial Gradient */}
          <radialGradient id="silkRadial3D" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.95" /> {/* Inner glowing candle light */}
            <stop offset="25%" stopColor="#f87171" />
            <stop offset="55%" stopColor="#dc2626" />
            <stop offset="85%" stopColor="#991b1b" />
            <stop offset="100%" stopColor="#450a0a" />
          </radialGradient>

          {/* Volumetric Candle Glow Filter */}
          <filter id="glowLight" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Silk Shimmer Overlay */}
          <linearGradient id="silkShimmer" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
            <stop offset="35%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="65%" stopColor="#000000" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.6" />
          </linearGradient>

          {/* Gold Tassel Gradient */}
          <linearGradient id="tasselGold" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="40%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#92400e" />
          </linearGradient>
        </defs>

        {/* Hanging Cord */}
        <line x1="80" y1="0" x2="80" y2="30" stroke="#78350f" strokeWidth="2.5" />
        <line x1="80" y1="0" x2="80" y2="30" stroke="#fef08a" strokeWidth="1" strokeDasharray="3 3" />

        {/* Top Hook Ring */}
        <circle cx="80" cy="30" r="5" fill="none" stroke="url(#goldGradient)" strokeWidth="3" />

        {/* Upper Wood Collar */}
        <ellipse cx="80" cy="38" rx="28" ry="7" fill="url(#woodGradient)" />
        <ellipse cx="80" cy="36" rx="28" ry="7" fill="none" stroke="url(#goldGradient)" strokeWidth="2" />
        <rect x="52" y="38" width="56" height="8" fill="url(#woodGradient)" />
        <rect x="52" y="44" width="56" height="3" fill="url(#goldGradient)" />

        {/* Glowing Volumetric Candle Light Effect behind Silk */}
        <ellipse cx="80" cy="95" rx="35" ry="40" fill="#fef08a" opacity="0.6" filter="url(#glowLight)" />

        {/* Main 3D Oval Silk Body */}
        <path
          d="M 25 95 C 25 48, 135 48, 135 95 C 135 142, 25 142, 25 95 Z"
          fill="url(#silkRadial3D)"
        />
        {/* Shimmer Overlay */}
        <path
          d="M 25 95 C 25 48, 135 48, 135 95 C 135 142, 25 142, 25 95 Z"
          fill="url(#silkShimmer)"
          style={{ mixBlendMode: 'overlay' }}
        />

        {/* 3D Vertical Bamboo Ribbing Lines */}
        <path d="M 80 47 Q 80 95 80 143" stroke="#fef08a" strokeWidth="1.5" opacity="0.8" />
        <path d="M 80 47 Q 62 95 62 143" stroke="#fef08a" strokeWidth="1.2" opacity="0.6" />
        <path d="M 80 47 Q 98 95 98 143" stroke="#fef08a" strokeWidth="1.2" opacity="0.6" />
        <path d="M 80 47 Q 44 95 44 143" stroke="#fef08a" strokeWidth="1" opacity="0.4" />
        <path d="M 80 47 Q 116 95 116 143" stroke="#fef08a" strokeWidth="1" opacity="0.4" />

        {/* Traditional Auspicious Gold Motif / Emblem in Center */}
        <g opacity="0.75" transform="translate(80, 95) scale(0.7)">
          <circle cx="0" cy="0" r="18" fill="none" stroke="url(#goldGradient)" strokeWidth="2" />
          <circle cx="0" cy="0" r="14" fill="none" stroke="url(#goldGradient)" strokeWidth="1" strokeDasharray="2 2" />
          {/* Chinese Character / Pattern */}
          <path d="M-8 -5 H8 M0 -8 V8 M-6 4 H6" stroke="url(#goldGradient)" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Lower Wood Collar */}
        <rect x="52" y="143" width="56" height="3" fill="url(#goldGradient)" />
        <rect x="52" y="146" width="56" height="8" fill="url(#woodGradient)" />
        <ellipse cx="80" cy="154" rx="28" ry="7" fill="url(#woodGradient)" />
        <ellipse cx="80" cy="154" rx="28" ry="7" fill="none" stroke="url(#goldGradient)" strokeWidth="2" />

        {/* Lower Tassel Mount */}
        {hasTassel && (
          <g>
            <circle cx="80" cy="161" r="4" fill="url(#goldGradient)" />
            {/* Tassel Knot */}
            <rect x="76" y="165" width="8" height="10" rx="2" fill="url(#tasselGold)" />
            {/* Hanging Tassel Threads */}
            <path
              d="M 76 175 Q 73 210 70 235 M 78 175 Q 77 210 76 235 M 80 175 V 238 M 82 175 Q 83 210 84 235 M 84 175 Q 87 210 90 235"
              stroke="url(#tasselGold)"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            {/* Tassel Bead */}
            <circle cx="80" cy="170" r="3" fill="#b91c1c" stroke="url(#goldGradient)" strokeWidth="1" />
          </g>
        )}
      </svg>
    </motion.div>
  );
};

export const ChineseAestheticHeroBanner: React.FC = () => {
  return (
    <div className="relative w-full rounded-3xl overflow-hidden bg-[#f7f2e9] border border-[#e8ded0] p-6 sm:p-10 shadow-2xl my-8 text-slate-800">
      {/* Background Subtle Papyrus Pattern */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 2px 2px, #8b0000 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Terracotta Crimson Sun Disc */}
      <div className="absolute top-1/2 right-4 sm:right-16 -translate-y-1/2 w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-gradient-to-br from-[#d84a26] via-[#c83e1c] to-[#991b1b] opacity-90 shadow-2xl pointer-events-none" />

      {/* Floating 3D Lantern Overlay */}
      <div className="absolute top-4 right-8 sm:right-28 z-20 hidden md:block">
        <Realistic3DLantern size="lg" floatDuration={5.5} />
      </div>

      <div className="absolute top-16 right-60 z-20 hidden lg:block opacity-85">
        <Realistic3DLantern size="md" floatDuration={7} />
      </div>

      {/* Traditional Pagoda Roof Architectural Silhouette */}
      <div className="absolute bottom-0 right-0 w-full sm:w-3/4 h-36 sm:h-48 pointer-events-none opacity-20 sm:opacity-30 flex items-end justify-end">
        <svg
          viewBox="0 0 600 200"
          className="w-full h-full text-[#2c1d11]"
          fill="currentColor"
          preserveAspectRatio="none"
        >
          {/* Ornate Curved Chinese Pagoda Eaves */}
          <path d="M0 200 H600 V120 C540 120 500 80 440 60 C380 40 340 10 300 0 C260 10 220 40 160 60 C100 80 60 120 0 120 Z" />
          <path d="M150 200 H450 V110 C410 110 380 80 340 65 C300 50 280 20 250 15 C220 20 200 50 160 65 C120 80 90 110 150 110 Z" opacity="0.7" />
        </svg>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-2xl">
        {/* Red Seal Stamp Badge */}
        <div className="inline-flex items-center gap-3 mb-6 bg-white/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-red-200/80 shadow-xs">
          <span className="chinese-stamp px-2 py-0.5 text-xs font-serif font-bold text-red-700 border-red-700 bg-red-50">
            平安喜乐
          </span>
          <span className="text-xs font-semibold tracking-wider text-slate-700 uppercase">
            Nihao Education • Authentic Study in China
          </span>
        </div>

        <h3 className="text-3xl sm:text-5xl font-serif font-bold text-[#1c1917] tracking-tight mb-4 leading-tight">
          Experience China.<br />
          <span className="bg-gradient-to-r from-red-700 via-amber-700 to-amber-600 bg-clip-text text-transparent">
            Where Tradition Meets Modern Brilliance.
          </span>
        </h3>

        <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8 max-w-lg">
          From the West Lake of Hangzhou to world-class university campuses. Enjoy zero-stress admissions, guaranteed CSC scholarships, and full 48-hour landing integration.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <a
            href="https://wa.me/8615968141445"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#b91c1c] hover:bg-[#991b1b] text-white px-6 py-3 rounded-2xl font-semibold text-sm shadow-lg shadow-red-900/20 hover:shadow-xl transition-all flex items-center gap-2"
          >
            <span>Apply For CSC Scholarship</span>
            <span className="chinese-stamp text-[10px] px-1 py-0 border-white text-white bg-transparent">
              申请
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};
