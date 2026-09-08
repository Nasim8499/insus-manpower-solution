import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  AnimatePresence,
  motion,
  useDragControls,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { XIcon } from "./icons";
import { cn } from "../utils/cn";

/* ------------------------------------------------------------
   Brand mark
------------------------------------------------------------ */
export function BrandMark({
  size = 40,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "relative inline-flex items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-brand",
        className
      )}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.9}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ width: size * 0.58, height: size * 0.58 }}
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
      <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-success-500 ring-2 ring-white" />
    </span>
  );
}

/* ------------------------------------------------------------
   Scroll reveal wrapper
------------------------------------------------------------ */
export function Reveal({
  children,
  delay = 0,
  y = 22,
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-60px" }}
      transition={{
        duration: reduce ? 0.2 : 0.65,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------
   Section heading
------------------------------------------------------------ */
export function SectionHeading({
  eyebrow,
  title,
  accent,
  subtitle,
  align = "center",
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  accent?: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start text-left"
      )}
    >
      <Reveal>
        <span className="inline-flex items-center gap-1.5 rounded-full glass-soft px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-700 sm:text-[11px]">
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="text-balance text-2xl font-bold leading-tight text-navy-900 sm:text-3xl lg:text-[34px]">
          {title}
          {accent ? <span className="text-brand-600"> {accent}</span> : null}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.1}>
          <p
            className={cn(
              "max-w-2xl text-[13px] leading-relaxed text-navy-600 sm:text-[15px]",
              align === "center" && "mx-auto"
            )}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/* ------------------------------------------------------------
   Animated counter
------------------------------------------------------------ */
export function Counter({
  to,
  duration = 1.4,
  className,
  suffix = "",
}: {
  to: number;
  duration?: number;
  className?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setValue(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * to));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, reduce]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {value}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------
   Bottom sheet / modal (Liquid Glass)
------------------------------------------------------------ */
export function Sheet({
  open,
  onClose,
  children,
  label,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  label: string;
}) {
  const reduce = useReducedMotion();
  const dragControls = useDragControls();
  const closeRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => closeRef.current?.focus(), 120);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      window.clearTimeout(t);
      previouslyFocused.current?.focus?.();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center sm:p-6">
          <motion.div
            className="absolute inset-0 bg-navy-950/35"
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(10px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: reduce ? 0.15 : 0.3 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={label}
            className="glass relative z-10 flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-[28px] sm:max-w-2xl sm:rounded-[28px]"
            initial={
              reduce
                ? { opacity: 0 }
                : { opacity: 0, y: 80, scale: 0.98 }
            }
            animate={
              reduce
                ? { opacity: 1 }
                : { opacity: 1, y: 0, scale: 1 }
            }
            exit={
              reduce
                ? { opacity: 0 }
                : { opacity: 0, y: 60, scale: 0.98 }
            }
            transition={{ type: "spring", stiffness: 340, damping: 34 }}
            drag={reduce ? undefined : "y"}
            dragListener={false}
            dragControls={dragControls}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.6 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 120 || info.velocity.y > 700) onClose();
            }}
          >
            <div
              className="mx-auto mt-2.5 h-1.5 w-12 shrink-0 cursor-grab touch-none rounded-full bg-navy-200/80 active:cursor-grabbing sm:hidden"
              onPointerDown={(e) => {
                e.preventDefault();
                dragControls.start(e);
              }}
            />
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="বন্ধ করুন"
              className="absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/70 text-navy-600 shadow-card backdrop-blur transition hover:bg-white hover:text-navy-900 active:scale-90"
            >
              <XIcon className="h-4.5 w-4.5" />
            </button>
            <div className="overflow-y-auto overscroll-contain px-5 pb-8 pt-4 sm:px-8 sm:pt-7">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
