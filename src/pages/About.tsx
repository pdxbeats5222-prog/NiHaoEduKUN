import { motion, useAnimationFrame, useMotionValue } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Users, Building2, GraduationCap, Globe2, MapPin, Instagram, Youtube, Volume2, VolumeX } from 'lucide-react';

export default function About() {
  const { t } = useTranslation();
  const team = [
    {
      name: "Shiqi",
      role: "Founder & CEO",
      desc: "Local Institutional Authority specializing in University Admissions & Government Regulations.",
      image: "https://lh3.googleusercontent.com/u/0/d/1C9LsBi5uVae6ZYm46Vl_1fuFPUPI5kjz"
    },
    {
      name: "Jiabin Wang",
      role: "Russian Market Lead & Financial Accountant",
      desc: "Lead for the Russian market and company financial accountant, ensuring professional service and fiscal integrity.",
      image: "https://lh3.googleusercontent.com/u/0/d/15bKTq7WGWEDC2g2lS4syadWtT0omDcdg"
    },
    {
      name: "Kun",
      role: "India Lead",
      desc: "South Asia Strategic Partner, expert in HSK Training & Student Integration.",
      image: "https://lh3.googleusercontent.com/u/0/d/1lhx6ceasYSrlWsBk7vy1BDdTzxq_r7_I"
    },
    {
      name: "Kiki",
      role: "Video Creator",
      desc: "Digital content specialist, highlighting authentic campus experiences and student success stories through high-quality video production.",
      image: "https://lh3.googleusercontent.com/u/0/d/1CpWfyo7kzybV9hrlQlu15-ibpqeXJopG"
    },
    {
      name: "Clement Zhou",
      role: "Consulting Teacher",
      desc: "Expert academic advisor providing strategic guidance on university admissions and career planning for international students.",
      image: "https://lh3.googleusercontent.com/u/0/d/1DDu2udglAq1vbEli91PwnfJCCFc17Ju4"
    },
    {
      name: "SAYAN",
      role: "Consultant Teacher",
      desc: "Specialized academic consultant providing comprehensive support for university applications and student success in China.",
      image: "https://lh3.googleusercontent.com/u/0/d/1OMMpRB8mml7ORgQJAS2xwyZgcLTBCdWa"
    },
    {
      name: "JENNY",
      role: "Consultant Teacher",
      desc: "Dedicated international student advisor with a focus on academic coordination and institutional excellence.",
      image: "https://lh3.googleusercontent.com/u/0/d/1VIj7X45ceApyQeqmuK-v0y2fYikp4pDp"
    },
    {
      name: "XIANGYI YANG",
      role: "Document Specialist",
      desc: "Expert in academic documentation, visa processing, and graduation clearances, ensuring all student paperwork meets strict institutional standards.",
      image: "https://lh3.googleusercontent.com/u/0/d/1rkEfLG8ifXqeNl4c8edpN02RL57URp5U"
    },
    {
      name: "Max",
      role: "Operation Supervisor",
      desc: "Overseeing daily operations and institutional coordination to maintain high standards of service excellence across all departments.",
      image: "https://lh3.googleusercontent.com/u/0/d/1DHWaP_CEiV38Sqy9QWYUEU2FDeFPlBzv"
    },
    {
      name: "Alan",
      role: "Team Head of Student Guidance",
      desc: "Leading international student support and academic orientation strategies for all incoming scholars.",
      image: "https://lh3.googleusercontent.com/u/0/d/1A6ULZSjDo8edlSbMFH5X6xtZ6HXclIyX"
    },
    {
      name: "Tani",
      role: "Mexico Lead",
      desc: "Latin American Liaison, managing bilingual transitions & cultural immersion.",
      image: "https://lh3.googleusercontent.com/u/0/d/13Dc-hTPDkzS5rFse0nxkjbIJA6d9rR0m"
    },
    {
      name: "Zixuan Ji",
      role: "Hispanic Markets Director",
      desc: "Cultural storyteller & cross-cultural facilitator, connecting Spanish, English and Chinese-speaking communities.",
      image: "https://lh3.googleusercontent.com/u/0/d/1quTZ2fNzLRHHR0fIb2mQ45hOuu38Y7Cg"
    },
    {
      name: "IRINA",
      role: "Campus Ambassador",
      desc: "Our dedicated campus ambassador in Hangzhou, bridging the gap between potential students and authentic university life through on-ground insights.",
      image: "https://lh3.googleusercontent.com/u/0/d/1PZladjOvW30UEC1rjlRJHYP-AbLqY8sn"
    },
    {
      name: "AHMAD JASH",
      role: "Coordinator for African Partnership",
      desc: "Bilingual communication and Cultural Integration specialist, fostering strong relationships across African partnerships.",
      image: "https://lh3.googleusercontent.com/u/0/d/1eHXH_NkzpDOqIDw3l_X3GiAdwInug7Am"
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

  const [isMuted, setIsMuted] = useState(true);

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl bg-[#1d1d1f] aspect-video md:aspect-[21/9]">
          <video 
            key={isMuted ? 'muted' : 'unmuted'}
            autoPlay 
            muted={isMuted}
            loop 
            playsInline
            className="w-full h-full object-cover pointer-events-none"
            src="https://lh3.googleusercontent.com/u/0/d/1bl8LBVe54iKyIANlekNgiFoJmMsPyfDp"
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
                src="https://lh3.googleusercontent.com/u/0/d/1N1WnU1yDWxOZrk5Dr29eUSiFG9nbSZHG" 
                alt="Nihao Education Team" 
                referrerPolicy="no-referrer"
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
