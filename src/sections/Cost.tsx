import { motion, useReducedMotion } from "framer-motion";
import { useContent } from "../store/content";
import {
  iconMap,
  InfoIcon,
  ReceiptIcon,
  ShieldCheckIcon,
  WalletIcon,
} from "../components/icons";
import { Reveal, SectionHeading } from "../components/ui";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Cost() {
  const reduce = useReducedMotion();
  const { state } = useContent();
  const meta = state.sections.cost;
  const costItems = state.costItems;

  if (!meta.visible) return null;

  return (
    <section
      id="cost"
      className="relative scroll-mt-20 px-4 py-14 sm:px-6 sm:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow={meta.eyebrow} title={meta.title} accent={meta.accent} subtitle={meta.subtitle} />

        {/* Receipt banner */}
        <Reveal delay={0.05}>
          <div className="mx-auto mt-8 flex max-w-3xl items-center gap-4 rounded-4xl glass p-5 sm:p-6">
            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-brand sm:h-14 sm:w-14">
              <ReceiptIcon className="h-6 w-6 sm:h-7 sm:w-7" />
            </span>
            <div>
              <p className="text-[14px] font-bold text-navy-900 sm:text-[16px]">
                {state.costReceiptNote}
              </p>
              <p className="mt-0.5 text-[12px] font-medium text-navy-500 sm:text-[13px]">
                সবসময় লিখিত cost breakdown ও প্রতিটি payment-এর রসিদ সংরক্ষণ করুন।
              </p>
            </div>
          </div>
        </Reveal>

        {/* Cost cards — 2 per row on mobile */}
        <div className="mt-5 grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-3">
          {costItems.map((item, i) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap] ?? WalletIcon;
            return (
              <motion.div
                key={item.id}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: Math.min(i * 0.06, 0.35), ease }}
                whileHover={reduce ? undefined : { y: -4 }}
                className="reflection glass-soft flex flex-col rounded-3xl p-3.5 sm:p-5"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 sm:h-12 sm:w-12">
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </span>
                <h3 className="mt-3 text-[11.5px] font-bold leading-snug text-navy-900 sm:text-[14px]">
                  {item.title}
                </h3>
                <p className="mt-1 text-[11px] font-semibold text-brand-600 sm:text-[12.5px]">
                  {item.bn}
                </p>
                <p className="mt-2 text-[10.5px] leading-relaxed text-navy-500 sm:text-[12px]">
                  {item.description}
                </p>
                <p className="mt-3 border-t border-navy-100/80 pt-2.5 text-[10px] font-semibold italic leading-relaxed text-navy-400 sm:text-[11px]">
                  {state.costNote}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Who bears note */}
        <Reveal delay={0.1}>
          <div className="mx-auto mt-5 flex max-w-3xl items-start gap-3 rounded-3xl glass-tint p-4 sm:p-5">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/80 text-brand-600">
              <ShieldCheckIcon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-[13.5px] font-bold text-navy-900">
                কোন খরচ কে বহন করবে?
              </p>
              <p className="mt-1 text-[12.5px] leading-relaxed text-navy-600">
                কোন খাতের খরচ employer বহন করবেন আর কোনটি worker বহন করবেন — তা
                লিখিত employment terms ও বর্তমান প্রযোজ্য নিয়ম অনুযায়ী নিশ্চিত
                করুন। অস্পষ্ট বা অব্যাখ্যাত কোনো fee পরিশোধ করার আগে লিখিত
                ব্যাখ্যা চান।
              </p>
              <p className="mt-2 flex items-center gap-1.5 text-[11.5px] font-semibold text-brand-700">
                <InfoIcon className="h-3.5 w-3.5" />
                সরকারি fees ও নিয়ম সময়ের সাথে পরিবর্তিত হতে পারে।
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
