import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CATEGORIES, GOV_VERIFY_NOTE, type Faq } from "../data/faqs";
import { useContent } from "../store/content";
import {
  AlertIcon,
  BadgeCheckIcon,
  ChevronDown,
  FileTextIcon,
  HelpIcon,
  ListChecksIcon,
  MailIcon,
  PhoneIcon,
  SearchIcon,
  SparklesIcon,
  XIcon,
} from "../components/icons";
import { Counter, SectionHeading, Sheet } from "../components/ui";
import { cn } from "../utils/cn";

const ease = [0.22, 1, 0.36, 1] as const;
const ALL = "ALL";

const SUGGESTIONS = [
  "Singapore যেতে কত খরচ?",
  "IPA কী?",
  "Work Permit কে আবেদন করে?",
  "Medical কখন হবে?",
  "বেতন কত?",
  "Scam কীভাবে চিনব?",
];

/* Stop words removed before matching */
const STOP = new Set(
  [
    "কি", "কী", "কে", "কত", "আমি", "কীভাবে", "কিভাবে", "করে", "করব", "করবে",
    "হয়", "হবে", "হতে", "দিতে", "দেওয়া", "যেতে", "যাওয়ার", "যাওয়া", "গিয়ে",
    "গেলে", "পর", "আগে", "পারি", "পারবো", "পারবে", "দরকার", "লাগে", "লাগবে",
    "কখন", "কোন", "কোনটা", "না", "হয়?", "the", "a", "to", "for", "of", "is",
    "in", "on", "do", "does", "what", "how", "singapore", "সিঙ্গাপুর",
    "সিঙ্গাপুরে", "সিঙ্গাপুরের", "?", "??",
  ].map((s) => s.replace(/[?.!,]/g, ""))
);

interface SynGroup {
  keys: string[];
  terms: string[];
}

