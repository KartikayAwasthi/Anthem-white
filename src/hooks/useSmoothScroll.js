import { useCallback } from 'react';
import { 
  scrollToTop, 
  scrollToElement, 
  scrollToNextSectionEnhanced,
  scrollToPreviousSection,
  smoothScrollConfig 
} from '../utils/smoothScroll';

/**
 * Custom hook for smooth scrolling functionality
 * @param {object} defaultOptions - Default options for all scroll operations
 * @returns {object} - Object containing scroll functions
 */
export const useSmoothScroll = (defaultOptions = {}) => {
  const config = { ...smoothScrollConfig, ...defaultOptions };

  const scrollTop = useCallback((options = {}) => {
    scrollToTop({ ...config, ...options });
  }, [config]);

  const scrollTo = useCallback((target, options = {}) => {
    scrollToElement(target, { ...config, ...options });
  }, [config]);

  const scrollToNext = useCallback((currentSection = null, options = {}) => {
    scrollToNextSectionEnhanced(currentSection, { ...config, ...options });
  }, [config]);

  const scrollToPrev = useCallback((currentSection = null, options = {}) => {
    scrollToPreviousSection(currentSection, { ...config, ...options });
  }, [config]);

  const scrollToSection = useCallback((sectionId, options = {}) => {
    if (sectionId.startsWith('#')) {
      scrollToElement(sectionId, { ...config, ...options });
    } else {
      scrollToElement(`#${sectionId}`, { ...config, ...options });
    }
  }, [config]);

  return {
    scrollTop,
    scrollTo,
    scrollToNext,
    scrollToPrev,
    scrollToSection,
  };
};

export default useSmoothScroll;
