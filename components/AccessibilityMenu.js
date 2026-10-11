"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  Accessibility,
  Eye,
  Type,
  Maximize2,
  ZoomIn,
  MousePointer,
  Volume2,
  VolumeX,
  RotateCcw,
  X,
  Search,
  ArrowRight,
  Phone,
  Compass,
  Home,
  MapPin,
  Heart,
  Brain,
  Shield,
  HelpCircle,
  FileText,
  Check,
  Sparkles,
  Zap,
  Sliders,
  SlidersHorizontal,
  ExternalLink,
  Keyboard,
  Sun,
  ShieldCheck,
  Moon,
  Contrast,
  CheckCircle2,
  Play,
  Square,
  Pause
} from "lucide-react";
import { site } from "@/lib/site";
import styles from "./AccessibilityMenu.module.css";

const STORAGE_KEY = "phc_ada_settings";

const INITIAL_SETTINGS = {
  activeProfile: null, // "vision" | "cognitive" | "dyslexia" | "motor" | "seizure" | "calm" | null
  zoom: 100, // 100, 115, 130, 145
  textSpacing: false,
  dyslexicFont: false,
  contrast: "default", // "default" | "dark" | "light" | "monochrome" | "invert" | "high-sat" | "low-sat"
  highlightLinks: false,
  highlightHeadings: false,
  readingGuide: false,
  readingMask: false,
  bigCursor: false,
  pauseAnimations: false,
  keyboardNav: true,
  muteMedia: false,
  soundChime: false,
};

