import { motion, AnimatePresence } from "framer-motion";
import { productItems } from "../data/navData";

// Helper for badges in desktop cards
function ProductTag({ tag }) {
  if (!tag) return null;
  const base =
    "inline-flex items-center px-[0.5rem] py-[0.1875rem] rounded-full text-[0.625rem] font-bold tracking-[0.05em] uppercase";
  const styles = {
    white: `${base} bg-white text-black`,
    green: `${base} bg-[#c3f967] text-black`,
    dim: `${base} bg-white/10 text-[#888] border border-white/10`,
  };
  return <span className={styles[tag.style] ?? styles.green}>{tag.label}</span>;
}

// Rich vertical card dropdown for desktop
export default function ProductDropdown({ isOpen }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: "-1rem" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-1rem" }}
          transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
          className="fixed top-[2rem] left-1/2 -translate-x-1/2 z-[1001]
                     bg-[rgba(10,10,10,0.95)] backdrop-blur-xl  shadow-[0_2.5rem_6.25rem_rgba(0,0,0,0.8)] p-[0.75rem]
                     grid grid-cols-5 gap-[0.75rem] w-[80rem] mt-[0.5rem]"
          role="menu"
          onMouseDown={(e) => e.stopPropagation()}
        >
          {productItems.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ProductCard({ item }) {
  return (
    <motion.a
      href="#"
      role="menuitem"
      // whileHover={{ y: "-0.5rem" }}
      transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
      className="relative flex flex-col justify-start items-start min-w-0 h-[19.625em]
                 group transition-all duration-500 overflow-hidden"
      style={{
        willChange: "transform",
        backgroundColor: "#1a1a1a",
        backgroundImage: "linear-gradient(221deg, #161616, #0b0b0b 98%)",
        borderRadius: "0.88em",
        padding: "1.25em",
        border: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      {/* Text content */}
      <div className="relative z-10 w-full">
        <div
          className="font-bold text-[1rem] text-white tracking-[-0.03em] leading-[1.1] mb-[1rem] flex items-center gap-[0.5rem]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {item.title}
          <ProductTag tag={item.tag} />
        </div>
        <p className="text-[0.9375rem] leading-[1.5] text-[#888] max-w-full">
          {item.desc}
        </p>
      </div>

      {/* Background graphic */}
      <img
        src={item.imgUrl}
        alt=""
        className="absolute bottom-[-2.5rem] left-0 w-full h-[18.75rem] object-cover 
                   opacity-60 saturate-0 transition-all duration-[800ms]
                   group-hover:opacity-100 group-hover:saturate-100 group-hover:scale-105 z-0"
        style={{
          WebkitMaskImage:
            "radial-gradient(circle at center 70%, black 10%, transparent 85%)",
          maskImage:
            "radial-gradient(circle at center 70%, black 10%, transparent 85%)",
        }}
      />
    </motion.a>
  );
}
