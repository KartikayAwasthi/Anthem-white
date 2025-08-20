import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingCart, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../contexts/CartContext";
import { scrollToElement, scrollToTop } from "../utils/smoothScroll";
import Cart from "../components/Cart";

// Import assets
const skyroImg = "/fan 3d/Skyro/Black/1.png";
const inaraImg = "/fan 3d/Inaara/purple/1.png";
const evaaraImg = "/fan 3d/Evaara/brown-4/2.png";
const laraImg = "/fan 3d/lara/brown/2.png";
// const pedestalImg = "/pedestal.webp";
const anthemLogo = "/lll.png";

const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [showProductsDropdown, setShowProductsDropdown] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { getCartItemsCount } = useCart();

  // Enhanced smooth scroll functions using utilities
  const handleScrollTo = (target) => {
    if (typeof target === 'string') {
      scrollToElement(target, { 
        offset: -80, 
        duration: 800, 
        easing: 'easeInOutCubic' 
      });
    }
  };

  const handleScrollToTop = () => {
    scrollToTop({ 
      duration: 800, 
      easing: 'easeInOutCubic' 
    });
  };

  const navLinks = [
    { to: "#home", label: "Home", section: "home" },
    { to: "/products", label: "Products" },
    { to: "#about", label: "About Us", section: "about" },
    { to: "#dealer", label: "Dealers", section: "dealer" },
    { to: "/room", label: "Virtual Experience" },
    { to: "/support", label: "Support" },
    { to: "/faq", label: "FAQ" },
    { to: "#contact", label: "Contact", section: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = ["home", "products", "about", "dealer", "contact"];
      let current = "home";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 80 && rect.bottom > 80) {
            current = id;
            break;
          }
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e, to) => {
    if (to === "/" || to === "#home") {
      // For home, always navigate to root and scroll to top
      e.preventDefault();
      if (location.pathname !== "/") {
        // If not on home page, navigate to home first
        window.location.href = "/";
      } else {
        // If already on home page, just scroll to top
        handleScrollToTop();
      }
      setMobileMenuOpen(false);
    } else if (to.startsWith("#")) {
      e.preventDefault();
      
      // Use enhanced scroll function
      handleScrollTo(to);
      // Only handle section scrolling if we're on the home page
      if (location.pathname === "/") {
        const id = to.replace("#", "");
        const el = document.getElementById(id);
        if (el) {
          handleScrollTo(`#${id}`);
        }
      } else {
        // If on a different page, navigate to home with the section
        window.location.href = "/" + to;
      }
      setMobileMenuOpen(false);
    } else if (to === "/support") {
      // Handle support route
      setMobileMenuOpen(false);
    }
  };

  const ceilingFans = [
  { name: "SKYRO", image: skyroImg, id: "skyro" },
  { name: "INARA", image: inaraImg, id: "inara" },
  { name: "eVAARA", image: evaaraImg, id: "evaara" },
  { name: "LARA", image: laraImg, id: "lara" },
  ];
  // const pedestalFans = [{ name: "PEDESTAL PRO", image: pedestalImg, id: "pedestalpro" }];

  useEffect(() => {
    if (!showProductsDropdown) return;
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        // Increase delay to 800ms to make clicking easier
        setTimeout(() => {
          setShowProductsDropdown(false);
        }, 800);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showProductsDropdown]);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/90 backdrop-blur-md shadow-sm">
      <div className="mx-auto max-w-7xl px-4 md:px-10">
        <div className="flex justify-between items-center px-4 py-3 transition-all duration-300">
          {/* Logo */}
          <Link
            to="/"
            onClick={(e) => handleNavClick(e, "/")}
            className="flex items-center gap-3 text-3xl font-extrabold text-white tracking-tight"
          >
            <img
              src={anthemLogo}
              alt="Anthem Logo"
              className="h-12 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-2 relative items-center h-12">
            {navLinks.map((link) =>
              link.label === "Products" ? (
                <div
                  key={link.to}
                  className="relative flex items-center h-full"
                  onMouseEnter={() => setShowProductsDropdown(true)}
                  onMouseLeave={() => {
                    // Increase delay to 800ms before hiding dropdown
                    setTimeout(() => setShowProductsDropdown(false), 800);
                  }}
                  ref={dropdownRef}
                >
                  <a
                    href={link.to}
                    onClick={(e) => handleNavClick(e, link.to)}
                    className={`group flex items-center h-full px-4 py-2 rounded-lg font-semibold text-base transition-all duration-200 ${
                      activeSection === link.section
                        ? "text-white"
                        : "text-gray-200"
                    } hover:text-white hover:bg-gray-800 relative`}
                    style={{ height: "48px" }}
                  >
                    {link.label}
                    <span className="ml-1 text-xs">&#9662;</span>
                    <span
                      className={`absolute left-4 right-4 bottom-1 h-0.5 rounded bg-gradient-to-r from-white to-white transition-all duration-300 ${
                        activeSection === link.section
                          ? "opacity-100 scale-x-100"
                          : "opacity-0 scale-x-0"
                      } group-hover:opacity-100 group-hover:scale-x-100`}
                    />
                  </a>

                  {showProductsDropdown && (
                    <div
                      className="absolute left-0 top-full mt-3 w-[600px] bg-white border border-gray-200 rounded-2xl shadow-2xl p-6 z-50 animate-fade-in"
                      onMouseEnter={() => setShowProductsDropdown(true)}
                      onMouseLeave={() => {
                        // Increase delay to 800ms before hiding dropdown
                        setTimeout(() => setShowProductsDropdown(false), 800);
                      }}
                    >
                      <div>
                        <div className="mb-2 text-lg font-bold text-gray-900">Ceiling Fans</div>
                        <div className="flex gap-4 mb-4">
                          {ceilingFans.map((fan) => (
                            <Link
                              key={fan.name}
                              to={`/fan/${fan.id}`}
                              onClick={() => {
                                // Immediate close on click
                                setShowProductsDropdown(false);
                              }}
                              className="bg-gradient-to-br from-gray-100 to-white border border-gray-200 rounded-xl p-4 text-center w-1/4 shadow hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105 hover:border-white group"
                            >
                              <img src={fan.image} alt={fan.name} className="h-20 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                              <div className="font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">{fan.name}</div>
                              <div className="text-xs text-gray-600 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">View Details →</div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : link.to.startsWith("#") ? (
                <a
                  key={link.to}
                  href={link.to}
                  onClick={(e) => handleNavClick(e, link.to)}
                  className={`group flex items-center h-full px-4 py-2 rounded-lg font-semibold text-base transition-all duration-200 ${
                    activeSection === link.section
                      ? "text-white"
                      : "text-gray-200"
                  } hover:text-white hover:bg-gray-800 relative`}
                  style={{ height: "48px" }}
                >
                  {link.label}
                  <span
                    className={`absolute left-4 right-4 bottom-1 h-0.5 rounded bg-gradient-to-r from-white to-white transition-all duration-300 ${
                      activeSection === link.section
                        ? "opacity-100 scale-x-100"
                        : "opacity-0 scale-x-0"
                    } group-hover:opacity-100 group-hover:scale-x-100`}
                  />
                </a>
              ) : (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`group flex items-center h-full px-4 py-2 rounded-lg font-semibold text-base transition-all duration-200 ${
                    location.pathname === link.to
                      ? "text-white"
                      : "text-gray-200"
                  } hover:text-white hover:bg-gray-800 relative`}
                  style={{ height: "48px" }}
                >
                  {link.label}
                  <span
                    className={`absolute left-4 right-4 bottom-1 h-0.5 rounded bg-gradient-to-r from-white to-white transition-all duration-300 ${
                      location.pathname === link.to
                        ? "opacity-100 scale-x-100"
                        : "opacity-0 scale-x-0"
                    } group-hover:opacity-100 group-hover:scale-x-100`}
                  />
                </Link>
              )
            )}
          </nav>

          {/* Cart and Mobile Menu Section */}
          <div className="flex items-center gap-3">
            {/* Cart Icon */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative text-white bg-gray-800 rounded-full p-2 shadow hover:bg-gray-700 transition-all duration-300 hover:scale-105"
            >
              <ShoppingCart size={24} />
              {getCartItemsCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-black text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold animate-pulse">
                  {getCartItemsCount()}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white bg-gray-800 rounded-full p-2 shadow hover:bg-gray-700 transition"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        className={`md:hidden fixed left-0 right-0 top-[70px] bg-black/95 border-b border-gray-700 shadow-xl rounded-b-2xl px-6 pb-4 pt-2 space-y-4 z-40 transition-all duration-300 ${
          mobileMenuOpen ? "block animate-slide-down" : "hidden"
        }`}
        style={{ backdropFilter: "blur(12px)" }}
      >
        {navLinks.map((link) =>
          link.to.startsWith("#") ? (
            <a
              key={link.to}
              href={link.to}
              onClick={(e) => handleNavClick(e, link.to)}
              className={`block px-3 py-2 rounded-lg font-semibold text-base ${
                activeSection === link.section
                  ? "text-white bg-gray-800"
                  : "text-gray-200"
              } hover:text-white hover:bg-gray-800 transition`}
            >
              {link.label}
            </a>
          ) : (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-lg font-semibold text-base ${
                location.pathname === link.to
                  ? "text-white bg-gray-800"
                  : "text-gray-200"
              } hover:text-white hover:bg-gray-800 transition`}
            >
              {link.label}
            </Link>
          )
        )}
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.25s ease; }

        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-down { animation: slide-down 0.25s ease; }
      `}</style>

      {/* Cart Sidebar */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
};

export default Header;