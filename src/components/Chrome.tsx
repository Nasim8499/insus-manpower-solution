import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { useContent } from "../store/content";
import { useInstall } from "./Install";
import { BrandMark } from "./ui";
import {
  ArrowUp,
  DownloadIcon,
  HelpIcon,
  HomeIcon,
  MailIcon,
  PhoneIcon,
  RouteIcon,
  SettingsIcon,
  ShareIcon,
  ShieldAlertIcon,
} from "./icons";
import { cn } from "../utils/cn";

const NAV_ITEMS = [
  { id: "home", label: "HOME", bn: "হোম", icon: HomeIcon },
  { id: "faq", label: "FAQ", bn: "প্রশ্ন", icon: HelpIcon },
  { id: "process", label: "PROCESS", bn: "প্রসেস", icon: RouteIcon },
  { id: "safety", label: "SAFETY", bn: "সুরক্ষা", icon: ShieldAlertIcon },
  { id: "contact", label: "CONTACT", bn: "যোগাযোগ", icon: PhoneIcon },
];

/* ------------------------------------------------------------
   Ambient white liquid background
------------------------------------------------------------ */
export function AmbientBackground() {
  const reduce = useReducedMotion();
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-white" />
      <div
        className={cn("aurora-blob animate-drift-a", reduce && "animate-none")}
        style={{
          top: "-14%",
          left: "-10%",
          width: "56vw",
          height: "56vw",
          maxWidth: 600,
          maxHeight: 600,
          background:
            "radial-gradient(circle, rgba(173,214,255,.42), rgba(173,214,255,0))",
        }}
      />
      <div
        className={cn("aurora-blob animate-drift-b", reduce && "animate-none")}
        style={{
          top: "34%",
          right: "-16%",
          width: "54vw",
          height: "54vw",
          maxWidth: 580,
          maxHeight: 580,
          background:
            "radial-gradient(circle, rgba(204,230,255,.45), rgba(204,230,255,0))",
        }}
      />
      <div
        className={cn("aurora-blob animate-drift-c", reduce && "animate-none")}
        style={{
          bottom: "-18%",
          left: "16%",
          width: "52vw",
          height: "52vw",
          maxWidth: 560,
          maxHeight: 560,
          background:
            "radial-gradient(circle, rgba(226,241,255,.6), rgba(226,241,255,0))",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(35,66,115,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(35,66,115,.035) 1px, transparent 1px)",
          backgroundSize: "46px 46px",
          maskImage:
            "radial-gradient(ellipse 90% 65% at 50% 0%, black 25%, transparent 72%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 65% at 50% 0%, black 25%, transparent 72%)",
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------
   Top scroll progress
------------------------------------------------------------ */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });
  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[80] h-[3px] origin-left bg-gradient-to-r from-brand-400 via-brand-500 to-brand-600"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}

/* ------------------------------------------------------------
   Glass header
------------------------------------------------------------ */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { brand } = useContent();
  const install = useInstall();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
      className={cn(
        "fixed inset-x-0 top-0 z-[70] transition-all duration-300",
        scrolled ? "glass-header py-2" : "bg-transparent py-3"
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 sm:px-6">
        <a
          href="#home"
          className="flex min-w-0 items-center gap-2.5"
          aria-label={`${brand.name} — হোম`}
        >
          <BrandMark size={36} />
          <span className="flex min-w-0 flex-col leading-none">
            <span className="truncate text-[11.5px] font-extrabold tracking-tight text-navy-900 sm:text-[13px]">
              INSUS MANPOWER
            </span>
            <span className="text-[8.5px] font-bold uppercase tracking-[0.2em] text-brand-600 sm:text-[9px]">
              Global Visa Partner
            </span>
          </span>
        </a>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {install.available && (
            <button
              type="button"
              onClick={install.openPopup}
              aria-label="অ্যাপ ইনস্টল করুন"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 text-brand-600 ring-1 ring-brand-100 transition hover:bg-brand-100 active:scale-90"
            >
              <DownloadIcon className="h-4 w-4" />
            </button>
          )}
          <a
            href="#admin"
            aria-label="অ্যাডমিন প্যানেল"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-navy-50 text-navy-500 ring-1 ring-navy-100 transition hover:bg-navy-100 active:scale-90"
          >
            <SettingsIcon className="h-4 w-4" />
          </a>
          {brand.phones[0] && (
            <a
              href={brand.phones[0].href}
              className="inline-flex items-center gap-1.5 rounded-full bg-brand-500 px-3 py-2 text-[11.5px] font-bold text-white shadow-brand transition hover:bg-brand-600 active:scale-95 sm:px-4 sm:text-[13px]"
            >
              <PhoneIcon className="h-3.5 w-3.5" />
              <span className="tabular-nums">{brand.phones[0].label}</span>
            </a>
          )}
        </div>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------
   Bottom glass navigation
------------------------------------------------------------ */
export function BottomNav() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const sections = NAV_ITEMS.map((n) => document.getElementById(n.id)).filter(
      Boolean
    ) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className="glass-nav fixed inset-x-0 bottom-0 z-[70] pb-safe"
      aria-label="প্রধান নেভিগেশন"
    >
      <ul className="mx-auto grid max-w-md grid-cols-5 px-2 pt-1.5">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "page" : undefined}
                aria-label={`${item.label} — ${item.bn}`}
                className="relative flex flex-col items-center gap-0.5 rounded-2xl px-1 py-1.5 transition active:scale-90"
              >
                {isActive && (
                  <motion.span
                    layoutId="navPill"
                    className="absolute inset-x-1.5 top-0 h-[3px] rounded-full bg-brand-500"
                    transition={{ type: "spring", stiffness: 480, damping: 36 }}
                  />
                )}
                <span
                  className={cn(
                    "inline-flex h-8 w-12 items-center justify-center rounded-xl transition-colors",
                    isActive ? "bg-brand-50 text-brand-600" : "text-navy-400"
                  )}
                >
                  <Icon className="h-[19px] w-[19px]" />
                </span>
                <span
                  className={cn(
                    "text-[9px] font-bold tracking-wide transition-colors sm:text-[10px]",
                    isActive ? "text-brand-700" : "text-navy-400"
                  )}
                >
                  {item.label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/* ------------------------------------------------------------
   Back to top
------------------------------------------------------------ */
export function BackToTop() {
  const [show, setShow] = useState(false);
  const reduce = useReducedMotion();
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 640);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          onClick={() =>
            window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })
          }
          aria-label="উপরে ফিরে যান"
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ type: "spring", stiffness: 320, damping: 22 }}
          whileTap={{ scale: 0.9 }}
          className="glass fixed bottom-24 right-4 z-[65] inline-flex h-12 w-12 items-center justify-center rounded-full text-brand-600 shadow-float"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------
   Footer
