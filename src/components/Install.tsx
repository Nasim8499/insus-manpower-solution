import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BrandMark } from "./ui";
import {
  DownloadIcon,
  GridIcon,
  PlusIcon,
  ShareIcon,
  XIcon,
} from "./icons";

type InstallKind = "prompt" | "ios";

interface InstallCtxValue {
  kind: InstallKind | null;
  installed: boolean;
  available: boolean;
  install: () => Promise<"accepted" | "dismissed" | null>;
  openPopup: () => void;
  closePopup: () => void;
  popupOpen: boolean;
}

const InstallCtx = createContext<InstallCtxValue | null>(null);
const DISMISS_KEY = "insus-install-dismissed-at";
const DISMISS_DAYS = 3;

export function InstallProvider({ children }: { children: ReactNode }) {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [ios, setIos] = useState(false);
  const [installed, setInstalled] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    const standalone =
      window.matchMedia?.("(display-mode: standalone)").matches ||
      window.navigator.standalone === true;
    setInstalled(standalone);

    const ua = window.navigator.userAgent || "";
    const isIos =
      /iphone|ipad|ipod/i.test(ua) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    const isInstalledBrowser = standalone;
    setIos(isIos && !isInstalledBrowser);

    const onPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setDeferred(e);
    };
    const onInstalled = () => {
      setInstalled(true);
      setPopupOpen(false);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  const kind: InstallKind | null = deferred
    ? "prompt"
    : ios
    ? "ios"
    : null;

  const recentlyDismissed = useCallback(() => {
    try {
      const raw = localStorage.getItem(DISMISS_KEY);
      if (!raw) return false;
      const age = Date.now() - Number(raw);
      return age < DISMISS_DAYS * 24 * 60 * 60 * 1000;
    } catch {
      return false;
    }
  }, []);

  useEffect(() => {
    if (installed || !kind) return;
    const t = window.setTimeout(() => {
      if (!recentlyDismissed()) setPopupOpen(true);
    }, 3200);
    return () => window.clearTimeout(t);
  }, [kind, installed, recentlyDismissed]);

  const rememberDismiss = useCallback(() => {
    try {
      localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch {
      /* ignore */
    }
  }, []);

  const install = useCallback(async () => {
    if (!deferred) return null;
    await deferred.prompt();
    const choice = await deferred.userChoice;
    setDeferred(null);
    if (choice.outcome === "dismissed") rememberDismiss();
    setPopupOpen(false);
    return choice.outcome;
  }, [deferred, rememberDismiss]);

  const closePopup = useCallback(() => {
    setPopupOpen(false);
    rememberDismiss();
  }, [rememberDismiss]);

  const value = useMemo<InstallCtxValue>(
    () => ({
      kind,
      installed,
      available: !installed && kind !== null,
      install,
      openPopup: () => setPopupOpen(true),
      closePopup,
      popupOpen,
    }),
    [kind, installed, install, closePopup, popupOpen]
  );

  return (
    <InstallCtx.Provider value={value}>{children}</InstallCtx.Provider>
  );
}

export function useInstall(): InstallCtxValue {
  const ctx = useContext(InstallCtx);
  if (!ctx) throw new Error("useInstall must be used within InstallProvider");
  return ctx;
}

/* ------------------------------------------------------------
   Smart install popup
------------------------------------------------------------ */
export function SmartInstallPopup() {
  const { popupOpen, closePopup, kind, install } = useInstall();
  const reduce = useReducedMotion();

  return (
    <AnimatePresence>
      {popupOpen && (
        <div className="fixed inset-0 z-[95] flex items-end justify-center p-4 sm:items-center">
          <motion.div
            className="absolute inset-0 bg-navy-950/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0.15 : 0.3 }}
            onClick={closePopup}
            aria-hidden="true"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="অ্যাপ ইনস্টল করুন"
            className="glass relative z-10 w-full max-w-sm overflow-hidden rounded-[28px] p-6 text-center shadow-float"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 70, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 50, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
          >
            <button
              type="button"
              onClick={closePopup}
              aria-label="বন্ধ করুন"
              className="absolute right-3.5 top-3.5 inline-flex h-8 w-8 items-center justify-center rounded-full bg-navy-50 text-navy-500 transition hover:bg-navy-100 active:scale-90"
            >
              <XIcon className="h-4 w-4" />
            </button>

            <motion.div
              className="mx-auto flex w-fit"
              animate={reduce ? undefined : { y: [0, -7, 0] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <BrandMark size={68} />
            </motion.div>

            <h3 className="mt-4 text-[17px] font-extrabold text-navy-900">
              INSUS অ্যাপ ইনস্টল করুন
            </h3>
            <p className="mx-auto mt-1.5 max-w-[260px] text-[12.5px] leading-relaxed text-navy-500">
              পুরো সিঙ্গাপুর deployment গাইড, ৫০টি FAQ ও যোগাযোগ — এক ট্যাপে,
              অফলাইনেও, হোম স্ক্রিন থেকে।
            </p>

            {kind === "prompt" ? (
              <div className="mt-5 flex flex-col gap-2">
                <motion.button
                  type="button"
                  onClick={() => install()}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-brand-500 text-[14.5px] font-bold text-white shadow-brand transition hover:bg-brand-600"
                >
                  <DownloadIcon className="h-4.5 w-4.5" />
                  Install App
                </motion.button>
                <button
                  type="button"
                  onClick={closePopup}
                  className="h-10 text-[12.5px] font-semibold text-navy-400 transition hover:text-navy-600"
                >
                  পরে দেখব
                </button>
              </div>
            ) : (
              <div className="mt-5 space-y-2.5 text-left">
                <p className="rounded-2xl bg-brand-50/80 p-3 text-[12.5px] font-semibold leading-relaxed text-brand-800">
                  iPhone / iPad (Safari):
                </p>
                <ol className="space-y-2">
                  {[
                    { icon: <ShareIcon className="h-4 w-4" />, text: "Safari-র নিচে Share বাটনে ট্যাপ করুন" },
                    { icon: <PlusIcon className="h-4 w-4" />, text: "“Add to Home Screen” বেছে নিন" },
                    { icon: <GridIcon className="h-4 w-4" />, text: "উপরে “Add” চাপলেই অ্যাপ তৈরি" },
                  ].map((s, i) => (
                    <motion.li
                      key={s.text}
                      initial={reduce ? { opacity: 1 } : { opacity: 0, x: 14 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + i * 0.1 }}
                      className="flex items-center gap-3 rounded-2xl border border-navy-100 bg-white/70 p-3 text-[12.5px] font-semibold text-navy-700"
                    >
                      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                        {s.icon}
                      </span>
                      {s.text}
                    </motion.li>
                  ))}
                </ol>
                <button
                  type="button"
                  onClick={closePopup}
                  className="mt-1 h-10 w-full text-[12.5px] font-semibold text-navy-400 transition hover:text-navy-600"
                >
                  বুঝেছি, পরে করব
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
