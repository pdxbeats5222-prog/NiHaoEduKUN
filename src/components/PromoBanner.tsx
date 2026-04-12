import { useState } from 'react';
import { X, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PromoBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-[#0071e3] text-white px-4 py-3 relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 sm:gap-4 text-sm sm:text-base font-medium">
        <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 text-yellow-300" />
        <p className="text-center">
          <span className="hidden sm:inline">Limited Time Offer: </span>
          Get a free 30-minute consultation for 2026 Fall Admissions!
        </p>
        <Link 
          to="/contact" 
          className="underline decoration-white/50 hover:decoration-white transition-colors whitespace-nowrap"
        >
          Claim Offer
        </Link>
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute right-2 sm:right-4 p-1 hover:bg-white/10 rounded-full transition-colors"
          aria-label="Close banner"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  );
}
