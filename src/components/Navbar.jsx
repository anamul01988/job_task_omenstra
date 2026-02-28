import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";
import ProductDropdown from "./ProductDropdown";
import SimpleDropdown from "./SimpleDropdown";
import { ArrowIcon } from "./ArrowIcon";
import { productItems, simpleMenus } from "../data/navData";

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
    "inline-flex items-center gap-[0.375rem] p-[0.625em] rounded-full text-[0.6875rem] font-bold uppercase tracking-[0.05em] transition-all duration-300 whitespace-nowrap relative";
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
function MobileSeparator() {
  return (
    <div className="flex items-center w-full px-[1rem] my-[0.5rem] opacity-20">
      <div className="w-[0.375rem] h-[0.375rem] rotate-45 bg-white flex-shrink-0" />
      <div className="flex-1 border-t border-dashed border-white mx-[0.25rem]" />
      <div className="w-[0.375rem] h-[0.375rem] rotate-45 bg-white flex-shrink-0" />
    </div>
  );
}

// ── Mobile accordion section ───────────────────────────────────
function MobileSection({ label, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between px-[1rem] py-[0.75rem] text-[0.875rem] font-bold text-white
                   uppercase tracking-[0.05em] transition-colors duration-200"
      >
        {label}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.22 }}
          className="text-white opacity-40"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path
              d="M2 3.5L5 6.5L8 3.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
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
            <div className="flex flex-col pb-[0.5rem] px-[1rem] gap-1">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Helper component for badges in product cards
