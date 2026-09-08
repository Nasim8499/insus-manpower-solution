import { motion, useReducedMotion } from "framer-motion";
import { useContent } from "../store/content";
import { BrandMark, Reveal } from "../components/ui";
import {
  ArrowRight,
  ClockIcon,
  DownloadIcon,
  MailIcon,
  PhoneCallIcon,
  PhoneIcon,
} from "../components/icons";
import { useInstall } from "../components/Install";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Contact() {
  const reduce = useReducedMotion();
  const { state, brand } = useContent();
  const install = useInstall();
  const meta = state.sections.contact;

  if (!meta.visible) return null;

  return (
    <section id="contact" className="relative scroll-mt-20 px-4 py-14 sm:px-6 sm:py-20">
      <Reveal>
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-5xl glass p-6 text-center shadow-float sm:p-10 lg:p-12">
          <div
            className="pointer-events-none absolute -top-24 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-brand-200/45 blur-3xl"
            aria-hidden="true"
          />

          <motion.div
            className="relative flex justify-center"
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.7, y: 14 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 240, damping: 18 }}
          >
            <BrandMark size={64} />
          </motion.div>

          <motion.p
            className="mt-4 text-[10.5px] font-bold uppercase tracking-[0.22em] text-brand-600"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
          >
            {brand.tagline}
          </motion.p>
          <h2 className="mt-2 text-xl font-extrabold text-navy-900 sm:text-3xl">
            {meta.title}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[13px] leading-relaxed text-navy-600 sm:text-[15px]">
            {meta.subtitle}
          </p>

          {/* Numbers */}
          <div className="mx-auto mt-6 grid max-w-md grid-cols-1 gap-2.5 sm:grid-cols-2">
            {brand.phones.map((p, i) => (
              <motion.a
                key={p.label}
                href={p.href}
                initial={reduce ? { opacity: 1 } : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.12 + i * 0.08, duration: 0.5, ease }}
                className="reflection flex items-center justify-center gap-2.5 rounded-2xl glass-soft px-4 py-3.5 text-[15px] font-bold tabular-nums text-navy-900 transition active:scale-95"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                  <PhoneIcon className="h-4 w-4" />
                </span>
                {p.label}
              </motion.a>
            ))}
          </div>

          <motion.a
            href={brand.email.href}
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.28, duration: 0.5, ease }}
            className="mx-auto mt-2.5 flex max-w-md items-center justify-center gap-2.5 rounded-2xl glass-soft px-4 py-3.5 text-[13.5px] font-bold text-navy-900 transition active:scale-95"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-50 text-brand-600">
              <MailIcon className="h-4 w-4" />
            </span>
            <span className="truncate">{brand.email.label}</span>
          </motion.a>

          {/* CTA buttons */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            {brand.phones[0] && (
              <a
                href={brand.phones[0].href}
                className={
                  reduce
                    ? "inline-flex h-13 items-center justify-center gap-2 rounded-2xl bg-brand-500 px-7 py-3.5 text-[15px] font-bold text-white shadow-brand transition hover:bg-brand-600 active:scale-95"
                    : "animate-pulse-ring inline-flex h-13 items-center justify-center gap-2 rounded-2xl bg-brand-500 px-7 py-3.5 text-[15px] font-bold text-white shadow-brand transition hover:bg-brand-600 active:scale-95"
                }
              >
                <PhoneCallIcon className="h-4.5 w-4.5" />
                CALL NOW
                <ArrowRight className="h-4 w-4" />
              </a>
            )}
            <a
              href={brand.email.href}
              className="inline-flex h-13 items-center justify-center gap-2 rounded-2xl glass px-7 py-3.5 text-[15px] font-bold text-navy-800 transition hover:bg-white active:scale-95"
            >
              <MailIcon className="h-4.5 w-4.5 text-brand-600" />
              EMAIL US
            </a>
          </div>

          {/* Install CTA */}
          {install.available && (
            <motion.button
              type="button"
              onClick={install.openPopup}
              initial={reduce ? { opacity: 1 } : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              whileTap={{ scale: 0.97 }}
              className="mx-auto mt-3 inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-brand-200 bg-brand-50 px-6 text-[13px] font-bold text-brand-700 transition hover:bg-brand-100"
            >
              <DownloadIcon className="h-4 w-4" />
              Install App — হোম স্ক্রিনে যুক্ত করুন
            </motion.button>
          )}

          <p className="mt-5 inline-flex items-center justify-center gap-1.5 text-[11.5px] font-medium text-navy-400">
            <ClockIcon className="h-3.5 w-3.5" />
            কল বা মেসেজ পেলে যত দ্রুত সম্ভব ফলো-আপ করা হয়
          </p>
        </div>
      </Reveal>
    </section>
  );
}
