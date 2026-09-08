import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { JourneyStage } from "../data/faqs";
import { useContent } from "../store/content";
import { SectionHeading, Sheet } from "../components/ui";
import {
  CheckIcon,
  ChevronRight,
  ClockIcon,
  MapPinIcon,
  RouteIcon,
} from "../components/icons";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Journey() {
  const [stage, setStage] = useState<JourneyStage | null>(null);
  const reduce = useReducedMotion();
  const { state } = useContent();
  const meta = state.sections.process;
  const journey = state.journey;

  if (!meta.visible) return null;

  return (
    <section
      id="process"
      className="relative scroll-mt-20 px-4 py-14 sm:px-6 sm:py-20"
    >
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow={
            <>
              <RouteIcon className="h-3.5 w-3.5" /> {meta.eyebrow}
            </>
          }
          title={meta.title}
          accent={meta.accent}
          subtitle={meta.subtitle}
        />

        <div className="relative mt-10">
          {/* vertical line */}
          <div
            className="absolute bottom-9 left-[35px] top-9 w-[2px] rounded-full bg-navy-100 sm:bottom-11 sm:left-[43px] sm:top-11"
            aria-hidden="true"
          >
            <motion.div
              className="w-full rounded-full bg-gradient-to-b from-brand-400 to-brand-600"
              initial={{ height: reduce ? "100%" : "0%" }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: reduce ? 0.2 : 1.4, ease }}
            />
          </div>

          <ol className="space-y-3 sm:space-y-4">
            {journey.map((s, i) => {
              const step = String(i + 1).padStart(2, "0");
              return (
                <motion.li
                  key={`${s.id}-${i}`}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, x: -26 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.5,
                    delay: Math.min(i * 0.04, 0.4),
                    ease,
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setStage(s)}
                    aria-haspopup="dialog"
                    aria-label={`ধাপ ${step}: ${s.title} — বিস্তারিত দেখুন`}
                    className="reflection group flex w-full items-center gap-3.5 rounded-3xl glass-soft p-3 pr-4 text-left transition active:scale-[0.98] sm:gap-5 sm:p-4"
                  >
                    <span className="relative z-10 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-[13px] font-extrabold tabular-nums text-brand-600 shadow-card ring-1 ring-brand-100 sm:h-14 sm:w-14 sm:text-[15px]">
                      {step}
                      <span className="absolute -right-1 -top-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-brand-500 text-white opacity-0 transition group-hover:opacity-100">
                        <ChevronRight className="h-2.5 w-2.5" />
                      </span>
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-brand-600">
                        Step {step}
                      </span>
                      <span className="block truncate text-[13.5px] font-bold text-navy-900 sm:text-[15.5px]">
                        {s.title}
                      </span>
                      <span className="block truncate text-[11.5px] font-medium text-navy-500 sm:text-[13px]">
                        {s.bn}
                      </span>
                    </span>
                    <MapPinIcon className="hidden h-4 w-4 shrink-0 text-navy-200 sm:block" />
                    <ChevronRight className="h-4 w-4 shrink-0 text-navy-300 transition group-hover:translate-x-0.5 group-hover:text-brand-500" />
                  </button>
                </motion.li>
              );
            })}
          </ol>
        </div>

        {/* timeline note */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
          className="mt-6 flex items-start gap-3 rounded-3xl glass p-4 sm:p-5"
        >
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-amber-500">
            <ClockIcon className="h-5 w-5" />
          </span>
          <div>
            <p className="text-[13.5px] font-bold text-navy-900">
              Processing time is not guaranteed
            </p>
            <p className="mt-0.5 text-[12.5px] leading-relaxed text-navy-600">
              প্রতিটি ক্ষেত্রে সময় ভিন্ন হতে পারে — employer readiness, document,
              government processing ও medical-এর ওপর সময় নির্ভর করে। কোনো
              নির্দিষ্ট তারিখের প্রতিশ্রুতিকে নিশ্চিত ধরে নেবেন না।
            </p>
          </div>
        </motion.div>
      </div>

      <Sheet
        open={!!stage}
        onClose={() => setStage(null)}
        label={stage ? `${stage.title} ধাপের বিস্তারিত` : "প্রসেস ধাপ"}
      >
        {stage && (
          <div>
            <div className="flex items-center gap-4 pr-10">
              <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-500 text-lg font-extrabold tabular-nums text-white shadow-brand">
                {String((journey.findIndex((x) => x.id === stage.id) ?? 0) + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand-600">
                  Deployment Stage
                </p>
                <h3 className="text-[17px] font-bold leading-tight text-navy-900 sm:text-xl">
                  {stage.title}
                </h3>
                <p className="text-[13px] font-semibold text-navy-500">
                  {stage.bn}
                </p>
              </div>
            </div>

            <p className="mt-4 rounded-2xl glass-soft p-4 text-[13.5px] leading-[1.8] text-navy-700">
              {stage.summary}
            </p>

            <p className="mb-2 mt-5 text-[10.5px] font-bold uppercase tracking-[0.12em] text-navy-500">
              এই ধাপে আপনার করণীয়
            </p>
            <ul className="space-y-2">
              {stage.points.map((p, i) => (
                <motion.li
                  key={`${p}-${i}`}
                  initial={reduce ? { opacity: 1 } : { opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.4, ease }}
                  className="flex items-start gap-2.5 rounded-2xl border border-success-100 bg-success-50/80 p-3 text-[13px] font-medium leading-relaxed text-navy-800"
                >
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success-500 text-white">
                    <CheckIcon className="h-3 w-3" />
                  </span>
                  {p}
                </motion.li>
              ))}
            </ul>
          </div>
        )}
      </Sheet>
    </section>
  );
}
