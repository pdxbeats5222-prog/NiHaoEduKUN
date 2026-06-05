import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Circle, Clock, Info, ShieldCheck, RefreshCw, Layers, Sparkles, Download, DownloadCloud, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface DocumentItem {
  id: string;
  titleEn: string;
  titleZh: string;
  categoryEn: string;
  categoryZh: string;
  descEn: string;
  descZh: string;
  requiredFor: 'X1' | 'X2' | 'Both';
  criticalTipEn: string;
  criticalTipZh: string;
  links?: { labelEn: string; labelZh: string; url: string }[];
}

const CHECKLIST_ITEMS: DocumentItem[] = [
  {
    id: 'passport',
    titleEn: 'Original Passport',
    titleZh: '护照原件',
    categoryEn: 'Identity',
    categoryZh: '身份证明',
    descEn: 'Must have at least 6 months of remaining validity and at least two blank visa pages. A photocopy of the passport photo page is also required.',
    descZh: '有效期需在6个月以上，且至少有两页空白签证页。另需准备护照照片页的清晰复印件。',
    requiredFor: 'Both',
    criticalTipEn: 'Ensure any previous Chinese visas in old passports are brought along if applicable.',
    criticalTipZh: '若有旧护照且曾获得过中国签证，需一同携带。'
  },
  {
    id: 'admission-letter',
    titleEn: 'Official Admission Letter',
    titleZh: '学校录取通知书',
    categoryEn: 'Academic Admissions',
    categoryZh: '学校录取材料',
    descEn: 'The original Admission Letter issued directly by your host university in China.',
    descZh: '由录取的中国境内高校签发的《录取通知书》正本原件。',
    requiredFor: 'Both',
    criticalTipEn: 'Embassies will not accept digital scan printouts unless your university is part of an official digital-verify pilot.',
    criticalTipZh: '除部分开通官方电子化验证试点的高校外，使领馆一般仅接受纸质原件。'
  },
  {
    id: 'jw-form',
    titleEn: 'JW202 / JW201 Form',
    titleZh: 'JW202 / JW201 签证表',
    categoryEn: 'Official Visa Authorization',
    categoryZh: '官方签证授权件',
    descEn: 'The official Visa Application Form for Foreign Students to China. JW201 is for government scholarships, and JW202 is for self-funded students.',
    descZh: '《外国留学人员来华签证申请表》。JW201 适用于公派奖学金生，JW202 适用于自费和校级外事录取生。',
    requiredFor: 'Both',
    criticalTipEn: 'Check that your name and passport number on the JW form match your current passport exactly down to middle names.',
    criticalTipZh: '仔细核对表上的姓名拼写、护照号码是否与现有护照完全一致，差一个字母即属废件。',
    links: [
      {
        labelEn: 'Check JW202 Digital Inquiries (Ch正面)',
        labelZh: '教育部留学服务中心JW表电子查询',
        url: 'https://www.cscse.edu.cn/'
      }
    ]
  },
  {
    id: 'cova-form',
    titleEn: 'Visa Application Form (COVA Confirmation)',
    titleZh: '中国签证在线填表确认页与表格 (COVA)',
    categoryEn: 'Identity',
    categoryZh: '身份证明',
    descEn: 'Complete the China Online Visa Application form, upload a digital photo matching Chinese visa specs, sign the confirmation page and print the entire pack.',
    descZh: '在线完成中国签证申请（COVA），上传符合标准的电子照片，打印出完整的申请表包并在确认页手写签名。',
    requiredFor: 'Both',
    criticalTipEn: 'All details in COVA must be fully declared. "Not Applicable" cannot be used to bypass critical fields.',
    criticalTipZh: '所有字段必须如实、详细填写。在填写家庭成员或工作经历时，不得漏掉或随意填写。'
  },
  {
    id: 'photo',
    titleEn: 'Physical Visa Photos',
    titleZh: '纸质证件照',
    categoryEn: 'Identity',
    categoryZh: '身份证明',
    descEn: 'Two physical, passport-sized color photos. Must be taken within the last 6 months, white background, no hat/jewelry, ears showing clearly.',
    descZh: '两张纸质近期（6个月内）白底彩色证件照。免冠、非反光眼镜、露出双耳、无首饰和阴影。',
    requiredFor: 'Both',
    criticalTipEn: 'The size must strictly comply with Chinese visa standards (33mm width x 48mm height). Standard global formats can be rejected.',
    criticalTipZh: '规格必须严格符合中国签证照片标准（宽33mm，高48mm），一般的美式或欧式标准照片会被拒收。'
  },
  {
    id: 'physical-exam',
    titleEn: 'Physical Examination Form',
    titleZh: '外国人体格检查表',
    categoryEn: 'Health Records',
    categoryZh: '医疗健康记录',
    descEn: 'The official pre-travel health report signed by a physician, with an official hospital stamp overlaid over your photo and test reports attached.',
    descZh: '由执业医生签署并盖章的体检报告。医院必须在第一页照片处盖上骑缝章，并在第二页底端盖公章。',
    requiredFor: 'X1',
    criticalTipEn: 'Must include complete checkups, an ECG printout, a chest X-Ray report, and official lab tests for HIV, Syphilis, and Hepatitis B.',
    criticalTipZh: '必须附带心电图原始图谱、胸透X光报告、以及艾滋、梅毒、乙肝的血液化验单原件。',
    links: [
      {
        labelEn: 'Download Physical Exam Form (PDF)',
        labelZh: '下载《外国人体格检查表》PDF范本',
        url: 'https://www.visaforchina.cn/ROM2_EN/upload/Attach/mrt_en.pdf'
      }
    ]
  },
  {
    id: 'financial-proof',
    titleEn: 'Proof of Funds (Bank Statement)',
    titleZh: '资金证明（银行流水）',
    categoryEn: 'Financial Support',
    categoryZh: '资金担保',
    descEn: 'A certified bank statement demonstrating sufficient funds to support your studies. Generally, embassies require $2,500 - $3,000 USD minimum depending on the location.',
    descZh: '经银行认证盖模的存款证明或流水。一般使领馆要求余额不低于2,500至3,000美元（或等额本地货币）。',
    requiredFor: 'Both',
    criticalTipEn: 'If using a parents name, you must provide a signed sponsor letter and an original/certified birth certificate proving parentage.',
    criticalTipZh: '若存款在父母名下，必须格外准备手写的资金担保书，以及出生证明原件（需有英文翻译件）。'
  },
  {
    id: 'highest-diploma',
    titleEn: 'Highest Academic Certificate',
    titleZh: '最高学历/毕业证书',
    categoryEn: 'Academic Admissions',
    categoryZh: '学校录取材料',
    descEn: 'The original graduating diploma, degree certificate, or high school graduation document, plus a photocopied sheet.',
    descZh: '学生持有的最高学历证书（毕业证、学位证原件）以及复印件。',
    requiredFor: 'Both',
    criticalTipEn: 'If in any language other than English or Chinese, it must be officially translated and certified.',
    criticalTipZh: '若原件为非中英文的其他语种，需附上经公证处翻译的标准中/英文翻译件。'
  }
];

