import { motion, useAnimationFrame, useMotionValue } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { Users, Building2, GraduationCap, Globe2, MapPin, Instagram, Youtube, Volume2, VolumeX } from 'lucide-react';

export default function About() {
  const { t } = useTranslation();
  const team = [
    {
      name: "Shiqi",
      role: "Founder & CEO",
      desc: "Local Institutional Authority specializing in University Admissions & Government Regulations.",
      image: "/shiqi.jpg"
    },
    {
      name: "Jiabin Wang",
      role: "Russian Market Lead & Financial Accountant",
      desc: "Lead for the Russian market and company financial accountant, ensuring professional service and fiscal integrity.",
      image: "/jiabin.jpg"
    },
    {
      name: "Kun",
      role: "India Lead",
      desc: "South Asia Strategic Partner, expert in HSK Training & Student Integration.",
      image: "/kun.jpg"
    },
    {
      name: "Kiki",
      role: "Video Creator",
      desc: "Digital content specialist, highlighting authentic campus experiences and student success stories through high-quality video production.",
      image: "/kiki.jpg"
    },
    {
      name: "Hannah Hu",
      role: "Co-creation Partners",
      desc: "Seasoned practitioner in international study services and premium video content creator, bridging global talents with study-in-China opportunities through media platforms.",
      image: "/hannah.jpg"
    },
    {
      name: "Clement Zhou",
      role: "Consulting Teacher",
      desc: "Expert academic advisor providing strategic guidance on university admissions and career planning for international students.",
      image: "/clement.jpg"
    },
    {
      name: "SAYAN",
      role: "Consultant Teacher",
      desc: "Specialized academic consultant providing comprehensive support for university applications and student success in China.",
      image: "/sayan.jpg"
    },
    {
      name: "JENNY",
      role: "Consultant Teacher",
      desc: "Dedicated international student advisor with a focus on academic coordination and institutional excellence.",
      image: "/jenny.jpg"
    },
    {
      name: "XIANGYI YANG",
      role: "Document Specialist",
      desc: "Expert in academic documentation, visa processing, and graduation clearances, ensuring all student paperwork meets strict institutional standards.",
      image: "/xiangyi.jpg"
    },
    {
      name: "Max",
      role: "Operation Supervisor",
      desc: "Overseeing daily operations and institutional coordination to maintain high standards of service excellence across all departments.",
      image: "/max.jpg"
    },
    {
      name: "Alan",
      role: "Team Head of Student Guidance",
      desc: "Leading international student support and academic orientation strategies for all incoming scholars.",
      image: "/alan.jpg"
    },
    {
      name: "Tani",
      role: "Mexico Lead",
      desc: "Latin American Liaison, managing bilingual transitions & cultural immersion.",
      image: "/tani.jpg"
    },
    {
      name: "Zixuan Ji",
      role: "Hispanic Markets Director",
      desc: "Cultural storyteller & cross-cultural facilitator, connecting Spanish, English and Chinese-speaking communities.",
      image: "/zixuan.jpg"
    },
    {
      name: "IRINA",
      role: "Campus Ambassador",
      desc: "Our dedicated campus ambassador in Hangzhou, bridging the gap between potential students and authentic university life through on-ground insights.",
      image: "/irina.jpg"
    },
    {
      name: "AHMAD JASH",
      role: "Coordinator for African Partnership",
      desc: "Bilingual communication and Cultural Integration specialist, fostering strong relationships across African partnerships.",
      image: "/ahmad.jpg"
    }
  ];


  // Marquee Controller
  const x = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useAnimationFrame((t, delta) => {
    if (isDragging || isPaused) return;

    const moveBy = -0.5 * (delta / 16); // Normalizing for ~60fps
    let nextX = x.get() + moveBy;

    // Loop logic - half of the duplicated list
    if (contentRef.current) {
      const halfWidth = contentRef.current.offsetWidth / 2;
      if (nextX <= -halfWidth) {
        nextX = 0;
      } else if (nextX > 0) {
        nextX = -halfWidth;
      }
    }
    
    x.set(nextX);
  });

  const location = useLocation();
  const [isMuted, setIsMuted] = useState(true);
  const videoSectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Sync isMuted state & support smooth background auto-playing
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
      videoRef.current.play().catch((err) => {
        console.log("Play state handled by browser:", err);
      });
    }
  }, [isMuted]);

  useEffect(() => {
    if (location.state?.unmute) {
      setIsMuted(false);
      setTimeout(() => {
        videoSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        if (videoRef.current) {
          videoRef.current.play().catch((err) => {
            console.log("Play failed:", err);
          });
        }
      }, 150);
    } else {
      if (videoRef.current) {
        videoRef.current.play().catch((err) => {
          console.log("Autoplay muted failed:", err);
        });
      }
    }
  }, [location]);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-[#1d1d1f] tracking-tight mb-6">{t('Your Local Gateway to China.')}</h1>
          <p className="text-xl text-[#86868b] leading-relaxed mb-8">
            {t('About Hero Subtitle')}
          </p>
          <div className="flex justify-center gap-6">
            <a 
              href="https://youtube.com/@kun-nihao.educhina?si=oMPCkGSo6v-jM75G" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 text-sm font-bold text-red-600 hover:opacity-80 transition-opacity"
            >
              <Youtube className="w-5 h-5" />
              {t('Watch Us on YouTube')}
            </a>
            <a 
              href="https://www.instagram.com/nihao_edu_kun?igsh=enZzajQxZ3A1d3F5&utm_source=qr" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 text-sm font-bold text-[#1d1d1f] hover:opacity-80 transition-opacity"
            >
              <Instagram className="w-5 h-5" />
              {t('Follow Us on Instagram')}
            </a>
          </div>
        </div>
      </div>


      {/* Team Video Spotlight */}
      <div ref={videoSectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl bg-[#1d1d1f] aspect-video md:aspect-[21/9]">
          <video 
            ref={videoRef}
            poster="/about_hero.jpg"
            autoPlay 
            controls
            muted={isMuted}
            loop 
            playsInline
            className="w-full h-full object-cover"
            src="/about_video.mp4"
          >
            Your browser does not support the video tag.
          </video>
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

          {/* Sound Toggle */}
          <div className="absolute bottom-8 right-8 z-30">
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className="bg-black/20 hover:bg-black/40 backdrop-blur-xl p-4 rounded-full border border-white/10 transition-all active:scale-95 group"
              aria-label={isMuted ? "Unmute video" : "Mute video"}
            >
              <motion.div
                key={isMuted ? 'muted' : 'unmuted'}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                {isMuted ? (
                  <VolumeX className="w-6 h-6 text-white" />
                ) : (
                  <Volume2 className="w-6 h-6 text-white" />
                )}
              </motion.div>
            </button>
          </div>
        </div>
      </div>

      {/* Core Advantage */}
      <div className="bg-[#f5f5f7] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1d1d1f] tracking-tight mb-6">{t('The Nihao Education Difference.')}</h2>
              <p className="text-lg text-[#86868b] mb-6">
                {t('Advantage Text 1')}
              </p>
              <p className="text-lg text-[#86868b] mb-8">
                {t('Advantage Text 2')}
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <MapPin className="w-6 h-6 text-[#1d1d1f] shrink-0" />
                  <div>
                    <h4 className="font-semibold text-[#1d1d1f]">{t('Local HQ')}</h4>
                    <p className="text-sm text-[#86868b]">{t('Based in Hangzhou')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <GraduationCap className="w-6 h-6 text-[#1d1d1f] shrink-0" />
                  <div>
                    <h4 className="font-semibold text-[#1d1d1f]">{t('Alumni Network')}</h4>
                    <p className="text-sm text-[#86868b]">{t('CJLU Graduates')}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <img 
                src="/team_adv.jpg" 
                alt="Nihao Education Team" 
                className="rounded-[2rem] shadow-xl w-full object-cover h-[400px]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Global Leadership Team */}
      <div className="py-24 max-w-[100vw] overflow-hidden">
        <div className="text-center mb-16 px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1d1d1f] tracking-tight mb-4">{t('Our Global Leadership Team.')}</h2>
          <p className="text-xl text-[#86868b] max-w-2xl mx-auto">
            {t('Team Subtitle')}
          </p>
        </div>


        <div 
          ref={containerRef}
          className="relative w-full overflow-hidden py-4 cursor-grab active:cursor-grabbing"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Gradient masks for smooth fade on edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
          
          <motion.div 
            ref={contentRef}
            className="flex gap-8 w-max px-8"
            style={{ x }}
            drag="x"
            onDragStart={() => setIsDragging(true)}
            onDragEnd={(e, info) => {
              setIsDragging(false);
              // Handle looping during/after drag
              if (contentRef.current) {
                const halfWidth = contentRef.current.offsetWidth / 2;
                let currentX = x.get();
                if (currentX <= -halfWidth) x.set(currentX + halfWidth);
                if (currentX > 0) x.set(currentX - halfWidth);
              }
            }}
          >
            {[...team, ...team].map((member, idx) => (
              <div 
                key={idx}
                className="bg-[#f5f5f7] rounded-[2rem] overflow-hidden w-[280px] md:w-[320px] shrink-0 shadow-sm hover:shadow-md transition-shadow select-none pointer-events-none sm:pointer-events-auto"
              >
                <img src={member.image} alt={member.name} referrerPolicy="no-referrer" className="w-full h-64 object-cover pointer-events-none" />
                <div className="p-8">
                  <h3 className="text-xl font-semibold text-[#1d1d1f] mb-1">{member.name}</h3>
                  <p className="text-[#0071e3] font-medium mb-4">{member.role}</p>
                  <p className="text-sm text-[#86868b] leading-relaxed">{member.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Backed by Xipei */}
      <div className="bg-[#1d1d1f] text-white py-24 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-16">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">{t('Backed by Xipei International Education.')}</h2>
              <p className="text-[#86868b] text-xl mb-8">
                {t('Xipei Text')}
              </p>
              <ul className="space-y-6">
                <li className="flex items-center gap-4">
                  <Building2 className="w-6 h-6 text-white" />
                  <span className="text-lg">{t('Over 100 teaching centers')}</span>
                </li>
                <li className="flex items-center gap-4">
                  <Users className="w-6 h-6 text-white" />
                  <span className="text-lg">{t('Serving 200,000+ students globally')}</span>
                </li>
                <li className="flex items-center gap-4">
                  <Globe2 className="w-6 h-6 text-white" />
                  <span className="text-lg">{t('Managing 1,000+ student dormitories')}</span>
                </li>
              </ul>
            </div>
            <div className="md:w-1/2 grid grid-cols-2 gap-6">
              <div className="bg-[#2d2d2f] p-8 rounded-[2rem] text-center">
                <div className="text-4xl font-bold text-white mb-2">1998</div>
                <div className="text-sm text-[#86868b]">{t('Year Established')}</div>
              </div>
              <div className="bg-[#2d2d2f] p-8 rounded-[2rem] text-center">
                <div className="text-4xl font-bold text-white mb-2">200k+</div>
                <div className="text-sm text-[#86868b]">{t('Students Served')}</div>
              </div>
              <div className="bg-[#2d2d2f] p-8 rounded-[2rem] text-center">
                <div className="text-4xl font-bold text-white mb-2">100+</div>
                <div className="text-sm text-[#86868b]">{t('Teaching Centers')}</div>
              </div>
              <div className="bg-[#2d2d2f] p-8 rounded-[2rem] text-center">
                <div className="text-4xl font-bold text-white mb-2">1k+</div>
                <div className="text-sm text-[#86868b]">{t('Dormitories')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
