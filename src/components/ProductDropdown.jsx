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
          className="fixed top-[5rem] left-1/2 -translate-x-1/2 z-[1001]
                     bg-[rgba(10,10,10,0.95)] backdrop-blur-xl border border-white/[0.08]
                     rounded-[1.5rem] shadow-[0_2.5rem_6.25rem_rgba(0,0,0,0.8)] p-[0.75rem]
                     grid grid-cols-5 gap-[0.75rem] w-[72.75rem]"
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
      whileHover={{ y: "-0.5rem" }}
      transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
      className="relative flex flex-col justify-start items-start min-w-0 h-[30rem]
                 pt-[2.5rem] pb-[2.5rem] px-[2rem] bg-white/[0.02] border border-white/[0.04] rounded-[1.25rem]
                 overflow-hidden group transition-all duration-500"
      style={{ willChange: "transform" }}
    >
      {/* Text content */}
      <div className="relative z-10 w-full">
        <div
          className="font-bold text-[1.5rem] text-white tracking-[-0.03em] leading-[1.1] mb-[0.5rem] flex items-center"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {item.title}
        </div>
        <div className="mb-[1rem]">
          <ProductTag tag={item.tag} />
        </div>
        <p className="text-[0.9375rem] leading-[1.5] text-[#888] max-w-full">
          {item.desc}
        </p>
      </div>

      {/* Background image */}
      <div
        className="absolute bottom-0 left-0 w-full h-[17.5rem] bg-cover bg-center bg-no-repeat opacity-40
                    group-hover:opacity-100 group-hover:scale-110 group-hover:-translate-y-[0.625rem]
                    transition-all duration-[1200ms] ease-[cubic-bezier(0.19,1,0.22,1)] z-0"
        style={{
          backgroundImage: `url(${item.imgUrl})`,
          WebkitMaskImage:
            "radial-gradient(circle at center 80%, black 10%, transparent 85%)",
          maskImage:
            "radial-gradient(circle at center 80%, black 10%, transparent 85%)",
        }}
      />
    </motion.a>
  );
}
