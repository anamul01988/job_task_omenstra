import { Fragment } from "react";
import { motion } from "framer-motion";
import { ArrowIcon } from "./ArrowIcon";

const stats = [
  { num: "$2B+", lbl: "Recovered Revenue" },
  { num: "95%", lbl: "Win Rate" },
  { num: "4×", lbl: "ROI Guarantee" },
];

export default function Hero() {
  return (
    <main
      className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden"
      style={{
        paddingTop: "calc(72px + 60px)",
        paddingBottom: "80px",
        background:
          "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(61,127,255,0.07) 0%, transparent 70%), #000",
      }}
      id="pageHero"
    >
      {/* Glow orbs */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none z-0 opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(61,127,255,0.4), transparent 70%)",
          filter: "blur(100px)",
          left: "-150px",
          top: "20%",
        }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none z-0 opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(57,224,122,0.2), transparent 70%)",
          filter: "blur(100px)",
          right: "-150px",
          top: "30%",
        }}
      />

      {/* Hero content */}
      <div className="relative z-10 text-center max-w-[720px]">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-[rgba(57,224,122,0.2)] bg-[rgba(57,224,122,0.08)] text-[12.5px] font-medium text-[#c3f967] tracking-[0.02em]"
        >
          <span className="w-[7px] h-[7px] rounded-full bg-[#c3f967] flex-shrink-0 animate-pulse-dot" />
          Trusted by 3,000+ merchants worldwide
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
          className="font-bold text-white leading-[1.1] tracking-[-0.04em] mb-6"
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(40px, 7vw, 72px)",
          }}
        >
          Stop chargebacks.
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #3d7fff, #7bb4ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Recover revenue.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
          className="text-[#97a3b6] leading-[1.7] mb-10 mx-auto max-w-[560px]"
          style={{ fontSize: "clamp(16px, 2vw, 19px)" }}
        >
          Omnistra's AI‑powered platform automates chargeback management so you
          can focus on growing your business, not fighting disputes.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
          className="flex items-center justify-center gap-3 flex-wrap mb-14"
        >
          <a
            href="#"
            className="btn-laser relative inline-flex items-center gap-2 px-7 py-3.5 rounded-xl
                       bg-[#3448ff] text-white text-[15px] font-semibold hover:bg-[#2330aa]
                       transition-colors duration-200 overflow-hidden"
          >
            Get Started Free
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/[0.08]
                       text-[#97a3b6] text-[15px] font-semibold hover:bg-white/[0.05] hover:text-white
                       hover:border-white/15 transition-all duration-200"
          >
            Schedule a Demo
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.19, 1, 0.22, 1] }}
          className="flex items-center justify-center gap-8 flex-wrap"
        >
          {stats.map((s, i) => (
            <Fragment key={s.num}>
              {i > 0 && <div className="w-px h-9 bg-white/[0.08]" />}
              <div className="flex flex-col items-center gap-1">
                <span
                  className="text-[28px] font-bold text-white tracking-[-0.03em]"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {s.num}
                </span>
                <span className="text-[12px] text-[#677489] font-medium tracking-[0.04em] uppercase">
                  {s.lbl}
                </span>
              </div>
            </Fragment>
          ))}
        </motion.div>
      </div>
    </main>
  );
}
