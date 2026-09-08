import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useContent } from "../store/content";
import { SectionHeading, Sheet } from "../components/ui";
import {
  CheckIcon,
  PhoneIcon,
  ShieldAlertIcon,
  ShieldCheckIcon,
  XCircleIcon,
} from "../components/icons";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Safety() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const { state, brand } = useContent();
  const meta = state.sections.safety;

  if (!meta.visible) return null;

  return (
    <section
      id="safety"
      className="relative scroll-mt-20 px-4 py-14 sm:px-6 sm:py-20"
    >
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow={
            <>
              <ShieldAlertIcon className="h-3.5 w-3.5" /> {meta.eyebrow}
            </>
          }
          title={meta.title}
          accent={meta.accent}
          subtitle={meta.subtitle}
        />

        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease }}
          className="mt-8 overflow-hidden rounded-4xl glass-danger p-5 sm:p-8"
        >
          <div className="flex items-center gap-3">
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-danger-500 text-white shadow-danger sm:h-13 sm:w-13">
              <ShieldAlertIcon className="h-5.5 w-5.5 sm:h-6 sm:w-6" />
            </span>
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-danger-600">
                Scam Alert
              </p>
              <h3 className="text-[17px] font-bold text-navy-900 sm:text-xl">
                এই Red Flag গুলো দেখলেই সতর্ক হন
              </h3>
            </div>
          </div>

          <ul className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {state.redFlags.map((flag, i) => (
              <motion.li
                key={`${flag}-${i}`}
                initial={reduce ? { opacity: 1 } : { opacity: 0, x: -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.05, duration: 0.4, ease }}
                className="flex items-center gap-2.5 rounded-2xl border border-danger-100 bg-white/75 p-3 backdrop-blur"
              >
                <XCircleIcon className="h-5 w-5 shrink-0 text-danger-500" />
                <span className="text-[12.5px] font-semibold leading-snug text-navy-800 sm:text-[13.5px]">
                  {flag}
                </span>
              </motion.li>
            ))}
          </ul>

          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
            <motion.button
              type="button"
              onClick={() => setOpen(true)}
              whileTap={{ scale: 0.97 }}
              whileHover={reduce ? undefined : { scale: 1.02 }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-danger-500 px-6 py-3.5 text-[14.5px] font-bold text-white shadow-danger transition hover:bg-danger-600 sm:w-auto"
            >
              <ShieldCheckIcon className="h-5 w-5" />
              Verify Before You Pay
            </motion.button>
            {brand.phones[0] && (
              <a
                href={brand.phones[0].href}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white/80 px-6 py-3.5 text-[13.5px] font-bold text-navy-800 ring-1 ring-white transition hover:bg-white active:scale-[0.98] sm:w-auto"
              >
                <PhoneIcon className="h-4.5 w-4.5 text-danger-500" />
                সন্দেহ হলে কল করুন
              </a>
            )}
          </div>
        </motion.div>
      </div>

      {/* Verify checklist sheet */}
      <Sheet open={open} onClose={() => setOpen(false)} label="টাকা দেওয়ার আগে যাচাই করুন">
        <div>
          <div className="flex items-center gap-3 pr-10">
            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-success-500 text-white shadow-[0_12px_28px_-10px_rgba(37,184,100,.55)]">
              <ShieldCheckIcon className="h-6 w-6" />
            </span>
            <div>
              <h3 className="text-[18px] font-bold text-navy-900">
                Verify Before You Pay
              </h3>
              <p className="text-[12.5px] font-medium text-navy-500">
                টাকা দেওয়ার আগে এই বিষয়গুলো নিশ্চিত করুন
              </p>
            </div>
          </div>

          <ul className="mt-5 space-y-2.5">
            {state.verifyList.map((item, i) => (
              <motion.li
                key={`${item}-${i}`}
                initial={reduce ? { opacity: 1 } : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + i * 0.07, duration: 0.4, ease }}
                className="flex items-start gap-3 rounded-2xl border border-success-100 bg-success-50/80 p-3.5"
              >
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-success-500 text-white">
                  <CheckIcon className="h-3.5 w-3.5" />
                </span>
                <span className="text-[13px] font-semibold leading-relaxed text-navy-800">
                  {item}
                </span>
              </motion.li>
            ))}
          </ul>

          <div className="mt-5 rounded-2xl glass-tint p-4 text-center">
            <p className="text-[12.5px] leading-relaxed text-navy-600">
              কোনো নথি বা প্রতিশ্রুতি নিয়ে সন্দেহ হলে অর্থ পাঠানো বন্ধ রাখুন এবং
              আমাদের সাথে কথা বলুন:
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
            </div>
          </div>
        </div>
      </Sheet>
    </section>
  );
}
