"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  MessageSquare,
  X,
  Send,
  Phone,
  Sparkles,
  User,
  HeartHandshake,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Calendar,
  RotateCcw,
  ArrowRight
} from "lucide-react";
import { site } from "@/lib/site";
import { submitContactInquiry } from "@/lib/firebase";
import { matchChatbotResponse, QUICK_SUGGESTIONS } from "@/lib/chatbotKnowledge";
import styles from "./ChatbotWidget.module.css";

const INITIAL_BOT_MESSAGE = {
  id: "welcome",
  sender: "bot",
  text: "Hello! Welcome to **Pavan Homecare**.\n\nI'm your Virtual Care Advisor. I can answer any questions about our **care services**, the **9 PA counties we serve**, **Medicaid CHC waivers**, or how family members can get **paid as caregivers**.\n\nHow can I help you and your family today?",
  quickLinks: [
    { label: "📞 Call Coordinator: (215) 436-9499", href: site.phoneHref },
    { label: "📋 Free In-Home Assessment", href: "/contact-us" }
  ],
  suggestLeadForm: false
};

export default function ChatbotWidget() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_BOT_MESSAGE]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showInChatForm, setShowInChatForm] = useState(false);

  // In-Chat Lead Form State
  const [leadForm, setLeadForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    countyCity: "",
    serviceNeeded: "Personal Care & Hygiene",
    careDetails: ""
  });
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [leadError, setLeadError] = useState("");

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen, messages, isTyping, showInChatForm]);

  const handleSendMessage = (textToSend) => {
    const query = (textToSend || inputValue).trim();
    if (!query) return;

    const userMsg = {
      id: "u_" + Date.now(),
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    // Natural bot response delay
    setTimeout(() => {
      const response = matchChatbotResponse(query);
      const botMsg = {
        id: "b_" + Date.now(),
        sender: "bot",
        text: response.answer,
        quickLinks: response.quickLinks,
        suggestLeadForm: response.suggestLeadForm,
        followUp: response.followUp,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);

      if (response.suggestLeadForm) {
        setShowInChatForm(true);
      }
    }, 450);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleLeadInputChange = (e) => {
    const { name, value } = e.target;
    setLeadForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    if (!leadForm.fullName.trim() || !leadForm.phone.trim()) {
      setLeadError("Please provide your Name and Phone Number so we can reach you.");
      return;
    }

    setIsSubmittingLead(true);
    setLeadError("");

    try {
      const nameParts = leadForm.fullName.trim().split(" ");
      const firstName = nameParts[0] || leadForm.fullName.trim();
      const lastName = nameParts.slice(1).join(" ") || "";

      const res = await submitContactInquiry({
        firstName,
        lastName,
        fullName: leadForm.fullName.trim(),
        phone: leadForm.phone.trim(),
        email: leadForm.email.trim(),
        city: leadForm.countyCity.trim(),
        services: [leadForm.serviceNeeded],
        message: leadForm.careDetails.trim() || "Requested care information via Chatbot Advisor",
        formName: "Chatbot In-Chat Inquiry Form",
        source: "chatbot",
        sourcePage: typeof window !== "undefined" ? window.location.pathname : "chatbot"
      });

      if (res.success) {
        setLeadSubmitted(true);
        // Add confirmation message to chat
        setMessages((prev) => [
          ...prev,
          {
            id: "confirmed_" + Date.now(),
            sender: "bot",
            text: `✅ **Thank you, ${firstName}!**\n\nYour inquiry has been successfully submitted directly to our Care Coordination team. A local coordinator will call you at **${leadForm.phone}** shortly to discuss your family's needs and build a personalized care plan.\n\nNeed immediate answers? You can also call us 24/7 at **${site.phoneDisplay}**.`,
            quickLinks: [{ label: `Call ${site.phoneDisplay}`, href: site.phoneHref }]
          }
        ]);
      } else {
        setLeadError(res.error || "Unable to send request. Please call us directly at " + site.phoneDisplay);
      }
    } catch (err) {
      console.error("Chatbot lead submission error:", err);
      setLeadError("An error occurred. Please call our office directly at " + site.phoneDisplay);
    } finally {
      setIsSubmittingLead(false);
    }
  };

  const handleResetChat = () => {
    setMessages([INITIAL_BOT_MESSAGE]);
    setShowInChatForm(false);
    setLeadSubmitted(false);
    setLeadError("");
  };

  // Helper to render markdown bold and newlines simply
  const renderFormattedText = (rawText) => {
    if (!rawText) return null;
    const lines = rawText.split("\n");
    return lines.map((line, idx) => {
      // Process bold formatting **text**
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <span key={idx}>
          {parts.map((part, pIdx) => {
            if (part.startsWith("**") && part.endsWith("**")) {
              return <strong key={pIdx}>{part.slice(2, -2)}</strong>;
            }
            return part;
          })}
          {idx < lines.length - 1 && <br />}
        </span>
      );
    });
  };

  if (pathname && pathname.startsWith("/admin")) return null;

  return (
    <div className={styles.chatWrapper}>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className={styles.chatTriggerBtn}
          aria-label="Open Pavan Homecare Virtual Care Advisor"
        >
          <div className={styles.triggerAvatarWrap}>
            <HeartHandshake size={19} className="text-[#60EFFF]" />
            <span className={styles.onlinePulseDot} />
          </div>
          <div className={styles.triggerTextGroup}>
            <span className={styles.triggerTitle}>Chat with Care Advisor</span>
            <span className={styles.triggerSubtitle}>
              <span className="inline-block w-1.5 h-1.5 bg-[#10B981] rounded-full" />
              Online 24/7 &bull; Instant Answers
            </span>
          </div>
        </button>
      )}

      {/* Expanded Chat Modal */}
      {isOpen && (
        <div className={styles.chatModal} role="dialog" aria-modal="true" aria-label="Care Advisor Chat">
          {/* Header */}
          <div className={styles.chatHeader}>
            <div className={styles.headerLeft}>
              <div className={styles.headerAvatar}>
                <HeartHandshake size={22} />
              </div>
              <div className={styles.headerInfo}>
                <h4>Pavan Care Advisor</h4>
                <div className={styles.headerStatus}>
                  <span className={styles.statusDot} />
                  <span>Online &bull; 24/7 Support</span>
                </div>
              </div>
            </div>

            <div className={styles.headerActions}>
              <a
                href={site.phoneHref}
                className={styles.headerIconBtn}
                title={`Call ${site.phoneDisplay}`}
                aria-label={`Call ${site.phoneDisplay}`}
              >
                <Phone size={16} />
              </a>
              <button
                type="button"
                onClick={handleResetChat}
                className={styles.headerIconBtn}
                title="Restart conversation"
                aria-label="Restart conversation"
              >
                <RotateCcw size={15} />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className={styles.headerIconBtn}
                title="Close chat"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Call Banner */}
          <div className={styles.callBanner}>
            <span>Need immediate guidance?</span>
            <a href={site.phoneHref}>
              <Phone size={12} />
              <span>{site.phoneDisplay}</span>
            </a>
          </div>

          {/* Messages Container */}
          <div className={styles.messagesContainer}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`${styles.messageRow} ${
                  msg.sender === "user" ? styles.messageRowUser : styles.messageRowBot
                }`}
              >
                {msg.sender === "bot" && (
                  <div className={styles.botAvatarBubble}>
                    <Sparkles size={14} />
                  </div>
                )}
                <div
                  className={`${styles.bubble} ${
                    msg.sender === "user" ? styles.bubbleUser : styles.bubbleBot
                  }`}
                >
                  <div>{renderFormattedText(msg.text)}</div>

                  {/* Quick Links */}
                  {msg.quickLinks && msg.quickLinks.length > 0 && (
                    <div style={{ marginTop: "0.5rem" }}>
                      {msg.quickLinks.map((link, lIdx) => (
                        <a
                          key={lIdx}
                          href={link.href}
                          className={styles.quickLinkBadge}
                        >
                          <span>{link.label}</span>
                          <ArrowRight size={11} />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className={styles.messageRowBot}>
                <div className={styles.typingIndicator}>
                  <span className={styles.typingDot} />
                  <span className={styles.typingDot} />
                  <span className={styles.typingDot} />
                </div>
              </div>
            )}

            {/* Quick Suggestion Chips (when only 1 or 2 messages) */}
            {messages.length <= 2 && !isTyping && (
              <div className={styles.suggestionChipsWrap}>
                <span className={styles.chipsLabel}>Suggested Questions:</span>
                {QUICK_SUGGESTIONS.map((sug, sIdx) => (
                  <button
                    key={sIdx}
                    type="button"
                    onClick={() => handleSendMessage(sug.query)}
                    className={styles.suggestionChipBtn}
                  >
                    {sug.label}
                  </button>
                ))}
              </div>
            )}

            {/* In-Chat Lead Capture Form */}
            {showInChatForm && !leadSubmitted && (
              <div className={styles.inChatFormCard}>
                <div className={styles.inChatFormHeader}>
                  <Calendar size={18} className="text-[#0061FF]" />
                  <h5>Request Free In-Home Consultation / Callback</h5>
                </div>
                <form onSubmit={handleLeadSubmit}>
                  <div className={styles.inChatFormGroup}>
                    <label>Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="e.g. Mary Smith"
                      value={leadForm.fullName}
                      onChange={handleLeadInputChange}
                      className={styles.inChatInput}
                    />
                  </div>

                  <div className={styles.inChatFormGroup}>
                    <label>Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="e.g. (215) 555-0199"
                      value={leadForm.phone}
                      onChange={handleLeadInputChange}
                      className={styles.inChatInput}
                    />
                  </div>

                  <div className={styles.inChatFormGroup}>
                    <label>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="e.g. name@example.com"
                      value={leadForm.email}
                      onChange={handleLeadInputChange}
                      className={styles.inChatInput}
                    />
                  </div>

                  <div className={styles.inChatFormGroup}>
                    <label>PA County or City *</label>
                    <input
                      type="text"
                      name="countyCity"
                      required
                      placeholder="e.g. Bucks County / Feasterville"
                      value={leadForm.countyCity}
                      onChange={handleLeadInputChange}
                      className={styles.inChatInput}
                    />
                  </div>

                  <div className={styles.inChatFormGroup}>
                    <label>Service Needed</label>
                    <select
                      name="serviceNeeded"
                      value={leadForm.serviceNeeded}
                      onChange={handleLeadInputChange}
                      className={styles.inChatInput}
                    >
                      <option value="Personal Care & Hygiene">Personal Care &amp; Hygiene</option>
                      <option value="Companion & Homemaking">Companion Care &amp; Homemaking</option>
                      <option value="Alzheimer's & Dementia">Alzheimer's &amp; Dementia Memory Care</option>
                      <option value="24-Hour & Live-In Care">24-Hour / Live-In Care</option>
                      <option value="PA Medicaid Waiver (CHC)">PA Medicaid Waiver (CHC)</option>
                      <option value="Paid Family Caregiver Program">Paid Family Caregiver Program</option>
                      <option value="Respite Care">Respite Care</option>
                      <option value="Other Question">Other Care Assistance</option>
                    </select>
                  </div>

                  <div className={styles.inChatFormGroup}>
                    <label>Care Needs / Notes</label>
                    <textarea
                      name="careDetails"
                      rows={2}
                      placeholder="Tell us about daily schedules or health needs..."
                      value={leadForm.careDetails}
                      onChange={handleLeadInputChange}
                      className={styles.inChatTextarea}
                    />
                  </div>

                  {leadError && (
                    <div style={{ color: "#DC2626", fontSize: "11.5px", marginTop: "4px", marginBottom: "4px" }}>
                      ⚠️ {leadError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmittingLead}
                    className={styles.inChatSubmitBtn}
                  >
                    {isSubmittingLead ? (
                      <>
                        <Loader2 size={15} className="animate-spin" />
                        <span>Sending to Coordinator...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Consultation Request</span>
                        <ArrowRight size={14} />
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}

            {leadSubmitted && (
              <div className={styles.inChatSuccessCard}>
                <strong>Consultation Request Received!</strong>
                <p style={{ margin: "4px 0 0 0" }}>
                  A care coordinator has received your details and will call you shortly.
                </p>
              </div>
            )}

            {/* Permanent toggle to open lead form if not yet shown */}
            {!showInChatForm && !leadSubmitted && (
              <button
                type="button"
                onClick={() => setShowInChatForm(true)}
                className={styles.openLeadFormTrigger}
              >
                <Calendar size={14} />
                <span>Request Free Care Consultation / Callback</span>
              </button>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input Bar */}
          <div className={styles.chatFooter}>
            <input
              ref={inputRef}
              type="text"
              placeholder="Ask about services, areas, Medicaid..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className={styles.chatInput}
              aria-label="Type your message"
            />
            <button
              type="button"
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim()}
              className={styles.sendBtn}
              aria-label="Send message"
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
