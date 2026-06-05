export interface FaqItem {
  question: string;
  answer: string;
  bullets?: string[];
  painPoint?: string;
}

export interface FaqCategory {
  title: string;
  items: FaqItem[];
}

export const visaFaqsEn: FaqCategory[] = [
  {
    title: "Visa Basics & Eligibility",
    items: [
      {
        question: "What is the crucial difference between X1 and X2 student visas?",
        answer: "The primary distinction lies in your duration of study and the post-arrival requirements:",
        bullets: [
          "X1 Visa (Long-Term): For study programs exceeding 180 days (e.g., full undergraduate, master's or 1-year language courses). It is only valid for 30 days from entry and MUST be converted into a Residence Permit after arrival.",
          "X2 Visa (Short-Term): For programs of 180 days or less (e.g., summer camps, 1-semester exchange). It does not require conversion to a Residence Permit, but typically only permits a single entry, meaning you cannot travel outside mainland China and return without getting a new entry permit."
        ],
        painPoint: "X2 holders often mistakenly travel to Hong Kong or Macau, unaware that crossing those borders counts as 'leaving China' and voids their single-entry visa."
      }
    ]
  },
  {
    title: "Crucial Documents & Common Traps",
    items: [
      {
        question: "What are the common Physical Examination (Medical Check) pitfalls?",
        answer: "The Physical Examination Record for Foreigners is extremely strict, and minor errors will result in immediate rejection by the embassy or require a costly re-run in China:",
        bullets: [
          "The Photo Stamp Trap: Your passport photo MUST be pasted on the form, and the hospital must place their official round stamp directly OVER the photo (with part of the stamp on the photo and part on the paper). No stamp on the photo means a rejected form.",
          "Signatures and Seals: The form must be signed by the examining doctor AND stamped with the hospital's official round seal at the bottom of the second page.",
          "Validity Window: The medical check is only valid for 6 consecutive months. Do not undergo your check-up too early.",
          "Lab Reports: You must carry the complete original lab reports (including original ECG printout, chest X-ray image/report, and blood test analysis for HIV, Syphilis, and Hepatitis B)."
        ],
        painPoint: "Make sure all fields are filled. If a doctor leaves any field blank (e.g., 'X-Ray: Normal' is unchecked), the entire form is incomplete."
      },
      {
        question: "What is the JW201 / JW202 form, and why causes its delay?",
        answer: "The JW201 (for scholarship students) and JW202 (for self-funded students) are official visa applications issued by the Chinese Ministry of Education. Together with your Admission Letter, they are mandatory for visa issuance.",
        bullets: [
          "University Registration: Only the accepting university can generate this form via the official ministerial portal.",
          "Peak Season Bottlenecks: During June to August, the sheer volume of international applicants causes systemic delays. Do not book non-refundable flights until the university confirms the physical dispatch or high-resolution electronic download code of these documents."
        ]
      },
      {
        question: "Is there a financial proof requirement? What are the bank statement rules?",
        answer: "Yes, embassies generally demand proof of sufficient funds to cover your tuition and living costs in China.",
        bullets: [
          "Required Minimum: Usually a minimum equivalent of $2,500 – $3,000 USD for X2 short-term studies, or higher for X1 to cover a full academic year's expenses.",
          "Sponsorship Pitfall: If the bank statement is under your parents' names, you must provide a signed, notarized letter of sponsorship, along with your official birth certificate containing an English translation to prove the relationship."
        ]
      }
    ]
  },
  {
    title: "Post-Arrival Priorities (The 30-Day Clock)",
    items: [
      {
        question: "What happens in the critical first 30 days after arrival for X1 holders?",
        answer: "An X1 visa is only a temporary entry ticket. Within 30 days of landing on Chinese soil, you must complete a multi-step legal process to obtain your Residence Permit:",
        bullets: [
          "24-Hour Police Registration: You must register your temporary address of residence (dormitory or rental apartment) at the local police station (or via an online system) within 24 hours of landing.",
          "Quarantine Verification: Take your physical examination form to the official local Entry-Exit Bureau of Health and Quarantine for authentication or re-tests if some components were skipped.",
          "The PSB Transition: Apply for your Residence Permit at the local Public Security Bureau (PSB). This changes your single-entry 30-day visa into a multiple-entry permit valid for the duration of your academic studies."
        ],
        painPoint: "Failing to convert your X1 visa to a Residence Permit within 30 days results in illegal stay, which carries a fine of 500 RMB per day (up to 10,000 RMB) and potential deportation."
      }
    ]
  }
];

