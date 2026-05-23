import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Play, BookOpen, Globe2, Briefcase, CheckCircle2, Star, Download, Instagram, Youtube, Info, HelpCircle, Volume2, VolumeX } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { WHATSAPP_LINK } from '../constants';
import Deadlines from '../components/Deadlines';
import UniversityMap from '../components/UniversityMap';

export default function Home() {
  const { t } = useTranslation();
  const [isMuted, setIsMuted] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (iframeRef.current && iframeRef.current.contentWindow) {
      const func = nextMuted ? 'mute' : 'unMute';
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func }),
        '*'
      );
    }
  };


  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Nihao.edu",
    "url": "https://nihaoedu.org/",
    "logo": "https://lh3.googleusercontent.com/u/0/d/1mOhv5T049YvaZY11iRie6C5Yxuk0XQC2",
    "description": "Nihao.edu is a premier educational consultancy specializing in helping international students study in China with expert admissions, scholarship (CSC), and visa (X1/X2) assistance.",
    "sameAs": [
      "https://www.instagram.com/nihao_edu_kun",
      "https://youtube.com/@kun-nihao.educhina"
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Can I study in China in English?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, many top-tier Chinese universities offer a wide range of English-taught programs for Bachelor's, Master's, and PhD degrees. Popular fields include Business, Engineering, Medicine (MBBS), and Computer Science."
        }
      },
      {
        "@type": "Question",
        "name": "How do I apply for the Chinese Government Scholarship (CSC)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Applying for the Chinese Government Scholarship (CSC) typically involves registering on the China Scholarship Council website, selecting target universities, and submitting required documents early (usually between January and April). Nihao.edu provides expert guidance to maximize your chances of securing full funding."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between X1 and X2 student visas?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The X1 visa is for long-term study (more than 180 days) and must be converted into a Residence Permit within 30 days of arrival. The X2 visa is for shorter studies (up to 180 days). Both require a valid JW202/JW201 form and an admission letter."
        }
      },
      {
        "@type": "Question",
        "name": "Are degrees from Chinese universities recognized globally?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, degrees from accredited Chinese universities are globally recognized. China has mutual recognition agreements with many countries, and top universities like Tsinghua, Fudan, and Zhejiang U rank highly in QS world rankings."
        }
      },
      {
        "@type": "Question",
        "name": "What is the average cost of living for international students in China?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "International students can expect to spend between $300 to $700 USD per month depending on the city. Cities like Shanghai and Beijing are more expensive, while Hangzhou, Nanjing, and inland cities offer a very high quality of life at a lower cost."
        }
      }
    ]
  };

  return (
    <div className="w-full">
      <Helmet>
        <title>{t('Meta Title Home')}</title>
        <meta name="description" content={t('Meta Description Home')} />
        <meta name="keywords" content={t('Meta Keywords Home')} />
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>
      {/* Section 1: The Hero Area */}
      <section className="relative pt-32 pb-20 flex flex-col items-center justify-center overflow-hidden bg-[#faf9f6]">
        {/* Subtle background glow effects - Chinese Aesthetic (Crimson/Gold) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-red-500/10 to-transparent blur-3xl rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-amber-500/10 to-transparent blur-3xl rounded-full pointer-events-none" />
        {/* Subtle Cloud/Wave Motif Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #8b0000 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
              <span className="bg-gradient-to-r from-red-600 via-red-500 to-amber-500 bg-clip-text text-transparent drop-shadow-sm">{t('Study in China.')}</span> <br className="hidden md:block" />
              <span className="text-[#1d1d1f]">{t('Brilliantly simple.')}</span>
            </h1>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-[#5a5a5c] mb-10 max-w-3xl mx-auto font-normal"
          >
            {t('Hero Subtitle')}
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link 
              to="/contact" 
              className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-red-500 text-white px-10 py-4 rounded-full font-semibold text-lg shadow-[0_8px_24px_rgba(220,38,38,0.3)] hover:shadow-[0_12px_32px_rgba(220,38,38,0.4)] hover:scale-105 transition-all duration-300 flex items-center justify-center"
            >
              {t('Get Your Place')}
            </Link>
            <motion.div
              animate={{ 
                boxShadow: ["0 0 0 0 rgba(249, 115, 22, 0.4)", "0 0 0 15px rgba(249, 115, 22, 0)"],
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeOut" 
              }}
              className="w-full sm:w-auto rounded-full"
            >
              <Link 
                to="/about" 
                state={{ unmute: true }}
                className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-amber-500 text-white border border-orange-400 px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-orange-500/20 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
              >
                {t('Watch About Us')} <Play className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
         </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-16 max-w-6xl mx-auto w-full px-4 relative z-10"
        >
          <div className="relative w-full aspect-video rounded-[2rem] overflow-hidden bg-black shadow-[0_20px_60px_rgba(0,0,0,0.1)]">
            <iframe
              ref={iframeRef}
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/wiFe6UH6A9E?autoplay=1&mute=1&loop=1&playlist=wiFe6UH6A9E&controls=0&playsinline=1&rel=0&enablejsapi=1&vq=hd1080"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-1/2 left-1/2 w-[101%] h-[101%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{border: 'none', display: 'block'}}
            />

            {/* Custom Sound Toggle Overlay HUD */}
            <div className="absolute bottom-6 right-6 z-30">
              <button 
                onClick={handleToggleMute}
                className="bg-black/60 hover:bg-black/80 backdrop-blur-xl p-4 rounded-full border border-white/20 transition-all active:scale-95 group shadow-lg flex items-center justify-center cursor-pointer shadow-black/40"
                aria-label={isMuted ? "Unmute video" : "Mute video"}
              >
                <motion.div
                  key={isMuted ? 'muted' : 'unmuted'}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2"
                >
                  {isMuted ? (
                    <>
                      <VolumeX className="w-5 h-5 text-white" />
                      <span className="text-white text-xs font-bold pr-1 select-none">{t('Click to Unmute')}</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-5 h-5 text-white" />
                      <span className="text-white text-xs font-bold pr-1 select-none">{t('Mute')}</span>
                    </>
                  )}
                </motion.div>
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Section 2: The "Why China? Why Now?" Value Prop */}
      <section className="py-32 bg-[#faf9f6] relative overflow-hidden">
        {/* Subtle background motif */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #047857 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1d1d1f] tracking-tight mb-4">
              {t('Why China? Why Now?')}
            </h2>
            <p className="text-xl text-[#5a5a5c] max-w-2xl mx-auto">
              {t('Why China Subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <BookOpen className="w-10 h-10 text-red-600" />,
                title: t("World-Class Education."),
                desc: t("World-Class Education Desc")
              },
              {
                icon: <Globe2 className="w-10 h-10 text-emerald-600" />,
                title: t("Cultural Immersion."),
                desc: t("Cultural Immersion Desc")
              },
              {
                icon: <Briefcase className="w-10 h-10 text-amber-500" />,
                title: t("Unmatched Career Edge."),
                desc: t("Unmatched Career Edge Desc")
              }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="bg-white/60 backdrop-blur-xl border border-white/50 shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-10 rounded-[2rem] group hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-1"
              >
                <div className="mb-8 p-4 bg-white/80 rounded-2xl inline-block shadow-sm">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-semibold text-[#1d1d1f] mb-3">{item.title}</h3>
                <p className="text-[#5a5a5c] text-lg leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Authority & Trust Building (The Founder's Edge) */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-gradient-to-l from-red-500/5 to-transparent blur-3xl rounded-full pointer-events-none -translate-y-1/2" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-red-600 to-amber-500 rounded-[2rem] transform translate-x-4 translate-y-4 opacity-20 blur-lg"></div>
              {/* Founder Image */}
              <img 
                src="https://lh3.googleusercontent.com/u/0/d/1C9LsBi5uVae6ZYm46Vl_1fuFPUPI5kjz" 
                alt="Shiqi - Founder" 
                referrerPolicy="no-referrer"
                className="rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] w-full object-cover h-[600px] relative z-10 border border-white/50"
              />
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-4xl md:text-5xl font-bold text-[#1d1d1f] tracking-tight mb-6">
                {t('Meet Shiqi.')} <br />
                <span className="bg-gradient-to-r from-red-600 to-amber-500 bg-clip-text text-transparent">{t('Founder & Insider Guide.')}</span>
              </h2>
              <div className="space-y-6 text-xl text-[#5a5a5c] font-light leading-relaxed">
                <p>
                  {t('Meet Shiqi Para 1')}
                </p>
                <p>
                  {t('Meet Shiqi Para 2')}
                </p>
                <p>
                  {t('Meet Shiqi Para 3')}
                </p>
              </div>
              <div className="mt-10">
                <Link to="/about" className="text-red-600 font-medium text-lg flex items-center gap-2 hover:text-red-700 transition-colors group">
                  {t('Read my full story')} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>      {/* NEW SECTION: The Nihao Advantage */}
      <section className="py-32 bg-white text-[#1d1d1f] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-red-100 to-transparent blur-3xl rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-tl from-amber-100 to-transparent blur-3xl rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              {t('Why Choose')} <span className="bg-gradient-to-r from-red-600 to-amber-500 bg-clip-text text-transparent">Nihao.edu?</span>
            </h2>
            <p className="text-xl text-[#5a5a5c] max-w-2xl mx-auto">
              {t('Why Choose Subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: t("Local HQ in Hangzhou"),
                desc: t("Local HQ Desc")
              },
              {
                title: t("Direct University Ties"),
                desc: t("Direct University Ties Desc")
              },
              {
                title: t("Alumni-Led Support"),
                desc: t("Alumni-Led Support Desc")
              },
              {
                title: t("End-to-End Care"),
                desc: t("End-to-End Care Desc")
              }
            ].map((advantage, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-[#faf9f6] border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-8 rounded-[2rem] hover:shadow-[0_20px_40_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-amber-500 rounded-full flex items-center justify-center mb-6 text-xl font-bold text-white shadow-md">
                  {idx + 1}
                </div>
                <h3 className="text-2xl font-semibold mb-3">{advantage.title}</h3>
                <p className="text-[#5a5a5c] leading-relaxed">{advantage.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW SECTION: Study Programs */}
      <section className="py-32 bg-[#faf9f6] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1d1d1f] tracking-tight mb-4">{t('Study Programs.')}</h2>
            <p className="text-xl text-[#5a5a5c] max-w-2xl mx-auto">
              {t('Study Programs Subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: t("Chinese Language"),
                subtitle: t("Full Immersion"),
                desc: t("Chinese Language Desc Short"),
                color: "from-blue-500 to-cyan-400"
              },
              {
                title: t("Bachelor's"),
                subtitle: t("Undergraduate"),
                desc: t("Bachelor's Desc Short"),
                color: "from-red-600 to-orange-500"
              },
              {
                title: t("Master's"),
                subtitle: t("Postgraduate"),
                desc: t("Master's Desc Short"),
                color: "from-purple-600 to-indigo-500"
              },
              {
                title: t("PhD"),
                subtitle: t("Doctoral Research"),
                desc: t("PhD Desc Short"),
                color: "from-emerald-600 to-teal-500"
              }
            ].map((program, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-12 h-1.5 rounded-full bg-gradient-to-r ${program.color} mb-6`} />
                <span className="text-xs font-black uppercase tracking-widest text-[#86868b] mb-2 block">{program.subtitle}</span>
                <h3 className="text-2xl font-bold text-[#1d1d1f] mb-4">{program.title}</h3>
                <p className="text-[#5a5a5c] leading-relaxed mb-6">{program.desc}</p>
                <Link to="/contact" className="inline-flex items-center gap-2 text-[#1d1d1f] font-bold group-hover:text-red-600 transition-colors">
                  {t('Apply Now')} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Our Services (How We Help) */}
      <section id="services" className="py-32 bg-[#faf9f6] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-emerald-400/10 to-transparent blur-3xl rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1d1d1f] tracking-tight mb-4">{t('Our Professional Study in China Services')}</h2>
            <p className="text-xl text-[#5a5a5c] max-w-2xl mx-auto">
              {t('Professional Services Subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: t("English-Taught University Admissions"),
                desc: t("English-Taught Admissions Desc"),
                features: [t("University shortlisting"), t("Personal statement reviews"), t("Direct application management")]
              },
              {
                title: t("Scholarship Application Guidance (CSC)"),
                desc: t("Scholarship Guidance Desc Home"),
                features: [t("CSC portal registration"), t("Research proposal editing"), t("Document checklist verification")]
              },
              {
                title: t("X1/X2 Student Visa Assistance"),
                desc: t("Visa Assistance Desc Home"),
                features: [t("Visa interview training"), t("Authentication of documents"), t("Health certificate guidance")]
              }
            ].map((service, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-white/60 backdrop-blur-xl border border-white/50 shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-10 rounded-[2rem] flex flex-col hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500"
              >
                <h3 className="text-2xl font-semibold text-[#1d1d1f] mb-4">{service.title}</h3>
                <p className="text-[#5a5a5c] text-lg mb-8 flex-grow">{service.desc}</p>
                <ul className="space-y-4 mb-10">
                  {service.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3 text-[#1d1d1f]">
                      <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                      <span className="text-lg">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/services" className="text-red-600 font-medium text-lg flex items-center gap-2 hover:text-red-700 transition-colors mt-auto">
                  Learn more <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO PILLAR SECTION: THE ULTIMATE GUIDE */}
      <section id="guide" className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="prose prose-lg prose-red max-w-none">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1d1d1f] tracking-tight mb-8">The Ultimate Guide to Study in China (2026 Edition)</h2>
            
            <p className="text-xl text-[#5a5a5c] leading-relaxed mb-8">
              Deciding to <strong>study in China</strong> is more than just an academic choice; it's a strategic investment in your future. As the world's second-largest economy, China offers international students a unique blend of high-tech innovation, historical depth, and unparalleled career opportunities. Whether you're aiming for a top-tier Engineering degree or a Master's in International Business, China's higher education system is designed to produce global leaders.
            </p>

            <h3 className="text-2xl font-bold text-[#1d1d1f] mt-12 mb-4">Why International Students Choose China</h3>
            <p className="text-[#5a5a5c] mb-6">
              In the last decade, China has tripled its efforts to attract global talent. Universities like Tsinghua, Peking, and Zhejiang University now consistently rank within the top 50 globally. The infrastructure is world-class, but the real draw is the ecosystem: a front-row seat to the future of AI, renewable energy, and digital commerce. Furthermore, the <strong>Study in China in English</strong> options have expanded significantly, making it accessible to those who are still mastering Mandarin.
            </p>

            <h3 className="text-2xl font-bold text-[#1d1d1f] mt-12 mb-4">Top-Ranked English-Taught Programs</h3>
            <p className="text-[#5a5a5c] mb-6">
              For many, the language barrier is a major concern. However, many designated \"Double First-Class\" universities offer <strong>English-taught programs</strong> across a variety of disciplines. From <strong>MBBS in China</strong> (Medicine) to MBA programs in Shanghai, you can receive a world-class education while taking Mandarin (HSK) elective courses to build your language skills on the side.
            </p>

            <h3 className="text-2xl font-bold text-[#1d1d1f] mt-12 mb-4">Living in China's Academic Hubs: Shanghai & Hangzhou</h3>
            <p className="text-[#5a5a5c] mb-6">
              Where you study is just as important as what you study. <strong>Shanghai</strong> remains the international student favorite—a hyper-modern metropolis that never sleeps. Meanwhile, <strong>Hangzhou</strong> (home to Nihao.edu HQ) offers a more balanced lifestyle, combining the tech headquarters of Alibaba with the serene beauty of the UNESCO World Heritage West Lake. Both cities are incredibly safe, hyper-connected via high-speed rail, and completely cashless through platforms like WeChat Pay.
            </p>

            <h3 className="text-2xl font-bold text-[#1d1d1f] mt-12 mb-4">Securing the Chinese Government Scholarship (CSC)</h3>
            <p className="text-[#5a5a5c] mb-6">
              Financial support is a cornerstone of the Chinese education strategy. The <strong>Chinese Government Scholarship application</strong> (CSC) is one of the most generous in the world, often covering full tuition, free on-campus housing, and a monthly living stipend. Managing this application requires precision: you must align your research proposal with the university's strengths and ensure your documentation is authenticated correctly.
            </p>

            <h3 className="text-2xl font-bold text-[#1d1d1f] mt-12 mb-4">The Application Timeline: How to Prepare</h3>
            <div className="bg-[#faf9f6] p-8 rounded-3xl border border-gray-100 my-8">
              <ol className="space-y-4 text-[#5a5a5c]">
                <li><strong>Phase 1 (Sept - Dec):</strong> Research universities and programs. Prepare your academic transcripts and English proficiency scores (IELTS/TOEFL).</li>
                <li><strong>Phase 2 (Jan - March):</strong> Submit your <strong>Apply to Chinese universities</strong> applications and scholarship requests.</li>
                <li><strong>Phase 3 (April - June):</strong> Receive your Admission Letter and JW202/JW201 visa documents.</li>
                <li><strong>Phase 4 (July - Aug):</strong> Apply for your <strong>China student visa X1</strong> at the nearest consulate.</li>
                <li><strong>Phase 5 (Sept):</strong> Move to China, register at the university, and convert your visa to a Residence Permit.</li>
              </ol>
            </div>

            <h3 className="text-2xl font-bold text-[#1d1d1f] mt-12 mb-4">Navigating the China Student Visa X1 Process</h3>
            <p className="text-[#5a5a5c] mb-12">
              The <strong>China student visa X1</strong> is for students planning to stay for more than 180 days. It is critical to note that once you arrive in China, you have exactly 30 days to apply for a Residence Permit at the local Exit and Entry Administration. Failure to do so can lead to fines. At Nihao.edu, we provide the 1-on-1 guidance needed to ensure your documentation is compliant with local regulations.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-32 bg-[#faf9f6] relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block p-3 bg-red-100 rounded-2xl mb-4">
              <HelpCircle className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-4xl font-bold text-[#1d1d1f] tracking-tight">{t('Frequently Asked Questions')}</h2>
          </div>

          <div className="space-y-6">
            {[
              {
                q: t("FAQ Q1"),
                a: t("FAQ A1")
              },
              {
                q: t("FAQ Q2"),
                a: t("FAQ A2")
              },
              {
                q: t("FAQ Q3"),
                a: t("FAQ A3")
              },
              {
                q: t("FAQ Q4"),
                a: t("FAQ A4")
              },
              {
                q: t("FAQ Q5"),
                a: t("FAQ A5")
              }
            ].map((faq, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm"
              >
                <h3 className="text-xl font-bold text-[#1d1d1f] mb-3">{faq.q}</h3>
                <p className="text-[#5a5a5c] leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Real Student Life in China */}
      <section id="vlogs" className="py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #b91c1c 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="max-w-2xl">
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-block px-4 py-1.5 bg-red-50 text-red-600 rounded-full text-sm font-semibold tracking-wide uppercase mb-4"
              >
                {t('The Experience')}
              </motion.span>
              <h2 className="text-5xl md:text-7xl font-bold text-[#1d1d1f] tracking-tight leading-[0.9] mb-6">
                {t('Life in')} <span className="text-red-600 italic font-serif">{t('China.')}</span>
              </h2>
              <p className="text-xl text-[#5a5a5c] leading-relaxed mb-8">
                {t('Student Life Subtitle Home')}
              </p>
              <div className="flex flex-wrap gap-4">
                <motion.a 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://youtube.com/@kun-nihao.educhina?si=oMPCkGSo6v-jM75G"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-full font-bold shadow-lg shadow-red-200 hover:bg-red-700 transition-colors"
                >
                  <Youtube className="w-5 h-5" />
                  {t('Watch Us on YouTube')}
                </motion.a>
                <motion.a 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://www.instagram.com/nihao_edu_kun?igsh=enZzajQxZ3A1d3F5&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-[#1d1d1f] text-[#1d1d1f] rounded-full font-bold hover:bg-[#1d1d1f] hover:text-white transition-all"
                >
                  <Instagram className="w-5 h-5" />
                  {t('Follow Us on Instagram')}
                </motion.a>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-right">
                <div className="text-3xl font-bold text-[#1d1d1f]">500+</div>
                <div className="text-sm text-[#86868b] uppercase tracking-wider font-semibold">{t('Vlogs Shared')}</div>
              </div>
              <div className="w-px h-12 bg-gray-200"></div>
              <div className="text-right">
                <div className="text-3xl font-bold text-[#1d1d1f]">10M+</div>
                <div className="text-sm text-[#86868b] uppercase tracking-wider font-semibold">{t('Total Views')}</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-auto md:h-[650px]">
            {/* Main Feature: YouTube Short */}
            <motion.a 
              href="https://youtube.com/@kun-nihao.educhina?si=oMPCkGSo6v-jM75G" 
              target="_blank" 
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="md:col-span-2 md:row-span-2 relative rounded-[2.5rem] overflow-hidden group block shadow-2xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2940&auto=format&fit=crop" 
                alt="Chinese University Life" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-24 h-24 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/40 scale-75 group-hover:scale-100 transition-transform duration-500">
                  <Play className="w-10 h-10 text-white fill-current ml-1" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-full uppercase tracking-widest">Featured</div>
                  <span className="text-white/80 text-sm font-medium">CJLU Campus Tour</span>
                </div>
                <h3 className="text-3xl font-bold !text-white leading-tight">A Day in the Life at <br />China Jiliang University</h3>
              </div>
            </motion.a>

            {/* Secondary Video */}
            <motion.a 
              href="https://www.instagram.com/nihao_edu_kun?igsh=enZzajQxZ3A1d3F5&utm_source=qr" 
              target="_blank" 
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="md:col-span-1 md:row-span-1 relative rounded-[2.5rem] overflow-hidden group block shadow-xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2940&auto=format&fit=crop" 
                alt="Student Life in China" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-3">
                  <Play className="w-4 h-4 text-white fill-current ml-0.5" />
                </div>
                <h3 className="text-lg font-bold !text-white">Study Sessions</h3>
              </div>
            </motion.a>

            {/* Image: City Life */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="md:col-span-1 md:row-span-1 relative rounded-[2.5rem] overflow-hidden group shadow-xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1543097692-fa13c6cd8595?q=80&w=2940&auto=format&fit=crop" 
                alt="Hangzhou City Life" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-lg font-bold !text-white">Hangzhou Life</h3>
              </div>
            </motion.div>

            {/* Image: Modern China */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="md:col-span-2 md:row-span-1 relative rounded-[2.5rem] overflow-hidden group shadow-xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2940&auto=format&fit=crop" 
                alt="Modern China Night Skyline" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-2xl font-bold !text-white">The Future is Here.</h3>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Section 5.1: Interactive University Map */}
      <UniversityMap />

      {/* Section 5.5: Testimonials */}
      <section className="py-32 bg-gradient-to-b from-[#faf9f6] to-white relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-amber-200/20 to-transparent blur-3xl rounded-full pointer-events-none -translate-y-1/2" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1d1d1f] tracking-tight mb-4">{t('Hear From Our Students')}</h2>
            <p className="text-xl text-[#5a5a5c] max-w-2xl mx-auto">
              {t('Testimonials Subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote: t("Testimonial Quote 1"),
                author: "Sarah M.",
                country: t("USA"),
                program: "Fudan University"
              },
              {
                quote: t("Testimonial Quote 2"),
                author: "David K.",
                country: t("UK"),
                program: "Tsinghua University"
              },
              {
                quote: t("Testimonial Quote 3"),
                author: "Elena R.",
                country: t("Spain"),
                program: "Zhejiang University"
              },
              {
                quote: t("Testimonial Quote 4"),
                author: "Ahmed S.",
                country: t("Egypt"),
                program: "Peking University"
              },
              {
                quote: t("Testimonial Quote 5"),
                author: "Jessica L.",
                country: t("Canada"),
                program: "Shanghai Jiao Tong"
              },
              {
                quote: t("Testimonial Quote 6"),
                author: "Michael T.",
                country: t("Australia"),
                program: "Nanjing University"
              }
            ].map((testimonial, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-white/60 backdrop-blur-xl border border-white/50 shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-8 rounded-[2rem] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 flex flex-col"
              >
                <div className="flex gap-1 text-amber-500 mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
                <p className="text-[#1d1d1f] text-lg font-medium mb-8 leading-relaxed flex-grow">"{testimonial.quote}"</p>
                <div className="pt-6 border-t border-gray-200/50">
                  <p className="font-bold text-[#1d1d1f] text-lg">{testimonial.author}</p>
                  <p className="text-[#5a5a5c] text-sm mt-1">
                    {testimonial.country} • <span className="text-blue-600 font-bold">{testimonial.program}</span>
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: Deadlines */}
      <Deadlines />

      {/* Section 7: The Lead Magnet */}
      <section className="py-32 bg-[#faf9f6] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-red-50/50 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-red-400/10 to-amber-400/10 blur-3xl rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="inline-block bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-lg border border-white/50 mb-8"
          >
            <Download className="w-12 h-12 text-red-600" />
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-bold text-[#1d1d1f] tracking-tight mb-6">
            {t('Lead Magnet Title')}
          </h2>
          <p className="text-xl text-[#5a5a5c] mb-12 max-w-2xl mx-auto">
            {t('Lead Magnet Subtitle')}
          </p>
          
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto relative" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder={t("Enter your email address")} 
              className="flex-grow px-8 py-4 rounded-full bg-white/80 backdrop-blur-md border border-white/50 text-[#1d1d1f] focus:outline-none focus:ring-2 focus:ring-red-500 text-lg shadow-[0_8px_30px_rgba(0,0,0,0.04)] placeholder:text-gray-400"
              required
            />
            <button 
              type="submit" 
              className="bg-gradient-to-r from-red-600 to-red-500 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-[0_8px_24px_rgba(220,38,38,0.3)] hover:shadow-[0_12px_32px_rgba(220,38,38,0.4)] hover:scale-105 transition-all duration-300 whitespace-nowrap"
            >
              {t('Send My Free Guide')}
            </button>
          </form>
          <p className="text-[#5a5a5c] text-sm mt-6">{t('Lead Magnet Disclaimer')}</p>
        </div>
      </section>
    </div>
  );
}