const SYN_GROUPS: SynGroup[] = [
  {
    keys: ["খরচ", "টাকা", "পয়সা", "ব্যয়", "fee", "cost", "পেমেন্ট", "payment"],
    terms: ["খরচ", "টাকা", "cost", "fee", "ফি", "ব্যয়", "money", "payment", "অর্থ", "রসিদ", "এডভান্স", "কিস্তি"],
  },
  {
    keys: ["ভিসা", "visa", "পারমিট", "permit", "পাস", "pass", "অনুমতি", "টুরিস্ট", "tourist", "ভিজিট"],
    terms: ["ভিসা", "visa", "work permit", "work pass", "পারমিট", "অনুমতি", "পাস", "tourist", "ভিজিট", "authorization", "অবৈধ", "illegal"],
  },
  {
    keys: ["ipa"],
    terms: ["ipa", "in-principle", "অনুমোদন", "approval"],
  },
  {
    keys: ["মেডিকেল", "medical", "স্বাস্থ্য", "পরীক্ষা", "ডাক্তার"],
    terms: ["মেডিকেল", "medical", "স্বাস্থ্য", "পরীক্ষা", "doctor", "test"],
  },
  {
    keys: ["বেতন", "salary", "মাইনে", "পারিশ্রমিক", "ইনকাম", "আয়"],
    terms: ["বেতন", "salary", "মাইনে", "income", "পাওনা", "payslip", "কাটা", "deduction"],
  },
  {
    keys: ["employer", "কোম্পানি", "নিয়োগকর্তা", "মালিক"],
    terms: ["employer", "কোম্পানি", "নিয়োগকর্তা", "workplace", "identity", "offer"],
  },
  {
    keys: ["কাজ", "চাকরি", "job", "work", "পদ", "চাকুরি"],
    terms: ["কাজ", "চাকরি", "job", "work", "পদ", "ইন্টারভিউ", "interview", "প্রক্রিয়া"],
  },
  {
    keys: ["পৌঁছা", "এয়ারপোর্ট", "arrival", "আগমন", "অনবোর্ডিং", "onboarding"],
    terms: ["arrival", "পৌঁছা", "এয়ারপোর্ট", "immigration", "onboarding", "আগমন", "কাজ শুরু"],
  },
  {
    keys: ["এজেন্ট", "agent", "দালাল", "মাঝি"],
    terms: ["agent", "এজেন্ট", "দালাল", "recruitment", "লাইসেন্স", "license"],
  },
  {
    keys: ["scam", "প্রতারণা", "ভুয়া", "জাল", "fake", "নকল", "গ্যারান্টি", "guarantee", "ঠকা", "নিরাপত্তা"],
    terms: ["scam", "প্রতারণা", "ভুয়া", "জাল", "fake", "নকল", "গ্যারান্টি", "guarantee", "red flag", "নিরাপত্তা", "রসিদ"],
  },
  {
    keys: ["নবায়ন", "renew", "মেয়াদ", "expire", "renewal"],
    terms: ["renewal", "নবায়ন", "মেয়াদ", "expire", "renew", "transfer", "বদলি"],
  },
  {
    keys: ["বদলি", "বদল", "change", "transfer", "ছেড়ে", "ইস্তফা", "resign"],
    terms: ["বদলি", "transfer", "change", "ছেড়ে", "resign", "notice", "termination", "job change"],
  },
  {
    keys: ["টিকিট", "বিমান", "ভ্রমণ", "travel", "যাত্রা", "ফ্লাইট", "flight"],
    terms: ["টিকিট", "বিমান", "travel", "airfare", "যাত্রা", "ভ্রমণ", "ফ্লাইট", "ticket"],
  },
  {
    keys: ["থাকা", "বাসা", "housing", "accommodation", "রুম"],
    terms: ["accommodation", "থাকা", "বাসা", "housing", "রুম", "deduction"],
  },
  {
    keys: ["চুক্তি", "contract", "agreement", "শর্ত"],
    terms: ["চুক্তি", "contract", "agreement", "শর্ত", "terms", "লিখিত"],
  },
  {
    keys: ["পাসপোর্ট", "passport"],
    terms: ["passport", "পাসপোর্ট", "মেয়াদ", "validity", "জমা"],
  },
  {
    keys: ["পরিবার", "family", "স্ত্রী", "সন্তান"],
    terms: ["family", "পরিবার", "স্ত্রী", "সন্তান", "dependent"],
  },
  {
    keys: ["যোগ্যতা", "eligibility", "দক্ষতা", "skill", "অভিজ্ঞতা", "বাংলাদেশি"],
    terms: ["যোগ্যতা", "eligibility", "দক্ষতা", "skill", "অভিজ্ঞতা", "বাংলাদেশি", "training"],
  },
  {
    keys: ["অধিকার", "rights", "অভিযোগ", "complaint", "পাওনা"],
    terms: ["অধিকার", "rights", "অভিযোগ", "complaint", "পাসপোর্ট", "বেতন"],
  },
  {
    keys: ["জরুরি", "emergency", "বিপদ", "সাহায্য"],
    terms: ["emergency", "জরুরি", "বিপদ", "সাহায্য", "পুলিশ", "contact"],
  },
  {
    keys: ["ডকুমেন্ট", "document", "কাগজ", "নথি"],
    terms: ["ডকুমেন্ট", "document", "কাগজ", "passport", "চুক্তি", "চেকলিস্ট"],
  },
  {
    keys: ["সময়", "কতদিন", "কয়দিন", "timeline", "duration", "তারিখ"],
    terms: ["সময়", "কতদিন", "timeline", "processing", "duration", "তারিখ"],
  },
  {
    keys: ["যোগাযোগ", "contact", "ফোন", "নম্বর", "ইমেইল", "email", "হটলাইন", "hotline", "call", "insus"],
    terms: ["contact", "যোগাযোগ", "ফোন", "ইমেইল", "hotline", "insus", "সাহায্য", "support"],
  },
  {
    keys: ["খাবার", "food", "ভাতা", "দৈনন্দিন", "transport"],
    terms: ["খাবার", "food", "transport", "দৈনন্দিন", "living cost", "ভাতা"],
  },
  {
    keys: ["কার্ড", "card", "বায়োমেট্রিক", "biometric", "আঙুল", "fingerprint", "রেজিস্ট্রেশন"],
    terms: ["কার্ড", "card", "বায়োমেট্রিক", "biometric", "fingerprint", "registration", "issuance"],
  },
  {
    keys: ["ধাপ", "stage", "status", "প্রসেস", "প্রক্রিয়া", "ট্র্যাক"],
    terms: ["ধাপ", "stage", "status", "timeline", "প্রক্রিয়া", "tracking"],
  },
];