function MobileTag({ tag }) {
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

  // Resize effect (Auto-close mobile menu if screen > 768px)
  useEffect(() => {
    const handler = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
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
        className="fixed left-0 right-0 z-[1000] flex items-center justify-center px-[1.5rem] bg-transparent"
        style={{
          top: isPill ? "0.5em" : "0",
          height: "4.5rem",
          transition: "top 0.8s cubic-bezier(0.19,1,0.22,1)",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* ── Navbar inner ── */}
        <div
          className="flex items-center justify-between w-full h-[4rem] mx-auto"
          style={{
            maxWidth: isPill ? "80em" : "100em",
            padding: isPill ? "0.5em 0.625em" : "0 1rem",
            background: isPill ? "rgba(0,0,0,0.4)" : "transparent",
            backdropFilter: isPill ? "blur(0.9375rem)" : "none",
            WebkitBackdropFilter: isPill ? "blur(0.9375rem)" : "none",
            border: isPill ? "0.0625rem solid rgba(255,255,255,0.05)" : "none",
            borderBottom: isPill
              ? "none"
              : "0.0625rem solid rgba(255,255,255,0.05)",
            borderRadius: isPill ? "1em" : "0",
            boxShadow: isPill ? "0 20px 40px rgba(0,0,0,0.3)" : "none",
            width: isPill ? "calc(100% - 2em)" : "100%",
            transition: "all 0.8s cubic-bezier(0.19,1,0.22,1)",
          }}
        >
          {/* Logo */}
          <Logo isHeaderHovered={hovered} />

          {/* ── Desktop nav menu ── */}
          <nav
            className="hidden md:flex flex-1 justify-center pointer-events-auto"
            style={{
              padding: "0",
              background: "rgba(255, 255, 255, 0.1)",
              borderRadius: "6.25em",
              paddingLeft: "0.625em",
              paddingRight: "0.625em",
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
          <div className="hidden md:flex items-center gap-[1.5rem] ml-auto flex-shrink-0">
            <a href="#" className="c-sonar-button group" product-size="small">
              <span>Sign In</span>
              <span className="c-button-arrow transition-transform duration-200">
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
              <span className="c-button-arrow transition-transform duration-200">
                <div className="c-button-embed">
                  <ArrowIcon />
                </div>
              </span>
            </a>
          </div>

          {/* ── Hamburger (mobile) ── */}
          <button
            className="md:hidden flex flex-col gap-[0.3125rem] p-[0.5rem] ml-auto rounded-[0.5rem] hover:bg-white/[0.06] transition-colors"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((o) => !o)}
          >
            <motion.span
              animate={
                mobileOpen
                  ? { rotate: 45, y: "0.4375rem" }
                  : { rotate: 0, y: 0 }
              }
              transition={{ duration: 0.22 }}
              className="block w-5 h-0.5 bg-white rounded-full origin-center"
            />
            <motion.span
              animate={
                mobileOpen
                  ? { opacity: 0, scaleX: 0 }
                  : { opacity: 1, scaleX: 1 }
              }
              transition={{ duration: 0.22 }}
              className="block w-5 h-0.5 bg-white rounded-full"
            />
            <motion.span
              animate={
                mobileOpen
                  ? { rotate: -45, y: "-0.4375rem" }
                  : { rotate: 0, y: 0 }
              }
              transition={{ duration: 0.22 }}
              className="block w-5 h-0.5 bg-white rounded-full origin-center"
            />
          </button>
        </div>
      </header>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-1.25rem" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-1.25rem" }}
            transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
            className="fixed inset-0 z-[2000] overflow-y-auto bg-black"
            style={{
              backdropFilter: "blur(2rem)",
              WebkitBackdropFilter: "blur(2rem)",
            }}
            aria-hidden={!mobileOpen}
          >
            <div className="flex flex-col min-h-screen px-[1.5rem] py-[1.5rem] relative">
              {/* Internal Header for mobile menu */}
              <div className="flex items-center justify-between mb-[2rem]">
                <Logo isHeaderHovered={true} />{" "}
                {/* Pass true to only show the icon */}
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-[2rem] h-[2rem] flex items-center justify-center text-white"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M18 6L6 18M6 6L18 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              {/* Mobile CTAs (Top position as per image) */}
              <div className="flex items-center justify-between gap-[1rem] mb-[1.5rem]">
                <a
                  href="#"
                  className="c-sonar-button flex-1 group"
                  product-size="small"
                  style={{ justifyContent: "center" }}
                >
                  <span>Sign In</span>
                  <span className="c-button-arrow">
                    <div className="c-button-embed">
                      <ArrowIcon />
                    </div>
                  </span>
                </a>
                <a
                  href="#"
                  className="c-sonar-button c-sonar-button-primary flex-1 group"
                  product-size="small"
                  style={{ justifyContent: "center" }}
                >
                  <span>Sign Up</span>
                  <span className="c-button-arrow">
                    <div className="c-button-embed">
                      <ArrowIcon />
                    </div>
                  </span>
                </a>
              </div>

              <MobileSeparator />

              {/* Navigation Links */}
              <div className="flex flex-col">
                <MobileSection label="Product">
                  <div className="c-nav-mobile-drop_inner">
                    {productItems.map((item) => (
                      <a
                        key={item.id}
                        href={`/products/${item.id}`}
                        className="c-nav_menu-link cc-mobile"
                      >
                        <img
                          loading="eager"
                          src={item.imgUrl}
                          alt={item.title}
                          className={`c-nav_menu-link_img cc-mobile cc-${item.id}`}
                        />
                        <div className="c-nav_menu-link_title-wrapper">
                          <div className="c-text-2">{item.title}</div>
                          <MobileTag tag={item.tag} />
                        </div>
                        <div className="c-nav_menu-link_text-wrapper">
                          <div className="c-text-3">{item.desc}</div>
                        </div>
                      </a>
                    ))}
                  </div>
                </MobileSection>
                <MobileSeparator />

                {simpleMenus.map((menu) => (
                  <div key={menu.id}>
                    <MobileSection label={menu.label}>
                      {menu.links.map((l) => (
                        <a
                          key={l}
                          href="#"
                          className="block px-[1rem] py-[0.5rem] text-[0.8125rem] font-medium text-[#97a3b6] uppercase tracking-[0.05em] hover:text-white"
                        >
                          {l}
                        </a>
                      ))}
                    </MobileSection>
                    <MobileSeparator />
                  </div>
                ))}

                <a
                  href="#"
                  className="flex items-center justify-between px-[1rem] py-[0.75rem] text-[0.875rem] font-bold text-white uppercase tracking-[0.05em]"
                >
                  Pricing
                  <span className="text-white opacity-40">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path
                        d="M2 3.5L5 6.5L8 3.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </a>
                <MobileSeparator />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
