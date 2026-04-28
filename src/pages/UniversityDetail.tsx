/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  MapPin, 
  Building2, 
  GraduationCap, 
  Globe, 
  Users,
  Award,
  Calendar,
  ChevronRight,
  X,
  Layers,
  Sparkles,
  Star,
  Plus,
  ArrowRight
} from 'lucide-react';
import { useState } from 'react';
import { cityUniversities } from '../constants/universities';

export default function UniversityDetail() {
  const { name } = useParams();
  const navigate = useNavigate();

  // Robust slug matching function
  const slugify = (text: string) => 
    text.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

  const paramSlug = name ? slugify(name) : '';

  // Find the university data
  let foundUni: any = null;
  let foundCity: any = null;

  for (const city of cityUniversities) {
    const uni = city.universities.find(u => slugify(u.name) === paramSlug);
    if (uni) {
      foundUni = uni;
      foundCity = city;
      break;
    }
  }

  // Handle HQ case
  if (!foundUni && paramSlug.includes('nihao-edu-headquarters')) {
    foundUni = {
      name: "NIHAO EDU HEADQUARTERS",
      address: "Block A, Xipei Education Building, 280 Xuelin St, Xiasha Higher Education Zone, Hangzhou, Zhejiang",
      coordinates: [120.36424, 30.31174]
    };
    foundCity = { name: "Hangzhou" };
  }

  if (!foundUni) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center bg-white text-slate-900 px-6 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md"
        >
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 border border-slate-100">
            <Building2 className="w-10 h-10 text-slate-300" />
          </div>
          <h2 className="text-3xl font-black uppercase tracking-widest mb-4">Institution Not Found</h2>
          <p className="text-slate-500 mb-10 leading-relaxed font-medium">
            We couldn't find the institution you're looking for. It might have been moved or the link might be broken.
          </p>
          <button 
            onClick={() => navigate('/')} 
            className="w-full py-5 bg-slate-900 text-white font-black uppercase tracking-widest text-sm rounded-2xl hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Campus Explorer
          </button>
        </motion.div>
      </div>
    );
  }

  const [activeImage, setActiveImage] = useState<string | null>(null);

  // Mock data for images and info
  const statistics = [
    { label: "Total Students", value: "28,500+", icon: Users },
    { label: "Elite Faculty", value: "3,420+", icon: GraduationCap },
    { label: "Founding Year", value: "1984", icon: Calendar },
    { label: "World Rank", value: "#126", icon: Award },
  ];

  const images = [
    `https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=1200`,
    `https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800`,
    `https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800`,
    `https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&q=80&w=800`,
    `https://images.unsplash.com/photo-1498243639359-f7c895171f5f?auto=format&fit=crop&q=80&w=800`
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-100 overflow-x-hidden pt-20">
      {/* Lightbox */}
      <AnimatePresence>
        {activeImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImage(null)}
            className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
          >
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              src={activeImage} 
              className="max-w-full max-h-full rounded-3xl shadow-2xl border border-slate-200"
            />
            <button className="absolute top-8 right-8 w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors">
              <X className="w-6 h-6 text-slate-900" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-[65vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={images[0]} alt={foundUni.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </div>

        <div className="container mx-auto px-6 pb-12 relative z-10">
          <motion.button 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate(-1)}
            className="mb-8 flex items-center gap-2 text-white/70 hover:text-white transition-colors group"
          >
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center bg-white/10 backdrop-blur-md group-hover:border-white/50 transition-all shadow-sm">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <span className="text-sm font-black uppercase tracking-widest">Back to Map</span>
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-2 text-blue-400 font-black uppercase tracking-[0.3em] mb-4 text-xs">
              <Sparkles className="w-4 h-4" />
              <span>Academic Excellence</span>
            </div>
            <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-tight mb-6 text-white drop-shadow-2xl">
              {foundUni.name}
            </h1>
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/10 shadow-sm">
                <MapPin className="w-5 h-5 text-red-400" />
                <span className="text-base font-bold text-white/90">{foundCity.name}, China</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/10 shadow-sm">
                <Globe className="w-5 h-5 text-blue-400" />
                <span className="text-base font-bold text-white/90">International Hub</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Grid */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-16">
            <div>
              <h2 className="text-2xl font-black uppercase tracking-[0.2em] mb-6 flex items-center gap-4 text-blue-600">
                Institutional Profile <div className="h-px flex-1 bg-blue-100" />
              </h2>
              <p className="text-xl text-slate-600 leading-relaxed font-medium">
                <span className="text-blue-600">{foundUni.name}</span> is a renowned center for higher learning located in the heart of {foundCity.name}. The institution maintains a global reputation for research innovation and technological advancement, consistently shaping the minds of future leaders.
              </p>
              <p className="mt-8 text-lg text-slate-500 leading-relaxed">
                With world-class facilities and a diverse, multicultural student body, the campus serves as a bridge between traditional heritage and modern frontier science. Our laboratories and lecture halls are designed to inspire collaboration and critical thinking.
              </p>
            </div>

            {/* Why Choose Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-slate-50 p-8 rounded-[40px] border border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 transition-all group">
                <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Star className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="text-xl font-black uppercase tracking-widest mb-4 text-slate-900">Elite Faculty</h4>
                <p className="text-slate-500 leading-relaxed">Learn from international pioneers and industry leaders who provide mentorship that extends far beyond the classroom walls.</p>
              </div>
              <div className="bg-slate-50 p-8 rounded-[40px] border border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 transition-all group">
                <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Layers className="w-6 h-6 text-red-600" />
                </div>
                <h4 className="text-xl font-black uppercase tracking-widest mb-4 text-slate-900">Digital Smart Campus</h4>
                <p className="text-slate-500 leading-relaxed">Experience a fully integrated digital ecosystem, from AI-driven libraries to high-speed research networks across the entire campus.</p>
              </div>
            </div>

            {/* Gallery Grid */}
            <div>
              <h2 className="text-2xl font-black uppercase tracking-[0.2em] mb-8 flex items-center gap-4 text-blue-600">
                Campus Exploration <div className="h-px flex-1 bg-blue-100" />
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {images.slice(1).map((img, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ y: -10, scale: 1.02 }}
                    onClick={() => setActiveImage(img)}
                    className="relative rounded-[32px] overflow-hidden aspect-[4/3] border border-slate-200 cursor-zoom-in group shadow-lg"
                  >
                    <img src={img} alt={`Campus view ${i}`} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                      <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                        <Plus className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Stats */}
          <div className="space-y-12">
            <div className="bg-slate-900 rounded-[48px] p-10 text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-125 transition-transform duration-1000">
                <Award className="w-32 h-32" />
              </div>
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/40 mb-10">Quick Facts</h3>
              <div className="space-y-8">
                {statistics.map((stat, i) => (
                  <div key={i} className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                      <stat.icon className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-white leading-none">{stat.value}</div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-white/30 mt-1.5">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-12 pt-10 border-t border-white/10">
                <button 
                  onClick={() => navigate('/contact')}
                  className="w-full py-5 bg-blue-600 hover:bg-blue-500 rounded-3xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all shadow-xl shadow-blue-900/50"
                >
                  Apply Online <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="bg-slate-50 rounded-[40px] p-10 border border-slate-100">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-6 text-center">Contact Admissions</h3>
              <p className="text-sm text-slate-500 text-center leading-relaxed">
                Need more information about programs or housing? Our dedicated team is here to help you navigate your journey.
              </p>
              <button className="w-full mt-8 py-5 border-2 border-slate-200 hover:border-slate-900 rounded-3xl font-black uppercase tracking-widest text-xs transition-all">
                Download Guide
              </button>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