function matches(faq: Faq, rawQuery: string): boolean {
  const haystack = [
    faq.question,
    faq.shortAnswer,
    faq.fullAnswer,
    faq.category,
    faq.action ?? "",
    faq.warning ?? "",
    ...(faq.steps ?? []),
    ...(faq.checklist ?? []),
    ...(faq.top10 ?? []),
    faq.tags.join(" "),
  ]
    .join(" ")
    .toLowerCase();

  const tokens = rawQuery
    .toLowerCase()
    .replace(/[?।.,!()]/g, " ")
    .split(/\s+/)
    .map((t) => t.trim())
    .filter(Boolean);

  for (const tokenRaw of tokens) {
    const token = STOP.has(tokenRaw) ? "" : tokenRaw;
    if (!token) continue;

    const group = SYN_GROUPS.find(
      (g) =>
        g.keys.some(
          (k) => token.includes(k) || (k.length > 2 && k.includes(token))
        )
    );

    if (group) {
      if (!group.terms.some((term) => haystack.includes(term))) return false;
    } else if (!haystack.includes(token)) {
      return false;
    }
  }
  return true;
}

export default function FaqSection() {
  const { state, brand } = useContent();
  const meta = state.sections.faq;
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>(ALL);
  const [active, setActive] = useState<Faq | null>(null);
  const [ready, setReady] = useState(false);
  const [focused, setFocused] = useState(false);
  const reduce = useReducedMotion();
  const inputRef = useRef<HTMLInputElement>(null);
  const chipRowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 450);
    return () => clearTimeout(t);
  }, []);

  const published = useMemo(
    () => state.faqs.filter((f) => f.published !== false),
    [state.faqs]
  );

  const orderedCategories = useMemo(() => {
    const used = new Set(published.map((f) => f.category));
    const base = CATEGORIES.filter((c) => used.has(c));
    const extras = [...used].filter((c) => !CATEGORIES.includes(c));
    return [...base, ...extras];
  }, [published]);

  const filtered = useMemo(() => {
    const q = query.trim();
    return published.filter((f) => {
      if (category !== ALL && f.category !== category) return false;
      if (q && !matches(f, q)) return false;
      return true;
    });
  }, [published, query, category]);

  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const f of published) map[f.category] = (map[f.category] ?? 0) + 1;
    return map;
  }, [published]);

  if (!meta.visible) return null;

  const resetAll = () => {
    setQuery("");
    setCategory(ALL);
    inputRef.current?.focus();
  };

  return (
    <section id="faq" className="relative scroll-mt-20 px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow={
            <>
              <HelpIcon className="h-3.5 w-3.5" /> {meta.eyebrow} ·{" "}
              <Counter to={published.length} /> টি প্রশ্নোত্তর
            </>
          }
          title={meta.title}
          accent={meta.accent}
          subtitle={meta.subtitle}
        />

        {/* ---- Search ---- */}
        <motion.div
          className="mx-auto mt-8 max-w-2xl"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease }}
        >
          <div
            className={cn(
              "glass flex items-center gap-3 rounded-2xl px-4 py-1 transition-all duration-300",
              focused && "ring-2 ring-brand-400/70 shadow-brand"
            )}
          >
            <motion.span
              animate={
                reduce
                  ? {}
                  : focused
                  ? { scale: 1.15, rotate: -8, color: "#0a84ff" }
                  : { scale: 1, rotate: 0, color: "#4568a6" }
              }
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
              className="inline-flex shrink-0 text-navy-500"
            >
              <SearchIcon className="h-5 w-5" />
            </motion.span>
            <input
              ref={inputRef}
              type="search"
              inputMode="search"
              enterKeyHint="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="আপনার প্রশ্ন লিখুন... (যেমন: খরচ, IPA, মেডিকেল)"
              aria-label="FAQ সার্চ করুন"
              className="h-12 w-full bg-transparent text-[14px] font-medium text-navy-900 placeholder:text-navy-400 focus:outline-none sm:text-[15px]"
            />
            <AnimatePresence>
              {query && (
                <motion.button
                  type="button"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  onClick={() => setQuery("")}
                  aria-label="সার্চ মুছুন"
                  className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy-100/80 text-navy-600 transition hover:bg-navy-200 active:scale-90"
                >
                  <XIcon className="h-4 w-4" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Suggestions */}
          <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto pb-1">
            <span className="inline-flex shrink-0 items-center text-[11px] font-semibold text-navy-400">
              <SparklesIcon className="mr-1 h-3.5 w-3.5" />
              সাজেশন:
            </span>
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => {
                  setQuery(s.replace(/[?]/g, ""));
                  setCategory(ALL);
                }}
                className={cn(
                  "shrink-0 rounded-full border px-3 py-1.5 text-[11.5px] font-semibold transition active:scale-95",
                  query === s.replace(/[?]/g, "")
                    ? "border-brand-500 bg-brand-500 text-white shadow-brand"
                    : "border-white/80 bg-white/60 text-navy-600 backdrop-blur hover:border-brand-300 hover:text-brand-700"
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ---- Category chips ---- */}
        <div
          ref={chipRowRef}
          className="no-scrollbar -mx-4 mt-5 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0"
          role="tablist"
          aria-label="FAQ ক্যাটাগরি ফিল্টার"
        >
          <CategoryChip
            label={ALL}
            active={category === ALL}
            count={published.length}
            onClick={() => setCategory(ALL)}
          />
          {orderedCategories.map((c) => (
            <CategoryChip
              key={c}
              label={c}
              active={category === c}
              count={counts[c] ?? 0}
              onClick={() => setCategory(c)}
            />
          ))}
        </div>

        {/* ---- Result meta ---- */}
        <div className="mx-auto mt-6 flex max-w-6xl items-center justify-between px-1">
          <p className="text-[12px] font-semibold text-navy-500" aria-live="polite">
            <span className="inline-flex min-w-6 items-center justify-center rounded-full bg-brand-50 px-2 py-0.5 text-brand-700 tabular-nums">
              {filtered.length}
            </span>{" "}
            টি ফলাফল
          </p>
          {(query || category !== ALL) && (
            <button
              type="button"
              onClick={resetAll}
              className="inline-flex items-center gap-1 text-[12px] font-semibold text-brand-600 hover:text-brand-700"
            >
              <XIcon className="h-3.5 w-3.5" /> ফিল্টার মুছুন
            </button>
          )}
        </div>

        {/* ---- Grid ---- */}
        <div className="mt-3 grid grid-cols-2 gap-2.5 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {!ready &&
            Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="glass-soft flex h-[172px] flex-col gap-2.5 rounded-3xl p-3 sm:h-[196px] sm:p-4"
              >
                <div className="skeleton h-5 w-12 rounded-full" />
                <div className="skeleton h-4 w-full rounded-md" />
                <div className="skeleton h-4 w-4/5 rounded-md" />
                <div className="mt-auto skeleton h-3 w-full rounded" />
                <div className="skeleton h-3 w-2/3 rounded" />
              </div>
            ))}

          {ready && (
            <AnimatePresence mode="popLayout">
              {filtered.map((f, i) => (
                <FaqCard key={f.id} faq={f} index={i} onOpen={() => setActive(f)} />
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* ---- Empty state ---- */}
        {ready && filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto mt-6 max-w-md rounded-4xl glass p-8 text-center"
          >
            <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-500">
              <SearchIcon className="h-7 w-7" />
            </span>
            <h3 className="mt-4 text-base font-bold text-navy-900">
              কোনো মিল পাওয়া যায়নি
            </h3>
            <p className="mt-1.5 text-[13px] leading-relaxed text-navy-500">
              অন্য কীওয়ার্ড চেষ্টা করুন — যেমন “খরচ”, “IPA”, “বেতন”, “মেডিকেল”
              অথবা “passport”। অথবা সরাসরি hotline-এ কল করুন।
            </p>
            <div className="mt-5 flex flex-col justify-center gap-2 sm:flex-row">
              <button
                type="button"
                onClick={resetAll}
                className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl bg-brand-500 px-4 text-[13px] font-semibold text-white shadow-brand transition hover:bg-brand-600 active:scale-95"
              >
                সব FAQ দেখুন
              </button>
              <a
                href={brand.phones[0]?.href ?? "#contact"}
                className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl glass-soft px-4 text-[13px] font-semibold text-navy-800 transition active:scale-95"
              >
                <PhoneIcon className="h-4 w-4 text-brand-600" /> কল করুন
              </a>
            </div>
          </motion.div>
        )}
      </div>

      {/* ---- Detail sheet ---- */}
      <Sheet open={!!active} onClose={() => setActive(null)} label={active?.question ?? "FAQ বিস্তারিত"}>
        {active && <FaqDetail faq={active} />}
      </Sheet>
    </section>
  );
}

/* ------------------------------------------------------------
   Category chip
------------------------------------------------------------ */
function CategoryChip({
  label,
  active: isActive,
  count,
  onClick,
}: {
  label: string;
  active: boolean;
  count: number;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      onClick={onClick}
      className={cn(
        "relative inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-[12px] font-semibold transition active:scale-95 sm:text-[12.5px]",
        isActive
          ? "text-white"
          : "glass-soft text-navy-600 hover:text-brand-700"
      )}
    >
      {isActive && (
        <motion.span
          layoutId="catPill"
          className="absolute inset-0 rounded-full bg-brand-500 shadow-brand"
          transition={{ type: "spring", stiffness: 420, damping: 34 }}
        />
      )}
      <span className="relative z-10 whitespace-nowrap">{label}</span>
      <span
        className={cn(
          "relative z-10 rounded-full px-1.5 text-[10px] font-bold tabular-nums",
          isActive ? "bg-white/25 text-white" : "bg-navy-100/70 text-navy-500"
        )}
      >
        {count}
      </span>
    </button>
  );
}

/* ------------------------------------------------------------
   FAQ card
------------------------------------------------------------ */
function FaqCard({
  faq,
  index,
  onOpen,
}: {
  faq: Faq;
  index: number;
  onOpen: () => void;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.button
      type="button"
      layout
      onClick={onOpen}
      aria-haspopup="dialog"
      aria-label={`FAQ ${String(faq.id).padStart(2, "0")}: ${faq.question} — উত্তর পড়ুন`}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
      transition={{
        delay: Math.min(index * 0.025, 0.4),
        type: "spring",
        stiffness: 280,
        damping: 26,
      }}
      whileHover={reduce ? undefined : { y: -4 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "reflection group relative flex h-full min-h-[168px] flex-col gap-2 rounded-3xl p-3 text-left sm:min-h-[188px] sm:gap-2.5 sm:p-4",
        faq.featured ? "glass-tint" : "glass-soft"
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span
          className={cn(
            "inline-flex h-7 items-center rounded-lg px-2 text-[11px] font-extrabold tabular-nums sm:h-8 sm:text-[12px]",
            faq.featured
              ? "bg-brand-500/10 text-brand-700"
              : "bg-navy-100/70 text-navy-600"
          )}
        >
          {String(faq.id).padStart(2, "0")}
        </span>
        <span className="max-w-[58%] truncate rounded-full bg-white/70 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-navy-500 ring-1 ring-white/80 sm:text-[9.5px]">
          {faq.category}
        </span>
      </div>

      <h3 className="line-clamp-3 text-[12.5px] font-bold leading-snug text-navy-900 sm:text-[14px]">
        {faq.question}
      </h3>

      <p className="line-clamp-2 text-[10.5px] leading-relaxed text-navy-500 sm:line-clamp-3 sm:text-[12px]">
        {faq.shortAnswer}
      </p>

      <span className="mt-auto inline-flex items-center justify-between pt-1">
        <span className="text-[10.5px] font-bold uppercase tracking-wider text-brand-600 sm:text-[11px]">
          উত্তর পড়ুন
        </span>
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-500/10 text-brand-600 transition-transform duration-300 group-hover:rotate-180 sm:h-7 sm:w-7">
          <ChevronDown className="h-3.5 w-3.5" />
        </span>
      </span>

    </motion.button>
  );
}

/* ------------------------------------------------------------
   FAQ detail content
------------------------------------------------------------ */
function FaqDetail({ faq }: { faq: Faq }) {
  const { brand } = useContent();
  return (
    <div>
      {/* Header */}
      <div className="flex items-start gap-3 pr-10">
        <span className="inline-flex h-11 shrink-0 items-center rounded-xl bg-brand-500 px-3 text-[15px] font-extrabold tabular-nums text-white shadow-brand">
          {String(faq.id).padStart(2, "0")}
        </span>
        <div>
          <span className="inline-block rounded-full bg-brand-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-700">
            {faq.category}
          </span>
          <h2 className="mt-1.5 text-[17px] font-bold leading-snug text-navy-900 sm:text-xl">
            {faq.question}
          </h2>
        </div>
      </div>

      {/* ANSWER */}
      <DetailLabel icon={<FileTextIcon className="h-4 w-4" />} text="উত্তর · ANSWER" />
      <p className="text-[13.5px] leading-[1.8] text-navy-700 sm:text-[14.5px]">
        {faq.fullAnswer}
      </p>

      {/* Steps (FAQ 43) */}
      {faq.steps && (
        <div className="mt-4 rounded-2xl border border-brand-100 bg-brand-50/60 p-4">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-brand-700">
            Recruitment Status Stages
          </p>
          <ol className="relative space-y-0">
            {faq.steps.map((s, i) => (
              <li key={s} className="flex gap-3 pb-3 last:pb-0">
                <div className="flex flex-col items-center">
                  <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-500 text-[10px] font-bold text-white">
                    {i + 1}
                  </span>
                  {i < faq.steps!.length - 1 && (
                    <span className="mt-1 w-px flex-1 bg-brand-200" />
                  )}
                </div>
                <span className="pt-0.5 text-[12.5px] font-semibold leading-relaxed text-navy-800 sm:text-[13.5px]">
                  {s}
                </span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Checklist (FAQ 46) */}
      {faq.checklist && (
        <div className="mt-4 rounded-2xl border border-success-100 bg-success-50/70 p-4">
          <p className="mb-2.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-success-600">
            <ListChecksIcon className="h-4 w-4" /> Pre-Departure Checklist
          </p>
          <ul className="grid gap-2 sm:grid-cols-2">
            {faq.checklist.map((c) => (
              <li key={c} className="flex items-start gap-2 text-[12.5px] font-medium leading-relaxed text-navy-700">
                <BadgeCheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-success-500" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Top 10 (FAQ 50) */}
      {faq.top10 && (
        <div className="mt-4 rounded-2xl border border-brand-100 bg-brand-50/60 p-4">
          <p className="mb-2.5 text-[11px] font-bold uppercase tracking-wider text-brand-700">
            Top 10 — যাচাই তালিকা
          </p>
          <ol className="grid gap-2 sm:grid-cols-2">
            {faq.top10.map((t, i) => (
              <li
                key={t}
                className="flex items-start gap-2.5 rounded-xl bg-white/70 px-3 py-2 text-[12.5px] font-semibold leading-relaxed text-navy-800"
              >
                <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-500 text-[10px] font-bold text-white tabular-nums">
                  {i + 1}
                </span>
                {t}
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* WHAT YOU SHOULD DO */}
      {faq.action && (
        <>
          <DetailLabel
            icon={<ListChecksIcon className="h-4 w-4" />}
            text="আপনার যা করা উচিত · WHAT YOU SHOULD DO"
            tone="brand"
          />
          <div className="rounded-2xl glass-tint p-4">
            <p className="flex items-start gap-2.5 text-[13px] leading-[1.75] text-navy-800 sm:text-[14px]">
              <BadgeCheckIcon className="mt-0.5 h-4.5 w-4.5 shrink-0 text-brand-600" />
              {faq.action}
            </p>
          </div>
        </>
      )}

      {/* IMPORTANT */}
      {(faq.warning || faq.govVerify) && (
        <>
          <DetailLabel
            icon={<AlertIcon className="h-4 w-4" />}
            text="গুরুত্বপূর্ণ · IMPORTANT"
            tone="amber"
          />
          <div className="space-y-2.5">
            {faq.govVerify && (
              <div className="flex items-start gap-2.5 rounded-2xl border border-brand-200 bg-brand-50/80 p-3.5">
                <BadgeCheckIcon className="mt-0.5 h-4.5 w-4.5 shrink-0 text-brand-600" />
                <p className="text-[12.5px] font-semibold leading-relaxed text-brand-800 sm:text-[13.5px]">
                  {GOV_VERIFY_NOTE} — eligibility, fees ও প্রক্রিয়া সময়ের
                  সাথে পরিবর্তিত হতে পারে।
                </p>
              </div>
            )}
            {faq.warning && (
              <div className="flex items-start gap-2.5 rounded-2xl border border-amber-100 bg-amber-50/90 p-3.5">
                <AlertIcon className="mt-0.5 h-4.5 w-4.5 shrink-0 text-amber-500" />
                <p className="text-[12.5px] font-semibold leading-relaxed text-amber-600 sm:text-[13.5px]">
                  {faq.warning}
                </p>
              </div>
            )}
          </div>
        </>
      )}

      {/* CONTACT */}
      <DetailLabel
        icon={<PhoneIcon className="h-4 w-4" />}
        text={`যোগাযোগ · ${brand.name}`}
      />
      <div className="rounded-2xl glass p-4">
        <p className="text-[12.5px] leading-relaxed text-navy-600">
          প্রক্রিয়া নিয়ে আরও পরিষ্কার হতে চাইলে অথবা নিজের যোগ্যতা যাচাই
          করতে চাইলে এখনই কল করুন:
        </p>
        <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {brand.phones.map((p) => (
            <a
              key={p.label}
              href={p.href}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-brand-500 text-[13px] font-bold text-white shadow-brand transition hover:bg-brand-600 active:scale-95"
            >
              <PhoneIcon className="h-4 w-4" />
              <span className="tabular-nums">{p.label}</span>
            </a>
          ))}
          <a
            href={brand.email.href}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-white/70 px-3 text-[12.5px] font-bold text-navy-800 ring-1 ring-white transition hover:bg-white active:scale-95 sm:col-span-2"
          >
            <MailIcon className="h-4 w-4 text-brand-600" />
            <span className="truncate">{brand.email.label}</span>
          </a>
        </div>
      </div>
    </div>
  );
}

function DetailLabel({
  icon,
  text,
  tone = "default",
}: {
  icon: React.ReactNode;
  text: string;
  tone?: "default" | "brand" | "amber";
}) {
  return (
    <p
      className={cn(
        "mt-5 mb-2 flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-[0.12em]",
        tone === "brand" && "text-brand-700",
        tone === "amber" && "text-amber-600",
        tone === "default" && "text-navy-500"
      )}
    >
      {icon}
      {text}
    </p>
  );
}
