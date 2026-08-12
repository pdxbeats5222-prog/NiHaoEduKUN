import React from 'react';
import { motion } from 'motion/react';

export const TempleOfHeavenHeroBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0 flex items-center justify-center">
      {/* 1. Warm Sunset Sky & Golden Cloud Layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-100/40 via-red-50/20 to-transparent opacity-80" />
      
      {/* Drift Sunset Clouds */}
      <motion.div
        animate={{ x: [-40, 40, -40], opacity: [0.25, 0.4, 0.25] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-10 left-10 w-96 h-32 bg-gradient-to-r from-amber-300/20 via-orange-300/15 to-transparent rounded-full blur-2xl"
      />
      <motion.div
        animate={{ x: [30, -30, 30], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 35, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-20 right-10 w-[500px] h-40 bg-gradient-to-l from-red-300/20 via-amber-200/15 to-transparent rounded-full blur-2xl"
      />

      {/* 2. Transparent Detailed Vector Art of Temple of Heaven (祈年殿) */}
      <div className="relative w-full max-w-5xl h-full flex items-center justify-center opacity-15 md:opacity-[0.22] transition-opacity duration-500 scale-105 md:scale-100 translate-y-6 md:translate-y-2">
        <svg
          viewBox="0 0 800 950"
          className="w-full h-auto max-h-[780px]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Blue Triple-Roof Gradient */}
            <linearGradient id="templeBlueRoof" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1e3a8a" />
              <stop offset="50%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#1e1b4b" />
            </linearGradient>

            {/* Gold Trim & Finial Gradient */}
            <linearGradient id="templeGoldTrim" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>

            {/* Red Temple Wall Gradient */}
            <linearGradient id="templeRedWall" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#dc2626" />
              <stop offset="100%" stopColor="#7f1d1d" />
            </linearGradient>

            {/* White Marble Base Terrace Gradient */}
            <linearGradient id="marblePlinth" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#e2e8f0" />
            </linearGradient>
            
            {/* Mask for fading bottom stairs into page */}
            <linearGradient id="fadeMask" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="70%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>

          <g mask="url(#fadeMask)">
            {/* === 1. TOP FINIAL & PEAK === */}
            {/* Gold Sphere Finial */}
            <circle cx="400" cy="110" r="14" fill="url(#templeGoldTrim)" stroke="#78350f" strokeWidth="2" />
            <ellipse cx="400" cy="128" rx="8" ry="5" fill="url(#templeGoldTrim)" />
            <line x1="400" y1="128" x2="400" y2="140" stroke="#b45309" strokeWidth="4" />

            {/* === 2. TOP TIER CONICAL ROOF (1st Roof) === */}
            {/* Conical Roof Slope */}
            <path
              d="M 320 220 Q 400 135 480 220 Z"
              fill="url(#templeBlueRoof)"
              stroke="#b45309"
              strokeWidth="2.5"
            />
            {/* Roof Ribbing Lines */}
            <path d="M 400 140 L 335 220 M 400 140 L 360 220 M 400 140 L 400 220 M 400 140 L 440 220 M 400 140 L 465 220" stroke="#93c5fd" strokeWidth="1" opacity="0.6" />
            {/* Eaves Bottom Gold Border */}
            <path d="M 310 220 Q 400 235 490 220 L 485 228 Q 400 243 315 228 Z" fill="url(#templeGoldTrim)" stroke="#78350f" strokeWidth="1" />

            {/* Blue Plaque (祈年殿) */}
            <rect x="382" y="240" width="36" height="48" rx="3" fill="#1e3a8a" stroke="url(#templeGoldTrim)" strokeWidth="3" />
            <rect x="386" y="244" width="28" height="40" fill="none" stroke="#fef08a" strokeWidth="1" />
            {/* Gold Characters */}
            <text x="400" y="260" textAnchor="middle" fill="#fef08a" fontSize="8" fontWeight="bold" fontFamily="serif">祈</text>
            <text x="400" y="270" textAnchor="middle" fill="#fef08a" fontSize="8" fontWeight="bold" fontFamily="serif">年</text>
            <text x="400" y="280" textAnchor="middle" fill="#fef08a" fontSize="8" fontWeight="bold" fontFamily="serif">殿</text>

            {/* Upper Cylinder Drum / Pillars */}
            <rect x="340" y="230" width="120" height="50" fill="url(#templeRedWall)" />
            {/* Bracket Dougong Rows */}
            <line x1="330" y1="230" x2="470" y2="230" stroke="url(#templeGoldTrim)" strokeWidth="3" />
            <line x1="335" y1="235" x2="465" y2="235" stroke="#2563eb" strokeWidth="2" />

            {/* === 3. MIDDLE TIER ROOF (2nd Roof) === */}
            <path
              d="M 270 320 Q 400 260 530 320 Z"
              fill="url(#templeBlueRoof)"
              stroke="#b45309"
              strokeWidth="2.5"
            />
            {/* Ribbing */}
            <path d="M 400 270 L 290 320 M 400 270 L 330 320 M 400 270 L 370 320 M 400 270 L 400 320 M 400 270 L 430 320 M 400 270 L 470 320 M 400 270 L 510 320" stroke="#93c5fd" strokeWidth="1" opacity="0.5" />
            {/* Middle Eaves Bottom Gold Border */}
            <path d="M 255 320 Q 400 338 545 320 L 540 330 Q 400 348 260 330 Z" fill="url(#templeGoldTrim)" stroke="#78350f" strokeWidth="1" />

            {/* Middle Wall / Red Lattice Section */}
            <rect x="290" y="330" width="220" height="60" fill="url(#templeRedWall)" />
            <line x1="280" y1="330" x2="520" y2="330" stroke="url(#templeGoldTrim)" strokeWidth="3" />
            {/* Pillars */}
            <rect x="310" y="330" width="10" height="60" fill="#7f1d1d" />
            <rect x="360" y="330" width="10" height="60" fill="#7f1d1d" />
            <rect x="430" y="330" width="10" height="60" fill="#7f1d1d" />
            <rect x="480" y="330" width="10" height="60" fill="#7f1d1d" />

            {/* === 4. BOTTOM TIER LARGE ROOF (3rd Roof) === */}
            <path
              d="M 210 430 Q 400 370 590 430 Z"
              fill="url(#templeBlueRoof)"
              stroke="#b45309"
              strokeWidth="3"
            />
            {/* Ribbing */}
            <path d="M 400 380 L 230 430 M 400 380 L 280 430 M 400 380 L 330 430 M 400 380 L 370 430 M 400 380 L 400 430 M 400 380 L 430 430 M 400 380 L 470 430 M 400 380 L 520 430 M 400 380 L 570 430" stroke="#93c5fd" strokeWidth="1" opacity="0.5" />
            {/* Bottom Eaves Gold Eaves Rim */}
            <path d="M 190 430 Q 400 452 610 430 L 605 442 Q 400 464 195 442 Z" fill="url(#templeGoldTrim)" stroke="#78350f" strokeWidth="1.5" />

            {/* Bottom Main Red Doors & Columns Tier */}
            <rect x="230" y="442" width="340" height="80" fill="url(#templeRedWall)" />
            {/* Main Red Door Entrances */}
            <rect x="370" y="465" width="60" height="57" rx="4" fill="#450a0a" stroke="url(#templeGoldTrim)" strokeWidth="2" />
            <rect x="300" y="470" width="45" height="52" rx="3" fill="#450a0a" stroke="url(#templeGoldTrim)" strokeWidth="1.5" />
            <rect x="455" y="470" width="45" height="52" rx="3" fill="#450a0a" stroke="url(#templeGoldTrim)" strokeWidth="1.5" />
            
            {/* Red Columns */}
            <rect x="260" y="442" width="14" height="80" fill="#7f1d1d" />
            <rect x="350" y="442" width="14" height="80" fill="#7f1d1d" />
            <rect x="436" y="442" width="14" height="80" fill="#7f1d1d" />
            <rect x="526" y="442" width="14" height="80" fill="#7f1d1d" />

            {/* === 5. TRIPLE MARBLE PLINTH TERRACES (三层汉白玉坛台) === */}
            {/* 1st Upper Marble Terrace */}
            <polygon points="180,522 620,522 640,550 160,550" fill="url(#marblePlinth)" stroke="#cbd5e1" strokeWidth="1.5" />
            {/* Balustrade Posts */}
            <line x1="180" y1="522" x2="620" y2="522" stroke="#94a3b8" strokeWidth="2" />
            <line x1="160" y1="550" x2="640" y2="550" stroke="#94a3b8" strokeWidth="2" />

            {/* 2nd Middle Marble Terrace */}
            <polygon points="140,550 660,550 685,585 115,585" fill="url(#marblePlinth)" stroke="#cbd5e1" strokeWidth="1.5" />
            <line x1="140" y1="550" x2="660" y2="550" stroke="#94a3b8" strokeWidth="2" />
            <line x1="115" y1="585" x2="685" y2="585" stroke="#94a3b8" strokeWidth="2" />

            {/* 3rd Bottom Large Marble Terrace */}
            <polygon points="90,585 710,585 740,630 60,630" fill="url(#marblePlinth)" stroke="#cbd5e1" strokeWidth="1.5" />
            <line x1="90" y1="585" x2="710" y2="585" stroke="#94a3b8" strokeWidth="2" />

            {/* === 6. GRAND CENTRAL MARBLE STAIRCASE & DRAGON SLAB (丹陛桥/御道) === */}
            {/* Staircase Ramp Outline */}
            <polygon points="320,522 480,522 530,750 270,750" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
            
            {/* Stair Steps Lines */}
            {Array.from({ length: 18 }).map((_, i) => {
              const y = 522 + i * 12.5;
              const spread = (i / 18) * 25;
              return (
                <line
                  key={i}
                  x1={320 - spread}
                  y1={y}
                  x2={480 + spread}
                  y2={y}
                  stroke="#cbd5e1"
                  strokeWidth="1.2"
                />
              );
            })}

            {/* Central Dragon Ramp Slab (丹陛石) */}
            <polygon points="375,522 425,522 445,750 355,750" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />
            {/* Relief Engravings on Danbi Stone */}
            <path d="M 400 530 Q 390 600 400 680 Q 410 720 400 745" stroke="#64748b" strokeWidth="2" strokeDasharray="4 2" />
            <path d="M 385 550 Q 400 560 415 550 M 380 620 Q 400 635 420 620 M 370 700 Q 400 715 430 700" stroke="#94a3b8" strokeWidth="1.5" />

            {/* Side Incense Burners (鼎) */}
            <rect x="220" y="590" width="16" height="22" rx="3" fill="#334155" />
            <rect x="564" y="590" width="16" height="22" rx="3" fill="#334155" />
          </g>
        </svg>
      </div>
    </div>
  );
};