export const visaFaqsZh: FaqCategory[] = [
  {
    title: "签证条款与基础对比",
    items: [
      {
        question: "X1 签证与 X2 学生签证的核心区别是什么？",
        answer: "两者的核心区别在于您的学习期限以及入境后的行政手续：",
        bullets: [
          "X1 签证（长期）：适用于拟在中国学习180天以上的人员（如攻读学位生、1学年语言生）。该签证自入境之日起只有 30 天的有效期，必须在入境后 30 天内转换为“居留许可”。",
          "X2 签证（短期）：适用于在华学习不超过180天的人员（如短期夏令营、单学期交换生）。它不需要转换为居留许可，但通常是单次或两次入境，这意味着您不能在不重新申请签证的情况下往返港澳或前往其他国家。"
        ],
        painPoint: "许多持有 X2 签证的学生因为前往香港或澳门旅游，导致单次入境签证失效，无法再次进入中国内地。"
      }
    ]
  },
  {
    title: "核心材料与常见陷阱",
    items: [
      {
        question: "外国人体格检查表（体检）最容易被拒的雷区有哪些？",
        answer: "由于《外国人体格检查表》的审查极其严格，轻微的疏忽都会导致使领馆拒绝受理或要求您入境后高价重做体检：",
        bullets: [
          "照片骑缝章雷区：体检表第一页必须贴护照标准照片，医院必须将公章直接盖在照片边缘（即一半盖在照片上，一半盖在纸张上）。照片上无医院公章的体检表属于无效件。",
          "医生签字与公章：表格第二页底部必须有体检医生的亲笔签名，同时必须加盖体检医院的官方圆形印章。两者缺一不可。",
          "有效期窗口：体检结果从签发之日起仅 6 个月有效。不要过早进行体检，以免到使馆时已过期。",
          "附带原始报告：递交时必须携带完整的原始检查单，包括心电图原始图纸、胸部X光拍片报告、以及艾滋、梅毒、乙肝等血检化验单。"
        ],
        painPoint: "体检表的每个检查选项都必须有结论。如果医生漏填或漏勾选任何一项（例如漏选“胸部X线：正常”），该表在使领馆及入境处将被视为无效材料。"
      },
      {
        question: "什么是 JW201 / JW202 表？为什么该表经常面临延迟？",
        answer: "JW201表（政府奖学金生）和JW202表（自费生）是中国教育部和高校系统签发的国际学生签证申请表，与《录取通知书》共同构成申请学生签证的法定必备材料。",
        bullets: [
          "学校在线申报：这两个表格无法由个人办理，只能由您录取的中国高校在教育部全国涉外信息化平台进行统一申报。",
          "暑期集中处理瓶颈：由于六月至八月是中国高校集中录取的最高峰，教育部门和高校的审批寄送量巨大。请务必在拿到纸质材料或官方高画质电子下载码之后，再行预订机票。"
        ]
      },
      {
        question: "申请签证需要银行存款证明吗？有什么具体规则？",
        answer: "是的，大多数国家的中国使领馆都需要学生提供足够的资金证明，以保证在华学费及基本生活无忧。",
        bullets: [
          "最低金额要求：短期 X2 学习通常需要相当于 2,500 – 3,000 美元的存款证明；长期 X1 则可能需要更高，用以证明能够支付首年总学费和基本生活开销。",
          "直系亲属担保：若存款证明开在父母名下，必须额外提供由父母签署并经过公证的资金担保信，以及能够界定亲子关系的出生医学证明（需附英文翻译）。"
        ]
      }
    ]
  },
  {
    title: "入境后核心事项（30天倒计时）",
    items: [
      {
        question: "X1 签证持有者入境后 30 天内有哪些至关重要的法律规定？",
        answer: "X1 签证本身只是一个临时的入境凭证（有效期仅为30天）。自您抵达中国之日起，必须在 30 天内完成以下一整套法律手续转换为长期居留许可：",
        bullets: [
          "24小时住宿登记：无论是住在学校宿舍还是校外租房，到达中国后的 24 小时内，您必须向居住地派出所进行临时住宿登记申报。",
          "体检验证报批：带上您的原始体检表，前往当地的出入境检验检疫局进行验证盖章，如原表不合规，需在当地进行部分重新体检。",
          "公安局居留许可转换：将所有合规材料（含JW表、通知书、体检报告、登记表等）递交至当地公安局出入境管理局，申请将 30 天的 X1 签证转换为能多次往返的、与学制同期的“学习类居留许可”。"
        ],
        painPoint: "若未能在 30 天内成功转换为居留许可，将构成“非法居留”事实，面临每日 500 元人民币（最高 10,000 元）的罚款，甚至有可能面临遣送回国和信用抹黑。"
      }
    ]
  }
];
