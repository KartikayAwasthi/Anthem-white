import React from 'react';
import { scrollToElement, scrollToTop as smoothScrollToTop } from '../utils/smoothScroll';

const SmoothScrollLink = ({ 
  to, 
  children, 
  offset = -80, // Account for fixed header
  duration = 800, 
  className = '',
  onClick,
  ...props 
}) => {
  const handleClick = (e) => {
    e.preventDefault();
    
    // Call custom onClick if provided
    if (onClick) {
      onClick(e);
    }

    // Handle different scroll targets with enhanced utilities
    if (to === '#top' || to === '#home' || to === '/') {
      smoothScrollToTop({ duration, offset });
    } else if (to.startsWith('#')) {
      scrollToElement(to, { duration, offset });
    } else if (typeof to === 'number') {
      window.scrollTo({ 
        top: to, 
        behavior: 'smooth',
        left: 0
      });
    }
  };

  return (
    <a
      href={to}
      onClick={handleClick}
      className={className}
      {...props}
    >
      {children}
    </a>
  );
};

export default SmoothScrollLink;
