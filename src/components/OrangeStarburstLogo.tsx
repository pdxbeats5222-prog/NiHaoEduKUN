import React from 'react';

interface StarburstProps {
  className?: string;
  glowColor?: string;
}

export const OrangeStarburstLogo: React.FC<StarburstProps> = ({ 
  className = "w-7 h-7",
  glowColor = "rgba(224, 90, 43, 0.9)"
}) => {
  // 14 Rays with varied lengths and angles to match the organic starburst in the user's image
  const rays = [
    { angle: -90, length: 38, width: 6.5 },   // Top long
    { angle: -68, length: 30, width: 5.5 },
    { angle: -45, length: 36, width: 6 },
    { angle: -24, length: 28, width: 5 },
    { angle: -3,  length: 32, width: 5.8 },
    { angle: 18,  length: 26, width: 5 },
    { angle: 40,  length: 34, width: 6 },
    { angle: 62,  length: 32, width: 5.5 },
    { angle: 88,  length: 37, width: 6.5 },   // Bottom long
    { angle: 112, length: 30, width: 5.5 },
    { angle: 135, length: 35, width: 6 },
    { angle: 158, length: 26, width: 5 },
    { angle: -155, length: 31, width: 5.5 },
    { angle: -128, length: 35, width: 6 },
    { angle: -108, length: 28, width: 5 },
  ];

  return (
    <svg
      viewBox="0 0 100 100"
      className={`${className} transition-all duration-300`}
      style={{
        filter: `drop-shadow(0 0 8px ${glowColor}) drop-shadow(0 0 16px ${glowColor})`,
      }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Glowing Orange/Terracotta Gradient */}
        <linearGradient id="starburstGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff7e52" />
          <stop offset="50%" stopColor="#e05a2b" />
          <stop offset="100%" stopColor="#c8451b" />
        </linearGradient>

        {/* Glow filter */}
        <filter id="orangeGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g fill="url(#starburstGradient)" filter="url(#orangeGlow)">
        {/* Center hub */}
        <circle cx="50" cy="50" r="11" />

        {/* Radiating Rays */}
        {rays.map((ray, idx) => (
          <rect
            key={idx}
            x={50 - ray.width / 2}
            y={50 - ray.length}
            width={ray.width}
            height={ray.length}
            rx={ray.width / 2}
            transform={`rotate(${ray.angle} 50 50)`}
          />
        ))}
      </g>
    </svg>
  );
};
