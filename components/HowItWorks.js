"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FileText, PhoneCall, UserCheck, Heart } from "lucide-react";

const STEPS = [
  {
    step: "01",
    icon: FileText,
    title: "Request Care",
    desc: "Fill out our quick form or call us. We listen first — then we plan.",
    color: "#0061FF",
    bg: "#EFF5FF",
  },
  {
    step: "02",
    icon: PhoneCall,
    title: "Free Consultation",
    desc: "A local care coordinator will discuss your needs and build a personalised plan.",
    color: "#0061FF",
    bg: "#EFF5FF",
  },
  {
    step: "03",
    icon: UserCheck,
    title: "Caregiver Match",
    desc: "We hand-select the right caregiver based on your loved one's needs and personality.",
    color: "#0061FF",
    bg: "#EFF5FF",
  },
  {
    step: "04",
    icon: Heart,
    title: "Care Begins",
    desc: "Your care journey starts — consistent, compassionate, and love-driven from day one.",
    color: "#FF7A59",
    bg: "#FFF0EC",
  },
];

export default function HowItWorks() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="hiw-section" aria-labelledby="hiw-heading">
      {/* Background light gradient */}
      <div aria-hidden="true" className="hiw-bg" />

      <div className="hiw-container">

        {/* Header */}
        <div className="hiw-header">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="hiw-eyebrow">
              <span className="hiw-eyebrow__dot" />
              How It Works
            </span>
          </motion.div>
          <motion.h2 id="hiw-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="hiw-h2"
          >
            Simple Steps to{" "}
            <span className="hiw-gradient-word">Better Care</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hiw-sub"
          >
            Getting started is easy. We handle everything — so you can focus on what matters most.
          </motion.p>
        </div>

        {/* Timeline */}
        <div ref={ref} className="hiw-timeline">

          {/* Connecting line (desktop) */}
          <div aria-hidden="true" className="hiw-line">
            <motion.div
              className="hiw-line__fill"
              initial={{ width: "0%" }}
              animate={inView ? { width: "100%" } : { width: "0%" }}
              transition={{ duration: 1.8, ease: "easeOut", delay: 0.4 }}
            />
          </div>

          {/* Steps */}
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.15 }}
                className="hiw-step"
              >
                {/* Large watermark number */}
                <div className="hiw-step__num">{s.step}</div>

                {/* Icon */}
                <div className="hiw-step__icon-wrap" style={{ background: s.bg, border: `1px solid ${s.color}22` }}>
                  <Icon size={24} color={s.color} />
                  <span className="hiw-step__pulse" style={{ borderColor: s.color }} />
                </div>

                <h3 className="hiw-step__title">{s.title}</h3>
                <p className="hiw-step__desc">{s.desc}</p>
              </motion.div>
            );
          })}
        </div>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .hiw-section {
          position: relative;
          width: 100%;
          background: #F5F9FF;
          padding: clamp(4rem,7vw,6rem) 0;
          overflow: hidden;
          border-top: 1px solid #DCE7F7;
          border-bottom: 1px solid #DCE7F7;
        }
        .hiw-bg {
          position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 60% 50% at 50% 100%, rgba(0,97,255,0.05) 0%, transparent 70%),
            radial-gradient(ellipse 40% 30% at 0% 0%, rgba(96,239,255,0.06) 0%, transparent 60%);
        }
        .hiw-container { max-width: 1360px; margin: 0 auto; padding: 0 1.5rem; position: relative; z-index: 10; }

        /* header */
        .hiw-header { text-align: center; max-width: 680px; margin: 0 auto 4rem; }
        .hiw-eyebrow {
          display: inline-flex; align-items: center; gap: 0.5rem;
          background: #FFFFFF; color: #001A4D;
          font-weight: 700; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase;
          padding: 0.4rem 1rem; border-radius: 9999px;
          border: 1px solid rgba(0,97,255,0.15);
          box-shadow: 0 4px 14px rgba(0,97,255,0.07);
          margin-bottom: 1.25rem;
        }
        .hiw-eyebrow__dot { width: 8px; height: 8px; border-radius: 50%; background: #FF7A59; }
        .hiw-h2 {
          font-family: var(--font-heading);
          font-size: clamp(2rem,4vw,3rem);
          font-weight: 800; line-height: 1.1;
          letter-spacing: -0.03em; color: #001A4D; margin: 0 0 1rem;
        }
        .hiw-gradient-word {
          background: linear-gradient(90deg,#0061FF 0%,#60EFFF 100%);
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }
        .hiw-sub {
          font-size: clamp(1rem,1.5vw,1.1rem);
          color: #4A5A73; line-height: 1.7; margin: 0;
        }

        /* timeline */
        .hiw-timeline {
          display: grid;
          grid-template-columns: repeat(1,1fr);
          gap: 1.5rem;
          position: relative;
        }
        @media(min-width:640px)  { .hiw-timeline { grid-template-columns: repeat(2,1fr); } }
        @media(min-width:1024px) { .hiw-timeline { grid-template-columns: repeat(4,1fr); gap: 2rem; } }

        /* connecting line */
        .hiw-line {
          display: none;
          position: absolute; top: 56px; left: 14%; right: 14%;
          height: 2px;
          background: #DCE7F7;
          border-radius: 9999px; overflow: hidden;
        }
        @media(min-width:1024px) { .hiw-line { display: block; } }
        .hiw-line__fill {
          height: 100%;
          background: linear-gradient(90deg,#0061FF 0%,#60EFFF 100%);
          border-radius: inherit;
          box-shadow: 0 0 10px rgba(0,97,255,0.25);
        }

        /* step card */
        .hiw-step {
          display: flex; flex-direction: column; align-items: center;
          text-align: center; position: relative; z-index: 10;
          padding: 2rem 1.5rem;
          background: #FFFFFF;
          border: 1px solid #DCE7F7;
          border-radius: 1.5rem;
          box-shadow: 0 8px 32px rgba(0,26,77,0.06);
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .hiw-step:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 50px rgba(0,97,255,0.12);
          border-color: rgba(0,97,255,0.3);
        }

        .hiw-step__num {
          position: absolute; top: 0.75rem; right: 1rem;
          font-family: var(--font-heading);
          font-size: 3.5rem; font-weight: 800; line-height: 1;
          color: rgba(0,97,255,0.06);
          user-select: none; pointer-events: none;
        }

        .hiw-step__icon-wrap {
          position: relative;
          width: 68px; height: 68px; border-radius: 1.25rem;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 1.25rem;
          transition: transform 0.3s ease;
        }
        .hiw-step:hover .hiw-step__icon-wrap { transform: scale(1.1); }

        .hiw-step__pulse {
          position: absolute; inset: -5px;
          border-radius: 1.5rem;
          border: 2px solid;
          opacity: 0;
          animation: stepPulse 2.5s ease-in-out infinite;
        }
        @keyframes stepPulse {
          0%   { opacity: 0; transform: scale(0.9); }
          50%  { opacity: 0.25; transform: scale(1.05); }
          100% { opacity: 0; transform: scale(1.1); }
        }

        .hiw-step__title {
          font-family: var(--font-heading);
          font-size: 18px; font-weight: 700; color: #001A4D;
          margin: 0 0 0.6rem; line-height: 1.25;
        }
        .hiw-step__desc {
          font-size: 13.5px; color: #4A5A73;
          line-height: 1.6; margin: 0;
        }
      ` }} />
    </section>
  );
}
