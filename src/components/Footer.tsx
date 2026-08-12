import { Link } from 'react-router-dom';
import { Globe, Mail, MapPin, Phone, Instagram, Youtube, Linkedin } from 'lucide-react';
import { SiTiktok, SiXiaohongshu } from 'react-icons/si';
import { INSTAGRAM_LINK, YOUTUBE_LINK } from '../constants';

export default function Footer() {
  return (
    <footer className="bg-[#181313] text-stone-400 pt-16 pb-12 border-t border-stone-800/80 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity cursor-pointer group">
              <img src="/logo2.png" alt="Nihao.edu Logo" className="h-10 w-auto object-contain" />
            </Link>
            <p className="text-sm leading-relaxed text-stone-400 max-w-xs">
              Your local gateway to China. We are a localized consultancy headquartered in Hangzhou, providing unmatched insight into campus life and seamless integration.
            </p>
            <div className="flex gap-2.5 pt-2">
              <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl bg-stone-900/90 border border-stone-800 flex items-center justify-center text-stone-300 hover:text-white hover:bg-red-600 hover:border-red-500 transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href={YOUTUBE_LINK} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl bg-stone-900/90 border border-stone-800 flex items-center justify-center text-stone-300 hover:text-white hover:bg-red-600 hover:border-red-500 transition-all">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="https://www.tiktok.com/@kunofficial37?_r=1&_t=ZP-95drv1GlYpK" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl bg-stone-900/90 border border-stone-800 flex items-center justify-center text-stone-300 hover:text-white hover:bg-red-600 hover:border-red-500 transition-all">
                <SiTiktok size={16} />
              </a>
              <a href="https://www.xiaohongshu.com/user/profile/6487e41b00000000070188bb" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl bg-stone-900/90 border border-stone-800 flex items-center justify-center text-stone-300 hover:text-white hover:bg-red-600 hover:border-red-500 transition-all">
                <SiXiaohongshu size={16} />
              </a>
              <a href="https://www.linkedin.com/in/nihaoedu-org-43a175413?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl bg-stone-900/90 border border-stone-800 flex items-center justify-center text-stone-300 hover:text-white hover:bg-red-600 hover:border-red-500 transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-sm tracking-wide uppercase mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/services" className="hover:text-amber-400 transition-colors">Our Services</Link></li>
              <li><Link to="/about" className="hover:text-amber-400 transition-colors">Meet the Team</Link></li>
              <li><Link to="/resources" className="hover:text-amber-400 transition-colors">Student Resources</Link></li>
              <li><a href="https://wa.me/8615968141445" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">Get Your Place</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold text-sm tracking-wide uppercase mb-4">Services</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/services" className="hover:text-amber-400 transition-colors">University Selection</Link></li>
              <li><Link to="/services" className="hover:text-amber-400 transition-colors">Language Training (HSK)</Link></li>
              <li><Link to="/services" className="hover:text-amber-400 transition-colors">X1/X2 Visa & Logistics</Link></li>
              <li><Link to="/services" className="hover:text-amber-400 transition-colors">On-Ground Integration</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-sm tracking-wide uppercase mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 shrink-0 mt-1 text-amber-400" />
                <span className="leading-relaxed">Block A, Xipei Education Building, 280 Xuelin St, Xiasha Higher Education Zone, Hangzhou, Zhejiang</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 shrink-0 text-amber-400" />
                <a href="mailto:nihaoedu@gmail.com" className="hover:text-amber-400 transition-colors">nihaoedu@gmail.com</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 shrink-0 text-amber-400" />
                <span>+86 15968141445</span>
              </li>
              <li className="flex items-center gap-3">
                <Globe className="w-4 h-4 shrink-0 text-amber-400" />
                <a href="https://nihaoedu.org" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">www.nihaoedu.org</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-800/80 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Nihao Education. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="#" className="hover:text-stone-300 transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-stone-300 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
