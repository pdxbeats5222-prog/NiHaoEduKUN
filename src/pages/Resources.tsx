import { motion } from 'motion/react';
import { CheckCircle2, Award, Building, Clock } from 'lucide-react';

export default function Resources() {
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

      {/* University Partners */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
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

    </div>
  );
}
