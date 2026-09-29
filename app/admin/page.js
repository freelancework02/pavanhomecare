"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  User,
  Key,
  LogOut,
  Search,
  Filter,
  Download,
  RefreshCw,
  Phone,
  Mail,
  MapPin,
  Calendar,
  MessageSquare,
  FileText,
  Trash2,
  CheckCircle,
  Clock,
  AlertCircle,
  Eye,
  X,
  ExternalLink,
  ChevronDown,
  Sparkles,
  HeartHandshake,
  Check,
  Settings,
  BookOpen,
  Plus,
  Edit,
  Globe,
  Tag,
  FolderOpen,
  Activity,
  Sliders,
  Monitor,
  Zap,
  Smartphone,
  Award
} from "lucide-react";
import BlogEditor from "@/components/BlogEditor";
import { site } from "@/lib/site";

// Google Lighthouse Circular Score Dial Component
function LighthouseScoreDial({ score, title }) {
  const isGood = score >= 90;
  const isAverage = score >= 50 && score < 90;

  const strokeColor = isGood ? "#0cce6b" : isAverage ? "#ffa400" : "#ff4e42";
  const textColor = isGood ? "text-emerald-600" : isAverage ? "text-amber-600" : "text-red-600";
  const bgColor = isGood ? "bg-emerald-50/70" : isAverage ? "bg-amber-50/70" : "bg-red-50/70";
  const borderColor = isGood ? "border-emerald-200" : isAverage ? "border-amber-200" : "border-red-200";

  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className={`p-5 rounded-2xl border ${borderColor} ${bgColor} flex flex-col items-center justify-center text-center shadow-sm transition-all hover:shadow-md`}>
      <div className="relative w-24 h-24 flex items-center justify-center mb-2">
        <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            className="stroke-slate-200"
            strokeWidth="7"
            fill="transparent"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke={strokeColor}
            strokeWidth="7"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <span className={`absolute text-2xl font-black ${textColor}`}>
          {score}
        </span>
      </div>
      <span className="font-extrabold text-sm text-[#001A4D]">{title}</span>
      <span className={`text-[11px] font-bold mt-0.5 ${textColor}`}>
        {isGood ? "90–100 (Good)" : isAverage ? "50–89 (Needs Work)" : "0–49 (Poor)"}
      </span>
    </div>
  );
}

