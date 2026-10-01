import React, { useState } from 'react';
import { 
  Building2, 
  Globe2, 
  MapPin, 
  Globe, 
  Users, 
  GraduationCap, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  Copy, 
  Check, 
  ArrowRight, 
  ShieldCheck, 
  Award, 
  Clock, 
  Handshake, 
  HelpCircle,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { WHATSAPP_LINK } from '../constants';

interface PartnerFormData {
  name: string;
  country: string;
  location: string;
  website: string;
  targetRegions: string[];
  customRegion: string;
  anticipatedStudents: string;
  interestedPrograms: string[];
  notes: string;
}

const POPULAR_COUNTRIES = [
  'India', 'Pakistan', 'Bangladesh', 'Nigeria', 'Ghana', 'Kenya', 'Morocco', 
  'Egypt', 'Kazakhstan', 'Uzbekistan', 'Russia', 'Indonesia', 'Thailand', 
  'Vietnam', 'Philippines', 'Brazil', 'Colombia', 'Turkey', 'Iran', 'Saudi Arabia',
  'United Arab Emirates', 'United Kingdom', 'Other'
];

const TARGET_REGION_OPTIONS = [
  'South Asia (India, Pakistan, Bangladesh, Nepal)',
  'Central Asia (Kazakhstan, Uzbekistan, Kyrgyzstan)',
  'Southeast Asia (Indonesia, Thailand, Vietnam, Malaysia)',
  'Sub-Saharan Africa (Nigeria, Ghana, Kenya, Tanzania)',
  'Middle East & North Africa (Egypt, Morocco, UAE, Saudi Arabia)',
  'CIS & Eastern Europe (Russia, Belarus, Azerbaijan)',
  'Latin America (Brazil, Colombia, Peru, Mexico)',
  'Europe & North America'
];

const STUDENT_VOLUME_OPTIONS = [
  '1 - 15 students / year',
  '16 - 50 students / year',
  '51 - 100 students / year',
  '101 - 250 students / year',
  '250+ students / year'
];

const ACADEMIC_PROGRAM_OPTIONS = [
  'MBBS / Clinical Medicine (English Medium)',
  'Computer Science & Software Engineering',
  'Artificial Intelligence & Data Science',
  'Civil, Mechanical & Electrical Engineering',
  'International Business, Finance & Economics (BBA / MBA)',
  '1-Year Chinese Language & HSK Intensive Programs',
  'Master\'s & Ph.D. Full Chinese Government (CSC) Scholarships',
  'Foundation / University Pathway Programs (1+3 / 1+4)'
];

export default function BecomePartner() {
  const [formData, setFormData] = useState<PartnerFormData>({
    name: '',
    country: '',
    location: '',
    website: '',
    targetRegions: [],
    customRegion: '',
    anticipatedStudents: '16 - 50 students / year',
    interestedPrograms: [
      'MBBS / Clinical Medicine (English Medium)',
      'Computer Science & Software Engineering'
    ],
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const toggleRegion = (region: string) => {
    setFormData(prev => {
      const exists = prev.targetRegions.includes(region);
      return {
        ...prev,
        targetRegions: exists 
          ? prev.targetRegions.filter(r => r !== region)
          : [...prev.targetRegions, region]
      };
    });
    if (errors.targetRegions) {
      setErrors(prev => {
        const next = { ...prev };
        delete next.targetRegions;
        return next;
      });
    }
  };

  const toggleProgram = (program: string) => {
    setFormData(prev => {
      const exists = prev.interestedPrograms.includes(program);
      return {
        ...prev,
        interestedPrograms: exists
          ? prev.interestedPrograms.filter(p => p !== program)
          : [...prev.interestedPrograms, program]
      };
    });
    if (errors.interestedPrograms) {
      setErrors(prev => {
        const next = { ...prev };
        delete next.interestedPrograms;
        return next;
      });
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your full name or agency contact name.';
    }
    if (!formData.country.trim()) {
      newErrors.country = 'Please select or specify your country.';
    }
    if (!formData.location.trim()) {
      newErrors.location = 'Please enter your operational city or location.';
    }
    if (!formData.website.trim()) {
      newErrors.website = 'Please enter your website or official social profile link.';
    }
    if (formData.targetRegions.length === 0 && !formData.customRegion.trim()) {
      newErrors.targetRegions = 'Please select at least one target student recruitment region.';
    }
    if (formData.interestedPrograms.length === 0) {
      newErrors.interestedPrograms = 'Please choose at least one academic program of interest.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Compile final message string
  const compileWhatsAppMessage = () => {
    const allRegions = [...formData.targetRegions];
    if (formData.customRegion.trim()) {
      allRegions.push(formData.customRegion.trim());
    }

    const message = 
      `🤝 *NEW PARTNERSHIP APPLICATION - NIHAO.EDU*\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
      `🏢 *AGENCY & CONTACT DETAILS*\n` +
      `• *Name / Contact:* ${formData.name.trim()}\n` +
      `• *Country:* ${formData.country.trim()}\n` +
      `• *Location:* ${formData.location.trim()}\n` +
      `• *Website / Profile:* ${formData.website.trim()}\n\n` +
      `📋 *AGENCY PROFILE*\n` +
      `• *Target Regions:* ${allRegions.length > 0 ? allRegions.join(', ') : 'Not specified'}\n` +
      `• *Anticipated Students / Year:* ${formData.anticipatedStudents}\n` +
      `• *Interested Academic Programs:*\n  - ${formData.interestedPrograms.join('\n  - ')}\n` +
      (formData.notes.trim() ? `\n• *Additional Notes:* ${formData.notes.trim()}\n` : '\n') +
      `━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `📍 *Submitted via:* Nihao.edu Official Partner Portal (Hangzhou HQ)`;

    return message;
  };

  const getWhatsAppUrl = () => {
    const message = compileWhatsAppMessage();
    return `${WHATSAPP_LINK}?text=${encodeURIComponent(message)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      // Scroll to first error
      const firstErrorKey = Object.keys(errors)[0];
      const element = document.getElementById(firstErrorKey);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setSubmitted(true);
    // Trigger WhatsApp redirect immediately
    const whatsappUrl = getWhatsAppUrl();
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopyMessage = () => {
    const text = compileWhatsAppMessage();
    navigator.clipboard.writeText(text).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2500);
    });
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      country: '',
      location: '',
      website: '',
      targetRegions: [],
      customRegion: '',
      anticipatedStudents: '16 - 50 students / year',
      interestedPrograms: [
        'MBBS / Clinical Medicine (English Medium)',
        'Computer Science & Software Engineering'
      ],
      notes: ''
    });
    setErrors({});
  };

  return (
    <div className="pt-28 pb-24 min-h-screen bg-[#fafafc]">
      <Helmet>
        <title>Become a Recruitment Partner | Nihao Education China</title>
        <meta 
          name="description" 
          content="Partner with Nihao Education in Hangzhou. Direct university admissions in China, high commission payouts, JW202 visa speed, and full on-ground student care." 
        />
      </Helmet>

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-red-50 to-amber-50 border border-red-200/80 text-red-700 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            <Handshake className="w-3.5 h-3.5 text-red-600" />
            <span>Global Agency & Institutional Network</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1d1d1f] tracking-tight leading-[1.1] mb-6">
            Become an Authorized <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-red-600 via-rose-600 to-amber-500 bg-clip-text text-transparent">
              Recruitment Partner
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-[#6e6e73] font-normal leading-relaxed">
            Expand your agency's portfolio into China. Connect your students directly to 
            Tier-1 Chinese universities, CSC government scholarships, and dedicated Hangzhou 
            on-ground coordination.
          </p>

          {/* Quick value badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8 pt-4 text-left">
            <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-gray-200/70 shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500">Hangzhou HQ</p>
                <p className="text-sm font-bold text-gray-900">Direct Portals</p>
              </div>
            </div>

            <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-gray-200/70 shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500">Fast Turnaround</p>
                <p className="text-sm font-bold text-gray-900">48-Hr Review</p>
              </div>
            </div>

            <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-gray-200/70 shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500">Tiered Margins</p>
                <p className="text-sm font-bold text-gray-900">Top Commission</p>
              </div>
            </div>

            <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-gray-200/70 shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500">Local Care</p>
                <p className="text-sm font-bold text-gray-900">100% In-China</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Form Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form Container */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-10 shadow-xl shadow-stone-200/40 border border-gray-200/80">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form 
                  key="partner-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-8"
                  noValidate
                >
                  {/* Step Header */}
                  <div className="border-b border-gray-100 pb-5">
                    <h2 className="text-2xl font-bold text-gray-900">Agency Partnership Application</h2>
                    <p className="text-sm text-gray-500 mt-1">
                      Fill out your agency credentials and profile. Submitting automatically generates and sends your partnership file to our Hangzhou Global Relations team via WhatsApp.
                    </p>
                  </div>

                  {/* Section 1: Contact Information */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-7 h-7 rounded-full bg-red-600 text-white flex items-center justify-center text-xs font-bold">
                        1
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">Agency Contact Information</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Name */}
                      <div id="name" className="sm:col-span-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                          Full Name / Authorized Representative <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="e.g. David Harrison (Managing Director, Apex Global)"
                            className={`w-full px-4 py-3 rounded-xl border bg-gray-50/50 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 transition-all ${
                              errors.name 
                                ? 'border-red-500 focus:ring-red-200 bg-red-50/20' 
                                : 'border-gray-200 focus:ring-red-500/20 focus:border-red-500'
                            }`}
                          />
                        </div>
                        {errors.name && (
                          <p className="text-xs text-red-600 mt-1.5 font-medium">{errors.name}</p>
                        )}
                      </div>

                      {/* Country */}
                      <div id="country">
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                          Country <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                            <Globe2 className="w-4 h-4" />
                          </div>
                          <input
                            type="text"
                            name="country"
                            list="country-suggestions"
                            value={formData.country}
                            onChange={handleInputChange}
                            placeholder="e.g. Nigeria, Pakistan, India"
                            className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-gray-50/50 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 transition-all ${
                              errors.country 
                                ? 'border-red-500 focus:ring-red-200 bg-red-50/20' 
                                : 'border-gray-200 focus:ring-red-500/20 focus:border-red-500'
                            }`}
                          />
                          <datalist id="country-suggestions">
                            {POPULAR_COUNTRIES.map(c => (
                              <option key={c} value={c} />
                            ))}
                          </datalist>
                        </div>
                        {errors.country && (
                          <p className="text-xs text-red-600 mt-1.5 font-medium">{errors.country}</p>
                        )}
                      </div>

                      {/* Location */}
                      <div id="location">
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                          Location (City / State / HQ) <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                            <MapPin className="w-4 h-4" />
                          </div>
                          <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            placeholder="e.g. Lagos, Ikeja Branch"
                            className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-gray-50/50 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 transition-all ${
                              errors.location 
                                ? 'border-red-500 focus:ring-red-200 bg-red-50/20' 
                                : 'border-gray-200 focus:ring-red-500/20 focus:border-red-500'
                            }`}
                          />
                        </div>
                        {errors.location && (
                          <p className="text-xs text-red-600 mt-1.5 font-medium">{errors.location}</p>
                        )}
                      </div>

                      {/* Website */}
                      <div id="website" className="sm:col-span-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                          Website / Online Presence <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                            <Globe className="w-4 h-4" />
                          </div>
                          <input
                            type="text"
                            name="website"
                            value={formData.website}
                            onChange={handleInputChange}
                            placeholder="e.g. https://www.apexeducation.com or LinkedIn Company Page"
                            className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-gray-50/50 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 transition-all ${
                              errors.website 
                                ? 'border-red-500 focus:ring-red-200 bg-red-50/20' 
                                : 'border-gray-200 focus:ring-red-500/20 focus:border-red-500'
                            }`}
                          />
                        </div>
                        {errors.website && (
                          <p className="text-xs text-red-600 mt-1.5 font-medium">{errors.website}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Agency Profile */}
                  <div className="border-t border-gray-100 pt-7">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-7 h-7 rounded-full bg-red-600 text-white flex items-center justify-center text-xs font-bold">
                        2
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">Agency Profile</h3>
                        <p className="text-xs text-gray-500">Provide details on your student reach, recruitment volume, and program preferences.</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {/* Target Regions */}
                      <div id="targetRegions">
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                          Target Regions (Select all that apply) <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {TARGET_REGION_OPTIONS.map((region) => {
                            const isSelected = formData.targetRegions.includes(region);
                            return (
                              <button
                                type="button"
                                key={region}
                                onClick={() => toggleRegion(region)}
                                className={`text-left p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-start gap-2.5 cursor-pointer ${
                                  isSelected
                                    ? 'bg-red-50/80 border-red-500 text-red-950 font-semibold shadow-sm'
                                    : 'bg-gray-50/60 border-gray-200 text-gray-700 hover:bg-gray-100 hover:border-gray-300'
                                }`}
                              >
                                <div className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 border transition-all ${
                                  isSelected ? 'bg-red-600 border-red-600 text-white' : 'border-gray-400 bg-white'
                                }`}>
                                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                                </div>
                                <span className="leading-snug">{region}</span>
                              </button>
                            );
                          })}
                        </div>

                        {/* Optional custom other region */}
                        <div className="mt-3">
                          <input
                            type="text"
                            name="customRegion"
                            value={formData.customRegion}
                            onChange={handleInputChange}
                            placeholder="Other specific countries or recruitment zones (optional)"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/40 text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                          />
                        </div>

                        {errors.targetRegions && (
                          <p className="text-xs text-red-600 mt-1.5 font-medium">{errors.targetRegions}</p>
                        )}
                      </div>

                      {/* Anticipated Students per Year */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                          Anticipated Students per Year <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                          {STUDENT_VOLUME_OPTIONS.map((vol) => {
                            const isSelected = formData.anticipatedStudents === vol;
                            return (
                              <button
                                type="button"
                                key={vol}
                                onClick={() => setFormData(prev => ({ ...prev, anticipatedStudents: vol }))}
                                className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer ${
                                  isSelected
                                    ? 'bg-slate-900 border-slate-900 text-white shadow-md'
                                    : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                                }`}
                              >
                                <Users className={`w-4 h-4 mx-auto mb-1.5 ${isSelected ? 'text-amber-400' : 'text-gray-400'}`} />
                                <span>{vol}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Interested Academic Programs */}
                      <div id="interestedPrograms">
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                          Interested Academic Programs <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {ACADEMIC_PROGRAM_OPTIONS.map((program) => {
                            const isSelected = formData.interestedPrograms.includes(program);
                            return (
                              <button
                                type="button"
                                key={program}
                                onClick={() => toggleProgram(program)}
                                className={`text-left p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-start gap-2.5 cursor-pointer ${
                                  isSelected
                                    ? 'bg-amber-50/70 border-amber-500 text-amber-950 font-semibold shadow-sm'
                                    : 'bg-gray-50/60 border-gray-200 text-gray-700 hover:bg-gray-100 hover:border-gray-300'
                                }`}
                              >
                                <div className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 border transition-all ${
                                  isSelected ? 'bg-amber-500 border-amber-500 text-white' : 'border-gray-400 bg-white'
                                }`}>
                                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                                </div>
                                <span className="leading-snug">{program}</span>
                              </button>
                            );
                          })}
                        </div>
                        {errors.interestedPrograms && (
                          <p className="text-xs text-red-600 mt-1.5 font-medium">{errors.interestedPrograms}</p>
                        )}
                      </div>

                      {/* Optional Notes */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                          Additional Information / Agency Introduction (Optional)
                        </label>
                        <textarea
                          rows={3}
                          name="notes"
                          value={formData.notes}
                          onChange={handleInputChange}
                          placeholder="Tell us about your agency history, current university partners, or special requirements for Chinese university admissions..."
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4 border-t border-gray-100">
                    <button
                      type="submit"
                      className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white font-bold text-base shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/35 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-3 cursor-pointer group"
                    >
                      <Send className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                      <span>Submit Partnership Application via WhatsApp</span>
                    </button>
                    <p className="text-center text-xs text-gray-500 mt-3 flex items-center justify-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Direct connection to Hangzhou HQ admissions desk (WhatsApp: +86 15968141445)</span>
                    </p>
                  </div>
                </motion.form>
              ) : (
                /* Success & Captured WhatsApp Details State */
                <motion.div
                  key="partner-success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-6 space-y-6"
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-9 h-9" />
                    </div>
                    <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold rounded-full mb-2">
                      Inquiry Captured & Prepared
                    </span>
                    <h2 className="text-3xl font-extrabold text-gray-900">
                      Application Ready to Send!
                    </h2>
                    <p className="text-gray-600 max-w-lg mx-auto text-sm mt-2">
                      Your agency profile has been formatted into our official recruitment channel. 
                      If WhatsApp did not automatically open, click the button below to complete the dispatch.
                    </p>
                  </div>

                  {/* Primary Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <a
                      href={getWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm text-center shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Open in WhatsApp</span>
                      <ExternalLink className="w-4 h-4 opacity-80" />
                    </a>

                    <button
                      type="button"
                      onClick={handleCopyMessage}
                      className="flex-1 py-3.5 px-6 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer border border-gray-200"
                    >
                      {copySuccess ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-600" />
                          <span className="text-emerald-700">Copied to Clipboard!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copy Message Text</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Message Preview Box */}
                  <div className="bg-[#f5f5f7] rounded-2xl p-5 border border-gray-200/80 text-left">
                    <div className="flex items-center justify-between mb-3 border-b border-gray-200 pb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                        Generated WhatsApp Transmission Preview
                      </span>
                      <span className="text-[11px] text-gray-400 font-mono">
                        Target: +86 15968141445
                      </span>
                    </div>
                    <pre className="font-mono text-xs text-gray-800 whitespace-pre-wrap leading-relaxed max-h-64 overflow-y-auto bg-white p-4 rounded-xl border border-gray-200 shadow-inner">
                      {compileWhatsAppMessage()}
                    </pre>
                  </div>

                  {/* Secondary info and reset */}
                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-100">
                    <div className="text-xs text-gray-500 text-center sm:text-left">
                      Our institutional coordinator in Hangzhou will review your agency file and respond within 24 hours.
                    </div>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="text-xs font-bold text-gray-600 hover:text-red-600 underline cursor-pointer"
                    >
                      Submit Another Application
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Why Partner & Coordinator Contact Card */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Direct Contact Card */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-stone-900 text-white rounded-3xl p-6 sm:p-7 shadow-xl border border-slate-700/60">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center font-bold text-xl">
                  NH
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">Hangzhou Admissions HQ</h3>
                  <p className="text-xs text-stone-400">Institutional Partner Relations</p>
                </div>
              </div>

              <p className="text-xs text-stone-300 leading-relaxed mb-5">
                Have urgent student batches, sub-agency agreements, or custom scholarship allocations? Connect directly with our lead international coordinators.
              </p>

              <div className="space-y-3 text-xs">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                  <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase font-bold">Official WhatsApp</span>
                    <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="font-mono text-white hover:text-emerald-400 transition-colors">
                      +86 15968141445
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                  <MapPin className="w-4 h-4 text-red-400 shrink-0" />
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase font-bold">China Headquarters</span>
                    <span className="text-stone-200">
                      Block A, Xipei Education Building, 280 Xuelin St, Xiasha Higher Education Zone, Hangzhou
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-white/10 text-center">
                <span className="inline-block px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-[11px] font-semibold">
                  ⚡ 2026/2027 Intakes Open
                </span>
              </div>
            </div>

            {/* Why Partner Benefits List */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-gray-200/80">
              <h3 className="font-bold text-gray-900 text-base mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                <span>The Nihao Partner Advantage</span>
              </h3>

              <ul className="space-y-3.5 text-xs text-gray-600">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-gray-900">Direct University Desks:</strong> We work directly with university international student colleges with no secondary middlemen.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-gray-900">Government & CSC Scholarship Quotas:</strong> Exclusive access to Type A/B scholarships, provincial grants, and tuition waivers.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-gray-900">Complete Visa Packaging:</strong> Fast issuance of JW202/DQ forms with step-by-step embassy interview coaching.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-gray-900">Dedicated Partner Portal & WeChat:</strong> 1-on-1 account executive assigned for rapid status tracking and document checks.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-gray-900">Hangzhou Ground Arrival Care:</strong> Airport reception, physical registration, medical checkups, residence permits, and local SIM cards.
                  </span>
                </li>
              </ul>
            </div>

            {/* Step Onboarding Card */}
            <div className="bg-white rounded-3xl p-6 border border-gray-200/80 shadow-sm">
              <h4 className="font-bold text-gray-900 text-sm mb-3">Onboarding Roadmap</h4>
              <ol className="relative border-l border-gray-200 ml-2.5 space-y-4 text-xs text-gray-600">
                <li className="ml-4">
                  <div className="absolute -left-1.5 mt-1.5 w-3 h-3 rounded-full border-2 border-white bg-red-600" />
                  <span className="font-bold text-gray-900 block">1. Form Submission</span>
                  Provide your agency reach and program focus.
                </li>
                <li className="ml-4">
                  <div className="absolute -left-1.5 mt-1.5 w-3 h-3 rounded-full border-2 border-white bg-amber-500" />
                  <span className="font-bold text-gray-900 block">2. Agency Accreditation</span>
                  Brief Zoom/WhatsApp alignment & agreement signing.
                </li>
                <li className="ml-4">
                  <div className="absolute -left-1.5 mt-1.5 w-3 h-3 rounded-full border-2 border-white bg-emerald-500" />
                  <span className="font-bold text-gray-900 block">3. Student Placement & Payouts</span>
                  Submit applicants with guaranteed priority tracking.
                </li>
              </ol>
            </div>

          </div>

        </div>
      </section>

      {/* Partner FAQs */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
            <HelpCircle className="w-4 h-4 text-amber-500" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            Agency Partnership FAQ
          </h2>
        </div>

        <div className="space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
            <h4 className="font-bold text-gray-900 text-sm mb-1.5">
              How does the agency commission and payout process work?
            </h4>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              We offer transparent, highly competitive commission tiers released promptly after student university fee settlement or registration. Custom retainer and incentive bonuses are available for high-volume recruitment agencies.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
            <h4 className="font-bold text-gray-900 text-sm mb-1.5">
              Can Nihao Education co-host online webinars for our prospective students?
            </h4>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Yes! Our Hangzhou team regularly joins Zoom/Google Meet sessions with our partner agencies to address student questions, demonstrate campus life, explain scholarship eligibility, and guide parents.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
            <h4 className="font-bold text-gray-900 text-sm mb-1.5">
              What documents do we need to start submitting student files?
            </h4>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Once our partnership agreement is active, you can send passport scans, academic transcripts, English proficiency/HSK (if applicable), and police clearance directly through our dedicated agent portal or encrypted WhatsApp channel.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
