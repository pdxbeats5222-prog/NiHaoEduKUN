import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Calendar, Bell, ArrowRight, X, MapPin, Clock, DollarSign, Users as UsersIcon, GraduationCap, Sparkles, CheckCircle2 } from 'lucide-react';

interface Deadline {
  id: number;
  title: string;
  type: string;
  date: string;
  description: string;
  isDetailed?: boolean;
}

const deadlines: Deadline[] = [
  {
    id: 5,
    title: "4-Week Chinese Language Intensive Summer Camp",
    type: "Summer Camp",
    date: "2026-06-01",
    description: "Hangzhou Summer Camp (July 13 – Aug 7). Intensive HSK 1-4 classes, accommodation included, starting at $999. Open to students 17+ from US, Europe, Russia & more.",
    isDetailed: true,
  },
  {
    id: 1,
    title: "Chinese Government Scholarship (CSC)",
    type: "Scholarship",
    date: "2026-02-28",
    description: "Full scholarship covering tuition, accommodation, and living stipend for international students.",
  },
  {
    id: 2,
    title: "Zhejiang University Fall Intake",
    type: "University Admission",
    date: "2026-03-15",
    description: "Application deadline for Bachelor's and Master's programs starting in September 2026.",
  },
  {
    id: 3,
    title: "Hangzhou Normal University Spring Intake",
    type: "University Admission",
    date: "2026-05-30",
    description: "Language program (HSK) applications for the upcoming Spring semester.",
  },
  {
    id: 4,
    title: "Zhejiang Provincial Government Scholarship",
    type: "Scholarship",
    date: "2026-04-30",
    description: "Partial and full scholarships for outstanding international students in Zhejiang province.",
  }
];

