import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Logo from "./Logo";
import ProductDropdown from "./ProductDropdown";
import SimpleDropdown from "./SimpleDropdown";
import MobileMenu from "./MobileMenu";
import { ArrowIcon } from "./ArrowIcon";
import { simpleMenus } from "../data/navData";

const menuConfig = [
  { id: "product", label: "Product", type: "dropdown" },
  { id: "customers", label: "Customers", type: "simple" },
  { id: "pricing", label: "Pricing", type: "link", href: "#" },
  { id: "integrations", label: "Integrations", type: "simple" },
  { id: "resources", label: "Resources", type: "simple" },
  { id: "company", label: "Company", type: "simple" },
];

function NavButton({ label, onClick, isActive, isLink, href }) {
  const baseStyles =
    "inline-flex items-center gap-[0.375rem] p-[0.625em] rounded-full text-[0.6875rem] font-bold uppercase tracking-[0.05em] transition-all duration-300 whitespace-nowrap relative";
  const activeStyles = isActive
    ? "text-white"
    : "text-[#97a3b6] hover:text-white";
  const Element = isLink ? "a" : "button";
  const behavior = isLink ? { href } : { onClick };

  return (
    <Element
      {...behavior}
      className={`${baseStyles} ${activeStyles}`}
      style={{ fontFamily: "var(--font-heading)" }}
    >
      {label}
    </Element>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef(null);

  const isPill = scrolled || hovered;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onOutsideClick = (e) => {
      if (!e.target.closest("[data-nav-item]")) setOpenMenu(null);
    };
    document.addEventListener("mousedown", onOutsideClick);
    return () => document.removeEventListener("mousedown", onOutsideClick);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const onEsc = (e) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
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

  const shellStyles = {
    maxWidth: isPill ? "80em" : "100em",
    padding: isPill ? "0.5rem 1rem" : "0 1.25rem",
    background: isPill ? "rgba(0,0,0,0.4)" : "transparent",
    backdropFilter: isPill ? "blur(1rem)" : "none",
    WebkitBackdropFilter: isPill ? "blur(1rem)" : "none",
    border: isPill ? "1px solid rgba(255,255,255,0.08)" : "none",
    borderRadius: isPill ? "1.5rem" : "0",
    transition: "all 0.8s cubic-bezier(0.19, 1, 0.22, 1)",
    margin: "0 auto",
  };

  return (
    <>
      <header
        className="fixed left-0 right-0 z-[1000] flex items-center justify-center px-[1.5rem]"
        style={{
          top: isPill ? "0.5rem" : "0",
          height: "4.5rem",
          transition: "top 0.8s cubic-bezier(0.19, 1, 0.22, 1)",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          className="flex items-center justify-between w-full h-[4rem] c-nav-pill shadow-2xl"
          style={shellStyles}
        >
          <Logo isHeaderHovered={hovered} />

          <nav className="hidden md:flex flex-1 justify-center absolute left-1/2 -translate-x-1/2 bg-white/10 px-[0.625em] rounded-full border border-white/10">
            {menuConfig.map((item) => (
              <div
                key={item.id}
                data-nav-item
                className="relative"
                onMouseEnter={
                  item.type !== "link"
                    ? () => handleMenuEnter(item.id)
                    : undefined
                }
                onMouseLeave={
                  item.type !== "link" ? handleMenuLeave : undefined
                }
              >
                <NavButton
                  label={item.label}
                  onClick={() => handleMenuClick(item.id)}
                  isActive={openMenu === item.id}
                  isLink={item.type === "link"}
                  href={item.href}
                />
                {item.type === "dropdown" && (
                  <ProductDropdown isOpen={openMenu === item.id} />
                )}
                {item.type === "simple" && (
                  <SimpleDropdown
                    isOpen={openMenu === item.id}
                    links={
                      simpleMenus.find((m) => m.id === item.id)?.links || []
                    }
                  />
                )}
              </div>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-[1.5rem] ml-auto">
            <a
              href="#"
              className="c-button-premium c-button-premium--compact group"
            >
              <span>Sign In</span>
              <span className="w-[12px] h-[12px] opacity-60 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowIcon />
              </span>
            </a>
            <a
              href="#"
              className="c-button-premium c-button-premium--primary c-button-premium--compact group font-black"
            >
              <span>Sign Up</span>
              <span className="w-[12px] h-[12px] opacity-60 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowIcon />
              </span>
            </a>
          </div>

          <button
            className="md:hidden flex flex-col gap-[5px] p-[10px] items-center justify-center hover:bg-white/10 rounded-full"
            onClick={() => setMobileOpen((o) => !o)}
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={
                  mobileOpen
                    ? i === 1
                      ? { opacity: 0 }
                      : i === 0
                        ? { rotate: 45, y: 7 }
                        : { rotate: -45, y: -7 }
                    : { rotate: 0, y: 0, opacity: 1 }
                }
                className="block w-5 h-[2px] bg-white rounded-full origin-center"
              />
            ))}
          </button>
        </div>
      </header>
      <MobileMenu isOpen={mobileOpen} setOpen={setMobileOpen} />
    </>
  );
}
