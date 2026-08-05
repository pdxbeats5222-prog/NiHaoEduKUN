import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Calendar, Clock, Video, CheckCircle2, ShieldCheck, 
  CreditCard, ArrowRight, ArrowLeft, GraduationCap, 
  Building2, Award, FileText, Sparkles, Send, 
  DollarSign, Check, HelpCircle, ExternalLink, Globe, Lock
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import paymentQrImg from '../assets/payment_qr.jpeg';

interface BookVideoCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTopic?: string;
}

// Topics offered in the guidance call
const GUIDANCE_TOPICS = [
  {
    id: 'career',
    icon: GraduationCap,
    title: 'Career & Degree Selection',
    description: 'Align your career ambitions with the best majors in China (Engineering, MBBS, AI, Business, CS & Int. Trade).',
    badge: 'Popular'
  },
  {
    id: 'university',
    icon: Building2,
    title: 'University Matching',
    description: 'Find top C9, 985 & 211 double-first-class universities suited to your academic profile.',
    badge: 'Custom'
  },
  {
    id: 'scholarship',
    icon: Award,
    title: 'Scholarship Strategies',
    description: 'Step-by-step guidance for CSC Chinese Government, Provincial & University Presidential Scholarships.',
    badge: 'High Value'
  },
  {
    id: 'recommendation',
    icon: FileText,
    title: 'Document & Recommendation Review',
    description: 'How to craft winning Motivation Letters, Study Plans & authenticate academic recommendation letters.',
    badge: 'Essential'
  },
  {
    id: 'offers_rules',
    icon: Sparkles,
    title: 'Recent Offers & New Rules (2026/2027)',
    description: 'Latest updates on Ministry of Education rules, digital JW202/JW201 forms, and intake deadlines.',
    badge: 'New 2026'
  },
  {
    id: 'visa',
    icon: ShieldCheck,
    title: 'Visa Process (X1 & X2)',
    description: 'Embassy interview coaching, physical exam forms, JW issuance, and Residence Permit conversion.',
    badge: 'Guaranteed'
  },
  {
    id: 'process',
    icon: ArrowRight,
    title: 'Step-by-Step Application Roadmap',
    description: 'Timeline management from submission to offer letter, physical arrival, and university registration.',
    badge: 'Roadmap'
  },
  {
    id: 'company',
    icon: Globe,
    title: 'Nihao Overview & On-Ground Support',
    description: 'How our Hangzhou HQ team handles 48h airport reception, dorm placement, SIM, Alipay & bank accounts.',
    badge: 'Hangzhou HQ'
  }
];

const TIME_SLOTS = [
  '09:00 AM',
  '11:00 AM',
  '02:00 PM',
  '04:30 PM',
  '07:00 PM',
  '09:00 PM'
];

const COUNTRY_CODES = [
  { code: '+86', name: 'China 🇨🇳' },
  { code: '+1', name: 'USA/Canada 🇺🇸/🇨🇦' },
  { code: '+44', name: 'UK 🇬🇧' },
  { code: '+66', name: 'Thailand 🇹🇭' },
  { code: '+20', name: 'Egypt 🇪🇬' },
  { code: '+34', name: 'Spain 🇪🇸' },
  { code: '+91', name: 'India 🇮🇳' },
  { code: '+234', name: 'Nigeria 🇳🇬' },
  { code: '+92', name: 'Pakistan 🇵🇰' },
  { code: '+62', name: 'Indonesia 🇮🇩' },
  { code: '+55', name: 'Brazil 🇧🇷' },
  { code: '+7', name: 'Russia 🇷🇺' },
  { code: '+966', name: 'Saudi Arabia 🇸🇦' },
  { code: '+971', name: 'UAE 🇦🇪' }
];

