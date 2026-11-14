import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  GraduationCap,
  BookOpen,
  Languages,
  PenTool,
  Award,
  Camera,
  Clock,
  CheckCircle2,
  Circle,
  ArrowRight,
  AlertTriangle,
} from 'lucide-react';

interface RequiredDoc {
  id: string;
  title: string;
  badge?: string;
  badgeVariant?: 'amber' | 'red' | 'slate';
  description: string;
  icon: typeof FileText;
}

const REQUIRED_DOCUMENTS: RequiredDoc[] = [
  {
    id: 'passport-photo-page',
    title: 'Passport photo page',
    badge: 'Mandatory',
    badgeVariant: 'slate',
    description:
      'Clear, full-color scan of your valid passport bio/photo page (ensure at least 6–12 months of remaining validity).',
    icon: FileText,
  },
  {
    id: 'highest-diploma',
    title: 'Highest diploma / expected graduation letter',
    badge: 'Academic',
    badgeVariant: 'slate',
    description:
      'Notarized copy of your highest completed diploma or degree certificate, or an official expected graduation letter if still completing your final year.',
    icon: GraduationCap,
  },
  {
    id: 'academic-transcripts',
    title: 'Full academic transcripts',
    badge: 'Academic',
    badgeVariant: 'slate',
    description:
      'Complete official academic transcripts covering all semesters and subjects from your highest completed or current study level.',
    icon: BookOpen,
  },
  {
    id: 'language-certificate',
    title: 'Language certificate',
    badge: 'HSK / IELTS',
    badgeVariant: 'amber',
    description:
      'Valid HSK certificate for Chinese-taught programs, or IELTS / TOEFL / English-medium instruction proof for English-taught degrees.',
    icon: Languages,
  },
  {
    id: 'personal-statement',
    title: 'Personal Statement / Study Plan',
    badge: 'Written',
    badgeVariant: 'slate',
    description:
      'A structured personal motivation statement or study/research plan detailing your academic background and goals in China.',
    icon: PenTool,
  },
  {
    id: 'csca-score-report',
    title: 'CSCA score report',
    badge: 'ONLY bachelor',
    badgeVariant: 'red',
    description:
      'Official CSCA examination score report. Required exclusively for Bachelor’s degree applicants.',
    icon: Award,
  },
  {
    id: 'passport-photos',
    title: 'Passport-sized photos',
    badge: 'White Background',
    badgeVariant: 'slate',
    description:
      'Recent high-resolution, white-background passport-sized color photographs matching official university and visa specifications.',
    icon: Camera,
  },
];

interface RequiredDocumentsProps {
  compact?: boolean;
}

export default function RequiredDocuments({ compact = false }: RequiredDocumentsProps) {
  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem('nihaoedu_required_docs');
      if (saved) {
        setCheckedIds(JSON.parse(saved));
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  const toggleDoc = (id: string) => {
    setCheckedIds((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('nihaoedu_required_docs', JSON.stringify(next));
      } catch {
        // ignore storage errors
      }
      return next;
    });
  };

  const readyCount = REQUIRED_DOCUMENTS.filter((doc) => checkedIds[doc.id]).length;

  return (
    <div
      id="required-documents"
      className={`bg-white rounded-[2.25rem] border border-slate-200/90 shadow-[0_14px_45px_rgba(15,23,42,0.05)] overflow-hidden ${
        compact ? 'p-6 sm:p-8' : 'p-7 sm:p-10 md:p-12'
      }`}
    >
      {/* Header Row */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-7 mb-8 border-b border-slate-200/80">
        <div>
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-50 border border-red-200/80 text-red-700 text-xs font-extrabold uppercase tracking-wider mb-3">
            <FileText className="w-3.5 h-3.5" />
            University Application Checklist
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1d1d1f] tracking-tight">
            Required Documents to Apply
          </h3>
          <p className="text-sm sm:text-base text-[#5a5a5c] mt-2 max-w-2xl leading-relaxed">
            Prepare these core documents before submitting your university or scholarship application. Click any item to track your readiness.
          </p>
        </div>

        <div className="shrink-0 flex items-center gap-3 bg-[#f8fafc] border border-slate-200/80 px-4 py-2.5 rounded-2xl">
          <div className="text-right">
            <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Documents Ready
            </span>
            <span className="text-lg font-extrabold text-[#1d1d1f]">
              {readyCount} / {REQUIRED_DOCUMENTS.length}
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 text-red-600 flex items-center justify-center font-bold text-xs">
            {Math.round((readyCount / REQUIRED_DOCUMENTS.length) * 100)}%
          </div>
        </div>
      </div>

      {/* Document Cards Grid */}
      <div className={`grid grid-cols-1 ${compact ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'} gap-4 mb-8`}>
        {REQUIRED_DOCUMENTS.map((doc, idx) => {
          const Icon = doc.icon;
          const isChecked = Boolean(checkedIds[doc.id]);

          const badgeClasses =
            doc.badgeVariant === 'red'
              ? 'bg-red-100 text-red-700 border-red-200'
              : doc.badgeVariant === 'amber'
              ? 'bg-amber-100 text-amber-800 border-amber-200'
              : 'bg-slate-100 text-slate-700 border-slate-200';

          return (
            <button
              key={doc.id}
              type="button"
              onClick={() => toggleDoc(doc.id)}
              className={`text-left rounded-2xl p-5 border transition-all duration-200 flex flex-col justify-between group cursor-pointer ${
                isChecked
                  ? 'bg-emerald-50/40 border-emerald-300 shadow-xs'
                  : 'bg-[#f8fafc] border-slate-200/80 hover:bg-white hover:border-red-300 hover:shadow-md'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3.5">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isChecked
                          ? 'bg-emerald-600 text-white'
                          : 'bg-white border border-slate-200/80 text-red-600 group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-400">
                      0{idx + 1}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {doc.badge && (
                      <span
                        className={`text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${badgeClasses}`}
                      >
                        {doc.badge}
                      </span>
                    )}
                    {isChecked ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-300 group-hover:text-red-400 shrink-0" />
                    )}
                  </div>
                </div>

                <h4
                  className={`text-base font-bold mb-1.5 transition-colors ${
                    isChecked
                      ? 'text-emerald-950'
                      : 'text-[#1d1d1f] group-hover:text-red-700'
                  }`}
                >
                  {doc.title}
                </h4>
                <p className="text-xs sm:text-sm text-[#5a5a5c] leading-relaxed">
                  {doc.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Important Lead-Time Advisory Banner */}
      <div className="rounded-2xl bg-amber-50/90 border border-amber-200/90 p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-200 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-3.5 h-3.5 text-amber-700" />
              <span className="text-xs font-extrabold uppercase tracking-wider text-amber-800">
                Start Preparing Early
              </span>
            </div>
            <p className="text-sm sm:text-base font-semibold text-[#1d1d1f]">
              HSK and scholarship papers take time — gather, translate, and verify your documents well ahead of university deadlines.
            </p>
          </div>
        </div>

        <Link
          to="/contact"
          state={{ message: 'I would like help reviewing my required application documents.' }}
          className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#1d1d1f] hover:bg-red-600 text-white text-xs font-bold shadow-sm transition-all whitespace-nowrap"
        >
          <span>Get Free Document Check</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
