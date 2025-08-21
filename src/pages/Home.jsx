import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { scrollToNextSectionEnhanced } from "../utils/smoothScroll";
import Testimonial from "./Testimonial";
import SplitText from "../../Reactbits/SplitText/SplitText";

// Images
const skyroImg = "/fan 3d/Skyro/blue/3.webp";
const inaraImg = "/fan 3d/Inaara/white/3.webp";
const evaaraImg = "/fan 3d/Evaara/brown-4/3.webp";
const laraImg = "/fan 3d/lara/brown/2.webp";

// Optimized banner images - using available images and their variations
const bannerImages = [
  "/Banner/1-w.jpg",
  "/Banner/2-w.jpg",
  "/Banner/3-w.jpg",
  "/Banner/1-wn.jpg",
  "/Banner/2-wn.jpg",
  "/Banner/3-wn.jpg"
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  useEffect(() => {
    // Preload all banner images to prevent flickering or black screens
    const preloadImages = async () => {
      const imagePromises = bannerImages.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(src);
          img.onerror = () => reject(`Failed to load image: ${src}`);
          img.src = src;
        });
      });
      
      try {
        await Promise.all(imagePromises);
        console.log('All banner images preloaded successfully');
      } catch (error) {
        console.error('Image preloading error:', error);
      }
    };
    
    preloadImages();
    
    // Create a timer that automatically advances the carousel
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerImages.length) % bannerImages.length);
  };

  const handleTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) nextSlide();
    if (distance < -50) prevSlide();
    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <div className="w-full overflow-x-hidden bg-[#0a0a0a] text-white">
      {/* Banner Carousel and SplitText heading */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          {/* Banner Carousel */}
          <div 
            className="relative w-full h-full" 
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {bannerImages.map((image, index) => (
              <motion.div
                key={index}
                className="absolute inset-0 w-full h-full"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: currentSlide === index ? 1 : 0,
                  scale: currentSlide === index ? 1 : 1.1
                }}
                transition={{ 
                  opacity: { duration: 0.8, ease: "easeInOut" },
                  scale: { duration: 6, ease: "easeInOut" }
                }}
                style={{ zIndex: currentSlide === index ? 1 : 0 }}
              >
                <img 
                  src={image} 
                  alt={`Banner ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : "auto"}
                  decoding={index === 0 ? "sync" : "async"}
                  width="1920"
                  height="1080"
                  onError={(e) => {
                    // If image fails to load, try to use the first banner as fallback
                    console.warn(`Failed to load banner image: ${image}`);
                    e.target.src = bannerImages[0];
                  }}
                />
                <div className="absolute inset-0 bg-black/30"></div>
              </motion.div>
            ))}
            
            {/* Carousel Navigation */}
            <div className="absolute bottom-6 md:bottom-8 left-0 right-0 flex justify-center gap-2 md:gap-3 z-10 px-2">
              {bannerImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 md:h-3 rounded-full transition-all duration-300 ${
                    currentSlide === index 
                      ? "bg-[#e49385] w-6 md:w-10" 
                      : "bg-white/70 hover:bg-white w-2 md:w-3"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            
            {/* Carousel Controls */}
            <button 
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 backdrop-blur-sm z-10 transition-all duration-300"
              aria-label="Previous slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 backdrop-blur-sm z-10 transition-all duration-300"
              aria-label="Next slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
        <div className="relative z-10 text-center w-full px-4 sm:px-6 flex flex-col items-center justify-center h-full">
          <motion.div
            className="relative backdrop-blur-sm bg-black/30 rounded-xl px-4 sm:px-8 py-4 sm:py-6 mb-6 max-w-[95%] sm:max-w-[85%] md:max-w-[70%] mx-auto"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.h1
              className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <span className="text-white whitespace-normal">The </span>
              <span className="text-white whitespace-normal">Future of </span>
              <span className="bg-gradient-to-r from-[#e49385] to-[#d87c6a] bg-clip-text text-transparent drop-shadow-sm whitespace-normal">Comfort</span>
              <span className="text-white whitespace-normal">, Now in </span>
              <span className="bg-gradient-to-r from-[#e49385] to-[#d87c6a] bg-clip-text text-transparent drop-shadow-sm whitespace-normal">Motion</span>
            </motion.h1>
          </motion.div>
          
          {/* Scroll down button */}
          <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <motion.button
              onClick={() => scrollToNextSectionEnhanced()}
              className="flex flex-col items-center gap-2 text-white/70 hover:text-white transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-sm font-medium">Explore Our Collection</span>
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
              >
                <ChevronDown className="w-6 h-6" />
              </motion.div>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Edge-to-Edge Fan Display Section */}
      <section className="w-full">
        <div className="w-full text-center py-20">
          <motion.h2
            className="text-5xl md:text-6xl font-bold mb-6 w-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px" }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-white">Our </span>
            <span className="bg-gradient-to-r from-[#e49385] to-[#d87c6a] bg-clip-text text-transparent">Signature</span> Collection
          </motion.h2>
        </div>

        <div className="flex flex-col w-full">
          {[
            { image: evaaraImg, name: "eVAARA", id: "evaara", desc: "Exceptional value proposition combining modern aesthetics with reliable performance", tagline: "Modern Aesthetics. Exceptional Value.", motorTypes: ["BLDC"] },
            { image: skyroImg, name: "SKYRO", id: "skyro", desc: "Premium BLDC technology delivering whisper-quiet operation with unmatched energy efficiency", tagline: "Silent Revolution. Unmatched Efficiency.", motorTypes: ["BLDC", "Induction"] },
            { image: inaraImg, name: "INARA", id: "inara", desc: "Smart home integration with adaptive LED lighting that responds to your environment", tagline: "Intelligent Comfort. Seamless Living.", motorTypes: ["BLDC", "Induction"] },
            { image: laraImg, name: "LARA", id: "lara", desc: "Timeless elegance meets superior airflow performance for discerning homeowners", tagline: "Elegance Redefined. Performance Perfected.", motorTypes: ["Induction"] }
          ].map((fan, index) => (
            <div key={index} className="w-full overflow-hidden">
              <Link 
                to={`/fan/${fan.id}`} 
                className="group relative block w-full"
              >
                <motion.div
                  className={`flex flex-col md:flex-row w-full ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px" }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  {/* Fan Image (60% width - edge-to-edge) */}
                  <div className="md:w-[60%] w-full h-[500px] md:h-[700px] relative overflow-hidden">
                    <motion.img 
                      src={fan.image} 
                      alt={fan.name} 
                      className="absolute w-full h-full object-contain object-center"
                      initial={{ scale: 0.95, opacity: 0.8 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                      viewport={{ once: true }}
                    />
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.6 }}
                    />
                  </div>

                  {/* Fan Details (40% width - edge-to-edge) with futuristic effects */}
                  <div className="md:w-[40%] w-full flex flex-col justify-center p-8 md:p-12 bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a] relative overflow-hidden">
                    {/* Futuristic grid background */}
                    <motion.div 
                      className="absolute inset-0 opacity-5"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.05 }}
                      transition={{ duration: 1.5 }}
                    >
                      <svg
                        className="w-full h-full"
                        width="100%" 
                        height="100%" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <defs>
                          <pattern 
                            id="grid" 
                            width="40" 
                            height="40" 
                            patternUnits="userSpaceOnUse"
                          >
                            <path 
                              d="M 40 0 L 0 0 0 40" 
                              fill="none" 
                              stroke="currentColor" 
                              strokeWidth="0.5"
                              strokeDasharray="0 1"
                            />
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                      </svg>
                    </motion.div>

                    {/* Floating particles effect */}
                    <motion.div 
                      className="absolute inset-0 overflow-hidden"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1 }}
                    >
                      {[...Array(15)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute rounded-full bg-white/10"
                          style={{
                            width: `${Math.random() * 4 + 1}px`,
                            height: `${Math.random() * 4 + 1}px`,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                          }}
                          animate={{
                            y: [0, (Math.random() - 0.5) * 100],
                            x: [0, (Math.random() - 0.5) * 50],
                            opacity: [0.2, 0.8, 0.2],
                          }}
                          transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "linear",
                            delay: Math.random() * 5,
                          }}
                        />
                      ))}
                    </motion.div>

                    {/* Holographic fan name with 3D effect */}
                    <motion.div 
                      className="relative mb-4 overflow-hidden"
                      initial={{ y: 40, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ 
                        duration: 0.8, 
                        ease: [0.16, 1, 0.3, 1],
                        delay: 0.2
                      }}
                      viewport={{ once: true }}
                    >
                      <motion.h3 
                        className="text-5xl md:text-6xl font-bold tracking-tighter mb-2"
                        style={{
                          textShadow: '0 0 10px rgba(255,255,255,0.3)',
                          perspective: '1000px'
                        }}
                        whileHover={{
                          transform: 'rotateX(5deg) rotateY(5deg)',
                          textShadow: '0 0 20px rgba(255,255,255,0.5)',
                          transition: { duration: 0.3 }
                        }}
                      >
                        <span className="relative inline-block">
                          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-white">
                            {fan.name}
                          </span>
                          {/* Holographic reflection effect */}
                          <motion.span 
                            className="absolute left-0 top-0 w-full h-1/2 bg-gradient-to-b from-white/60 to-transparent opacity-0 mix-blend-overlay"
                            style={{
                              maskImage: 'linear-gradient(to bottom, black, transparent)',
                              transformOrigin: 'top'
                            }}
                            animate={{
                              opacity: [0, 0.5, 0],
                              y: ['-100%', '100%']
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              repeatDelay: 2,
                              ease: "easeInOut"
                            }}
                          />
                        </span>
                      </motion.h3>
                      
                      {/* Subtle underline animation */}
                      <motion.div 
                        className="h-0.5 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                        initial={{ scaleX: 0, opacity: 0 }}
                        whileInView={{ scaleX: 1, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        viewport={{ once: true }}
                      />
                    </motion.div>

                    {/* Motor type badges with holographic effect */}
                    <div className="flex flex-wrap gap-3 mb-6 relative z-10">
                      {fan.motorTypes.map((motorType, idx) => (
                        <motion.div
                          key={idx}
                          className="relative overflow-hidden rounded-full"
                          initial={{ scale: 0.5, opacity: 0 }}
                          whileInView={{ scale: 1, opacity: 1 }}
                          whileHover={{ 
                            scale: 1.05,
                            y: -2,
                            transition: { duration: 0.2 } 
                          }}
                          transition={{ 
                            type: "spring",
                            stiffness: 300,
                            damping: 15,
                            delay: 0.3 + idx * 0.15
                          }}
                          viewport={{ once: true }}
                        >
                          <div className={`absolute inset-0 rounded-full ${
                            motorType === 'BLDC' 
                              ? 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-500/30 to-emerald-800/20' 
                              : 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/30 to-indigo-800/20'
                          } blur-[1px]`} />
                          
                          <div className={`relative z-10 text-sm font-medium px-4 py-1.5 rounded-full backdrop-blur-sm border ${
                            motorType === 'BLDC' 
                              ? 'border-green-700/50 text-green-300 bg-green-900/30' 
                              : 'border-blue-700/50 text-blue-200 bg-blue-900/30'
                          }`}>
                            {motorType} MOTOR
                          </div>
                          
                          <motion.div 
                            className="absolute inset-0 rounded-full pointer-events-none"
                            animate={{
                              boxShadow: motorType === 'BLDC' 
                                ? '0 0 10px 0 rgba(74, 222, 128, 0.5)' 
                                : '0 0 10px 0 rgba(96, 165, 250, 0.5)',
                            }}
                            transition={{
                              repeat: Infinity,
                              repeatType: "mirror",
                              duration: 2,
                              ease: "easeInOut"
                            }}
                          />
                        </motion.div>
                      ))}
                    </div>

                    {/* Tagline with floating text effect */}
                    <motion.div 
                      className="relative mb-6"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      viewport={{ once: true }}
                    >
                      <motion.p 
                        className="text-2xl md:text-3xl font-medium leading-tight"
                        style={{ perspective: '1000px' }}
                      >
                        {fan.tagline.split(' ').map((word, i) => (
                          <motion.span
                            key={i}
                            className="inline-block mr-2"
                            style={{ display: 'inline-block' }}
                            initial={{ 
                              opacity: 0,
                              y: 20,
                              rotateX: 45,
                              textShadow: '0 0 0 rgba(255,255,255,0)'
                            }}
                            whileInView={{ 
                              opacity: 1,
                              y: 0,
                              rotateX: 0,
                              textShadow: '0 0 10px rgba(255,255,255,0.3)'
                            }}
                            whileHover={{
                              y: -3,
                              textShadow: '0 0 15px rgba(255,255,255,0.5)',
                              transition: { duration: 0.2 }
                            }}
                            transition={{
                              duration: 0.5,
                              delay: 0.6 + (i * 0.08),
                              ease: [0.16, 1, 0.3, 1]
                            }}
                            viewport={{ once: true }}
                          >
                            <span className="bg-gradient-to-r from-[#e49385] via-[#f8b4a8] to-[#d87c6a] bg-clip-text text-transparent">
                              {word}
                            </span>
                          </motion.span>
                        ))}
                      </motion.p>
                      
                      {/* Floating dots connector */}
                      <motion.div 
                        className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-[#e49385] to-[#d87c6a] rounded-full"
                        initial={{ scaleX: 0, opacity: 0 }}
                        whileInView={{ scaleX: 1, opacity: 1 }}
                        transition={{ delay: 0.9, duration: 0.6 }}
                        viewport={{ once: true }}
                      >
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute top-1/2 -translate-y-1/2 rounded-full bg-white"
                            style={{
                              width: '4px',
                              height: '4px',
                              left: `${20 + (i * 15)}%`,
                            }}
                            animate={{
                              y: [-2, 2, -2],
                              opacity: [0.7, 1, 0.7]
                            }}
                            transition={{
                              duration: 1.5 + (i * 0.3),
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          />
                        ))}
                      </motion.div>
                    </motion.div>

                    {/* Description with typing effect and digital terminal look */}
                    <motion.div 
                      className="relative mb-8 overflow-hidden"
                      initial={{ height: 0, opacity: 0 }}
                      whileInView={{ height: "auto", opacity: 1 }}
                      transition={{ 
                        duration: 0.6, 
                        delay: 1,
                        ease: [0.16, 1, 0.3, 1]
                      }}
                      viewport={{ once: true }}
                    >
                      <div className="relative pl-6">
                        {/* Terminal-style cursor */}
                        <motion.div
                          className="absolute left-0 top-0 w-1 h-6 bg-green-400 rounded-full"
                          initial={{ opacity: 0 }}
                          animate={{ 
                            opacity: [0, 1, 0],
                            transition: { 
                              repeat: Infinity,
                              duration: 1.5,
                              times: [0, 0.5, 1]
                            }
                          }}
                        />
                        
                        {/* Digital noise overlay */}
                        <motion.div 
                          className="absolute inset-0 pointer-events-none opacity-5"
                          style={{
                            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.2\'/%3E%3C/svg%3E")'
                          }}
                        />
                        
                        <motion.p 
                          className="text-lg text-gray-300 font-mono"
                          initial={{ clipPath: "inset(0 100% 0 0)" }}
                          whileInView={{ clipPath: "inset(0 0% 0 0)" }}
                          transition={{ 
                            duration: 1.5, 
                            delay: 1.2,
                            ease: "circOut"
                          }}
                          viewport={{ once: true }}
                        >
                          <span className="text-green-400/80">$</span> {fan.desc}
                        </motion.p>
                      </div>
                    </motion.div>

                    {/* Cyberpunk-style button with advanced effects */}
                    <motion.div
                      className="relative z-10"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ 
                        delay: 1.5,
                        duration: 0.6,
                        ease: "backOut"
                      }}
                      viewport={{ once: true }}
                    >
                      <motion.button
                        className="group relative flex items-center gap-3 px-8 py-4 rounded-lg overflow-hidden"
                        whileHover={{ 
                          scale: 1.03,
                          transition: { duration: 0.3 }
                        }}
                        whileTap={{ scale: 0.98 }}
                        style={{
                          background: 'linear-gradient(135deg, rgba(186,106,90,0.2) 0%, rgba(228,147,133,0.3) 100%)',
                          boxShadow: '0 4px 15px rgba(186, 106, 90, 0.3)',
                          backdropFilter: 'blur(10px)'
                        }}
                      >
                        {/* Button border animation */}
                        <motion.div 
                          className="absolute inset-0 rounded-lg overflow-hidden pointer-events-none"
                          initial={{ opacity: 0.5 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                        >
                          <motion.div 
                            className="absolute inset-0 border border-transparent"
                            animate={{
                              borderColor: ['rgba(228,147,133,0.3)', 'rgba(228,147,133,0.7)', 'rgba(228,147,133,0.3)'],
                              borderWidth: ['1px', '2px', '1px']
                            }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                          />
                          
                          {/* Corner elements */}
                          {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((corner) => (
                            <motion.div
                              key={corner}
                              className={`absolute w-3 h-3 border-${corner.split('-')[0]} border-${corner.split('-')[1]} border-[#e49385]`}
                              style={{
                                [corner.split('-')[0]]: 0,
                                [corner.split('-')[1]]: 0,
                                opacity: 0.8
                              }}
                              animate={{
                                opacity: [0.5, 1, 0.5],
                                scale: [1, 1.2, 1]
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: Math.random(),
                                ease: "easeInOut"
                              }}
                            />
                          ))}
                        </motion.div>
                        
                        {/* Button content */}
                        <motion.span 
                          className="font-medium relative z-10 text-white/90 group-hover:text-white"
                        >
                          Discover {fan.name}
                        </motion.span>
                        
                        <motion.div
                          className="relative z-10"
                          animate={{ 
                            x: [0, 5, 0],
                            transition: { 
                              repeat: Infinity, 
                              repeatType: "mirror",
                              duration: 1.5,
                              ease: "easeInOut"
                            }
                          }}
                        >
                          <ArrowRight className="w-5 h-5 text-white/80 group-hover:text-white" />
                        </motion.div>
                        
                        {/* Hover effect - expanding circle */}
                        <motion.div 
                          className="absolute inset-0 rounded-lg bg-[#e49385] opacity-0 pointer-events-none"
                          initial={{ scale: 0.5, opacity: 0 }}
                          whileHover={{ 
                            scale: 1,
                            opacity: 0.1,
                            transition: { duration: 0.4 }
                          }}
                        />
                        
                        {/* Scanning line effect */}
                        <motion.div 
                          className="absolute left-0 right-0 h-px bg-white/30"
                          initial={{ y: -10, opacity: 0 }}
                          animate={{ 
                            y: ['-10%', '110%'],
                            opacity: [0, 0.8, 0]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: 0.5,
                            ease: "easeInOut"
                          }}
                        />
                      </motion.button>
                    </motion.div>
                  </div>
                </motion.div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Edge-to-Edge Testimonials */}
      <div className="w-full">
        <Testimonial />
      </div>
    </div>
  );
};

export default Home;