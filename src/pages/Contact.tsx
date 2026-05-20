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
                <MessageCircle className="w-5 h-5 text-[#1d1d1f]" />
                <span>WhatsApp: +86 15968141445</span>
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
                    <input 
                      required 
                      name="name"
                      type="text" 
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-white border-none focus:ring-2 focus:ring-[#0071e3] outline-none transition-shadow" 
                      placeholder="Your full name" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1d1d1f] mb-2">Email</label>
                    <input 
                      required 
                      name="email"
                      type="email" 
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-white border-none focus:ring-2 focus:ring-[#0071e3] outline-none transition-shadow" 
                      placeholder="your@email.com" 
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#1d1d1f] mb-2">Age</label>
                    <input 
                      required 
                      name="age"
                      type="number" 
                      value={formData.age}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-white border-none focus:ring-2 focus:ring-[#0071e3] outline-none transition-shadow" 
                      placeholder="Your age" 
                      min="16" 
                      max="100" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1d1d1f] mb-2">Nationality</label>
                    <input 
                      required 
                      name="nationality"
                      type="text" 
                      value={formData.nationality}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-white border-none focus:ring-2 focus:ring-[#0071e3] outline-none transition-shadow" 
                      placeholder="Your country" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1d1d1f] mb-2">WhatsApp Number</label>
                  <input 
                    required 
                    name="whatsapp"
                    type="tel" 
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-white border-none focus:ring-2 focus:ring-[#0071e3] outline-none transition-shadow" 
                    placeholder="+Country Code 000 000 000" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1d1d1f] mb-2">What are you looking for?</label>
                  <select 
                    name="program"
                    value={formData.program}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-white border-none focus:ring-2 focus:ring-[#0071e3] outline-none transition-shadow text-[#1d1d1f]"
                  >
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
                  <textarea 
                    required 
                    name="message"
                    rows={4} 
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-white border-none focus:ring-2 focus:ring-[#0071e3] outline-none transition-shadow resize-none" 
                    placeholder="Tell us about your goals..."
                  ></textarea>
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
                className="text-center py-6"
              >
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-[#1d1d1f] mb-2">Almost There!</h3>
                <p className="text-[#86868b] mb-8">
                  Review your information and send it to our WhatsApp to complete your inquiry.
                </p>

                <div className="bg-white rounded-2xl p-6 text-left mb-8 space-y-3 relative group">
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
      </div>
    </div>
  );
}
