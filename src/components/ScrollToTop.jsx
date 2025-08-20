import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { scrollToTop as smoothScrollToTop } from '../utils/smoothScroll';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const handleScrollToTop = () => {
    smoothScrollToTop({ duration: 800, easing: 'easeInOutCubic' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-full flex justify-center mb-10" // sits just above footer
        >
          <motion.button
            onClick={handleScrollToTop}
            whileHover={{ 
              scale: 1.1,
              boxShadow: "0 8px 25px rgba(216, 124, 106, 0.6)" // glow matches gradient
            }}
            whileTap={{ scale: 0.95 }}
            className="group bg-gradient-to-r from-[#e49385] to-[#d87c6a] 
                       text-white p-4 rounded-full shadow-lg hover:shadow-xl 
                       transition-all duration-300 relative overflow-hidden"
            aria-label="Scroll to top"
          >
            {/* Shimmer overlay */}
            <div className="absolute inset-0 bg-white/10 opacity-0 
                            group-hover:opacity-100 transition-opacity 
                            duration-500 rounded-full"></div>

            {/* Icon */}
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
              className="relative z-10"
            >
              <ArrowUp className="w-6 h-6" />
            </motion.div>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
