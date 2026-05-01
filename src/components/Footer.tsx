import { Link } from 'react-router-dom';
import { Globe, Mail, MapPin, Phone, Instagram, Youtube } from 'lucide-react';
import { SiTiktok, SiXiaohongshu } from 'react-icons/si';

export default function Footer() {
  return (
    <footer className="bg-[#faf9f6] text-[#5a5a5c] pt-16 pb-8 border-t border-gray-200/60 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-full h-[300px] bg-gradient-to-t from-red-50/50 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer">
              <span className="text-xl font-semibold tracking-tight text-[#1d1d1f]">
                Nihao.edu
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">
              Your local gateway to China. We are a localized consultancy headquartered in Hangzhou, providing unmatched insight into campus life and seamless integration.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="https://www.instagram.com/nihao_edu_kun?igsh=enZzajQxZ3A1d3F5&utm_source=qr" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://youtube.com/@kun-nihao.educhina?si=oMPCkGSo6v-jM75G" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="https://www.tiktok.com/@kunofficial37?_r=1&_t=ZP-95drv1GlYpK" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition-colors">
                <SiTiktok size={20} />
              </a>
              <a href="https://www.xiaohongshu.com/user/profile/6487e41b00000000070188bb" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition-colors">
                <SiXiaohongshu size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[#1d1d1f] font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/services" className="hover:text-red-600 transition-colors">Our Services</Link></li>
              <li><Link to="/about" className="hover:text-red-600 transition-colors">Meet the Team</Link></li>
              <li><Link to="/resources" className="hover:text-red-600 transition-colors">Student Resources</Link></li>
              <li><Link to="/contact" className="hover:text-red-600 transition-colors">Get Your Place</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-[#1d1d1f] font-semibold mb-4">Services</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/services" className="hover:text-red-600 transition-colors">University Selection</Link></li>
              <li><Link to="/services" className="hover:text-red-600 transition-colors">Language Training (HSK)</Link></li>
              <li><Link to="/services" className="hover:text-red-600 transition-colors">X1/X2 Visa & Logistics</Link></li>
              <li><Link to="/services" className="hover:text-red-600 transition-colors">On-Ground Integration</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[#1d1d1f] font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 shrink-0 mt-0.5" />
                <span className="leading-tight">Block A, Xipei Education Building, 280 Xuelin St, Xiasha Higher Education Zone, Hangzhou, Zhejiang</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 shrink-0" />
                <a href="mailto:nihaoedu@gmail.com" className="hover:text-red-600 transition-colors">nihaoedu@gmail.com</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 shrink-0" />
                <span>+86 15968141445</span>
              </li>
              <li className="flex items-center gap-3">
                <Globe className="w-5 h-5 shrink-0" />
                <a href="https://nihaoedu.org" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition-colors">www.nihaoedu.org</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200/60 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© {new Date().getFullYear()} Nihao Education. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="#" className="hover:text-red-600 transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-red-600 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
