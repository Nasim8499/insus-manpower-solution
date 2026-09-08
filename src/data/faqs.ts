/* ============================================================
   INSUS MANPOWER SOLUTION — Content data layer
   Structured for future CMS / admin integration:
   add / edit / delete / reorder / publish / feature FAQs here.
   ============================================================ */

export const BRAND = {
  name: "INSUS MANPOWER SOLUTION",
  tagline: "YOUR GLOBAL VISA PARTNER •",
  phones: [
    { label: "01577-528992", href: "tel:+8801577528992" },
    { label: "01339-303961", href: "tel:+8801339303961" },
  ],
  email: { label: "nasiddiki1992@gmail.com", href: "mailto:nasiddiki1992@gmail.com" },
};

export const GOV_VERIFY_NOTE =
  "বর্তমান সরকারি নিয়ম অনুযায়ী যাচাই করতে হবে";

export interface Faq {
  id: number;
  category: string;
  question: string;
  shortAnswer: string;
  fullAnswer: string;
  action?: string;
  warning?: string;
  govVerify?: boolean;
  tags: string[];
  steps?: string[];
  checklist?: string[];
  top10?: string[];
  contactCta?: boolean;
  featured?: boolean;
  published?: boolean;
}

export const CATEGORIES: string[] = [
  "যোগ্যতা",
  "চাকরি",
  "Employer",
  "Work Permit",
  "IPA",
  "Documents",
  "Cost",
  "Salary",
  "Medical",
  "Pre-Departure",
  "Travel",
  "Singapore Arrival",
  "Onboarding",
  "Worker Rights",
  "Safety & Scam",
  "Renewal",
  "Agent FAQ",
];

