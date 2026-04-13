import { motion } from 'motion/react';
import { BookOpen, FileText, PlaneLanding, Map, GraduationCap, ShieldCheck, Home as HomeIcon, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Services() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-[#1d1d1f] tracking-tight mb-6">Our Services.</h1>
        <p className="text-xl text-[#86868b] max-w-3xl mx-auto">
          From your first HSK lesson to setting up your digital life in Hangzhou, we provide end-to-end support for your educational journey in China.
        </p>
      </div>

      {/* Academic & Application Services */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1d1d1f] tracking-tight mb-12 text-center">Academic & Application Services.</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#f5f5f7] p-10 rounded-[2rem]">
            <BookOpen className="w-12 h-12 text-[#1d1d1f] mb-6" />
            <h3 className="text-2xl font-semibold text-[#1d1d1f] mb-4">Language Training</h3>
            <p className="text-[#86868b] leading-relaxed">
              Intensive HSK Levels 1 through 6 preparation for all fluency levels. Whether you're starting from scratch or aiming for academic proficiency, our expert tutors guide you.
            </p>
          </div>
          <div className="bg-[#f5f5f7] p-10 rounded-[2rem]">
            <GraduationCap className="w-12 h-12 text-[#1d1d1f] mb-6" />
            <h3 className="text-2xl font-semibold text-[#1d1d1f] mb-4">University Selection</h3>
            <p className="text-[#86868b] leading-relaxed">
              Expert counselling tailored to your career goals. We specialize in placements for Engineering, MBBS (Medicine), and Business programs across top Chinese universities.
            </p>
          </div>
          <div className="bg-[#f5f5f7] p-10 rounded-[2rem]">
            <ShieldCheck className="w-12 h-12 text-[#1d1d1f] mb-6" />
            <h3 className="text-2xl font-semibold text-[#1d1d1f] mb-4">Scholarship Guidance</h3>
            <p className="text-[#86868b] leading-relaxed">
              Maximize your funding. We provide comprehensive support for Chinese Government Scholarships (CSC) and Provincial scholarships, including document preparation and essay coaching.
            </p>
          </div>
          <div className="bg-[#f5f5f7] p-10 rounded-[2rem]">
            <FileText className="w-12 h-12 text-[#1d1d1f] mb-6" />
            <h3 className="text-2xl font-semibold text-[#1d1d1f] mb-4">Logistics & Visas</h3>
            <p className="text-[#86868b] leading-relaxed">
              Full application management. We handle JW202/JW201 processing, X1/X2 Visa preparation, and provide specialized visa interview coaching to ensure approval.
            </p>
          </div>
        </div>
      </div>

      {/* On-Ground Integration */}
      <div className="bg-[#faf9f6] py-32 text-[#1d1d1f] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #8b0000 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 bg-red-50 text-red-600 rounded-full text-sm font-semibold tracking-wide uppercase mb-4"
            >
              48-Hour Landing Support
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">On-Ground Integration.</h2>
            <p className="text-xl text-[#5a5a5c] max-w-3xl mx-auto leading-relaxed">
              Our job doesn't end when you get your visa. We ensure you are fully set up and comfortable within your first 48 hours in China.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <PlaneLanding className="w-10 h-10" />,
                title: "Arrival Services",
                desc: "Personalized airport greeting and pickup directly at Hangzhou Xiaoshan International Airport (HGH)."
              },
              {
                icon: <Smartphone className="w-10 h-10" />,
                title: "Digital Setup",
                desc: "Immediate assistance with local SIM cards, bank accounts, and activating mobile payments (Alipay & WeChat Pay)."
              },
              {
                icon: <HomeIcon className="w-10 h-10" />,
                title: "Ongoing Support",
                desc: "Vetted dormitory/apartment sourcing, Ping An medical insurance enrollment, and senior alumni mentorship."
              }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="group bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-[#f5f5f7] rounded-2xl flex items-center justify-center text-[#1d1d1f] mb-8 group-hover:bg-red-600 group-hover:text-white transition-colors duration-500">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
                <p className="text-[#86868b] leading-relaxed text-lg">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Pathway Programmes & Summer Camps */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1d1d1f] tracking-tight mb-6">Pathway Programmes.</h2>
            <p className="text-lg text-[#86868b] mb-8">
              Not quite ready for a full degree in Chinese? We offer structured academic bridges designed to get you there.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-6 p-6 bg-[#f5f5f7] rounded-[1.5rem]">
                <div className="bg-white p-4 rounded-xl text-[#1d1d1f] font-bold text-xl shadow-sm">1+3</div>
                <div>
                  <h4 className="font-semibold text-[#1d1d1f] text-lg mb-1">1+3 Programme</h4>
                  <p className="text-[#86868b]">One year of intensive language/foundation followed by a 3-year degree.</p>
                </div>
              </li>
              <li className="flex items-start gap-6 p-6 bg-[#f5f5f7] rounded-[1.5rem]">
                <div className="bg-white p-4 rounded-xl text-[#1d1d1f] font-bold text-xl shadow-sm">1+4</div>
                <div>
                  <h4 className="font-semibold text-[#1d1d1f] text-lg mb-1">1+4 Programme</h4>
                  <p className="text-[#86868b]">One year of intensive language/foundation followed by a standard 4-year Bachelor's degree.</p>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1d1d1f] tracking-tight mb-6">Summer Cultural Immersion Tours.</h2>
            <p className="text-lg text-[#86868b] mb-8">
              Experience China before committing. Our short-term tours blend Mandarin learning with unforgettable cultural discovery.
            </p>
            <div className="space-y-6">
              <div className="bg-[#f5f5f7] p-8 rounded-[1.5rem]">
                <div className="flex items-center gap-3 mb-4">
                  <Map className="w-6 h-6 text-[#1d1d1f]" />
                  <h4 className="font-semibold text-[#1d1d1f] text-lg">Hangzhou (10 Days)</h4>
                </div>
                <p className="text-[#86868b] leading-relaxed">
                  Includes West Lake boat tours, Chinese martial arts, Longjing tea tasting, calligraphy, traditional festivals (Qixi), cooking classes, and local student exchanges.
                </p>
              </div>
              <div className="bg-[#f5f5f7] p-8 rounded-[1.5rem]">
                <div className="flex items-center gap-3 mb-4">
                  <Map className="w-6 h-6 text-[#1d1d1f]" />
                  <h4 className="font-semibold text-[#1d1d1f] text-lg">Shanghai (2 Days)</h4>
                </div>
                <p className="text-[#86868b] leading-relaxed">
                  Visits to The Bund, Oriental Pearl Tower, Shanghai Museum, traditional gardens, and tasting local snacks like authentic Xiaolongbao.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 text-center">
          <Link to="/contact" className="inline-flex items-center justify-center bg-[#0071e3] text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-[#0077ed] transition-colors">
            Get Your Place
          </Link>
        </div>
      </div>
    </div>
  );
}