export default function AccessibilityMenu() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("travel"); // "travel" | "profiles" | "visual" | "reading" | "statement"
  const [settings, setSettings] = useState(INITIAL_SETTINGS);
  const [searchQuery, setSearchQuery] = useState("");
  const [mouseY, setMouseY] = useState(300);
  const [speechState, setSpeechState] = useState("idle"); // "idle" | "speaking" | "paused"
  const [announcement, setAnnouncement] = useState("");

  const triggerRef = useRef(null);
  const modalRef = useRef(null);
  const searchInputRef = useRef(null);

  // Announce to screen readers
  const announce = (text) => {
    setAnnouncement(text);
    setTimeout(() => setAnnouncement(""), 3500);
  };

  // Subtle audio chime feedback if enabled
  const playAccessibleChime = (freq = 440) => {
    if (!settings.soundChime || typeof window === "undefined") return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch (e) {}
  };

  // Load saved settings from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setSettings((prev) => ({ ...prev, ...parsed }));
      }
    } catch (e) {}
  }, []);

  // Save settings and apply classes to documentElement
  useEffect(() => {
    if (typeof document === "undefined") return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (e) {}

    const html = document.documentElement;

    // 1. Font Zoom
    html.classList.remove("ada-zoom-115", "ada-zoom-130", "ada-zoom-145");
    if (settings.zoom === 115) html.classList.add("ada-zoom-115");
    else if (settings.zoom === 130) html.classList.add("ada-zoom-130");
    else if (settings.zoom === 145) html.classList.add("ada-zoom-145");

    // 2. Text Spacing
    html.classList.toggle("ada-text-spacing", Boolean(settings.textSpacing));

    // 3. Dyslexic Font
    html.classList.toggle("ada-dyslexic-font", Boolean(settings.dyslexicFont));

    // 4. Contrast
    html.classList.remove(
      "ada-contrast-dark",
      "ada-contrast-light",
      "ada-contrast-monochrome",
      "ada-contrast-invert",
      "ada-contrast-high-sat",
      "ada-contrast-low-sat"
    );
    if (settings.contrast === "dark") html.classList.add("ada-contrast-dark");
    else if (settings.contrast === "light") html.classList.add("ada-contrast-light");
    else if (settings.contrast === "monochrome") html.classList.add("ada-contrast-monochrome");
    else if (settings.contrast === "invert") html.classList.add("ada-contrast-invert");
    else if (settings.contrast === "high-sat") html.classList.add("ada-contrast-high-sat");
    else if (settings.contrast === "low-sat") html.classList.add("ada-contrast-low-sat");

    // 5. Highlights
    html.classList.toggle("ada-highlight-links", Boolean(settings.highlightLinks));
    html.classList.toggle("ada-highlight-headings", Boolean(settings.highlightHeadings));

    // 6. Big Cursor
    html.classList.toggle("ada-big-cursor", Boolean(settings.bigCursor));

    // 7. Pause Animations
    html.classList.toggle("ada-pause-animations", Boolean(settings.pauseAnimations));

    // 8. Keyboard Navigation Mode
    html.classList.toggle("ada-keyboard-nav", Boolean(settings.keyboardNav));

    // 9. Mute Media
    if (settings.muteMedia) {
      document.querySelectorAll("video, audio").forEach((el) => {
        el.muted = true;
      });
    } else {
      document.querySelectorAll("video, audio").forEach((el) => {
        el.muted = false;
      });
    }
  }, [settings]);

  // Track mouse Y for Reading Ruler and Mask
  useEffect(() => {
    if (!settings.readingGuide && !settings.readingMask) return;
    const handleMouseMove = (e) => {
      setMouseY(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [settings.readingGuide, settings.readingMask]);

  // Global Keyboard Shortcuts (Hotkeys)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Alt + A: Toggle Accessibility Menu
      if (e.altKey && (e.key === "a" || e.key === "A")) {
        e.preventDefault();
        setIsOpen((prev) => {
          const next = !prev;
          announce(next ? "Accessibility menu opened" : "Accessibility menu closed");
          return next;
        });
      }

      // Alt + M: Jump to Main Content
      if (e.altKey && (e.key === "m" || e.key === "M")) {
        e.preventDefault();
        jumpToElement("#main-content", "Main Content");
      }

      // Alt + N: Jump to Navigation
      if (e.altKey && (e.key === "n" || e.key === "N")) {
        e.preventDefault();
        jumpToElement("#site-header", "Navigation Menu");
      }

      // Alt + S: Jump to Care Services
      if (e.altKey && (e.key === "s" || e.key === "S")) {
        e.preventDefault();
        jumpToElement("#services", "Care Services");
      }

      // Alt + C: Call Coordinator
      if (e.altKey && (e.key === "c" || e.key === "C")) {
        e.preventDefault();
        announce("Calling Care Coordinator");
        window.location.href = site.phoneHref;
      }

      // Alt + R: Reset All Accessibility Settings
      if (e.altKey && (e.key === "r" || e.key === "R")) {
        e.preventDefault();
        resetAllSettings();
      }

      // Escape: Close Menu
      if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        setIsOpen(false);
        announce("Accessibility menu closed");
        triggerRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Listen for custom trigger events from Header or Footer
  useEffect(() => {
    const handleCustomTrigger = (e) => {
      const requestedTab = e.detail?.tab;
      if (requestedTab) setActiveTab(requestedTab);
      setIsOpen(true);
      announce("Accessibility menu opened");
    };

    window.addEventListener("phc_toggle_accessibility_menu", handleCustomTrigger);
    return () => window.removeEventListener("phc_toggle_accessibility_menu", handleCustomTrigger);
  }, []);

  // Trap focus inside modal when open
  useEffect(() => {
    if (!isOpen) return;

    // Focus the search input or first focusable item
    setTimeout(() => {
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      } else if (modalRef.current) {
        const focusable = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length > 0) focusable[0].focus();
      }
    }, 100);

    const handleTabTrap = (e) => {
      if (e.key !== "Tab" || !modalRef.current) return;
      const focusable = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleTabTrap);
    return () => window.removeEventListener("keydown", handleTabTrap);
  }, [isOpen]);

  // Text-to-Speech Page Reader
  const handleToggleSpeech = (action) => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      announce("Text to speech is not supported in this browser.");
      return;
    }

    const synth = window.speechSynthesis;

    if (action === "stop") {
      synth.cancel();
      setSpeechState("idle");
      announce("Screen reading stopped");
      return;
    }

    if (action === "pause") {
      synth.pause();
      setSpeechState("paused");
      announce("Screen reading paused");
      return;
    }

    if (action === "resume") {
      synth.resume();
      setSpeechState("speaking");
      announce("Screen reading resumed");
      return;
    }

    // Start speaking page content
    synth.cancel();
    const mainEl = document.querySelector("#main-content") || document.body;
    // Extract key headings and paragraphs
    const textNodes = Array.from(mainEl.querySelectorAll("h1, h2, h3, p"))
      .slice(0, 15)
      .map((el) => el.innerText.trim())
      .filter(Boolean)
      .join(". ");

    const textToRead = textNodes.length > 0
      ? textNodes
      : "Welcome to Pavan Homecare. Compassionate senior home care and caregiver services across Pennsylvania.";

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.lang = "en-US";

    utterance.onstart = () => {
      setSpeechState("speaking");
      announce("Reading page content aloud");
    };

    utterance.onend = () => {
      setSpeechState("idle");
      announce("Finished reading page content");
    };

    utterance.onerror = () => {
      setSpeechState("idle");
    };

    synth.speak(utterance);
  };

  // Jump to page element smoothly and place focus
  const jumpToElement = (selector, label) => {
    const target = document.querySelector(selector);
    if (target) {
      setIsOpen(false);
      target.scrollIntoView({ behavior: settings.pauseAnimations ? "auto" : "smooth", block: "start" });
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
      announce(`Navigated to ${label}`);
      playAccessibleChime(520);
    } else {
      // If element is on homepage and user is elsewhere, navigate there
      router.push(`/${selector}`);
      setIsOpen(false);
    }
  };

  // Profiles (1-Click Compliance Presets)
  // Profiles (1-Click Compliance Presets)
  const applyProfile = (profileId) => {
    playAccessibleChime(600);
    // If clicking the ALREADY ACTIVE profile -> TOGGLE IT OFF AND RESET TO CLEAN BASELINE!
    if (settings.activeProfile === profileId) {
      resetAllSettings();
      announce(`${profileId} profile disabled. All accessibility settings reset to normal.`);
      return;
    }

    // When activating a new profile, start from clean defaults so previous settings don't linger
    let updated = { ...INITIAL_SETTINGS, activeProfile: profileId };

    switch (profileId) {
      case "vision":
        updated = {
          ...updated,
          zoom: 130,
          contrast: "light",
          bigCursor: true,
          highlightLinks: true,
        };
        announce("Vision Impairment profile enabled: 130% zoom, high contrast, enlarged cursor.");
        break;
      case "cognitive":
        updated = {
          ...updated,
          pauseAnimations: true,
          readingGuide: true,
          readingMask: false,
          highlightHeadings: true,
          highlightLinks: true,
        };
        announce("Cognitive and ADHD profile enabled: paused animations, reading guide, highlighted structure.");
        break;
      case "dyslexia":
        updated = {
          ...updated,
          dyslexicFont: true,
          textSpacing: true,
          highlightLinks: true,
        };
        announce("Dyslexia Friendly profile enabled: Atkinson Hyperlegible font and expanded text spacing.");
        break;
      case "motor":
        updated = {
          ...updated,
          keyboardNav: true,
          highlightLinks: true,
          pauseAnimations: true,
        };
        announce("Motor Impairment profile enabled: high-visibility focus indicators and stabilized layout.");
        break;
      case "seizure":
        updated = {
          ...updated,
          pauseAnimations: true,
          contrast: "default",
        };
        announce("Seizure Safe profile enabled: eliminated all animations, flashing elements, and transitions.");
        break;
      case "calm":
        updated = {
          ...updated,
          contrast: "monochrome",
          pauseAnimations: true,
          muteMedia: true,
        };
        announce("Calm and Low Stimulation profile enabled: black and white colors, muted audio, zero motion.");
        break;
      default:
        break;
    }

    setSettings(updated);
  };

  // Reset All Settings to complete default
  const resetAllSettings = () => {
    playAccessibleChime(350);
    if (speechState === "speaking") {
      handleToggleSpeech("stop");
    }
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}

    if (typeof document !== "undefined") {
      const html = document.documentElement;
      html.classList.remove(
        "ada-zoom-115", "ada-zoom-130", "ada-zoom-145",
        "ada-text-spacing", "ada-dyslexic-font",
        "ada-contrast-dark", "ada-contrast-light", "ada-contrast-monochrome",
        "ada-contrast-invert", "ada-contrast-high-sat", "ada-contrast-low-sat",
        "ada-highlight-links", "ada-highlight-headings",
        "ada-big-cursor", "ada-pause-animations", "ada-keyboard-nav"
      );
      document.querySelectorAll("video, audio").forEach((el) => {
        el.muted = false;
      });
    }

    setSettings(INITIAL_SETTINGS);
    announce("All accessibility adjustments reset to default.");
  };

  // Calculate active adjustment count strictly on modifications
  const activeCount = useMemo(() => {
    let count = 0;
    if (settings.zoom !== 100) count++;
    if (settings.textSpacing) count++;
    if (settings.dyslexicFont) count++;
    if (settings.contrast !== "default") count++;
    if (settings.highlightLinks) count++;
    if (settings.highlightHeadings) count++;
    if (settings.readingGuide) count++;
    if (settings.readingMask) count++;
    if (settings.bigCursor) count++;
    if (settings.pauseAnimations) count++;
    if (settings.muteMedia) count++;
    return count;
  }, [settings]);

  // Travel Destinations Data
  const travelDestinations = useMemo(() => {
    const list = [
      { id: "main", title: "Main Content", subtitle: "Jump straight to page story & primary content", selector: "#main-content", icon: ArrowRight, type: "landmark" },
      { id: "header", title: "Main Navigation", subtitle: "Header menu, logo & contact links", selector: "#site-header", icon: Compass, type: "landmark" },
      { id: "services", title: "Our Care Services", subtitle: "Personal care, companion, 24-hr & memory care", selector: "#services", icon: Home, type: "section" },
      { id: "areas", title: "9 PA Counties Coverage", subtitle: "Bucks, Philadelphia, Montgomery, Delaware, etc.", selector: "#service-areas", icon: MapPin, type: "section" },
      { id: "reviews", title: "Client Reviews (4.9★)", subtitle: "Verified family experiences across PA", selector: "#reviews", icon: Sparkles, type: "section" },
      { id: "faqs", title: "Common Care Questions", subtitle: "Medicaid waiver coverage, hourly rates & answers", selector: "#faqs", icon: HelpCircle, type: "section" },
      { id: "form", title: "Request Care Assessment", subtitle: "Free in-home confidential consultation form", selector: "#consultation-form", icon: Heart, type: "section" },
      { id: "footer", title: "Footer & Legal Disclaimers", subtitle: "Privacy policy, licensing & company details", selector: "#site-footer", icon: FileText, type: "landmark" },
      // Key Pages
      { id: "page-home", title: "Home Page", subtitle: "Overview of Pavan Homecare services", href: "/", icon: Home, type: "page" },
      { id: "page-about", title: "About Pavan Homecare", subtitle: "Our story, mission, and care philosophy", href: "/about", icon: Heart, type: "page" },
      { id: "page-services", title: "All Care Offerings", subtitle: "Complete directory of specialized in-home care", href: "/services", icon: Sparkles, type: "page" },
      { id: "page-personal", title: "Personal Care & Hygiene", subtitle: "Bathing, dressing, grooming & mobility help", href: "/personal-care", icon: Heart, type: "page" },
      { id: "page-companion", title: "Companion Care & Socialization", subtitle: "Conversation, meal prep & errand assistance", href: "/companion-care", icon: Heart, type: "page" },
      { id: "page-24hr", title: "24-Hour & Live-In Care", subtitle: "Continuous around-the-clock peace of mind", href: "/24-hour-live-in-care", icon: Shield, type: "page" },
      { id: "page-dementia", title: "Alzheimer's & Dementia Care", subtitle: "Patient, structured memory support at home", href: "/dementia-alzheimers-care", icon: Brain, type: "page" },
      { id: "page-respite", title: "Post-Hospital & Respite Care", subtitle: "Caregiver relief & transitional care", href: "/post-hospital-respite-care", icon: Shield, type: "page" },
      { id: "page-caregiver-pay", title: "Get Paid as Family Caregiver", subtitle: "PA Community HealthChoices waiver guide", href: "/blog/paid-family-caregiver-pa", icon: Zap, type: "page" },
      { id: "page-costs", title: "PA Home Care Cost Guide", subtitle: "Hourly rates, Medicaid coverage & payment", href: "/blog/home-care-cost-pennsylvania", icon: FileText, type: "page" },
      { id: "page-contact", title: "Contact Us & Free Consultation", subtitle: "Speak directly with our care coordinator", href: "/contact-us", icon: Phone, type: "page" },
    ];

    if (!searchQuery.trim()) return list;
    const q = searchQuery.toLowerCase().trim();
    return list.filter((item) =>
      item.title.toLowerCase().includes(q) ||
      item.subtitle.toLowerCase().includes(q) ||
      item.type.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  if (pathname && pathname.startsWith("/admin")) return null;

  return (
    <>
      {/* ── SCREEN READER ANNOUNCER LIVE REGION ── */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {announcement}
      </div>

      {/* ── READING AIDS OVERLAYS ── */}
      {settings.readingGuide && (
        <div
          className={styles.readingRuler}
          style={{ top: `${mouseY}px` }}
          aria-hidden="true"
        />
      )}

      {settings.readingMask && (
        <>
          <div
            className={styles.readingMaskTop}
            style={{ height: `${Math.max(0, mouseY - 45)}px` }}
            aria-hidden="true"
          />
          <div
            className={styles.readingMaskBottom}
            style={{ top: `${mouseY + 45}px` }}
            aria-hidden="true"
          />
        </>
      )}

      {/* ── PERSISTENT ACCESSIBILITY LAUNCHER BUTTON ── */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => {
          setIsOpen(true);
          announce("Accessibility and travel menu opened");
          playAccessibleChime(520);
        }}
        className={styles.adaTriggerBtn}
        aria-label={`Open Accessibility and Quick Travel Menu. Keyboard shortcut: Alt + A. ${activeCount} active adjustments.`}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        title="Accessibility & Quick Travel Menu (Alt + A)"
      >
        <div className={styles.triggerIconWrap}>
          <Accessibility size={20} />
        </div>
        <span className={styles.triggerLabel}>Accessibility</span>
        {activeCount > 0 && (
          <span className={styles.activeCountBadge} aria-label={`${activeCount} active settings`}>
            {activeCount}
          </span>
        )}
      </button>

      {/* ── ACCESSIBILITY MODAL DIALOG ── */}
      {isOpen && (
        <div
          className={styles.adaOverlay}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsOpen(false);
              announce("Accessibility menu closed");
            }
          }}
        >
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="ada-modal-title"
            aria-describedby="ada-modal-desc"
            className={styles.adaModal}
          >
            {/* 1. Modal Header */}
            <div className={styles.modalHeader}>
              <div className={styles.headerTitleGroup}>
                <div className={styles.headerIconBadge}>
                  <Accessibility size={22} />
                </div>
                <div>
                  <h2 id="ada-modal-title" className={styles.modalTitle} style={{ color: "#FFFFFF" }}>
                    Accessibility &amp; Fast Travel
                  </h2>
                  <p id="ada-modal-desc" className={styles.modalSubtitle} style={{ color: "#E2EDFF" }}>
                    ADA Title III &amp; WCAG 2.1 AA Compliant · Shortcut: <kbd className={styles.keyBadge}>Alt + A</kbd>
                  </p>
                </div>
              </div>

              <div className={styles.headerActions}>
                {activeCount > 0 && (
                  <button
                    type="button"
                    onClick={resetAllSettings}
                    className={styles.resetBtn}
                    title="Reset all settings to default"
                  >
                    <RotateCcw size={12} />
                    <span>Reset ({activeCount})</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    announce("Accessibility menu closed");
                    triggerRef.current?.focus();
                  }}
                  className={styles.closeBtn}
                  aria-label="Close accessibility menu"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* 2. Accessible Tabs Bar */}
            <div className={styles.tabsBar} role="tablist" aria-label="Accessibility settings categories">
              <button
                type="button"
                role="tab"
                id="tab-travel"
                aria-selected={activeTab === "travel"}
                aria-controls="panel-travel"
                onClick={() => {
                  setActiveTab("travel");
                  playAccessibleChime(480);
                }}
                className={`${styles.tabBtn} ${activeTab === "travel" ? styles.tabBtnActive : ""}`}
              >
                <Compass size={14} />
                <span>Fast Travel</span>
              </button>

              <button
                type="button"
                role="tab"
                id="tab-profiles"
                aria-selected={activeTab === "profiles"}
                aria-controls="panel-profiles"
                onClick={() => {
                  setActiveTab("profiles");
                  playAccessibleChime(480);
                }}
                className={`${styles.tabBtn} ${activeTab === "profiles" ? styles.tabBtnActive : ""}`}
              >
                <Zap size={14} />
                <span>Profiles</span>
              </button>

              <button
                type="button"
                role="tab"
                id="tab-visual"
                aria-selected={activeTab === "visual"}
                aria-controls="panel-visual"
                onClick={() => {
                  setActiveTab("visual");
                  playAccessibleChime(480);
                }}
                className={`${styles.tabBtn} ${activeTab === "visual" ? styles.tabBtnActive : ""}`}
              >
                <Type size={14} />
                <span>Visual &amp; Font</span>
              </button>

              <button
                type="button"
                role="tab"
                id="tab-reading"
                aria-selected={activeTab === "reading"}
                aria-controls="panel-reading"
                onClick={() => {
                  setActiveTab("reading");
                  playAccessibleChime(480);
                }}
                className={`${styles.tabBtn} ${activeTab === "reading" ? styles.tabBtnActive : ""}`}
              >
                <Eye size={14} />
                <span>Reading &amp; Audio</span>
              </button>

              <button
                type="button"
                role="tab"
                id="tab-statement"
                aria-selected={activeTab === "statement"}
                aria-controls="panel-statement"
                onClick={() => {
                  setActiveTab("statement");
                  playAccessibleChime(480);
                }}
                className={`${styles.tabBtn} ${activeTab === "statement" ? styles.tabBtnActive : ""}`}
              >
                <Shield size={14} />
                <span>ADA Statement</span>
              </button>
            </div>

            {/* 3. Modal Body Panels */}
            <div className={styles.modalBody}>

              {/* ─────────────────────────────────────────────────────────
                  TAB 1: FAST TRAVEL & NAVIGATION ASSISTANT
                  ───────────────────────────────────────────────────────── */}
              {activeTab === "travel" && (
                <div role="tabpanel" id="panel-travel" aria-labelledby="tab-travel" className="flex flex-col gap-5">
                  {/* Instant Travel Search Filter */}
                  <div className={styles.searchBox}>
                    <Search size={16} className={styles.searchIcon} />
                    <input
                      ref={searchInputRef}
                      type="search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Type to filter sections, services, or pages (e.g. services, bucks, reviews, contact)..."
                      className={styles.searchInput}
                      aria-label="Filter navigation destinations"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery("")}
                        className="absolute right-3 text-slate-400 hover:text-slate-600 p-1"
                        aria-label="Clear search"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>

                  {/* Immediate Emergency / Coordinator Hotline */}
                  <div className="bg-gradient-to-r from-[#001A4D] to-[#004ECC] rounded-2xl p-4 text-white flex flex-wrap items-center justify-between gap-3 shadow-md">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#60EFFF]/20 text-[#60EFFF] flex items-center justify-center shrink-0">
                        <Phone size={18} />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-sm m-0 text-white !text-white" style={{ color: "#FFFFFF" }}>Need Immediate Care Assistance?</h4>
                        <p className="text-xs text-sky-200 !text-sky-200 m-0" style={{ color: "#BAE6FD" }}>24/7 Homecare Intake &amp; Coordinator Hotline</p>
                      </div>
                    </div>
                    <a
                      href={site.phoneHref}
                      className="px-4 py-2 bg-[#FF7A59] hover:bg-[#ff6740] text-white font-bold text-xs rounded-xl transition-colors inline-flex items-center gap-1.5 shadow"
                    >
                      <Phone size={13} />
                      <span>Call {site.phoneDisplay}</span>
                    </a>
                  </div>

                  {/* Cookie & Privacy Choices Access */}
                  <div className="flex items-center justify-between p-3 bg-slate-50 hover:bg-[#E8F2FF] border border-slate-200 rounded-2xl transition-colors">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-blue-100 text-[#0061FF] flex items-center justify-center shrink-0">
                        <ShieldCheck size={16} />
                      </div>
                      <div>
                        <div className="font-bold text-xs text-[#001A4D]">Privacy &amp; Cookie Preferences</div>
                        <div className="text-[11px] text-slate-500">Manage consent choices at any time</div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setIsOpen(false);
                        if (typeof window !== "undefined") {
                          window.dispatchEvent(new CustomEvent("phc_open_cookie_preferences", { detail: { target: "modal" } }));
                          window.location.hash = "#cookie-settings";
                        }
                      }}
                      className="px-3 py-1.5 bg-white border border-slate-300 hover:border-[#0061FF] hover:text-[#0061FF] text-[#001A4D] rounded-xl text-xs font-bold transition-colors cursor-pointer"
                    >
                      Manage Choices
                    </button>
                  </div>

                  {/* Travel Grid */}
                  <div className={styles.sectionGroup}>
                    <div className={styles.sectionHeader}>
                      <h3 className={styles.sectionTitle}>
                        <Compass size={16} className="text-[#0061FF]" />
                        <span>Direct Page Landmarks &amp; Sections</span>
                      </h3>
                      <span className="text-[11px] font-semibold text-slate-400">
                        {travelDestinations.length} Destinations
                      </span>
                    </div>

                    <div className={styles.travelGrid}>
                      {travelDestinations.map((dest) => {
                        const Icon = dest.icon;
                        if (dest.selector) {
                          return (
                            <button
                              key={dest.id}
                              type="button"
                              onClick={() => jumpToElement(dest.selector, dest.title)}
                              className={styles.travelCard}
                            >
                              <div className={styles.travelIconWrap}>
                                <Icon size={18} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className={styles.travelCardTitle}>{dest.title}</div>
                                <div className={styles.travelCardSubtitle}>{dest.subtitle}</div>
                              </div>
                            </button>
                          );
                        }

                        return (
                          <Link
                            key={dest.id}
                            href={dest.href}
                            onClick={() => {
                              setIsOpen(false);
                              announce(`Navigating to ${dest.title}`);
                            }}
                            className={styles.travelCard}
                          >
                            <div className={styles.travelIconWrap}>
                              <Icon size={18} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className={styles.travelCardTitle}>{dest.title}</div>
                              <div className={styles.travelCardSubtitle}>{dest.subtitle}</div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  {/* 9 PA Counties Direct Jump */}
                  <div className={styles.sectionGroup}>
                    <div className={styles.sectionHeader}>
                      <h3 className={styles.sectionTitle}>
                        <MapPin size={16} className="text-[#0061FF]" />
                        <span>Pennsylvania County Guides (9 Counties)</span>
                      </h3>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {[
                        { name: "Bucks County", slug: "bucks" },
                        { name: "Philadelphia", slug: "philadelphia" },
                        { name: "Montgomery", slug: "montgomery" },
                        { name: "Delaware County", slug: "delaware" },
                        { name: "Chester County", slug: "chester" },
                        { name: "Lehigh County", slug: "lehigh" },
                        { name: "Northampton", slug: "northampton" },
                        { name: "Berks County", slug: "berks" },
                        { name: "Schuylkill", slug: "schuylkill" },
                      ].map((county) => (
                        <Link
                          key={county.slug}
                          href={`/areas-we-serve/${county.slug}`}
                          onClick={() => setIsOpen(false)}
                          className="px-3 py-2 bg-slate-50 hover:bg-[#E8F2FF] hover:text-[#0061FF] border border-slate-200 rounded-xl text-xs font-bold text-[#001A4D] transition-colors flex items-center justify-between"
                        >
                          <span>{county.name}</span>
                          <ArrowRight size={12} className="text-slate-400" />
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Hotkeys Directory */}
                  <div className={styles.sectionGroup}>
                    <div className={styles.sectionHeader}>
                      <h3 className={styles.sectionTitle}>
                        <Keyboard size={16} className="text-[#0061FF]" />
                        <span>Keyboard Shortcuts Cheat Sheet</span>
                      </h3>
                    </div>
                    <table className={styles.shortcutsTable}>
                      <thead>
                        <tr>
                          <th>Action</th>
                          <th>Shortcut Key</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Open / Close Accessibility Menu</td>
                          <td><kbd className={styles.keyBadge}>Alt + A</kbd></td>
                        </tr>
                        <tr>
                          <td>Jump to Main Content</td>
                          <td><kbd className={styles.keyBadge}>Alt + M</kbd></td>
                        </tr>
                        <tr>
                          <td>Jump to Site Navigation</td>
                          <td><kbd className={styles.keyBadge}>Alt + N</kbd></td>
                        </tr>
                        <tr>
                          <td>Jump to Care Services</td>
                          <td><kbd className={styles.keyBadge}>Alt + S</kbd></td>
                        </tr>
                        <tr>
                          <td>Direct Call Coordinator</td>
                          <td><kbd className={styles.keyBadge}>Alt + C</kbd></td>
                        </tr>
                        <tr>
                          <td>Reset All Accessibility Settings</td>
                          <td><kbd className={styles.keyBadge}>Alt + R</kbd></td>
                        </tr>
                        <tr>
                          <td>Close Menu / Modal</td>
                          <td><kbd className={styles.keyBadge}>Esc</kbd></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ─────────────────────────────────────────────────────────
                  TAB 2: ACCESSIBILITY PROFILES (1-CLICK COMPLIANCE PRESETS)
                  ───────────────────────────────────────────────────────── */}
              {activeTab === "profiles" && (
                <div role="tabpanel" id="panel-profiles" aria-labelledby="tab-profiles" className="flex flex-col gap-4">
                  <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl text-xs text-slate-600">
                    <p className="m-0 font-medium leading-relaxed">
                      Select a profile tailored for specific visual, cognitive, or physical requirements. Each preset activates ideal settings instantly per WCAG 2.1 Level AA recommendations.
                    </p>
                  </div>

                  <div className={styles.profilesGrid}>
                    {/* 1. Vision Impairment Profile */}
                    <div className={`${styles.profileCard} ${settings.activeProfile === "vision" ? styles.profileCardActive : ""}`}>
                      <div className={styles.profileTop}>
                        <div className={styles.profileMeta}>
                          <div className={styles.profileIconWrap}>
                            <ZoomIn size={20} />
                          </div>
                          <div>
                            <h4 className={styles.profileName}>Vision Impairment Profile</h4>
                            <p className={styles.profileDesc}>
                              Increases text sizing (+30%), applies crisp contrast, enlarges cursor, and emphasizes clickable links.
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          role="switch"
                          aria-checked={settings.activeProfile === "vision"}
                          onClick={() => applyProfile("vision")}
                          className={styles.toggleSwitch}
                          aria-label="Toggle Vision Impairment Profile"
                        >
                          <span className={styles.toggleThumb} />
                        </button>
                      </div>
                    </div>

                    {/* 2. Cognitive & ADHD Profile */}
                    <div className={`${styles.profileCard} ${settings.activeProfile === "cognitive" ? styles.profileCardActive : ""}`}>
                      <div className={styles.profileTop}>
                        <div className={styles.profileMeta}>
                          <div className={styles.profileIconWrap}>
                            <Brain size={20} />
                          </div>
                          <div>
                            <h4 className={styles.profileName}>Cognitive &amp; ADHD Profile</h4>
                            <p className={styles.profileDesc}>
                              Enables reading focus guide, freezes background motion, highlights major headers, and minimizes visual clutter.
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          role="switch"
                          aria-checked={settings.activeProfile === "cognitive"}
                          onClick={() => applyProfile("cognitive")}
                          className={styles.toggleSwitch}
                          aria-label="Toggle Cognitive & ADHD Profile"
                        >
                          <span className={styles.toggleThumb} />
                        </button>
                      </div>
                    </div>

                    {/* 3. Dyslexia Friendly Profile */}
                    <div className={`${styles.profileCard} ${settings.activeProfile === "dyslexia" ? styles.profileCardActive : ""}`}>
                      <div className={styles.profileTop}>
                        <div className={styles.profileMeta}>
                          <div className={styles.profileIconWrap}>
                            <Type size={20} />
                          </div>
                          <div>
                            <h4 className={styles.profileName}>Dyslexia Friendly Profile</h4>
                            <p className={styles.profileDesc}>
                              Applies Atkinson Hyperlegible typography designed by the Braille Institute with enhanced letter and line spacing.
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          role="switch"
                          aria-checked={settings.activeProfile === "dyslexia"}
                          onClick={() => applyProfile("dyslexia")}
                          className={styles.toggleSwitch}
                          aria-label="Toggle Dyslexia Friendly Profile"
                        >
                          <span className={styles.toggleThumb} />
                        </button>
                      </div>
                    </div>

                    {/* 4. Motor & Keyboard Profile */}
                    <div className={`${styles.profileCard} ${settings.activeProfile === "motor" ? styles.profileCardActive : ""}`}>
                      <div className={styles.profileTop}>
                        <div className={styles.profileMeta}>
                          <div className={styles.profileIconWrap}>
                            <Keyboard size={20} />
                          </div>
                          <div>
                            <h4 className={styles.profileName}>Motor &amp; Keyboard Mode</h4>
                            <p className={styles.profileDesc}>
                              Draws prominent 3px focus rings on every focusable button/link, smooth scroll lock, and keyboard shortcut guidance.
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          role="switch"
                          aria-checked={settings.activeProfile === "motor"}
                          onClick={() => applyProfile("motor")}
                          className={styles.toggleSwitch}
                          aria-label="Toggle Motor & Keyboard Profile"
                        >
                          <span className={styles.toggleThumb} />
                        </button>
                      </div>
                    </div>

                    {/* 5. Seizure & Epilepsy Safe Profile */}
                    <div className={`${styles.profileCard} ${settings.activeProfile === "seizure" ? styles.profileCardActive : ""}`}>
                      <div className={styles.profileTop}>
                        <div className={styles.profileMeta}>
                          <div className={styles.profileIconWrap}>
                            <Zap size={20} />
                          </div>
                          <div>
                            <h4 className={styles.profileName}>Seizure &amp; Epilepsy Safe</h4>
                            <p className={styles.profileDesc}>
                              Completely halts all CSS animations, smooth transitions, video autoplay, and moving marquee per WCAG 2.3.1.
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          role="switch"
                          aria-checked={settings.activeProfile === "seizure"}
                          onClick={() => applyProfile("seizure")}
                          className={styles.toggleSwitch}
                          aria-label="Toggle Seizure Safe Profile"
                        >
                          <span className={styles.toggleThumb} />
                        </button>
                      </div>
                    </div>

                    {/* 6. Calm / Low Stimulation Profile */}
                    <div className={`${styles.profileCard} ${settings.activeProfile === "calm" ? styles.profileCardActive : ""}`}>
                      <div className={styles.profileTop}>
                        <div className={styles.profileMeta}>
                          <div className={styles.profileIconWrap}>
                            <VolumeX size={20} />
                          </div>
                          <div>
                            <h4 className={styles.profileName}>Calm &amp; Low Stimulation</h4>
                            <p className={styles.profileDesc}>
                              Converts website to gentle monochrome grayscale, silences background media, and freezes movement for sensory ease.
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          role="switch"
                          aria-checked={settings.activeProfile === "calm"}
                          onClick={() => applyProfile("calm")}
                          className={styles.toggleSwitch}
                          aria-label="Toggle Calm Profile"
                        >
                          <span className={styles.toggleThumb} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─────────────────────────────────────────────────────────
                  TAB 3: VISUAL & TYPOGRAPHY ADJUSTMENTS
                  ───────────────────────────────────────────────────────── */}
              {activeTab === "visual" && (
                <div role="tabpanel" id="panel-visual" aria-labelledby="tab-visual" className="flex flex-col gap-5">
                  {/* Font Size Scaling */}
                  <div className={styles.sectionGroup}>
                    <div className={styles.sectionHeader}>
                      <h3 className={styles.sectionTitle}>
                        <Maximize2 size={16} className="text-[#0061FF]" />
                        <span>Font Size Scaling</span>
                      </h3>
                      <span className="text-xs font-bold text-[#0061FF]">{settings.zoom}%</span>
                    </div>
                    <div className={styles.choiceGroup}>
                      {[
                        { label: "Default (100%)", val: 100 },
                        { label: "Medium (115%)", val: 115 },
                        { label: "Large (130%)", val: 130 },
                        { label: "Maximum (145%)", val: 145 },
                      ].map((opt) => (
                        <button
                          key={opt.val}
                          type="button"
                          onClick={() => {
                            const nextZoom = settings.zoom === opt.val ? 100 : opt.val;
                            setSettings((p) => ({ ...p, zoom: nextZoom, activeProfile: null }));
                            announce(`Font size ${nextZoom === 100 ? "reset to default (100%)" : `set to ${nextZoom}%`}`);
                            playAccessibleChime(440);
                          }}
                          className={`${styles.choiceBtn} ${settings.zoom === opt.val ? styles.choiceBtnActive : ""}`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Contrast Themes */}
                  <div className={styles.sectionGroup}>
                    <div className={styles.sectionHeader}>
                      <h3 className={styles.sectionTitle}>
                        <Contrast size={16} className="text-[#0061FF]" />
                        <span>Color Contrast Modes</span>
                      </h3>
                    </div>
                    <div className={styles.choiceGroup}>
                      {[
                        { label: "Normal", val: "default" },
                        { label: "High Contrast Dark", val: "dark" },
                        { label: "High Contrast Light", val: "light" },
                        { label: "Monochrome (B&W)", val: "monochrome" },
                        { label: "Color Invert", val: "invert" },
                        { label: "High Saturation", val: "high-sat" },
                      ].map((opt) => (
                        <button
                          key={opt.val}
                          type="button"
                          onClick={() => {
                            const nextContrast = settings.contrast === opt.val ? "default" : opt.val;
                            setSettings((p) => ({ ...p, contrast: nextContrast, activeProfile: null }));
                            announce(`Color contrast ${nextContrast === "default" ? "reset to normal" : `set to ${opt.label}`}`);
                            playAccessibleChime(460);
                          }}
                          className={`${styles.choiceBtn} ${settings.contrast === opt.val ? styles.choiceBtnActive : ""}`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Font Style & Spacing Adjustments */}
                  <div className={styles.sectionGroup}>
                    <div className={styles.sectionHeader}>
                      <h3 className={styles.sectionTitle}>
                        <Type size={16} className="text-[#0061FF]" />
                        <span>Readability &amp; Structure Enhancements</span>
                      </h3>
                    </div>

                    <div className={styles.toolsGrid}>
                      {/* Dyslexia Font */}
                      <div className={`${styles.toolCard} ${settings.dyslexicFont ? styles.toolCardActive : ""}`}>
                        <div className={styles.toolInfo}>
                          <Type size={18} className={styles.toolIcon} />
                          <div>
                            <div className={styles.toolTitle}>Dyslexia Font</div>
                            <div className="text-[11px] text-slate-500">Atkinson Hyperlegible</div>
                          </div>
                        </div>
                        <button
                          type="button"
                          role="switch"
                          aria-checked={settings.dyslexicFont}
                          onClick={() => {
                            setSettings((p) => ({ ...p, dyslexicFont: !p.dyslexicFont, activeProfile: null }));
                            announce(`Dyslexia font ${!settings.dyslexicFont ? "enabled" : "disabled"}`);
                            playAccessibleChime(480);
                          }}
                          className={styles.toggleSwitch}
                          aria-label="Toggle Dyslexia Font"
                        >
                          <span className={styles.toggleThumb} />
                        </button>
                      </div>

                      {/* Text Spacing */}
                      <div className={`${styles.toolCard} ${settings.textSpacing ? styles.toolCardActive : ""}`}>
                        <div className={styles.toolInfo}>
                          <SlidersHorizontal size={18} className={styles.toolIcon} />
                          <div>
                            <div className={styles.toolTitle}>Text Spacing</div>
                            <div className="text-[11px] text-slate-500">Letter &amp; line room</div>
                          </div>
                        </div>
                        <button
                          type="button"
                          role="switch"
                          aria-checked={settings.textSpacing}
                          onClick={() => {
                            setSettings((p) => ({ ...p, textSpacing: !p.textSpacing, activeProfile: null }));
                            announce(`Text spacing ${!settings.textSpacing ? "expanded" : "reset"}`);
                            playAccessibleChime(480);
                          }}
                          className={styles.toggleSwitch}
                          aria-label="Toggle Text Spacing"
                        >
                          <span className={styles.toggleThumb} />
                        </button>
                      </div>

                      {/* Highlight Links */}
                      <div className={`${styles.toolCard} ${settings.highlightLinks ? styles.toolCardActive : ""}`}>
                        <div className={styles.toolInfo}>
                          <Sparkles size={18} className={styles.toolIcon} />
                          <div>
                            <div className={styles.toolTitle}>Highlight Links</div>
                            <div className="text-[11px] text-slate-500">Underline clickable links</div>
                          </div>
                        </div>
                        <button
                          type="button"
                          role="switch"
                          aria-checked={settings.highlightLinks}
                          onClick={() => {
                            setSettings((p) => ({ ...p, highlightLinks: !p.highlightLinks, activeProfile: null }));
                            announce(`Link highlight ${!settings.highlightLinks ? "enabled" : "disabled"}`);
                            playAccessibleChime(480);
                          }}
                          className={styles.toggleSwitch}
                          aria-label="Toggle Highlight Links"
                        >
                          <span className={styles.toggleThumb} />
                        </button>
                      </div>

                      {/* Highlight Headings */}
                      <div className={`${styles.toolCard} ${settings.highlightHeadings ? styles.toolCardActive : ""}`}>
                        <div className={styles.toolInfo}>
                          <CheckCircle2 size={18} className={styles.toolIcon} />
                          <div>
                            <div className={styles.toolTitle}>Highlight Headings</div>
                            <div className="text-[11px] text-slate-500">Outline H1-H6 tags</div>
                          </div>
                        </div>
                        <button
                          type="button"
                          role="switch"
                          aria-checked={settings.highlightHeadings}
                          onClick={() => {
                            setSettings((p) => ({ ...p, highlightHeadings: !p.highlightHeadings, activeProfile: null }));
                            announce(`Heading highlight ${!settings.highlightHeadings ? "enabled" : "disabled"}`);
                            playAccessibleChime(480);
                          }}
                          className={styles.toggleSwitch}
                          aria-label="Toggle Highlight Headings"
                        >
                          <span className={styles.toggleThumb} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─────────────────────────────────────────────────────────
                  TAB 4: READING AIDS & AUDIO TOOLS
                  ───────────────────────────────────────────────────────── */}
              {activeTab === "reading" && (
                <div role="tabpanel" id="panel-reading" aria-labelledby="tab-reading" className="flex flex-col gap-5">
                  {/* Text to Speech Bar */}
                  <div className={styles.ttsBar}>
                    <div className={styles.ttsStatus}>
                      <Volume2 size={18} className="text-[#60EFFF]" />
                      <span>
                        {speechState === "speaking" && "🔊 Screen Reader: Speaking Page Content..."}
                        {speechState === "paused" && "⏸️ Screen Reader: Paused"}
                        {speechState === "idle" && "Screen Reader: Text-to-Speech Ready"}
                      </span>
                    </div>

                    <div className={styles.ttsControls}>
                      {speechState === "idle" && (
                        <button
                          type="button"
                          onClick={() => handleToggleSpeech("start")}
                          className={styles.ttsBtn}
                        >
                          <Play size={12} className="inline mr-1" />
                          <span>Read Page Aloud</span>
                        </button>
                      )}

                      {speechState === "speaking" && (
                        <>
                          <button
                            type="button"
                            onClick={() => handleToggleSpeech("pause")}
                            className={styles.ttsBtn}
                          >
                            <Pause size={12} className="inline mr-1" />
                            <span>Pause</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleToggleSpeech("stop")}
                            className={`${styles.ttsBtn} ${styles.ttsBtnStop}`}
                          >
                            <Square size={12} className="inline mr-1" />
                            <span>Stop</span>
                          </button>
                        </>
                      )}

                      {speechState === "paused" && (
                        <>
                          <button
                            type="button"
                            onClick={() => handleToggleSpeech("resume")}
                            className={styles.ttsBtn}
                          >
                            <Play size={12} className="inline mr-1" />
                            <span>Resume</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleToggleSpeech("stop")}
                            className={`${styles.ttsBtn} ${styles.ttsBtnStop}`}
                          >
                            <Square size={12} className="inline mr-1" />
                            <span>Stop</span>
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Reading Aids Tools */}
                  <div className={styles.sectionGroup}>
                    <div className={styles.sectionHeader}>
                      <h3 className={styles.sectionTitle}>
                        <Eye size={16} className="text-[#0061FF]" />
                        <span>Visual Guides &amp; Motor Assistance</span>
                      </h3>
                    </div>

                    <div className={styles.toolsGrid}>
                      {/* Reading Ruler */}
                      <div className={`${styles.toolCard} ${settings.readingGuide ? styles.toolCardActive : ""}`}>
                        <div className={styles.toolInfo}>
                          <Sliders size={18} className={styles.toolIcon} />
                          <div>
                            <div className={styles.toolTitle}>Reading Ruler</div>
                            <div className="text-[11px] text-slate-500">Horizontal cursor guide</div>
                          </div>
                        </div>
                        <button
                          type="button"
                          role="switch"
                          aria-checked={settings.readingGuide}
                          onClick={() => {
                            setSettings((p) => ({ ...p, readingGuide: !p.readingGuide, readingMask: false, activeProfile: null }));
                            announce(`Reading ruler ${!settings.readingGuide ? "activated" : "deactivated"}`);
                            playAccessibleChime(500);
                          }}
                          className={styles.toggleSwitch}
                          aria-label="Toggle Reading Ruler"
                        >
                          <span className={styles.toggleThumb} />
                        </button>
                      </div>

                      {/* Reading Mask */}
                      <div className={`${styles.toolCard} ${settings.readingMask ? styles.toolCardActive : ""}`}>
                        <div className={styles.toolInfo}>
                          <Eye size={18} className={styles.toolIcon} />
                          <div>
                            <div className={styles.toolTitle}>Reading Mask</div>
                            <div className="text-[11px] text-slate-500">Dim peripheral view</div>
                          </div>
                        </div>
                        <button
                          type="button"
                          role="switch"
                          aria-checked={settings.readingMask}
                          onClick={() => {
                            setSettings((p) => ({ ...p, readingMask: !p.readingMask, readingGuide: false, activeProfile: null }));
                            announce(`Reading mask ${!settings.readingMask ? "activated" : "deactivated"}`);
                            playAccessibleChime(500);
                          }}
                          className={styles.toggleSwitch}
                          aria-label="Toggle Reading Mask"
                        >
                          <span className={styles.toggleThumb} />
                        </button>
                      </div>

                      {/* Big Cursor */}
                      <div className={`${styles.toolCard} ${settings.bigCursor ? styles.toolCardActive : ""}`}>
                        <div className={styles.toolInfo}>
                          <MousePointer size={18} className={styles.toolIcon} />
                          <div>
                            <div className={styles.toolTitle}>Enlarged Cursor</div>
                            <div className="text-[11px] text-slate-500">High contrast pointer</div>
                          </div>
                        </div>
                        <button
                          type="button"
                          role="switch"
                          aria-checked={settings.bigCursor}
                          onClick={() => {
                            setSettings((p) => ({ ...p, bigCursor: !p.bigCursor, activeProfile: null }));
                            announce(`Enlarged cursor ${!settings.bigCursor ? "enabled" : "disabled"}`);
                            playAccessibleChime(500);
                          }}
                          className={styles.toggleSwitch}
                          aria-label="Toggle Enlarged Cursor"
                        >
                          <span className={styles.toggleThumb} />
                        </button>
                      </div>

                      {/* Pause Animations */}
                      <div className={`${styles.toolCard} ${settings.pauseAnimations ? styles.toolCardActive : ""}`}>
                        <div className={styles.toolInfo}>
                          <Zap size={18} className={styles.toolIcon} />
                          <div>
                            <div className={styles.toolTitle}>Pause Animations</div>
                            <div className="text-[11px] text-slate-500">Stop motion &amp; marquee</div>
                          </div>
                        </div>
                        <button
                          type="button"
                          role="switch"
                          aria-checked={settings.pauseAnimations}
                          onClick={() => {
                            setSettings((p) => ({ ...p, pauseAnimations: !p.pauseAnimations, activeProfile: null }));
                            announce(`Animations ${!settings.pauseAnimations ? "paused" : "resumed"}`);
                            playAccessibleChime(500);
                          }}
                          className={styles.toggleSwitch}
                          aria-label="Toggle Pause Animations"
                        >
                          <span className={styles.toggleThumb} />
                        </button>
                      </div>

                      {/* Mute Media */}
                      <div className={`${styles.toolCard} ${settings.muteMedia ? styles.toolCardActive : ""}`}>
                        <div className={styles.toolInfo}>
                          <VolumeX size={18} className={styles.toolIcon} />
                          <div>
                            <div className={styles.toolTitle}>Mute Media</div>
                            <div className="text-[11px] text-slate-500">Silence videos &amp; audio</div>
                          </div>
                        </div>
                        <button
                          type="button"
                          role="switch"
                          aria-checked={settings.muteMedia}
                          onClick={() => {
                            setSettings((p) => ({ ...p, muteMedia: !p.muteMedia, activeProfile: null }));
                            announce(`Media ${!settings.muteMedia ? "muted" : "unmuted"}`);
                            playAccessibleChime(500);
                          }}
                          className={styles.toggleSwitch}
                          aria-label="Toggle Mute Media"
                        >
                          <span className={styles.toggleThumb} />
                        </button>
                      </div>

                      {/* Accessible Audio Chime */}
                      <div className={`${styles.toolCard} ${settings.soundChime ? styles.toolCardActive : ""}`}>
                        <div className={styles.toolInfo}>
                          <Volume2 size={18} className={styles.toolIcon} />
                          <div>
                            <div className={styles.toolTitle}>Audio Feedback</div>
                            <div className="text-[11px] text-slate-500">Click tone chime</div>
                          </div>
                        </div>
                        <button
                          type="button"
                          role="switch"
                          aria-checked={settings.soundChime}
                          onClick={() => {
                            const next = !settings.soundChime;
                            setSettings((p) => ({ ...p, soundChime: next }));
                            if (next) playAccessibleChime(660);
                            announce(`Audio chime feedback ${next ? "enabled" : "disabled"}`);
                          }}
                          className={styles.toggleSwitch}
                          aria-label="Toggle Audio Feedback"
                        >
                          <span className={styles.toggleThumb} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─────────────────────────────────────────────────────────
                  TAB 5: ADA STATEMENT & DIRECT ASSISTANCE
                  ───────────────────────────────────────────────────────── */}
              {activeTab === "statement" && (
                <div role="tabpanel" id="panel-statement" aria-labelledby="tab-statement" className="flex flex-col gap-4">
                  <div className={styles.statementCard}>
                    <div className={styles.statementBadge}>
                      <Shield size={12} />
                      <span>ADA Title III &amp; WCAG 2.1 Level AA Compliance</span>
                    </div>

                    <h3 className="font-poppins font-extrabold text-base text-[#001A4D] m-0">
                      Our Ongoing Commitment to Full Accessibility
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed m-0">
                      At <strong>Pavan Homecare</strong>, we believe every senior, individual with disabilities, and family caregiver deserves dignified, barrier-free access to homecare resources and information. We strive to adhere to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA and Section 508 standards.
                    </p>

                    <div className="border-t border-slate-200 pt-3 mt-1 flex flex-col gap-2 text-xs text-slate-700">
                      <div className="font-bold text-[#001A4D]">Accessibility Capabilities Built-in:</div>
                      <ul className="list-disc pl-5 space-y-1 text-slate-600">
                        <li>ARIA Landmark and Semantic HTML hierarchy across all service pages.</li>
                        <li>Accessible skip navigation links for keyboard users to bypass blocks.</li>
                        <li>Atkinson Hyperlegible typography for users with dyslexia or low vision.</li>
                        <li>High-contrast visual modes and responsive text scaling up to 145%.</li>
                        <li>Live SpeechSynthesis page reading assistant.</li>
                      </ul>
                    </div>

                    <div className="border-t border-slate-200 pt-3 flex items-center justify-between gap-3">
                      <div>
                        <div className="font-bold text-xs text-[#001A4D]">Privacy &amp; Cookie Choices</div>
                        <div className="text-[11px] text-slate-500">Configure analytics, telemetry &amp; privacy preferences</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setIsOpen(false);
                          if (typeof window !== "undefined") {
                            window.dispatchEvent(new CustomEvent("phc_open_cookie_preferences", { detail: { target: "modal" } }));
                            window.location.hash = "#cookie-settings";
                          }
                        }}
                        className="px-3.5 py-1.5 bg-white border border-slate-300 hover:border-[#0061FF] hover:text-[#0061FF] text-[#001A4D] rounded-xl text-xs font-bold transition-colors cursor-pointer inline-flex items-center gap-1.5 shrink-0"
                      >
                        <ShieldCheck size={14} className="text-[#0061FF]" />
                        <span>Manage Cookies</span>
                      </button>
                    </div>

                    <div className="bg-[#E8F2FF] border border-[#0061FF]/20 rounded-xl p-3.5 mt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div>
                        <div className="font-bold text-xs text-[#001A4D]">Encountered an Accessibility Barrier?</div>
                        <div className="text-[11px] text-slate-600">Our care coordinators are ready 24/7 to assist you directly.</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <a
                          href={site.phoneHref}
                          className="px-3.5 py-1.5 bg-[#0061FF] text-white rounded-lg text-xs font-bold hover:bg-[#0052db] transition-colors inline-flex items-center gap-1"
                        >
                          <Phone size={11} />
                          <span>Call Coordinator</span>
                        </a>
                        <Link
                          href="/contact-us"
                          onClick={() => setIsOpen(false)}
                          className="px-3 py-1.5 bg-white border border-slate-300 text-[#001A4D] rounded-lg text-xs font-bold hover:bg-slate-50 transition-colors"
                        >
                          Report Barrier
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </>
  );
}
