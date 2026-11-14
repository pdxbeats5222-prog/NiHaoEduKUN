import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, ShieldCheck, MapPin } from 'lucide-react';

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
  const pillars = [
    {
      icon: Award,
      iconColor: 'text-amber-400',
      iconBg: 'bg-amber-500/10 border-amber-500/20',
      title: 'CSC Type A & B Scholarships',
      desc: 'Full tuition coverage, campus accommodation & living stipend advisory.',
    },
    {
      icon: ShieldCheck,
      iconColor: 'text-emerald-400',
      iconBg: 'bg-emerald-500/10 border-emerald-500/20',
      title: 'Direct University Admissions',
      desc: 'Official partner portals across Hangzhou, Shanghai & C9 universities.',
    },
    {
      icon: MapPin,
      iconColor: 'text-red-400',
      iconBg: 'bg-red-500/10 border-red-500/20',
      title: '48-Hour Ground Integration',
      desc: 'Airport reception, residence permit, banking & campus onboarding.',
    },
  ];

  return (
    <div className="relative w-full rounded-[2rem] overflow-hidden bg-gradient-to-br from-[#141417] via-[#19161a] to-[#231215] border border-white/10 shadow-[0_24px_70px_-15px_rgba(20,20,23,0.38)] my-8 text-white">
      {/* Top Executive Accent Hairline */}
      <div className="h-[3px] w-full bg-gradient-to-r from-red-600 via-amber-500 to-red-600/30" />

      {/* Subtle Ambient Radial Accents */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Subtle Architectural Micro-Grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Main 12-Column Layout */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 p-7 sm:p-10 lg:p-12 items-center">
        {/* Left Editorial Column */}
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2.5 mb-5 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-md">
            <span className="px-1.5 py-0.5 rounded bg-red-600/90 text-[10px] font-bold tracking-wider text-white">
              留学
            </span>
            <span className="text-[11px] font-semibold tracking-[0.12em] text-stone-300 uppercase">
              Nihao Education • Official CSC Admissions Desk
            </span>
          </div>

          <h3 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold !text-white tracking-tight mb-4 leading-[1.15]">
            Experience China.
            <span className="block mt-1 bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400 bg-clip-text text-transparent">
              Where Tradition Meets Modern Brilliance.
            </span>
          </h3>

          <p className="text-stone-300 text-sm sm:text-base leading-relaxed mb-8 max-w-xl">
            From Hangzhou’s West Lake to China’s premier Double First-Class campuses. Gain direct admissions, merit-based CSC scholarship matching, and dedicated 48-hour landing integration.
          </p>

          {/* Refined Action Row */}
          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3.5">
            <Link
              to="/contact"
              state={{ program: 'Chinese Government Scholarship (CSC)' }}
              className="bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 !text-white px-6 py-3.5 rounded-xl font-semibold text-sm shadow-lg shadow-red-950/50 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 inline-flex items-center justify-center gap-2.5 group"
            >
              <span>Apply for CSC Scholarship</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <Link
              to="/services"
              className="bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 !text-stone-100 px-6 py-3.5 rounded-xl font-semibold text-sm backdrop-blur-sm transition-all duration-200 inline-flex items-center justify-center"
            >
              Explore Programs & Services
            </Link>
          </div>
        </div>

        {/* Right Institutional Summary Panel */}
        <div className="lg:col-span-5">
          <div className="rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/10 p-5 sm:p-6 shadow-inner">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-amber-400">
                  2026 / 2027 Admissions
                </p>
                <p className="text-sm font-semibold text-white mt-0.5">
                  Institutional Scholarship Track
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-md border border-red-500/40 bg-red-500/10 text-red-300 text-[11px] font-bold tracking-wider">
                CSC
              </span>
            </div>

            <div className="divide-y divide-white/[0.07]">
              {pillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div key={pillar.title} className="py-3.5 first:pt-0 last:pb-0 flex items-start gap-3.5">
                    <div className={`w-9 h-9 rounded-xl border ${pillar.iconBg} flex items-center justify-center shrink-0 mt-0.5`}>
                      <Icon className={`w-4 h-4 ${pillar.iconColor}`} />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold !text-white leading-snug">
                        {pillar.title}
                      </h4>
                      <p className="text-xs text-stone-400 leading-relaxed mt-0.5">
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
