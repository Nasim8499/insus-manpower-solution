import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  BRAND,
  COST_ITEMS,
  COST_NOTE,
  COST_RECEIPT_NOTE,
  DISCLAIMER,
  FAQS,
  JOURNEY,
  SCAM_RED_FLAGS,
  SECTORS,
  VERIFY_CHECKLIST,
  type CostItem,
  type Faq,
  type JourneyStage,
  type Sector,
} from "../data/faqs";

/* ============================================================
   Types — editable content model (future CMS-ready)
   ============================================================ */
export interface SectionMeta {
  id: string;
  label: string;
  eyebrow: string;
  title: string;
  accent?: string;
  subtitle: string;
  visible: boolean;
}

export interface HeroContent {
  headingPrefix: string;
  headingAccent: string;
  headingSuffix: string;
  subheading: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

export interface ContentState {
  brandName: string;
  tagline: string;
  phones: string[];
  email: string;
  hero: HeroContent;
  sections: Record<string, SectionMeta>;
  faqs: Faq[];
  journey: JourneyStage[];
  sectors: Sector[];
  costItems: CostItem[];
  costNote: string;
  costReceiptNote: string;
  redFlags: string[];
  verifyList: string[];
  disclaimer: string;
}

export interface BrandShape {
  name: string;
  tagline: string;
  phones: { label: string; href: string }[];
  email: { label: string; href: string };
}

export const STORAGE_KEY = "insus-content-v2";

export function phoneToHref(label: string): string {
  const digits = label.replace(/\D/g, "");
  if (/^01\d{9}$/.test(digits)) return `tel:+880${digits.slice(1)}`;
  return `tel:${digits}`;
}

/* ============================================================
   Factory defaults (mirror the shipped data file)
   ============================================================ */
export function defaultContent(): ContentState {
  const sections: Record<string, SectionMeta> = {
    faq: {
      id: "faq",
      label: "FAQ Center",
      eyebrow: "FAQ CENTER",
      title: "আপনার প্রশ্ন,",
      accent: "স্পষ্ট উত্তর",
      subtitle:
        "চাকরি, Work Permit, IPA, খরচ, Medical, Onboarding অথবা Scam — যে বিষয়ে জানতে চান, সার্চ করুন বা ক্যাটাগরি বেছে নিন।",
      visible: true,
    },
    process: {
      id: "process",
      label: "Deployment Process",
      eyebrow: "DEPLOYMENT JOURNEY",
      title: "বাংলাদেশ থেকে কর্মস্থল পর্যন্ত",
      accent: "সম্পূর্ণ যাত্রা",
      subtitle:
        "অফিসে নিবন্ধন থেকে শুরু করে ডকুমেন্টেশন, মেডিকেল, অনুমোদন, ফ্লাইট, আগমন, এমপ্লয়ার রিপোর্টিং এবং কর্মস্থলে যোগদান — প্রতিটি ধাপে ট্যাপ করে বিস্তারিত জানুন।",
      visible: true,
    },
    sectors: {
      id: "sectors",
      label: "Sectors",
      eyebrow: "WORK PERMIT SECTORS",
      title: "সিঙ্গাপুরের কর্মখাত",
      accent: "৫টি প্রধান সেক্টর",
      subtitle:
        "কোন খাতে কোন ধরনের কাজ থাকে এবং কোন পাস প্রযোজ্য হতে পারে — দেখে নিন। eligibility, quota ও levy বর্তমান সরকারি নিয়ম অনুযায়ী যাচাই করতে হবে।",
      visible: true,
    },
    cost: {
      id: "cost",
      label: "Cost Transparency",
      eyebrow: "COST TRANSPARENCY · খরচের স্বচ্ছতা",
      title: "কোন খাতে কী খরচ হতে",
      accent: "পারে",
      subtitle:
        "আমরা কোনো fixed price বলি না — কারণ খরচ নির্ভর করে নির্দিষ্ট কেস ও তৎকালীন প্রযোজ্য নিয়মের ওপর। প্রতিটি খাত আলাদাভাবে বুঝে নিন।",
      visible: true,
    },
    safety: {
      id: "safety",
      label: "Worker Safety",
      eyebrow: "WORKER SAFETY CENTER",
      title: "Scam চিনুন,",
      accent: "নিরাপদ থাকুন",
      subtitle:
        "বিদেশযাত্রার আগে সতর্কতাই সবচেয়ে বড় সুরক্ষা। নিচের red flag গুলো দেখলেই থামুন, যাচাই করুন।",
      visible: true,
    },
    contact: {
      id: "contact",
      label: "Contact",
      eyebrow: "GET IN TOUCH",
      title: "যাত্রা নিয়ে কথা বলুন",
      accent: "",
      subtitle:
        "Need help understanding the Singapore recruitment process? বাংলাদেশ থেকে সিঙ্গাপুর যাত্রার যেকোনো ধাপে পরিষ্কার গাইড পেতে আজই যোগাযোগ করুন।",
      visible: true,
    },
  };

  return {
    brandName: BRAND.name,
    tagline: BRAND.tagline,
    phones: BRAND.phones.map((p) => p.label),
    email: BRAND.email.label,
    hero: {
      headingPrefix: "বাংলাদেশ থেকে সিঙ্গাপুরে চাকরি —",
      headingAccent: "পুরো প্রক্রিয়া",
      headingSuffix: "এক জায়গায়",
      subheading:
        "চাকরি নির্বাচন থেকে Employer, Work Permit, IPA, Pre-Departure এবং Singapore Onboarding পর্যন্ত — প্রয়োজনীয় প্রশ্নের সহজ ও নির্ভরযোগ্য উত্তর।",
      ctaPrimary: "FAQ দেখুন",
      ctaSecondary: "যোগাযোগ করুন",
    },
    sections,
    faqs: FAQS,
    journey: JOURNEY,
    sectors: SECTORS,
    costItems: COST_ITEMS,
    costNote: COST_NOTE,
    costReceiptNote: COST_RECEIPT_NOTE,
    redFlags: SCAM_RED_FLAGS,
    verifyList: VERIFY_CHECKLIST,
    disclaimer: DISCLAIMER,
  };
}

function load(): ContentState {
  const fallback = defaultContent();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as Partial<ContentState>;
    return {
      ...fallback,
      ...parsed,
      hero: { ...fallback.hero, ...(parsed.hero ?? {}) },
      sections: { ...fallback.sections, ...(parsed.sections ?? {}) },
    };
  } catch {
    return fallback;
  }
}

