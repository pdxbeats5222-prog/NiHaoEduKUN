import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-[#1d1d1f] tracking-tight mb-4">Get Your Place.</h1>
        <p className="text-xl text-[#86868b] max-w-2xl mx-auto">Ready to start your journey? Let's talk.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-5xl mx-auto">
        <div className="lg:col-span-1 space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-[#1d1d1f] mb-4">Contact Information</h3>
            <div className="space-y-4 text-[#86868b]">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#1d1d1f]" />
                <span>+86 15968141445</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#1d1d1f]" />
                <a href="mailto:nihaoedu@gmail.com" className="hover:text-[#0071e3] transition-colors">nihaoedu@gmail.com</a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#1d1d1f] shrink-0 mt-1" />
                <span>Block A, Xipei Education Building, 280 Xuelin St, Xiasha Higher Education Zone, Hangzhou, Zhejiang</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-[#f5f5f7] p-8 md:p-10 rounded-[2rem] min-h-[500px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6" 
                onSubmit={handleSubmit}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#1d1d1f] mb-2">Name</label>
                    <input required type="text" className="w-full px-4 py-3 rounded-xl bg-white border-none focus:ring-2 focus:ring-[#0071e3] outline-none transition-shadow" placeholder="Your full name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1d1d1f] mb-2">Email</label>
                    <input required type="email" className="w-full px-4 py-3 rounded-xl bg-white border-none focus:ring-2 focus:ring-[#0071e3] outline-none transition-shadow" placeholder="your@email.com" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#1d1d1f] mb-2">Age</label>
                    <input required type="number" className="w-full px-4 py-3 rounded-xl bg-white border-none focus:ring-2 focus:ring-[#0071e3] outline-none transition-shadow" placeholder="Your age" min="16" max="100" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1d1d1f] mb-2">Nationality</label>
                    <input required type="text" className="w-full px-4 py-3 rounded-xl bg-white border-none focus:ring-2 focus:ring-[#0071e3] outline-none transition-shadow" placeholder="Your country" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1d1d1f] mb-2">What are you looking for?</label>
                  <select className="w-full px-4 py-3 rounded-xl bg-white border-none focus:ring-2 focus:ring-[#0071e3] outline-none transition-shadow text-[#1d1d1f]">
                    <option>Chinese Language Program</option>
                    <option>Bachelor's Degree</option>
                    <option>Master's Degree</option>
                    <option>PhD / Doctoral Research</option>
                    <option>Summer Cultural Tour</option>
                    <option>Other / Consulting</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1d1d1f] mb-2">Message</label>
                  <textarea required rows={4} className="w-full px-4 py-3 rounded-xl bg-white border-none focus:ring-2 focus:ring-[#0071e3] outline-none transition-shadow resize-none" placeholder="Tell us about your goals..."></textarea>
                </div>
                <button type="submit" className="w-full bg-[#0071e3] text-white font-medium py-4 rounded-full hover:bg-[#0077ed] transition-colors text-lg">
                  Submit Request
                </button>
              </motion.form>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-bold text-[#1d1d1f] mb-4">Request Sent.</h3>
                <p className="text-lg text-[#86868b] max-w-xs mx-auto mb-8">
                  Thank you for reaching out. A Nihao.edu consultant will contact you within 24 hours.
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="text-[#0071e3] font-medium hover:underline"
                >
                  Send another message
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
