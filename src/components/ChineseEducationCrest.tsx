import React from 'react';

interface CrestProps {
  className?: string;
}

export const ChineseEducationCrest: React.FC<CrestProps> = ({ className = 'w-6 h-6' }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      className={`${className} shrink-0 fill-current`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Chinese Pagoda Eaves Top Roof */}
      <path
        d="M 50 2 C 45 10 32 14 10 12 C 5 11 2 13 4 17 C 8 23 20 22 28 20 L 28 28 L 72 28 L 72 20 C 80 22 92 23 96 17 C 98 13 95 11 90 12 C 68 14 55 10 50 2 Z"
      />

      {/* Outer Rectangle Shield Border */}
      <path
        d="M 12 26 L 88 26 L 88 82 C 88 88 78 96 50 98 C 22 96 12 88 12 82 Z M 20 34 L 20 78 C 20 82 28 88 50 90 C 72 88 80 82 80 78 L 80 34 Z"
      />

      {/* Inner Pen Nib / Book Core Emblem */}
      <path
        d="M 50 28 L 72 48 L 72 68 C 72 74 62 82 50 86 C 38 82 28 74 28 68 L 28 48 Z M 50 36 L 36 50 L 36 64 C 36 68 42 74 50 76 C 58 74 64 68 64 64 L 64 50 Z"
      />

      {/* Fountain Pen Tip Split & Nib Hole */}
      <path
        d="M 50 48 L 50 68 M 50 56 A 2.5 2.5 0 1 1 50 55.9"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
};
