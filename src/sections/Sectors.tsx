import { motion, useReducedMotion } from "framer-motion";
import { PASS_TIERS } from "../data/faqs";
import { useContent } from "../store/content";
import { SectionHeading, Reveal } from "../components/ui";
import { iconMap, BadgeCheckIcon, LayersIcon } from "../components/icons";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Sectors() {
  const reduce = useReducedMotion();
  const { state } = useContent();
  const meta = state.sections.sectors;
  const sectors = state.sectors;

  if (!meta.visible) return null;

  return (
    <section
      id="sectors"
      className="relative scroll-mt-20 px-4 py-14 sm:px-6 sm:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow={
            <>
              <LayersIcon className="h-3.5 w-3.5" /> {meta.eyebrow}
            </>
          }
          title={meta.title}
          accent={meta.accent}
          subtitle={meta.subtitle}
        />

        <div className="mt-9 grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-3">
          {sectors.map((sector, i) => {
            const Icon =
              iconMap[sector.icon as keyof typeof iconMap] ?? LayersIcon;
            return (
              <motion.article
                key={sector.id}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.5,
                  delay: Math.min(i * 0.06, 0.35),
                  ease,
                }}
                whileHover={reduce ? undefined : { y: -4 }}
                className="reflection group glass-soft flex flex-col rounded-3xl p-3.5 sm:p-5"
              >
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-brand sm:h-12 sm:w-12">
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="truncate text-[12px] font-extrabold text-navy-900 sm:text-[15px]">
                      {sector.name}
                    </h3>
                    <p className="truncate text-[10.5px] font-bold text-brand-600 sm:text-[12px]">
                      {sector.bn}
                    </p>
                  </div>
                </div>
                <p className="mt-2.5 text-[10.5px] leading-relaxed text-navy-500 sm:text-[12.5px]">
                  {sector.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {sector.roles.slice(0, 4).map((r) => (
                    <span
                      key={r}
                      className="rounded-full bg-brand-50 px-2 py-0.5 text-[9px] font-bold text-brand-700 sm:text-[10px]"
                    >
                      {r}
                    </span>
                  ))}
                  {sector.roles.length > 4 && (
                    <span className="rounded-full bg-navy-50 px-2 py-0.5 text-[9px] font-bold text-navy-500 sm:text-[10px]">
                      +{sector.roles.length - 4}
                    </span>
                  )}
                </div>
              </motion.article>
            );
          })}

          {/* Pass tier card fills the 6th slot */}
          <Reveal delay={0.1} className="col-span-2 lg:col-span-3">
            <div className="glass-tint mt-1 rounded-3xl p-4 sm:p-6">
              <p className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-[0.14em] text-brand-700">
                <BadgeCheckIcon className="h-4 w-4" />
                Work Pass-এর প্রধান স্তর
              </p>
              <div className="mt-3 grid gap-2.5 sm:grid-cols-3">
                {PASS_TIERS.map((tier) => (
                  <div
                    key={tier.code}
                    className="rounded-2xl border border-white/80 bg-white/75 p-3.5 backdrop-blur"
                  >
                    <p className="text-[12.5px] font-extrabold text-navy-900 sm:text-[13.5px]">
                      {tier.code}
                    </p>
                    <p className="text-[11.5px] font-bold text-brand-600">
                      {tier.bn}
                    </p>
                    <p className="mt-1.5 text-[10.5px] leading-relaxed text-navy-500 sm:text-[11.5px]">
                      {tier.note}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-[10.5px] font-semibold italic leading-relaxed text-navy-400 sm:text-[11.5px]">
                * Sector eligibility, quota, levy, salary ও pass মানদণ্ড বর্তমান
                সরকারি নিয়ম অনুযায়ী যাচাই করতে হবে — পরিবর্তনযোগ্য।
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