/* ============================================================
   Context
   ============================================================ */
interface ContentCtx {
  state: ContentState;
  update: (patch: Partial<ContentState>) => void;
  setSection: (id: string, patch: Partial<SectionMeta>) => void;
  reset: () => void;
  replaceAll: (next: ContentState) => void;
  brand: BrandShape;
}

const Ctx = createContext<ContentCtx | null>(null);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ContentState>(load);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage unavailable */
    }
  }, [state]);

  const value = useMemo<ContentCtx>(() => {
    const brand: BrandShape = {
      name: state.brandName,
      tagline: state.tagline,
      phones: state.phones
        .filter(Boolean)
        .map((label) => ({ label, href: phoneToHref(label) })),
      email: { label: state.email, href: `mailto:${state.email}` },
    };
    return {
      state,
      update: (patch) => setState((s) => ({ ...s, ...patch })),
      setSection: (id, patch) =>
        setState((s) => ({
          ...s,
          sections: {
            ...s.sections,
            [id]: { ...s.sections[id], ...patch },
          },
        })),
      reset: () => setState(defaultContent()),
      replaceAll: (next) => setState(next),
      brand,
    };
  }, [state]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useContent(): ContentCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useContent must be used within ContentProvider");
  return ctx;
}

/* ------------------------------------------------------------
   FAQ / journey / sector mutation helpers
------------------------------------------------------------ */
export function blankFaq(nextId: number): Faq {
  return {
    id: nextId,
    category: "চাকরি",
    question: "নতুন প্রশ্ন লিখুন",
    shortAnswer: "সংক্ষিপ্ত উত্তর লিখুন",
    fullAnswer: "পূর্ণাঙ্গ উত্তর লিখুন",
    action: "",
    warning: "",
    tags: [],
    published: true,
    featured: false,
  };
}

export function linesToList(text: string): string[] {
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

export function listToLines(list: string[]): string {
  return list.join("\n");
}
