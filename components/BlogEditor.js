"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  Bold,
  Italic,
  Underline,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Image as ImageIcon,
  Code,
  Eye,
  Edit3,
  X,
  Check,
  Sparkles,
  Calendar,
  Clock,
  User,
  Tag,
  Globe,
  FileText,
  AlertCircle,
  HelpCircle,
  FolderOpen
} from "lucide-react";
import { slugify, calculateReadTime } from "@/lib/blogs";

const PRESET_IMAGES = [
  { label: "Caregiver & Senior", url: "/images/photos/blog-listing-hero.jpg" },
  { label: "Medicaid & Financial", url: "/images/photos/blog-medicaid-waiver.jpg" },
  { label: "Home Safety", url: "/images/photos/blog-safe-home.jpg" },
  { label: "Caregiver Support", url: "/images/photos/blog-caregiver-burnout.jpg" },
  { label: "Senior Health & Signs", url: "/images/photos/blog-signs-need-care.jpg" },
  { label: "Personal Care", url: "/images/photos/service-personal-care.jpg" },
  { label: "Dementia & Memory Care", url: "/images/photos/service-dementia.jpg" },
  { label: "Companion Care", url: "/images/photos/service-companion-care.jpg" },
  { label: "Respite Relief", url: "/images/photos/service-respite.jpg" },
  { label: "24/7 Live-In Support", url: "/images/photos/service-24hour.jpg" },
  { label: "Garden & Outdoor", url: "/images/photos/live-in-care-garden.jpg" },
  { label: "Comfort & Conversation", url: "/images/photos/about-companion-knitting.jpg" }
];

const PRESET_CATEGORIES = [
  "Caregiver Tips",
  "Medicaid Waiver",
  "Senior Wellness",
  "Home Safety",
  "Dementia Care",
  "Family Resources"
];

