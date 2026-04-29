import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Globe, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNotificationClick = () => {
    setIsMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/#deadlines');
      // Small timeout to allow routing before scrolling
      setTimeout(() => {
        const el = document.getElementById('deadlines');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('deadlines');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Service', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Resources', path: '/resources' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-4 sm:pt-6 pointer-events-none">
      <div 
        className={`mx-auto w-full max-w-7xl pointer-events-auto transition-all duration-500 relative ${
          isScrolled || location.pathname !== '/'
            ? 'bg-white/40 backdrop-blur-2xl saturate-200 border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.08)] rounded-full py-3 px-6'
            : 'bg-white/20 backdrop-blur-lg border border-white/30 shadow-[0_4px_24px_rgba(0,0,0,0.04)] rounded-full py-4 px-6 sm:px-8'
        }`}
      >
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 cursor-pointer group">
            <motion.img 
              src="https://lh3.googleusercontent.com/u/0/d/1mOhv5T049YvaZY11iRie6C5Yxuk0XQC2" 
              alt="Nihao.edu Logo" 
              referrerPolicy="no-referrer"
              className="h-14 w-auto object-contain" 
              whileHover={{ scale: 1.1, rotate: 5 }}
              animate={{
                y: [0, -4, 0],
              }}
              transition={{
                y: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                scale: { type: "spring", stiffness: 300 },
                rotate: { type: "spring", stiffness: 300 }
              }}
            />
            <span className="text-xl font-semibold tracking-tight text-[#1d1d1f] group-hover:text-[#0071e3] transition-colors">
              Nihao.edu
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-sm font-medium transition-colors text-[#1d1d1f] hover:text-[#0071e3]"
              >
                {link.name}
              </Link>
            ))}
            
            <div className="flex items-center gap-6 pl-4 border-l border-gray-200/50">
              <button 
                onClick={handleNotificationClick}
                className="relative p-2 text-[#1d1d1f] hover:text-[#0071e3] transition-colors rounded-full hover:bg-white/50 group"
              >
                <Bell className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse" />
              </button>

              <Link
                to="/contact"
                className="bg-gradient-to-r from-red-600 to-red-500 text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-[0_4px_14px_rgba(220,38,38,0.39)] hover:shadow-[0_6px_20px_rgba(220,38,38,0.5)] hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                Contact Us
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <button 
              onClick={handleNotificationClick}
              className="relative p-2 text-[#1d1d1f] hover:text-[#0071e3] transition-colors rounded-full animate-bounce-subtle"
            >
              <Bell className="w-6 h-6" />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <button
              className="p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="text-[#1d1d1f]" />
              ) : (
                <Menu className="text-[#1d1d1f]" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-0 right-0 mt-4 mx-4 sm:mx-6 pointer-events-auto bg-white/70 backdrop-blur-3xl saturate-200 border border-white/50 shadow-[0_16px_40px_rgba(0,0,0,0.1)] rounded-3xl overflow-hidden"
          >
            <div className="px-6 py-6 space-y-2 flex flex-col">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-[#1d1d1f] font-medium text-lg py-3 px-4 rounded-xl hover:bg-white/50 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-gradient-to-r from-red-600 to-red-500 text-white px-5 py-3.5 rounded-xl font-semibold text-center mt-4 flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(220,38,38,0.39)] hover:shadow-[0_6px_20px_rgba(220,38,38,0.5)] hover:scale-[1.02] transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
