import { motion, AnimatePresence } from "framer-motion";

// Simple list dropdown (Customers, Integrations, Resources, Company)
export default function SimpleDropdown({ isOpen, links }) {
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
                     rounded-3xl shadow-[0_40px_100px_rgba(0,0,0,0.8)] p-2"
          role="menu"
          onMouseDown={(e) => e.stopPropagation()}
        >
          {links.map((label) => (
            <a
              key={label}
              href="#"
              role="menuitem"
              className="block px-3.5 py-[9px] text-[13px] font-medium text-[#97a3b6]
                         rounded-[10px] whitespace-nowrap transition-all duration-200
                         hover:bg-white/[0.05] hover:text-white"
            >
              {label}
            </a>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
