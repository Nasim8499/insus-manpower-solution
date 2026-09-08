import { useEffect } from "react";
import {
  AmbientBackground,
  BackToTop,
  BottomNav,
  Footer,
  Header,
  ScrollProgress,
} from "./components/Chrome";
import { InstallProvider, SmartInstallPopup } from "./components/Install";
import Hero from "./sections/Hero";
import AppDownload from "./sections/AppDownload";
import FaqSection from "./sections/FaqSection";
import Journey from "./sections/Journey";
import Sectors from "./sections/Sectors";
import Cost from "./sections/Cost";
import Safety from "./sections/Safety";
import Contact from "./sections/Contact";
import AdminPanel from "./admin/AdminPanel";
import { ContentProvider, useContent } from "./store/content";

function FaqSchema() {
  const { state } = useContent();
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: state.faqs
        .filter((f) => f.published !== false)
        .map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.fullAnswer },
        })),
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "faq-schema";
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
    return () => {
      document.getElementById("faq-schema")?.remove();
    };
  }, [state.faqs]);
  return null;
}

function AppLayout() {
  return (
    <div className="relative min-h-screen font-sans text-navy-900">
      <FaqSchema />
      <AmbientBackground />
      <ScrollProgress />
      <Header />

        <main>
          <Hero />
          <AppDownload />
          <FaqSection />
        <Journey />
        <Sectors />
        <Cost />
        <Safety />
        <Contact />
      </main>

      <Footer />
      <BottomNav />
      <BackToTop />
      <SmartInstallPopup />
      <AdminPanel />
    </div>
  );
}

export default function App() {
  return (
    <ContentProvider>
      <InstallProvider>
        <AppLayout />
      </InstallProvider>
    </ContentProvider>
  );
}