export default function Deadlines() {
  const [selectedProgram, setSelectedProgram] = useState<Deadline | null>(null);

  const handleSetReminder = (deadline: Deadline) => {
    // Generate an ICS file for calendar reminder
    const startDate = deadline.date.replace(/-/g, '');
    const endDate = startDate; // All day event
    
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART;VALUE=DATE:${startDate}
DTEND;VALUE=DATE:${endDate}
SUMMARY:Deadline: ${deadline.title}
DESCRIPTION:${deadline.description}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `deadline-${deadline.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="deadlines" className="py-32 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-red-400/10 to-transparent blur-3xl rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1d1d1f] tracking-tight mb-4">Upcoming Deadlines.</h2>
          <p className="text-xl text-[#5a5a5c] max-w-2xl mx-auto">
            Stay on top of your application schedule. Never miss an opportunity for admission or scholarships.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {deadlines.map((deadline, idx) => (
            <motion.div 
              key={deadline.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="bg-[#faf9f6] border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-8 rounded-[2rem] flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between group hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500"
            >
              <div className="flex-grow">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`${deadline.isDetailed ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'} px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider`}>
                    {deadline.type}
                  </span>
                  {deadline.isDetailed && (
                    <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full uppercase tracking-wider animate-pulse">
                      Hot
                    </span>
                  )}
                </div>
                <h3 className={`text-2xl font-bold mb-2 group-hover:text-blue-700 transition-colors ${deadline.isDetailed ? 'text-red-600' : 'text-blue-600'}`}>{deadline.title}</h3>
                <div className="flex items-center gap-2 text-[#5a5a5c] mb-4">
                  <Calendar className="w-5 h-5 text-amber-500" />
                  <span className="font-medium">
                    {deadline.isDetailed ? 'Register by: ' : ''}
                    {new Date(deadline.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
                <p className="text-[#5a5a5c] leading-relaxed mb-4">{deadline.description}</p>
                
                {deadline.id === 5 && (
                  <button 
                    onClick={() => setSelectedProgram(deadline)}
                    className="flex items-center gap-2 text-red-600 font-bold hover:gap-3 transition-all group/btn"
                  >
                    View Full Program Details <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
              
              <button 
                onClick={() => handleSetReminder(deadline)}
                className="shrink-0 bg-white text-[#1d1d1f] hover:text-red-600 p-4 rounded-full shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 group-hover:bg-gradient-to-r group-hover:from-red-600 group-hover:to-red-500 group-hover:text-white"
                title="Add to Calendar"
              >
                <Bell className="w-6 h-6" />
                <span className="sm:hidden font-medium">Set Reminder</span>
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Program Details Modal */}
      <AnimatePresence>
        {selectedProgram && selectedProgram.id === 5 && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProgram(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="p-8 sm:p-10 overflow-y-auto custom-scrollbar">
                <button 
                  onClick={() => setSelectedProgram(null)}
                  className="absolute top-6 right-6 p-2 h-10 w-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-500 rounded-full transition-colors z-10"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="mb-8">
                  <div className="inline-block px-4 py-1.5 bg-red-100 text-red-600 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                    Special Program
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-[#1d1d1f] leading-tight mb-2">
                    4-Week Chinese Language Intensive Summer Camp
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#faf9f6] border border-gray-100">
                    <div className="p-2 bg-red-50 rounded-lg text-red-600">
                      <DollarSign className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-[#86868b] font-medium uppercase tracking-wider">Cost</p>
                      <p className="text-lg font-bold text-[#1d1d1f]">Starting at $999</p>
                      <p className="text-xs text-[#5a5a5c]">No hidden fees</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#faf9f6] border border-gray-100">
                    <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
                      <Calendar className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-[#86868b] font-medium uppercase tracking-wider">Dates</p>
                      <p className="text-lg font-bold text-[#1d1d1f]">July 13 – Aug 7</p>
                      <p className="text-xs text-[#5a5a5c]">Mon – Fri, 8:50 – 12:15</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <section>
                    <div className="flex items-center gap-2 mb-4">
                      <GraduationCap className="w-6 h-6 text-blue-600" />
                      <h3 className="text-xl font-bold text-[#1d1d1f]">Class Levels</h3>
                    </div>
                    <ul className="space-y-3">
                      <li className="flex gap-3">
                        <div className="h-2 w-2 rounded-full bg-blue-600 mt-2 shrink-0" />
                        <p className="text-[#5a5a5c]"><strong className="text-[#1d1d1f]">Junior Class:</strong> Designed for learners at <strong className="text-blue-600">HSK 1-2</strong> level.</p>
                      </li>
                      <li className="flex gap-3">
                        <div className="h-2 w-2 rounded-full bg-blue-600 mt-2 shrink-0" />
                        <p className="text-[#5a5a5c]"><strong className="text-[#1d1d1f]">Intermediate Class:</strong> Designed for learners at <strong className="text-blue-600">HSK 3-4</strong> level.</p>
                      </li>
                    </ul>
                  </section>

                  <section>
                    <div className="flex items-center gap-2 mb-4">
                      <Clock className="w-6 h-6 text-emerald-600" />
                      <h3 className="text-xl font-bold text-[#1d1d1f]">Program Details</h3>
                    </div>
                    <ul className="space-y-4">
                      <li className="flex gap-3">
                        <div className="h-2 w-2 rounded-full bg-emerald-600 mt-2 shrink-0" />
                        <p className="text-[#5a5a5c]"><strong className="text-[#1d1d1f]">Age Requirement:</strong> Must be at least 17 years old.</p>
                      </li>
                      <li className="flex gap-3">
                        <div className="h-2 w-2 rounded-full bg-emerald-600 mt-2 shrink-0" />
                        <p className="text-[#5a5a5c]"><strong className="text-[#1d1d1f]">Application Deadline:</strong> June 1st, 2026.</p>
                      </li>
                      <li className="flex gap-3">
                        <div className="h-2 w-2 rounded-full bg-emerald-600 mt-2 shrink-0" />
                        <div>
                          <p className="text-[#1d1d1f] font-bold mb-2">Accommodation & Pricing:</p>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="p-3 bg-white border border-gray-100 rounded-xl">
                              <p className="text-xs text-[#86868b] uppercase">Four-bed room</p>
                              <p className="text-lg font-bold text-[#1d1d1f]">$999</p>
                            </div>
                            <div className="p-3 bg-white border border-gray-100 rounded-xl">
                              <p className="text-xs text-[#86868b] uppercase">Two-bed room</p>
                              <p className="text-lg font-bold text-[#1d1d1f]">$1099</p>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </section>

                  <section>
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles className="w-6 h-6 text-purple-600" />
                      <h3 className="text-xl font-bold text-[#1d1d1f]">Program Bonus</h3>
                    </div>
                    <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100">
                      <ul className="space-y-3">
                        <li className="flex gap-3">
                          <CheckCircle2 className="w-5 h-5 text-purple-600 shrink-0" />
                          <p className="text-[#5a5a5c]">Students from the <strong className="text-[#1d1d1f]">US, Europe, or Russia</strong> are warmly welcome.</p>
                        </li>
                        <li className="flex gap-3">
                          <CheckCircle2 className="w-5 h-5 text-purple-600 shrink-0" />
                          <p className="text-[#5a5a5c]"><strong className="text-[#1d1d1f]">Early departure</strong> is allowed after full payment by July 13.</p>
                        </li>
                      </ul>
                    </div>
                  </section>

                  <section>
                    <div className="flex items-center gap-2 mb-4">
                      <MapPin className="w-6 h-6 text-red-600" />
                      <h3 className="text-xl font-bold text-[#1d1d1f]">Location</h3>
                    </div>
                    <div className="bg-[#faf9f6] p-6 rounded-2xl border border-gray-100">
                      <p className="text-[#1d1d1f] font-medium">No. 280 Xuelin Street, Qiantang District, Hangzhou City</p>
                    </div>
                  </section>
                </div>

                <div className="mt-12">
                  <a 
                    href="https://wa.me/8615968141445"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setSelectedProgram(null)}
                    className="w-full bg-gradient-to-r from-red-600 to-red-500 text-white py-5 rounded-2xl font-bold text-center flex items-center justify-center gap-2 shadow-xl hover:shadow-red-500/30 hover:scale-[1.02] transition-all"
                  >
                    Apply for Summer Camp Now
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
