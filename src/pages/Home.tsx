import { motion } from 'motion/react';
import { ArrowRight, Play, BookOpen, Globe2, Briefcase, CheckCircle2, Star, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import Deadlines from '../components/Deadlines';

export default function Home() {
  return (
    <div className="w-full">
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
              <span className="bg-gradient-to-r from-red-600 via-red-500 to-amber-500 bg-clip-text text-transparent drop-shadow-sm">Study in China.</span> <br className="hidden md:block" />
              <span className="text-[#1d1d1f]">Brilliantly simple.</span>
            </h1>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-[#5a5a5c] mb-10 max-w-3xl mx-auto font-normal"
          >
            Seamless admissions, guaranteed visa support, and insider guidance to help you thrive in the world's most dynamic educational destination.
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link 
              to="/contact" 
              className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-red-500 text-white px-10 py-4 rounded-full font-semibold text-lg shadow-[0_8px_24px_rgba(220,38,38,0.3)] hover:shadow-[0_12px_32px_rgba(220,38,38,0.4)] hover:scale-105 transition-all duration-300"
            >
              Get Your Place
            </Link>
            <a 
              href="https://youtube.com/shorts/Gqv3Y-iKki8?si=YlnKTuazCiaaYd6D" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-white/60 backdrop-blur-xl border border-white/40 text-red-600 px-10 py-4 rounded-full font-semibold text-lg shadow-sm hover:shadow-md hover:bg-white/80 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Watch the film <Play className="w-5 h-5 fill-current" />
            </a>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-16 max-w-6xl mx-auto w-full px-4 relative z-10"
        >
          <div className="relative rounded-[2rem] p-2 bg-white/30 backdrop-blur-2xl border border-white/50 shadow-[0_20px_60px_rgba(0,0,0,0.1)]">
            <img 
              src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2940&auto=format&fit=crop" 
              alt="Students outside Chinese university" 
              referrerPolicy="no-referrer"
              className="w-full h-[50vh] md:h-[70vh] object-cover rounded-[1.5rem]"
            />
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
              Why China? Why Now?
            </h2>
            <p className="text-xl text-[#5a5a5c] max-w-2xl mx-auto">
              China is rapidly becoming the top destination for ambitious international students. Here's why you should make the move.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <BookOpen className="w-10 h-10 text-red-600" />,
                title: "World-Class Education.",
                desc: "Access top-ranked universities with cutting-edge facilities, generous scholarships, and globally recognized degrees in tech, business, and medicine."
              },
              {
                icon: <Globe2 className="w-10 h-10 text-emerald-600" />,
                title: "Cultural Immersion.",
                desc: "Master Mandarin (HSK) while experiencing a rich, 5,000-year-old culture seamlessly blended with futuristic, cashless, hyper-connected cities."
              },
              {
                icon: <Briefcase className="w-10 h-10 text-amber-500" />,
                title: "Unmatched Career Edge.",
                desc: "Position yourself in the world's second-largest economy. Build a global network and unlock exclusive career opportunities across Asia and beyond."
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
              <img 
                src="/founder.jpg" 
                alt="Shiqi - Founder" 
                className="rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] w-full object-cover h-[600px] relative z-10 border border-white/50"
              />
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-4xl md:text-5xl font-bold text-[#1d1d1f] tracking-tight mb-6">
                Meet Shiqi. <br />
                <span className="bg-gradient-to-r from-red-600 to-amber-500 bg-clip-text text-transparent">Founder & Insider Guide.</span>
              </h2>
              <div className="space-y-6 text-xl text-[#5a5a5c] font-light leading-relaxed">
                <p>
                  I know exactly what it feels like to land in China for the first time—excited, overwhelmed, and unsure of how to navigate the system.
                </p>
                <p>
                  Living and studying in Hangzhou, I had to figure out the X1 visa process, adapt to university life, and grind toward HSK mastery through trial and error. <strong className="font-medium text-[#1d1d1f]">You don't have to.</strong>
                </p>
                <p>
                  I founded Nihao.edu to provide the exact roadmap I wish I had. Alongside my dedicated team, we don't just process paperwork; we provide unmatched, on-the-ground insider knowledge to ensure your transition is smooth, successful, and stress-free.
                </p>
              </div>
              <div className="mt-10">
                <Link to="/about" className="text-red-600 font-medium text-lg flex items-center gap-2 hover:text-red-700 transition-colors group">
                  Read my full story <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Our Services (How We Help) */}
      <section className="py-32 bg-[#faf9f6] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-emerald-400/10 to-transparent blur-3xl rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1d1d1f] tracking-tight mb-4">How We Help You Succeed</h2>
            <p className="text-xl text-[#5a5a5c] max-w-2xl mx-auto">
              From choosing the right program to stepping foot on campus, we handle the heavy lifting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "University & Program Matching",
                desc: "Whether you want a non-degree language program to master Mandarin or a full degree at a top-tier university, we match you with the perfect fit based on your goals and budget.",
                features: ["Personalized shortlists", "Application strategy", "Scholarship guidance"]
              },
              {
                title: "Visa & Paperwork Assistance",
                desc: "Navigating Chinese bureaucracy can be daunting. We provide step-by-step support for X1/X2 student visas, JW202 forms, and medical check requirements.",
                features: ["Document verification", "Visa interview prep", "JW202 processing support"]
              },
              {
                title: "Pre-Departure Orientation",
                desc: "Don't arrive unprepared. We equip you with the essential knowledge to hit the ground running, from setting up WeChat Pay to understanding dorm life.",
                features: ["App setup (WeChat, Alipay)", "SIM card & banking advice", "Cultural etiquette"]
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

      {/* Section 5: Real Student Life in China */}
      <section id="vlogs" className="py-32 bg-[#faf9f6] relative overflow-hidden">
        {/* Subtle background motif */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #b91c1c 1px, transparent 0)', backgroundSize: '48px 48px' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1d1d1f] tracking-tight mb-4">Real Student Life in China</h2>
            <p className="text-xl text-[#5a5a5c] max-w-2xl mx-auto">
              Immerse yourself in the vibrant culture, futuristic cities, and world-class campuses through the eyes of our students.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
            {/* Large Feature Item */}
            <a href="https://youtube.com/shorts/Gqv3Y-iKki8?si=YlnKTuazCiaaYd6D" target="_blank" rel="noopener noreferrer" className="md:col-span-2 md:row-span-2 relative rounded-[2rem] overflow-hidden group block">
              <img 
                src="https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?q=80&w=2940&auto=format&fit=crop" 
                alt="Vlog Thumbnail" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-6 inline-block transition-transform duration-300 group-hover:translate-y-[-8px]">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-lg cursor-pointer group-hover:bg-red-700 transition-colors">
                      <Play className="w-5 h-5 text-white ml-1 fill-current" />
                    </div>
                    <span className="text-white font-medium tracking-wide uppercase text-sm">Featured Vlog</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">A Day in the Life at Tsinghua University</h3>
                </div>
              </div>
            </a>

            {/* Grid Items */}
            {[
              { img: "https://images.unsplash.com/photo-1558862107-d49ef2a04d72?q=80&w=2940&auto=format&fit=crop", title: "Campus Architecture", span: "md:col-span-1 md:row-span-1" },
              { img: "https://images.unsplash.com/photo-1528701202534-1926618d3665?q=80&w=2940&auto=format&fit=crop", title: "Street Food Adventures", span: "md:col-span-1 md:row-span-1" },
              { img: "https://images.unsplash.com/photo-1543097692-fa13c6cd8595?q=80&w=2940&auto=format&fit=crop", title: "High-Speed Rail Travel", span: "md:col-span-1 md:row-span-1" },
              { img: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?q=80&w=2940&auto=format&fit=crop", title: "Modern Cityscapes", span: "md:col-span-2 md:row-span-1" },
            ].map((item, idx) => (
              <div key={idx} className={`${item.span} relative rounded-[2rem] overflow-hidden group`}>
                <img 
                  src={item.img} 
                  alt={item.title} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-xl px-4 py-2 inline-block">
                    <h3 className="text-white font-medium">{item.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5.5: Testimonials */}
      <section className="py-32 bg-gradient-to-b from-[#faf9f6] to-white relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-amber-200/20 to-transparent blur-3xl rounded-full pointer-events-none -translate-y-1/2" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1d1d1f] tracking-tight mb-4">Hear From Our Students</h2>
            <p className="text-xl text-[#5a5a5c] max-w-2xl mx-auto">
              Join thousands of international students who have successfully transitioned to studying in China with our guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote: "Kun's guidance was a lifesaver. He helped me navigate the confusing X1 visa process and got me into a top language program in Shanghai. I wouldn't be here without Nihao.edu.",
                author: "Sarah M.",
                country: "USA",
                program: "Fudan University"
              },
              {
                quote: "The pre-departure orientation was incredible. I landed in Beijing already knowing how to use Alipay, order food on Meituan, and navigate the subway. Highly recommend!",
                author: "David K.",
                country: "UK",
                program: "Tsinghua University"
              },
              {
                quote: "I was overwhelmed by the CSC scholarship application, but the team at Nihao broke it down step-by-step. I'm now studying my Master's fully funded!",
                author: "Elena R.",
                country: "Spain",
                program: "Zhejiang University"
              },
              {
                quote: "From finding the right dorm to setting up my bank account, they were there. It felt like having a local best friend waiting for me when I arrived.",
                author: "Ahmed S.",
                country: "Egypt",
                program: "Peking University"
              },
              {
                quote: "The cultural immersion tips were spot on. I avoided so many faux pas and made local friends much faster thanks to their advice.",
                author: "Jessica L.",
                country: "Canada",
                program: "Shanghai Jiao Tong"
              },
              {
                quote: "Their network is unmatched. They connected me with alumni from my home country who were already studying at my target university.",
                author: "Michael T.",
                country: "Australia",
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
                  <p className="text-[#5a5a5c] text-sm mt-1">{testimonial.country} • {testimonial.program}</p>
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
            Get The Ultimate China Student Visa Checklist.
          </h2>
          <p className="text-xl text-[#5a5a5c] mb-12 max-w-2xl mx-auto">
            Don't let a missing document delay your dream. Download our free, step-by-step guide to securing your X1/X2 visa without the stress.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto relative" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-grow px-8 py-4 rounded-full bg-white/80 backdrop-blur-md border border-white/50 text-[#1d1d1f] focus:outline-none focus:ring-2 focus:ring-red-500 text-lg shadow-[0_8px_30px_rgba(0,0,0,0.04)] placeholder:text-gray-400"
              required
            />
            <button 
              type="submit" 
              className="bg-gradient-to-r from-red-600 to-red-500 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-[0_8px_24px_rgba(220,38,38,0.3)] hover:shadow-[0_12px_32px_rgba(220,38,38,0.4)] hover:scale-105 transition-all duration-300 whitespace-nowrap"
            >
              Send My Free Guide
            </button>
          </form>
          <p className="text-[#5a5a5c] text-sm mt-6">100% free. No spam. Unsubscribe anytime.</p>
        </div>
      </section>
    </div>
  );
}
