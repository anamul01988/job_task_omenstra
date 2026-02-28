import { motion, AnimatePresence } from "framer-motion";

// Simple list dropdown (Customers, Integrations, Resources, Company)
export default function SimpleDropdown({ isOpen, links }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: "-0.625rem" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-0.625rem" }}
          transition={{ duration: 0.22, ease: [0.19, 1, 0.22, 1] }}
          className="absolute top-[calc(100%+0.75rem)] left-1/2 -translate-x-1/2 z-50
                     bg-[rgba(10,10,10,0.95)] backdrop-blur-xl border border-white/[0.08]
                     rounded-[1.5rem] shadow-[0_2.5rem_6.25rem_rgba(0,0,0,0.8)] p-[0.5rem]"
          role="menu"
          onMouseDown={(e) => e.stopPropagation()}
        >
          {links.map((label) => (
            <a
              key={label}
              href="#"
              role="menuitem"
              className="block px-[0.875rem] py-[0.5625rem] text-[0.8125rem] font-medium text-[#97a3b6]
                         rounded-[0.625rem] whitespace-nowrap transition-all duration-200
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
