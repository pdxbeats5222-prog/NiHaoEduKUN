import React from 'react';
import { motion } from 'motion/react';

interface DragonProps {
  className?: string;
}

export const ChineseAnimatedDragon: React.FC<DragonProps> = ({ className = '' }) => {
  return (
    <div className={`relative pointer-events-none select-none overflow-hidden ${className}`}>
      {/* Dynamic S-curve floating motion for the whole dragon */}
      <motion.div
        animate={{
          y: [0, -12, 0, 12, 0],
          x: [0, 8, 0, -8, 0],
          rotate: [-1, 1, -1, 1, -1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="w-full h-full flex items-center justify-center"
      >
        <svg
          viewBox="0 0 1000 320"
          className="w-full h-auto drop-shadow-[0_10px_20px_rgba(185,28,28,0.25)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Dragon Body Crimson Scale Gradient */}
            <linearGradient id="dragonScales" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7f1d1d" />
              <stop offset="25%" stopColor="#dc2626" />
              <stop offset="50%" stopColor="#b91c1c" />
              <stop offset="75%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#991b1b" />
            </linearGradient>

            {/* Gold Belly / Horns / Whiskers */}
            <linearGradient id="dragonGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="40%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>

            {/* Flaming Pearl Glow */}
            <radialGradient id="flamingPearl" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="30%" stopColor="#fef08a" />
              <stop offset="65%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#dc2626" />
            </radialGradient>
          </defs>

          {/* Swirling Auspicious Clouds (祥云) Background */}
          <g opacity="0.4">
            <path
              d="M 150 200 C 130 180, 100 180, 80 200 C 60 220, 80 250, 110 250 C 140 250, 170 230, 180 210 Z"
              fill="#fef08a"
              opacity="0.5"
            />
            <path
              d="M 850 120 C 830 100, 800 100, 780 120 C 760 140, 780 170, 810 170 C 840 170, 870 150, 880 130 Z"
              fill="#f87171"
              opacity="0.4"
            />
          </g>

          {/* === 1. FLAMING PEARL OF WISDOM (神龙吐珠) === */}
          <g transform="translate(140, 110)">
            {/* Outer Flame Waves */}
            <motion.path
              animate={{ scale: [1, 1.15, 1], rotate: [0, 180, 360] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              d="M 0 -28 Q 12 -12 28 0 Q 12 12 0 28 Q -12 12 -28 0 Q -12 -12 0 -28 Z"
              fill="url(#dragonGold)"
              opacity="0.6"
            />
            {/* Glowing Pearl */}
            <circle cx="0" cy="0" r="18" fill="url(#flamingPearl)" />
            <circle cx="-5" cy="-5" r="5" fill="#ffffff" opacity="0.8" />
          </g>

          {/* === 2. SERPENTINE UNDULATING DRAGON BODY (中国祥龙龙身) === */}
          {/* Back Spine Mane Flames */}
          <path
            d="M 220 120 Q 300 40 420 120 Q 540 200 660 110 Q 780 20 880 100"
            stroke="url(#dragonGold)"
            strokeWidth="18"
            strokeLinecap="round"
            opacity="0.8"
            strokeDasharray="6 6"
          />

          {/* Main Dragon Body S-Curve Spine */}
          <path
            d="M 220 130 Q 300 50 420 130 Q 540 210 660 120 Q 780 30 880 110"
            stroke="url(#dragonScales)"
            strokeWidth="28"
            strokeLinecap="round"
          />

          {/* Golden Belly Scales Overlay */}
          <path
            d="M 222 136 Q 300 56 420 136 Q 540 216 660 126 Q 780 36 878 116"
            stroke="url(#dragonGold)"
            strokeWidth="8"
            strokeLinecap="round"
            opacity="0.85"
          />

          {/* Scale Texture Markings */}
          <path
            d="M 240 120 Q 300 60 420 130 Q 540 200 660 120 Q 780 40 860 100"
            stroke="#ffffff"
            strokeWidth="2"
            strokeDasharray="4 8"
            opacity="0.4"
          />

          {/* === 3. DRAGON LEGS & SHARP DRAGON CLAWS (五爪金龙) === */}
          {/* Front Left Leg & Claws */}
          <g>
            <path d="M 280 110 Q 250 160 220 180" stroke="url(#dragonScales)" strokeWidth="10" strokeLinecap="round" />
            {/* Claws */}
            <path d="M 220 180 L 205 195 M 220 180 L 218 200 M 220 180 L 230 198" stroke="url(#dragonGold)" strokeWidth="3" strokeLinecap="round" />
          </g>

          {/* Front Right Leg & Claws */}
          <g>
            <path d="M 450 150 Q 480 200 510 230" stroke="url(#dragonScales)" strokeWidth="10" strokeLinecap="round" />
            <path d="M 510 230 L 525 245 M 510 230 L 512 250 M 510 230 L 498 248" stroke="url(#dragonGold)" strokeWidth="3" strokeLinecap="round" />
          </g>

          {/* Rear Leg & Claws */}
          <g>
            <path d="M 700 100 Q 730 150 760 180" stroke="url(#dragonScales)" strokeWidth="10" strokeLinecap="round" />
            <path d="M 760 180 L 775 195 M 760 180 L 762 202 M 760 180 L 748 198" stroke="url(#dragonGold)" strokeWidth="3" strokeLinecap="round" />
          </g>

          {/* === 4. TRADITIONAL IMPERIAL DRAGON HEAD (龙首) === */}
          <g transform="translate(200, 130)">
            {/* Dragon Snout & Jaws */}
            <path
              d="M 20 -15 C -10 -25 -30 -10 -40 5 C -45 15 -25 30 0 25 C 20 20 30 5 20 -15 Z"
              fill="url(#dragonScales)"
              stroke="url(#dragonGold)"
              strokeWidth="2"
            />
            
            {/* Snout Details & Nostril */}
            <path d="M -30 -5 Q -20 0 -10 -5" stroke="url(#dragonGold)" strokeWidth="2" fill="none" />
            <circle cx="-32" cy="0" r="3" fill="#7f1d1d" />

            {/* Glowing Golden Eyes */}
            <circle cx="-12" cy="-12" r="7" fill="url(#dragonGold)" stroke="#7f1d1d" strokeWidth="1.5" />
            <circle cx="-14" cy="-13" r="3" fill="#1c1917" />
            <circle cx="-10" cy="-14" r="1.5" fill="#ffffff" />

            {/* Imperial Antler Horns (鹿角) */}
            <path
              d="M 5 -20 Q 20 -45 35 -55 M 20 -40 L 32 -42 M 15 -32 L 25 -25"
              stroke="url(#dragonGold)"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Swaying Dragon Whiskers (龙须) */}
            <motion.path
              animate={{
                d: [
                  'M -35 8 Q -60 12 -80 0 Q -95 -10 -110 -5',
                  'M -35 8 Q -60 18 -80 10 Q -95 0 -110 8',
                  'M -35 8 Q -60 12 -80 0 Q -95 -10 -110 -5',
                ],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              stroke="url(#dragonGold)"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            <motion.path
              animate={{
                d: [
                  'M -35 15 Q -55 30 -75 25 Q -90 20 -105 30',
                  'M -35 15 Q -55 22 -75 18 Q -90 12 -105 20',
                  'M -35 15 Q -55 30 -75 25 Q -90 20 -105 30',
                ],
              }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              stroke="url(#dragonGold)"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />

            {/* Dragon Beard Mane (龙须鬃毛) */}
            <path
              d="M -10 20 Q 10 40 25 45 Q -5 35 -10 20 Z"
              fill="url(#dragonGold)"
            />
          </g>

          {/* === 5. DRAGON TAIL BUSH (龙尾) === */}
          <g transform="translate(880, 110)">
            <path
              d="M 0 0 Q 30 -25 60 -15 Q 40 10 70 30 Q 30 20 0 0 Z"
              fill="url(#dragonGold)"
            />
            <path
              d="M 10 -5 Q 35 -10 50 -5"
              stroke="#dc2626"
              strokeWidth="2"
            />
          </g>
        </svg>
      </motion.div>
    </div>
  );
};
