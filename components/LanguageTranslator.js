"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import {
  Globe,
  Search,
  X,
  Check,
  RotateCcw,
  Sparkles,
  ExternalLink,
  ChevronDown,
  Volume2
} from "lucide-react";
import { POPULAR_LANGUAGES, ALL_LANGUAGES, getLanguageByCode } from "@/lib/languagesData";

const STORAGE_KEY = "phc_selected_lang";

/**
 * Patch DOM Node methods to prevent React 18 hydration / removal errors
 * when Google Translate injects <font> tags wrapping text nodes.
 */
function applyDomPatch() {
  if (typeof window === "undefined") return;
  if (window.__phc_gt_patch_applied) return;
  window.__phc_gt_patch_applied = true;

  if (typeof Node === "function" && Node.prototype) {
    const origRemoveChild = Node.prototype.removeChild;
    Node.prototype.removeChild = function (child) {
      if (child.parentNode !== this) {
        if (typeof console !== "undefined" && console.warn) {
          console.warn("[PHC Translator] Ignored removeChild mismatch from translated DOM", child, this);
        }
        return child;
      }
      return origRemoveChild.apply(this, arguments);
    };

    const origInsertBefore = Node.prototype.insertBefore;
    Node.prototype.insertBefore = function (newNode, refNode) {
      if (refNode && refNode.parentNode !== this) {
        if (typeof console !== "undefined" && console.warn) {
          console.warn("[PHC Translator] Ignored insertBefore mismatch from translated DOM", refNode, this);
        }
        return newNode;
      }
      return origInsertBefore.apply(this, arguments);
    };
  }
}