export const FAQS: Faq[] = [
  {
    id: 1,
    category: "চাকরি",
    question: "সিঙ্গাপুরে চাকরির জন্য বাংলাদেশ থেকে কীভাবে যেতে হয়?",
    shortAnswer:
      "প্রথমে একটি বৈধ চাকরির সুযোগ ও Singapore-based employer প্রয়োজন; employer অনুমোদন প্রক্রিয়া সম্পন্ন করলে pre-departure শেষে travel করতে হয়।",
    fullAnswer:
      "বাংলাদেশ থেকে সিঙ্গাপুরে চাকরির জন্য সাধারণত প্রথমে একটি বৈধ চাকরির সুযোগ ও Singapore-based employer প্রয়োজন হয়। Employer-এর প্রয়োজনীয় অনুমোদন, quota/eligibility এবং applicable work pass process অনুযায়ী worker-এর জন্য আবেদন করা হয়। অনুমোদন পাওয়ার পর প্রয়োজনীয় pre-departure formalities সম্পন্ন করে Singapore travel করা হয়।",
    action:
      "বৈধ passport প্রস্তুত রাখুন, লিখিত job offer সংগ্রহ করুন এবং employer-কেন্দ্রিক আবেদন প্রক্রিয়া অনুসরণ করুন।",
    warning:
      "‘সরাসরি ভিসা’ বা employer ছাড়া চাকরির প্রতিশ্রুতি দিলে টাকা দেওয়ার আগে তা যাচাই করুন।",
    tags: ["প্রক্রিয়া", "কাজ", "চাকরি", "ভিসা", "employer", "প্রথম ধাপ", "process", "how to go", "singapore", "সিঙ্গাপুর"],
    published: true,
    featured: true,
  },
  {
    id: 2,
    category: "Work Permit",
    question: "সিঙ্গাপুরে কাজ করতে কি ভিসা লাগে?",
    shortAnswer:
      "হ্যাঁ — tourist entry দিয়ে কাজ করা যায় না; কাজের ধরন ও eligibility অনুযায়ী সঠিক work pass / work permit থাকতে হয়।",
    fullAnswer:
      "Singapore-এ কাজ করার জন্য সাধারণ tourist entry ব্যবহার করে কাজ করা যায় না। কাজের ধরন ও worker-এর eligibility অনুযায়ী Singapore-এর applicable work pass/work permit প্রয়োজন হয়। কোন pass প্রযোজ্য হবে তা employer, job sector, nationality এবং বর্তমান সরকারি নিয়মের ওপর নির্ভর করতে পারে।",
    action:
      "আপনার sector ও job-এর জন্য কোন pass প্রযোজ্য তা employer এবং official government sources থেকে নিশ্চিত করুন।",
    govVerify: true,
    tags: ["ভিসা", "visa", "work permit", "work pass", "tourist", "অনুমতি", "পারমিট", "সিঙ্গাপুর"],
    published: true,
  },
  {
    id: 3,
    category: "Work Permit",
    question: "Work Permit কী?",
    shortAnswer:
      "নির্দিষ্ট eligible foreign worker-দের নির্দিষ্ট employer-এর অধীনে Singapore-এ কাজ করার আইনি work authorization।",
    fullAnswer:
      "Work Permit হলো নির্দিষ্ট eligible foreign workers-এর Singapore-এ নির্দিষ্ট employer-এর অধীনে কাজ করার জন্য ব্যবহৃত work authorization। Worker-এর job sector ও eligibility অনুযায়ী নিয়ম আলাদা হতে পারে।",
    action:
      "আপনার job sector অনুযায়ী প্রযোজ্য pass-এর ধরন ও শর্তগুলো বুঝে নিন।",
    tags: ["work permit", "ওয়ার্ক পারমিট", "পারমিট", "অনুমতি", "what is", "authorization", "ভিসা"],
    published: true,
  },
  {
    id: 4,
    category: "Work Permit",
    question: "Worker নিজে Work Permit-এর আবেদন করতে পারবে?",
    shortAnswer:
      "না — সাধারণ Work Permit প্রক্রিয়ায় Singapore employer বা authorised employment agency আবেদন করে, worker নয়।",
    fullAnswer:
      "সাধারণ Work Permit process-এ Singapore employer বা authorised employment agency আবেদন করে। Worker সাধারণত নিজে employer-এর জায়গায় Work Permit application submit করে না।",
    action:
      "আবেদন কে submit করছে এবং তার authorisation আছে কি না — তা লিখিতভাবে নিশ্চিত করুন।",
    warning:
      "দালালের মাধ্যমে ‘নিজে টাকা দিয়ে permit কেনার’ প্রস্তাবে সাড়া দেবেন না।",
    tags: ["work permit", "আবেদন", "apply", "employer", "agency", "কে আবেদন করে", "পারমিট"],
    published: true,
  },
  {
    id: 5,
    category: "Employer",
    question: "Employer-এর ভূমিকা কী?",
    shortAnswer:
      "Employer job offer, eligibility, quota সংক্রান্ত শর্ত এবং work pass application প্রক্রিয়ার মূল দায়িত্ব পরিচালনা করে।",
    fullAnswer:
      "Employer job offer, workforce requirement, eligibility, quota-related requirements এবং applicable work pass application process-এর গুরুত্বপূর্ণ অংশ পরিচালনা করে। Employer-ই worker-এর employment arrangement-এর মূল পক্ষ।",
    action:
      "Employer-এর পূর্ণ company নাম, registered ঠিকানা ও যোগাযোগের তথ্য লিখিতভাবে সংগ্রহ করুন।",
    tags: ["employer", "ভূমিকা", "দায়িত্ব", "কোম্পানি", "quota", "offer", "নিয়োগকর্তা"],
    published: true,
  },
  {
    id: 6,
    category: "যোগ্যতা",
    question: "বাংলাদেশি Worker কি সিঙ্গাপুরে যেতে পারে?",
    shortAnswer:
      "হ্যাঁ, নির্দিষ্ট work-pass ও sector-related eligibility পূরণ সাপেক্ষে; কোন job ও employer-এর জন্য যোগ্য তা current rules অনুযায়ী দেখতে হবে।",
    fullAnswer:
      "বাংলাদেশি নাগরিকদের জন্য Singapore-এর নির্দিষ্ট work-pass এবং sector-related eligibility rules রয়েছে। কোন job ও employer-এর জন্য eligibility আছে তা বর্তমান সরকারি নিয়ম অনুযায়ী যাচাই করতে হবে।",
    action:
      "আপনার বয়স, কাজের অভিজ্ঞতা, দক্ষতা ও স্বাস্থ্যগত অবস্থা নির্ধারিত vacancy-র সঙ্গে মিলিয়ে দেখুন।",
    govVerify: true,
    tags: ["যোগ্যতা", "বাংলাদেশি", "eligibility", "nationality", "সেক্টর", "পারবো কিনা", "বাংলাদেশ"],
    published: true,
  },
  {
    id: 7,
    category: "Documents",
    question: "সিঙ্গাপুরে যাওয়ার আগে কোন কোন document লাগতে পারে?",
    shortAnswer:
      "Passport, employment/application documents, approval/IPA documentation এবং প্রয়োজনে medical-সহ supporting documents লাগতে পারে।",
    fullAnswer:
      "সাধারণভাবে passport, employment-related documents, application documents, approval/IPA documentation এবং প্রয়োজন অনুযায়ী medical বা অন্যান্য supporting documents প্রয়োজন হতে পারে। Exact document list case অনুযায়ী পরিবর্তিত হতে পারে।",
    action:
      "Employer বা authorised agency-র কাছ থেকে আপনার কেসের জন্য নির্দিষ্ট document checklist লিখিতভাবে নিন।",
    warning:
      "Exact document list প্রতি ক্ষেত্রে ভিন্ন হতে পারে — অনুমানের ওপর নির্ভর না করে তালিকা ধরে কাগজ জমা দিন।",
    tags: ["documents", "ডকুমেন্ট", "কাগজপত্র", "passport", "পাসপোর্ট", "প্রয়োজন", "চেকলিস্ট"],
    published: true,
  },
  {
    id: 8,
    category: "IPA",
    question: "IPA কী?",
    shortAnswer:
      "IPA মানে In-Principle Approval — work pass application-এর approval document; এটি চূড়ান্ত physical work pass card নয়।",
    fullAnswer:
      "IPA অর্থ In-Principle Approval। এটি Work Pass application-এর approval-related document যা worker-এর Singapore employment journey-তে গুরুত্বপূর্ণ। IPA final physical work pass card-এর সমান নয়।",
    action:
      "IPA পেলে এতে থাকা worker-এর নাম, passport number, employer-এর নাম ও occupation মিলিয়ে দেখুন।",
    tags: ["ipa", "approval", "অনুমোদন", "in-principle", "চিঠি", "ভিসা", "work pass"],
    published: true,
    featured: true,
  },
  {
    id: 9,
    category: "IPA",
    question: "IPA পাওয়ার পর কী করতে হয়?",
    shortAnswer:
      "IPA-র সব তথ্য সাবধানে যাচাই করুন এবং document-এ দেওয়া medical, declaration ও entry সংক্রান্ত নির্দেশনা সম্পন্ন করুন।",
    fullAnswer:
      "IPA পাওয়ার পর document-এর তথ্য carefully verify করতে হবে এবং সেখানে দেওয়া instructions অনুযায়ী pre-departure ও entry requirements সম্পন্ন করতে হবে। Passport, employer information এবং approval details মিলিয়ে দেখা উচিত।",
    action:
      "IPA letter-এর checklist অনুযায়ী ধাপে ধাপে এগোন এবং document-এর একটি প্রিন্ট ও ডিজিটাল কপি সঙ্গে রাখুন।",
    warning:
      "কোনো তথ্যে গরমিল পেলে travel করার আগেই employer/agency-কে লিখিতভাবে জানান।",
    tags: ["ipa", "next step", "এর পর কী", "verify", "pre-departure", "নির্দেশনা", "অনুমোদন"],
    published: true,
  },
  {
    id: 10,
    category: "Medical",
    question: "সিঙ্গাপুরে যাওয়ার আগে কি medical examination করতে হয়?",
    shortAnswer:
      "কিছু work-pass category ও circumstance-এ medical প্রয়োজন হতে পারে; কখন ও কোথায় হবে তা applicable requirements ও employer প্রক্রিয়া ঠিক করে।",
    fullAnswer:
      "কিছু work-pass category এবং worker-এর circumstances অনুযায়ী medical examination প্রয়োজন হতে পারে। কখন এবং কোথায় medical করতে হবে তা applicable Singapore requirements এবং employer process অনুযায়ী নির্ধারিত হয়।",
    action:
      "IPA/নির্দেশনা document-এ medical requirement আছে কি না দেখুন এবং নির্দেশিত ফরম্যাট অনুযায়ী পরীক্ষা সম্পন্ন করুন।",
    govVerify: true,
    tags: ["medical", "মেডিকেল", "স্বাস্থ্য", "পরীক্ষা", "doctor", "test", "স্বাস্থ্যপরীক্ষা"],
    published: true,
  },
  {
    id: 11,
    category: "চাকরি",
    question: "সিঙ্গাপুরে যেতে কতদিন সময় লাগে?",
    shortAnswer:
      "নির্দিষ্ট timeline দেওয়া নিরাপদ নয় — employer readiness, documentation, processing, medical ও travel steps-এর ওপর সময় নির্ভর করে।",
    fullAnswer:
      "একটি fixed timeline বলা নিরাপদ নয়। Employer readiness, candidate selection, documentation, application processing, approval, medical, travel arrangements এবং অন্যান্য regulatory steps-এর ওপর timeline নির্ভর করে।",
    action:
      "প্রতিটি stage-এর আপডেট লিখিতভাবে নিন; নির্দিষ্ট তারিখের মৌখিক প্রতিশ্রুতিকে নিশ্চিত ধরে নেবেন না।",
    warning: "Processing time is not guaranteed — প্রক্রিয়ার সময় কখনোই guaranteed নয়।",
    tags: ["সময়", "কতদিন", "কয়দিন", "timeline", "processing", "duration", "date", "তারিখ"],
    published: true,
  },
  {
    id: 12,
    category: "Cost",
    question: "সিঙ্গাপুরে যেতে মোট কত টাকা খরচ হয়?",
    shortAnswer:
      "কোনো universal fixed amount নেই — recruitment, documents, medical, official fees ও travel ভেদে খরচ ভিন্ন হয়; লিখিত breakdown নিন।",
    fullAnswer:
      "একটি universal fixed amount নেই। Recruitment, documentation, medical, government-related fees, travel এবং অন্যান্য legitimate expenses case অনুযায়ী পরিবর্তিত হতে পারে। Worker-কে প্রতিটি payment-এর আগে written cost breakdown ও receipt নিতে হবে।",
    action:
      "প্রতিটি payment-এর আগে আইটেমভিত্তিক written cost breakdown চান এবং প্রতিটি রসিদ যত্নে সংরক্ষণ করুন।",
    warning:
      "কোনো খরচ অননুমোদিত বা অস্বচ্ছ মনে হলে সেই payment তৎক্ষণাৎ বন্ধ রাখুন।",
    tags: ["খরচ", "টাকা", "কত টাকা", "cost", "fee", "money", "payment", "ফি", "ব্যয়"],
    published: true,
    featured: true,
  },
  {
    id: 13,
    category: "Cost",
    question: "সব টাকা কি আগেই দিতে হয়?",
    shortAnswer:
      "না — payment-এর purpose, recipient, receipt ও শর্ত বুঝে stage-ভিত্তিকভাবে দিন; চাপে পুরো টাকা আগে দেবেন না।",
    fullAnswer:
      "না। কোনো payment করার আগে payment-এর purpose, recipient, receipt এবং written terms বুঝে নেওয়া উচিত। “Visa guaranteed” বা “job guaranteed” বলে অস্বাভাবিক advance payment দাবি করলে সতর্ক হতে হবে।",
    action:
      "কোন stage-এ কত দেবেন তার একটি লিখিত payment schedule ঠিক করুন এবং প্রতি কিস্তিতে রসিদ নিন।",
    warning:
      "‘Visa guaranteed’ বা ‘job guaranteed’ বলে অস্বাভাবিক advance দাবি করা scam-এর লক্ষণ।",
    tags: ["খরচ", "টাকা", "advance", "এডভান্স", "payment", "কিস্তি", "scam", "প্রতারণা", "নিরাপত্তা"],
    published: true,
  },
  {
    id: 14,
    category: "Salary",
    question: "Salary কত হতে পারে?",
    shortAnswer:
      "Salary job title, sector, employer, contract ও applicable employment rules অনুযায়ী পরিবর্তিত হয়; লিখিত terms না দেখে কোনো অঙ্ক বিশ্বাস করবেন না।",
    fullAnswer:
      "Salary job title, sector, employer, contract এবং applicable employment rules অনুযায়ী পরিবর্তিত হয়। Worker-এর signed employment terms না দেখে নির্দিষ্ট salary promise করা উচিত নয়।",
    action:
      "মাসিক মূল বেতন, overtime rate, ছুটি ও অন্যান্য সুবিধা লিখিত offer/contract-এ দেখে নিন।",
    tags: ["salary", "বেতন", "কত বেতন", "income", "মাইনে", "টাকা", "অর্থ", "পারিশ্রমিক"],
    published: true,
  },
  {
    id: 15,
    category: "Salary",
    question: "Salary কি contract-এ লেখা থাকবে?",
    shortAnswer:
      "হ্যাঁ — salary ও অন্যান্য employment terms লিখিত documentation-এ থাকা উচিত; ভালোভাবে না বুঝে সই করবেন না।",
    fullAnswer:
      "Employment arrangement অনুযায়ী salary ও অন্যান্য employment terms লিখিত documentation-এ থাকা উচিত। Worker-এর উচিত contract বা offer-related document ভালোভাবে পড়ে বুঝে তারপর সম্মতি দেওয়া।",
    action:
      "চুক্তিতে বেতন, কাজের সময়, overtime, ছুটি ও deduction স্পষ্টভাবে লেখা আছে কি না পড়ে দেখুন।",
    warning:
      "খালি কাগজে বা ভাষা না বুঝে কখনো স্বাক্ষর করবেন না।",
    tags: ["salary", "চুক্তি", "contract", "লিখিত", "বেতন", "terms", "agreement"],
    published: true,
  },
  {
    id: 16,
    category: "Employer",
    question: "Employer কে?",
    shortAnswer:
      "যে Singapore company/entity-র অধীনে আপনি কাজ করবেন — তার legal identity, workplace ও employment terms সম্পর্কে পরিষ্কার ধারণা নিন।",
    fullAnswer:
      "Employer হলো Singapore-এর সেই company/entity যার অধীনে worker কাজ করবে। Worker-এর উচিত employer-এর legal identity, workplace এবং employment terms সম্পর্কে পরিষ্কার ধারণা নেওয়া।",
    action:
      "Company-এর পূর্ণ নাম, কাজের ঠিকানা ও supervisor-এর পরিচিতি সংগ্রহ করে রাখুন।",
    tags: ["employer", "কোম্পানি", "কে", "identity", "workplace", "নিয়োগকর্তা"],
    published: true,
  },
  {
    id: 17,
    category: "Employer",
    question: "Job offer পাওয়ার পর কী কী যাচাই করব?",
    shortAnswer:
      "Employer নাম, job title, workplace, salary, working conditions, accommodation ও work pass সংক্রান্ত তথ্য মিলিয়ে দেখুন।",
    fullAnswer:
      "Employer name, job title, workplace, salary, working conditions, accommodation information, applicable work pass details এবং অন্যান্য contract terms যাচাই করুন।",
    action:
      "অফারের প্রতিটি শর্ত লিখিতভাবে পান; মৌখিক প্রতিশ্রুতিগুলো document-এ যোগ করার অনুরোধ করুন।",
    tags: ["offer", "যাচাই", "job title", "salary", "accommodation", "চেক", "verify", "শর্ত"],
    published: true,
  },
  {
    id: 18,
    category: "Agent FAQ",
    question: "Recruitment Agent কী কাজ করে?",
    shortAnswer:
      "Agent candidate sourcing, communication, documentation coordination ও employer সংক্রান্ত recruitment প্রক্রিয়ায় সহায়তা করে — কিন্তু approval দিতে পারে না।",
    fullAnswer:
      "Recruitment agent candidate sourcing, communication, documentation coordination এবং employer-related recruitment process-এ সহায়তা করতে পারে। তবে agent-এর role employer বা Singapore authority-এর approval-এর বিকল্প নয়।",
    action:
      "Agent-এর সুনির্দিষ্ট সেবা, ফি-এর খাতসমূহ এবং রেজিস্ট্রেশন/লাইসেন্স তথ্য লিখিতভাবে যাচাই করুন।",
    warning:
      "Agent-এর ভূমিকা employer বা Singapore authority-এর approval সিদ্ধান্তের বিকল্প নয়।",
    tags: ["agent", "এজেন্ট", "দালাল", "recruitment", "ভূমিকা", "role", "license", "রেজিস্ট্রেশন"],
    published: true,
  },
  {
    id: 19,
    category: "Agent FAQ",
    question: "Agent-এর কথা কি সবসময় বিশ্বাস করা উচিত?",
    shortAnswer:
      "না — গুরুত্বপূর্ণ immigration ও employment তথ্য official government sources এবং লিখিত documents দিয়ে cross-check করুন।",
    fullAnswer:
      "কোনো intermediary-এর কথাকে একমাত্র source হিসেবে ব্যবহার করবেন না। Important immigration এবং employment information official government sources ও written documents দিয়ে cross-check করুন।",
    action:
      "বেতন, work pass ও IPA সংক্রান্ত দাবিগুলো সরকারি চ্যানেল ও মূল document দিয়ে মিলিয়ে দেখুন।",
    warning:
      "শুধু WhatsApp screenshot বা মৌখিক কথাকে প্রমাণ হিসেবে গ্রহণ করবেন না।",
    tags: ["agent", "বিশ্বাস", "cross-check", "verify", "মিথ্যা", "এজেন্ট", "whatsapp"],
    published: true,
  },
  {
    id: 20,
    category: "Documents",
    question: "সিঙ্গাপুরে যাওয়ার আগে contract কেন গুরুত্বপূর্ণ?",
    shortAnswer:
      "চুক্তিতেই job, salary, working conditions ও সুবিধা লেখা থাকে — এটাই আপনার মূল reference document; না বুঝে সই করবেন না।",
    fullAnswer:
      "Contract worker-এর job, salary, working conditions এবং অন্যান্য employment terms বোঝার জন্য গুরুত্বপূর্ণ। না বুঝে কোনো document sign করা উচিত নয়।",
    action:
      "চুক্তি ধীরে ধীরে পড়ুন, প্রয়োজনে বোধগম্য ভাষায় অনুবাদ করান এবং স্বাক্ষরিত একটি কপি নিজের কাছে রাখুন।",
    warning:
      "না বুঝে বা খালি কাগজে কোনো document-এ স্বাক্ষর করবেন না।",
    tags: ["contract", "চুক্তি", "agreement", "সই", "শর্ত", "documents", "ডকুমেন্ট"],
    published: true,
  },
  {
    id: 21,
    category: "Documents",
    question: "Passport কতদিন valid থাকা উচিত?",
    shortAnswer:
      "Travel ও work-pass requirements অনুযায়ী passport-এ পর্যাপ্ত validity থাকতে হয়; আবেদনের আগে current validity requirement যাচাই করুন।",
    fullAnswer:
      "Passport validity-এর প্রয়োজনীয়তা travel এবং work-pass requirements-এর সঙ্গে সম্পর্কিত হতে পারে। Application করার আগে বর্তমান passport validity requirements যাচাই করুন।",
    action:
      "পাসপোর্টে পর্যাপ্ত validity ও খালি page আছে কি না দেখুন; প্রয়োজনে আবেদনের আগেই নবায়ন সম্পন্ন করুন।",
    govVerify: true,
    tags: ["passport", "পাসপোর্ট", "valid", "মেয়াদ", "নবায়ন", "validity", "ডকুমেন্ট"],
    published: true,
  },
  {
    id: 22,
    category: "Travel",
    question: "সিঙ্গাপুর যাওয়ার air ticket কে করবে?",
    shortAnswer:
      "Employer/recruitment arrangement ও employment terms অনুযায়ী এটি ভিন্ন হতে পারে; কে airfare বহন করবে লিখিত চুক্তিতে পরিষ্কার থাকা উচিত।",
    fullAnswer:
      "Travel arrangement employer agreement, recruitment arrangement এবং employment terms অনুযায়ী পরিবর্তিত হতে পারে। কে airfare বহন করবে তা written agreement-এ পরিষ্কার থাকা উচিত।",
    action:
      "টিকিট, রুট ও যাত্রার তারিখ নিশ্চিত হওয়ার আগেই airfare সংক্রান্ত শর্ত লিখিতভাবে নিন।",
    tags: ["ticket", "টিকিট", "বিমান", "travel", "airfare", "যাত্রা", "ভ্রমণ", "ফ্লাইট"],
    published: true,
  },
  {
    id: 23,
    category: "Singapore Arrival",
    question: "সিঙ্গাপুর পৌঁছানোর পর প্রথমে কী হয়?",
    shortAnswer:
      "Immigration entry, employer/representative-এর সঙ্গে coordination, accommodation, medical বা work-pass সংক্রান্ত formalities ও onboarding steps হতে পারে।",
    fullAnswer:
      "Singapore arrival-এর পর immigration entry requirements, employer/appointed representative coordination, accommodation, medical বা work-pass related formalities এবং onboarding steps হতে পারে।",
    action:
      "এয়ারপোর্ট পিক-আপের পরিকল্পনা ও emergency contact আগেই জেনে রাখুন; passport, IPA ও টিকিট হাতের কাছে রাখুন।",
    tags: ["arrival", "পৌঁছানো", "এয়ারপোর্ট", "immigration", "প্রথমে কী", "onboarding", "আগমন", "এন্ট্রি"],
    published: true,
  },
  {
    id: 24,
    category: "Singapore Arrival",
    question: "সিঙ্গাপুর পৌঁছেই কি কাজ শুরু করা যায়?",
    shortAnswer:
      "না — প্রযোজ্য work authorization ও employer-এর required formalities সম্পন্ন হওয়ার আগে কাজ শুরু করা উচিত নয়।",
    fullAnswer:
      "কাজ শুরু করার আগে worker-এর applicable work authorization এবং employer-এর required formalities সম্পন্ন হওয়া জরুরি। Approval বা required work authorization ছাড়া কাজ শুরু করা উচিত নয়।",
    action:
      "কাজ শুরুর তারিখ employer-এর written confirmation ও work pass-এর status দেখে নিশ্চিত করুন।",
    warning:
      "Authorization ছাড়া কাজ করা worker ও employer উভয়ের জন্য গুরুতর আইনি ঝুঁকি তৈরি করে।",
    tags: ["কাজ শুরু", "arrival", "অবৈধ", "illegal", "authorization", "start work", "পৌঁছানো"],
    published: true,
  },
  {
    id: 25,
    category: "Onboarding",
    question: "Work Permit card কীভাবে পাওয়া যায়?",
    shortAnswer:
      "Issuance প্রক্রিয়া (registration, biometric ইত্যাদি) সম্পন্ন হওয়ার পর প্রচলিত পদ্ধতিতে card দেওয়া হয়; employer/agency প্রক্রিয়ায় গাইড করে।",
    fullAnswer:
      "Work Permit issuance process সম্পন্ন হওয়ার পর applicable procedure অনুযায়ী worker-এর work pass/card arrangement করা হয়। Exact procedure current MOM requirements অনুযায়ী follow করতে হবে।",
    action:
      "Card সংগ্রহের appointment ও প্রয়োজনীয় original কাগজের তালিকা আগে থেকে জেনে নিন।",
    govVerify: true,
    tags: ["work permit", "card", "কার্ড", "biometric", "issuance", "রেজিস্ট্রেশন", "onboarding", "পারমিট"],
    published: true,
  },
  {
    id: 26,
    category: "Onboarding",
    question: "Fingerprint বা registration লাগতে পারে?",
    shortAnswer:
      "হ্যাঁ, কিছু work-pass issuance প্রক্রিয়ায় registration/biometric ফরমালিটি থাকতে পারে; employer বা authorised agency-র নির্দেশনা অনুসরণ করুন।",
    fullAnswer:
      "কিছু work-pass issuance process-এ registration বা biometric-related formalities থাকতে পারে। Worker-কে employer/authorised agency-এর instructions অনুসরণ করতে হবে।",
    action:
      "নির্ধারিত সময়ে ও স্থানে সব original document সঙ্গে নিয়ে হাজির হন।",
    tags: ["fingerprint", "বায়োমেট্রিক", "registration", "আঙুলের ছাপ", "card", "রেজিস্ট্রেশন", "onboarding"],
    published: true,
  },
  {
    id: 27,
    category: "Onboarding",
    question: "সিঙ্গাপুরে accommodation কে দেবে?",
    shortAnswer:
      "Employer arrangement, employment terms ও sector-specific requirements-এর ওপর এটি নির্ভর করে; কোথায় থাকবেন ও deduction থাকবে কি না আগেই লিখিতভাবে জেনে নিন।",
    fullAnswer:
      "Accommodation employer arrangement, employment terms এবং sector-specific requirements-এর ওপর নির্ভর করতে পারে। যাওয়ার আগে accommodation কে দেবে এবং কোনো deduction থাকবে কি না তা লিখিতভাবে জেনে নিন।",
    action:
      "থাকার ঠিকানা, রুমে কতজন থাকবেন এবং বেতন থেকে কাটা হবে কি না — লিখিতভাবে নিশ্চিত করুন।",
    tags: ["accommodation", "থাকা", "বাসা", "housing", "deduction", "থাকার জায়গা", "রুম", "onboarding"],
    published: true,
  },
  {
    id: 28,
    category: "Onboarding",
    question: "খাবার ও দৈনন্দিন খরচ কে বহন করবে?",
    shortAnswer:
      "Food, transport ও personal living expenses employment contract/employer policy অনুযায়ী ভিন্ন হয়; এগুলো আগে থেকে পরিষ্কারভাবে জেনে নিন।",
    fullAnswer:
      "খাবার, transport এবং অন্যান্য personal living expenses employment contract বা employer policy অনুযায়ী পরিবর্তিত হতে পারে। এগুলো আগে থেকে পরিষ্কারভাবে জেনে নিন।",
    action:
      "মাসিক আনুমানিক জীবনযাত্রার খরচের হিসাব করুন এবং বেতন থেকে কী কাটা হবে লিখিতভাবে জানুন।",
    tags: ["খাবার", "food", "transport", "খরচ", "দৈনন্দিন", "living cost", "ভাতা", "খাওয়া"],
    published: true,
  },
  {
    id: 29,
    category: "Salary",
    question: "Worker-এর salary থেকে কী কী deduction হতে পারে?",
    shortAnswer:
      "আইনসম্মত deductions Singapore employment regulations ও arrangement-এর ওপর নির্ভর করে; কোনো কাটা না বুঝলে written explanation নিন।",
    fullAnswer:
      "আইনসম্মত deductions-এর বিষয় Singapore employment regulations এবং employment arrangement-এর ওপর নির্ভর করে। Worker-এর উচিত কোনো deduction বুঝতে না পারলে employer-এর কাছ থেকে written explanation নেওয়া।",
    action:
      "প্রতি মাসে payslip সংরক্ষণ করুন এবং বুঝতে না পারা কাটা নিয়ে লিখিতভাবে ব্যাখ্যা চান।",
    warning:
      "অননুমোদিত বা অতিরিক্ত কাটা চোখে পড়লে দেরি না করে লিখিত আপত্তি জানান।",
    tags: ["deduction", "কাটা", "কাটছাঁট", "salary", "payslip", "বেতন", "অর্থ"],
    published: true,
  },
  {
    id: 30,
    category: "Worker Rights",
    question: "Employer salary না দিলে কী করব?",
    shortAnswer:
      "Contract ও salary records রাখুন, প্রথমে employer-কে লিখিতভাবে বিষয়টি জানান; সমাধান না হলে relevant government authority-র official channels ব্যবহার করুন।",
    fullAnswer:
      "প্রথমে employment records, contract এবং salary records সংরক্ষণ করুন এবং employer-এর সঙ্গে বিষয়টি তুলুন। প্রয়োজন হলে Singapore-এর relevant government employment authority-এর official complaint/support channels ব্যবহার করতে হবে।",
    action:
      "প্রতিটি কাজের দিন, overtime ও পাওনার হিসাব লিখে রাখুন; আলোচনা-অনুরোধের রেকর্ড সংরক্ষণ করুন।",
    tags: ["salary", "পাওনা", "অভিযোগ", "complaint", "অধিকার", "rights", "unpaid", "বেতন", "সাহায্য"],
    published: true,
  },
  {
    id: 31,
    category: "Worker Rights",
    question: "Employer কি Worker-এর passport রাখতে পারে?",
    shortAnswer:
      "আপনার passport নিজের কাছে রাখা উচিত; passport জমা দেওয়ার দাবি এলে বর্তমান official rules যাচাই করে তবে ব্যবস্থা নিন।",
    fullAnswer:
      "Passport handling নিয়ে Singapore-এর বর্তমান employment rules গুরুত্বপূর্ণ। Worker-এর passport নিজের কাছে রাখা এবং passport-related কোনো request হলে applicable official rules যাচাই করা উচিত।",
    action:
      "পাসপোর্টের স্ক্যান কপি ও entry সংক্রান্ত কাগজ আলাদা জায়গায় (cloud-সহ) ব্যাকআপ রাখুন।",
    govVerify: true,
    tags: ["passport", "পাসপোর্ট", "রাখা", "অধিকার", "জমা", "document", "rights"],
    published: true,
  },
  {
    id: 32,
    category: "Worker Rights",
    question: "সিঙ্গাপুরে গিয়ে job change করা যাবে?",
    shortAnswer:
      "Work Permit সাধারণত নির্দিষ্ট employer-এর সঙ্গে যুক্ত; নিজের ইচ্ছায় সহজে employer বদলানো যায় না — প্রযোজ্য নিয়ম, নতুন employer প্রক্রিয়া ও approval লাগতে পারে।",
    fullAnswer:
      "Work Permit সাধারণত employer-specific arrangement-এর সঙ্গে যুক্ত। তাই employer change সহজভাবে নিজের ইচ্ছায় করা যায় না; applicable rules, new employer process এবং government approval প্রয়োজন হতে পারে।",
    action:
      "বদলির ইচ্ছা থাকলে আগে current employer ও সম্ভাব্য নতুন employer-পক্ষের সঙ্গে প্রযোজ্য প্রক্রিয়া জেনে নিন।",
    warning:
      "বৈধ অনুমোদন ছাড়া অন্য কোথাও কাজ করা অবৈধ এবং pass বাতিল পর্যন্ত হতে পারে।",
    tags: ["job change", "চাকরি পরিবর্তন", "কোম্পানি বদল", "transfer", "employer", "বদলি", "অধিকার"],
    published: true,
  },
  {
    id: 33,
    category: "Worker Rights",
    question: "Worker চাকরি ছেড়ে দিতে পারবে?",
    shortAnswer:
      "হ্যাঁ, তবে employment termination/resignation চুক্তি ও Singapore employment rules অনুযায়ী পরিচালিত হয়; notice ও termination শর্ত আগে বুঝে নিন।",
    fullAnswer:
      "Employment termination বা resignation contract এবং Singapore employment rules অনুযায়ী পরিচালিত হয়। Worker-এর উচিত নিজের contract-এর notice এবং termination terms বুঝে নেওয়া।",
    action:
      "Notice period, লিখিত নোটিশের মাধ্যম এবং resign করলে pass-এ কী প্রভাব পড়বে — আগেই জেনে রাখুন।",
    tags: ["resign", "ছেড়ে দেওয়া", "ইস্তফা", "notice", "termination", "চাকরি ছাড়া", "অধিকার"],
    published: true,
  },
  {
    id: 34,
    category: "Renewal",
    question: "Work Permit expire হলে কী হয়?",
    shortAnswer:
      "মেয়াদ শেষ হওয়ার আগে renewal বা employment-সম্পর্কিত ব্যবস্থা প্রয়োজন; renewal মূলত employer current MOM requirements অনুযায়ী পরিচালনা করে।",
    fullAnswer:
      "Work Permit expiry-এর আগে renewal বা employment-related ব্যবস্থা প্রয়োজন হতে পারে। Renewal employer-এর responsibility এবং current MOM requirements অনুযায়ী পরিচালিত হতে পারে।",
    action:
      "Permit-এর expiry date নিজেও মনে রাখুন এবং সময়মতো employer-এর সঙ্গে renewal নিয়ে যোগাযোগ করুন।",
    tags: ["renewal", "নবায়ন", "expire", "মেয়াদ", "renew", "শেষ", "কার্ড"],
    published: true,
  },
  {
    id: 35,
    category: "Renewal",
    question: "Work Permit renew হবে কি নিশ্চিত?",
    shortAnswer:
      "না — renewal guaranteed নয়; employer eligibility, quota, sector requirements, worker eligibility ও বর্তমান rules-এর ওপর এটি নির্ভর করে।",
    fullAnswer:
      "না। Renewal guaranteed নয়। Employer eligibility, sector requirements, quota, worker eligibility এবং বর্তমান Singapore rules-এর ওপর renewal নির্ভর করতে পারে।",
    action:
      "Renewal-এর জন্য প্রয়োজনীয় শর্ত (চুক্তি, medical, quota) আগে থেকে জেনে প্রস্তুত থাকুন।",
    warning:
      "‘টাকা দিলে নবায়ন নিশ্চিত’ — এমন দাবি স্ক্যাম হতে পারে; কেউ renewal guarantee দিতে পারে না।",
    tags: ["renewal", "নবায়ন", "guarantee", "quota", "নিশ্চিত", "expire", "গ্যারান্টি"],
    published: true,
  },
  {
    id: 36,
    category: "Renewal",
    question: "Company change করলে নতুন Work Permit লাগবে?",
    shortAnswer:
      "Employer পরিবর্তনের ক্ষেত্রে নতুন work authorization বা applicable transfer procedure প্রয়োজন হতে পারে; current regulations যাচাই করতে হবে।",
    fullAnswer:
      "Employer পরিবর্তনের ক্ষেত্রে নতুন work authorization বা applicable transfer procedure প্রয়োজন হতে পারে। Exact process current Singapore regulations অনুযায়ী যাচাই করতে হবে।",
    action:
      "নতুন employer নিশ্চিত হলে application পদ্ধতি ও সময়সীমা তার সঙ্গে লিখিতভাবে নির্ধারণ করুন।",
    govVerify: true,
    tags: ["transfer", "কোম্পানি", "নতুন permit", "change employer", "বদলি", "renewal", "নবায়ন"],
    published: true,
  },
  {
    id: 37,
    category: "যোগ্যতা",
    question: "পরিবার কি Worker-এর সঙ্গে Singapore যেতে পারবে?",
    shortAnswer:
      "Worker-এর pass ও family member-এর eligibility অনুযায়ী family-related pass rules আলাদা; এটি automatic নয়।",
    fullAnswer:
      "Worker-এর work pass এবং family member-এর eligibility অনুযায়ী family-related pass-এর rules আলাদা হতে পারে। এটি automatic নয় এবং current immigration requirements অনুযায়ী যাচাই করতে হবে।",
    action:
      "আপনার pass-এ family reunification-এর সুযোগ আছে কি না official requirements মিলিয়ে দেখুন।",
    govVerify: true,
    tags: ["family", "পরিবার", "স্ত্রী", "সন্তান", "dependent", "pass", "সঙ্গে", "যোগ্যতা"],
    published: true,
  },
  {
    id: 38,
    category: "Work Permit",
    question: "Tourist visa দিয়ে গিয়ে চাকরি করা যাবে?",
    shortAnswer:
      "না — tourist/short-term visit permission কাজ করার অনুমতি দেয় না; employment-এর জন্য applicable work authorization প্রয়োজন।",
    fullAnswer:
      "না। Tourist/short-term visit permission কাজ করার অনুমতি দেয় না। Employment-এর জন্য applicable work authorization প্রয়োজন।",
    action:
      "কোনো চাকরির কথা থাকলে travel করার আগেই সঠিক work pass নিশ্চিত করুন।",
    warning:
      "‘আগে tourist visa-তে যান, পরে ভিসা হয়ে যাবে’ — এমন পরামর্শ মেনে চলবেন না।",
    tags: ["tourist", "ভিজিট", "visit pass", "অবৈধ", "illegal", "ভিসা", "visa", "work permit"],
    published: true,
  },
  {
    id: 39,
    category: "Safety & Scam",
    question: "“100% Visa Guarantee” বলা হলে কী করব?",
    shortAnswer:
      "এ ধরনের guarantee red flag — কোনো legitimate intermediary approval-এর outcome 100% guarantee করতে পারে না।",
    fullAnswer:
      "এ ধরনের guarantee-কে red flag হিসেবে বিবেচনা করুন। কোনো legitimate intermediary approval-এর outcome 100% guarantee করতে পারে না।",
    action:
      "সঙ্গে সঙ্গে টাকা না দিয়ে দাবিটি official চ্যানেলে যাচাই করুন এবং লিখিত প্রমাণ দেখতে চান।",
    warning:
      "Visa/job guarantee দিয়ে আগাম টাকা চাওয়া প্রতারণার সবচেয়ে সাধারণ কৌশলগুলোর একটি।",
    tags: ["scam", "প্রতারণা", "guarantee", "গ্যারান্টি", "100%", "ভুয়া", "red flag", "নিরাপত্তা", "ভিসা"],
    published: true,
    featured: true,
  },
  {
    id: 40,
    category: "Safety & Scam",
    question: "Fake IPA কীভাবে চিনব?",
    shortAnswer:
      "Worker-এর নাম-বিবরণ, employer তথ্য, pass ধরন ও approval সংক্রান্ত তথ্য মিলিয়ে দেখুন; সন্দেহ হলে official government চ্যানেলে cross-check করুন।",
    fullAnswer:
      "Document-এর নাম, worker details, employer details এবং approval-related information carefully verify করুন। সন্দেহ হলে official Singapore government channels-এর মাধ্যমে information cross-check করুন।",
    action:
      "IPA document টি employer ও official government portal/চ্যানেল — দুই জায়গা থেকেই যাচাই করুন।",
    warning:
      "অসংগত ফরম্যাট, ভুল বানান বা অস্বাভাবিক তথ্য থাকলে document জাল হতে পারে।",
    tags: ["fake ipa", "ভুয়া", "জাল", "document", "verify", "scam", "ক্রসচেক", "ipa", "প্রতারণা"],
    published: true,
  },
  {
    id: 41,
    category: "Safety & Scam",
    question: "Worker কীভাবে বুঝবে তার job সত্যি?",
    shortAnswer:
      "Employer identity, লিখিত employment terms, job location ও work authorization documentation cross-check করুন; শুধু screenshot/মৌখিক কথায় নির্ভর করবেন না।",
    fullAnswer:
      "Employer identity, written employment terms, job location এবং work authorization-related documentation cross-check করুন। শুধু WhatsApp screenshot বা verbal promise-এর ওপর নির্ভর করবেন না।",
    action:
      "ভিডিও কলে workplace দেখতে চান, company registration তথ্য মিলিয়ে দেখুন এবং offer letter-এর কপি সংরক্ষণ করুন।",
    warning:
      "শুধু WhatsApp screenshot বা verbal promise-এর ওপর নির্ভর করবেন না।",
    tags: ["job", "সত্যি", "fake", "ভুয়া চাকরি", "verify", "whatsapp", "scam", "প্রতারণা", "নকল"],
    published: true,
  },
  {
    id: 42,
    category: "Safety & Scam",
    question: "টাকা দেওয়ার সময় কী evidence রাখা উচিত?",
    shortAnswer:
      "Payment receipt, invoice, agreement, transaction record ও payment purpose সংরক্ষণ করুন; cash দিলে signed receipt নিন।",
    fullAnswer:
      "Payment receipt, invoice, agreement, transaction record এবং payment purpose সংরক্ষণ করুন। Cash payment হলে signed receipt নেওয়া উচিত।",
    action:
      "ফোন ব্যাকআপসহ একটি আলাদা ফাইলে সব payment proof সাজিয়ে রাখুন।",
    warning:
      "ব্যক্তিগত account-এ টাকা পাঠাতে চাপ দিলে এবং রসিদ দিতে অস্বীকার করলে সতর্ক হন।",
    tags: ["receipt", "রসিদ", "evidence", "প্রমাণ", "payment", "টাকা", "cash", "ইনভয়েস", "খরচ"],
    published: true,
  },
  {
    id: 43,
    category: "চাকরি",
    question: "Recruitment process-এর status কীভাবে জানা যাবে?",
    shortAnswer:
      "Registration থেকে Job Start পর্যন্ত একটি সুসংগঠিত stage পদ্ধতি রয়েছে; প্রতিটি stage-এর status worker-কে স্পষ্টভাবে জানানো উচিত।",
    fullAnswer:
      "Candidate-এর জন্য একটি structured status system রাখা উচিত — Registration, Document Verification, Job Matching, Employer Interview, Selected, Application, Approval/IPA, Pre-Departure, Travel, Singapore Arrival, Onboarding, Work Authorization এবং Job Start পর্যন্ত। প্রতিটি stage-এর status worker-কে clearly communicate করতে হবে।",
    action:
      "প্রতিটি ধাপের আপডেট লিখিতভাবে নিন এবং পরের ধাপে যাওয়ার আগে নিজের নথিপত্র প্রস্তুত রাখুন।",
    steps: [
      "Registration",
      "Document Verification",
      "Job Matching",
      "Employer Interview",
      "Selected",
      "Application",
      "Approval / IPA",
      "Pre-Departure",
      "Travel",
      "Singapore Arrival",
      "Onboarding",
      "Work Authorization",
      "Job Start",
    ],
    tags: ["status", "stage", "ধাপ", "প্রক্রিয়া", "timeline", "tracking", "অবস্থা", "চাকরি"],
    published: true,
  },
  {
    id: 44,
    category: "চাকরি",
    question: "Interview-তে কী ধরনের প্রশ্ন আসতে পারে?",
    shortAnswer:
      "Job experience, skills, আগের employment, দায়িত্ব, safety awareness, ভাষা দক্ষতা ও position-specific প্রশ্ন আসতে পারে।",
    fullAnswer:
      "Job experience, skills, previous employment, job responsibilities, safety awareness, language ability এবং position-specific questions আসতে পারে। Worker-এর উচিত নিজের actual experience অনুযায়ী উত্তর দেওয়া।",
    action:
      "মিথ্যা অভিজ্ঞতা না বলে প্রকৃত অভিজ্ঞতা সংক্ষেপে ও স্পষ্টভাবে বলার অনুশীলন করুন।",
    tags: ["interview", "ইন্টারভিউ", "প্রশ্ন", "পরীক্ষা", "সাক্ষাৎকার", "চাকরি"],
    published: true,
  },
  {
    id: 45,
    category: "যোগ্যতা",
    question: "কোনো skill না থাকলে কি Singapore job পাওয়া সম্ভব?",
    shortAnswer:
      "Job ও sector অনুযায়ী qualification/experience requirements আলাদা; eligibility নির্ভর করে নির্দিষ্ট vacancy ও employer requirements-এর ওপর।",
    fullAnswer:
      "Job এবং sector অনুযায়ী qualification/experience requirements আলাদা। কোনো candidate-এর eligibility নির্ভর করবে specific vacancy এবং employer requirements-এর ওপর।",
    action:
      "যে কাজগুলো জানেন তার একটি সৎ তালিকা দিন; প্রয়োজনে সংশ্লিষ্ট ট্রেডের মৌলিক প্রশিক্ষণ নিয়ে এগোন।",
    tags: ["skill", "দক্ষতা", "অযোগ্য", "অভিজ্ঞতা", "training", "qualification", "যোগ্যতা"],
    published: true,
  },
  {
    id: 46,
    category: "Pre-Departure",
    question: "বাংলাদেশ থেকে যাওয়ার আগে কী কী প্রস্তুতি নেব?",
    shortAnswer:
      "Passport, employment ও approval documents, emergency contacts, employer/accommodation/travel তথ্য এবং প্রয়োজনীয় personal items প্রস্তুত রাখুন।",
    fullAnswer:
      "Passport, employment documents, approval-related documents, emergency contacts, employer information, accommodation details, travel information এবং প্রয়োজনীয় personal items প্রস্তুত রাখুন।",
    action:
      "নিচের Pre-Departure Checklist ধরে জিনিসপত্র গোছান এবং পরিবারের কাছে সব কাগজের এক সেট কপি রেখে যান।",
    checklist: [
      "বৈধ passport ও তার photocopy / স্ক্যান কপি",
      "IPA / approval letter-এর কপি (ডিজিটাল + প্রিন্ট)",
      "স্বাক্ষরিত employment contract ও offer letter",
      "Medical report ও পাসপোর্ট সাইজের ছবি (প্রয়োজনে)",
      "Air ticket ও যাত্রার বিস্তারিত তথ্য",
      "Employer, agent ও পরিবারের emergency contact নম্বর",
      "প্রয়োজনীয় ব্যক্তিগত ওষুধ, পোশাক ও টেলিফোন",
      "সব কাগজের ডিজিটাল ব্যাকআপ (cloud / email)",
    ],
    tags: ["pre-departure", "প্রস্তুতি", "চেকলিস্ট", "checklist", "যাওয়ার আগে", "গোছানো", "প্রিপারেশন"],
    published: true,
    featured: true,
  },
  {
    id: 47,
    category: "Singapore Arrival",
    question: "সিঙ্গাপুর পৌঁছানোর পর emergency হলে কী করব?",
    shortAnswer:
      "Employer, agent ও local emergency services-এর তথ্য আগে থেকেই সংরক্ষণ করুন; নিজের documents ও contact details-এর ব্যাকআপ রাখুন।",
    fullAnswer:
      "Emergency contact, employer contact এবং relevant Singapore government/emergency services-এর তথ্য আগে থেকেই সংরক্ষণ করুন। Worker-কে নিজের documents ও contact details-এর backup রাখতে হবে।",
    action:
      "জরুরি নম্বরগুলো ফোনে ‘ICE’ (In Case of Emergency) হিসেবে সেভ করুন এবং ডুপ্লিকেট কপি আলাদা রাখুন।",
    tags: ["emergency", "জরুরি", "সাহায্য", "পুলিশ", "ambulance", "contact", "বিপদ", "আগমন"],
    published: true,
  },
  {
    id: 48,
    category: "Agent FAQ",
    question: "INSUS MANPOWER SOLUTION কীভাবে সাহায্য করতে পারে?",
    shortAnswer:
      "Recruitment coordination, candidate communication, documentation guidance ও process-related support — তবে চূড়ান্ত সিদ্ধান্ত authorities ও employer-এর অধীন।",
    fullAnswer:
      "INSUS MANPOWER SOLUTION recruitment journey-এর প্রয়োজনীয় coordination, candidate communication, documentation guidance এবং process-related support দিতে পারে, যেখানে applicable। তবে final approval এবং regulatory decisions সংশ্লিষ্ট Singapore authorities ও employer-এর অধীন।",
    action:
      "আপনার পছন্দের কাজ, দক্ষতা ও passport status জানিয়ে আজই hotline-এ যোগাযোগ করুন।",
    warning:
      "Final approval এবং regulatory decisions সংশ্লিষ্ট Singapore authorities ও employer-এর অধীন — কোনো intermediary তা guarantee করে না।",
    contactCta: true,
    tags: ["insus", "সাহায্য", "support", "সেবা", "contact", "কোম্পানি", "এজেন্সি"],
    published: true,
  },
  {
    id: 49,
    category: "Agent FAQ",
    question: "INSUS MANPOWER SOLUTION-এর সঙ্গে যোগাযোগ কীভাবে করব?",
    shortAnswer:
      "যেকোনো একটি hotline নম্বরে কল করুন অথবা official email-ঠিকানায় বিস্তারিত লিখে পাঠান।",
    fullAnswer:
      "প্রক্রিয়া সম্পর্কে জানতে বা নিজের যোগ্যতা যাচাই করতে চাইলে নিচের hotline নম্বরে কল করুন অথবা official email-এ আপনার পরিচিতি, পছন্দের কাজ ও অভিজ্ঞতা লিখে পাঠান।",
    action:
      "কল করার সময় passport status, পছন্দের sector ও কাজের অভিজ্ঞতা জানালে দ্রুত ও পরিষ্কার গাইড পাওয়া যায়।",
    contactCta: true,
    tags: ["contact", "যোগাযোগ", "phone", "email", "hotline", "নম্বর", "ইমেইল", "call", "ফোন", "insus"],
    published: true,
  },
  {
    id: 50,
    category: "Pre-Departure",
    question: "Singapore যাওয়ার আগে আমার সবচেয়ে গুরুত্বপূর্ণ ১০টি বিষয় কী?",
    shortAnswer:
      "Employer, job title, salary, employment terms, work authorization, IPA, medical, cost, accommodation ও onboarding plan — ১০টি বিষয় অবশ্যই যাচাই করুন।",
    fullAnswer:
      "কোনো payment বা travel decision নেওয়ার আগে নিচের ১০টি বিষয় লিখিতভাবে যাচাই করুন — এগুলো একজন প্রথমবার যাওয়া worker-এর জন্য সবচেয়ে গুরুত্বপূর্ণ।",
    action:
      "১০টি বিষয়ের উত্তর লিখিতভাবে পেয়ে গেলে তবেই পরবর্তী ধাপ ও payment-এ এগোন।",
    warning:
      "কোনো payment বা travel decision নেওয়ার আগে লিখিত documents এবং current official requirements যাচাই করুন।",
    top10: [
      "Employer কে?",
      "Job title কী?",
      "Salary কত?",
      "Employment terms কী?",
      "কোন work authorization প্রযোজ্য?",
      "Approval / IPA information কী?",
      "Medical requirement কী?",
      "Total cost breakdown কী?",
      "Accommodation arrangement কী?",
      "Singapore পৌঁছানোর পর onboarding plan কী?",
    ],
    tags: ["top 10", "গুরুত্বপূর্ণ", "চেকলিস্ট", "checklist", "সারসংক্ষেপ", "summary", "১০টি", "pre-departure"],
    published: true,
    featured: true,
  },
];

