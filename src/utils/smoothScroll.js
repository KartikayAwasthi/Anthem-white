// Enhanced smooth scrolling utilities for the Anthem app

/**
 * Configuration for smooth scrolling
 */
export const smoothScrollConfig = {
  duration: 800,
  easing: 'easeInOutCubic',
  offset: -80, // Account for fixed header
};

/**
 * Easing functions for smooth animations
 */
const easingFunctions = {
  linear: (t) => t,
  easeInQuad: (t) => t * t,
  easeOutQuad: (t) => t * (2 - t),
  easeInOutQuad: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  easeInCubic: (t) => t * t * t,
  easeOutCubic: (t) => (--t) * t * t + 1,
  easeInOutCubic: (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  easeInOutSine: (t) => -(Math.cos(Math.PI * t) - 1) / 2,
};

/**
 * Enhanced smooth scroll to an element by selector
 * @param {string|Element} selector - CSS selector or element
 * @param {object} options - Scroll options
 */
export const scrollToElement = (selector, options = {}) => {
  const config = { ...smoothScrollConfig, ...options };
  const element = typeof selector === 'string' 
    ? document.querySelector(selector) || document.getElementById(selector.replace('#', ''))
    : selector;

  if (!element) {
    console.warn(`Element not found: ${selector}`);
    return;
  }

  // Use custom animation for better control
  if (config.duration && config.duration > 0) {
    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset + config.offset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;

    if (Math.abs(distance) < 5) return; // Already at target

    const startTime = performance.now();
    const easing = easingFunctions[config.easing] || easingFunctions.easeInOutCubic;

    const animateScroll = (currentTime) => {
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / config.duration, 1);
      const easedProgress = easing(progress);
      
      window.scrollTo(0, startPosition + distance * easedProgress);
      
      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  } else {
    // Fallback to native smooth scroll
    const headerOffset = Math.abs(config.offset);
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
      left: 0
    });
  }
};

/**
 * Enhanced smooth scroll to top of page
 * @param {object} options - Scroll options
 */
export const scrollToTop = (options = {}) => {
  const config = { ...smoothScrollConfig, ...options };
  
  // Use custom animation for better control
  if (config.duration && config.duration > 0 && window.pageYOffset > 0) {
    const startPosition = window.pageYOffset;
    const distance = -startPosition;
    const startTime = performance.now();
    const easing = easingFunctions[config.easing] || easingFunctions.easeInOutCubic;

    const animateScroll = (currentTime) => {
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / config.duration, 1);
      const easedProgress = easing(progress);
      
      window.scrollTo(0, startPosition + distance * easedProgress);
      
      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  } else {
    // Fallback to native smooth scroll
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
      left: 0
    });
  }
};

/**
 * Smooth scroll to a specific position
 * @param {number} position - Y position to scroll to
 * @param {object} options - Scroll options
 */
export const scrollToPosition = (position, options = {}) => {
  const { behavior = 'smooth' } = options;
  
  window.scrollTo({
    top: position,
    behavior,
    left: 0
  });
};

/**
 * Smooth scroll to next section
 * @param {string} currentSelector - CSS selector for current section
 * @param {object} options - Scroll options
 */
export const scrollToNextSection = (currentSelector, options = {}) => {
  const current = document.querySelector(currentSelector);
  if (!current) return;
  
  const nextSection = current.nextElementSibling;
  if (nextSection && nextSection.tagName === 'SECTION') {
    const headerOffset = Math.abs(options.offset || -80);
    const elementPosition = nextSection.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: options.behavior || 'smooth',
      left: 0
    });
  }
};

/**
 * Smooth scroll to previous section
 * @param {string} currentSelector - CSS selector for current section
 * @param {object} options - Scroll options
 */
export const scrollToPreviousSection = (currentSelector, options = {}) => {
  const current = document.querySelector(currentSelector);
  if (!current) return;
  
  const prevSection = current.previousElementSibling;
  if (prevSection && prevSection.tagName === 'SECTION') {
    const headerOffset = Math.abs(options.offset || -80);
    const elementPosition = prevSection.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: options.behavior || 'smooth',
      left: 0
    });
  }
};