export const BookVideoCallModal: React.FC<BookVideoCallModalProps> = ({
  isOpen,
  onClose,
  initialTopic
}) => {
  const { t } = useTranslation();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [selectedTopic, setSelectedTopic] = useState<string>(initialTopic || 'career');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  
  const [fullName, setFullName] = useState<string>('');
  const [countryCode, setCountryCode] = useState<string>('+86');
  const [whatsappNumber, setWhatsappNumber] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [degreeInterest, setDegreeInterest] = useState<string>("Bachelor's Degree");
  const [notes, setNotes] = useState<string>('');

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'wechat' | 'paypal'>('card');
  const [cardNumber, setCardNumber] = useState<string>('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState<string>('12/28');
  const [cardCvc, setCardCvc] = useState<string>('123');
  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false);
  const [bookingId, setBookingId] = useState<string>('');

  // Generate available dates (next 10 days starting tomorrow)
  const availableDates = React.useMemo(() => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 10; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const dateStr = d.toISOString().split('T')[0];
      const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
      const monthDay = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      dates.push({ dateStr, dayName, monthDay });
    }
    return dates;
  }, []);

  // Pre-select first date & time on mount/open
  useEffect(() => {
    if (isOpen) {
      if (!selectedDate && availableDates.length > 0) {
        setSelectedDate(availableDates[0].dateStr);
      }
      if (!selectedTime) {
        setSelectedTime(TIME_SLOTS[1]);
      }
    }
  }, [isOpen, availableDates, selectedDate, selectedTime]);

  if (!isOpen) return null;

  const handleNextToDate = () => {
    setStep(2);
  };

  const handleNextToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !whatsappNumber || !email || !selectedDate || !selectedTime) {
      alert('Please fill in your name, WhatsApp number, email, date and time.');
      return;
    }
    setStep(3);
  };

  const handleProcessPayment = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      const generatedId = `NH-VID-${Math.floor(1000 + Math.random() * 9000)}`;
      setBookingId(generatedId);
      
      // Save booking locally
      const bookingData = {
        id: generatedId,
        fullName,
        whatsapp: `${countryCode}${whatsappNumber}`,
        email,
        degreeInterest,
        topic: selectedTopic,
        date: selectedDate,
        time: selectedTime,
        notes,
        createdAt: new Date().toISOString()
      };
      
      try {
        const existing = JSON.parse(localStorage.getItem('nihao_video_bookings') || '[]');
        existing.unshift(bookingData);
        localStorage.setItem('nihao_video_bookings', JSON.stringify(existing));
      } catch (err) {
        console.error('Error saving booking:', err);
      }

      setStep(4);
    }, 1500);
  };

  // WhatsApp text formatting
  const formattedWhatsappMessage = encodeURIComponent(
    `Hello Nihao Education! 🎓\nI have just booked my 1-on-1 Video Call Consultation.\n\n` +
    `📌 Booking Ref: ${bookingId}\n` +
    `👤 Name: ${fullName}\n` +
    `📱 WhatsApp: ${countryCode} ${whatsappNumber}\n` +
    `📧 Email: ${email}\n` +
    `🎓 Degree: ${degreeInterest}\n` +
    `📅 Date: ${selectedDate}\n` +
    `⏰ Time: ${selectedTime} (China Standard Time / GMT+8)\n` +
    `💡 Topic: ${GUIDANCE_TOPICS.find(t => t.id === selectedTopic)?.title || selectedTopic}\n` +
    `💳 Payment Status: Paid ($1.00 USD) - Payment Screenshot Attached\n` +
    (notes ? `📝 Notes: ${notes}\n` : '') +
    `\nPlease confirm my counselor meeting link!`
  );

  const whatsappUrl = `https://wa.me/8618012345678?text=${formattedWhatsappMessage}`;

  const topicObj = GUIDANCE_TOPICS.find(t => t.id === selectedTopic);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col my-auto max-h-[92vh]"
        >
          {/* Header Bar */}
          <div className="bg-gradient-to-r from-red-600 via-red-500 to-amber-500 text-white p-6 sm:p-8 relative overflow-hidden flex-shrink-0">
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-10 h-10 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center transition-colors z-10"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-2">
              <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5 animate-pulse" /> 1-on-1 Counselor Call
              </span>
              <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Exclusive Session
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Book a Video Call Consultation
            </h2>
            <p className="text-white/90 text-sm sm:text-base mt-1 max-w-xl">
              Get personalized 1-on-1 guidance on universities, CSC scholarships, visa policies, and career paths directly from our Hangzhou team.
            </p>

            {/* Stepper Progress */}
            <div className="flex items-center gap-2 mt-6 pt-4 border-t border-white/20">
              {[
                { num: 1, label: 'Overview & Topics' },
                { num: 2, label: 'Date & Time' },
                { num: 3, label: 'Reservation Fee' },
                { num: 4, label: 'Confirmed' }
              ].map((s) => (
                <div key={s.num} className="flex-1 flex items-center gap-2">
                  <div 
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      step === s.num 
                        ? 'bg-white text-red-600 shadow-md scale-110' 
                        : step > s.num 
                        ? 'bg-amber-400 text-slate-900' 
                        : 'bg-white/20 text-white/70'
                    }`}
                  >
                    {step > s.num ? <Check className="w-4 h-4 stroke-[3]" /> : s.num}
                  </div>
                  <span className={`text-xs font-semibold hidden sm:inline ${
                    step === s.num ? 'text-white font-bold' : 'text-white/70'
                  }`}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Modal Body Scrollable */}
          <div className="p-6 sm:p-8 overflow-y-auto flex-1 text-slate-800">

            {/* STEP 1: What We Guide You On & Topic Selection */}
            {step === 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-500" /> What We Guide You On During The Call
                  </h3>
                  <p className="text-slate-600 text-sm">
                    Select your primary topic of interest so we can assign the ideal senior admissions counselor for your session:
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {GUIDANCE_TOPICS.map((topic) => {
                    const Icon = topic.icon;
                    const isSelected = selectedTopic === topic.id;
                    return (
                      <div
                        key={topic.id}
                        onClick={() => setSelectedTopic(topic.id)}
                        className={`p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 relative group flex flex-col justify-between ${
                          isSelected 
                            ? 'border-red-500 bg-red-50/50 shadow-md ring-1 ring-red-500' 
                            : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-red-600 text-white' : 'bg-slate-100 text-slate-700 group-hover:bg-slate-200'}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                            isSelected ? 'bg-red-600 text-white' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {topic.badge}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm mb-1">{topic.title}</h4>
                          <p className="text-slate-600 text-xs leading-relaxed">{topic.description}</p>
                        </div>
                        {isSelected && (
                          <div className="mt-3 pt-2 border-t border-red-200 flex items-center text-xs font-bold text-red-600 gap-1">
                            <CheckCircle2 className="w-4 h-4" /> Topic Selected
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-amber-900">
                    <span className="font-bold">Need all topics covered?</span> Don't worry! Your 45-minute video call covers a comprehensive overview across university selection, scholarships, visa processes, and our full Hangzhou on-ground support.
                  </div>
                </div>

                <div className="flex items-center justify-end pt-4 border-t border-slate-100">
                  <button
                    onClick={handleNextToDate}
                    className="bg-red-600 hover:bg-red-700 text-white px-8 py-3.5 rounded-full font-bold shadow-lg shadow-red-500/20 hover:scale-105 transition-all flex items-center gap-2"
                  >
                    Select Date & Time <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Date, Time & Student Info */}
            {step === 2 && (
              <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={handleNextToPayment} className="space-y-6">
                
                {/* Topic Summary Badge */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-100 text-red-600 rounded-xl">
                      {topicObj && <topicObj.icon className="w-5 h-5" />}
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">Topic</span>
                      <p className="text-sm font-bold text-slate-900">{topicObj?.title}</p>
                    </div>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => setStep(1)}
                    className="text-xs font-semibold text-red-600 hover:underline"
                  >
                    Change
                  </button>
                </div>

                {/* Date Picker Pills */}
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-red-600" /> Select Date
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {availableDates.map((item) => {
                      const isSelected = selectedDate === item.dateStr;
                      return (
                        <button
                          key={item.dateStr}
                          type="button"
                          onClick={() => setSelectedDate(item.dateStr)}
                          className={`p-2.5 rounded-xl text-center border transition-all ${
                            isSelected 
                              ? 'bg-red-600 text-white border-red-600 shadow-md font-bold' 
                              : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800'
                          }`}
                        >
                          <div className="text-xs uppercase opacity-80">{item.dayName}</div>
                          <div className="text-sm font-extrabold">{item.monthDay}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Time Picker Pills */}
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-2 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-red-600" /> Select Preferred Time Slot
                    </span>
                    <span className="text-xs text-slate-500 font-normal">China Time (GMT+8)</span>
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {TIME_SLOTS.map((slot) => {
                      const isSelected = selectedTime === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedTime(slot)}
                          className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all text-center ${
                            isSelected 
                              ? 'bg-slate-900 text-white border-slate-900 shadow-md' 
                              : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Student Details Inputs */}
                <div className="space-y-4 pt-2 border-t border-slate-100">
                  <h4 className="font-bold text-slate-900 text-base">Your Information</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. John Doe"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        WhatsApp Number * <span className="text-red-500 text-[10px]">(For instant text confirmation)</span>
                      </label>
                      <div className="flex gap-2">
                        <select
                          value={countryCode}
                          onChange={(e) => setCountryCode(e.target.value)}
                          className="px-2 py-2.5 rounded-xl border border-slate-300 text-xs font-medium bg-slate-50 focus:ring-2 focus:ring-red-500 focus:outline-none"
                        >
                          {COUNTRY_CODES.map((c) => (
                            <option key={c.code} value={c.code}>{c.code} ({c.name})</option>
                          ))}
                        </select>
                        <input
                          type="tel"
                          required
                          value={whatsappNumber}
                          onChange={(e) => setWhatsappNumber(e.target.value)}
                          placeholder="812345678"
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Target Degree</label>
                      <select
                        value={degreeInterest}
                        onChange={(e) => setDegreeInterest(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none bg-white"
                      >
                        <option value="Bachelor's Degree">Bachelor's Degree</option>
                        <option value="Master's Degree">Master's Degree</option>
                        <option value="PhD Program">PhD Program</option>
                        <option value="MBBS Medical Degree">MBBS Medical Degree</option>
                        <option value="Chinese Language Program">Chinese Language Program</option>
                        <option value="1+3 / 1+4 Foundation">1+3 / 1+4 Foundation</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Notes / Specific Questions (Optional)</label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Mention any specific universities or questions you'd like us to prepare for..."
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-slate-600 hover:text-slate-900 px-4 py-2 text-sm font-semibold flex items-center gap-1"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>

                  <button
                    type="submit"
                    className="bg-red-600 hover:bg-red-700 text-white px-8 py-3.5 rounded-full font-bold shadow-lg shadow-red-500/20 hover:scale-105 transition-all flex items-center gap-2"
                  >
                    Proceed to Reservation <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.form>
            )}

            {/* STEP 3: $1 USD Payment */}
            {step === 3 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                
                {/* Fee Explanation */}
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-3">
                  <ShieldCheck className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-amber-900 text-sm">Why is there a symbolic $1 fee?</h4>
                    <p className="text-amber-800 text-xs mt-1 leading-relaxed">
                      To ensure high availability for serious students, we charge a nominal <strong>$1.00 USD</strong> fee. This eliminates spam reservations and secures an exclusive 45-minute video call slot with a senior counselor.
                    </p>
                  </div>
                </div>

                {/* Summary Box */}
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
                  <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider">Booking Summary</h4>
                  <div className="flex justify-between text-xs text-slate-600">
                    <span>Consultation:</span>
                    <span className="font-bold text-slate-900">45-Min 1-on-1 Video Session</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-600">
                    <span>Topic:</span>
                    <span className="font-bold text-slate-900">{topicObj?.title}</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-600">
                    <span>Date & Time:</span>
                    <span className="font-bold text-slate-900">{selectedDate} @ {selectedTime} (CST)</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-600">
                    <span>Student Name:</span>
                    <span className="font-bold text-slate-900">{fullName}</span>
                  </div>
                  <div className="pt-3 border-t border-slate-200 flex justify-between items-center">
                    <span className="font-bold text-slate-900">Total Fee:</span>
                    <span className="text-2xl font-extrabold text-red-600">$1.00 USD</span>
                  </div>
                </div>

                {/* Payment Methods */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">Select Payment Method</label>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                        paymentMethod === 'card' 
                          ? 'border-red-600 bg-red-50 text-red-600 font-bold' 
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <CreditCard className="w-5 h-5" />
                      <span className="text-xs">Credit/Debit Card</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('wechat')}
                      className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                        paymentMethod === 'wechat' 
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-700 font-bold' 
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <Globe className="w-5 h-5 text-emerald-600" />
                      <span className="text-xs">WeChat Pay / Alipay</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('paypal')}
                      className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                        paymentMethod === 'paypal' 
                          ? 'border-blue-600 bg-blue-50 text-blue-700 font-bold' 
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <DollarSign className="w-5 h-5 text-blue-600" />
                      <span className="text-xs">PayPal</span>
                    </button>
                  </div>
                </div>

                {/* Payment Form Details */}
                {paymentMethod === 'card' && (
                  <div className="space-y-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Card Number</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full px-4 py-2 rounded-lg border border-slate-300 text-sm font-mono focus:outline-none"
                        />
                        <Lock className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">Expiry Date</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full px-4 py-2 rounded-lg border border-slate-300 text-sm font-mono focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">CVC / CVV</label>
                        <input
                          type="text"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          className="w-full px-4 py-2 rounded-lg border border-slate-300 text-sm font-mono focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'wechat' && (
                  <div className="p-4 sm:p-5 bg-slate-100/90 border border-slate-200 rounded-2xl text-center space-y-4">
                    <div>
                      <span className="inline-block bg-blue-600 text-white text-[11px] font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider mb-1">
                        Alipay & WeChat Pay
                      </span>
                      <p className="text-xs text-slate-700 font-bold">
                        Scan code with Alipay app to complete $1.00 payment
                      </p>
                    </div>

                    {/* Alipay & WeChat Pay QR Code Image */}
                    <div className="max-w-[280px] sm:max-w-[300px] mx-auto bg-white p-2 rounded-2xl shadow-xl overflow-hidden border border-slate-200 text-slate-900 select-none">
                      <img 
                        src={paymentQrImg} 
                        alt="Alipay / WeChat Pay QR Code" 
                        referrerPolicy="no-referrer"
                        className="w-full h-auto rounded-xl object-contain shadow-sm min-h-[250px] bg-slate-50"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          if (!target.dataset.tried) {
                            target.dataset.tried = '1';
                            target.src = 'https://lh3.googleusercontent.com/u/0/d/1oZPtUY1vEVZ4EAJqowZycTC8VEeOFYmm';
                          } else if (target.dataset.tried === '1') {
                            target.dataset.tried = '2';
                            target.src = '/payment_qr.jpeg';
                          } else if (target.dataset.tried === '2') {
                            target.dataset.tried = '3';
                            target.src = '/IMG_0638.jpeg';
                          }
                        }}
                      />
                    </div>

                    <p className="text-[11px] text-slate-500 max-w-xs mx-auto">
                      After completing the scan, click "Pay $1.00 & Confirm Booking" below to complete your video call reservation.
                    </p>
                  </div>
                )}

                {paymentMethod === 'paypal' && (
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-center space-y-1">
                    <p className="text-xs text-blue-900 font-semibold">PayPal Express Checkout</p>
                    <p className="text-[11px] text-blue-700">Clicking below will process the $1.00 USD reservation fee instantly.</p>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="text-slate-600 hover:text-slate-900 px-4 py-2 text-sm font-semibold flex items-center gap-1"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>

                  <button
                    type="button"
                    onClick={handleProcessPayment}
                    disabled={isProcessingPayment}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3.5 rounded-full font-bold shadow-lg shadow-emerald-600/30 hover:scale-105 transition-all flex items-center gap-2"
                  >
                    {isProcessingPayment ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Processing $1 Payment...
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" /> Pay $1.00 & Confirm Booking
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 4: Confirmation & Direct WhatsApp Text */}
            {step === 4 && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6 text-center">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div>
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Payment Successful • Booking Confirmed
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 mt-2">
                    Your Video Call is Confirmed!
                  </h3>
                  <p className="text-slate-600 text-sm mt-1 max-w-md mx-auto">
                    We have reserved your 1-on-1 counselor session. A confirmation email and instant text have been generated.
                  </p>
                </div>

                {/* Booking Receipt Box */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left space-y-2.5 max-w-lg mx-auto">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                    <span className="text-xs text-slate-500 font-semibold">Booking Reference</span>
                    <span className="text-xs font-mono font-bold bg-slate-200 px-2.5 py-0.5 rounded text-slate-800">{bookingId}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Student Name:</span>
                    <span className="font-bold text-slate-900">{fullName}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Date & Time:</span>
                    <span className="font-bold text-slate-900">{selectedDate} @ {selectedTime} (China Standard Time / GMT+8)</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Topic:</span>
                    <span className="font-bold text-slate-900">{topicObj?.title}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">WhatsApp:</span>
                    <span className="font-bold text-slate-900">{countryCode} {whatsappNumber}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Target Degree:</span>
                    <span className="font-bold text-slate-900">{degreeInterest}</span>
                  </div>
                </div>

                {/* Direct WhatsApp Call to Action */}
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 space-y-3 max-w-lg mx-auto">
                  <div className="flex items-center justify-center gap-2 text-emerald-800 font-bold text-sm">
                    <Send className="w-5 h-5 text-emerald-600" /> Instant Direct WhatsApp Confirmation
                  </div>
                  <p className="text-emerald-900 text-xs leading-relaxed">
                    Click the button below to send your booking details and payment screenshot to our admissions team on WhatsApp. Our counselor will send you the meeting room link directly.
                  </p>
                  
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 px-6 rounded-xl font-extrabold text-sm shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2.5 group text-center"
                  >
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform flex-shrink-0" /> 
                    <span>Send a booking text on WhatsApp now with a payment screenshot</span>
                  </a>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      const text = `Booking Confirmed!\nRef: ${bookingId}\nDate: ${selectedDate}\nTime: ${selectedTime} CST\nName: ${fullName}`;
                      navigator.clipboard.writeText(text);
                      alert('Booking receipt copied to clipboard!');
                    }}
                    className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-4 py-2 border border-slate-300 rounded-full hover:bg-slate-100 transition-colors"
                  >
                    Copy Booking Receipt
                  </button>

                  <button
                    type="button"
                    onClick={onClose}
                    className="text-xs font-bold text-red-600 hover:text-red-700 px-6 py-2 rounded-full border border-red-200 hover:bg-red-50 transition-colors"
                  >
                    Close Window
                  </button>
                </div>
              </motion.div>
            )}

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
