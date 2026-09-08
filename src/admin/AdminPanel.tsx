import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useContent, defaultContent, blankFaq, linesToList, listToLines } from "../store/content";
import { iconMap } from "../components/icons";
import {
  ArrowDownIcon,
  ArrowUp,
  CheckIcon,
  DownloadIcon,
  EyeIcon,
  LockIcon,
  PhoneIcon,
  PlusIcon,
  RotateIcon,
  SettingsIcon,
  TrashIcon,
  UploadIcon,
  XIcon,
  ChevronDown,
  HomeIcon,
  HelpIcon,
  RouteIcon,
  LayersIcon,
  ShieldAlertIcon,
  MailIcon,
  WalletIcon,
  BriefcaseIcon,
} from "../components/icons";
import {
  CATEGORIES,
  type CostItem,
  type Faq,
  type JourneyStage,
  type Sector,
} from "../data/faqs";
import { cn } from "../utils/cn";

const PIN = "insus2025";
const AUTH_KEY = "insus-admin-unlocked";

const TABS = [
  { id: "home", label: "Homepage", icon: HomeIcon },
  { id: "sections", label: "Sections", icon: LayersIcon },
  { id: "faq", label: "FAQ", icon: HelpIcon },
  { id: "process", label: "Process", icon: RouteIcon },
  { id: "sectors", label: "Sectors", icon: BriefcaseIcon },
  { id: "safety", label: "Safety & Cost", icon: ShieldAlertIcon },
  { id: "contact", label: "Contact", icon: PhoneIcon },
  { id: "data", label: "Data", icon: WalletIcon },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function AdminPanel() {
  const [open, setOpen] = useState(false);
  const [unlocked, setUnlocked] = useState(
    () => sessionStorage.getItem(AUTH_KEY) === "1"
  );

  useEffect(() => {
    const onHash = () => setOpen(window.location.hash === "#admin");
    onHash();
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const close = () => {
    const y = window.scrollY;
    if (window.location.hash === "#admin") {
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search
      );
    }
    setOpen(false);
    requestAnimationFrame(() => window.scrollTo(0, y));
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-stretch sm:items-center sm:justify-center sm:p-6">
          <motion.div
            className="absolute inset-0 bg-navy-950/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
            exit={{ opacity: 0 }}
            onClick={unlocked ? close : undefined}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Admin panel"
            className="relative z-10 flex w-full flex-col overflow-hidden bg-white/95 shadow-float backdrop-blur-2xl sm:max-h-[92vh] sm:max-w-5xl sm:rounded-[28px] sm:ring-1 sm:ring-navy-100"
            initial={{ y: 60, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
          >
            {unlocked ? <AdminConsole onClose={close} /> : <LockGate onUnlock={() => setUnlocked(true)} />}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------
   Lock gate
------------------------------------------------------------ */
function LockGate({ onUnlock }: { onUnlock: () => void }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const reduce = useReducedMotion();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim() === PIN) {
      sessionStorage.setItem(AUTH_KEY, "1");
      onUnlock();
    } else {
      setError(true);
      setTimeout(() => setError(false), 600);
    }
  };

  return (
    <div className="flex min-h-[72vh] flex-col items-center justify-center gap-5 px-6 py-12 sm:min-h-[440px]">
      <motion.span
        animate={error && !reduce ? { x: [0, -8, 8, -6, 6, 0] } : undefined}
        transition={{ duration: 0.4 }}
        className="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-brand-500 text-white shadow-brand"
      >
        <LockIcon className="h-7 w-7" />
      </motion.span>
      <div className="text-center">
        <h2 className="text-xl font-extrabold text-navy-900">Admin Access</h2>
        <p className="mt-1 text-[13px] text-navy-500">
          কন্টেন্ট ম্যানেজ করতে অ্যাডমিন পিন দিন
        </p>
      </div>
      <form onSubmit={submit} className="w-full max-w-xs space-y-3">
        <input
          type="password"
          inputMode="text"
          autoFocus
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Admin PIN"
          aria-label="Admin PIN"
          className={cn(
            "adm-input h-12 text-center tracking-widest",
            error && "border-danger-500 ring-4 ring-danger-100"
          )}
        />
        <button
          type="submit"
          className="h-12 w-full rounded-2xl bg-brand-500 text-[14px] font-bold text-white shadow-brand transition hover:bg-brand-600 active:scale-[0.98]"
        >
          আনলক করুন
        </button>
        <button
          type="button"
          onClick={() => setShowHint((s) => !s)}
          className="w-full text-center text-[11.5px] font-semibold text-navy-400 hover:text-navy-600"
        >
          {showHint ? "ডিফল্ট ডেমো পিন: insus2025" : "পিন জানেন না?"}
        </button>
      </form>
    </div>
  );
}

/* ------------------------------------------------------------
   Console shell with tabs
------------------------------------------------------------ */
function AdminConsole({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState<TabId>("home");
  const scrollRef = useRef<HTMLDivElement>(null);
  const { state } = useContent();

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [tab]);

  return (
    <>
      {/* Top bar */}
      <div className="flex shrink-0 items-center gap-3 border-b border-navy-100 bg-white/90 px-4 py-3 backdrop-blur sm:px-6">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
          <SettingsIcon className="h-4.5 w-4.5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[14px] font-extrabold text-navy-900">
            Admin Panel
          </p>
          <p className="flex items-center gap-1 text-[11px] font-semibold text-success-600">
            <CheckIcon className="h-3 w-3" /> লোকাল ডিভাইসে অটো-সেভ চালু
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="অ্যাডমিন বন্ধ করুন"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-navy-50 text-navy-500 transition hover:bg-navy-100 active:scale-90"
        >
          <XIcon className="h-4 w-4" />
        </button>
      </div>

      {/* Tabs */}
      <div className="no-scrollbar flex shrink-0 gap-1.5 overflow-x-auto border-b border-navy-100 bg-white/80 px-3 py-2 sm:px-5">
        {TABS.map((t) => {
          const Icon = t.icon;
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={cn(
                "relative inline-flex shrink-0 items-center gap-1.5 rounded-xl px-3.5 py-2 text-[12px] font-bold transition active:scale-95",
                active ? "text-white" : "bg-navy-50 text-navy-600 hover:bg-navy-100"
              )}
            >
              {active && (
                <motion.span
                  layoutId="adminTab"
                  className="absolute inset-0 rounded-xl bg-brand-500 shadow-brand"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <Icon className="relative h-4 w-4" />
              <span className="relative whitespace-nowrap">{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div
        ref={scrollRef}
        className="nice-scroll min-h-0 flex-1 overflow-y-auto bg-[#f7faff] px-4 py-5 sm:px-6"
      >
        <div className="mx-auto max-w-3xl space-y-4 pb-6">
          {tab === "home" && <HomeTab />}
          {tab === "sections" && <SectionsTab />}
          {tab === "faq" && <FaqTab />}
          {tab === "process" && <ProcessTab />}
          {tab === "sectors" && <SectorsTab />}
          {tab === "safety" && <SafetyCostTab />}
          {tab === "contact" && <ContactTab />}
          {tab === "data" && <DataTab onClose={onClose} />}

          <p className="pt-2 text-center text-[11px] font-medium text-navy-400">
            {state.faqs.length}টি FAQ · {state.journey.length}টি প্রসেস ধাপ ·{" "}
            {state.sectors.length}টি সেক্টর — পরিবর্তন সঙ্গে সঙ্গে হোমপেজে দেখা যায়।
          </p>
        </div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------
   Primitives
------------------------------------------------------------ */
function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="adm-label">{label}</span>
      {children}
    </label>
  );
}

const inputCls = "adm-input";

function Card({
  title,
  desc,
  children,
  actions,
}: {
  title: string;
  desc?: string;
  children: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-navy-100 bg-white p-4 shadow-card">
      <div className="mb-3.5 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-[13.5px] font-extrabold text-navy-900">{title}</h3>
          {desc && <p className="mt-0.5 text-[11.5px] text-navy-500">{desc}</p>}
        </div>
        {actions}
      </div>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl bg-navy-50/70 px-3 py-2.5">
      <span className="text-[12.5px] font-bold text-navy-700">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative h-6 w-11 shrink-0 rounded-full transition-colors",
          checked ? "bg-brand-500" : "bg-navy-200"
        )}
      >
        <motion.span
          className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow"
          animate={{ left: checked ? 22 : 2 }}
          transition={{ type: "spring", stiffness: 500, damping: 32 }}
        />
      </button>
    </div>
  );
}

function Disclosure({
  title,
  badge,
  startOpen = false,
  actions,
  children,
}: {
  title: string;
  badge?: string;
  startOpen?: boolean;
  actions?: ReactNode;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(startOpen);
  return (
    <div className="overflow-hidden rounded-2xl border border-navy-100 bg-white">
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="flex min-w-0 flex-1 items-center gap-2 px-3 py-3 text-left"
        >
          <ChevronDown
            className={cn(
              "h-4 w-4 shrink-0 text-navy-400 transition-transform duration-300",
              open && "rotate-180"
            )}
          />
          <span className="min-w-0 flex-1 truncate text-[12.5px] font-bold text-navy-900">
            {title}
          </span>
          {badge && (
            <span className="shrink-0 rounded-full bg-brand-50 px-2 py-0.5 text-[9.5px] font-bold uppercase text-brand-700">
              {badge}
            </span>
          )}
        </button>
        {actions && <div className="flex shrink-0 items-center gap-1 pr-2">{actions}</div>}
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="space-y-3 border-t border-navy-100 p-3.5">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function IconButton({
  onClick,
  label,
  danger,
  children,
}: {
  onClick: () => void;
  label: string;
  danger?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center rounded-lg transition active:scale-90",
        danger
          ? "bg-danger-50 text-danger-500 hover:bg-danger-100"
          : "bg-navy-50 text-navy-600 hover:bg-navy-100"
      )}
    >
      {children}
    </button>
  );
}

/* ------------------------------------------------------------
   Tab: Homepage (brand + hero)
------------------------------------------------------------ */
function HomeTab() {
  const { state, update } = useContent();
  const h = state.hero;
  return (
    <>
      <Card title="ব্র্যান্ড তথ্য" desc="হেডার, হিরো ও ফুটারে দেখানো ব্র্যান্ড নাম">
        <Field label="Company Name">
          <input
            className={inputCls}
            value={state.brandName}
            onChange={(e) => update({ brandName: e.target.value })}
          />
        </Field>
        <Field label="Tagline">
          <input
            className={inputCls}
            value={state.tagline}
            onChange={(e) => update({ tagline: e.target.value })}
          />
        </Field>
      </Card>

      <Card title="Hero Section" desc="হোমপেজের প্রধান শিরোনাম ও বাটন">
        <div className="grid gap-3 sm:grid-cols-3">
          <Field label="শিরোনাম — শুরু">
            <input
              className={inputCls}
              value={h.headingPrefix}
              onChange={(e) => update({ hero: { ...h, headingPrefix: e.target.value } })}
            />
          </Field>
          <Field label="হাইলাইট অংশ (নীল)">
            <input
              className={inputCls}
              value={h.headingAccent}
              onChange={(e) => update({ hero: { ...h, headingAccent: e.target.value } })}
            />
          </Field>
          <Field label="শিরোনাম — শেষ">
            <input
              className={inputCls}
              value={h.headingSuffix}
              onChange={(e) => update({ hero: { ...h, headingSuffix: e.target.value } })}
            />
          </Field>
        </div>
        <Field label="Subheading">
          <textarea
            className={inputCls}
            rows={3}
            value={h.subheading}
            onChange={(e) => update({ hero: { ...h, subheading: e.target.value } })}
          />
        </Field>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="প্রাইমারি বাটন">
            <input
              className={inputCls}
              value={h.ctaPrimary}
              onChange={(e) => update({ hero: { ...h, ctaPrimary: e.target.value } })}
            />
          </Field>
          <Field label="সেকেন্ডারি বাটন">
            <input
              className={inputCls}
              value={h.ctaSecondary}
              onChange={(e) => update({ hero: { ...h, ctaSecondary: e.target.value } })}
            />
          </Field>
        </div>
      </Card>
    </>
  );
}

/* ------------------------------------------------------------
   Tab: Sections visibility + titles
------------------------------------------------------------ */
function SectionsTab() {
  const { state, setSection } = useContent();
  return (
    <Card title="সেকশন ম্যানেজমেন্ট" desc="শিরোনাম পরিবর্তন ও হোমপেজে দেখানো/লুকানো">
      <div className="space-y-3">
        {Object.values(state.sections).map((s) => (
          <div
            key={s.id}
            className="space-y-2.5 rounded-2xl border border-navy-100 bg-navy-50/40 p-3.5"
          >
            <Toggle
              label={`${s.label} — হোমপেজে দেখান`}
              checked={s.visible}
              onChange={(v) => setSection(s.id, { visible: v })}
            />
            <Field label="Eyebrow (ছোট লেবেল)">
              <input
                className={inputCls}
                value={s.eyebrow}
                onChange={(e) => setSection(s.id, { eyebrow: e.target.value })}
              />
            </Field>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="শিরোনাম">
                <input
                  className={inputCls}
                  value={s.title}
                  onChange={(e) => setSection(s.id, { title: e.target.value })}
                />
              </Field>
              <Field label="হাইলাইট শব্দ (নীল)">
                <input
                  className={inputCls}
                  value={s.accent ?? ""}
                  onChange={(e) => setSection(s.id, { accent: e.target.value })}
                />
              </Field>
            </div>
            <Field label="Subtitle">
              <textarea
                className={inputCls}
                rows={2}
                value={s.subtitle}
                onChange={(e) => setSection(s.id, { subtitle: e.target.value })}
              />
            </Field>
          </div>
        ))}
      </div>
    </Card>
  );
}

/* ------------------------------------------------------------
   Tab: FAQ CRUD
------------------------------------------------------------ */
function FaqTab() {
  const { state, update } = useContent();
  const [query, setQuery] = useState("");
  const [newIds, setNewIds] = useState<number[]>([]);

  const setFaqs = (faqs: Faq[]) => update({ faqs });
  const patchFaq = (id: number, patch: Partial<Faq>) =>
    setFaqs(state.faqs.map((f) => (f.id === id ? { ...f, ...patch } : f)));

  const addFaq = () => {
    const nextId = Math.max(0, ...state.faqs.map((f) => f.id)) + 1;
    const faq = blankFaq(nextId);
    setFaqs([...state.faqs, faq]);
    setNewIds((ids) => [...ids, nextId]);
  };

  const move = (index: number, dir: -1 | 1) => {
    const next = [...state.faqs];
    const j = index + dir;
    if (j < 0 || j >= next.length) return;
    [next[index], next[j]] = [next[j], next[index]];
    setFaqs(next);
  };

  const remove = (id: number) => {
    if (!window.confirm("এই FAQ ডিলিট করতে চান?")) return;
    setFaqs(state.faqs.filter((f) => f.id !== id));
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return state.faqs;
    return state.faqs.filter(
      (f) =>
        f.question.toLowerCase().includes(q) ||
        f.category.toLowerCase().includes(q)
    );
  }, [state.faqs, query]);

  return (
    <>
      <Card
        title={`FAQ ম্যানেজমেন্ট (${state.faqs.length})`}
        desc="নতুন প্রশ্ন যোগ, সম্পাদনা, ক্রম পরিবর্তন, পাবলিশ ও ফিচার্ড করুন"
        actions={
          <button
            type="button"
            onClick={addFaq}
            className="inline-flex shrink-0 items-center gap-1 rounded-xl bg-brand-500 px-3 py-2 text-[11.5px] font-bold text-white shadow-brand transition hover:bg-brand-600 active:scale-95"
          >
            <PlusIcon className="h-3.5 w-3.5" /> নতুন FAQ
          </button>
        }
      >
        <input
          className={inputCls}
          placeholder="প্রশ্ন বা ক্যাটাগরি খুঁজুন…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <datalist id="faq-categories">
          {CATEGORIES.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>
      </Card>

      <div className="space-y-2.5">
        {filtered.map((f) => {
          const index = state.faqs.findIndex((x) => x.id === f.id);
          return (
            <Disclosure
              key={f.id}
              startOpen={newIds.includes(f.id)}
              title={`${String(f.id).padStart(2, "0")} · ${f.question}`}
              badge={f.category}
              actions={
                <>
                  <IconButton label="উপরে" onClick={() => move(index, -1)}>
                    <ArrowUp className="h-4 w-4" />
                  </IconButton>
                  <IconButton label="নিচে" onClick={() => move(index, 1)}>
                    <ArrowDownIcon className="h-4 w-4" />
                  </IconButton>
                  <IconButton label="ডিলিট" danger onClick={() => remove(f.id)}>
                    <TrashIcon className="h-4 w-4" />
                  </IconButton>
                </>
              }
            >
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="ক্যাটাগরি">
                  <input
                    className={inputCls}
                    list="faq-categories"
                    value={f.category}
                    onChange={(e) => patchFaq(f.id, { category: e.target.value })}
                  />
                </Field>
                <Field label="Tags (কমা দিয়ে আলাদা)">
                  <input
                    className={inputCls}
                    value={f.tags.join(", ")}
                    onChange={(e) =>
                      patchFaq(f.id, {
                        tags: e.target.value
                          .split(",")
                          .map((t) => t.trim())
                          .filter(Boolean),
                      })
                    }
                  />
                </Field>
              </div>
              <Field label="প্রশ্ন">
                <textarea
                  className={inputCls}
                  rows={2}
                  value={f.question}
                  onChange={(e) => patchFaq(f.id, { question: e.target.value })}
                />
              </Field>
              <Field label="সংক্ষিপ্ত উত্তর (কার্ড প্রিভিউ)">
                <textarea
                  className={inputCls}
                  rows={2}
                  value={f.shortAnswer}
                  onChange={(e) => patchFaq(f.id, { shortAnswer: e.target.value })}
                />
              </Field>
              <Field label="পূর্ণাঙ্গ উত্তর">
                <textarea
                  className={inputCls}
                  rows={4}
                  value={f.fullAnswer}
                  onChange={(e) => patchFaq(f.id, { fullAnswer: e.target.value })}
                />
              </Field>
              <Field label="What you should do (আপনার করণীয়)">
                <textarea
                  className={inputCls}
                  rows={2}
                  value={f.action ?? ""}
                  onChange={(e) => patchFaq(f.id, { action: e.target.value })}
                />
              </Field>
              <Field label="Important / Warning">
                <textarea
                  className={inputCls}
                  rows={2}
                  value={f.warning ?? ""}
                  onChange={(e) => patchFaq(f.id, { warning: e.target.value })}
                />
              </Field>
              <div className="grid gap-2 sm:grid-cols-2">
                <Toggle
                  label="Published (হোমপেজে দেখান)"
                  checked={f.published !== false}
                  onChange={(v) => patchFaq(f.id, { published: v })}
                />
                <Toggle
                  label="Featured (হাইলাইটেড কার্ড)"
                  checked={!!f.featured}
                  onChange={(v) => patchFaq(f.id, { featured: v })}
                />
              </div>
            </Disclosure>
          );
        })}
        {filtered.length === 0 && (
          <p className="rounded-2xl border border-dashed border-navy-200 p-6 text-center text-[12.5px] font-semibold text-navy-400">
            কোনো FAQ পাওয়া যায়নি।
          </p>
        )}
      </div>
    </>
  );
}

/* ------------------------------------------------------------
   Tab: Process steps
------------------------------------------------------------ */
function ProcessTab() {
  const { state, update } = useContent();

  const patch = (id: number, p: Partial<JourneyStage>) =>
    update({
      journey: state.journey.map((s) => (s.id === id ? { ...s, ...p } : s)),
    });

  const add = () =>
    update({
      journey: [
        ...state.journey,
        {
          id: Math.max(0, ...state.journey.map((s) => s.id)) + 1,
          step: String(state.journey.length + 1).padStart(2, "0"),
          title: "New Stage",
          bn: "নতুন ধাপ",
          summary: "",
          points: [],
        },
      ],
    });

  const remove = (id: number) =>
    update({ journey: state.journey.filter((s) => s.id !== id) });

  const move = (index: number, dir: -1 | 1) => {
    const next = [...state.journey];
    const j = index + dir;
    if (j < 0 || j >= next.length) return;
    [next[index], next[j]] = [next[j], next[index]];
    update({ journey: next });
  };

  return (
    <Card
      title={`Deployment Process (${state.journey.length} ধাপ)`}
      desc="বাংলাদেশ অফিস → কর্মস্থলে যোগদান — ধাপের ক্রম ও বিবরণ"
      actions={
        <button
          type="button"
          onClick={add}
          className="inline-flex shrink-0 items-center gap-1 rounded-xl bg-brand-500 px-3 py-2 text-[11.5px] font-bold text-white shadow-brand transition hover:bg-brand-600 active:scale-95"
        >
          <PlusIcon className="h-3.5 w-3.5" /> ধাপ যোগ
        </button>
      }
    >
      <div className="space-y-2.5">
        {state.journey.map((s, i) => (
          <Disclosure
            key={s.id}
            title={`ধাপ ${String(i + 1).padStart(2, "0")} · ${s.title}`}
            badge={s.bn}
            actions={
              <>
                <IconButton label="উপরে" onClick={() => move(i, -1)}>
                  <ArrowUp className="h-4 w-4" />
                </IconButton>
                <IconButton label="নিচে" onClick={() => move(i, 1)}>
                  <ArrowDownIcon className="h-4 w-4" />
                </IconButton>
                <IconButton label="ডিলিট" danger onClick={() => remove(s.id)}>
                  <TrashIcon className="h-4 w-4" />
                </IconButton>
              </>
            }
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Title (English)">
                <input
                  className={inputCls}
                  value={s.title}
                  onChange={(e) => patch(s.id, { title: e.target.value })}
                />
              </Field>
              <Field label="বাংলা শিরোনাম">
                <input
                  className={inputCls}
                  value={s.bn}
                  onChange={(e) => patch(s.id, { bn: e.target.value })}
                />
              </Field>
            </div>
            <Field label="সারসংক্ষেপ">
              <textarea
                className={inputCls}
                rows={2}
                value={s.summary}
                onChange={(e) => patch(s.id, { summary: e.target.value })}
              />
            </Field>
            <Field label="করণীয় (প্রতি লাইনে একটি)">
              <textarea
                className={inputCls}
                rows={4}
                value={listToLines(s.points)}
                onChange={(e) => patch(s.id, { points: linesToList(e.target.value) })}
              />
            </Field>
          </Disclosure>
        ))}
      </div>
    </Card>
  );
}

/* ------------------------------------------------------------
   Tab: Sectors
------------------------------------------------------------ */
function SectorsTab() {
  const { state, update } = useContent();

  const patch = (id: string, p: Partial<Sector>) =>
    update({
      sectors: state.sectors.map((s) => (s.id === id ? { ...s, ...p } : s)),
    });

  const add = () =>
    update({
      sectors: [
        ...state.sectors,
        {
          id: `sector-${Date.now()}`,
          name: "New Sector",
          bn: "নতুন খাত",
          icon: "briefcase",
          description: "",
          roles: [],
        },
      ],
    });

  const remove = (id: string) =>
    update({ sectors: state.sectors.filter((s) => s.id !== id) });

  return (
    <Card
      title={`Singapore Sectors (${state.sectors.length})`}
      desc="Work Permit-এর আওতাভুক্ত কর্মখাত ও কাজের ধরন"
      actions={
        <button
          type="button"
          onClick={add}
          className="inline-flex shrink-0 items-center gap-1 rounded-xl bg-brand-500 px-3 py-2 text-[11.5px] font-bold text-white shadow-brand transition hover:bg-brand-600 active:scale-95"
        >
          <PlusIcon className="h-3.5 w-3.5" /> সেক্টর যোগ
        </button>
      }
    >
      <div className="space-y-2.5">
        {state.sectors.map((s) => (
          <Disclosure
            key={s.id}
            title={`${s.name} · ${s.bn}`}
            actions={
              <IconButton label="ডিলিট" danger onClick={() => remove(s.id)}>
                <TrashIcon className="h-4 w-4" />
              </IconButton>
            }
          >
            <div className="grid gap-3 sm:grid-cols-3">
              <Field label="Name">
                <input
                  className={inputCls}
                  value={s.name}
                  onChange={(e) => patch(s.id, { name: e.target.value })}
                />
              </Field>
              <Field label="বাংলা নাম">
                <input
                  className={inputCls}
                  value={s.bn}
                  onChange={(e) => patch(s.id, { bn: e.target.value })}
                />
              </Field>
              <Field label="আইকন">
                <select
                  className={inputCls}
                  value={s.icon}
                  onChange={(e) => patch(s.id, { icon: e.target.value })}
                >
                  {Object.keys(iconMap).map((k) => (
                    <option key={k} value={k}>
                      {k}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
            <Field label="বিবরণ">
              <textarea
                className={inputCls}
                rows={2}
                value={s.description}
                onChange={(e) => patch(s.id, { description: e.target.value })}
              />
            </Field>
            <Field label="কাজের ধরন (প্রতি লাইনে একটি)">
              <textarea
                className={inputCls}
                rows={3}
                value={listToLines(s.roles)}
                onChange={(e) => patch(s.id, { roles: linesToList(e.target.value) })}
              />
            </Field>
          </Disclosure>
        ))}
      </div>
    </Card>
  );
}

/* ------------------------------------------------------------
   Tab: Safety & Cost
------------------------------------------------------------ */
function SafetyCostTab() {
  const { state, update } = useContent();

  const patchCost = (id: string, p: Partial<CostItem>) =>
    update({
      costItems: state.costItems.map((c) =>
        c.id === id ? { ...c, ...p } : c
      ),
    });

  const addCost = () =>
    update({
      costItems: [
        ...state.costItems,
        {
          id: `cost-${Date.now()}`,
          title: "New Cost",
          bn: "নতুন খরচ খাত",
          icon: "wallet",
          description: "",
        },
      ],
    });

  const removeCost = (id: string) =>
    update({ costItems: state.costItems.filter((c) => c.id !== id) });

  return (
    <>
      <Card title="Scam Red Flags" desc="প্রতি লাইনে একটি সতর্কতা">
        <textarea
          className={inputCls}
          rows={8}
          value={listToLines(state.redFlags)}
          onChange={(e) => update({ redFlags: linesToList(e.target.value) })}
        />
      </Card>

      <Card title="Verify Before You Pay Checklist" desc="প্রতি লাইনে একটি যাচাই ধাপ">
        <textarea
          className={inputCls}
          rows={6}
          value={listToLines(state.verifyList)}
          onChange={(e) => update({ verifyList: linesToList(e.target.value) })}
        />
      </Card>

      <Card title="Cost Transparency">
        <Field label="Amount note">
          <input
            className={inputCls}
            value={state.costNote}
            onChange={(e) => update({ costNote: e.target.value })}
          />
        </Field>
        <Field label="Receipt note">
          <input
            className={inputCls}
            value={state.costReceiptNote}
            onChange={(e) => update({ costReceiptNote: e.target.value })}
          />
        </Field>
        <div className="space-y-2.5 pt-1">
          <div className="flex items-center justify-between">
            <p className="adm-label !mb-0">খরচের খাতসমূহ</p>
            <button
              type="button"
              onClick={addCost}
              className="inline-flex items-center gap-1 rounded-xl bg-brand-50 px-3 py-1.5 text-[11px] font-bold text-brand-700 transition hover:bg-brand-100"
            >
              <PlusIcon className="h-3.5 w-3.5" /> যোগ
            </button>
          </div>
          {state.costItems.map((c) => (
            <Disclosure
              key={c.id}
              title={`${c.title} · ${c.bn}`}
              actions={
                <IconButton label="ডিলিট" danger onClick={() => removeCost(c.id)}>
                  <TrashIcon className="h-4 w-4" />
                </IconButton>
              }
            >
              <div className="grid gap-3 sm:grid-cols-3">
                <Field label="Title">
                  <input
                    className={inputCls}
                    value={c.title}
                    onChange={(e) => patchCost(c.id, { title: e.target.value })}
                  />
                </Field>
                <Field label="বাংলা">
                  <input
                    className={inputCls}
                    value={c.bn}
                    onChange={(e) => patchCost(c.id, { bn: e.target.value })}
                  />
                </Field>
                <Field label="আইকন">
                  <select
                    className={inputCls}
                    value={c.icon}
                    onChange={(e) => patchCost(c.id, { icon: e.target.value })}
                  >
                    {Object.keys(iconMap).map((k) => (
                      <option key={k} value={k}>
                        {k}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>
              <Field label="বিবরণ">
                <textarea
                  className={inputCls}
                  rows={2}
                  value={c.description}
                  onChange={(e) => patchCost(c.id, { description: e.target.value })}
                />
              </Field>
            </Disclosure>
          ))}
        </div>
      </Card>

      <Card title="Footer Disclaimer" desc="সব পেজের নিচে দেখানো আইনি সতর্কতা">
        <textarea
          className={inputCls}
          rows={5}
          value={state.disclaimer}
          onChange={(e) => update({ disclaimer: e.target.value })}
        />
      </Card>
    </>
  );
}

/* ------------------------------------------------------------
   Tab: Contact
------------------------------------------------------------ */
function ContactTab() {
  const { state, update } = useContent();

  const setPhone = (i: number, v: string) =>
    update({ phones: state.phones.map((p, idx) => (idx === i ? v : p)) });

  return (
    <>
      <Card title="Hotline Numbers" desc="সাইটব্যাপী কল বাটনে ব্যবহৃত নম্বর">
        {state.phones.map((p, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <PhoneIcon className="h-4 w-4" />
            </span>
            <input
              className={inputCls}
              value={p}
              inputMode="tel"
              onChange={(e) => setPhone(i, e.target.value)}
            />
            {state.phones.length > 1 && (
              <IconButton
                label="নম্বর মুছুন"
                danger
                onClick={() =>
                  update({ phones: state.phones.filter((_, idx) => idx !== i) })
                }
              >
                <TrashIcon className="h-4 w-4" />
              </IconButton>
            )}
          </div>
        ))}
        {state.phones.length < 4 && (
          <button
            type="button"
            onClick={() => update({ phones: [...state.phones, "01XXX-XXXXXX"] })}
            className="inline-flex items-center gap-1.5 self-start rounded-xl border border-dashed border-brand-300 px-3 py-2 text-[12px] font-bold text-brand-700 transition hover:bg-brand-50"
          >
            <PlusIcon className="h-3.5 w-3.5" /> আরেকটি নম্বর যোগ করুন
          </button>
        )}
      </Card>

      <Card title="Official Email">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
            <MailIcon className="h-4 w-4" />
          </span>
          <input
            className={inputCls}
            type="email"
            value={state.email}
            onChange={(e) => update({ email: e.target.value })}
          />
        </div>
      </Card>
    </>
  );
}

/* ------------------------------------------------------------
   Tab: Data (export / import / reset)
------------------------------------------------------------ */
function DataTab({ onClose }: { onClose: () => void }) {
  const { state, replaceAll, reset } = useContent();
  const fileRef = useRef<HTMLInputElement>(null);
  const [msg, setMsg] = useState<string | null>(null);

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "insus-content-backup.json";
    a.click();
    URL.revokeObjectURL(url);
    setMsg("ব্যাকআপ ফাইল ডাউনলোড হয়েছে।");
  };

  const importJson = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        if (!parsed.faqs || !Array.isArray(parsed.faqs)) {
          throw new Error("invalid");
        }
        const d = defaultContent();
        replaceAll({
          ...d,
          ...parsed,
          hero: { ...d.hero, ...(parsed.hero ?? {}) },
          sections: { ...d.sections, ...(parsed.sections ?? {}) },
        });
        setMsg("কন্টেন্ট সফলভাবে ইম্পোর্ট হয়েছে।");
      } catch {
        setMsg("ফাইলটি সঠিক নয় — বৈধ INSUS ব্যাকআপ JSON দিন।");
      }
    };
    reader.readAsText(file);
  };

  const doReset = () => {
    if (!window.confirm("সব পরিবর্তন মুছে ডিফল্ট কন্টেন্টে ফিরে যেতে চান?")) return;
    reset();
    setMsg("ডিফল্ট কন্টেন্ট পুনরুদ্ধার হয়েছে।");
  };

  return (
    <>
      <Card title="কন্টেন্ট ব্যাকআপ ও স্থানান্তর" desc="পরবর্তীতে CMS/ডাটাবেসে সংযোগের জন্য প্রস্তুত JSON ফরম্যাট">
        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={exportJson}
            className="flex items-center gap-3 rounded-2xl border border-navy-100 bg-white p-4 text-left transition hover:border-brand-300 hover:bg-brand-50/40 active:scale-[0.98]"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <DownloadIcon className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-[13px] font-extrabold text-navy-900">
                Export JSON
              </span>
              <span className="block text-[11px] text-navy-500">
                সব কন্টেন্ট ব্যাকআপ ডাউনলোড
              </span>
            </span>
          </button>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="flex items-center gap-3 rounded-2xl border border-navy-100 bg-white p-4 text-left transition hover:border-brand-300 hover:bg-brand-50/40 active:scale-[0.98]"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <UploadIcon className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-[13px] font-extrabold text-navy-900">
                Import JSON
              </span>
              <span className="block text-[11px] text-navy-500">
                ব্যাকআপ থেকে কন্টেন্ট পুনরুদ্ধার
              </span>
            </span>
          </button>
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="application/json,.json"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) importJson(f);
            e.target.value = "";
          }}
        />
      </Card>

      <Card title="রিসেট" desc="সব সম্পাদনা মুছে ফেলে শুরুর কন্টেন্ট ফিরিয়ে আনে">
        <button
          type="button"
          onClick={doReset}
          className="inline-flex items-center gap-2 rounded-2xl border border-danger-200 bg-danger-50 px-4 py-3 text-[13px] font-bold text-danger-600 transition hover:bg-danger-100 active:scale-[0.98]"
        >
          <RotateIcon className="h-4 w-4" /> ডিফল্টে রিসেট করুন
        </button>
      </Card>

      <Card title="লাইভ প্রিভিউ">
        <p className="text-[12.5px] leading-relaxed text-navy-600">
          সব পরিবর্তন সঙ্গে সঙ্গে হোমপেজে প্রযোজ্য হয় এবং এই ডিভাইসে সংরক্ষিত
          থাকে। সম্পাদনা শেষে অ্যাডমিন বন্ধ করে হোমপেজ দেখুন।
        </p>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center gap-2 rounded-2xl bg-brand-500 px-4 py-3 text-[13px] font-bold text-white shadow-brand transition hover:bg-brand-600 active:scale-[0.98]"
        >
          <EyeIcon className="h-4 w-4" /> হোমপেজে ফিরে দেখুন
        </button>
      </Card>

      {msg && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 rounded-xl bg-success-50 px-4 py-3 text-[12.5px] font-bold text-success-600"
        >
          <CheckIcon className="h-4 w-4 shrink-0" /> {msg}
        </motion.p>
      )}
    </>
  );
}
