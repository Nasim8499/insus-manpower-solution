import { motion, useReducedMotion } from "framer-motion";
import { useInstall } from "../components/Install";
import { BrandMark, Reveal } from "../components/ui";
import {
  CheckCircleIcon,
  DownloadIcon,
  InfoIcon,
  ShareIcon,
} from "../components/icons";

const APK_URL = `${import.meta.env.BASE_URL}downloads/insus-manpower-solution.apk`;

const ANDROID_STEPS = [
  "Download APK-তে ট্যাপ করুন",
  "ডাউনলোড শেষ হলে ফাইলটি খুলুন",
  "Install চাপুন এবং অ্যাপ চালু করুন",
];

export default function AppDownload() {
  const reduce = useReducedMotion();
  const { available, openPopup } = useInstall();

  return (
    <section id="install" className="relative px-4 py-10 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-4xl bg-navy-950 p-5 text-white shadow-float sm:p-8 lg:p-10">
            <div
              className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-brand-500/30 blur-3xl"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-cyan-400/15 blur-3xl"
              aria-hidden="true"
            />

            <div className="relative grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-brand-200">
                  <DownloadIcon className="h-3.5 w-3.5" />
                  App download
                </div>
                <div className="mt-5 flex items-start gap-3">
                  <BrandMark size={46} />
                  <div>
                    <h2 className="text-balance text-2xl font-extrabold leading-tight sm:text-3xl">
                      অ্যাপটি সরাসরি ফোনে নিন
                    </h2>
                    <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-blue-100 sm:text-[15px]">
                      Android ফোনে নিচের বোতামে ট্যাপ করলেই আসল APK ফাইল ডাউনলোড হবে।
                      ইনস্টল করার পর FAQ, deployment guide ও safety তথ্য হাতের কাছে থাকবে।
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <motion.a
                    href={APK_URL}
                    download="insus-manpower-solution.apk"
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-brand-500 px-5 text-[14px] font-extrabold text-white shadow-brand transition hover:bg-brand-400"
                  >
                    <DownloadIcon className="h-4.5 w-4.5" />
                    APK Download করুন
                  </motion.a>
                  {available && (
                    <button
                      type="button"
                      onClick={openPopup}
                      className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-5 text-[13px] font-bold text-white transition hover:bg-white/15"
                    >
                      <ShareIcon className="h-4 w-4" />
                      Install App ছাড়া APK
                    </button>
                  )}
                </div>

                <p className="mt-4 inline-flex items-start gap-2 text-[11px] leading-relaxed text-blue-100/80">
                  <InfoIcon className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  APK শুধু Android-এর জন্য। iPhone/iPad-এ নিচের নির্দেশনা অনুযায়ী Home Screen-এ যোগ করুন।
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.08] p-5 backdrop-blur sm:p-6">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-brand-200">
                  Android install steps
                </p>
                <ol className="mt-4 space-y-3">
                  {ANDROID_STEPS.map((step, index) => (
                    <li key={step} className="flex items-center gap-3">
                      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-brand-500/20 text-[12px] font-extrabold text-brand-200">
                        {index + 1}
                      </span>
                      <span className="text-[13px] font-semibold text-white/90">{step}</span>
                      <CheckCircleIcon className="ml-auto h-4 w-4 shrink-0 text-emerald-300" />
                    </li>
                  ))}
                </ol>
                <div className="mt-5 rounded-2xl bg-amber-300/10 p-3 text-[11px] leading-relaxed text-amber-100">
                  প্রয়োজনে Android Settings → Security থেকে “Install unknown apps” অনুমতি দিন।
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-3 rounded-3xl glass-soft p-5 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-brand-600">
                  iPhone / iPad
                </p>
                <p className="mt-1 text-[13px] font-semibold text-navy-800 sm:text-[14px]">
                  Safari-তে Share → Add to Home Screen চাপুন। iOS-এ APK ইনস্টল করা যায় না।
                </p>
              </div>
              {available && (
                <button
                  type="button"
                  onClick={openPopup}
                  className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-xl bg-brand-50 px-4 text-[12px] font-bold text-brand-700 transition hover:bg-brand-100"
                >
                  <ShareIcon className="h-4 w-4" />
                  Install guide দেখুন
                </button>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