/**
 * Check if smooth scrolling is supported
 * @returns {boolean} - Whether smooth scrolling is supported
 */
export const isSmoothScrollSupported = () => {
  return 'scrollBehavior' in document.documentElement.style;
};

/**
 * Polyfill for smooth scrolling in older browsers
 */
export const enableSmoothScrollPolyfill = () => {
  if (!isSmoothScrollSupported()) {
    // For older browsers, we can add a polyfill here
    console.warn('Smooth scrolling not supported in this browser');
  }
};

/**
 * Add smooth scroll class to element
 * @param {string} selector - CSS selector for the element
 */
export const addSmoothScrollClass = (selector) => {
  const element = document.querySelector(selector);
  if (element) {
    element.classList.add('smooth-scroll');
  }
};

/**
 * Initialize smooth scrolling for the entire app
 */
export const initSmoothScrolling = () => {
  // Enable smooth scrolling polyfill if needed
  enableSmoothScrollPolyfill();
  
  // Add smooth scroll class to body and html
  document.body.classList.add('smooth-scroll');
  document.documentElement.style.scrollBehavior = 'smooth';
  document.documentElement.style.scrollPaddingTop = '80px';
  
  // Handle browser back/forward navigation
  window.addEventListener('popstate', () => {
    // Small delay to allow URL to update
    setTimeout(() => {
      const hash = window.location.hash;
      if (hash) {
        scrollToElement(hash, { duration: 600 });
      }
    }, 100);
  });

  // Handle initial page load with hash
  if (window.location.hash) {
    setTimeout(() => {
      scrollToElement(window.location.hash, { duration: 600 });
    }, 500);
  }
};

/**
 * Enhanced smooth scroll to next section with better logic
 * @param {string|Element} currentSection - Current section selector or element
 * @param {object} options - Scroll options
 */
export const scrollToNextSectionEnhanced = (currentSection = null, options = {}) => {
  const config = { ...smoothScrollConfig, ...options };
  const sections = document.querySelectorAll('section');
  
  if (sections.length === 0) return;

  let nextSection = null;
  
  if (currentSection) {
    const current = typeof currentSection === 'string' 
      ? document.querySelector(currentSection)
      : currentSection;
    
    if (current) {
      const currentIndex = Array.from(sections).indexOf(current);
      if (currentIndex >= 0 && currentIndex < sections.length - 1) {
        nextSection = sections[currentIndex + 1];
      }
    }
  } else {
    // Find the next section based on current scroll position
    const currentScrollY = window.pageYOffset + 100; // Add some buffer
    
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;
      
      if (sectionTop > currentScrollY) {
        nextSection = section;
        break;
      }
    }
  }

  if (nextSection) {
    scrollToElement(nextSection, config);
  } else {
    // If no next section, scroll to top
    scrollToTop(config);
  }
};

/**
 * Utility for smooth scrolling with intersection observer for performance
 * @param {Function} callback - Callback function for intersection changes
 * @returns {IntersectionObserver} - The observer instance
 */
export const createSmoothScrollObserver = (callback) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (callback) callback(entry);
      });
    },
    {
      rootMargin: '-20% 0px -80% 0px', // Trigger when element is 20% visible
      threshold: [0, 0.1, 0.5, 1]
    }
  );

  return observer;
};

/**
 * Debounced scroll handler for performance
 * @param {Function} callback - Callback function
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} - Debounced function
 */
export const createScrollHandler = (callback, delay = 16) => {
  let timeoutId;
  let lastCallTime = 0;

  return (...args) => {
    const now = Date.now();
    
    if (now - lastCallTime >= delay) {
      lastCallTime = now;
      callback(...args);
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        lastCallTime = Date.now();
        callback(...args);
      }, delay - (now - lastCallTime));
    }
  };
};

// Default export with all utilities
export default {
  scrollToTop,
  scrollToElement,
  scrollToPosition,
  scrollToNextSection,
  scrollToPreviousSection,
  scrollToNextSectionEnhanced,
  initSmoothScrolling,
  createSmoothScrollObserver,
  createScrollHandler,
  smoothScrollConfig,
  isSmoothScrollSupported,
  enableSmoothScrollPolyfill,
  addSmoothScrollClass,
};