/* ============================================================
   Recruitment journey — 12 interactive stages
   ============================================================ */
export interface JourneyStage {
  id: number;
  step: string;
  title: string;
  bn: string;
  summary: string;
  points: string[];
}

export const JOURNEY: JourneyStage[] = [
  {
    id: 1,
    step: "01",
    title: "Bangladesh Office",
    bn: "বাংলাদেশ অফিসে নিবন্ধন ও পরামর্শ",
    summary:
      "যাত্রা শুরু হয় INSUS-এর বাংলাদেশ অফিসে — পাসপোর্ট যাচাই, কর্মী নিবন্ধন, পছন্দের sector নির্বাচন এবং সম্পূর্ণ প্রক্রিয়ার স্বচ্ছ ব্রিফিংয়ের মাধ্যমে।",
    points: [
      "অফিসে এসে পাসপোর্ট ও প্রাথমিক তথ্য যাচাই করুন।",
      "কোন sector-এ কাজ করতে আগ্রহী ও কী অভিজ্ঞতা আছে — পরিষ্কার জানান।",
      "সম্পূর্ণ প্রক্রিয়া, সময় ও খরচের খাতসমূহ লিখিতভাবে বুঝে নিন।",
      "নিবন্ধন বা সেবা সংক্রান্ত কোনো ফি দিলে রসিদ নিন।",
    ],
  },
  {
    id: 2,
    step: "02",
    title: "Documentation",
    bn: "ডকুমেন্টেশন ও ভিসা প্রসেসিং",
    summary:
      "পাসপোর্ট, ছবি, শিক্ষা/অভিজ্ঞতার কাগজ, চুক্তিপত্র এবং employer/IPA সংক্রান্ত ডকুমেন্ট গুছিয়ে work pass আবেদন প্রক্রিয়া সম্পন্ন করা হয়।",
    points: [
      "পাসপোর্টে পর্যাপ্ত validity ও খালি পেজ আছে কি না নিশ্চিত হন।",
      "Employer বা authorised agency-র মাধ্যমে work pass আবেদন হয় — worker নিজে নয়।",
      "স্বাক্ষরিত employment contract/offer letter-এর কপি সংগ্রহ করুন।",
      "সব মূল কাগজ নিজের কাছে রাখুন, সত্যায়িত কপি জমা দিন।",
    ],
  },
  {
    id: 3,
    step: "03",
    title: "Medical Examination",
    bn: "মেডিকেল পরীক্ষা",
    summary:
      "প্রযোজ্য work-pass category অনুযায়ী নির্ধারিত medical examination সম্পন্ন করা হয় — কখন বাংলাদেশে, কখন সিঙ্গাপুরে পৌঁছে।",
    points: [
      "IPA/নির্দেশনা পত্রে medical requirement আছে কি না দেখুন।",
      "নির্ধারিত ফরম্যাট ও তালিকাভুক্ত কেন্দ্রেই পরীক্ষা সম্পন্ন করুন।",
      "Medical report ও প্রয়োজনীয় টিকা/রেকর্ড সংরক্ষণ করুন।",
      "প্রয়োজনীয়তা বর্তমান সরকারি নিয়ম অনুযায়ী যাচাই করুন।",
    ],
  },
  {
    id: 4,
    step: "04",
    title: "Approval / IPA",
    bn: "অনুমোদন ও IPA গ্রহণ",
    summary:
      "আবেদন অনুমোদিত হলে In-Principle Approval (IPA) দেওয়া হয় — যাত্রার আগে নাম, employer, occupation ও শর্তাবলি মিলিয়ে দেখা জরুরি।",
    points: [
      "IPA-তে নাম, passport number, employer ও occupation মিলিয়ে দেখুন।",
      "IPA চূড়ান্ত physical card নয় — এটি প্রাথমিক অনুমোদনপত্র।",
      "IPA-র নির্দেশনা ও declaration ধাপগুলো সম্পন্ন করুন।",
      "সন্দেহ হলে document official Singapore চ্যানেলে cross-check করুন।",
    ],
  },
  {
    id: 5,
    step: "05",
    title: "Pre-Departure & Flight",
    bn: "প্রি-ডিপারচার ব্রিফিং ও ফ্লাইট",
    summary:
      "যাত্রা-পূর্ব ব্রিফিং, লিখিত cost breakdown ও রসিদ, ফ্লাইট টিকিট এবং সব ডকুমেন্ট হাতের ব্যাগে গুছিয়ে নির্ধারিত ফ্লাইটে রওনা হওয়া।",
    points: [
      "Pre-Departure Checklist ধরে পাসপোর্ট, IPA, চুক্তি, টিকিট ও medical কাগজ গোছান।",
      "কে airfare বহন করছে তা লিখিত চুক্তিতে নিশ্চিত থাকা উচিত।",
      "এয়ারপোর্টে কে গ্রহণ করবে — নাম, পরিচয় ও ফোন নম্বর আগেই জেনে নিন।",
      "পরিবারকে employer নাম, ঠিকানা ও যাত্রার তথ্য জানিয়ে রাখুন।",
    ],
  },
  {
    id: 6,
    step: "06",
    title: "Singapore Arrival",
    bn: "সিঙ্গাপুরে আগমন ও ইমিগ্রেশন",
    summary:
      "চাঙ্গি বিমানবন্দরে immigration entry formalities সম্পন্ন করে employer বা ক্ষমতাপ্রাপ্ত প্রতিনিধির সঙ্গে সাক্ষাৎ ও আবাসনে পৌঁছানো।",
    points: [
      "Immigration-এর নির্দেশনা মেনে entry formalities সম্পন্ন করুন।",
      "পাসপোর্ট, IPA ও কাগজপত্র হাতের কাছেই রাখুন।",
      "Employer/প্রতিনিধির পরিচয় ও নিয়োগপত্র মিলিয়ে নিন।",
      "থাকার ঠিকানা, রুম ও প্রাথমিক নিয়মকানুন বুঝে নিন।",
    ],
  },
  {
    id: 7,
    step: "07",
    title: "Employer Reporting",
    bn: "এমপ্লয়ারের কাছে রিপোর্টিং",
    summary:
      "নির্ধারিত সময়ে employer-এর কাছে রিপোর্ট করা, ডকুমেন্ট জমা, কাজের শর্ত-সময়-বেতন নিশ্চিত হওয়া এবং orientation/safety briefing গ্রহণ।",
    points: [
      "নির্ধারিত সময় ও স্থানে employer-এর কাছে রিপোর্ট করুন।",
      "কাজের শর্ত, working hours, বেতন ও কাটা নিয়ে লিখিত নিশ্চয়তা নিন।",
      "Safety orientation ও workplace rules মনোযোগ দিয়ে শুনুন।",
      "পাসপোর্ট নিজের কাছেই রাখুন — জমা দেওয়ার দাবি হলে নিয়ম যাচাই করুন।",
    ],
  },
  {
    id: 8,
    step: "08",
    title: "Work Pass & Workplace Joining",
    bn: "ওয়ার্ক পাস ইস্যু ও কর্মস্থলে যোগদান",
    summary:
      "Registration, fingerprint/biometric সম্পন্ন হলে physical Work Permit card ইস্যু হয় এবং সব authorization শেষে চুক্তি অনুযায়ী কর্মস্থলে যোগদান করা হয়।",
    points: [
      "নির্ধারিত দিনে সব মূল ডকুমেন্ট নিয়ে biometric/registration-এ হাজির হন।",
      "Work Permit card-এর নাম, নম্বর ও employer তথ্য যাচাই করুন।",
      "সব authorization সম্পন্ন হওয়ার আগে কাজ শুরু করবেন না।",
      "চাকরি শুরুর তারিখ ও প্রথম বেতনের তারিখ লিখিতভাবে জেনে নিন।",
    ],
  },
];