------------------------------------------------------------ */
export function Footer() {
  const { brand, state } = useContent();

  return (
    <footer className="relative mt-6 px-4 pb-28 sm:px-6 sm:pb-16">
      <div className="mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-4xl glass p-6 sm:p-8">
          <div className="grid gap-8 md:grid-cols-[1.2fr_1fr_1fr]">
            <div>
              <div className="flex items-center gap-3">
                <BrandMark size={42} />
                <div>
                  <p className="text-[14px] font-extrabold text-navy-900">
                    {brand.name}
                  </p>
                  <p className="text-[9.5px] font-bold uppercase tracking-[0.18em] text-brand-600">
                    {brand.tagline}
                  </p>
                </div>
              </div>
              <p className="mt-4 max-w-sm text-[12.5px] leading-relaxed text-navy-600">
                বাংলাদেশ থেকে সিঙ্গাপুর কর্মী deployment — অফিস নিবন্ধন থেকে
                কর্মস্থলে যোগদান পর্যন্ত স্বচ্ছ তথ্য, নথি নির্দেশনা ও worker
                safety গাইড।
              </p>
            </div>

            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-navy-400">
                Quick Links
              </p>
              <ul className="mt-3 grid gap-2 text-[13px] font-semibold text-navy-700">
                {NAV_ITEMS.map((n) => (
                  <li key={n.id}>
                    <a href={`#${n.id}`} className="transition hover:text-brand-600">
                      {n.label} <span className="font-medium text-navy-400">· {n.bn}</span>
                    </a>
                  </li>
                ))}
                <li>
                  <a href="#sectors" className="transition hover:text-brand-600">
                    SECTORS <span className="font-medium text-navy-400">· কর্মখাত</span>
                  </a>
                </li>
                <li>
                  <a href="#cost" className="transition hover:text-brand-600">
                    COST <span className="font-medium text-navy-400">· খরচ</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#admin"
                    className="inline-flex items-center gap-1.5 text-brand-600 transition hover:text-brand-700"
                  >
                    <SettingsIcon className="h-3.5 w-3.5" />
                    ADMIN PANEL
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-navy-400">
                Contact
              </p>
              <ul className="mt-3 space-y-2.5">
                {brand.phones.map((p) => (
                  <li key={p.label}>
                    <a
                      href={p.href}
                      className="inline-flex items-center gap-2 text-[13px] font-bold tabular-nums text-navy-800 transition hover:text-brand-600"
                    >
                      <PhoneIcon className="h-4 w-4 text-brand-500" />
                      {p.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={brand.email.href}
                    className="inline-flex items-start gap-2 text-[12.5px] font-bold text-navy-800 transition hover:text-brand-600"
                  >
                    <MailIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                    <span className="break-all">{brand.email.label}</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-7 rounded-2xl border border-amber-100 bg-amber-50/80 p-4">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-amber-600">
              Disclaimer · তথ্য-সতর্কতা
            </p>
            <p className="mt-1.5 text-[11.5px] leading-relaxed text-navy-600 sm:text-[12.5px]">
              {state.disclaimer}
            </p>
          </div>

          <div className="mt-6 flex flex-col items-center justify-between gap-2 border-t border-navy-100/80 pt-5 text-center sm:flex-row sm:text-left">
            <p className="text-[11px] font-semibold text-navy-400">
              © {new Date().getFullYear()} {brand.name}. All rights reserved.
            </p>
            <p className="text-[11px] font-semibold text-navy-400">
              Singapore Worker Deployment Digital Center
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
