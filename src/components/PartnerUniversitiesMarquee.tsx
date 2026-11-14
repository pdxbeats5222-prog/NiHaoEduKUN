import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, ArrowUpRight } from 'lucide-react';

interface PartnerUniversityItem {
  name: string;
  city: string;
  logo: string;
  to: string;
  state?: Record<string, string>;
  monochromeDark?: boolean;
  darkBackdrop?: boolean;
  showWordmark?: boolean;
  chineseName?: string;
}

const ROW_ONE_UNIVERSITIES: PartnerUniversityItem[] = [
  {
    name: 'Zhejiang University',
    city: 'Hangzhou',
    logo: '/university-logos/zhejiang.png',
    to: `/university/${encodeURIComponent('Zhejiang University')}`,
  },
  {
    name: 'Zhejiang University of Technology',
    city: 'Hangzhou',
    logo: '/university-logos/zjut.png',
    to: `/university/${encodeURIComponent('Zhejiang University of Technology')}`,
    monochromeDark: true,
  },
  {
    name: 'Hangzhou Normal University',
    city: 'Hangzhou',
    logo: '/university-logos/hznu.png',
    to: `/university/${encodeURIComponent('Hangzhou Normal University')}`,
  },
  {
    name: 'Communication University of Zhejiang',
    city: 'Hangzhou',
    logo: '/university-logos/cuz.png',
    to: `/university/${encodeURIComponent('Communication University of Zhejiang')}`,
    darkBackdrop: true,
  },
  {
    name: 'Tsinghua University',
    city: 'Beijing',
    logo: '/university-logos/tsinghua.png',
    to: `/university/${encodeURIComponent('Tsinghua University')}`,
  },
  {
    name: 'Peking University',
    city: 'Beijing',
    logo: '/university-logos/peking.svg',
    to: `/university/${encodeURIComponent('Peking University')}`,
    showWordmark: true,
    chineseName: '北京大学',
  },
  {
    name: 'Fudan University',
    city: 'Shanghai',
    logo: '/university-logos/fudan.svg',
    to: `/university/${encodeURIComponent('Fudan University')}`,
    showWordmark: true,
    chineseName: '复旦大学',
  },
];

const ROW_TWO_UNIVERSITIES: PartnerUniversityItem[] = [
  {
    name: 'Shanghai Jiao Tong University',
    city: 'Shanghai',
    logo: '/university-logos/sjtu.png',
    to: `/university/${encodeURIComponent('Shanghai Jiao Tong University')}`,
  },
  {
    name: 'East China Normal University',
    city: 'Shanghai',
    logo: '/university-logos/ecnu-alt.svg',
    to: `/university/${encodeURIComponent('East China Normal University')}`,
  },
  {
    name: 'Harbin Institute of Technology',
    city: 'Harbin',
    logo: '/university-logos/hit.png',
    to: `/university/${encodeURIComponent('Harbin Institute of Technology')}`,
    monochromeDark: true,
  },
  {
    name: 'Wuhan University',
    city: 'Wuhan',
    logo: '/university-logos/wuhan.png',
    to: '/contact',
    state: { university: 'Wuhan University' },
  },
  {
    name: 'Huazhong University of Science and Technology',
    city: 'Wuhan',
    logo: '/university-logos/hust.png',
    to: '/contact',
    state: { university: 'Huazhong University of Science and Technology' },
  },
  {
    name: 'Sichuan University',
    city: 'Chengdu',
    logo: '/university-logos/sichuan.png',
    to: '/contact',
    state: { university: 'Sichuan University' },
  },
  {
    name: 'Nanjing University',
    city: 'Nanjing',
    logo: '/university-logos/nju.png',
    to: '/contact',
    state: { university: 'Nanjing University' },
    monochromeDark: true,
  },
];

const UniversityLogoCard: React.FC<{ uni: PartnerUniversityItem }> = ({ uni }) => {
  return (
    <Link
      to={uni.to}
      state={uni.state}
      title={`${uni.name} (${uni.city})`}
      className="group/logo shrink-0 flex items-center justify-center px-5 py-3.5 rounded-2xl bg-white border border-slate-200/70 shadow-xs hover:shadow-lg hover:border-red-200 hover:-translate-y-0.5 transition-all duration-300"
    >
      {uni.showWordmark ? (
        <div className="flex items-center gap-3">
          <img
            src={uni.logo}
            alt={uni.name}
            loading="lazy"
            className="h-10 sm:h-11 w-auto object-contain transition-transform duration-300 group-hover/logo:scale-105"
          />
          <div className="text-left leading-tight">
            {uni.chineseName && (
              <span className="block text-sm font-bold text-[#1d1d1f] tracking-wide">
                {uni.chineseName}
              </span>
            )}
            <span className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">
              {uni.name}
            </span>
          </div>
        </div>
      ) : (
        <div
          className={`flex items-center justify-center ${
            uni.darkBackdrop ? 'bg-[#1d1d1f] px-3.5 py-2 rounded-xl' : ''
          }`}
        >
          <img
            src={uni.logo}
            alt={uni.name}
            loading="lazy"
            className={`h-10 sm:h-11 max-w-[190px] w-auto object-contain transition-transform duration-300 group-hover/logo:scale-105 ${
              uni.monochromeDark ? 'brightness-0 opacity-85' : ''
            }`}
          />
        </div>
      )}
    </Link>
  );
};

export default function PartnerUniversitiesMarquee() {
  return (
    <section className="py-20 bg-white border-t border-slate-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200/80 text-red-700 text-xs font-bold uppercase tracking-wider mb-3">
              <Building2 className="w-3.5 h-3.5 text-red-600" />
              <span>Official Chinese University Network</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1d1d1f] tracking-tight">
              Partner Universities Across China
            </h2>
            <p className="text-[#5a5a5c] text-base sm:text-lg mt-2 max-w-2xl">
              Direct admissions ties with premier C9 League, Double First-Class, and Hangzhou Higher Education Zone institutions.
            </p>
          </div>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 text-sm font-bold text-red-600 hover:text-red-700 transition-colors shrink-0 group"
          >
            <span>Apply to Partner Universities</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Dual-Row Opposing Infinite Marquee */}
      <div className="max-w-[1440px] mx-auto">
        {/* Row 1: Left-to-Right / Forward */}
        <div className="partner-marquee">
          <div className="partner-marquee-list">
            {ROW_ONE_UNIVERSITIES.map((uni) => (
              <UniversityLogoCard key={`r1-a-${uni.name}`} uni={uni} />
            ))}
          </div>
          <div className="partner-marquee-list" aria-hidden="true">
            {ROW_ONE_UNIVERSITIES.map((uni) => (
              <UniversityLogoCard key={`r1-b-${uni.name}`} uni={uni} />
            ))}
          </div>
        </div>

        {/* Row 2: Reverse Direction */}
        <div className="partner-marquee partner-marquee-reverse mt-8 sm:mt-11">
          <div className="partner-marquee-list">
            {ROW_TWO_UNIVERSITIES.map((uni) => (
              <UniversityLogoCard key={`r2-a-${uni.name}`} uni={uni} />
            ))}
          </div>
          <div className="partner-marquee-list" aria-hidden="true">
            {ROW_TWO_UNIVERSITIES.map((uni) => (
              <UniversityLogoCard key={`r2-b-${uni.name}`} uni={uni} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