type ItemStatus = 'pending' | 'in_progress' | 'completed';

export default function VisaChecklist() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'en';
  const isZh = currentLang.startsWith('zh');

  const [visaType, setVisaType] = useState<'X1' | 'X2'>('X1');
  const [statuses, setStatuses] = useState<Record<string, ItemStatus>>({});
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [activeInfoId, setActiveInfoId] = useState<string | null>(null);

  // Load from LocalStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('nihaoedu_visa_checklist');
      if (saved) {
        setStatuses(JSON.parse(saved));
      } else {
        // Init default statuses
        const initial: Record<string, ItemStatus> = {};
        CHECKLIST_ITEMS.forEach(item => {
          initial[item.id] = 'pending';
        });
        setStatuses(initial);
      }
    } catch (e) {
      console.error('Error loading checklist state:', e);
    }
  }, []);

  // Save to LocalStorage whenever status updates
  const updateStatus = (itemId: string, newStatus: ItemStatus) => {
    const updated = { ...statuses, [itemId]: newStatus };
    setStatuses(updated);
    try {
      localStorage.setItem('nihaoedu_visa_checklist', JSON.stringify(updated));
    } catch (e) {
      console.error('Error saving checklist state:', e);
    }
  };

  const resetChecklist = () => {
    if (window.confirm(isZh ? '确定要重置所有收集进度吗？' : 'Are you sure you want to reset all document collection progress?')) {
      const initial: Record<string, ItemStatus> = {};
      CHECKLIST_ITEMS.forEach(item => {
        initial[item.id] = 'pending';
      });
      setStatuses(initial);
      localStorage.setItem('nihaoedu_visa_checklist', JSON.stringify(initial));
    }
  };

  const selectAll = () => {
    const updated: Record<string, ItemStatus> = {};
    filteredItems.forEach(item => {
      updated[item.id] = 'completed';
    });
    setStatuses(prev => ({ ...prev, ...updated }));
    localStorage.setItem('nihaoedu_visa_checklist', JSON.stringify({ ...statuses, ...updated }));
  };

  // Filter items matching active visa type
  const activeItems = CHECKLIST_ITEMS.filter(item => {
    if (item.requiredFor === 'Both') return true;
    return item.requiredFor === visaType;
  });

  // Unique categories of active items
  const categories = ['All', ...Array.from(new Set(activeItems.map(item => isZh ? item.categoryZh : item.categoryEn)))];

  // Apply visual category filters
  const filteredItems = activeItems.filter(item => {
    if (filterCategory === 'All') return true;
    const cat = isZh ? item.categoryZh : item.categoryEn;
    return cat === filterCategory;
  });

  // Calculate Progress percentages
  const totalCount = activeItems.length;
  const completedCount = activeItems.filter(item => statuses[item.id] === 'completed').length;
  const inProgressCount = activeItems.filter(item => statuses[item.id] === 'in_progress').length;
  const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div id="visa-checklist-tool" className="bg-white rounded-[2.5rem] border border-gray-150 shadow-[0_24px_64px_rgba(0,0,0,0.04)] overflow-hidden">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-[#1d1d1f] to-[#2c2c2e] p-8 md:p-12 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-60 h-60 bg-yellow-500/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl">
          <div className="flex items-center gap-2 text-orange-400 font-bold uppercase tracking-wider text-xs mb-4">
            <Sparkles className="w-4 h-4 text-orange-400 animate-spin" style={{ animationDuration: '4s' }} />
            <span>{isZh ? '交互式学生签证工具' : 'Interactive Student Visa Helper'}</span>
          </div>
          <h3 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            {isZh ? '来华留学生签证材料进度表' : 'China Student Visa Document Checklist'}
          </h3>
          <p className="text-[#a1a1a6] text-base md:text-lg max-w-2xl leading-relaxed">
            {isZh 
              ? '使用我们的工具，针对使领馆拒签主要雷区设计！交互式勾选你的材料，离成功赴华一步之遥。' 
              : 'Interactive tool crafted in standard templates targeting official embassy audit policies. Pinpoint checklist for flawless document submissions.'}
          </p>

          {/* Visa Type Selector buttons */}
          <div className="mt-8 flex flex-wrap gap-4 items-center">
            <span className="text-sm font-semibold text-gray-300">
              {isZh ? '选择你的签证类型:' : 'Your Visa Duration:'}
            </span>
            <div className="bg-white/10 p-1 rounded-2xl flex border border-white/10">
              <button 
                onClick={() => { setVisaType('X1'); setFilterCategory('All'); }}
                className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 cursor-pointer ${
                  visaType === 'X1' 
                    ? 'bg-amber-500 text-[#1d1d1f] shadow-lg shadow-amber-500/15' 
                    : 'text-white hover:bg-white/5'
                }`}
              >
                <span>X1 {isZh ? '签证' : 'Visa'}</span>
                <span className="text-[10px] uppercase font-black px-1.5 py-0.5 rounded bg-black/20">
                  {isZh ? '长于180天' : '&gt; 180 Days'}
                </span>
              </button>
              <button 
                onClick={() => { setVisaType('X2'); setFilterCategory('All'); }}
                className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 cursor-pointer ${
                  visaType === 'X2' 
                    ? 'bg-amber-500 text-[#1d1d1f] shadow-lg shadow-amber-500/15' 
                    : 'text-white hover:bg-white/5'
                }`}
              >
                <span>X2 {isZh ? '签证' : 'Visa'}</span>
                <span className="text-[10px] uppercase font-black px-1.5 py-0.5 rounded bg-black/20">
                  {isZh ? '180天以内' : '&le; 180 Days'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Monitor Board */}
      <div className="bg-gray-50 border-b border-gray-100 p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-8 space-y-3">
          <div className="flex justify-between items-end">
            <div>
              <span className="text-[#86868b] text-xs font-semibold uppercase tracking-wider block mb-1">
                {isZh ? '整体文件收集进度' : 'Overall Collection Status'}
              </span>
              <h4 className="text-xl font-black text-[#1d1d1f] flex items-center gap-2">
                <span>{percent}% {isZh ? '已收集' : 'Completed'}</span>
                <span className="text-sm font-normal text-[#86868b]">
                  ({completedCount} of {totalCount} {isZh ? '项材料已备妥' : 'items secure'})
                </span>
              </h4>
            </div>
            
            {percent === 100 && (
              <motion.div 
                initial={{ scale: 0.8 }} 
                animate={{ scale: [1, 1.1, 1] }} 
                className="bg-green-150 text-green-700 text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1.5 border border-green-200"
              >
                <Check className="w-3.5 h-3.5" />
                <span>{isZh ? '万事具备' : 'Ready to Apply!'}</span>
              </motion.div>
            )}
          </div>

          {/* Progress Bar */}
          <div className="h-3.5 bg-gray-200 rounded-full overflow-hidden flex shadow-inner">
            <motion.div 
              className="bg-gradient-to-r from-orange-500 to-amber-500 h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${percent}%` }}
              transition={{ duration: 0.4 }}
            />
            {inProgressCount > 0 && (
              <motion.div 
                className="bg-amber-300/65 h-full"
                animate={{ width: `${Math.round((inProgressCount / totalCount) * 100)}%` }}
              />
            )}
          </div>

          <div className="flex gap-4 pt-1 text-xs text-[#86868b]">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
              {isZh ? '已备齐' : 'Completed'} ({completedCount})
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-300" />
              {isZh ? '准备中/待加盖' : 'In Progress'} ({inProgressCount})
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-gray-300" />
              {isZh ? '尚未启动' : 'Pending'} ({totalCount - completedCount - inProgressCount})
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="md:col-span-4 flex flex-wrap md:flex-col lg:flex-row gap-3 justify-end items-stretch">
          <button 
            onClick={selectAll}
            className="flex-1 lg:flex-none px-4 py-3 bg-white text-gray-700 text-sm font-bold border border-gray-200 rounded-xl hover:bg-gray-50 flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-colors"
          >
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            <span>{isZh ? '一键备齐' : 'Mark All'}</span>
          </button>
          
          <button 
            onClick={resetChecklist}
            className="flex-1 lg:flex-none px-4 py-3 bg-white text-gray-500 hover:text-red-600 text-sm font-semibold border border-gray-200 rounded-xl hover:bg-red-50 hover:border-red-100 flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>{isZh ? '清空重置' : 'Reset'}</span>
          </button>
        </div>
      </div>

      {/* Category Tabs & Filter Header */}
      <div className="px-6 md:px-8 py-5 border-b border-gray-100 bg-white/70 backdrop-blur-sm sticky top-0 z-10 flex flex-wrap gap-2 items-center justify-between">
        <div className="flex gap-2 overflow-x-auto pb-1 max-w-full">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setFilterCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                filterCategory === cat 
                  ? 'bg-[#1d1d1f] text-white shadow-md' 
                  : 'bg-gray-100 text-[#5a5a5c] hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <span className="text-xs font-semibold text-[#86868b] bg-[#f5f5f7] px-2.5 py-1 rounded-full">
          {isZh ? `正筛选: ${filteredItems.length} 件材料` : `Showing: ${filteredItems.length} documents`}
        </span>
      </div>

      {/* Checklist List Section */}
      <div className="divide-y divide-gray-100">
        {filteredItems.map((item, index) => {
          const status = statuses[item.id] || 'pending';
          const isInfoOpen = activeInfoId === item.id;

          return (
            <div 
              key={item.id} 
              className={`p-6 md:p-8 hover:bg-[#faf9f6]/40 transition-colors ${
                status === 'completed' ? 'bg-green-50/10' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Custom Checkbox Status Toggles */}
                <div className="pt-1 flex flex-col items-center gap-1 shrink-0">
                  <button 
                    onClick={() => {
                      if (status === 'pending') updateStatus(item.id, 'in_progress');
                      else if (status === 'in_progress') updateStatus(item.id, 'completed');
                      else updateStatus(item.id, 'pending');
                    }}
                    className="focus:outline-none focus:ring-2 focus:ring-amber-500/40 rounded-full cursor-pointer group"
                    title={isZh ? '单击切换收集状态' : 'Toggle collection status'}
                  >
                    {status === 'completed' ? (
                      <CheckCircle2 className="w-7 h-7 text-green-600 fill-green-50 transition-transform group-hover:scale-110" />
                    ) : status === 'in_progress' ? (
                      <Clock className="w-7 h-7 text-amber-500 transition-transform group-hover:scale-110" />
                    ) : (
                      <Circle className="w-7 h-7 text-gray-300 hover:text-orange-400 hover:border-orange-400 transition-colors transition-transform group-hover:scale-110" />
                    )}
                  </button>
                  <span className="text-[10px] font-black tracking-wider uppercase scale-90">
                    {status === 'completed' ? (
                      <span className="text-green-600 font-bold">{isZh ? '就绪' : 'Done'}</span>
                    ) : status === 'in_progress' ? (
                      <span className="text-amber-600 font-bold">{isZh ? '在办' : 'Wait'}</span>
                    ) : (
                      <span className="text-gray-400 font-medium">{isZh ? '待办' : 'Todo'}</span>
                    )}
                  </span>
                </div>

                {/* Text Details */}
                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                    <h5 className={`text-lg md:text-xl font-bold ${status === 'completed' ? 'text-[#86868b] line-through decoration-gray-300' : 'text-[#1d1d1f]'}`}>
                      {isZh ? item.titleZh : item.titleEn}
                    </h5>
                    
                    {/* Category Label */}
                    <span className="text-[11px] bg-[#f5f5f7] border border-gray-150 text-[#5a5a5c] px-2.5 py-0.5 rounded-full font-bold">
                      {isZh ? item.categoryZh : item.categoryEn}
                    </span>

                    {/* Visa requirement badge if both */}
                    <span className="text-[10px] bg-amber-50 border border-amber-100 text-amber-800 px-2 rounded-md font-extrabold flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-amber-600" />
                      {item.requiredFor === 'Both' 
                        ? (isZh ? 'X1和X2通用' : 'X1 & X2 Required')
                        : item.requiredFor === 'X1' 
                        ? (isZh ? '仅长期X1必交' : 'X1 Visa Only') 
                        : (isZh ? '仅短期X2必交' : 'X2 Visa Only')}
                    </span>
                  </div>

                  <p className="text-sm md:text-base text-[#5a5a5c] leading-relaxed max-w-4xl">
                    {isZh ? item.descZh : item.descEn}
                  </p>

                  {/* Resource URLs if available */}
                  {item.links && item.links.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {item.links.map((link, lidx) => (
                        <a 
                          key={lidx}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 bg-gray-50 border border-gray-200/80 hover:bg-amber-50 hover:border-amber-200/50 hover:text-amber-700 rounded-lg px-3 py-1.5 text-xs font-bold text-gray-700 transition-all shadow-sm cursor-pointer"
                        >
                          <DownloadCloud className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          <span>{isZh ? link.labelZh : link.labelEn}</span>
                        </a>
                      ))}
                    </div>
                  )}

                  {/* Pain Point Highlight warning (visible on details expanded or always) */}
                  <div className="mt-3 p-4 bg-amber-50/50 rounded-2xl border border-amber-100/60 flex items-start gap-3">
                    <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] uppercase font-black text-amber-700 tracking-wider block mb-0.5">
                        {isZh ? '避坑重点' : 'EMBASSY COMPLIANCE TRAP'}
                      </span>
                      <p className="text-xs md:text-sm text-amber-800 leading-relaxed font-semibold">
                        {isZh ? item.criticalTipZh : item.criticalTipEn}
                      </p>
                    </div>
                  </div>

                  {/* Status Change Buttons directly built in */}
                  <div className="pt-3 flex gap-2">
                    <button 
                      onClick={() => updateStatus(item.id, 'pending')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                        status === 'pending' 
                          ? 'bg-gray-100 text-[#1d1d1f] border-gray-300' 
                          : 'bg-white text-[#86868b] border-gray-100 hover:border-gray-200'
                      }`}
                    >
                      {isZh ? '等候收集' : 'Pending'}
                    </button>
                    <button 
                      onClick={() => updateStatus(item.id, 'in_progress')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                        status === 'in_progress' 
                          ? 'bg-amber-500 text-[#1d1d1f] border-amber-400 shadow-sm' 
                          : 'bg-white text-[#86868b] border-gray-100 hover:border-gray-100 hover:bg-amber-500/10'
                      }`}
                    >
                      {isZh ? '正在办理中' : 'In Progress'}
                    </button>
                    <button 
                      onClick={() => updateStatus(item.id, 'completed')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                        status === 'completed' 
                          ? 'bg-green-600 text-white border-green-600 shadow-sm' 
                          : 'bg-white text-[#86868b] border-gray-100 hover:border-gray-100 hover:bg-green-50'
                      }`}
                    >
                      {isZh ? '已完全备齐' : 'Completed'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer support prompt */}
      <div className="bg-[#faf9f6] p-6 text-center border-t border-gray-100 text-xs md:text-sm text-[#86868b]">
        <span>{isZh ? '⚠️ 本清单依据中国各大驻外使领馆官方签证指导汇编。特定国家和校区可能会有额外附加要求。' : '⚠️ This checklist is compiled under standard embassy filing instructions. Local consulates may have regional differences.'}</span>
      </div>
    </div>
  );
}
