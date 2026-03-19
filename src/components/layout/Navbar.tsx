import React, { useEffect, useState } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { toggleCart, selectCartCount } from "../../store/slices/cartSlice";
import { toggleMenu, selectMenuOpen, closeMenu } from "../../store/slices/uiSlice";

const NAV_LINKS = [
  { label: "Home",          href: "#home",    number: "01" },
  { label: "Dirty Sodas",   href: "#sodas",   number: "02" },
  { label: "Exotic Snacks", href: "#snacks",  number: "03" },
  { label: "About Us",      href: "#about",   number: "04" },
  { label: "Contact",       href: "#contact", number: "05" },
];

const Navbar: React.FC = () => {
  const dispatch  = useAppDispatch();
  const cartCount = useAppSelector(selectCartCount);
  const menuOpen  = useAppSelector(selectMenuOpen);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (menuOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.documentElement.style.setProperty("--scrollbar-width", `${scrollbarWidth}px`);
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
      document.documentElement.style.removeProperty("--scrollbar-width");
    }
    return () => {
      document.body.classList.remove("menu-open");
      document.documentElement.style.removeProperty("--scrollbar-width");
    };
  }, [menuOpen]);

  const handleNavClick = (href: string) => {
    dispatch(closeMenu());
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }, 320);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? "bg-white/95 backdrop-blur-sm shadow-md" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <img
              src="/assets/logo.webp"
              alt="Johnny's Dirty Soda & Snacks"
              className="h-14 w-auto object-contain flex-shrink-0"
            />

            {/* Desktop links */}
            <div className="hidden md:flex items-center space-x-8">
              {NAV_LINKS.map(({ label, href }) => (
                <button
                  key={label}
                  onClick={() => handleNavClick(href)}
                  className="font-body font-semibold text-brand-dark hover:text-brand-pink transition-colors text-sm uppercase tracking-wider"
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              {/* Cart */}
              <button
                onClick={() => dispatch(toggleCart())}
                className="relative bg-brand-dark text-white rounded-full p-2.5 hover:bg-brand-pink transition-colors"
                aria-label="Open cart"
              >
                <ShoppingCart size={18} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brand-pink text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                    {cartCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => handleNavClick("#sodas")}
                className="hidden sm:flex bg-brand-dark text-white font-body font-bold px-5 py-2.5 rounded-full text-sm hover:bg-brand-pink transition-colors"
              >
                Order Now
              </button>
              <button
                className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-brand-dark text-white hover:bg-brand-pink transition-colors"
                onClick={() => dispatch(toggleMenu())}
                aria-label="Open menu"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>
      </nav>

  
      <div
        className="fixed inset-0 md:hidden flex flex-col"
        style={{
          backgroundColor: "#2D2D2D",  
          zIndex: 999,
          transform: menuOpen ? "translateY(0)" : "translateY(100%)",
          opacity:   menuOpen ? 1 : 0,
          transition: "transform 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.4s ease",
          pointerEvents: menuOpen ? "auto" : "none",
          width: "100vw",
          height: "100dvh",        
        }}
      >

 
        <div
          className="flex items-center justify-between px-6 flex-shrink-0"
          style={{
            height: "80px",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <img
            src="/assets/logo.webp"
            alt="Johnny's"
            className="h-12 w-auto object-contain"
            style={{ filter: "brightness(2) saturate(0)", opacity: 0.9 }}
          />
          <button
            onClick={() => dispatch(closeMenu())}
            aria-label="Close menu"
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              backgroundColor: "rgba(255,255,255,0.12)",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              transition: "background-color 0.2s ease",
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#E91E8C")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.12)")}
          >
            <X size={22} color="#ffffff" />
          </button>
        </div>

        <nav className="flex-1 flex flex-col justify-center px-6 overflow-hidden">
          {NAV_LINKS.map(({ label, href, number }, i) => (
            <button
              key={label}
              onClick={() => handleNavClick(href)}
              className="group flex items-center gap-4 text-left w-full"
              style={{
                padding: "16px 0",
                borderBottom: i < NAV_LINKS.length - 1 ? "1px solid rgba(255,255,255,0.10)" : "none",
                opacity:    menuOpen ? 1 : 0,
                transform:  menuOpen ? "translateX(0)" : "translateX(-20px)",
                transition: `opacity 0.35s ease ${i * 60 + 150}ms, transform 0.35s ease ${i * 60 + 150}ms`,
                background: "none",
                border: "none",
                cursor: "pointer",
                borderBottomWidth: i < NAV_LINKS.length - 1 ? "1px" : "0",
                borderBottomStyle: "solid",
                borderBottomColor: "rgba(255,255,255,0.10)",
              }}
            >
              {/* Index number */}
              <span
                className="font-body font-bold tracking-widest flex-shrink-0"
                style={{ color: "rgba(255,255,255,0.2)", fontSize: "11px", width: "20px" }}
              >
                {number}
              </span>

              <span
                className="font-display leading-none flex-1 whitespace-nowrap group-hover:text-brand-yellow transition-colors duration-200"
                style={{ color: "#ffffff", fontSize: "clamp(1.8rem, 7vw, 2.5rem)" }}
              >
                {label}
              </span>
              <span
                className="flex-shrink-0 group-hover:text-brand-yellow group-hover:translate-x-1 transition-all duration-200"
                style={{ color: "rgba(255,255,255,0.2)", fontSize: "20px" }}
              >
                →
              </span>
            </button>
          ))}
        </nav>

        <div
          className="flex-shrink-0 px-6"
          style={{
            paddingTop: "20px",
            paddingBottom: "28px",
            borderTop: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p
                className="font-body font-bold uppercase tracking-widest mb-1"
                style={{ color: "rgba(255,255,255,0.35)", fontSize: "10px" }}
              >
                Call us
              </p>
              <a
                href="tel:3127193145"
                className="font-display hover:text-brand-yellow transition-colors whitespace-nowrap"
                style={{ color: "#ffffff", fontSize: "1.4rem" }}
              >
                312-719-3145
              </a>
            </div>
            <button
              onClick={() => handleNavClick("#sodas")}
              className="flex-shrink-0 font-body font-bold rounded-full whitespace-nowrap hover:bg-brand-pink transition-colors duration-200"
              style={{
                backgroundColor: "#F5C518",
                color: "#2D2D2D",
                padding: "12px 22px",
                fontSize: "14px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Order Now →
            </button>
          </div>
        </div>

      </div>
    </>
  );
};

export default Navbar;
