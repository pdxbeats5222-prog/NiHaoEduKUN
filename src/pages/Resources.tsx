import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  Award, 
  Building, 
  Clock, 
  FileText, 
  Download, 
  X, 
  AlertCircle, 
  ListChecks, 
  ArrowRight, 
  Globe, 
  Code, 
  Database, 
  Layers, 
  Search, 
  BookOpen, 
  Terminal,
  HelpCircle,
  Copy,
  Check
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Resources() {
  const { t } = useTranslation();
  const [activeGuide, setActiveGuide] = useState<string | null>(null);
  const [activeBlog, setActiveBlog] = useState<string | null>(null);
  const [activeToolTab, setActiveToolTab] = useState<'keywords' | 'schema' | 'sitemap'>('keywords');
  const [isCopied, setIsCopied] = useState(false);

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

  const blogs = [
    {
      id: "csc-guide",
      title: "The Ultimate Guide to China Scholarship Council (CSC) Scholarships (2026 Edition)",
      subtitle: "Focus Keyword: Fully Funded Chinese Scholarships",
      desc: "An ultimate guide to mastering CSC Type A, Type B, and Type C admission channels. Understand requirements, stipends, and document authentication.",
      readTime: "8 min read",
      author: "Nihao Education Academic Team",
      date: "June 2026",
      paragraphs: [
        "The Chinese Government Scholarship (CSC) is standardly recognized as one of the most generous global study awards in existence. Under the fully-funded scheme, international students receive 100% tuition waivers, on-campus dormitory accommodation options, mandatory medical insurance, and monthly stipends ranging up to 3,500 RMB. However, securing this requires a precise application timeline standardly spanning from early January to mid-April annually.",
        "There are three major pathways to apply. Type A refers to applications submitted through your local Chinese embassy or consulate in your home nation. Type B consists of applications submitted directly to selected Chinese higher education institutions participating in official recruitment pilots. Type C represents specialized bi-lateral cooperative agreements between the education ministry and overseas colleges.",
        "To maximize your chances, your documentation must be pristine. Your physical exam form must be completely populated and signed, transcripts should carry notarized stamps, and your custom Study Plan or Research Proposal must prove standard academic alignment to the host school's core areas of strength."
      ],
      insights: [
        "Keep your Study Plan at 800+ words with a clear research methodology.",
        "Obtain two recommendation letters signed by Associate Professors or full Professors.",
        "Always cross-examine the official school agency code on the China Scholarship Council portal before filing your applications."
      ]
    },
    {
      id: "english-programs",
      title: "Top 10 English-Taught Bachelor & Master Programs in China",
      subtitle: "Focus Keyword: English-Taught Programs China",
      desc: "No HSK required. Find out which top-ranking Chinese universities host premium degrees completely taught in the English language.",
      readTime: "6 min read",
      author: "Global Admissions Board",
      date: "June 2026",
      paragraphs: [
        "A common misconception exists that studying in China demands immediate Mandarin fluency or passing HSK exams beforehand. In 2026, many of China's top-tier universities standardly deliver complete degree programs taught in English. These programs cover lucrative disciplines such as Civil Engineering, Artificial Intelligence, Business Administration, Computer Science, and Clinical Medicine (MBBS).",
        "Ranked institutions like Zhejiang University (ZJU), Hangzhou Dianzi University (HDU), and Zhejiang University of Technology (ZJUT) host world-class international colleges. Here, overseas cohorts integrate directly into advanced English curriculums overseen by internationally trained professors.",
        "By applying through Nihao Education, we match you directly to universities matching your budget, previous credential background, and long-term career aspirations without demanding complex language preparation courses first."
      ],
      insights: [
        "MBBS programs are strictly vetted by the Ministry of Education to maintain standard global practice guides.",
        "Engineering courses include direct laboratory experience at state-of-the-art key tech laboratories.",
        "Many programs standardly require an English proficiency certificate (IELTS/TOEFL) or a formal statement verifying English as your primary medium of instruction."
      ]
    },
    {
      id: "visa-x1-permit",
      title: "Demystifying the X1 Visa: Conversion to Chinese Residence Permit",
      subtitle: "Focus Keyword: Chinese Student Visa X1",
      desc: "Entering China is just step one. Learn how to convert your temporary entry X1 visa into a legal Residence Permit within 30 days.",
      readTime: "5 min read",
      author: "Visa Compliance & Immigration Team",
      date: "June 2026",
      paragraphs: [
        "Securing your student visa from the Chinese Embassy is an incredible milestone, but the legal processes continue upon touchdown. The long-term X1 visa is conceptually a entry voucher that permits single entry with a 30-day clock standardly ticking immediately post-customs inspection. Within these crucial 30 days, you must transition your X1 visa into an official Student Residence Permit at the local Municipal Public Security Bureau's Exit-Entry administration office.",
        "Failing to convert your X1 visa before the 30-day threshold triggers heavy regulatory penalties, daily monetary fines, and mandatory repatriation. The procedure requires specialized coordination: you must complete secondary health check examinations at certified border-health centers, obtain local community lodging registrations, and collect specialized authorization forms stamped by international desks.",
        "Our onboarding team at Nihao Education handles this complexity. We walk with you to security agencies, check matching stamps, translate procedures, and manage the complete file assembly so you can transition cleanly to university life."
      ],
      insights: [
        "The residence permit allows multi-entry travel with no secondary visa requests needed.",
        "Your photo used for the Residence Permit must be registered with an official Digital Verification Receipt code block.",
        "Keep your original physical passport pages in pristine condition; paper tears or page marks lead to administrative delays."
      ]
    }
  ];

  const keywordMap = [
    { keyword: "Study in China", type: "Short-tail / High Volume", volume: "High (50,000+ searches/mo)", intent: "Informational & Commercial", targetPlace: "H1, Page Titles, Hero Sections" },
    { keyword: "Fully Funded Chinese Scholarships", type: "Long-tail / High Intent", volume: "Medium-High (15,000+ searches/mo)", intent: "Transactional / Educational", targetPlace: "H2, FAQ Headings, Call to Action" },
    { keyword: "Chinese University Application Guide", type: "Long-tail / Content", volume: "Medium (8,000+ searches/mo)", intent: "Informational", targetPlace: "Blog Titles, Article Subheadings" },
    { keyword: "Chinese Student Visa X1", type: "Transactional", volume: "High (12,000+ searches/mo)", intent: "Transactional / Relational", targetPlace: "Checklist Pages, Compliance Cards" }
  ];

  const schemaCode = `{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "EducationOrganization",
      "name": "Nihao Education",
      "url": "https://nihaoedu.org/resources",
      "logo": "https://lh3.googleusercontent.com/u/0/d/1mOhv5T049YvaZY11iRie6C5Yxuk5XQC2",
      "description": "Nihao Education study-in-China counseling provides certified admissions advice, university catalogs, visa checks, and full study-grant processing.",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+86-159-6814-1445",
        "contactType": "admissions office"
      }
    },
    {
      "@type": "Course",
      "name": "Fully Funded Chinese Government CSC Scholarship Placement",
      "description": "Premium placement and application support for obtaining fully funded research and academic grants across top Chinese universities.",
      "provider": {
        "@type": "Organization",
        "name": "Nihao Education",
        "sameAs": "https://nihaoedu.org"
      }
    }
  ]
}`;

  const sitemapCode = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://nihaoedu.org/</loc>
    <lastmod>2026-06-11</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://nihaoedu.org/resources</loc>
    <lastmod>2026-06-11</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://nihaoedu.org/services</loc>
    <lastmod>2026-06-11</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://nihaoedu.org/about</loc>
    <lastmod>2026-06-11</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://nihaoedu.org/contact</loc>
    <lastmod>2026-06-11</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
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
      {/* 
        1. COMPLETE SEMANTIC HEADER HIERARCHY (H1) 
        Rich keywords are naturally integrated into the top page flow.
      */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-[#1d1d1f] tracking-tight mb-6 leading-tight">
          Study in China 2026: <span className="bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent">Complete Application & Scholarship Directory</span>
        </h1>
        <p className="text-xl text-[#86868b] max-w-3xl mx-auto leading-relaxed">
          Access high-authority insights, dynamic tools, and comprehensive compliance templates standardly optimized to ensure your admission into China&apos;s leading universities.
        </p>
      </div>

      {/* 
        2. ADVANTAGES SECTION (H2) 
      */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1d1d1f] tracking-tight mb-12 text-center">
          10 Major Advantages of <span className="text-amber-600">Studying in China</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {[
            "Diverse Cultural Integration",
            "Low Tuition Fees (1/4 of US/UK/Aus)",
            "High Scholarship Availability",
            "Safe, Modern, & Convenient Living",
            "Elite English-Taught Majors",
            "Cutting-Edge Scientific Research",
            "Extensive Global Placement Ops",
            "Globally Recognized Degrees",
            "Comprehensive Multi-culture cohorts",
            "Fully Custom Consulting Services"
          ].map((adv, idx) => (
            <div key={idx} className="bg-[#f5f5f7] p-8 rounded-[2rem] flex flex-col items-center text-center hover:bg-[#faf9f6]/80 transition-colors border border-transparent hover:border-amber-200 shadow-sm">
              <CheckCircle2 className="w-8 h-8 text-amber-500 mb-4 shrink-0" />
              <p className="font-semibold text-[#1d1d1f] text-sm leading-snug">{adv}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 
        3. HIGH-AUTHORITY EDUCATION INSIGHTS (blogs/articles requested)
      */}
      <div className="bg-[#faf9f6] py-32 border-y border-gray-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-black uppercase text-amber-600 tracking-widest bg-amber-50 border border-amber-100 px-3 py-1 rounded-full mb-3 inline-block">Topical Authority Publications</span>
            <h2 className="text-3xl md:text-5xl font-black text-[#1d1d1f] tracking-tight">University Application &amp; Visa Blogs</h2>
            <p className="text-base text-[#86868b] mt-4 max-w-2xl mx-auto">Explore high-quality, practical advice reviewed by counselors to make your Chinese study plans flawless.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <div 
                key={blog.id} 
                className="bg-white rounded-[2.5rem] border border-gray-150 overflow-hidden shadow-md flex flex-col hover:shadow-xl transition-all"
              >
                <div className="p-8 md:p-10 flex-grow">
                  <div className="flex gap-3 text-xs font-mono text-gray-500 mb-4 items-center">
                    <span className="font-semibold text-amber-600">{blog.date}</span>
                    <span>•</span>
                    <span className="font-bold">{blog.readTime}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-[#1d1d1f] tracking-tight leading-tight mb-2 hover:text-amber-600 transition-colors">
                    {blog.title}
                  </h3>
                  <div className="text-[11px] font-bold tracking-wider text-amber-800 uppercase mb-4 bg-amber-50 rounded-lg py-1 px-3.5 inline-block">
                    {blog.subtitle}
                  </div>
                  <p className="text-sm md:text-base text-[#5a5a5c] leading-relaxed mb-6">
                    {blog.desc}
                  </p>
                </div>
                <div className="p-8 md:p-10 bg-gray-50 border-t border-gray-100 mt-auto flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1d1d1f]">{blog.author}</span>
                  <button 
                    onClick={() => setActiveBlog(blog.id)}
                    className="text-xs font-black uppercase text-amber-600 hover:text-amber-800 flex items-center gap-1 group cursor-pointer"
                  >
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 
        4. TECHNICAL SEO & GLOBAL INTEGRATION WIDGET
      */}
      <div className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-black uppercase text-amber-600 tracking-widest bg-amber-50 border border-amber-100 px-3 py-1 rounded-full mb-3 inline-block">Consultancy Engine Blueprint</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1d1d1f] tracking-tight">Nihao Education Global SEO Diagnostics</h2>
            <p className="text-lg text-[#86868b] mt-3">Interactive technical overview for auditing our search engine schemas, sitemaps, and core keywords targeting top digital spots globally.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Widget Tabs */}
            <div className="lg:col-span-4 flex flex-col gap-3">
              <button 
                onClick={() => setActiveToolTab('keywords')}
                className={`p-6 rounded-[1.5rem] text-left border cursor-pointer transition-all ${
                  activeToolTab === 'keywords' 
                    ? 'bg-[#1d1d1f] text-white border-[#1d1d1f] shadow-lg shadow-black/10' 
                    : 'bg-[#f5f5f7] text-[#1d1d1f] border-transparent hover:bg-gray-250'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Search className={`w-5 h-5 ${activeToolTab === 'keywords' ? 'text-amber-500' : 'text-gray-500'}`} />
                  <span className="font-bold text-sm">Keyword Mapping &amp; Intent</span>
                </div>
                <p className="text-xs opacity-80">Check targeted short-tail and transactional search keys mapping.</p>
              </button>

              <button 
                onClick={() => setActiveToolTab('schema')}
                className={`p-6 rounded-[1.5rem] text-left border cursor-pointer transition-all ${
                  activeToolTab === 'schema' 
                    ? 'bg-[#1d1d1f] text-white border-[#1d1d1f] shadow-lg shadow-black/10' 
                    : 'bg-[#f5f5f7] text-[#1d1d1f] border-transparent hover:bg-gray-250'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Code className={`w-5 h-5 ${activeToolTab === 'schema' ? 'text-amber-500' : 'text-gray-500'}`} />
                  <span className="font-bold text-sm">JSON-LD Structured Schema</span>
                </div>
                <p className="text-xs opacity-80">Course &amp; Organization rich schema mockups enabling Google snippet previews.</p>
              </button>

              <button 
                onClick={() => setActiveToolTab('sitemap')}
                className={`p-6 rounded-[1.5rem] text-left border cursor-pointer transition-all ${
                  activeToolTab === 'sitemap' 
                    ? 'bg-[#1d1d1f] text-white border-[#1d1d1f] shadow-lg shadow-black/10' 
                    : 'bg-[#f5f5f7] text-[#1d1d1f] border-transparent hover:bg-gray-250'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Globe className={`w-5 h-5 ${activeToolTab === 'sitemap' ? 'text-amber-500' : 'text-gray-500'}`} />
                  <span className="font-bold text-sm">Search Engines XML Sitemap</span>
                </div>
                <p className="text-xs opacity-80">Optimized priority maps covering core application pathways.</p>
              </button>
            </div>

            {/* Tap Panel Contents */}
            <div className="lg:col-span-8 bg-[#1d1d1f] p-8 md:p-10 rounded-[2.5rem] text-white text-sm overflow-hidden relative shadow-xl border border-[#2c2c2e]">
              <div className="absolute top-6 right-6 z-10 flex gap-2">
                <button 
                  onClick={() => copyToClipboard(activeToolTab === 'schema' ? schemaCode : sitemapCode)}
                  className="p-2.5 bg-white/10 hover:bg-white/20 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 text-xs text-semibold"
                  title="Copy Code Block"
                >
                  {isCopied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-300" />}
                  <span>{isCopied ? "Copied" : "Copy"}</span>
                </button>
              </div>

              {activeToolTab === 'keywords' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 border-b border-white/10 pb-4">
                    <Terminal className="w-5 h-5 text-amber-500" />
                    <span className="font-mono text-xs text-[#a1a1a6]">KEYWORD_MAP_TAXONOMY_2026.YAML</span>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-sans">
                      <thead>
                        <tr className="border-b border-white/10 text-[#a1a1a6] font-bold uppercase tracking-wider">
                          <th className="pb-3 pr-4">Keyword</th>
                          <th className="pb-3 pr-4">Type</th>
                          <th className="pb-3 pr-4">Search Intent</th>
                          <th className="pb-3">Recommended Insertion</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 font-medium">
                        {keywordMap.map((k, idx) => (
                          <tr key={idx} className="hover:bg-white/5 transition-colors">
                            <td className="py-3.5 pr-4 font-bold text-amber-400 font-mono">{k.keyword}</td>
                            <td className="py-3.5 pr-4 text-gray-300">{k.type}</td>
                            <td className="py-3.5 pr-4 text-emerald-400 font-mono">{k.intent}</td>
                            <td className="py-3.5 text-gray-400">{k.targetPlace}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="bg-white/5 p-5 rounded-2xl border border-white/5 text-xs text-gray-350 leading-relaxed">
                    <span className="text-amber-500 font-bold uppercase tracking-wider block mb-1">University Graphics Alt-Text Rules:</span>
                    When uploading new high-resolution graphics, standardly use precise tag naming formats such as: <code className="bg-black/30 px-1 py-0.5 rounded text-orange-300">alt=&quot;Zhejiang University fully funded CSC scholarship cohort student life campus&quot;</code>. Avoid generic terms like &quot;campus image&quot;.
                  </div>
                </div>
              )}

              {activeToolTab === 'schema' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-white/10 pb-4">
                    <Terminal className="w-5 h-5 text-amber-500" />
                    <span className="font-mono text-xs text-[#a1a1a6]">SCHEMA_GRAPH_DATA.JSON</span>
                  </div>
                  <pre className="font-mono text-xs text-emerald-400 overflow-x-auto bg-black/40 p-5 rounded-2xl max-h-[350px]">
                    {schemaCode}
                  </pre>
                </div>
              )}

              {activeToolTab === 'sitemap' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-white/10 pb-4">
                    <Terminal className="w-5 h-5 text-amber-500" />
                    <span className="font-mono text-xs text-[#a1a1a6]">SITEMAP_INDEX_URLSET.XML</span>
                  </div>
                  <pre className="font-mono text-xs text-orange-300 overflow-x-auto bg-black/40 p-5 rounded-2xl max-h-[350px]">
                    {sitemapCode}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 
        5. ENROLLMENT DETAILS & SCHOLARSHIPS (H2)
      */}
      <div className="bg-[#f5f5f7] py-32 rounded-[3.5rem] mx-4 md:mx-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Enrollment */}
            <div>
              <div className="flex items-center gap-3 mb-10">
                <Clock className="w-8 h-8 text-[#1d1d1f] shrink-0" />
                <h2 className="text-3xl md:text-4xl font-bold text-[#1d1d1f] tracking-tight">Chinese University Enrollment Processes &amp; Deadlines</h2>
              </div>
              <div className="space-y-6">
                <div className="p-8 bg-white rounded-[2rem] shadow-sm">
                  <h3 className="text-xl font-semibold text-[#1d1d1f] mb-2">{t('Chinese Language Program')}</h3>
                  <p className="text-[#86868b] text-sm">{t('Language Program Details')}</p>
                </div>
                <div className="p-8 bg-white rounded-[2rem] shadow-sm">
                  <h3 className="text-xl font-semibold text-[#1d1d1f] mb-2">{t('Bachelor\'s Degree')}</h3>
                  <p className="text-[#86868b] text-sm">{t('Bachelor Details')}</p>
                </div>
                <div className="p-8 bg-white rounded-[2rem] shadow-sm">
                  <h3 className="text-xl font-semibold text-[#1d1d1f] mb-2">{t('Master\'s Degree')}</h3>
                  <p className="text-[#86868b] text-sm">{t('Master Details')}</p>
                </div>
                <div className="p-8 bg-white rounded-[2rem] shadow-sm">
                  <h3 className="text-xl font-semibold text-[#1d1d1f] mb-2">{t('PhD Programs')}</h3>
                  <p className="text-[#86868b] text-sm">{t('PhD Details')}</p>
                </div>
                <div className="p-8 bg-red-50 border border-red-100 rounded-[2rem] shadow-sm">
                  <h3 className="text-xl font-bold text-red-600 mb-2">{t('Eligibility Criteria')}</h3>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-sm text-red-900 border-b border-red-100 pb-2">
                      <CheckCircle2 className="w-4 h-4 text-red-500" />
                      <span className="font-bold">{t('Age:')}</span> {t('Eligibility Age Text')}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-red-900">
                      <CheckCircle2 className="w-4 h-4 text-red-500" />
                      <span className="font-bold">{t('Nationality:')}</span> {t('Eligibility Nationality Text')}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Scholarships */}
            <div>
              <div className="flex items-center gap-3 mb-10">
                <Award className="w-8 h-8 text-[#1d1d1f] shrink-0" />
                <h2 className="text-3xl md:text-4xl font-bold text-[#1d1d1f] tracking-tight">Fully Funded Scholarship Opportunities in China</h2>
              </div>
              <div className="space-y-6">
                <div className="p-8 bg-white rounded-[2rem] shadow-sm">
                  <h3 className="text-xl font-semibold text-[#1d1d1f] mb-3">{t('Scholarship CSC Title')}</h3>
                  <p className="text-[#86868b] leading-relaxed">{t('Scholarship CSC Desc')}</p>
                </div>
                <div className="p-8 bg-white rounded-[2rem] shadow-sm">
                  <h3 className="text-xl font-semibold text-[#1d1d1f] mb-3">{t('Scholarship Prov Title')}</h3>
                  <p className="text-[#86868b] leading-relaxed">{t('Scholarship Prov Desc')}</p>
                </div>
                <div className="p-8 bg-white rounded-[2rem] shadow-sm">
                  <h3 className="text-xl font-semibold text-[#1d1d1f] mb-3">{t('Scholarship Uni Title')}</h3>
                  <p className="text-[#86868b] leading-relaxed">{t('Scholarship Uni Desc')}</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 
        6. ESSENTIAL GUIDES SECTION (H2) 
      */}
      <div className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1d1d1f] tracking-tight mb-4">{t('Essential Guides.')}</h2>
              <p className="text-lg text-[#86868b]">{t('Essential Guides Subtitle')}</p>
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
              <h3 className="text-2xl font-bold text-[#1d1d1f] mb-4">{t('X1/X2 Visa Guide')}</h3>
              <p className="text-[#86868b] leading-relaxed mb-8 flex-grow">
                {t('X1/X2 Visa Guide Short')}
              </p>
              <div className="flex flex-col gap-4">
                <Link 
                  to="/contact"
                  className="w-full px-6 py-4 bg-red-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-red-700 transition-colors shadow-lg shadow-red-500/20"
                  state={{ message: 'I am interested in the X1/X2 Visa Guide and would like assistance.' }}
                >
                  {t('Apply Now')} <ArrowRight className="w-4 h-4" />
                </Link>
                <div className="flex gap-4">
                  <button 
                    onClick={() => setActiveGuide('visa')}
                    className="flex-1 px-6 py-4 bg-[#1d1d1f] text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-colors"
                  >
                    {t('View Online')}
                  </button>
                  <button 
                    onClick={downloadGuide}
                    className="p-4 bg-[#f5f5f7] text-[#1d1d1f] rounded-xl hover:bg-gray-200 transition-colors"
                    title={t("Download Guide")}
                  >
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>

            <div className="bg-[#f5f5f7]/50 border-2 border-dashed border-[#e2e8f0] p-10 rounded-[2.5rem] flex flex-col items-center justify-center text-center opacity-60">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-6">
                <FileText className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-[#86868b]">Arrival Handbook</h3>
              <p className="text-sm text-[#86868b] mt-2">Coming Soon (2026)</p>
            </div>

            <div className="bg-[#f5f5f7]/50 border-2 border-dashed border-[#e2e8f0] p-10 rounded-[2.5rem] flex flex-col items-center justify-center text-center opacity-60">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-6">
                <FileText className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-[#86868b]">HSK Mastery Guide</h3>
              <p className="text-sm text-[#86868b] mt-2">Coming Soon (2026)</p>
            </div>
          </div>
        </div>
      </div>

      {/* 
        7. UNIVERSITY PARTNERS SECTION (H2)
      */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 border-t border-[#f5f5f7]">
        <div className="flex items-center justify-center gap-3 mb-16">
          <Building className="w-8 h-8 text-[#1d1d1f] shrink-0" />
          <h2 className="text-3xl md:text-4xl font-bold text-[#1d1d1f] tracking-tight text-center">
            Official Partner Universities &amp; Majors offering English-Taught Programs China
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {universities.map((uni, idx) => (
            <div key={idx} className="bg-[#f5f5f7] p-8 rounded-[2rem] border border-transparent hover:border-[#1d1d1f]/5 shadow-sm hover:shadow-md transition-all">
              <h3 className="text-lg font-semibold text-[#1d1d1f] mb-3">{uni.name}</h3>
              <p className="text-sm text-[#86868b] leading-relaxed">
                <span className="font-semibold text-[#1d1d1f]">{t('Key Majors:')}</span> {uni.majors}
              </p>
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
                    <p className="text-sm text-gray-500 font-medium tracking-wide font-mono">DOCUMENT ID: NE-VISA-2026-X</p>
                  </div>
                </div>
                <button 
                  onClick={() => setActiveGuide(null)}
                  className="p-3 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
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
                  <h3 className="text-2xl font-bold text-white mb-4">{t('Ready to Apply?')}</h3>
                  <p className="text-white/70 mb-8 max-w-lg mx-auto leading-relaxed">
                    Our team provides personalized document review services for all our students to ensure a 100% visa success rate.
                  </p>
                  <Link 
                    to="/contact"
                    className="inline-flex py-4 px-8 bg-red-600 text-white rounded-2xl font-bold text-sm tracking-wide uppercase hover:bg-red-700 transition-all items-center gap-3 group"
                  >
                    {t('Apply Now')}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
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

      {/* Blog Article Reader Modal */}
      <AnimatePresence>
        {activeBlog !== null && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveBlog(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            {(() => {
              const b = blogs.find(item => item.id === activeBlog);
              if (!b) return null;
              return (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  className="relative w-full max-w-3xl max-h-[85vh] bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col"
                >
                  <div className="p-8 md:p-10 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center shrink-0">
                        <BookOpen className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-amber-600 font-mono tracking-widest uppercase block mb-0.5">TOPICAL AUTHORITY PIECE</span>
                        <h4 className="text-lg md:text-xl font-bold text-[#1d1d1f] line-clamp-1">{b.title}</h4>
                      </div>
                    </div>
                    <button 
                      onClick={() => setActiveBlog(null)}
                      className="p-2.5 hover:bg-gray-100 rounded-full transition-colors cursor-pointer shrink-0"
                    >
                      <X className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-8 md:p-10 space-y-6 bg-white">
                    <div className="border-l-4 border-amber-500 bg-amber-50/50 p-5 rounded-r-2xl">
                      <span className="text-[10px] uppercase font-black text-amber-700 tracking-wider block mb-1">Target Keyword</span>
                      <p className="text-sm text-amber-900 font-bold font-mono">{b.subtitle}</p>
                    </div>

                    <div className="space-y-4 text-gray-700 text-sm md:text-base leading-relaxed font-normal">
                      {b.paragraphs.map((p, pidx) => (
                        <p key={pidx}>{p}</p>
                      ))}
                    </div>

                    <div className="bg-gray-50 p-6 md:p-8 rounded-[2rem] border border-gray-100 space-y-3">
                      <span className="text-xs font-black uppercase text-[#1d1d1f] tracking-widest block mb-1">Key Insight Recommendations:</span>
                      <ul className="space-y-2.5">
                        {b.insights.map((ins, iidx) => (
                          <li key={iidx} className="flex gap-2.5 items-start text-xs text-[#5a5a5c]">
                            <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span className="font-medium">{ins}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="p-6 bg-gray-50 border-t border-gray-100 text-center">
                    <Link 
                      to="/contact"
                      onClick={() => setActiveBlog(null)}
                      className="inline-flex py-3 px-6 bg-[#1d1d1f] text-white rounded-xl font-bold text-xs tracking-wide uppercase hover:bg-black transition-all items-center gap-2"
                    >
                      <span>Inquire with Consultants</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </motion.div>
              );
            })()}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
