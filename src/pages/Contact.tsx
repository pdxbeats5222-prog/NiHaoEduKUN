import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, CheckCircle2, MessageCircle, Copy, Check, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLocation } from 'react-router-dom';
import { WHATSAPP_LINK } from '../constants';

export default function Contact() {
  const location = useLocation();
  const [submitted, setSubmitted] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    nationality: '',
    whatsapp: '',
    program: 'Chinese Language Program',
    budget: '15000',
    message: ''
  });

  useEffect(() => {
    if (location.state) {
      setFormData(prev => ({
        ...prev,
        ...location.state,
        message: (location.state.university ? `I am interested in applying to ${location.state.university}. ` : '') + (location.state.message || '')
      }));
    }
  }, [location.state]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const getWhatsAppUrl = () => {
    const text = `*New Inquiry from Nihao.edu*\n\n` +
      `*Name:* ${formData.name}\n` +
      `*Email:* ${formData.email}\n` +
      `*Age:* ${formData.age}\n` +
      `*Nationality:* ${formData.nationality}\n` +
      `*WhatsApp:* ${formData.whatsapp}\n` +
      `*Program:* ${formData.program}\n` +
      `*Annual Budget:* ¥${Number(formData.budget).toLocaleString()} RMB\n` +
      `*Message:* ${formData.message}`;

    const encodedText = encodeURIComponent(text);
    return `${WHATSAPP_LINK}?text=${encodedText}`;
  };

  const handleCopy = () => {
    const text = `New Inquiry from Nihao.edu\n\n` +
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Age: ${formData.age}\n` +
      `Nationality: ${formData.nationality}\n` +
      `WhatsApp: ${formData.whatsapp}\n` +
      `Program: ${formData.program}\n` +
      `Annual Budget: ¥${Number(formData.budget).toLocaleString()} RMB\n` +
      `Message: ${formData.message}`;
    
    navigator.clipboard.writeText(text).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-bold mb-4">
          <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
          <span>Find Programs Within Your Exact Budget</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#1d1d1f] tracking-tight mb-4">Get Your Place in China.</h1>
        <p className="text-lg md:text-xl text-[#86868b] max-w-2xl mx-auto">Select your budget, choose your program, and let our Hangzhou advisors match you with top universities.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start max-w-6xl mx-auto">
        
        {/* Left Column: Form & Budget Selection Slider */}
        <div className="lg:col-span-7 bg-[#f5f5f7] p-6 sm:p-8 md:p-10 rounded-[2.2rem] shadow-sm border border-slate-200/60 min-h-[500px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-5" 
                onSubmit={handleSubmit}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-[#1d1d1f] uppercase tracking-wider mb-1.5">Name *</label>
                    <input 
                      required 
                      name="name"
                      type="text" 
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-[#0071e3] outline-none transition-shadow text-sm" 
                      placeholder="Your full name" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#1d1d1f] uppercase tracking-wider mb-1.5">Email *</label>
                    <input 
                      required 
                      name="email"
                      type="email" 
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-[#0071e3] outline-none transition-shadow text-sm" 
                      placeholder="your@email.com" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-[#1d1d1f] uppercase tracking-wider mb-1.5">Age *</label>
                    <input 
                      required 
                      name="age"
                      type="number" 
                      value={formData.age}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-[#0071e3] outline-none transition-shadow text-sm" 
                      placeholder="Your age" 
                      min="16" 
                      max="100" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#1d1d1f] uppercase tracking-wider mb-1.5">Nationality *</label>
                    <input 
                      required 
                      name="nationality"
                      type="text" 
                      value={formData.nationality}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-[#0071e3] outline-none transition-shadow text-sm" 
                      placeholder="Your country" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1d1d1f] uppercase tracking-wider mb-1.5">WhatsApp / Phone *</label>
                  <input 
                    required 
                    name="whatsapp"
                    type="tel" 
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-[#0071e3] outline-none transition-shadow text-sm" 
                    placeholder="+Country Code 000 000 000" 
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1d1d1f] uppercase tracking-wider mb-1.5">What are you looking for?</label>
                  <select 
                    name="program"
                    value={formData.program}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-[#0071e3] outline-none transition-shadow text-[#1d1d1f] text-sm"
                  >
                    <option value="Chinese Government Scholarship (CSC)">Chinese Government Scholarship (CSC)</option>
                    <option value="Chinese Language Program">Chinese Language Program</option>
                    <option value="Bachelor's Degree">Bachelor's Degree</option>
                    <option value="Master's Degree">Master's Degree</option>
                    <option value="PhD / Doctoral Research">PhD / Doctoral Research</option>
                    <option value="Summer Cultural Tour">Summer Cultural Tour</option>
                    <option value="Other / Consulting">Other / Consulting</option>
                  </select>
                </div>

                {/* BUDGET SELECTION SLIDER */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="block text-xs font-extrabold text-[#1d1d1f] uppercase tracking-wider">
                      Estimated Annual Budget (RMB)
                    </label>
                    <span className="text-sm font-extrabold bg-amber-50 border border-amber-200 px-3 py-1 rounded-lg text-amber-700 font-mono">
                      ¥{Number(formData.budget).toLocaleString()} RMB
                    </span>
                  </div>
                  <input 
                    type="range" 
                    name="budget"
                    min="8000" 
                    max="30000" 
                    step="500" 
                    value={formData.budget} 
                    onChange={handleInputChange}
                    className="w-full accent-amber-500 cursor-pointer h-2.5 bg-slate-200 rounded-lg appearance-none" 
                  />
                  <div className="flex justify-between text-[11px] font-bold text-slate-500 px-0.5">
                    <span>¥8,000 RMB</span>
                    <span>¥19,000 RMB</span>
                    <span>¥30,000 RMB</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1d1d1f] uppercase tracking-wider mb-1.5">Message / Goals</label>
                  <textarea 
                    required 
                    name="message"
                    rows={3} 
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-[#0071e3] outline-none transition-shadow resize-none text-sm" 
                    placeholder="Tell us about your background or preferred city..."
                  ></textarea>
                </div>

                <button type="submit" className="w-full bg-[#0071e3] text-white font-bold py-4 rounded-full hover:bg-[#0077ed] transition-all text-base shadow-lg shadow-blue-500/20 active:scale-98 cursor-pointer">
                  Submit & Match My Budget
                </button>
              </motion.form>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6"
              >
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-[#1d1d1f] mb-2">Almost There!</h3>
                <p className="text-[#86868b] mb-8">
                  Review your information and send it to our WhatsApp to complete your inquiry.
                </p>

                <div className="bg-white rounded-2xl p-6 text-left mb-8 space-y-3 relative group border border-slate-200">
                  <button 
                    onClick={handleCopy}
                    className="absolute top-4 right-4 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-[#86868b] hover:text-[#1d1d1f]"
                    title="Copy to clipboard"
                  >
                    {copySuccess ? <Check size={18} className="text-green-600" /> : <Copy size={18} />}
                  </button>
                  <div className="text-sm">
                    <span className="text-[#86868b] block mb-0.5">Name</span>
                    <span className="font-medium text-[#1d1d1f]">{formData.name}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-[#86868b] block mb-0.5">Contact</span>
                    <span className="font-medium text-[#1d1d1f]">{formData.whatsapp} | {formData.email}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-[#86868b] block mb-0.5">Program</span>
                    <span className="font-medium text-[#1d1d1f]">{formData.program}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-[#86868b] block mb-0.5">Annual Budget Selected</span>
                    <span className="font-semibold text-amber-600">¥{Number(formData.budget).toLocaleString()} RMB</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-[#86868b] block mb-0.5">Message</span>
                    <span className="font-medium text-[#1d1d1f] line-clamp-2">{formData.message}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <a 
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#25D366] text-white font-bold py-4 rounded-full hover:bg-[#128C7E] transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-500/20 active:scale-95"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Confirm & Send to WhatsApp
                    <ArrowRight className="w-5 h-5" />
                  </a>
                  
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="text-[#0071e3] font-medium hover:underline text-sm"
                  >
                    Edit information
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Column: IDP-style Student Showcase Card & Contact Info */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* IDP-Style Student Image Card */}
          <div className="relative w-full">
            {/* Background Organic Backdrop Curves (Green & Orange) */}
            <div className="absolute -inset-3 bg-gradient-to-tr from-emerald-500/20 via-orange-400/20 to-red-500/20 rounded-[3rem] blur-xl opacity-80 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[108%] h-[108%] bg-emerald-500 rounded-[3.2rem] transform rotate-2 opacity-90 pointer-events-none" />

            {/* Frame Container */}
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden bg-white p-3 shadow-xl border border-emerald-100">
              <div className="relative rounded-[2rem] overflow-hidden bg-emerald-100 aspect-[4/5]">
                <img 
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop" 
                  alt="Happy International Student choosing study budget options" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (target.src !== 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop') {
                      target.src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop';
                    }
                  }}
                />

                {/* Orange Arch Accent */}
                <div className="absolute -bottom-8 -right-8 w-28 h-28 bg-amber-500 rounded-full blur-xs opacity-80 pointer-events-none" />

                {/* Floating Badge Top Left */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-lg border border-emerald-200 flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    ¥
                  </div>
                  <div>
                    <p className="text-[11px] font-extrabold text-[#1d1d1f]">Flexible Budget</p>
                    <p className="text-[9px] text-emerald-600 font-bold">Programs for every budget</p>
                  </div>
                </div>

                {/* Floating Badge Bottom Right */}
                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-xl border border-amber-200 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    🎓
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#1d1d1f]">Scholarship Match</p>
                    <p className="text-[10px] text-amber-600 font-bold">Full tuition waivers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Details Card */}
          <div className="bg-white p-6 rounded-[2rem] border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="text-base font-extrabold text-[#1d1d1f]">Direct Advisory Contact</h3>
            <div className="space-y-3 text-sm text-[#86868b]">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#1d1d1f] shrink-0" />
                <span className="text-[#1d1d1f] font-medium">+86 15968141445</span>
              </div>
              <div className="flex items-center gap-3">
                <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-[#1d1d1f] font-medium">WhatsApp: +86 15968141445</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#1d1d1f] shrink-0" />
                <a href="mailto:nihaoedu@gmail.com" className="text-[#0071e3] font-medium hover:underline">nihaoedu@gmail.com</a>
              </div>
              <div className="flex items-start gap-3 pt-1">
                <MapPin className="w-4 h-4 text-[#1d1d1f] shrink-0 mt-0.5" />
                <span className="text-xs text-slate-600">Block A, Xipei Education Building, 280 Xuelin St, Xiasha Higher Education Zone, Hangzhou</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