export default function AdminPage() {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Inquiries state
  const [inquiries, setInquiries] = useState([]);
  const [loadingInquiries, setLoadingInquiries] = useState(false);
  const [inquiriesError, setInquiriesError] = useState("");

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all"); // 'all', 'new', 'contacted', 'scheduled', 'form', 'chatbot'

  // Modal detail
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  // Settings modal
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [settingsForm, setSettingsForm] = useState({
    currentPassword: "",
    newUsername: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [settingsSuccess, setSettingsSuccess] = useState("");
  const [settingsError, setSettingsError] = useState("");
  const [isUpdatingSettings, setIsUpdatingSettings] = useState(false);

  // Auth request headers helper
  const getAuthHeaders = () => {
    try {
      const savedAuth = localStorage.getItem("phc_admin_session");
      if (savedAuth) {
        const parsed = JSON.parse(savedAuth);
        if (parsed?.token) {
          return {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${parsed.token}`
          };
        }
      }
    } catch (e) {}
    return { "Content-Type": "application/json" };
  };

  // Check saved session on load
  useEffect(() => {
    try {
      const savedAuth = localStorage.getItem("phc_admin_session");
      if (savedAuth) {
        const parsed = JSON.parse(savedAuth);
        if (parsed?.token) {
          setIsAuthenticated(true);
        }
      }
    } catch (e) {
      console.warn("Could not read auth session:", e);
    } finally {
      setAuthChecking(false);
    }
  }, []);

  // Fetch inquiries when authenticated
  const fetchInquiries = async () => {
    setLoadingInquiries(true);
    setInquiriesError("");
    try {
      const res = await fetch("/api/admin/inquiries", {
        headers: getAuthHeaders()
      });
      if (res.status === 401) {
        handleLogout();
        return;
      }
      const data = await res.json();
      if (data.success && Array.isArray(data.inquiries)) {
        setInquiries(data.inquiries);
      } else {
        setInquiriesError(data.error || "Failed to load inquiries");
      }
    } catch (err) {
      console.error("Error fetching inquiries:", err);
      setInquiriesError("Network error while connecting to inquiry database.");
    } finally {
      setLoadingInquiries(false);
    }
  };

  // Top Admin View Tab: "inquiries" | "blogs"
  const [activeAdminTab, setActiveAdminTab] = useState("inquiries");

  // Blogs state
  const [blogs, setBlogs] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(false);
  const [blogsError, setBlogsError] = useState("");
  const [blogSearchQuery, setBlogSearchQuery] = useState("");
  const [blogCategoryFilter, setBlogCategoryFilter] = useState("all");
  const [blogStatusFilter, setBlogStatusFilter] = useState("all");
  const [showBlogEditor, setShowBlogEditor] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [blogToastMessage, setBlogToastMessage] = useState("");

  // Fetch blogs
  const fetchBlogs = async () => {
    setLoadingBlogs(true);
    setBlogsError("");
    try {
      const res = await fetch("/api/admin/blogs", {
        headers: getAuthHeaders()
      });
      if (res.status === 401) {
        handleLogout();
        return;
      }
      const data = await res.json();
      if (data.success && Array.isArray(data.blogs)) {
        setBlogs(data.blogs);
      } else {
        setBlogsError(data.error || "Failed to load blogs");
      }
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setBlogsError("Network error while connecting to blog database.");
    } finally {
      setLoadingBlogs(false);
    }
  };

  // Cookie Consent & Telemetry State
  const [consentRecords, setConsentRecords] = useState([]);
  const [consentMetrics, setConsentMetrics] = useState({
    total: 0,
    acceptedAll: 0,
    rejected: 0,
    customized: 0,
    acceptRate: 0,
    deviceCounts: { Desktop: 0, Mobile: 0, Tablet: 0 },
    topPages: []
  });
  const [loadingConsent, setLoadingConsent] = useState(false);
  const [consentError, setConsentError] = useState("");
  const [selectedConsentRecord, setSelectedConsentRecord] = useState(null);

  const fetchConsentData = async () => {
    setLoadingConsent(true);
    setConsentError("");
    try {
      const res = await fetch("/api/cookie-consent", {
        headers: getAuthHeaders()
      });
      if (res.status === 401) {
        handleLogout();
        return;
      }
      const data = await res.json();
      if (data.success && Array.isArray(data.records)) {
        setConsentRecords(data.records);
        if (data.metrics) setConsentMetrics(data.metrics);
      } else {
        setConsentError(data.error || "Failed to load cookie consent data");
      }
    } catch (err) {
      console.error("Error fetching cookie consent:", err);
      setConsentError("Network error while connecting to consent database.");
    } finally {
      setLoadingConsent(false);
    }
  };

  // Google Lighthouse State
  const [selectedAuditPage, setSelectedAuditPage] = useState("/");
  const [auditTargetPages, setAuditTargetPages] = useState([]);
  const [auditDeviceMode, setAuditDeviceMode] = useState("mobile");
  const [activeAuditFilter, setActiveAuditFilter] = useState("all");
  const [currentAudit, setCurrentAudit] = useState(null);
  const [auditHistory, setAuditHistory] = useState([]);
  const [isRunningAudit, setIsRunningAudit] = useState(false);
  const [auditError, setAuditError] = useState("");
  const [auditSuccessMsg, setAuditSuccessMsg] = useState("");

  const fetchLighthouseData = async () => {
    try {
      const res = await fetch("/api/admin/lighthouse", {
        headers: getAuthHeaders()
      });
      if (res.status === 401) return;
      const data = await res.json();
      if (data.success) {
        if (data.latestAudit) setCurrentAudit(data.latestAudit);
        if (Array.isArray(data.recentAudits)) setAuditHistory(data.recentAudits);
        if (Array.isArray(data.pages)) setAuditTargetPages(data.pages);
      }
    } catch (e) {
      console.warn("Could not load initial lighthouse data:", e);
    }
  };

  const handleRunAudit = async () => {
    setIsRunningAudit(true);
    setAuditError("");
    setAuditSuccessMsg("");
    try {
      const currentOrigin =
        typeof window !== "undefined" && window.location.origin
          ? window.location.origin
          : undefined;

      const res = await fetch("/api/admin/lighthouse", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          path: selectedAuditPage,
          device: auditDeviceMode,
          baseUrl: currentOrigin
        })
      });
      const data = await res.json();
      if (res.ok && data.success && data.audit) {
        setCurrentAudit(data.audit);
        setAuditHistory((prev) => [data.audit, ...prev].slice(0, 20));
        setAuditSuccessMsg(`Lighthouse audit completed for ${selectedAuditPage}!`);
        setTimeout(() => setAuditSuccessMsg(""), 3500);
      } else {
        setAuditError(data.error || "Failed to complete Lighthouse audit.");
      }
    } catch (err) {
      console.error("Lighthouse run error:", err);
      setAuditError("Network error while running Lighthouse audit.");
    } finally {
      setIsRunningAudit(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchInquiries();
      fetchBlogs();
      fetchConsentData();
      fetchLighthouseData();
    }
  }, [isAuthenticated]);

  // Handle Login
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError("");
    setIsLoggingIn(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm)
      });
      const data = await res.json();

      if (data.success && data.session) {
        localStorage.setItem("phc_admin_session", JSON.stringify(data.session));
        setIsAuthenticated(true);
      } else {
        setLoginError(data.error || "Invalid username or password. Please verify your credentials.");
      }
    } catch (err) {
      console.error("Login request failed:", err);
      setLoginError("Server communication error. Please try again.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("phc_admin_session");
    setIsAuthenticated(false);
    setInquiries([]);
    setSelectedInquiry(null);
  };

  // Update Status in Firestore
  const handleStatusChange = async (inquiryId, newStatus, collectionName) => {
    try {
      // Optimistic update
      setInquiries((prev) =>
        prev.map((item) => (item.id === inquiryId ? { ...item, status: newStatus } : item))
      );

      await fetch("/api/admin/inquiries", {
        method: "PATCH",
        headers: getAuthHeaders(),
        body: JSON.stringify({ id: inquiryId, status: newStatus, collectionName })
      });
    } catch (err) {
      console.error("Failed to update status:", err);
      fetchInquiries();
    }
  };

  // Delete Inquiry
  const handleDeleteInquiry = async (inquiryId, collectionName) => {
    if (!window.confirm("Are you sure you want to permanently delete this inquiry?")) {
      return;
    }

    try {
      setInquiries((prev) => prev.filter((item) => item.id !== inquiryId));
      if (selectedInquiry?.id === inquiryId) {
        setSelectedInquiry(null);
      }

      await fetch(`/api/admin/inquiries?id=${inquiryId}&collection=${collectionName || "PHC-Contact-form-inquiries"}`, {
        method: "DELETE",
        headers: getAuthHeaders()
      });
    } catch (err) {
      console.error("Failed to delete inquiry:", err);
      fetchInquiries();
    }
  };

  // Update Admin Credentials
  const handleSettingsSubmit = async (e) => {
    e.preventDefault();
    setSettingsError("");
    setSettingsSuccess("");

    if (settingsForm.newPassword !== settingsForm.confirmPassword) {
      setSettingsError("New password and confirm password do not match.");
      return;
    }

    if (settingsForm.newPassword.length < 6) {
      setSettingsError("New password must be at least 6 characters long.");
      return;
    }

    setIsUpdatingSettings(true);
    try {
      const res = await fetch("/api/admin/auth", {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          currentPassword: settingsForm.currentPassword,
          newUsername: settingsForm.newUsername,
          newPassword: settingsForm.newPassword
        })
      });
      const data = await res.json();

      if (data.success) {
        setSettingsSuccess("Admin credentials updated successfully!");
        setSettingsForm({
          currentPassword: "",
          newUsername: "",
          newPassword: "",
          confirmPassword: ""
        });
        setTimeout(() => setShowSettingsModal(false), 1500);
      } else {
        setSettingsError(data.error || "Failed to update credentials.");
      }
    } catch (err) {
      console.error("Settings error:", err);
      setSettingsError("Network error while updating credentials.");
    } finally {
      setIsUpdatingSettings(false);
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    if (!inquiries.length) return;

    const headers = [
      "ID",
      "Date",
      "Full Name",
      "Phone",
      "Email",
      "City/Location",
      "Services",
      "Source",
      "Status",
      "Message"
    ];

    const rows = filteredInquiries.map((inq) => [
      `"${inq.id || ""}"`,
      `"${new Date(inq.submittedAt).toLocaleString()}"`,
      `"${(inq.fullName || `${inq.firstName || ""} ${inq.lastName || ""}`).trim().replace(/"/g, '""')}"`,
      `"${(inq.phone || "").replace(/"/g, '""')}"`,
      `"${(inq.email || "").replace(/"/g, '""')}"`,
      `"${(inq.city || inq.location || inq.county || "").replace(/"/g, '""')}"`,
      `"${(Array.isArray(inq.servicesLabels) ? inq.servicesLabels.join(", ") : Array.isArray(inq.services) ? inq.services.join(", ") : inq.help || "").replace(/"/g, '""')}"`,
      `"${(inq.source === "chatbot" ? "Chatbot Advisor" : "Contact Form").replace(/"/g, '""')}"`,
      `"${(inq.status || "New").replace(/"/g, '""')}"`,
      `"${(inq.message || inq.careNeeds || "").replace(/"/g, '""')}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `pavan_homecare_inquiries_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtering & Search calculation
  const filteredInquiries = useMemo(() => {
    return inquiries.filter((inq) => {
      // 1. Text Search
      const search = searchQuery.toLowerCase().trim();
      const name = (inq.fullName || `${inq.firstName || ""} ${inq.lastName || ""}`).toLowerCase();
      const phone = (inq.phone || "").toLowerCase();
      const email = (inq.email || "").toLowerCase();
      const city = (inq.city || inq.location || inq.county || "").toLowerCase();
      const message = (inq.message || inq.careNeeds || "").toLowerCase();

      const matchesSearch =
        !search ||
        name.includes(search) ||
        phone.includes(search) ||
        email.includes(search) ||
        city.includes(search) ||
        message.includes(search);

      if (!matchesSearch) return false;

      // 2. Tab Filter
      if (selectedFilter === "all") return true;
      if (selectedFilter === "new") return (inq.status || "New").toLowerCase() === "new";
      if (selectedFilter === "contacted") return (inq.status || "").toLowerCase() === "contacted";
      if (selectedFilter === "scheduled")
        return (inq.status || "").toLowerCase().includes("scheduled");
      if (selectedFilter === "chatbot") return inq.source === "chatbot" || (inq.formName || "").toLowerCase().includes("chatbot");
      if (selectedFilter === "form")
        return inq.source !== "chatbot" && !(inq.formName || "").toLowerCase().includes("chatbot");

      return true;
    });
  }, [inquiries, searchQuery, selectedFilter]);

  // Statistics calculation
  const stats = useMemo(() => {
    const total = inquiries.length;
    const newCount = inquiries.filter((i) => (i.status || "New").toLowerCase() === "new").length;
    const chatbotCount = inquiries.filter(
      (i) => i.source === "chatbot" || (i.formName || "").toLowerCase().includes("chatbot")
    ).length;
    const formCount = total - chatbotCount;
    return { total, newCount, chatbotCount, formCount };
  }, [inquiries]);

  // Blog filtering & search calculation
  const filteredBlogs = useMemo(() => {
    return blogs.filter((b) => {
      const q = blogSearchQuery.toLowerCase().trim();
      const title = (b.title || "").toLowerCase();
      const excerpt = (b.excerpt || "").toLowerCase();
      const cat = (b.category || "").toLowerCase();
      const matchesSearch = !q || title.includes(q) || excerpt.includes(q) || cat.includes(q);
      if (!matchesSearch) return false;

      if (blogCategoryFilter !== "all" && (b.category || "").toLowerCase() !== blogCategoryFilter.toLowerCase()) {
        return false;
      }

      if (blogStatusFilter !== "all" && (b.status || "published").toLowerCase() !== blogStatusFilter.toLowerCase()) {
        return false;
      }

      return true;
    });
  }, [blogs, blogSearchQuery, blogCategoryFilter, blogStatusFilter]);

  // Blog statistics calculation
  const blogStats = useMemo(() => {
    const total = blogs.length;
    const published = blogs.filter((b) => (b.status || "published").toLowerCase() === "published").length;
    const drafts = total - published;
    const featured = blogs.filter((b) => b.featured).length;
    return { total, published, drafts, featured };
  }, [blogs]);

  // Unique categories for blog filter dropdown
  const availableBlogCategories = useMemo(() => {
    const set = new Set();
    blogs.forEach((b) => {
      if (b.category) set.add(b.category);
    });
    return Array.from(set);
  }, [blogs]);

  // Blog Handlers
  const handleToggleBlogStatus = async (blog) => {
    const newStatus = (blog.status || "published") === "published" ? "draft" : "published";
    setBlogs((prev) =>
      prev.map((b) => (b.id === blog.id ? { ...b, status: newStatus } : b))
    );
    try {
      await fetch("/api/admin/blogs", {
        method: "PATCH",
        headers: getAuthHeaders(),
        body: JSON.stringify({ id: blog.id, status: newStatus })
      });
      setBlogToastMessage(`Blog "${blog.title}" marked as ${newStatus}!`);
      setTimeout(() => setBlogToastMessage(""), 3000);
    } catch (err) {
      console.error("Failed to toggle blog status:", err);
      fetchBlogs();
    }
  };

  const handleDeleteBlog = async (blog) => {
    if (!window.confirm(`Are you sure you want to permanently delete "${blog.title}"?`)) {
      return;
    }
    setBlogs((prev) => prev.filter((b) => b.id !== blog.id));
    try {
      await fetch(`/api/admin/blogs?id=${blog.id}`, {
        method: "DELETE",
        headers: getAuthHeaders()
      });
      setBlogToastMessage(`Blog "${blog.title}" deleted.`);
      setTimeout(() => setBlogToastMessage(""), 3000);
    } catch (err) {
      console.error("Failed to delete blog:", err);
      fetchBlogs();
    }
  };

  const handleBlogSaved = (savedBlog) => {
    setShowBlogEditor(false);
    setEditingBlog(null);
    setBlogToastMessage(`Article "${savedBlog.title || 'Blog'}" successfully saved!`);
    setTimeout(() => setBlogToastMessage(""), 3500);
    fetchBlogs();
  };

  // Initial loading state
  if (authChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F1F5F9]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#0061FF] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-semibold text-[#475569]">Loading Admin Portal...</p>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 1: LOGIN PAGE
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center px-4 bg-gradient-to-br from-[#001A4D] via-[#0B2A6B] to-[#001A4D]">
        {/* Background glow dots */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#60EFFF_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="w-full max-w-md relative z-10">
          {/* Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-10 border border-white/20">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#0061FF]/10 text-[#0061FF] rounded-2xl flex items-center justify-center mx-auto mb-4 border border-[#0061FF]/20 shadow-sm">
                <ShieldCheck size={36} />
              </div>
              <h1 className="text-2xl font-extrabold text-[#001A4D] tracking-tight">
                Pavan Homecare
              </h1>
              <p className="text-xs uppercase tracking-widest font-bold text-[#0061FF] mt-1">
                Admin Management Portal
              </p>
              <p className="text-sm text-[#64748B] mt-2">
                Sign in to view and manage contact inquiries and chatbot leads.
              </p>
            </div>

            {/* Error Message */}
            {loginError && (
              <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-2.5">
                <AlertCircle size={18} className="shrink-0 mt-0.5 text-red-500" />
                <span>{loginError}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#001A4D] uppercase tracking-wider mb-1.5">
                  Admin Username or Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#94A3B8]">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="admin@pavanhomecare.com"
                    value={loginForm.username}
                    onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#CBD5E1] text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0061FF]/30 focus:border-[#0061FF] transition-all bg-[#F8FAFC]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#001A4D] uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#94A3B8]">
                    <Key size={18} />
                  </div>
                  <input
                    type="password"
                    required
                    placeholder="••••••••••••"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#CBD5E1] text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0061FF]/30 focus:border-[#0061FF] transition-all bg-[#F8FAFC]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-[#0061FF] to-[#004ecc] hover:from-[#0052db] hover:to-[#003ea8] text-white font-bold text-sm rounded-xl shadow-lg shadow-[#0061FF]/30 transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {isLoggingIn ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to Admin Portal</span>
                    <Lock size={16} />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Back to website link */}
          <div className="text-center mt-6">
            <Link
              href="/"
              className="text-xs font-semibold text-white/70 hover:text-white transition-colors inline-flex items-center gap-1.5"
            >
              <span>← Back to Public Website</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: AUTHENTICATED ADMIN DASHBOARD
  // =========================================================================
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Top Navbar */}
      <header className="bg-[#001A4D] text-white sticky top-0 z-40 shadow-md border-b border-[#0061FF]/30">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Left Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0061FF] to-[#60EFFF] flex items-center justify-center text-white shadow-sm font-bold text-lg">
              P
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight">Pavan Homecare</span>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#0061FF] text-white">
                  ADMIN
                </span>
              </div>
              <p className="text-[11px] text-white/60">
                Connected Collection: <strong className="text-[#60EFFF]">PHC-Contact-form-inquiries</strong>
              </p>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={fetchInquiries}
              disabled={loadingInquiries}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center gap-1.5 text-xs font-semibold"
              title="Refresh Inquiries"
            >
              <RefreshCw size={15} className={loadingInquiries ? "animate-spin text-[#60EFFF]" : ""} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              onClick={() => setShowSettingsModal(true)}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center gap-1.5 text-xs font-semibold"
              title="Admin Credentials Settings"
            >
              <Settings size={15} />
              <span className="hidden sm:inline">Credentials</span>
            </button>

            <Link
              href="/"
              target="_blank"
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center gap-1.5 text-xs font-semibold"
              title="Open Website"
            >
              <ExternalLink size={15} />
              <span className="hidden sm:inline">View Site</span>
            </Link>

            <button
              onClick={handleLogout}
              className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-red-200 transition-colors flex items-center gap-1.5 text-xs font-semibold ml-2"
              title="Sign Out"
            >
              <LogOut size={15} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Blog Action Notification Toast */}
        {blogToastMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-bold flex items-center justify-between shadow-sm animate-fadeIn">
            <div className="flex items-center gap-2">
              <CheckCircle size={18} className="text-emerald-600 shrink-0" />
              <span>{blogToastMessage}</span>
            </div>
            <button
              onClick={() => setBlogToastMessage("")}
              className="text-emerald-600 hover:text-emerald-800 p-1 rounded-lg"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Top Admin Section Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8 pb-4 border-b border-slate-200">
          <button
            type="button"
            onClick={() => setActiveAdminTab("inquiries")}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
              activeAdminTab === "inquiries"
                ? "bg-[#001A4D] text-white shadow-md shadow-[#001A4D]/20"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <FileText size={16} />
            <span>Inquiries &amp; Leads</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                activeAdminTab === "inquiries"
                  ? "bg-[#0061FF] text-white"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              {stats.total}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveAdminTab("blogs")}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
              activeAdminTab === "blogs"
                ? "bg-[#001A4D] text-white shadow-md shadow-[#001A4D]/20"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <BookOpen size={16} />
            <span>Dynamic Blog Management</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                activeAdminTab === "blogs"
                  ? "bg-emerald-500 text-white"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              {blogStats.total}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveAdminTab("consent")}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
              activeAdminTab === "consent"
                ? "bg-[#001A4D] text-white shadow-md shadow-[#001A4D]/20"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <ShieldCheck size={16} className={activeAdminTab === "consent" ? "text-[#60EFFF]" : "text-[#0061FF]"} />
            <span>Consent &amp; Analytics</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                activeAdminTab === "consent"
                  ? "bg-purple-600 text-white"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              {consentMetrics.total}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveAdminTab("lighthouse")}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
              activeAdminTab === "lighthouse"
                ? "bg-[#001A4D] text-white shadow-md shadow-[#001A4D]/20"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <Zap size={16} className={activeAdminTab === "lighthouse" ? "text-amber-400" : "text-amber-500"} />
            <span>Google Lighthouse</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                activeAdminTab === "lighthouse"
                  ? "bg-amber-500 text-white"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              Audit
            </span>
          </button>
        </div>

        {activeAdminTab === "inquiries" && (
          <div>
            {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#001A4D] tracking-tight">
              Inquiries &amp; Leads Dashboard
            </h1>
            <p className="text-sm text-[#64748B] mt-1">
              Live inquiries captured from Contact Forms and the Virtual Chatbot Advisor.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportCSV}
              disabled={!inquiries.length}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#CBD5E1] text-[#001A4D] font-bold text-xs hover:bg-[#F1F5F9] shadow-sm transition-all disabled:opacity-50"
            >
              <Download size={15} className="text-[#0061FF]" />
              <span>Export CSV ({filteredInquiries.length})</span>
            </button>
          </div>
        </div>

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Card 1 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0061FF] flex items-center justify-center shrink-0">
              <FileText size={24} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#64748B]">Total Inquiries</p>
              <h3 className="text-2xl font-extrabold text-[#001A4D] mt-0.5">{stats.total}</h3>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#64748B]">New / Unhandled</p>
              <h3 className="text-2xl font-extrabold text-emerald-600 mt-0.5">{stats.newCount}</h3>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#FF7A59] flex items-center justify-center shrink-0">
              <Phone size={24} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#64748B]">Contact Forms</p>
              <h3 className="text-2xl font-extrabold text-[#001A4D] mt-0.5">{stats.formCount}</h3>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <MessageSquare size={24} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#64748B]">Chatbot Leads</p>
              <h3 className="text-2xl font-extrabold text-indigo-600 mt-0.5">{stats.chatbotCount}</h3>
            </div>
          </div>
        </div>

        {/* Filter Tabs & Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {[
              { id: "all", label: "All", count: stats.total },
              { id: "new", label: "New", count: stats.newCount },
              { id: "form", label: "Contact Form", count: stats.formCount },
              { id: "chatbot", label: "Chatbot Advisor", count: stats.chatbotCount }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  selectedFilter === tab.id
                    ? "bg-[#001A4D] text-white shadow-sm"
                    : "bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    selectedFilter === tab.id ? "bg-white/20 text-white" : "bg-white text-[#475569]"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8]">
              <Search size={16} />
            </div>
            <input
              type="text"
              placeholder="Search name, phone, city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#CBD5E1] text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0061FF]/30 focus:border-[#0061FF] transition-all bg-[#F8FAFC]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#94A3B8] hover:text-[#0F172A]"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Error banner */}
        {inquiriesError && (
          <div className="p-4 mb-6 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2">
            <AlertCircle size={18} className="shrink-0" />
            <span>{inquiriesError}</span>
          </div>
        )}

        {/* Table Card */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          {loadingInquiries && (
            <div className="p-12 text-center text-[#64748B]">
              <div className="w-8 h-8 border-3 border-[#0061FF] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-sm font-semibold">Fetching latest inquiries from Firestore...</p>
            </div>
          )}

          {!loadingInquiries && filteredInquiries.length === 0 && (
            <div className="p-12 text-center text-[#64748B]">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-400">
                <Search size={22} />
              </div>
              <h4 className="text-base font-bold text-[#001A4D]">No Inquiries Found</h4>
              <p className="text-xs text-[#94A3B8] mt-1 max-w-sm mx-auto">
                {searchQuery
                  ? "No results matching your search terms. Try clearing the filter."
                  : "No submissions recorded in this category yet."}
              </p>
            </div>
          )}

          {!loadingInquiries && filteredInquiries.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F8FAFC] border-b border-slate-200 text-[11.5px] font-bold uppercase tracking-wider text-[#64748B]">
                    <th className="py-3.5 px-4">Client Name</th>
                    <th className="py-3.5 px-4">Contact</th>
                    <th className="py-3.5 px-4">Location</th>
                    <th className="py-3.5 px-4">Source</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Date</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {filteredInquiries.map((inq) => {
                    const clientName = inq.fullName || `${inq.firstName || ""} ${inq.lastName || ""}`.trim() || "Anonymous";
                    const isChatbot = inq.source === "chatbot" || (inq.formName || "").toLowerCase().includes("chatbot");
                    const status = inq.status || "New";

                    return (
                      <tr key={inq.id} className="hover:bg-blue-50/40 transition-colors">
                        {/* Name */}
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-[#001A4D]">{clientName}</div>
                          {inq.recipientLabel && (
                            <div className="text-[11px] text-[#64748B]">For: {inq.recipientLabel}</div>
                          )}
                        </td>

                        {/* Contact */}
                        <td className="py-3.5 px-4">
                          {inq.phone && (
                            <a
                              href={`tel:${inq.phone}`}
                              className="font-medium text-[#0061FF] hover:underline flex items-center gap-1"
                            >
                              <Phone size={11} /> {inq.phone}
                            </a>
                          )}
                          {inq.email && (
                            <a
                              href={`mailto:${inq.email}`}
                              className="text-[11px] text-[#64748B] hover:underline flex items-center gap-1 mt-0.5"
                            >
                              <Mail size={11} /> {inq.email}
                            </a>
                          )}
                        </td>

                        {/* Location */}
                        <td className="py-3.5 px-4">
                          <span className="inline-flex items-center gap-1 text-[#475569]">
                            <MapPin size={12} className="text-[#94A3B8]" />
                            <span>{inq.city || inq.location || inq.county || "PA"}</span>
                          </span>
                        </td>

                        {/* Source */}
                        <td className="py-3.5 px-4">
                          {isChatbot ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10.5px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                              <MessageSquare size={11} />
                              Chatbot Lead
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10.5px] font-bold bg-blue-50 text-[#0061FF] border border-blue-200">
                              <FileText size={11} />
                              Contact Form
                            </span>
                          )}
                        </td>

                        {/* Status Dropdown */}
                        <td className="py-3.5 px-4">
                          <select
                            value={status}
                            onChange={(e) => handleStatusChange(inq.id, e.target.value, inq.collection)}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border focus:outline-none cursor-pointer transition-all ${
                              status === "New"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : status === "Contacted"
                                ? "bg-amber-50 text-amber-700 border-amber-200"
                                : status === "Assessment Scheduled"
                                ? "bg-purple-50 text-purple-700 border-purple-200"
                                : "bg-slate-100 text-slate-700 border-slate-200"
                            }`}
                          >
                            <option value="New">🟢 New</option>
                            <option value="Contacted">🟡 Contacted</option>
                            <option value="Assessment Scheduled">🟣 Scheduled</option>
                            <option value="Completed">✅ Completed</option>
                            <option value="Archived">⚪ Archived</option>
                          </select>
                        </td>

                        {/* Date */}
                        <td className="py-3.5 px-4 text-[#64748B]">
                          {inq.submittedAt ? new Date(inq.submittedAt).toLocaleDateString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }) : "—"}
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setSelectedInquiry(inq)}
                              className="p-1.5 rounded-lg bg-[#E8F2FF] text-[#0061FF] hover:bg-[#D0E4FF] transition-colors"
                              title="View Full Inquiry Details"
                            >
                              <Eye size={15} />
                            </button>
                            <button
                              onClick={() => handleDeleteInquiry(inq.id, inq.collection)}
                              className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                              title="Delete Inquiry"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      )}

        {/* ===================================================================
            VIEW TAB 2: DYNAMIC BLOG MANAGEMENT
            =================================================================== */}
        {activeAdminTab === "blogs" && (
          <div className="space-y-8 animate-fadeIn">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#001A4D] tracking-tight">
                  Dynamic Blog Management
                </h1>
                <p className="text-sm text-[#64748B] mt-1">
                  Create, edit, format, publish, and delete care articles live on the public website.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={fetchBlogs}
                  disabled={loadingBlogs}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#CBD5E1] text-[#001A4D] font-bold text-xs hover:bg-[#F1F5F9] shadow-sm transition-all"
                  title="Reload Blogs from Database"
                >
                  <RefreshCw size={14} className={loadingBlogs ? "animate-spin text-[#0061FF]" : ""} />
                  <span>Refresh</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setEditingBlog(null);
                    setShowBlogEditor(true);
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0061FF] to-[#004ecc] hover:from-[#0052db] hover:to-[#003ea8] text-white font-bold text-xs shadow-lg shadow-[#0061FF]/30 hover:-translate-y-0.5 transition-all cursor-pointer"
                >
                  <Plus size={16} />
                  <span>Write New Blog Article</span>
                </button>
              </div>
            </div>

            {/* Metric Cards Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0061FF] flex items-center justify-center shrink-0">
                  <BookOpen size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#64748B]">Total Articles</p>
                  <h3 className="text-2xl font-extrabold text-[#001A4D] mt-0.5">{blogStats.total}</h3>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <CheckCircle size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#64748B]">Published (Live)</p>
                  <h3 className="text-2xl font-extrabold text-emerald-600 mt-0.5">{blogStats.published}</h3>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <Clock size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#64748B]">Drafts</p>
                  <h3 className="text-2xl font-extrabold text-amber-600 mt-0.5">{blogStats.drafts}</h3>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <Sparkles size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#64748B]">Featured</p>
                  <h3 className="text-2xl font-extrabold text-indigo-600 mt-0.5">{blogStats.featured}</h3>
                </div>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-80">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Search size={16} />
                </div>
                <input
                  type="text"
                  placeholder="Search articles by title, excerpt..."
                  value={blogSearchQuery}
                  onChange={(e) => setBlogSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0061FF] bg-slate-50"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
                <select
                  value={blogCategoryFilter}
                  onChange={(e) => setBlogCategoryFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 text-slate-700 focus:outline-none focus:border-[#0061FF]"
                >
                  <option value="all">All Categories</option>
                  {availableBlogCategories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>

                <select
                  value={blogStatusFilter}
                  onChange={(e) => setBlogStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 text-slate-700 focus:outline-none focus:border-[#0061FF]"
                >
                  <option value="all">All Statuses</option>
                  <option value="published">🟢 Published</option>
                  <option value="draft">🟡 Drafts</option>
                </select>
              </div>
            </div>

            {/* Blog Table / Grid */}
            {loadingBlogs && blogs.length === 0 ? (
              <div className="bg-white rounded-3xl p-16 border border-slate-200 text-center flex flex-col items-center">
                <div className="w-10 h-10 border-4 border-[#0061FF] border-t-transparent rounded-full animate-spin mb-3" />
                <p className="text-sm font-semibold text-slate-600">Loading articles from Firestore...</p>
              </div>
            ) : filteredBlogs.length === 0 ? (
              <div className="bg-white rounded-3xl p-16 border border-slate-200 text-center">
                <BookOpen size={48} className="text-slate-300 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-[#001A4D]">No Articles Found</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  {blogSearchQuery
                    ? "No blog posts matched your search query. Try another keyword."
                    : "No articles found. Write a new article to get started!"}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setEditingBlog(null);
                    setShowBlogEditor(true);
                  }}
                  className="mt-4 px-5 py-2.5 rounded-xl bg-[#0061FF] text-white text-xs font-bold shadow-md hover:bg-[#004ecc] transition-all inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus size={14} /> Write First Article
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        <th className="py-4 px-6">Article</th>
                        <th className="py-4 px-4">Category</th>
                        <th className="py-4 px-4">Status</th>
                        <th className="py-4 px-4">Read Time / Date</th>
                        <th className="py-4 px-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs">
                      {filteredBlogs.map((post) => {
                        const isPub = (post.status || "published").toLowerCase() === "published";
                        return (
                          <tr key={post.id || post.slug} className="hover:bg-slate-50/70 transition-colors">
                            {/* Title & Cover */}
                            <td className="py-4 px-6">
                              <div className="flex items-center gap-3">
                                {post.image ? (
                                  <div className="relative w-14 h-11 rounded-lg overflow-hidden shrink-0 bg-slate-100 border border-slate-200">
                                    <Image
                                      src={post.image}
                                      alt={post.title}
                                      fill
                                      className="object-cover"
                                      unoptimized={post.image.startsWith("http")}
                                    />
                                  </div>
                                ) : (
                                  <div className="w-14 h-11 rounded-lg bg-blue-50 text-[#0061FF] flex items-center justify-center shrink-0">
                                    <BookOpen size={18} />
                                  </div>
                                )}
                                <div className="min-w-0 max-w-md">
                                  <div className="flex items-center gap-2">
                                    <h4 className="font-bold text-sm text-[#001A4D] hover:text-[#0061FF] truncate">
                                      {post.title}
                                    </h4>
                                    {post.featured && (
                                      <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-indigo-100 text-indigo-700">
                                        FEATURED
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-[11px] text-slate-500 truncate mt-0.5">
                                    {post.excerpt || post.slug}
                                  </p>
                                </div>
                              </div>
                            </td>

                            {/* Category */}
                            <td className="py-4 px-4">
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-blue-50 text-[#0061FF] font-semibold text-[11px] border border-blue-200/60">
                                <Tag size={10} />
                                {post.category || "Care Resource"}
                              </span>
                            </td>

                            {/* Status */}
                            <td className="py-4 px-4">
                              <button
                                type="button"
                                onClick={() => handleToggleBlogStatus(post)}
                                title="Click to toggle Published / Draft"
                                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                                  isPub
                                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                                    : "bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100"
                                }`}
                              >
                                <span className={`w-1.5 h-1.5 rounded-full ${isPub ? "bg-emerald-500" : "bg-amber-500"}`} />
                                {isPub ? "Published" : "Draft"}
                              </button>
                            </td>

                            {/* Date / Read time */}
                            <td className="py-4 px-4 text-slate-500 text-[11px]">
                              <div>{post.readTime || "4 min read"}</div>
                              <div className="text-slate-400">
                                {post.publishedAt
                                  ? new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                                  : "Draft"}
                              </div>
                            </td>

                            {/* Actions */}
                            <td className="py-4 px-6 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedAuditPage(`/blog/${post.slug}`);
                                    setActiveAdminTab("lighthouse");
                                    window.scrollTo({ top: 0, behavior: "smooth" });
                                  }}
                                  className="p-1.5 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition-colors cursor-pointer"
                                  title="Audit SEO and Google Lighthouse for this Blog"
                                >
                                  <Zap size={15} />
                                </button>
                                <Link
                                  href={`/blog/${post.slug}`}
                                  target="_blank"
                                  className="p-1.5 rounded-lg text-slate-400 hover:text-[#0061FF] hover:bg-blue-50 transition-colors"
                                  title="View Live on Website"
                                >
                                  <ExternalLink size={15} />
                                </Link>

                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingBlog(post);
                                    setShowBlogEditor(true);
                                  }}
                                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                                  title="Edit Blog"
                                >
                                  <Edit size={15} />
                                </button>

                                <button
                                  type="button"
                                  onClick={() => handleDeleteBlog(post)}
                                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                                  title="Delete Blog"
                                >
                                  <Trash2 size={15} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* =====================================================================
            VIEW 3: COOKIE CONSENT & VISITOR TELEMETRY
            ===================================================================== */}
        {activeAdminTab === "consent" && (
          <div className="space-y-8 animate-fadeIn">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#001A4D] tracking-tight flex items-center gap-2.5">
                  <ShieldCheck size={28} className="text-[#0061FF]" />
                  Cookie Consent &amp; Visitor Analytics
                </h1>
                <p className="text-sm text-[#64748B] mt-1">
                  Real-time visitor telemetry from Firestore collection: <code className="text-[#0061FF] font-mono text-xs font-bold">PHC-cookie-consent-data</code>
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={fetchConsentData}
                  disabled={loadingConsent}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <RefreshCw size={14} className={loadingConsent ? "animate-spin text-[#0061FF]" : ""} />
                  <span>Refresh</span>
                </button>
              </div>
            </div>

            {/* Metric KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Consents</span>
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0061FF] flex items-center justify-center">
                    <ShieldCheck size={18} />
                  </div>
                </div>
                <div className="text-2xl font-extrabold text-[#001A4D]">{consentMetrics.total}</div>
                <span className="text-xs text-slate-500 mt-1 block">Logged to PHC-cookie-consent-data</span>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Accepted All</span>
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <CheckCircle size={18} />
                  </div>
                </div>
                <div className="text-2xl font-extrabold text-emerald-600">{consentMetrics.acceptedAll}</div>
                <span className="text-xs text-emerald-700 font-semibold mt-1 block">
                  {consentMetrics.acceptRate}% Acceptance Rate
                </span>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Rejected Non-Essential</span>
                  <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center">
                    <Lock size={18} />
                  </div>
                </div>
                <div className="text-2xl font-extrabold text-slate-700">{consentMetrics.rejected}</div>
                <span className="text-xs text-slate-500 mt-1 block">Strictly Necessary Only</span>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Devices &amp; Traffic</span>
                  <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                    <Activity size={18} />
                  </div>
                </div>
                <div className="text-sm font-bold text-[#001A4D] flex items-center justify-between mt-1">
                  <span>Desktop: {consentMetrics.deviceCounts?.Desktop || 0}</span>
                  <span>Mobile: {consentMetrics.deviceCounts?.Mobile || 0}</span>
                </div>
                <span className="text-xs text-slate-500 mt-1 block">Tablets: {consentMetrics.deviceCounts?.Tablet || 0}</span>
              </div>
            </div>

            {/* Quick Insights Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Visited Pages */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
                <h3 className="text-sm font-bold text-[#001A4D] mb-3 flex items-center gap-2">
                  <Activity size={16} className="text-[#0061FF]" />
                  Top Visited Pages (Tracked Telemetry)
                </h3>
                {consentMetrics.topPages && consentMetrics.topPages.length > 0 ? (
                  <div className="space-y-2">
                    {consentMetrics.topPages.map((tp, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs py-1.5 border-b border-slate-100 last:border-0">
                        <code className="text-[#001A4D] font-mono font-medium truncate max-w-[280px] sm:max-w-md">{tp.path}</code>
                        <span className="px-2 py-0.5 rounded-full bg-blue-50 text-[#0061FF] font-bold text-[11px] shrink-0">
                          {tp.views} {tp.views === 1 ? "visit" : "visits"}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 italic">No page tracking recorded yet.</p>
                )}
              </div>

              {/* Legal Notice & Compliance Overview */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
                <h3 className="text-sm font-bold text-[#001A4D] mb-3 flex items-center gap-2">
                  <ShieldCheck size={16} className="text-emerald-600" />
                  Privacy &amp; Compliance Safeguards
                </h3>
                <div className="space-y-2.5 text-xs text-slate-600 leading-relaxed">
                  <p className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span><strong>Cookie &amp; Privacy Notice:</strong> Discloses categories of data (analytics, clicks, approximate location, device details) before logging.</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span><strong>Do Not Sell or Share My Info:</strong> Provides visitors clear opt-out toggles and zero unauthorized data sharing.</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span><strong>Persistent Consent Management:</strong> Users can revisit or revoke consent anytime via the floating badge or footer &quot;Cookie Choices&quot; link.</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span><strong>Audit Trail in Firestore:</strong> All decisions, timestamps, and browser configurations logged to <code className="font-mono text-[#0061FF]">PHC-cookie-consent-data</code>.</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Consent Records Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-[#001A4D]">Recent Consent &amp; Telemetry Logs</h3>
                  <p className="text-xs text-slate-500">Collection: PHC-cookie-consent-data</p>
                </div>
                <span className="text-xs font-semibold text-slate-500">
                  Showing {consentRecords.length} records
                </span>
              </div>

              {loadingConsent ? (
                <div className="p-12 text-center text-slate-400">
                  <RefreshCw size={24} className="animate-spin mx-auto text-[#0061FF] mb-2" />
                  <p className="text-xs">Loading consent logs from Firestore...</p>
                </div>
              ) : consentRecords.length === 0 ? (
                <div className="p-12 text-center text-slate-400">
                  <ShieldCheck size={32} className="mx-auto text-slate-300 mb-2" />
                  <p className="text-sm font-semibold text-slate-600">No consent records yet</p>
                  <p className="text-xs text-slate-400 mt-1">Visit the public website and interact with the Cookie Consent banner to generate your first live record.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-600 uppercase font-bold text-[10px] tracking-wider border-b border-slate-200">
                      <tr>
                        <th className="py-3 px-4">Date &amp; Time (EST)</th>
                        <th className="py-3 px-4">Consent Decision</th>
                        <th className="py-3 px-4">Device &amp; Browser</th>
                        <th className="py-3 px-4">Location / Timezone</th>
                        <th className="py-3 px-4">Pages Visited</th>
                        <th className="py-3 px-4">Clicks Recorded</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {consentRecords.map((r, idx) => {
                        const status = r.consentStatus || "accepted_all";
                        return (
                          <tr key={r.id || r.consentId || idx} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <span className="font-bold text-[#001A4D] block">
                                {r.formattedDate || (r.submittedAtIso ? new Date(r.submittedAtIso).toLocaleString() : "Recent")}
                              </span>
                              <span className="text-[10px] text-slate-400 font-mono">
                                ID: {(r.consentId || r.id || "").slice(0, 16)}...
                              </span>
                            </td>

                            <td className="py-3.5 px-4 whitespace-nowrap">
                              {status === "accepted_all" ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                  <Check size={11} /> Accepted All
                                </span>
                              ) : status === "rejected_non_essential" ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-300">
                                  <Lock size={11} /> Non-Essential Rejected
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-[#0061FF] border border-blue-200">
                                  <Sliders size={11} /> Customized
                                </span>
                              )}
                            </td>

                            <td className="py-3.5 px-4">
                              <span className="font-semibold text-slate-800 block">
                                {r.deviceInfo?.browser || "Browser"} on {r.deviceInfo?.os || "OS"}
                              </span>
                              <span className="text-[10px] text-slate-400">
                                {r.deviceInfo?.deviceType || "Desktop"} &bull; {r.deviceInfo?.screenResolution || ""}
                              </span>
                            </td>

                            <td className="py-3.5 px-4">
                              <span className="text-slate-700 block font-medium">
                                {r.approximateLocation?.region || "Pennsylvania, USA"}
                              </span>
                              <span className="text-[10px] text-slate-400 font-mono">
                                {r.approximateLocation?.timezone || "America/New_York"} ({r.approximateLocation?.timezoneOffset || "UTC-4"})
                              </span>
                            </td>

                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <span className="font-bold text-[#001A4D]">
                                {r.analytics?.pageCount || (r.analytics?.pagesVisited ? r.analytics.pagesVisited.length : 1)} {r.analytics?.pageCount === 1 ? "page" : "pages"}
                              </span>
                            </td>

                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <span className="font-semibold text-slate-600">
                                {r.analytics?.clicksRecorded ? r.analytics.clicksRecorded.length : 0} actions
                              </span>
                            </td>

                            <td className="py-3.5 px-4 text-right whitespace-nowrap">
                              <button
                                type="button"
                                onClick={() => setSelectedConsentRecord(r)}
                                className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-[#0061FF] font-bold text-xs inline-flex items-center gap-1 cursor-pointer"
                              >
                                <Eye size={13} />
                                <span>Inspect</span>
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* =====================================================================
            VIEW 4: GOOGLE LIGHTHOUSE AUDIT SUITE
            ===================================================================== */}
        {activeAdminTab === "lighthouse" && (
          <div className="space-y-8 animate-fadeIn">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#001A4D] tracking-tight flex items-center gap-2.5">
                  <Zap size={28} className="text-amber-500 fill-amber-500" />
                  Google Lighthouse Quality &amp; Audit Suite
                </h1>
                <p className="text-sm text-[#64748B] mt-1">
                  Evaluate real-time scores for <strong className="text-slate-800">Performance</strong>, <strong className="text-slate-800">Accessibility</strong>, <strong className="text-slate-800">Best Practices</strong>, and <strong className="text-slate-800">SEO</strong>.
                </p>
              </div>

              {auditSuccessMsg && (
                <div className="px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold animate-fadeIn flex items-center gap-2">
                  <CheckCircle size={15} /> {auditSuccessMsg}
                </div>
              )}
            </div>

            {/* SEO Scope Notice */}
            <div className="bg-gradient-to-r from-blue-50/90 to-indigo-50/90 border border-blue-200/80 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 shadow-sm">
              <div className="p-2.5 rounded-xl bg-blue-600 text-white shrink-0 mt-0.5 shadow-md shadow-blue-500/20">
                <ShieldCheck size={20} />
              </div>
              <div className="text-xs flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="font-bold text-sm text-[#001A4D]">Website &amp; Published Blogs SEO Scope</h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800 border border-emerald-300">
                    Admin Portal Disallowed from SEO
                  </span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  The <strong>Admin Portal (/admin)</strong> is strictly an internal management tool and is completely removed from search engine indexing (enforced via <code className="bg-white/90 px-1.5 py-0.5 rounded border border-slate-200 text-slate-800 font-mono text-[11px]">noindex, nofollow</code>, <code className="bg-white/90 px-1.5 py-0.5 rounded border border-slate-200 text-slate-800 font-mono text-[11px]">X-Robots-Tag</code>, and <code className="bg-white/90 px-1.5 py-0.5 rounded border border-slate-200 text-slate-800 font-mono text-[11px]">robots.txt</code> disallow). This Google Lighthouse suite is dedicated to auditing and ranking your <strong>public website pages and published blog articles</strong> to maximize your Google search visibility and client inquiries.
                </p>
              </div>
            </div>

            {/* Audit Control Bar */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex flex-col">
                  <label className="text-[11px] font-bold uppercase text-slate-500 mb-1">Target Page to Audit</label>
                  <select
                    value={selectedAuditPage}
                    onChange={(e) => setSelectedAuditPage(e.target.value)}
                    className="px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-[#001A4D] bg-white focus:outline-none focus:border-[#0061FF] max-w-md truncate"
                  >
                    <optgroup label="Core Website Pages">
                      <option value="/">Home Page (/)</option>
                      <option value="/services">Care Services Overview (/services)</option>
                      <option value="/blog">Care Resource Hub &amp; Blog (/blog)</option>
                      <option value="/contact-us">Contact &amp; Free Assessment (/contact-us)</option>
                      <option value="/about">About Us &amp; Mission (/about)</option>
                      <option value="/areas-we-serve">Service Territory (/areas-we-serve)</option>
                    </optgroup>
                    <optgroup label="High-Intent Service Pages">
                      <option value="/companion-care">Companion Care (/companion-care)</option>
                      <option value="/personal-care">Personal Care (/personal-care)</option>
                      <option value="/24-hour-live-in-care">24-Hour Live-In Care (/24-hour-live-in-care)</option>
                      <option value="/dementia-alzheimers-care">Dementia &amp; Alzheimer's Care (/dementia-alzheimers-care)</option>
                      <option value="/post-hospital-respite-care">Respite Care (/post-hospital-respite-care)</option>
                    </optgroup>
                    <optgroup label="Published Blog Articles &amp; Guides">
                      {auditTargetPages.filter((p) => p.category === "Published Blog Articles").length > 0
                        ? auditTargetPages
                            .filter((p) => p.category === "Published Blog Articles")
                            .map((bp) => (
                              <option key={bp.path} value={bp.path}>
                                {bp.label}
                              </option>
                            ))
                        : (blogs || [])
                            .filter((b) => (b.status || "published") === "published")
                            .map((b) => (
                              <option key={b.slug} value={`/blog/${b.slug}`}>
                                Blog: {b.title || b.slug}
                              </option>
                            ))}
                    </optgroup>
                  </select>
                </div>

                <div className="flex flex-col">
                  <label className="text-[11px] font-bold uppercase text-slate-500 mb-1">Device Emulation</label>
                  <div className="inline-flex rounded-xl p-1 bg-slate-100 border border-slate-200">
                    <button
                      type="button"
                      onClick={() => setAuditDeviceMode("mobile")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                        auditDeviceMode === "mobile"
                          ? "bg-white text-[#001A4D] shadow-sm"
                          : "text-slate-500 hover:text-slate-900"
                      }`}
                    >
                      <Smartphone size={13} /> Mobile
                    </button>
                    <button
                      type="button"
                      onClick={() => setAuditDeviceMode("desktop")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                        auditDeviceMode === "desktop"
                          ? "bg-white text-[#001A4D] shadow-sm"
                          : "text-slate-500 hover:text-slate-900"
                      }`}
                    >
                      <Monitor size={13} /> Desktop
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2 lg:pt-0">
                <button
                  type="button"
                  onClick={handleRunAudit}
                  disabled={isRunningAudit}
                  className="w-full lg:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#0061FF] to-[#004ECC] hover:from-[#0052db] hover:to-[#003da8] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all transform hover:-translate-y-0.5 cursor-pointer disabled:opacity-60"
                >
                  {isRunningAudit ? (
                    <>
                      <RefreshCw size={16} className="animate-spin" />
                      <span>Auditing {selectedAuditPage}...</span>
                    </>
                  ) : (
                    <>
                      <Zap size={16} className="text-amber-300 fill-amber-300" />
                      <span>Run Google Lighthouse Audit</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {auditError && (
              <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
                <AlertCircle size={16} /> {auditError}
              </div>
            )}

            {/* Current Audit Results */}
            {currentAudit && (
              <div className="space-y-6">
                {/* 4 Large Score Dials */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <LighthouseScoreDial
                    title="Performance"
                    score={currentAudit.scores?.performance ?? 90}
                  />
                  <LighthouseScoreDial
                    title="Accessibility"
                    score={currentAudit.scores?.accessibility ?? 98}
                  />
                  <LighthouseScoreDial
                    title="Best Practices"
                    score={currentAudit.scores?.bestPractices ?? 100}
                  />
                  <LighthouseScoreDial
                    title="SEO"
                    score={currentAudit.scores?.seo ?? 100}
                  />
                </div>

                {/* Core Web Vitals Ribbon */}
                {currentAudit.metrics && (
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2.5">
                      <div className="flex items-center gap-2">
                        <Activity size={16} className="text-[#0061FF]" />
                        <span className="font-bold text-xs uppercase tracking-wider text-[#001A4D]">
                          Core Web Vitals &amp; Performance Metrics
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400 font-mono">
                        Audited URL: {currentAudit.fullUrl} ({currentAudit.device})
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">First Contentful Paint (FCP)</span>
                        <span className="text-base font-extrabold text-emerald-600">{currentAudit.metrics.fcp}</span>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Largest Contentful Paint (LCP)</span>
                        <span className="text-base font-extrabold text-emerald-600">{currentAudit.metrics.lcp}</span>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Total Blocking Time (TBT)</span>
                        <span className="text-base font-extrabold text-emerald-600">{currentAudit.metrics.tbt}</span>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Cumulative Layout Shift (CLS)</span>
                        <span className="text-base font-extrabold text-emerald-600">{currentAudit.metrics.cls}</span>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Speed Index</span>
                        <span className="text-base font-extrabold text-emerald-600">{currentAudit.metrics.speedIndex}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Category Audits Detailed List */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="p-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
                    <h3 className="text-sm font-bold text-[#001A4D] flex items-center gap-2">
                      <Award size={16} className="text-[#0061FF]" />
                      Detailed Lighthouse Audit Checks
                    </h3>

                    {/* Filter Pills */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      {[
                        { id: "all", label: "All Audits" },
                        { id: "performance", label: "Performance" },
                        { id: "accessibility", label: "Accessibility" },
                        { id: "bestPractices", label: "Best Practices" },
                        { id: "seo", label: "SEO" }
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => setActiveAuditFilter(tab.id)}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                            activeAuditFilter === tab.id
                              ? "bg-[#001A4D] text-white"
                              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="divide-y divide-slate-100">
                    {Object.entries(currentAudit.report?.categories || {})
                      .filter(([catKey]) => activeAuditFilter === "all" || activeAuditFilter === catKey)
                      .map(([catKey, category]) => (
                        <div key={catKey} className="p-5">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-extrabold text-sm text-[#001A4D] uppercase tracking-wide">
                              {category.title} Audits
                            </span>
                            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                              Score: {category.score} / 100
                            </span>
                          </div>

                          <div className="space-y-2.5">
                            {category.audits?.map((item, idx) => (
                              <div
                                key={idx}
                                className="p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-slate-200 transition-all flex items-start gap-3 text-xs"
                              >
                                <div className="mt-0.5 shrink-0">
                                  {item.passed ? (
                                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                                      ✓
                                    </div>
                                  ) : (
                                    <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
                                      !
                                    </div>
                                  )}
                                </div>

                                <div className="flex-1">
                                  <div className="flex items-center justify-between gap-2">
                                    <span className="font-bold text-slate-800">{item.title}</span>
                                    <span className="font-mono text-[11px] font-semibold text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200 shrink-0">
                                      {item.displayValue}
                                    </span>
                                  </div>
                                  <p className="text-slate-500 text-[11px] mt-1 leading-relaxed">
                                    {item.description}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Audit History Table */}
                {auditHistory.length > 0 && (
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-slate-200">
                      <h3 className="text-sm font-bold text-[#001A4D]">Audit History (Recent Runs)</h3>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 text-slate-600 uppercase font-bold text-[10px] tracking-wider border-b border-slate-200">
                          <tr>
                            <th className="py-3 px-4">Date &amp; Time</th>
                            <th className="py-3 px-4">Page Path</th>
                            <th className="py-3 px-4">Device</th>
                            <th className="py-3 px-4">Performance</th>
                            <th className="py-3 px-4">Accessibility</th>
                            <th className="py-3 px-4">Best Practices</th>
                            <th className="py-3 px-4">SEO</th>
                            <th className="py-3 px-4 text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {auditHistory.map((h, i) => (
                            <tr key={i} className="hover:bg-slate-50/70 transition-colors">
                              <td className="py-3 px-4 font-mono text-[11px] text-slate-600">
                                {new Date(h.timestamp).toLocaleTimeString()} &bull; {new Date(h.timestamp).toLocaleDateString()}
                              </td>
                              <td className="py-3 px-4 font-bold text-[#001A4D] font-mono">{h.path}</td>
                              <td className="py-3 px-4 uppercase text-[10px] font-bold text-slate-500">{h.device}</td>
                              <td className="py-3 px-4 font-bold text-emerald-600">{h.scores?.performance}</td>
                              <td className="py-3 px-4 font-bold text-emerald-600">{h.scores?.accessibility}</td>
                              <td className="py-3 px-4 font-bold text-emerald-600">{h.scores?.bestPractices}</td>
                              <td className="py-3 px-4 font-bold text-emerald-600">{h.scores?.seo}</td>
                              <td className="py-3 px-4 text-right">
                                <button
                                  type="button"
                                  onClick={() => setCurrentAudit(h)}
                                  className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-[#001A4D] font-bold text-[11px] cursor-pointer"
                                >
                                  View
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </main>

      {/* =====================================================================
          MODAL 1: INQUIRY DETAILS MODAL
          ===================================================================== */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setSelectedInquiry(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X size={18} />
            </button>

            {/* Modal Title */}
            <div className="flex items-center gap-3 mb-5 border-b pb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0061FF] flex items-center justify-center font-bold">
                <FileText size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#001A4D]">
                  {selectedInquiry.fullName || `${selectedInquiry.firstName || ""} ${selectedInquiry.lastName || ""}`.trim()}
                </h3>
                <p className="text-xs text-[#64748B]">
                  ID: <code className="text-[#0061FF]">{selectedInquiry.id}</code> &bull; Submitted: {new Date(selectedInquiry.submittedAt).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Details Grid */}
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <div>
                  <span className="text-[11px] font-bold text-slate-500 uppercase block">Phone Number</span>
                  <a href={`tel:${selectedInquiry.phone}`} className="text-sm font-bold text-[#0061FF] hover:underline flex items-center gap-1 mt-0.5">
                    <Phone size={13} /> {selectedInquiry.phone || "Not provided"}
                  </a>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-500 uppercase block">Email Address</span>
                  <a href={`mailto:${selectedInquiry.email}`} className="text-sm font-bold text-[#0061FF] hover:underline flex items-center gap-1 mt-0.5">
                    <Mail size={13} /> {selectedInquiry.email || "Not provided"}
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[11px] font-bold text-slate-500 uppercase block">Location</span>
                  <p className="text-xs font-semibold text-[#001A4D] mt-0.5">
                    {selectedInquiry.city || selectedInquiry.location || selectedInquiry.county || "PA"} {selectedInquiry.zip ? `(ZIP: ${selectedInquiry.zip})` : ""}
                  </p>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-500 uppercase block">Care Recipient</span>
                  <p className="text-xs font-semibold text-[#001A4D] mt-0.5">
                    {selectedInquiry.recipientLabel || selectedInquiry.recipient || "Loved One"}
                  </p>
                </div>
              </div>

              {selectedInquiry.services && (
                <div>
                  <span className="text-[11px] font-bold text-slate-500 uppercase block mb-1">Services Requested</span>
                  <div className="flex flex-wrap gap-1.5">
                    {(selectedInquiry.servicesLabels || selectedInquiry.services).map((svc, sIdx) => (
                      <span key={sIdx} className="px-2.5 py-1 rounded-md bg-blue-50 text-[#0061FF] font-semibold text-[11px] border border-blue-200">
                        {svc}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {(selectedInquiry.preferredContact || selectedInquiry.preferredTime) && (
                <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-lg text-[11.5px]">
                  <div>
                    <span className="text-slate-500 block font-semibold">Preferred Contact</span>
                    <span className="font-bold text-[#001A4D]">{selectedInquiry.preferredContact || "Phone"}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block font-semibold">Best Time</span>
                    <span className="font-bold text-[#001A4D]">{selectedInquiry.preferredTime || "Morning"}</span>
                  </div>
                </div>
              )}

              {(selectedInquiry.message || selectedInquiry.careDetails || selectedInquiry.help) && (
                <div>
                  <span className="text-[11px] font-bold text-slate-500 uppercase block mb-1">Care Notes &amp; Message</span>
                  <div className="p-3 bg-amber-50/60 border border-amber-200 rounded-xl text-slate-800 leading-relaxed text-xs">
                    {selectedInquiry.message || selectedInquiry.careDetails || selectedInquiry.help}
                  </div>
                </div>
              )}

              <div className="pt-2 border-t text-[11px] text-slate-500 flex justify-between">
                <span>Form: {selectedInquiry.formName || "Web Form"}</span>
                <span>Page: {selectedInquiry.sourcePage || "/"}</span>
              </div>
            </div>

            {/* Quick action buttons */}
            <div className="mt-6 pt-4 border-t flex items-center justify-end gap-2">
              <a
                href={`tel:${selectedInquiry.phone}`}
                className="px-4 py-2 bg-[#FF7A59] hover:bg-[#E86746] text-white font-bold text-xs rounded-xl shadow-sm inline-flex items-center gap-1.5"
              >
                <Phone size={14} /> Call Client
              </a>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 2: CREDENTIALS SETTINGS MODAL
          ===================================================================== */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative">
            <button
              onClick={() => setShowSettingsModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0061FF] flex items-center justify-center font-bold">
                <Key size={20} />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#001A4D]">Admin Credentials</h3>
                <p className="text-xs text-slate-500">Secure Administrative Authentication</p>
              </div>
            </div>

            {settingsSuccess && (
              <div className="p-3 mb-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
                ✓ {settingsSuccess}
              </div>
            )}

            {settingsError && (
              <div className="p-3 mb-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
                ⚠️ {settingsError}
              </div>
            )}

            <form onSubmit={handleSettingsSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Current Password *</label>
                <input
                  type="password"
                  required
                  placeholder="Enter current password"
                  value={settingsForm.currentPassword}
                  onChange={(e) => setSettingsForm({ ...settingsForm, currentPassword: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-[#0061FF]"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">New Username / Email</label>
                <input
                  type="text"
                  placeholder="admin@pavanhomecare.com"
                  value={settingsForm.newUsername}
                  onChange={(e) => setSettingsForm({ ...settingsForm, newUsername: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-[#0061FF]"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">New Password *</label>
                <input
                  type="password"
                  required
                  placeholder="At least 6 characters"
                  value={settingsForm.newPassword}
                  onChange={(e) => setSettingsForm({ ...settingsForm, newPassword: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-[#0061FF]"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Confirm New Password *</label>
                <input
                  type="password"
                  required
                  placeholder="Re-type new password"
                  value={settingsForm.confirmPassword}
                  onChange={(e) => setSettingsForm({ ...settingsForm, confirmPassword: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-[#0061FF]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowSettingsModal(false)}
                  className="px-3 py-2 rounded-lg bg-slate-100 text-slate-700 font-bold hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdatingSettings}
                  className="px-4 py-2 rounded-lg bg-[#0061FF] text-white font-bold hover:bg-[#004ecc] disabled:opacity-50"
                >
                  {isUpdatingSettings ? "Updating..." : "Update Credentials"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 3: DYNAMIC BLOG ARTICLE EDITOR MODAL
          ===================================================================== */}
      {showBlogEditor && (
        <BlogEditor
          initialBlog={editingBlog}
          onSave={handleBlogSaved}
          onClose={() => {
            setShowBlogEditor(false);
            setEditingBlog(null);
          }}
        />
      )}

      {/* =====================================================================
          MODAL 4: CONSENT & TELEMETRY INSPECTION MODAL
          ===================================================================== */}
      {selectedConsentRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedConsentRecord(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0061FF] flex items-center justify-center">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#001A4D]">Telemetry &amp; Consent Payload</h3>
                <p className="text-xs text-slate-500 font-mono">
                  Collection: PHC-cookie-consent-data &bull; {selectedConsentRecord.consentId || selectedConsentRecord.id}
                </p>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Consent Status</span>
                  <span className="font-bold text-[#001A4D]">{selectedConsentRecord.consentStatus}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Logged Timestamp</span>
                  <span className="font-semibold text-slate-700">{selectedConsentRecord.formattedDate || selectedConsentRecord.submittedAtIso}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Visitor ID</span>
                  <code className="text-[#0061FF] font-mono">{selectedConsentRecord.visitorId}</code>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Session ID</span>
                  <code className="text-purple-600 font-mono">{selectedConsentRecord.sessionId}</code>
                </div>
              </div>

              <div>
                <span className="text-[11px] font-bold text-slate-700 uppercase block mb-1">Pages Visited in Session</span>
                <div className="bg-slate-900 text-slate-100 p-3 rounded-xl font-mono text-[11px] max-h-36 overflow-y-auto space-y-1">
                  {selectedConsentRecord.analytics?.pagesVisited?.map((p, i) => (
                    <div key={i} className="flex justify-between">
                      <span className="text-blue-300">{typeof p === "string" ? p : p.path}</span>
                      <span className="text-slate-400">{typeof p === "object" && p.timestamp ? new Date(p.timestamp).toLocaleTimeString() : ""}</span>
                    </div>
                  )) || <p className="text-slate-400">None</p>}
                </div>
              </div>

              <div>
                <span className="text-[11px] font-bold text-slate-700 uppercase block mb-1">Clicks &amp; Actions Recorded</span>
                <div className="bg-slate-900 text-slate-100 p-3 rounded-xl font-mono text-[11px] max-h-32 overflow-y-auto space-y-1">
                  {selectedConsentRecord.analytics?.clicksRecorded?.map((c, i) => (
                    <div key={i} className="flex justify-between">
                      <span className="text-emerald-400">{c.action}</span>
                      <span className="text-slate-400">{c.path} ({new Date(c.timestamp).toLocaleTimeString()})</span>
                    </div>
                  )) || <p className="text-slate-400">No actions recorded</p>}
                </div>
              </div>

              <div>
                <span className="text-[11px] font-bold text-slate-700 uppercase block mb-1">Complete Raw Document (JSON)</span>
                <pre className="bg-slate-900 text-slate-100 p-3 rounded-xl font-mono text-[10px] max-h-48 overflow-y-auto">
                  {JSON.stringify(selectedConsentRecord, null, 2)}
                </pre>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setSelectedConsentRecord(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