export default function BlogEditor({ initialBlog, onSave, onClose }) {
  const isEditing = Boolean(initialBlog && initialBlog.id);

  const [title, setTitle] = useState(initialBlog?.title || "");
  const [slug, setSlug] = useState(initialBlog?.slug || "");
  const [autoSlug, setAutoSlug] = useState(!isEditing);
  const [excerpt, setExcerpt] = useState(initialBlog?.excerpt || "");
  const [category, setCategory] = useState(initialBlog?.category || "Caregiver Tips");
  const [customCategory, setCustomCategory] = useState("");
  const [image, setImage] = useState(initialBlog?.image || "/images/photos/blog-listing-hero.jpg");
  const [author, setAuthor] = useState(initialBlog?.author || "Pavan Homecare Clinical Care Team");
  const [status, setStatus] = useState(initialBlog?.status || "published");
  const [featured, setFeatured] = useState(Boolean(initialBlog?.featured));

  // Editor modes: "visual" | "html"
  const [editorMode, setEditorMode] = useState("visual");
  const [htmlContent, setHtmlContent] = useState(initialBlog?.content || "");
  const [activeTab, setActiveTab] = useState("edit"); // "edit" | "preview"

  // Image gallery modal
  const [showImagePicker, setShowImagePicker] = useState(false);

  // Link modal
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");

  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const visualEditorRef = useRef(null);

  // Sync title changes to slug if autoSlug is enabled
  const handleTitleChange = (e) => {
    const val = e.target.value;
    setTitle(val);
    if (autoSlug) {
      setSlug(slugify(val));
    }
  };

  // Sync initial content to visual editor
  useEffect(() => {
    if (visualEditorRef.current && editorMode === "visual") {
      if (visualEditorRef.current.innerHTML !== htmlContent) {
        visualEditorRef.current.innerHTML = htmlContent;
      }
    }
  }, [editorMode]);

  // Update HTML content on visual editor input
  const handleVisualInput = () => {
    if (visualEditorRef.current) {
      setHtmlContent(visualEditorRef.current.innerHTML);
    }
  };

  // Formatting commands for visual editor
  const executeCommand = (command, value = null) => {
    if (editorMode !== "visual") return;
    if (visualEditorRef.current) {
      visualEditorRef.current.focus();
    }
    document.execCommand(command, false, value);
    handleVisualInput();
  };

  // Link insertion
  const handleApplyLink = () => {
    if (!linkUrl) return;
    if (editorMode === "visual") {
      visualEditorRef.current?.focus();
      document.execCommand("createLink", false, linkUrl);
      handleVisualInput();
    } else {
      const linkTag = `<a href="${linkUrl}" target="_blank" rel="noopener noreferrer">${linkText || linkUrl}</a>`;
      setHtmlContent((prev) => prev + linkTag);
    }
    setLinkUrl("");
    setLinkText("");
    setShowLinkModal(false);
  };

  // Switch between Visual & HTML
  const toggleEditorMode = (mode) => {
    if (mode === "html" && editorMode === "visual" && visualEditorRef.current) {
      setHtmlContent(visualEditorRef.current.innerHTML);
    }
    setEditorMode(mode);
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const currentContent = editorMode === "visual" && visualEditorRef.current
      ? visualEditorRef.current.innerHTML
      : htmlContent;

    if (!title.trim()) {
      setErrorMessage("Please enter a blog post title.");
      return;
    }

    if (!currentContent || !currentContent.trim() || currentContent === "<p><br></p>") {
      setErrorMessage("Please write some content for the blog post.");
      return;
    }

    const finalSlug = slugify(slug || title);
    if (!finalSlug) {
      setErrorMessage("Please enter a valid URL slug.");
      return;
    }

    const finalCategory = customCategory.trim() || category;

    setSaving(true);
    try {
      const payload = {
        id: initialBlog?.id || finalSlug,
        slug: finalSlug,
        title: title.trim(),
        excerpt: excerpt.trim() || title.trim(),
        content: currentContent.trim(),
        category: finalCategory,
        image: image.trim() || "/images/photos/blog-listing-hero.jpg",
        author: author.trim() || "Pavan Homecare Clinical Care Team",
        status,
        featured: Boolean(featured)
      };

      let authHeaders = { "Content-Type": "application/json" };
      try {
        const savedAuth = localStorage.getItem("phc_admin_session");
        if (savedAuth) {
          const parsed = JSON.parse(savedAuth);
          if (parsed?.token) {
            authHeaders["Authorization"] = `Bearer ${parsed.token}`;
          }
        }
      } catch (e) {}

      const res = await fetch("/api/admin/blogs", {
        method: isEditing ? "PATCH" : "POST",
        headers: authHeaders,
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to save blog post");
      }

      if (onSave) {
        onSave(data.blog || payload);
      }
    } catch (err) {
      console.error("Save blog error:", err);
      setErrorMessage(err.message || "Failed to save blog post");
    } finally {
      setSaving(false);
    }
  };

  const calculatedRead = calculateReadTime(htmlContent);

  return (
    <div className="fixed inset-0 z-50 bg-[#001A4D]/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[95vh] my-auto">
        
        {/* Top Header */}
        <div className="bg-gradient-to-r from-[#001A4D] via-[#0B2A6B] to-[#001A4D] text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#60EFFF]">
              <Edit3 size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold">
                {isEditing ? "Edit Blog Article" : "Create New Blog Article"}
              </h2>
              <p className="text-xs text-blue-200">
                {isEditing
                  ? `Updating: ${initialBlog.slug}`
                  : "Write and publish engaging care content for families & caregivers"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View Tabs */}
            <div className="flex bg-white/10 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setActiveTab("edit")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  activeTab === "edit"
                    ? "bg-white text-[#001A4D] shadow-sm"
                    : "text-white/80 hover:text-white"
                }`}
              >
                <Edit3 size={13} />
                Editor
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("preview")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  activeTab === "preview"
                    ? "bg-white text-[#001A4D] shadow-sm"
                    : "text-white/80 hover:text-white"
                }`}
              >
                <Eye size={13} />
                Live Preview
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-colors ml-2"
              title="Close Editor"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="bg-red-50 border-b border-red-200 px-6 py-3 text-red-700 text-xs font-semibold flex items-center gap-2">
            <AlertCircle size={16} className="shrink-0 text-red-500" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === "preview" ? (
            /* ================= LIVE PREVIEW ================= */
            <div className="space-y-6 max-w-3xl mx-auto py-4">
              <div className="inline-flex items-center gap-2 bg-[#E8F2FF] text-[#0061FF] font-bold text-[12px] uppercase px-3.5 py-1 rounded-full">
                <Tag size={12} />
                {customCategory || category}
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#001A4D] tracking-tight leading-tight">
                {title || "Untitled Blog Post"}
              </h1>

              {excerpt && (
                <p className="text-lg text-slate-600 font-medium leading-relaxed italic">
                  {excerpt}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pb-4 border-b border-slate-200">
                <span className="flex items-center gap-1.5">
                  <User size={13} className="text-[#0061FF]" />
                  {author}
                </span>
                <span>&bull;</span>
                <span className="flex items-center gap-1.5">
                  <Calendar size={13} className="text-[#0061FF]" />
                  {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                </span>
                <span>&bull;</span>
                <span className="flex items-center gap-1.5">
                  <Clock size={13} className="text-[#FF7A59]" />
                  {calculatedRead}
                </span>
              </div>

              {image && (
                <div className="relative w-full h-[320px] rounded-2xl overflow-hidden shadow-md">
                  <Image
                    src={image}
                    alt={title || "Blog cover"}
                    fill
                    className="object-cover"
                    unoptimized={image.startsWith("http")}
                  />
                </div>
              )}

              {/* Rendered HTML Body */}
              <div
                className="prose prose-slate max-w-none text-slate-800 leading-relaxed text-base space-y-4 font-normal"
                dangerouslySetInnerHTML={{
                  __html: htmlContent || "<p className='text-slate-400 italic'>No content written yet...</p>"
                }}
              />
            </div>
          ) : (
            /* ================= EDIT MODE ================= */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Row 1: Title & Slug */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-[#001A4D] uppercase tracking-wider mb-1.5">
                    Article Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. How to Choose the Best Home Care Provider in PA (2026)"
                    value={title}
                    onChange={handleTitleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-semibold text-[#001A4D] focus:outline-none focus:ring-2 focus:ring-[#0061FF]/30 focus:border-[#0061FF] transition-all bg-white"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-[#001A4D] uppercase tracking-wider">
                      URL Slug *
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setAutoSlug(true);
                        setSlug(slugify(title));
                      }}
                      className="text-[11px] font-semibold text-[#0061FF] hover:underline"
                    >
                      Reset from Title
                    </button>
                  </div>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-xs text-slate-400">
                      /blog/
                    </span>
                    <input
                      type="text"
                      required
                      placeholder="how-to-choose-home-care"
                      value={slug}
                      onChange={(e) => {
                        setAutoSlug(false);
                        setSlug(slugify(e.target.value));
                      }}
                      className="w-full pl-14 pr-3 py-3 rounded-xl border border-slate-300 text-xs font-mono text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0061FF]/30 focus:border-[#0061FF] transition-all bg-slate-50"
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Category, Status, Featured, Author */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                {/* Category */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Category</label>
                  <select
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value);
                      if (e.target.value !== "custom") setCustomCategory("");
                    }}
                    className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-xs bg-white focus:outline-none focus:border-[#0061FF]"
                  >
                    {PRESET_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                    <option value="custom">+ Custom Category</option>
                  </select>
                  {category === "custom" && (
                    <input
                      type="text"
                      placeholder="Enter custom category"
                      value={customCategory}
                      onChange={(e) => setCustomCategory(e.target.value)}
                      className="w-full mt-2 px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white"
                    />
                  )}
                </div>

                {/* Status */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-xs bg-white focus:outline-none focus:border-[#0061FF] font-semibold"
                  >
                    <option value="published">🟢 Published (Live on Site)</option>
                    <option value="draft">🟡 Draft (Hidden)</option>
                  </select>
                </div>

                {/* Author */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Author</label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-xs bg-white focus:outline-none focus:border-[#0061FF]"
                  />
                </div>

                {/* Featured Checkbox */}
                <div className="flex flex-col justify-center">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Homepage Feature</label>
                  <label className="inline-flex items-center gap-2 cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      checked={featured}
                      onChange={(e) => setFeatured(e.target.checked)}
                      className="w-4 h-4 text-[#0061FF] rounded focus:ring-blue-500 cursor-pointer"
                    />
                    <span className="text-xs font-semibold text-slate-700">
                      Feature on Home Hub
                    </span>
                  </label>
                </div>
              </div>

              {/* Row 3: Cover Image Selector */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-[#001A4D] uppercase tracking-wider flex items-center gap-1.5">
                    <ImageIcon size={14} className="text-[#0061FF]" />
                    Featured Cover Image
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowImagePicker(!showImagePicker)}
                    className="text-xs font-bold text-[#0061FF] hover:text-[#004ecc] flex items-center gap-1"
                  >
                    <FolderOpen size={13} />
                    {showImagePicker ? "Hide Presets" : "Choose from Library"}
                  </button>
                </div>

                <div className="flex gap-3 items-center">
                  <input
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="Enter image URL or select from library"
                    className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-700 bg-white focus:outline-none focus:border-[#0061FF]"
                  />
                  {image && (
                    <div className="relative w-16 h-10 rounded-lg overflow-hidden border border-slate-200 shrink-0 bg-slate-100">
                      <Image
                        src={image}
                        alt="Preview"
                        fill
                        className="object-cover"
                        unoptimized={image.startsWith("http")}
                      />
                    </div>
                  )}
                </div>

                {/* Preset image picker grid */}
                {showImagePicker && (
                  <div className="mt-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <p className="text-xs font-bold text-slate-700 mb-2">Select a photo from Pavan Homecare library:</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                      {PRESET_IMAGES.map((preset, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setImage(preset.url);
                            setShowImagePicker(false);
                          }}
                          className={`group relative rounded-xl overflow-hidden border-2 text-left transition-all ${
                            image === preset.url
                              ? "border-[#0061FF] ring-2 ring-[#0061FF]/30 shadow-md"
                              : "border-slate-200 hover:border-slate-400"
                          }`}
                        >
                          <div className="relative w-full h-16 bg-slate-100">
                            <Image
                              src={preset.url}
                              alt={preset.label}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform"
                            />
                            {image === preset.url && (
                              <div className="absolute inset-0 bg-[#0061FF]/40 flex items-center justify-center text-white">
                                <Check size={16} className="font-extrabold" />
                              </div>
                            )}
                          </div>
                          <span className="block text-[10px] font-semibold text-slate-700 p-1.5 truncate">
                            {preset.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Row 4: Short Excerpt */}
              <div>
                <label className="block text-xs font-bold text-[#001A4D] uppercase tracking-wider mb-1.5">
                  Short Excerpt / SEO Meta Summary (1-2 sentences)
                </label>
                <textarea
                  rows={2}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="A concise summary of the article displayed on card listings and Google search results..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0061FF]/30 focus:border-[#0061FF] transition-all bg-white"
                />
              </div>

              {/* Row 5: Rich WYSIWYG Content Editor */}
              <div className="rounded-2xl border border-slate-300 overflow-hidden shadow-sm">
                {/* Editor Toolbar */}
                <div className="bg-slate-100 border-b border-slate-200 px-3 py-2 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-1">
                    {/* Visual Formatting Buttons */}
                    <button
                      type="button"
                      onClick={() => executeCommand("bold")}
                      className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-700 transition-colors"
                      title="Bold (Ctrl+B)"
                    >
                      <Bold size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => executeCommand("italic")}
                      className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-700 transition-colors"
                      title="Italic (Ctrl+I)"
                    >
                      <Italic size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => executeCommand("underline")}
                      className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-700 transition-colors"
                      title="Underline (Ctrl+U)"
                    >
                      <Underline size={15} />
                    </button>

                    <div className="w-[1px] h-5 bg-slate-300 mx-1" />

                    <button
                      type="button"
                      onClick={() => executeCommand("formatBlock", "h2")}
                      className="px-2 py-1 rounded-lg hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                      title="Heading 2"
                    >
                      H2
                    </button>
                    <button
                      type="button"
                      onClick={() => executeCommand("formatBlock", "h3")}
                      className="px-2 py-1 rounded-lg hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                      title="Heading 3"
                    >
                      H3
                    </button>
                    <button
                      type="button"
                      onClick={() => executeCommand("formatBlock", "p")}
                      className="px-2 py-1 rounded-lg hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                      title="Normal Paragraph"
                    >
                      ¶ Para
                    </button>

                    <div className="w-[1px] h-5 bg-slate-300 mx-1" />

                    <button
                      type="button"
                      onClick={() => executeCommand("insertUnorderedList")}
                      className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-700 transition-colors"
                      title="Bullet List"
                    >
                      <List size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => executeCommand("insertOrderedList")}
                      className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-700 transition-colors"
                      title="Numbered List"
                    >
                      <ListOrdered size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => executeCommand("formatBlock", "blockquote")}
                      className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-700 transition-colors"
                      title="Quote Block"
                    >
                      <Quote size={15} />
                    </button>

                    <div className="w-[1px] h-5 bg-slate-300 mx-1" />

                    <button
                      type="button"
                      onClick={() => setShowLinkModal(true)}
                      className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-700 transition-colors"
                      title="Insert Link"
                    >
                      <LinkIcon size={15} />
                    </button>
                  </div>

                  {/* Mode switcher: Visual / HTML */}
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-500 font-medium">
                      {calculatedRead}
                    </span>
                    <div className="bg-slate-200 p-0.5 rounded-lg flex items-center text-[11px] font-semibold">
                      <button
                        type="button"
                        onClick={() => toggleEditorMode("visual")}
                        className={`px-2.5 py-1 rounded-md transition-all ${
                          editorMode === "visual"
                            ? "bg-white text-[#0061FF] shadow-xs"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        Visual
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleEditorMode("html")}
                        className={`px-2.5 py-1 rounded-md transition-all ${
                          editorMode === "html"
                            ? "bg-white text-[#0061FF] shadow-xs"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        HTML
                      </button>
                    </div>
                  </div>
                </div>

                {/* Editor Area */}
                {editorMode === "visual" ? (
                  <div
                    ref={visualEditorRef}
                    contentEditable
                    onInput={handleVisualInput}
                    className="p-5 min-h-[300px] max-h-[500px] overflow-y-auto focus:outline-none text-slate-800 text-base leading-relaxed bg-white prose prose-slate max-w-none"
                    placeholder="Start typing your blog article here..."
                    style={{ minHeight: "320px" }}
                  />
                ) : (
                  <textarea
                    value={htmlContent}
                    onChange={(e) => setHtmlContent(e.target.value)}
                    className="w-full p-5 min-h-[320px] font-mono text-xs text-slate-800 bg-slate-900 text-slate-100 focus:outline-none resize-y"
                    placeholder="Enter or paste raw HTML code here..."
                  />
                )}
              </div>

              {/* Bottom Actions */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    disabled={saving}
                    onClick={(e) => {
                      setStatus("draft");
                      handleSubmit(e);
                    }}
                    className="px-5 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all shadow-sm disabled:opacity-50"
                  >
                    Save as Draft
                  </button>

                  <button
                    type="button"
                    disabled={saving}
                    onClick={(e) => {
                      setStatus("published");
                      handleSubmit(e);
                    }}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#0061FF] to-[#004ecc] hover:from-[#0052db] hover:to-[#003ea8] text-white text-xs font-bold transition-all shadow-md shadow-[#0061FF]/25 disabled:opacity-50 flex items-center gap-2"
                  >
                    {saving ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Check size={14} />
                        <span>Publish Article</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Link Insertion Modal */}
      {showLinkModal && (
        <div className="fixed inset-0 z-60 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-5 w-full max-w-sm shadow-2xl border border-slate-200">
            <h3 className="text-sm font-bold text-[#001A4D] mb-3 flex items-center gap-2">
              <LinkIcon size={15} className="text-[#0061FF]" />
              Insert Hyperlink
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">Link URL *</label>
                <input
                  type="url"
                  placeholder="https://... or /services"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-[#0061FF]"
                />
              </div>
              {editorMode === "html" && (
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Display Text</label>
                  <input
                    type="text"
                    placeholder="Click here"
                    value={linkText}
                    onChange={(e) => setLinkText(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-[#0061FF]"
                  />
                </div>
              )}
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={() => setShowLinkModal(false)}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleApplyLink}
                className="px-4 py-1.5 rounded-lg bg-[#0061FF] text-white text-xs font-bold"
              >
                Apply Link
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
