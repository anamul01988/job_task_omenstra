import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";
import ProductDropdown from "./ProductDropdown";
import SimpleDropdown from "./SimpleDropdown";
import { ArrowIcon } from "./ArrowIcon";
import { simpleMenus } from "../data/navData";

// ── Shared Menu Configuration ───────────────────────────────
const menuConfig = [
  { id: "product", label: "Product", type: "dropdown" },
  { id: "customers", label: "Customers", type: "simple" },
  { id: "pricing", label: "Pricing", type: "link", href: "#" },
  { id: "integrations", label: "Integrations", type: "simple" },
  { id: "resources", label: "Resources", type: "simple" },
  { id: "company", label: "Company", type: "simple" },
];

// ── Reusable Nav Button ────────────────────────────────────
function NavButton({ label, onClick, isActive, isLink, href }) {
  const baseStyles =
    "inline-flex items-center gap-1.5 p-[0.625em] rounded-full text-[11px] font-bold uppercase tracking-[0.05em] transition-all duration-300 whitespace-nowrap relative";
  const activeStyles = isActive
    ? "text-white"
    : "text-[#97a3b6] hover:text-white";

  const styles = {
    fontFamily: "var(--font-heading)",
    cursor: "pointer",
  };

  if (isLink) {
    return (
      <a href={href} className={`${baseStyles} ${activeStyles}`} style={styles}>
        {label}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${activeStyles}`}
      style={styles}
    >
      {label}
    </button>
  );
}

// ── Chevron arrow for dropdown buttons ────────────────────────
function ChevronIcon({ isOpen }) {
  return (
    <motion.span
      animate={{ rotate: isOpen ? 180 : 0 }}
      transition={{ duration: 0.25 }}
      className="text-[#677489] flex items-center"
    >
      <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
        <path
          d="M1 1L5 5L9 1"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.span>
  );
}

// ── Mobile accordion section ───────────────────────────────────
function MobileSection({ label, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between px-3.5 py-3 text-[14px] font-semibold text-white
                   rounded-xl transition-colors duration-200 hover:bg-white/[0.05]"
      >
        {label}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.22 }}
          className="text-[#677489] text-xs"
        >
          ↓
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.19, 1, 0.22, 1] }}
            className="overflow-hidden"
          >
            <div className="flex flex-col pb-2 px-2">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Main Navbar ────────────────────────────────────────────────
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [openMenu, setOpenMenu] = useState(null); // "product" | menu id | null
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef(null);

  // Floating pill is active when scrolled OR hovered
  const isPill = scrolled || hovered;

  // Scroll effect
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (!e.target.closest("[data-nav-item]")) setOpenMenu(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Escape key
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleMenuEnter = useCallback((id) => {
    clearTimeout(closeTimer.current);
    setOpenMenu(id);
  }, []);

  const handleMenuLeave = useCallback(() => {
    closeTimer.current = setTimeout(() => setOpenMenu(null), 120);
  }, []);

  const handleMenuClick = useCallback((id) => {
    setOpenMenu((prev) => (prev === id ? null : id));
  }, []);

  return (
    <>
      {/* ── Fixed header shell ── */}
      <header
        className="fixed left-0 right-0 z-[1000] flex items-center justify-center px-6 bg-transparent"
        style={{
          top: isPill ? "0.5em" : "0",
          height: "72px",
          transition: "top 0.8s cubic-bezier(0.19,1,0.22,1)",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* ── Navbar inner ── */}
        <div
          className="flex items-center justify-between w-full h-16 mx-auto"
          style={{
            maxWidth: isPill ? "72.75em" : "90em",
            padding: isPill ? "0.5em 0.625em" : "0 20px",
            background: isPill ? "rgba(0,0,0,0.4)" : "transparent",
            backdropFilter: isPill ? "blur(15px)" : "none",
            WebkitBackdropFilter: isPill ? "blur(15px)" : "none",
            border: isPill ? "1px solid rgba(255,255,255,0.05)" : "none",
            borderBottom: isPill ? "none" : "1px solid rgba(255,255,255,0.05)",
            borderRadius: isPill ? "1em" : "0",
            boxShadow: isPill ? "0 20px 40px rgba(0,0,0,0.3)" : "none",
            width: isPill ? "calc(100% - 2em)" : "100%",
            transition: "all 0.8s cubic-bezier(0.19,1,0.22,1)",
          }}
        >
          {/* Logo */}
          <Logo />

          {/* ── Desktop nav menu ── */}
          <nav
            className="hidden lg:flex items-center gap-1.5 backdrop-blur-[15px]"
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              borderRadius: "6.25em",
              paddingLeft: "0.625em",
              paddingRight: "0.625em",
              display: "flex",
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
            aria-label="Main navigation"
          >
            {menuConfig.map((item) => {
              if (item.type === "dropdown") {
                return (
                  <div
                    key={item.id}
                    data-nav-item
                    className="relative"
                    onMouseEnter={() => handleMenuEnter(item.id)}
                    onMouseLeave={handleMenuLeave}
                  >
                    <NavButton
                      label={item.label}
                      onClick={() => handleMenuClick(item.id)}
                      isActive={openMenu === item.id}
                    />
                    <ProductDropdown isOpen={openMenu === item.id} />
                  </div>
                );
              }

              if (item.type === "simple") {
                const menuData = simpleMenus.find((m) => m.id === item.id);
                return (
                  <div
                    key={item.id}
                    data-nav-item
                    className="relative"
                    onMouseEnter={() => handleMenuEnter(item.id)}
                    onMouseLeave={handleMenuLeave}
                  >
                    <NavButton
                      label={item.label}
                      onClick={() => handleMenuClick(item.id)}
                      isActive={openMenu === item.id}
                    />
                    <SimpleDropdown
                      isOpen={openMenu === item.id}
                      links={menuData?.links || []}
                    />
                  </div>
                );
              }

              return (
                <NavButton
                  key={item.id}
                  label={item.label}
                  isLink
                  href={item.href}
                  isActive={false}
                />
              );
            })}
          </nav>

          {/* ── CTA Buttons (desktop) ── */}
          <div className="hidden lg:flex items-center gap-6 ml-auto flex-shrink-0">
            <a href="#" className="c-sonar-button group" product-size="small">
              <span>Sign In</span>
              <span className="c-button-arrow transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <div className="c-button-embed">
                  <ArrowIcon />
                </div>
              </span>
            </a>
            <a
              href="#"
              className="c-sonar-button c-sonar-button-primary group"
              product-size="small"
            >
              <span>Sign Up</span>
              <span className="c-button-arrow transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <div className="c-button-embed">
                  <ArrowIcon />
                </div>
              </span>
            </a>
          </div>

          {/* ── Hamburger (mobile) ── */}
          <button
            className="lg:hidden flex flex-col gap-[5px] p-2 ml-auto rounded-lg hover:bg-white/[0.06] transition-colors"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((o) => !o)}
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.22 }}
              className="block w-5 h-0.5 bg-[#97a3b6] rounded-full origin-center"
            />
            <motion.span
              animate={
                mobileOpen
                  ? { opacity: 0, scaleX: 0 }
                  : { opacity: 1, scaleX: 1 }
              }
              transition={{ duration: 0.22 }}
              className="block w-5 h-0.5 bg-[#97a3b6] rounded-full"
            />
            <motion.span
              animate={
                mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }
              }
              transition={{ duration: 0.22 }}
              className="block w-5 h-0.5 bg-[#97a3b6] rounded-full origin-center"
            />
          </button>
        </div>
      </header>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
            className="fixed left-0 right-0 bottom-0 z-[180] overflow-y-auto lg:hidden"
            style={{
              top: "72px",
              background: "rgba(0,0,0,0.95)",
              backdropFilter: "blur(32px)",
              WebkitBackdropFilter: "blur(32px)",
              borderTop: "1px solid rgba(255,255,255,0.08)",
              WebkitOverflowScrolling: "touch",
            }}
            aria-hidden={!mobileOpen}
          >
            <div className="flex flex-col gap-1 p-4">
              {/* Product */}
              <MobileSection label="Product">
                {["Prevent", "Automation", "Alerts", "Insights", "Connect"].map(
                  (l) => (
                    <a
                      key={l}
                      href="#"
                      className="block px-3.5 py-2.5 text-[14px] font-medium text-[#97a3b6] rounded-xl
                               hover:bg-white/[0.05] hover:text-white transition-all duration-200
                               hover:pl-[18px]"
                    >
                      {l}
                    </a>
                  ),
                )}
              </MobileSection>

              {/* Simple menus */}
              {simpleMenus.map((menu) => (
                <MobileSection key={menu.id} label={menu.label}>
                  {menu.links.map((l) => (
                    <a
                      key={l}
                      href="#"
                      className="block px-3.5 py-2.5 text-[14px] font-medium text-[#97a3b6] rounded-xl
                                 hover:bg-white/[0.05] hover:text-white transition-all duration-200
                                 hover:pl-[18px]"
                    >
                      {l}
                    </a>
                  ))}
                </MobileSection>
              ))}

              {/* Pricing */}
              <a
                href="#"
                className="px-3.5 py-3 text-[14px] font-semibold text-white rounded-xl
                           hover:bg-white/[0.05] transition-colors duration-200"
              >
                Pricing
              </a>

              {/* Mobile CTAs */}
              <div
                className="flex flex-col gap-3 pt-6 pb-6 px-3.5 mt-3"
                style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
              >
                {/* Sign In */}
                <a
                  href="#"
                  className="c-sonar-button group"
                  product-size="small"
                >
                  <span>Sign In</span>
                  <span className="flex items-center transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <ArrowIcon />
                  </span>
                </a>
                {/* Sign Up */}
                <a
                  href="#"
                  className="c-sonar-button c-sonar-button-primary group"
                  product-size="small"
                >
                  <span>Sign Up</span>
                  <span className="flex items-center transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <ArrowIcon />
                  </span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
