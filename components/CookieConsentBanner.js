"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  Sliders,
  Check,
  X,
  ExternalLink,
  ChevronRight,
  Info,
  Activity,
  Settings,
  ShieldAlert
} from "lucide-react";
import {
  CONSENT_STORAGE_KEY,
  getStoredConsent,
  trackPageVisit,
  trackUserClick,
  saveCookieConsent
} from "@/lib/cookieConsent";

export default function CookieConsentBanner() {
  const pathname = usePathname();

  // Consent & modal states
  const [hasLoaded, setHasLoaded] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSavedToast, setShowSavedToast] = useState(false);

  // Granular category choices
  const [preferences, setPreferences] = useState({
    necessary: true, // Always locked
    analytics: true,
    functional: true,
    doNotSellShare: true // CCPA compliance
  });

  // Track page visits automatically
  useEffect(() => {
    if (pathname && !pathname.startsWith("/admin")) {
      trackPageVisit(pathname);
    }
  }, [pathname]);

  // Global click tracking for telemetry (CTA clicks, call links, etc.)
  useEffect(() => {
    const handleDocumentClick = (e) => {
      try {
        const target = e.target.closest("a, button");
        if (target) {
          const href = target.getAttribute("href") || "";
          const text = target.innerText?.trim()?.slice(0, 50) || "";
          const id = target.id || "";
          if (href.startsWith("tel:")) {
            trackUserClick("phone_call_clicked", { phone: href, text });
          } else if (href.includes("contact") || text.toLowerCase().includes("contact") || text.toLowerCase().includes("consultation")) {
            trackUserClick("cta_inquiry_clicked", { href, text });
          } else if (id.includes("chat") || text.toLowerCase().includes("chat")) {
            trackUserClick("chatbot_opened", { id });
          }
        }
      } catch (err) {}
    };

    window.addEventListener("click", handleDocumentClick, { passive: true });
    return () => window.removeEventListener("click", handleDocumentClick);
  }, []);

  // Check existing consent on mount
  useEffect(() => {
    setHasLoaded(true);
    const existing = getStoredConsent();
    if (!existing) {
      // Delay showing banner slightly for smooth UX
      const timer = setTimeout(() => setShowBanner(true), 900);
      return () => clearTimeout(timer);
    } else {
      setPreferences({
        necessary: true,
        analytics: Boolean(existing.analytics),
        functional: Boolean(existing.functional),
        doNotSellShare: Boolean(existing.doNotSellShare ?? true)
      });
    }
  }, []);

  // Listen to open modal events from footer link
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#cookie-settings" || window.location.hash === "#privacy-choices") {
        setShowModal(true);
      }
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Do not display on admin pages
  if (pathname && pathname.startsWith("/admin")) {
    return null;
  }

  // Handle "Accept All"
  const handleAcceptAll = async () => {
    setIsSubmitting(true);
    const decision = {
      status: "accepted_all",
      analytics: true,
      functional: true,
      doNotSellShare: true
    };
    await saveCookieConsent(decision);
    setPreferences(decision);
    setShowBanner(false);
    setShowModal(false);
    setIsSubmitting(false);
    triggerSavedToast();

    // Enable Google Analytics consent
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "granted",
        functionality_storage: "granted",
        personalization_storage: "granted"
      });
    }
  };

  // Handle "Reject Non-Essential" (CCPA / Strict Privacy)
  const handleRejectNonEssential = async () => {
    setIsSubmitting(true);
    const decision = {
      status: "rejected_non_essential",
      analytics: false,
      functional: false,
      doNotSellShare: true // Strictly opted out
    };
    await saveCookieConsent(decision);
    setPreferences(decision);
    setShowBanner(false);
    setShowModal(false);
    setIsSubmitting(false);
    triggerSavedToast();

    // Restrict Google Analytics
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "denied",
        personalization_storage: "denied"
      });
    }
  };

  // Handle "Save Preferences"
  const handleSaveCustomPreferences = async () => {
    setIsSubmitting(true);
    const decision = {
      status: "customized",
      analytics: preferences.analytics,
      functional: preferences.functional,
      doNotSellShare: preferences.doNotSellShare
    };
    await saveCookieConsent(decision);
    setShowBanner(false);
    setShowModal(false);
    setIsSubmitting(false);
    triggerSavedToast();

    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: preferences.analytics ? "granted" : "denied",
        functionality_storage: preferences.functional ? "granted" : "denied"
      });
    }
  };

  const triggerSavedToast = () => {
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 3500);
  };

  if (!hasLoaded) return null;

  return (
    <>
      {/* =====================================================================
          1. FLOATING COOKIE CONSENT BANNER (Notice at Collection)
          ===================================================================== */}
      {showBanner && !showModal && (
        <aside
          role="dialog"
          aria-label="Cookie consent banner"
          aria-describedby="cookie-consent-description"
          className="fixed bottom-3 sm:bottom-6 left-3 right-3 sm:left-6 sm:right-auto sm:max-w-xl z-50 animate-slideUp"
        >
          <div className="bg-[#001A4D]/95 backdrop-blur-xl border border-white/20 text-white rounded-3xl p-5 sm:p-6 shadow-2xl shadow-blue-950/40 relative overflow-hidden">
            {/* Soft Ambient Glow */}
            <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#0061FF]/30 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-[#60EFFF] shrink-0 mt-0.5 border border-white/10">
                <ShieldCheck size={22} />
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm sm:text-base font-bold text-white tracking-tight flex items-center gap-2">
                    Your Privacy & Cookie Choices
                    <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-blue-500/20 text-[#60EFFF] border border-blue-400/30">
                      US Law Notice
                    </span>
                  </h3>
                </div>

                <p id="cookie-consent-description" className="text-xs text-slate-300 leading-relaxed mb-4">
                  We use cookies and privacy-respecting telemetry to understand traffic, remember your preferences, and provide personalized senior care support across Pennsylvania in accordance with US privacy laws (CCPA/CPRA).
                  {" "}
                  <Link
                    href="/privacy-policy"
                    className="text-[#60EFFF] hover:underline font-medium inline-flex items-center gap-0.5"
                  >
                    Privacy Policy <ExternalLink size={10} />
                  </Link>
                </p>

                {/* Primary Buttons */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <button
                    onClick={handleAcceptAll}
                    disabled={isSubmitting}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#0061FF] to-[#004ECC] hover:from-[#0052db] hover:to-[#003da8] text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    Accept All
                  </button>

                  <button
                    onClick={handleRejectNonEssential}
                    disabled={isSubmitting}
                    className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 hover:text-white text-xs font-semibold border border-white/15 transition-all cursor-pointer"
                  >
                    Reject Non-Essential
                  </button>

                  <button
                    onClick={() => setShowModal(true)}
                    className="px-3 py-2.5 rounded-xl text-slate-300 hover:text-white text-xs font-semibold hover:bg-white/5 transition-all inline-flex items-center gap-1.5 cursor-pointer ml-auto"
                  >
                    <Sliders size={13} className="text-[#60EFFF]" />
                    <span>Customize</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </aside>
      )}

      {/* =====================================================================
          2. GRANULAR PREFERENCES MODAL (CCPA / CPRA Compliant Choices)
          ===================================================================== */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] my-auto">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#001A4D] via-[#0B2A6B] to-[#001A4D] text-white px-6 py-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#60EFFF] border border-white/10">
                  <Sliders size={20} />
                </div>
                <div>
                  <h2 className="text-base font-bold flex items-center gap-2">
                    Cookie & Privacy Settings
                    <span className="text-[10px] uppercase font-bold bg-[#60EFFF]/20 text-[#60EFFF] px-2 py-0.5 rounded-full">
                      CCPA / CPRA
                    </span>
                  </h2>
                  <p className="text-xs text-blue-200">
                    Configure your data and traffic analytics preferences
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close preferences"
              >
                <X size={18} />
              </button>
            </div>

            {/* Scrollable Categories Body */}
            <div className="p-6 space-y-4 overflow-y-auto text-xs text-slate-700">
              <div className="bg-blue-50/70 border border-blue-200/60 rounded-2xl p-3.5 flex items-start gap-2.5">
                <Info size={16} className="text-[#0061FF] shrink-0 mt-0.5" />
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  Under United States privacy laws (including the California Consumer Privacy Act CCPA/CPRA), you have the right to know what information is collected, customize non-essential tracking, and opt out of data sharing.
                </p>
              </div>

              {/* Category 1: Strictly Necessary (Locked ON) */}
              <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/60">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <Lock size={15} className="text-emerald-600" />
                    <span className="font-bold text-sm text-[#001A4D]">Strictly Necessary Cookies</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    Always Active
                  </span>
                </div>
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  Required for core website security, authenticating inquiries, preventing fraudulent form submissions, and ensuring HIPAA/privacy safeguards. These cannot be disabled.
                </p>
              </div>

              {/* Category 2: Analytics & Traffic Telemetry */}
              <div className="border border-slate-200 rounded-2xl p-4 hover:border-blue-300 transition-colors">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <Activity size={15} className="text-[#0061FF]" />
                    <span className="font-bold text-sm text-[#001A4D]">Analytics & Telemetry</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-10 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#0061FF]"></div>
                  </label>
                </div>
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  Helps us understand how families use our Pennsylvania home care portal by collecting pages visited, button clicks, device/browser details, referral sources, and session duration.
                </p>
              </div>

              {/* Category 3: Functional & Preferences */}
              <div className="border border-slate-200 rounded-2xl p-4 hover:border-blue-300 transition-colors">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <Settings size={15} className="text-[#0061FF]" />
                    <span className="font-bold text-sm text-[#001A4D]">Functional Preferences</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.functional}
                      onChange={(e) => setPreferences({ ...preferences, functional: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-10 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#0061FF]"></div>
                  </label>
                </div>
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  Remembers your language choice, selected county care filters, and chatbot preferences between visits for a seamless experience.
                </p>
              </div>

              {/* Category 4: Do Not Sell or Share (CCPA Rights) */}
              <div className="border border-amber-200 rounded-2xl p-4 bg-amber-50/40">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <ShieldAlert size={15} className="text-amber-600" />
                    <span className="font-bold text-sm text-[#001A4D]">Do Not Sell or Share My Information</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.doNotSellShare}
                      onChange={(e) => setPreferences({ ...preferences, doNotSellShare: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-10 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-600"></div>
                  </label>
                </div>
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  Exercise your statutory opt-out right under CCPA/CPRA. Pavan Homecare does not sell patient or caregiver personal data to third parties.
                </p>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <button
                type="button"
                onClick={handleRejectNonEssential}
                disabled={isSubmitting}
                className="text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
              >
                Reject All Non-Essential
              </button>

              <div className="flex items-center gap-2 ml-auto">
                <button
                  type="button"
                  onClick={handleSaveCustomPreferences}
                  disabled={isSubmitting}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-[#001A4D] font-bold text-xs transition-colors cursor-pointer"
                >
                  Save Choices
                </button>

                <button
                  type="button"
                  onClick={handleAcceptAll}
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0061FF] to-[#004ECC] hover:from-[#0052db] hover:to-[#003da8] text-white font-bold text-xs shadow-md shadow-blue-600/30 transition-all cursor-pointer"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          3. PERSISTENT FLOATING PRIVACY TRIGGER (Always accessible to revisit)
          ===================================================================== */}
      {!showBanner && !showModal && (
        <button
          onClick={() => setShowModal(true)}
          className="fixed bottom-3 left-3 z-40 bg-white/90 hover:bg-white backdrop-blur-md text-[#001A4D] hover:text-[#0061FF] border border-slate-300/80 shadow-md hover:shadow-lg rounded-full px-3 py-1.5 text-[11px] font-bold transition-all flex items-center gap-1.5 group cursor-pointer"
          title="Cookie & Privacy Choices (CCPA/CPRA)"
          aria-label="Manage cookie choices and privacy settings"
        >
          <ShieldCheck size={13} className="text-[#0061FF] group-hover:scale-110 transition-transform" />
          <span>Privacy Choices</span>
        </button>
      )}

      {/* =====================================================================
          4. SUCCESS CONFIRMATION TOAST
          ===================================================================== */}
      {showSavedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#001A4D] text-white px-4 py-3 rounded-2xl shadow-2xl border border-emerald-500/50 flex items-center gap-2.5 text-xs font-semibold animate-slideUp">
          <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
            <Check size={12} />
          </div>
          <span>Your cookie & privacy preferences have been saved!</span>
        </div>
      )}
    </>
  );
}