/* ============================================================
   Singapore Work Permit sectors (all sectors)
   ============================================================ */
export interface Sector {
  id: string;
  name: string;
  bn: string;
  icon: string;
  description: string;
  roles: string[];
}

export const SECTORS: Sector[] = [
  {
    id: "construction",
    name: "Construction",
    bn: "নির্মাণ খাত",
    icon: "building",
    description:
      "ভবন, অবকাঠামো, রোড, MRT ও সিভিল কাজে সবচেয়ে বেশি বৈদেশিক শ্রমিক নিয়োগ হয়।",
    roles: ["রাজমিস্ত্রি", "শাটারিং কার্পেন্টার", "রড বাইন্ডার", "ইলেকট্রিশিয়ান", "প্লাম্বার", "হেল্পার"],
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    bn: "উৎপাদন / ম্যানুফ্যাকচারিং",
    icon: "factory",
    description:
      "ফ্যাক্টরি, ইলেকট্রনিক্স, প্লাস্টিক, ফুড প্রসেসিং ও প্যাকেজিং কারখানায় কর্মী নিয়োগ হয়।",
    roles: ["মেশিন অপারেটর", "প্রোডাকশন ওয়ার্কার", "ওয়েল্ডার", "প্যাকার", "কোয়ালিটি হেল্পার", "ফোর্কলিফ্ট ড্রাইভার"],
  },
  {
    id: "marine",
    name: "Marine Shipyard",
    bn: "মেরিন ও শিপইয়ার্ড",
    icon: "ship",
    description:
      "জাহাজ নির্মাণ ও মেরামত, অফশোর স্ট্রাকচার এবং শিপইয়ার্ডের কারিগরি কাজ।",
    roles: ["শিপফিটার", "ওয়েল্ডার", "পেইন্টার", "স্যান্ডব্লাস্টার", "পাইপ ফিটার", "রিগার"],
  },
  {
    id: "process",
    name: "Process",
    bn: "প্রসেস / পেট্রোকেমিক্যাল",
    icon: "flask",
    description:
      "রাসায়নিক, তেল-গ্যাস, ফার্মাসিউটিক্যাল ও রিফাইনারি প্রক্রিয়াজাত কারখানা।",
    roles: ["প্রসেস অপারেটর", "মেইনটেন্যান্স টেকনিশিয়ান", "ফিটার", "ল্যাব হেল্পার", "ট্যাংক ক্লিনার"],
  },
  {
    id: "services",
    name: "Services",
    bn: "সেবা খাত",
    icon: "headset",
    description:
      "ক্লিনিং, ল্যান্ডস্কেপিং, হসপিটালিটি সাপোর্ট, মেইনটেন্যান্স ও লজিস্টিক সেবা।",
    roles: ["ক্লিনার", "ল্যান্ডস্কেপিং ওয়ার্কার", "কিচেন হেল্পার", "ভ্যান/গোল্ড ড্রাইভার", "ওয়ার্কার", "সিকিউরিটি হেল্পার"],
  },
];

