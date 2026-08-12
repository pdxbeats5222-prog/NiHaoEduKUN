import React from 'react';
import { motion } from 'motion/react';

interface LandmarkProps {
  className?: string;
  variant?: 'all' | 'shanghai' | 'beijing';
}

export const ShanghaiOrientalPearl: React.FC<{ className?: string }> = ({ className = '' }) => (
  <motion.div
    animate={{ y: [0, -8, 0], opacity: [0.85, 1, 0.85] }}
    transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
    className={`inline-block pointer-events-none select-none ${className}`}
  >
    <svg width="120" height="260" viewBox="0 0 120 260" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="pearlGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="50%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#991b1b" />
        </linearGradient>
        <radialGradient id="pearlGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fef08a" stopOpacity="0.8" />
          <stop offset="60%" stopColor="#dc2626" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#991b1b" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Base Legs */}
      <path d="M 30 250 L 50 180 M 90 250 L 70 180 M 60 250 V 180" stroke="#b91c1c" strokeWidth="3" opacity="0.7" />

      {/* Bottom Large Sphere */}
      <circle cx="60" cy="170" r="22" fill="url(#pearlGradient)" opacity="0.85" />
      <circle cx="60" cy="170" r="22" fill="none" stroke="#fef08a" strokeWidth="1.5" opacity="0.6" />
      <circle cx="54" cy="164" r="8" fill="#fef08a" opacity="0.4" />

      {/* Middle Shaft */}
      <line x1="60" y1="148" x2="60" y2="100" stroke="#b91c1c" strokeWidth="4" />
      <line x1="56" y1="148" x2="56" y2="100" stroke="#d97706" strokeWidth="1.5" />
      <line x1="64" y1="148" x2="64" y2="100" stroke="#d97706" strokeWidth="1.5" />

      {/* Upper Medium Sphere */}
      <circle cx="60" cy="90" r="15" fill="url(#pearlGradient)" />
      <circle cx="56" cy="86" r="5" fill="#fef08a" opacity="0.5" />

      {/* Observation Deck / Small Spheres */}
      <line x1="60" y1="75" x2="60" y2="45" stroke="#b91c1c" strokeWidth="2.5" />
      <circle cx="60" cy="45" r="7" fill="url(#pearlGradient)" />

      {/* Antenna Mast */}
      <line x1="60" y1="38" x2="60" y2="5" stroke="#d97706" strokeWidth="2" />
      {/* Top Beacon Pulse */}
      <motion.circle
        cx="60"
        cy="5"
        r="4"
        fill="#f87171"
        animate={{ scale: [1, 1.8, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </svg>
  </motion.div>
);

export const BeijingTempleOfHeaven: React.FC<{ className?: string }> = ({ className = '' }) => (
  <motion.div
    animate={{ y: [0, 6, 0] }}
    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
    className={`inline-block pointer-events-none select-none ${className}`}
  >
    <svg width="200" height="180" viewBox="0 0 200 180" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="roofBlueGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1e3a8a" />
          <stop offset="50%" stopColor="#1d4ed8" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
        <linearGradient id="goldFinial" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>

      {/* Base Marble Plinth Tiers */}
      <rect x="20" y="165" width="160" height="8" rx="2" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1" />
      <rect x="35" y="157" width="130" height="8" rx="2" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
      <rect x="50" y="149" width="100" height="8" rx="2" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />

      {/* Bottom Tier Roof */}
      <path d="M 40 149 C 70 132, 130 132, 160 149 Z" fill="url(#roofBlueGrad)" stroke="#d97706" strokeWidth="1" />
      <rect x="62" y="125" width="76" height="12" fill="#b91c1c" />

      {/* Middle Tier Roof */}
      <path d="M 52 125 C 75 110, 125 110, 148 125 Z" fill="url(#roofBlueGrad)" stroke="#d97706" strokeWidth="1" />
      <rect x="72" y="102" width="56" height="11" fill="#b91c1c" />

      {/* Top Tier Conical Roof */}
      <path d="M 64 102 C 82 70, 118 70, 136 102 Z" fill="url(#roofBlueGrad)" stroke="#d97706" strokeWidth="1.5" />

      {/* Gold Top Finial */}
      <circle cx="100" cy="62" r="7" fill="url(#goldFinial)" />
      <line x1="100" y1="55" x2="100" y2="48" stroke="#d97706" strokeWidth="2" />
      <circle cx="100" cy="47" r="3" fill="#fef08a" />
    </svg>
  </motion.div>
);

export const ChinaLandmarksAnimation: React.FC<LandmarkProps> = ({ className = '', variant = 'all' }) => {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden z-0 ${className}`}>
      {/* Floating Clouds Animation */}
      <motion.div
        animate={{ x: [-100, 300, -100] }}
        transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
        className="absolute top-10 left-10 opacity-30 pointer-events-none"
      >
        <svg width="120" height="40" viewBox="0 0 120 40" fill="#dc2626">
          <path d="M 10 30 C 10 15, 30 10, 45 20 C 55 10, 80 10, 90 20 C 105 15, 115 25, 110 30 Z" opacity="0.25" />
        </svg>
      </motion.div>

      <motion.div
        animate={{ x: [200, -150, 200] }}
        transition={{ duration: 42, repeat: Infinity, ease: 'linear' }}
        className="absolute top-36 right-16 opacity-30 pointer-events-none"
      >
        <svg width="150" height="50" viewBox="0 0 150 50" fill="#d97706">
          <path d="M 15 40 C 15 20, 45 15, 60 25 C 75 12, 110 15, 125 28 C 140 20, 145 35, 140 40 Z" opacity="0.2" />
        </svg>
      </motion.div>

      {/* Landmarks */}
      {(variant === 'all' || variant === 'shanghai') && (
        <div className="absolute bottom-6 right-8 sm:right-20 opacity-80 hover:opacity-100 transition-opacity">
          <ShanghaiOrientalPearl />
        </div>
      )}

      {(variant === 'all' || variant === 'beijing') && (
        <div className="absolute bottom-4 left-6 sm:left-16 opacity-80 hover:opacity-100 transition-opacity">
          <BeijingTempleOfHeaven />
        </div>
      )}
    </div>
  );
};
