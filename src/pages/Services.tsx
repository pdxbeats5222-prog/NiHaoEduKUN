import { motion } from 'motion/react';
import { BookOpen, FileText, PlaneLanding, Map, GraduationCap, ShieldCheck, Home as HomeIcon, Smartphone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function Services() {
  const { t } = useTranslation();
  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-[#1d1d1f] tracking-tight mb-6">{t('Our Services.')}</h1>
        <p className="text-xl text-[#86868b] max-w-3xl mx-auto">
          {t('Services Hero Subtitle')}
        </p>
      </div>

      {/* Academic & Application Services */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1d1d1f] tracking-tight mb-12 text-center">{t('Academic & Application Services.')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#f5f5f7] p-10 rounded-[2rem]">
            <BookOpen className="w-12 h-12 text-[#1d1d1f] mb-6" />
            <h3 className="text-2xl font-semibold text-[#1d1d1f] mb-4">{t('Language Training')}</h3>
            <p className="text-[#86868b] leading-relaxed">
              {t('Language Training Desc')}
            </p>
          </div>
          <div className="bg-[#f5f5f7] p-10 rounded-[2rem]">
            <GraduationCap className="w-12 h-12 text-[#1d1d1f] mb-6" />
            <h3 className="text-2xl font-semibold text-[#1d1d1f] mb-4">{t('University Selection')}</h3>
            <p className="text-[#86868b] leading-relaxed">
              {t('University Selection Desc')}
            </p>
          </div>
          <div className="bg-[#f5f5f7] p-10 rounded-[2rem]">
            <ShieldCheck className="w-12 h-12 text-[#1d1d1f] mb-6" />
            <h3 className="text-2xl font-semibold text-[#1d1d1f] mb-4">{t('Scholarship Guidance')}</h3>
            <p className="text-[#86868b] leading-relaxed">
              {t('Scholarship Guidance Desc')}
            </p>
          </div>
          <div className="bg-[#f5f5f7] p-10 rounded-[2rem]">
            <FileText className="w-12 h-12 text-[#1d1d1f] mb-6" />
            <h3 className="text-2xl font-semibold text-[#1d1d1f] mb-4">{t('Logistics & Visas')}</h3>
            <p className="text-[#86868b] leading-relaxed">
              {t('Logistics & Visas Desc')}
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
              {t('48-Hour Landing Support')}
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">{t('On-Ground Integration.')}</h2>
            <p className="text-xl text-[#5a5a5c] max-w-3xl mx-auto leading-relaxed">
              {t('On-Ground Desc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <PlaneLanding className="w-10 h-10" />,
                title: t("Arrival Services"),
                desc: t("Arrival Services Desc")
              },
              {
                icon: <Smartphone className="w-10 h-10" />,
                title: t("Digital Setup"),
                desc: t("Digital Setup Desc")
              },
              {
                icon: <HomeIcon className="w-10 h-10" />,
                title: t("Ongoing Support"),
                desc: t("Ongoing Support Desc")
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
            <h2 className="text-3xl md:text-4xl font-bold text-[#1d1d1f] tracking-tight mb-6">{t('Pathway Programmes.')}</h2>
            <p className="text-lg text-[#86868b] mb-8">
              {t('Pathway Desc')}
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-6 p-6 bg-[#f5f5f7] rounded-[1.5rem]">
                <div className="bg-white p-4 rounded-xl text-[#1d1d1f] font-bold text-xl shadow-sm">1+3</div>
                <div>
                  <h4 className="font-semibold text-[#1d1d1f] text-lg mb-1">{t('1+3 Programme')}</h4>
                  <p className="text-[#86868b]">{t('1+3 Desc')}</p>
                </div>
              </li>
              <li className="flex items-start gap-6 p-6 bg-[#f5f5f7] rounded-[1.5rem]">
                <div className="bg-white p-4 rounded-xl text-[#1d1d1f] font-bold text-xl shadow-sm">1+4</div>
                <div>
                  <h4 className="font-semibold text-[#1d1d1f] text-lg mb-1">{t('1+4 Programme')}</h4>
                  <p className="text-[#86868b]">{t('1+4 Desc')}</p>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1d1d1f] tracking-tight mb-6">{t('Summer Cultural Immersion Tours.')}</h2>
            <p className="text-lg text-[#86868b] mb-8">
              {t('Summer Immersion Desc')}
            </p>
            <div className="space-y-6">
              <div className="bg-[#f5f5f7] p-8 rounded-[1.5rem]">
                <div className="flex items-center gap-3 mb-4">
                  <Map className="w-6 h-6 text-[#1d1d1f]" />
                  <h4 className="font-semibold text-[#1d1d1f] text-lg">{t('Hangzhou (10 Days)')}</h4>
                </div>
                <p className="text-[#86868b] leading-relaxed">
                  {t('Hangzhou Tour Desc')}
                </p>
              </div>
              <div className="bg-[#f5f5f7] p-8 rounded-[1.5rem]">
                <div className="flex items-center gap-3 mb-4">
                  <Map className="w-6 h-6 text-[#1d1d1f]" />
                  <h4 className="font-semibold text-[#1d1d1f] text-lg">{t('Shanghai (2 Days)')}</h4>
                </div>
                <p className="text-[#86868b] leading-relaxed">
                  {t('Shanghai Tour Desc')}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 text-center">
          <Link 
            to="/contact" 
            className="inline-flex items-center justify-center bg-[#0071e3] text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-[#0077ed] transition-colors"
          >
            {t('Get Your Place')}
          </Link>
        </div>
      </div>

    </div>
  );
}