export const PASS_TIERS = [
  {
    code: "Work Permit (WP)",
    bn: "আধা-দক্ষ ও দক্ষ শ্রমিক",
    note: "Sector ও nationality নির্ধারিত; employer-specific; quota ও levy প্রযোজ্য।",
  },
  {
    code: "S Pass",
    bn: "মধ্যম দক্ষতা সম্পন্ন কর্মী",
    note: "নির্দিষ্ট salary, qualification ও quota requirements পূরণ সাপেক্ষে।",
  },
  {
    code: "Employment Pass (EP)",
    bn: "পেশাজীবী / ম্যানেজারিয়াল",
    note: "উচ্চতর salary, যোগ্যতা ও পেশাগত মানদণ্ড অনুযায়ী।",
  },
];

/* ============================================================
   Cost transparency categories
   ============================================================ */
export interface CostItem {
  id: string;
  title: string;
  bn: string;
  icon: string;
  description: string;
}

export const COST_ITEMS: CostItem[] = [
  {
    id: "recruitment",
    title: "Employer / Recruitment-related Cost",
    bn: "নিয়োগ ও রিক্রুটমেন্ট-সংক্রান্ত খরচ",
    icon: "briefcase",
    description:
      "Recruitment coordination, documentation support ও প্রক্রিয়া-সংক্রান্ত সেবার খরচ এ খাতে পড়তে পারে।",
  },
  {
    id: "government",
    title: "Government / Official Fees",
    bn: "সরকারি / অফিসিয়াল ফি",
    icon: "building",
    description:
      "Work pass application, issuance ও সংশ্লিষ্ট official fees বর্তমান সরকারি নিয়ম অনুযায়ী নির্ধারিত হয়।",
  },
  {
    id: "medical",
    title: "Medical Examination",
    bn: "মেডিকেল পরীক্ষা",
    icon: "stethoscope",
    description:
      "প্রযোজ্য pass category অনুযায়ী medical examination-এর খরচ থাকতে পারে।",
  },
  {
    id: "documentation",
    title: "Documentation",
    bn: "ডকুমেন্টেশন",
    icon: "fileText",
    description:
      "Passport, ছবি, ফটোকপি, সত্যায়ন বা অনুবাদ — প্রয়োজনভিত্তিক ডকুমেন্ট খরচ।",
  },
  {
    id: "travel",
    title: "Travel",
    bn: "যাত্রা খরচ",
    icon: "plane",
    description:
      "Air ticket, transit ও যাত্রা-সংক্রান্ত খরচ; কে বহন করবে তা লিখিত চুক্তিতে থাকা উচিত।",
  },
  {
    id: "other",
    title: "Other Applicable Costs",
    bn: "অন্যান্য প্রযোজ্য খরচ",
    icon: "wallet",
    description:
      "প্রশিক্ষণ, orientation, ব্যক্তিগত প্রস্তুতি বা প্রযোজ্য অন্যান্য খরচ কেসভেদে থাকতে পারে।",
  },
];