export default function LanguageTranslator() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentLang, setCurrentLang] = useState("en");
  const [isGtReady, setIsGtReady] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const modalRef = useRef(null);
  const searchInputRef = useRef(null);

  // Apply DOM safety patch immediately on mount
  useEffect(() => {
    applyDomPatch();
  }, []);

  // Read initial language from cookie or localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const match = document.cookie.match(/(?:^|;\s*)googtrans=\/en\/([^;]+)/);
      const cookieLang = match ? match[1] : null;
      const initial = saved || cookieLang || "en";
      setCurrentLang(initial);

      if (initial !== "en") {
        document.documentElement.lang = initial;
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  // Setup Google Translate initialization callback
  useEffect(() => {
    if (typeof window === "undefined") return;

    window.googleTranslateElementInit = () => {
      try {
        if (window.google && window.google.translate && window.google.translate.TranslateElement) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: "en",
              autoDisplay: false,
              layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            },
            "google_translate_element"
          );
          setIsGtReady(true);
        }
      } catch (err) {
        console.error("[PHC Translator] Error initializing TranslateElement:", err);
      }
    };

    // If script was already loaded previously
    if (window.google && window.google.translate) {
      window.googleTranslateElementInit();
    }
  }, []);

  // Helper to set cookie across root and domain
  const setGoogleTransCookie = (code) => {
    const hostname = window.location.hostname;
    if (code === "en") {
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${hostname};`;
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${hostname};`;
    } else {
      const cookieVal = `/en/${code}`;
      document.cookie = `googtrans=${cookieVal}; path=/;`;
      document.cookie = `googtrans=${cookieVal}; path=/; domain=.${hostname};`;
      document.cookie = `googtrans=${cookieVal}; path=/; domain=${hostname};`;
    }
  };

  // Trigger Google Translate select element
  const triggerTranslation = useCallback((targetCode) => {
    setIsTranslating(true);
    setGoogleTransCookie(targetCode);

    try {
      if (targetCode === "en") {
        localStorage.removeItem(STORAGE_KEY);
      } else {
        localStorage.setItem(STORAGE_KEY, targetCode);
      }
    } catch {}

    setCurrentLang(targetCode);
    document.documentElement.lang = targetCode;

    // Dispatch global event for other components (e.g., SpeechSynthesis reader, Navbar)
    window.dispatchEvent(
      new CustomEvent("phc_language_changed", {
        detail: { code: targetCode, lang: getLanguageByCode(targetCode) },
      })
    );

    let attempts = 0;
    const interval = setInterval(() => {
      attempts++;
      const select = document.querySelector(".goog-te-combo");
      if (select) {
        select.value = targetCode;
        select.dispatchEvent(new Event("change"));
        clearInterval(interval);
        setTimeout(() => setIsTranslating(false), 500);
      } else if (attempts > 20) {
        clearInterval(interval);
        setIsTranslating(false);
        // Fallback: reload page if select wasn't ready to let cookie apply
        if (targetCode === "en" || !document.querySelector(".goog-te-combo")) {
          window.location.reload();
        }
      }
    }, 100);
  }, []);

  // Ensure translation persists across Next.js client-side route navigations
  useEffect(() => {
    if (currentLang && currentLang !== "en") {
      const timer = setTimeout(() => {
        const select = document.querySelector(".goog-te-combo");
        if (select && select.value !== currentLang) {
          select.value = currentLang;
          select.dispatchEvent(new Event("change"));
        }
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [pathname, currentLang]);

  // Global listener to open selector or change language programmatically
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    const handleChange = (e) => {
      if (e?.detail?.code) {
        triggerTranslation(e.detail.code);
      }
    };

    window.addEventListener("phc_open_language_selector", handleOpen);
    window.addEventListener("phc_change_language", handleChange);

    // Global helper on window object for convenience
    window.phcTranslate = {
      open: () => setIsOpen(true),
      setLanguage: (code) => triggerTranslation(code),
      getCurrent: () => currentLang,
    };

    return () => {
      window.removeEventListener("phc_open_language_selector", handleOpen);
      window.removeEventListener("phc_change_language", handleChange);
    };
  }, [triggerTranslation, currentLang]);

  // Focus trap & auto-focus search input when modal opens
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => searchInputRef.current?.focus(), 80);
    } else {
      document.body.style.overflow = "";
      setSearchQuery("");
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  const activeLangObj = getLanguageByCode(currentLang);

  // Filter languages by search query
  const filteredLanguages = ALL_LANGUAGES.filter((lang) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      lang.name.toLowerCase().includes(q) ||
      lang.nativeName.toLowerCase().includes(q) ||
      lang.code.toLowerCase().includes(q)
    );
  });

  const selectLanguage = (code) => {
    triggerTranslation(code);
    setIsOpen(false);
  };

  return (
    <>
      {/* ── 1. GOOGLE TRANSLATE SCRIPT & HIDDEN CONTAINER ── */}
      <div
        id="google_translate_element"
        style={{ display: "none" }}
        aria-hidden="true"
        className="notranslate"
      />
      <Script
        id="google-translate-script"
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />

      {/* ── 2. TRANSLATION IN-PROGRESS TOAST ── */}
      {isTranslating && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-5 left-1/2 -translate-x-1/2 z-[100005] bg-[#001A4D]/95 backdrop-blur-md text-white px-5 py-3 rounded-2xl shadow-2xl border border-[#60EFFF]/50 flex items-center gap-3 text-xs font-bold animate-slideDown whitespace-nowrap notranslate"
        >
          <div className="w-5 h-5 rounded-full border-2 border-[#60EFFF] border-t-transparent animate-spin" />
          <span>Translating page to {activeLangObj.name} ({activeLangObj.nativeName})...</span>
        </div>
      )}

      {/* ── 3. PERSISTENT ACTIVE TRANSLATION BANNER (When translated to non-English) ── */}
      {currentLang !== "en" && (
        <aside
          role="region"
          aria-label="Active Language Translation Notice"
          className="fixed bottom-3 right-3 sm:bottom-5 sm:right-5 z-[9930] notranslate animate-slideUp"
        >
          <div className="bg-[#001A4D]/95 backdrop-blur-md text-white px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full shadow-[0_12px_36px_rgba(0,26,77,0.45)] border border-[#60EFFF]/40 flex items-center gap-2.5 text-xs font-medium">
            <span className="text-base" aria-hidden="true">{activeLangObj.flag}</span>
            <span className="font-bold text-white text-[12px] hidden sm:inline">
              Translated to {activeLangObj.nativeName}
            </span>
            <span className="font-bold text-white text-[12px] sm:hidden">
              {activeLangObj.nativeName}
            </span>

            <div className="h-3.5 w-px bg-white/25" />

            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="text-[#60EFFF] hover:text-white underline text-[11.5px] font-bold cursor-pointer transition-colors"
            >
              Change
            </button>

            <button
              type="button"
              onClick={() => triggerTranslation("en")}
              className="bg-white/15 hover:bg-white/25 text-white px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer"
              title="Reset website to English"
            >
              <RotateCcw size={11} />
              <span>English</span>
            </button>
          </div>
        </aside>
      )}

      {/* ── 4. FULL PROFESSIONAL LANGUAGE SELECTOR MODAL ── */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="phc-lang-modal-title"
          className="fixed inset-0 z-[100010] bg-[#000F2D]/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-fadeIn notranslate"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false);
          }}
        >
          <div
            ref={modalRef}
            className="w-full max-w-2xl bg-white rounded-3xl shadow-[0_25px_60px_rgba(0,26,77,0.35)] border border-slate-200 overflow-hidden flex flex-col max-h-[88vh] animate-scaleUp"
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#001A4D] via-[#002D7A] to-[#004ECC] px-6 py-5 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-[#60EFFF] shrink-0 shadow-inner">
                  <Globe size={22} />
                </div>
                <div>
                  <h2
                    id="phc-lang-modal-title"
                    className="font-poppins font-extrabold text-lg text-white m-0 tracking-tight flex items-center gap-2"
                  >
                    <span>Choose Your Language</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-[#60EFFF]/20 text-[#60EFFF] font-semibold border border-[#60EFFF]/30">
                      100+ Languages
                    </span>
                  </h2>
                  <p className="text-xs text-blue-100/80 m-0 mt-0.5">
                    Translate all pages, service guides &amp; caregiver resources instantly.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close language selector"
              >
                <X size={18} />
              </button>
            </div>

            {/* Search Bar */}
            <div className="p-4 sm:p-5 border-b border-slate-200/80 bg-slate-50/80 shrink-0">
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search language (e.g. Spanish, Español, Russian, 中文, Hindi)..."
                  className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-300 rounded-2xl text-xs sm:text-sm text-[#001A4D] placeholder-slate-400 focus:outline-none focus:border-[#0061FF] focus:ring-2 focus:ring-[#0061FF]/20 transition-all font-medium"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                    aria-label="Clear search"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1">
              {/* Popular in Pennsylvania Section (When no active search query) */}
              {!searchQuery && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#001A4D]/70 flex items-center gap-1.5">
                      <Sparkles size={13} className="text-[#0061FF]" />
                      Popular in Pennsylvania &amp; Greater Philadelphia
                    </span>
                    {currentLang !== "en" && (
                      <button
                        type="button"
                        onClick={() => selectLanguage("en")}
                        className="text-xs font-bold text-[#0061FF] hover:underline flex items-center gap-1"
                      >
                        <RotateCcw size={11} />
                        Reset to English
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5">
                    {POPULAR_LANGUAGES.map((lang) => {
                      const isSelected = currentLang.toLowerCase() === lang.code.toLowerCase();
                      return (
                        <button
                          key={lang.code}
                          type="button"
                          onClick={() => selectLanguage(lang.code)}
                          className={`flex items-center gap-2.5 p-2.5 rounded-2xl border text-left transition-all cursor-pointer group ${
                            isSelected
                              ? "bg-gradient-to-r from-[#001A4D] to-[#0047B8] text-white border-[#001A4D] shadow-md shadow-blue-900/20"
                              : "bg-white hover:bg-slate-50 border-slate-200 hover:border-[#0061FF]/40 text-[#001A4D]"
                          }`}
                        >
                          <span className="text-xl shrink-0" aria-hidden="true">
                            {lang.flag}
                          </span>
                          <div className="min-w-0 flex-1">
                            <div
                              className={`text-xs font-bold truncate ${
                                isSelected ? "text-white" : "text-[#001A4D] group-hover:text-[#0061FF]"
                              }`}
                            >
                              {lang.nativeName}
                            </div>
                            <div
                              className={`text-[11px] truncate ${
                                isSelected ? "text-blue-200" : "text-slate-500"
                              }`}
                            >
                              {lang.name}
                            </div>
                          </div>
                          {isSelected && (
                            <Check size={14} className="text-[#60EFFF] shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* All Supported Languages Section */}
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#001A4D]/70 mb-3">
                  {searchQuery ? `Matching Languages (${filteredLanguages.length})` : "All Supported Languages"}
                </div>

                {filteredLanguages.length === 0 ? (
                  <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                    <p className="text-sm font-semibold text-slate-600 m-0">
                      No languages matched &quot;{searchQuery}&quot;
                    </p>
                    <p className="text-xs text-slate-500 m-0 mt-1">
                      Try searching with another spelling, English name, or country.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {filteredLanguages.map((lang) => {
                      const isSelected = currentLang.toLowerCase() === lang.code.toLowerCase();
                      return (
                        <button
                          key={lang.code}
                          type="button"
                          onClick={() => selectLanguage(lang.code)}
                          className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                            isSelected
                              ? "bg-[#001A4D] text-white border-[#001A4D] shadow-sm"
                              : "bg-white hover:bg-slate-50 border-slate-200 text-[#001A4D]"
                          }`}
                        >
                          <span className="text-lg shrink-0" aria-hidden="true">
                            {lang.flag}
                          </span>
                          <div className="min-w-0 flex-1">
                            <div
                              className={`text-xs font-bold truncate ${
                                isSelected ? "text-white" : "text-[#001A4D]"
                              }`}
                            >
                              {lang.nativeName}
                            </div>
                            <div
                              className={`text-[10px] truncate ${
                                isSelected ? "text-blue-200" : "text-slate-500"
                              }`}
                            >
                              {lang.name}
                            </div>
                          </div>
                          {isSelected && (
                            <Check size={14} className="text-[#60EFFF] shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 shrink-0">
              <div className="flex items-center gap-1.5 text-center sm:text-left">
                <Globe size={13} className="text-[#0061FF]" />
                <span>Translations powered by Google Neural Machine Translation.</span>
              </div>
              <div className="flex items-center gap-3">
                {currentLang !== "en" && (
                  <button
                    type="button"
                    onClick={() => selectLanguage("en")}
                    className="text-[#001A4D] hover:text-[#0061FF] font-bold inline-flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw size={12} />
                    Reset English
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-1.5 bg-[#001A4D] hover:bg-[#002D7A] text-white font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
