import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, FileText, PlaneLanding, Map, GraduationCap, ShieldCheck, Home as HomeIcon, Smartphone, HelpCircle, AlertCircle, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { visaFaqsEn, visaFaqsZh } from '../constants/visaFaq';
import VisaChecklist from '../components/VisaChecklist';

export default function Services() {
  const { t, i18n } = useTranslation();
  const [openId, setOpenId] = useState<string | null>(null);

  const currentLang = i18n.language || 'en';
  const faqs = currentLang.startsWith('zh') ? visaFaqsZh : visaFaqsEn;

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
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

        {/* Visa document checklist tool */}
        <div className="my-24 max-w-5xl mx-auto">
          <VisaChecklist />
        </div>

        {/* Visa FAQ Accordion Section */}
        <div className="mt-20 border-t border-gray-100 pt-24">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-amber-50 text-amber-700 rounded-full text-sm font-semibold tracking-wide uppercase mb-4">
              {currentLang.startsWith('zh') ? '学生签证痛点与指南' : 'Student Visa & Pain Points'}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#1d1d1f] mb-6">
              {currentLang.startsWith('zh') ? 'X1/X2 签证申请指南与核心雷区' : 'X1/X2 Student Visa Guide & Essential Traps'}
            </h2>
            <p className="text-lg text-[#86868b] max-w-3xl mx-auto">
              {currentLang.startsWith('zh') 
                ? '我们总结了成百上千位留学生在体检表盖章、JW202表延迟及入境30天倒计时中遭遇的最真实问题，助你一次过签。' 
                : 'Key documentation requirements, embassy pitfalls, and critical post-arrival timelines decoded by our on-ground academic team.'}
            </p>
          </div>

          <div className="space-y-12 max-w-4xl mx-auto">
            {faqs.map((category, catIdx) => (
              <div key={catIdx} className="space-y-4">
                <h3 className="text-xl font-bold text-[#1d1d1f] tracking-tight border-b border-gray-200/60 pb-3 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                  {category.title}
                </h3>
                <div className="space-y-4">
                  {category.items.map((item, itemIdx) => {
                    const id = `${catIdx}-${itemIdx}`;
                    const isOpen = openId === id;
                    return (
                      <div 
                        key={itemIdx} 
                        className={`bg-[#f5f5f7]/50 rounded-[1.5rem] border transition-all duration-300 overflow-hidden ${
                          isOpen ? 'border-amber-500/30 bg-amber-50/5 shadow-[0_12px_24px_rgba(245,158,11,0.03)]' : 'border-gray-100 hover:border-gray-200 shadow-sm'
                        }`}
                      >
                        <button
                          onClick={() => setOpenId(isOpen ? null : id)}
                          className="w-full text-left p-6 md:p-8 flex justify-between items-start gap-4 cursor-pointer focus:outline-none"
                        >
                          <div className="flex items-start gap-4">
                            <HelpCircle className={`w-6 h-6 mt-0.5 shrink-0 transition-colors ${isOpen ? 'text-amber-500' : 'text-[#86868b]'}`} />
                            <h4 className="text-lg md:text-xl font-semibold text-[#1d1d1f] leading-snug">
                              {item.question}
                            </h4>
                          </div>
                          <div className={`mt-0.5 w-8 h-8 rounded-full bg-white border border-gray-100 flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-amber-50 text-amber-600 border-amber-200/50' : 'text-[#1d1d1f]'}`}>
                            <ChevronDown className="w-5 h-5" />
                          </div>
                        </button>

                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: 'easeInOut' }}
                            >
                              <div className="px-6 pb-6 md:px-8 md:pb-8 pt-0 text-[#5a5a5c] leading-relaxed text-base space-y-4">
                                <p className="text-gray-700">{item.answer}</p>
                                {item.bullets && item.bullets.length > 0 && (
                                  <ul className="space-y-3 list-disc pl-5 mt-2 marker:text-amber-500 text-[#5a5a5c]">
                                    {item.bullets.map((bullet, bulletIdx) => {
                                      const parts = bullet.split(':');
                                      if (parts.length > 1) {
                                        return (
                                          <li key={bulletIdx} className="text-sm md:text-base">
                                            <strong className="text-gray-900">{parts[0]}:</strong>{parts.slice(1).join(':')}
                                          </li>
                                        );
                                      }
                                      return <li key={bulletIdx} className="text-sm md:text-base">{bullet}</li>;
                                    })}
                                  </ul>
                                )}
                                {item.painPoint && (
                                  <div className="mt-4 p-4 md:p-5 bg-amber-50/60 rounded-[1rem] border border-amber-100 flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                                    <div>
                                      <span className="font-bold uppercase tracking-wider text-[11px] block text-amber-700 mb-1">
                                        {currentLang.startsWith('zh') ? '高危痛点 / 雷区提醒' : 'CRITICAL PAIN POINT / EMBASSY TRAP'}
                                      </span>
                                      <p className="text-sm leading-relaxed text-amber-800 font-medium">{item.painPoint}</p>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-24 text-center">
          <Link 
            to="/contact" 
            className="inline-flex items-center justify-center bg-[#0071e3] text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-[#0077ed] transition-colors shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {t('Get Your Place')}
          </Link>
        </div>
      </div>

    </div>
  );
}
