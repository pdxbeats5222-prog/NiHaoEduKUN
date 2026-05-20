import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Globe, Bell, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { WHATSAPP_LINK } from '../constants';
import { LOGO_BASE64 } from './logo_base64';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsLangMenuOpen(false);
  };

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
    { name: t('Home'), path: '/' },
    { name: t('Services'), path: '/services' },
    { name: t('About'), path: '/about' },
    { name: t('Resources'), path: '/resources' },
  ];

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'zh', name: '中文' },
    { code: 'th', name: 'ภาษาไทย' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'ru', name: 'Русский' },
    { code: 'ar', name: 'العربية' },
    { code: 'pt', name: 'Português' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-4 sm:pt-6 pointer-events-none">
      <div 
        className={`mx-auto w-full max-w-7xl pointer-events-auto transition-all duration-500 relative ${
          isScrolled || location.pathname !== '/'
            ? 'bg-white/40 backdrop-blur-2xl saturate-200 border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.08)] rounded-full py-2 px-6'
            : 'bg-white/20 backdrop-blur-lg border border-white/30 shadow-[0_4px_24px_rgba(0,0,0,0.04)] rounded-full py-3 px-6 sm:px-8'
        }`}
      >
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 cursor-pointer group" id="navbar-brand-link">
            <motion.img
              id="navbar-logo"
              src={LOGO_BASE64}
              alt="Nihao.edu Logo"
              className="h-11 w-11 object-contain shrink-0"
              whileHover={{ scale: 1.05, rotate: 3 }}
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
            <span id="navbar-brand-name" className="text-xl font-bold tracking-tight text-[#1d1d1f] group-hover:text-[#0071e3] transition-colors">
              Nihao.edu
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-sm font-semibold transition-colors text-[#1d1d1f] hover:text-[#0071e3]"
              >
                {link.name}
              </Link>
            ))}
            
            <div className="flex items-center gap-4 pl-4 border-l border-gray-200/50">
              {/* Language Switcher */}
              <div className="relative">
                <button 
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  className="flex items-center gap-1.5 p-2 text-[#1d1d1f] hover:text-[#0071e3] transition-colors rounded-full hover:bg-white/50 group"
                >
                  <Globe className="w-5 h-5 text-gray-500 group-hover:text-[#0071e3]" />
                  <span className="text-xs font-bold uppercase">{i18n.language.split('-')[0]}</span>
                  <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isLangMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isLangMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-32 bg-white/90 backdrop-blur-xl border border-white/50 shadow-2xl rounded-2xl overflow-hidden py-1"
                    >
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => changeLanguage(lang.code)}
                          className={`w-full text-left px-4 py-2.5 text-sm font-semibold transition-colors flex items-center justify-between group ${
                            i18n.language.startsWith(lang.code) ? 'text-[#0071e3] bg-blue-50/50' : 'text-[#1d1d1f] hover:bg-gray-50'
                          }`}
                        >
                          {lang.name}
                          {i18n.language.startsWith(lang.code) && <div className="w-1.5 h-1.5 rounded-full bg-[#0071e3]" />}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button 
                onClick={handleNotificationClick}
                className="relative p-2 text-[#1d1d1f] hover:text-[#0071e3] transition-colors rounded-full hover:bg-white/50 group"
              >
                <Bell className="w-5 h-5 text-gray-500 group-hover:text-[#0071e3] group-hover:rotate-12 transition-transform" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white animate-pulse" />
              </button>

          <Link
            to="/contact"
            className="bg-red-600 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-red-500/30 hover:shadow-red-500/40 hover:scale-105 transition-all duration-300 whitespace-nowrap"
          >
            {t('Contact Us')}
          </Link>
            </div>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-1 md:hidden">
            <button 
              onClick={() => changeLanguage(i18n.language.startsWith('en') ? 'zh' : 'en')}
              className="p-2 text-[#1d1d1f] flex items-center gap-1"
            >
              <Globe className="w-5 h-5 text-gray-500" />
              <span className="text-xs font-bold uppercase">{i18n.language.split('-')[0]}</span>
            </button>
            <button 
              onClick={handleNotificationClick}
              className="relative p-2 text-[#1d1d1f] hover:text-[#0071e3] transition-colors rounded-full"
            >
              <Bell className="w-5 h-5 text-gray-500" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white" />
            </button>
            <button
              className="p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="text-[#1d1d1f] w-6 h-6" />
              ) : (
                <Menu className="text-[#1d1d1f] w-6 h-6" />
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
            className="md:hidden absolute top-full left-0 right-0 mt-4 mx-4 sm:mx-6 pointer-events-auto bg-white/90 backdrop-blur-3xl saturate-200 border border-white/50 shadow-[0_16px_40px_rgba(0,0,0,0.1)] rounded-3xl overflow-hidden"
          >
            <div className="px-6 py-8 space-y-2 flex flex-col">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-[#1d1d1f] font-bold text-lg py-3 px-4 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="pt-4 mt-4 border-t border-gray-100 grid grid-cols-2 gap-4">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                      i18n.language.startsWith(lang.code) 
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
                        : 'bg-gray-100 text-[#1d1d1f] hover:bg-gray-200'
                    }`}
                  >
                    <Globe className="w-4 h-4" />
                    {lang.name}
                  </button>
                ))}
              </div>

              <Link
                to="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-red-600 text-white px-5 py-4 rounded-xl font-bold text-center mt-6 flex items-center justify-center gap-2 shadow-lg shadow-red-500/30 active:scale-95 transition-all"
              >
                {t('Contact Us')}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
