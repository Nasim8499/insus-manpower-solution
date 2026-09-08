import { motion, useReducedMotion } from "framer-motion";
import { useContent } from "../store/content";
import { Counter, BrandMark, Reveal } from "../components/ui";
import {
  ArrowRight,
  BadgeCheckIcon,
  CheckCircleIcon,
  MailIcon,
  PhoneIcon,
  PlaneIcon,
  SparklesIcon,
} from "../components/icons";

const ease = [0.22, 1, 0.36, 1] as const;

const TRACKER = [
  { label: "Bangladesh Office", done: true },
  { label: "Documents & Medical", done: true },
  { label: "Approval / IPA", done: true },
  { label: "Flight to Singapore", done: false },
  { label: "Reporting & Joining", done: false },
];

export default function Hero() {
  const reduce = useReducedMotion();
  const { brand, state } = useContent();
  const { hero } = state;

  const stats = [
    { to: state.faqs.length, label: "FAQ উত্তর" },
    { to: state.journey.length, label: "ডিপ্লয়মেন্ট ধাপ" },
    {
      to: new Set(state.faqs.map((f) => f.category)).size,
      label: "ক্যাটাগরি",
    },
  ];

  return (
    <section
      id="home"
      className="relative overflow-hidden px-4 pt-24 sm:px-6 sm:pt-28 lg:pt-32"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 pb-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pb-16">
        {/* ---- Copy ---- */}
        <div className="flex flex-col items-start gap-4 text-left sm:gap-6">
          <motion.div
            className="flex items-center gap-3"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <BrandMark size={40} />
            <div className="leading-tight">
              <p className="text-[12.5px] font-extrabold tracking-[0.05em] text-navy-900 sm:text-[15px]">
                {brand.name}
              </p>
              <p className="mt-0.5 inline-flex items-center gap-1 text-[8.5px] font-bold uppercase tracking-[0.2em] text-brand-600 sm:text-[9.5px]">
                <SparklesIcon className="h-3 w-3" />
                {brand.tagline}
              </p>
            </div>
          </motion.div>

          <motion.h1
            className="text-balance text-[27px] font-extrabold leading-[1.22] text-navy-900 sm:text-4xl lg:text-[44px]"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.06, ease }}
          >
            {hero.headingPrefix}{" "}
            <span className="relative whitespace-nowrap text-brand-600">
              {hero.headingAccent}
              <svg
                className="absolute -bottom-1.5 left-0 w-full text-brand-400/70"
                viewBox="0 0 200 9"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <motion.path
                  d="M2 7C50 2 150 2 198 6"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: reduce ? 1 : 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.7, ease }}
                />
              </svg>
            </span>{" "}
            {hero.headingSuffix}
          </motion.h1>

          <motion.p
            className="max-w-xl text-[14px] leading-relaxed text-navy-600 sm:text-[16px]"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.14, ease }}
          >
            {hero.subheading}
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex w-full flex-col gap-3 sm:flex-row"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22, ease }}
          >
            <a
              href="#faq"
              className="group inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-brand-500 px-6 text-[15px] font-semibold text-white shadow-brand transition hover:bg-brand-600 active:scale-[0.98] sm:flex-none"
            >
              {hero.ctaPrimary}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#contact"
              className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl glass px-6 text-[15px] font-semibold text-navy-800 transition hover:bg-white active:scale-[0.98] sm:flex-none"
            >
              <MailIcon className="h-4 w-4 text-brand-600" />
              {hero.ctaSecondary}
            </a>
          </motion.div>

          {/* Hotline + email */}
          <motion.div
            className="flex w-full flex-col gap-2.5 sm:flex-row sm:flex-wrap"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease }}
          >
            {brand.phones.map((p) => (
              <a
                key={p.label}
                href={p.href}
                className="reflection inline-flex items-center gap-2.5 rounded-2xl glass-soft px-4 py-2.5 text-[13px] font-semibold text-navy-800 transition active:scale-[0.98]"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                  <PhoneIcon className="h-3.5 w-3.5" />
                </span>
                <span className="tabular-nums tracking-wide">{p.label}</span>
              </a>
            ))}
            <a
              href={brand.email.href}
              className="reflection inline-flex items-center gap-2.5 rounded-2xl glass-soft px-4 py-2.5 text-[13px] font-semibold text-navy-800 transition active:scale-[0.98]"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                <MailIcon className="h-3.5 w-3.5" />
              </span>
              <span className="truncate">{brand.email.label}</span>
            </a>
          </motion.div>
        </div>

        {/* ---- Visual: glass deployment card ---- */}
        <motion.div
          className="relative mx-auto w-full max-w-md lg:max-w-none"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.25, ease }}
        >
          <div className={reduce ? "" : "animate-float-y"}>
            <div className="glass rounded-4xl p-5 shadow-float sm:p-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-brand">
                    <PlaneIcon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-[13px] font-bold text-navy-900">
                      Deployment Journey
                    </p>
                    <p className="text-[11px] font-medium text-navy-500">
                      বাংলাদেশ অফিস → সিঙ্গাপুর কর্মস্থল
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-success-50 px-2.5 py-1 text-[10px] font-bold text-success-600">
                  BD → SG
                </span>
              </div>

              <div className="space-y-1">
                {TRACKER.map((t, i) => (
                  <motion.div
                    key={t.label}
                    className="flex items-center gap-3 rounded-2xl px-3 py-2.5"
                    style={{
                      background: t.done
                        ? "rgba(236,253,243,0.85)"
                        : "rgba(255,255,255,0.7)",
                      border: "1px solid rgba(226,239,232,0.9)",
                    }}
                    initial={reduce ? { opacity: 1 } : { opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.55 + i * 0.1, duration: 0.5, ease }}
                  >
                    {t.done ? (
                      <CheckCircleIcon className="h-4.5 w-4.5 shrink-0 text-success-500" />
                    ) : (
                      <span className="h-4.5 w-4.5 shrink-0 rounded-full border-2 border-navy-200" />
                    )}
                    <span
                      className={`text-[12px] font-semibold sm:text-[13px] ${
                        t.done ? "text-navy-700" : "text-navy-400"
                      }`}
                    >
                      {t.label}
                    </span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2.5">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl border border-navy-100 bg-white/70 px-2 py-3 text-center backdrop-blur"
                  >
                    <p className="text-xl font-extrabold tabular-nums text-brand-600 sm:text-2xl">
                      <Counter to={s.to} />
                    </p>
                    <p className="mt-0.5 text-[10px] font-medium text-navy-500 sm:text-[11px]">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Floating badge */}
          <motion.div
            className="absolute -left-3 -top-4 hidden items-center gap-2 rounded-2xl glass px-3.5 py-2.5 shadow-float sm:flex sm:-left-6"
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, type: "spring", stiffness: 260, damping: 18 }}
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-success-50 text-success-600">
              <BadgeCheckIcon className="h-4 w-4" />
            </span>
            <div>
              <p className="text-[11px] font-bold leading-tight text-navy-900">
                Verified Guidance
              </p>
              <p className="text-[9.5px] font-medium leading-tight text-navy-500">
                Rules-first information
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Trust strip */}
      <Reveal delay={0.1}>
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-2.5 pb-4 sm:grid-cols-4">
          {[
            { t: "Employer যাচাই", d: "চাকরির উৎস নিশ্চিত করুন" },
            { t: "IPA ও Work Permit", d: "অনুমোদন প্রক্রিয়া বুঝুন" },
            { t: "খরচের স্বচ্ছতা", d: "লিখিত breakdown ও রসিদ" },
            { t: "Scam সতর্কতা", d: "গ্যারান্টির ফাঁকি চিনুন" },
          ].map((x) => (
            <div key={x.t} className="glass-soft rounded-2xl px-3.5 py-3 sm:px-4">
              <p className="text-[11.5px] font-bold text-navy-900 sm:text-[13px]">
                {x.t}
              </p>
              <p className="mt-0.5 text-[10.5px] leading-snug text-navy-500 sm:text-[11.5px]">
                {x.d}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
