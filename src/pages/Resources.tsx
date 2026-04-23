import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Award, Building, Clock, FileText, Download, X, AlertCircle, ListChecks, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function Resources() {
  const [activeGuide, setActiveGuide] = useState<string | null>(null);

  const universities = [
    { name: "Zhejiang University", majors: "Civil Engineering, Computer Science, Mechanical Engineering, AI, Business Administration" },
    { name: "Hangzhou Dianzi University", majors: "Electronic Information Engineering, CS, Communication Engineering, Economics" },
    { name: "Hangzhou Normal University", majors: "Education, International Business, Comparative Literature, Digital Trade, Psychology" },
    { name: "Zhejiang University of Finance & Economics", majors: "Finance, Accounting, Economics, Taxation, Business Administration" },
    { name: "Communication University of Zhejiang", majors: "Radio/TV, Journalism, Advertising, Film Production, International Culture" },
    { name: "Zhejiang Gongshang University", majors: "International Business, Logistics, Financial Management, International Law" },
    { name: "Zhejiang University of Technology", majors: "Mechanical/Environmental/Chemical Engineering, CS, Automation" },
    { name: "Zhejiang University of Science and Technology", majors: "Business Chinese, Robotics, Architecture, CS, Electrical Engineering" },
    { name: "China Jiliang University", majors: "Measurement/Control Tech, Electronic Info, Quality Management, Microelectronics" },
    { name: "Zhejiang Institute of Economics and Trade", majors: "Chinese Language, Exhibition Planning, Tea Culture, FinTech, E-commerce" }
  ];

  const visaGuide = {
    title: "X1/X2 Student Visa Application Guide",
    description: "A comprehensive step-by-step walkthrough of the Chinese student visa process.",
    steps: [
      {
        title: "Determine Visa Type",
        content: "X1 Visa is for long-term study (>180 days). X2 Visa is for short-term study (≤180 days). X1 is a multiple-entry visa but requires a residence permit after arrival."
      },
      {
        title: "Secure University Admission",
        content: "You must first receive your official Admission Notice and the JW201/JW202 Form (Visa Application for Study in China) from your host university."
      },
      {
        title: "Gather Required Documents",
        content: "Valid Passport (>6 months validity), Admission Notice (original + copy), JW201/JW202 form (original + copy), Visa Application Form (COVA), and Physical Examination Record."
      },
      {
        title: "Submit Application",
        content: "Book an appointment at the nearest Chinese Embassy or Visa Service Center. Standard processing time is usually 4 business days."
      }
    ],
    pitfalls: [
      "Submitting photocopies without showing original documents.",
      "Passport validity less than 6 months upon arrival.",
      "Missing the 30-day deadline to convert X1 visa to a Residence Permit after entry.",
      "Incomplete physical examination stamps or missing lab results."
    ]
  };

  const downloadGuide = () => {
    const content = `
NIHAO.EDU - X1/X2 STUDENT VISA GUIDE
====================================

1. OVERVIEW
X1: >180 days | X2: <=180 days

2. REQUIRED DOCUMENTS
- Original Passport
- Admission Notice
- JW202/JW201 Form
- COVA Form
- Physical Exam Record

3. PROCESS STEPS
${visaGuide.steps.map((s, i) => `${i + 1}. ${s.title}: ${s.content}`).join('\n')}

4. COMMON PITFALLS
${visaGuide.pitfalls.map(p => `- ${p}`).join('\n')}

Disclaimer: Always check with your local embassy for the most up-to-date requirements.
    `;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `NihaoEdu_Visa_Guide.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-[#1d1d1f] tracking-tight mb-6">Student Resources.</h1>
        <p className="text-xl text-[#86868b] max-w-3xl mx-auto">
          Everything you need to know about studying in China, from top university partners to scholarship opportunities.
        </p>
      </div>

      {/* 10 Advantages */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1d1d1f] tracking-tight mb-12 text-center">10 Advantages of Studying in China.</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {[
            "Diverse cultural experience",
            "Low tuition (1/4 of UK/US/AUS)",
            "High scholarship availability",
            "Safe & convenient living",
            "English-taught majors available",
            "Cutting-edge research",
            "Global job opportunities",
            "Highly recognized diplomas",
            "International courses",
            "Customized application services"
          ].map((adv, idx) => (
            <div key={idx} className="bg-[#f5f5f7] p-8 rounded-[2rem] flex flex-col items-center text-center">
              <CheckCircle2 className="w-8 h-8 text-[#1d1d1f] mb-4" />
              <p className="font-semibold text-[#1d1d1f] text-sm">{adv}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Enrollment Details & Scholarships */}
      <div className="bg-[#f5f5f7] py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Enrollment */}
            <div>
              <div className="flex items-center gap-3 mb-10">
                <Clock className="w-8 h-8 text-[#1d1d1f]" />
                <h2 className="text-3xl md:text-4xl font-bold text-[#1d1d1f] tracking-tight">Enrollment Details.</h2>
              </div>
              <div className="space-y-6">
                <div className="p-8 bg-white rounded-[2rem] shadow-sm">
                  <h3 className="text-xl font-semibold text-[#1d1d1f] mb-2">Pre-University</h3>
                  <p className="text-[#86868b] text-sm">1 year full-time • ~20k RMB tuition • March/September intake</p>
                </div>
                <div className="p-8 bg-white rounded-[2rem] shadow-sm">
                  <h3 className="text-xl font-semibold text-[#1d1d1f] mb-2">Bachelor's Degree</h3>
                  <p className="text-[#86868b] text-sm">4 years full-time • 20k-30k RMB tuition • September intake</p>
                </div>
                <div className="p-8 bg-white rounded-[2rem] shadow-sm">
                  <h3 className="text-xl font-semibold text-[#1d1d1f] mb-2">Master's Degree</h3>
                  <p className="text-[#86868b] text-sm">2-3 years full-time • 20k-30k RMB tuition • September intake</p>
                </div>
                <div className="p-8 bg-white rounded-[2rem] shadow-sm">
                  <h3 className="text-xl font-semibold text-[#1d1d1f] mb-2">PhD Programs</h3>
                  <p className="text-[#86868b] text-sm">3 years full-time • Free tuition (typically funded) • September intake</p>
                </div>
              </div>
            </div>

            {/* Scholarships */}
            <div>
              <div className="flex items-center gap-3 mb-10">
                <Award className="w-8 h-8 text-[#1d1d1f]" />
                <h2 className="text-3xl md:text-4xl font-bold text-[#1d1d1f] tracking-tight">Scholarship Opportunities.</h2>
              </div>
              <div className="space-y-6">
                <div className="p-8 bg-white rounded-[2rem] shadow-sm">
                  <h3 className="text-xl font-semibold text-[#1d1d1f] mb-3">Chinese Government Scholarship (CSC)</h3>
                  <p className="text-[#86868b] leading-relaxed">Full or partial scholarships covering tuition, accommodation, medical insurance, and providing a monthly living stipend.</p>
                </div>
                <div className="p-8 bg-white rounded-[2rem] shadow-sm">
                  <h3 className="text-xl font-semibold text-[#1d1d1f] mb-3">Zhejiang Provincial Government Scholarship</h3>
                  <p className="text-[#86868b] leading-relaxed">Full or partial scholarships available specifically for outstanding international students accepted by universities within Zhejiang province.</p>
                </div>
                <div className="p-8 bg-white rounded-[2rem] shadow-sm">
                  <h3 className="text-xl font-semibold text-[#1d1d1f] mb-3">University Scholarships</h3>
                  <p className="text-[#86868b] leading-relaxed">Institution-specific full or partial scholarships designed to attract top global talent to their respective programs.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Downloadable Guides Section */}
      <div className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1d1d1f] tracking-tight mb-4">Essential Guides.</h2>
              <p className="text-lg text-[#86868b]">Download detailed documentation to help you navigate your journey to China.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white border-2 border-[#f5f5f7] p-10 rounded-[2.5rem] flex flex-col h-full shadow-sm"
            >
              <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-8">
                <FileText className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-[#1d1d1f] mb-4">X1/X2 Visa Guide</h3>
              <p className="text-[#86868b] leading-relaxed mb-8 flex-grow">
                A complete walkthrough of the student visa application process, including required documents and embassy tips.
              </p>
              <div className="flex gap-4">
                <button 
                  onClick={() => setActiveGuide('visa')}
                  className="flex-1 px-6 py-4 bg-[#1d1d1f] text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-colors"
                >
                  View Online
                </button>
                <button 
                  onClick={downloadGuide}
                  className="p-4 bg-[#f5f5f7] text-[#1d1d1f] rounded-xl hover:bg-gray-200 transition-colors"
                  title="Download Guide"
                >
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </motion.div>

            <div className="bg-[#f5f5f7]/50 border-2 border-dashed border-[#e2e8f0] p-10 rounded-[2.5rem] flex flex-col items-center justify-center text-center opacity-60">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-6">
                <FileText className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-[#86868b]">Arrival Handbook</h3>
              <p className="text-sm text-[#86868b] mt-2">Coming Soon (2025)</p>
            </div>

            <div className="bg-[#f5f5f7]/50 border-2 border-dashed border-[#e2e8f0] p-10 rounded-[2.5rem] flex flex-col items-center justify-center text-center opacity-60">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-6">
                <FileText className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-[#86868b]">HSK Mastery Guide</h3>
              <p className="text-sm text-[#86868b] mt-2">Coming Soon (2025)</p>
            </div>
          </div>
        </div>
      </div>

      {/* University Partners */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 border-t border-[#f5f5f7]">
        <div className="flex items-center justify-center gap-3 mb-16">
          <Building className="w-8 h-8 text-[#1d1d1f]" />
          <h2 className="text-3xl md:text-4xl font-bold text-[#1d1d1f] tracking-tight text-center">Our University Partners & Dominant Majors.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {universities.map((uni, idx) => (
            <div key={idx} className="bg-[#f5f5f7] p-8 rounded-[2rem]">
              <h3 className="text-lg font-semibold text-[#1d1d1f] mb-3">{uni.name}</h3>
              <p className="text-sm text-[#86868b] leading-relaxed"><span className="font-semibold text-[#1d1d1f]">Key Majors:</span> {uni.majors}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Visa Guide Modal */}
      <AnimatePresence>
        {activeGuide === 'visa' && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveGuide(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="p-8 md:p-12 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-[#1d1d1f]">X1/X2 Visa Success Guide</h2>
                    <p className="text-sm text-gray-500 font-medium tracking-wide font-mono">DOCUMENT ID: NE-VISA-2024-X</p>
                  </div>
                </div>
                <button 
                  onClick={() => setActiveGuide(null)}
                  className="p-3 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 md:p-12 space-y-12 bg-[#fafafa]">
                <section>
                  <div className="flex items-center gap-3 mb-8">
                    <ListChecks className="w-6 h-6 text-red-600" />
                    <h3 className="text-xl font-bold">The 4-Step Process</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {visaGuide.steps.map((step, idx) => (
                      <div key={idx} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm relative overflow-hidden group">
                        <span className="absolute -top-4 -right-4 text-8xl font-black text-gray-50 group-hover:text-red-50 transition-colors pointer-events-none">{idx + 1}</span>
                        <h4 className="text-lg font-bold mb-3 relative z-10">{step.title}</h4>
                        <p className="text-[#86868b] leading-relaxed text-sm relative z-10">{step.content}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <div className="flex items-center gap-3 mb-8">
                    <AlertCircle className="w-6 h-6 text-red-600" />
                    <h3 className="text-xl font-bold">Common Pitfalls to Avoid</h3>
                  </div>
                  <div className="bg-red-50/50 p-10 rounded-[2.5rem] border border-red-100">
                    <ul className="space-y-4">
                      {visaGuide.pitfalls.map((pitfall, idx) => (
                        <li key={idx} className="flex gap-4 items-start text-red-900/80">
                          <CheckCircle2 className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                          <span className="font-medium">{pitfall}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>

                <div className="p-10 bg-[#1d1d1f] rounded-[2.5rem] text-center">
                  <h3 className="text-2xl font-bold text-white mb-4">Ready to Apply?</h3>
                  <p className="text-white/70 mb-8 max-w-lg mx-auto leading-relaxed">
                    Our team provides personalized document review services for all our students to ensure a 100% visa success rate.
                  </p>
                  <button 
                    onClick={downloadGuide}
                    className="inline-flex py-4 px-8 bg-red-600 text-white rounded-2xl font-bold text-sm tracking-wide uppercase hover:bg-red-700 transition-all items-center gap-3 group"
                  >
                    Download Guide PDF
                    <Download className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                  </button>
                </div>
              </div>

              <div className="p-8 bg-white border-t border-gray-100 text-center flex items-center justify-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
                <span>Property of Nihao Education Global Consultancy</span>
                <span className="w-1 h-1 bg-gray-200 rounded-full mx-2"></span>
                <span>Version 4.2.0</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