export const COST_NOTE =
  "Amount depends on the specific case and current applicable rules.";
export const COST_RECEIPT_NOTE =
  "Always request a written cost breakdown and receipt.";

/* ============================================================
   Worker safety — scam red flags & verification checklist
   ============================================================ */
export const SCAM_RED_FLAGS: string[] = [
  "100% visa guarantee দেওয়া",
  "Employer-এর তথ্য ছাড়াই guaranteed job",
  "সঙ্গে সঙ্গে টাকা দিতে চাপ দেওয়া",
  "কোনো রসিদ বা invoice না দেওয়া",
  "Fake-looking approval document",
  "Employer-এর পরিচয় অস্পষ্ট রাখা",
  "বেতনের শুধু মৌখিক প্রতিশ্রুতি",
  "অব্যাখ্যাত fees-এর দাবি",
];

export const VERIFY_CHECKLIST: string[] = [
  "Employer-এর পূর্ণ পরিচয়, company নাম ও workplace যাচাই করুন।",
  "IPA / approval document official Singapore government চ্যানেলে cross-check করুন।",
  "স্বাক্ষরিত লিখিত employment contract না পাওয়া পর্যন্ত টাকা দেবেন না।",
  "প্রতিটি খাতের লিখিত cost breakdown ও payment receipt নিন।",
  "Agent / agency-র রেজিস্ট্রেশন ও লাইসেন্স তথ্য দেখে নিন।",
  "চাপে বা ব্যক্তিগত account-এ জরুরি পেমেন্ট কখনো করবেন না।",
];

export const DISCLAIMER =
  "এই FAQ সাধারণ তথ্যের জন্য তৈরি। Singapore-এর immigration, work pass, employment এবং recruitment rules পরিবর্তিত হতে পারে। কোনো application, payment বা travel decision নেওয়ার আগে সংশ্লিষ্ট official authority এবং applicable documents যাচাই করুন। Approval কোনো intermediary দ্বারা guaranteed নয়।";
