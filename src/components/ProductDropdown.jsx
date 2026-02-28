import { motion, AnimatePresence } from "framer-motion";
import { productItems } from "../data/navData";

// Tag badge in product cards
function NavTag({ tag }) {
  if (!tag) return null;
  const base =
    "inline-flex items-center px-2 py-[3px] rounded-full text-[10px] font-bold tracking-[0.05em] uppercase ml-2";
  const styles = {
    white: `${base} bg-white text-black`,
    green: `${base} bg-[#c3f967] text-black`,
    dim: `${base} bg-white/10 text-[#888] border border-white/10`,
  };
  return <span className={styles[tag.style] ?? styles.green}>{tag.label}</span>;
}

// Rich 5-column bento product dropdown
export default function ProductDropdown({ isOpen }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.22, ease: [0.19, 1, 0.22, 1] }}
          className="absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 z-50
                     bg-[rgba(10,10,10,0.95)] backdrop-blur-xl border border-white/[0.08]
                     rounded-3xl shadow-[0_40px_100px_rgba(0,0,0,0.8)] p-3
                     grid grid-cols-5 gap-3 min-w-[900px]"
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
      whileHover={{ y: -8 }}
      transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
      className="relative flex flex-col justify-start items-start min-w-0 h-[480px]
                 pt-10 pb-10 px-8 bg-white/[0.02] border border-white/[0.04] rounded-[20px]
                 overflow-hidden group transition-all duration-500"
      style={{ willChange: "transform" }}
    >
      {/* Text content */}
      <div className="relative z-10 w-full">
        <div
          className="font-bold text-[24px] text-white tracking-[-0.03em] leading-[1.1] mb-2 flex items-center"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {item.title}
          <NavTag tag={item.tag} />
        </div>
        <p className="text-[15px] leading-[1.5] text-[#888] max-w-full">
          {item.desc}
        </p>
      </div>

      {/* Background image */}
      <div
        className={`absolute bottom-0 left-0 w-full h-[280px] bg-cover bg-center bg-no-repeat opacity-50
                    group-hover:opacity-80 group-hover:scale-110 group-hover:-translate-y-2.5
                    transition-all duration-[1200ms] ease-[cubic-bezier(0.19,1,0.22,1)] z-0
                    ${item.imgClass}`}
        style={{
          WebkitMaskImage:
            "radial-gradient(circle at center 80%, black 10%, transparent 80%)",
          maskImage:
            "radial-gradient(circle at center 80%, black 10%, transparent 80%)",
        }}
      />
    </motion.a>
  );
}
