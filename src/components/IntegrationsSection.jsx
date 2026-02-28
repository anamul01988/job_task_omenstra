import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const INTEGRATIONS = [
  {
    id: 1,
    x: -480,
    y: -280,
    src: "https://framerusercontent.com/images/IE5Tqwv8aWKS7BlCr18LMGXF3Ms.png",
  },
  {
    id: 2,
    x: -380,
    y: -80,
    src: "https://framerusercontent.com/images/qMGqgg7fcxVsSfRvUYFbfZ1fVxE.png",
  },
  {
    id: 3,
    x: -420,
    y: 180,
    src: "https://framerusercontent.com/images/ya1Ki8apcD5chKEopqTgx0v2OU.png",
  },
  {
    id: 4,
    x: -180,
    y: -380,
    src: "https://framerusercontent.com/images/VMEaLbIAn2wqXxQVtJzTsQPomqg.png",
  },
  {
    id: 5,
    x: 180,
    y: -420,
    src: "https://framerusercontent.com/images/mPdjsbMyHYgUqRGovzpmzpE64.png",
  },
  {
    id: 6,
    x: 420,
    y: -250,
    src: "https://framerusercontent.com/images/ImqjsWOEttlFkvAaymtXxTaaDf0.png",
  },
  {
    id: 7,
    x: 480,
    y: 50,
    src: "https://framerusercontent.com/images/w89lnPXzPq5HLEB0pb8G6N0zqVc.png",
  },
  {
    id: 8,
    x: 380,
    y: 320,
    src: "https://framerusercontent.com/images/FvajenQKWnoU1A42FCA09d9I3g.png",
  },
  {
    id: 9,
    x: 0,
    y: 450,
    src: "https://framerusercontent.com/images/AmY95qWYEiJlJGQeMmeBeLZKF4.png",
  },
  {
    id: 10,
    x: -150,
    y: 400,
    src: "https://framerusercontent.com/images/ya1Ki8apcD5chKEopqTgx0v2OU.png",
  },
];

const IntegrationsSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Snappier spring for faster feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 35,
    restDelta: 0.001,
  });

  // 1. Text fades gradually
  const textOpacity = useTransform(smoothProgress, [0, 0.25], [1, 0]);
  const textScale = useTransform(smoothProgress, [0, 0.25], [1, 0.9]);
  const textY = useTransform(smoothProgress, [0, 0.25], [0, -40]);

  // 2. Logos convergence phase (Slow & Deliberate)
  // They start wide and slowly move toward the center button
  const logoX = INTEGRATIONS.map((item) =>
    useTransform(smoothProgress, [0.1, 0.6], [item.x, 0]),
  );
  const logoY = INTEGRATIONS.map((item) =>
    useTransform(smoothProgress, [0.1, 0.6], [item.y, 0]),
  );

  // Logos stay visible until they hit the "suck-in" point at 0.6
  const logoScale = useTransform(smoothProgress, [0, 0.5, 0.7], [1, 0.9, 0]);
  const logoOpacity = useTransform(smoothProgress, [0.55, 0.72], [1, 0]);

  const logoRotate = INTEGRATIONS.map((_, i) =>
    useTransform(smoothProgress, [0.1, 0.7], [0, i % 2 === 0 ? 90 : -90]),
  );

  // 3. Background box shrinks (Very end of the scroll)
  const bgScale = useTransform(smoothProgress, [0.7, 0.95], [1, 0.08]);
  const bgRadius = useTransform(smoothProgress, [0.7, 0.95], [0, 40]);
  const bgShadow = useTransform(
    smoothProgress,
    [0.8, 0.95],
    ["0px 0px 0px rgba(0,0,0,0)", "0px 30px 60px rgba(0,0,0,0.3)"],
  );

  // 4. Final "D" icon appears at the very last moment
  const finalIconOpacity = useTransform(smoothProgress, [0.9, 1], [0, 1]);
  const finalIconScale = useTransform(smoothProgress, [0.9, 1], [0.5, 1]);

  return (
    <div ref={sectionRef} className="relative h-[600px]]">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Main Background Box */}
        <motion.div
          style={{
            scale: bgScale,
            borderRadius: bgRadius,
            boxShadow: bgShadow,
          }}
          className="absolute inset-x-0 inset-y-0 bg-[#eff4ff] z-0 origin-center flex items-center justify-center"
        >
          {/* Central "D" Logo (Final State) */}
          <motion.div
            style={{
              opacity: finalIconOpacity,
              scale: finalIconScale,
            }}
            className="w-[50%] h-[50%] bg-[#0145f2] rounded-3xl flex items-center justify-center shadow-2xl relative"
          >
            <div className="w-full h-full p-4 flex items-center justify-center">
              <svg
                viewBox="0 0 100 100"
                className="w-[85%] h-[85%] text-white fill-current"
              >
                <path d="M25 20 H50 A30 30 0 0 1 50 80 H25 Z" />
                <circle cx="50" cy="50" r="14" className="text-[#0145f2]" />
              </svg>
            </div>

            {/* Pulse effect when fully formed */}
            <motion.div
              style={{
                opacity: useTransform(smoothProgress, [0.75, 0.8], [0, 0.4]),
                scale: useTransform(smoothProgress, [0.75, 0.9], [1, 1.8]),
              }}
              className="absolute inset-0 bg-[#0145f2] rounded-2xl -z-10 blur-xl"
            />
          </motion.div>
        </motion.div>

        {/* Dynamic Content Layer */}
        <div className="relative z-10 w-full max-w-7xl px-6 flex flex-col items-center justify-center text-center">
          {/* Header & CTA */}
          <motion.div
            style={{
              opacity: textOpacity,
              scale: textScale,
              y: textY,
            }}
            className="mb-12 pointer-events-auto"
          >
            <h2 className="text-5xl md:text-[68px] font-bold tracking-tight text-[#08144f] mb-10 leading-[1.05]">
              One platform, <br /> unlimited integrations
            </h2>
            <button className="bg-[#0145f2] hover:bg-[#003bc9] text-white px-8 py-5 rounded-xl font-semibold transition-all flex items-center gap-3 mx-auto group shadow-2xl shadow-blue-500/30">
              View all integrations
              <span className="bg-white/20 p-1 rounded-full transition-all group-hover:bg-white/30 group-hover:scale-110">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </span>
            </button>
          </motion.div>

          {/* Sucking-in Logos Animation */}
          <div className="absolute inset-0 pointer-events-none">
            {INTEGRATIONS.map((item, index) => (
              <motion.div
                key={item.id}
                style={{
                  x: logoX[index],
                  y: logoY[index],
                  scale: logoScale,
                  opacity: logoOpacity,
                  rotate: logoRotate[index],
                  left: "50%",
                  top: "50%",
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2"
              >
                <div className="bg-white p-3 md:p-5 rounded-[24px] shadow-[0_12px_45px_rgba(0,0,0,0.12)] w-20 h-20 md:w-28 md:h-28 flex items-center justify-center border border-white/80 backdrop-blur-md">
                  <img
                    src={item.src}
                    alt={`logo-${index}`}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=Logo&background=0145f2&color=fff`;
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationsSection;
