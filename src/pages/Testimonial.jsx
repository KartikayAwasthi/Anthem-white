import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Pause, Star, Quote, User, MapPin } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote: "Inara elevated our interiors beyond imagination. The sleek design and whisper-quiet operation make it perfect for our premium residential projects.",
    name: "Arjun Mehta",
    designation: "Interior Architect",
    location: "Mumbai",
    rating: 5,
    product: "INARA BLDC",
    savings: "₹1,800/year",
    image: "/team1.webp"
  },
  {
    id: 2,
    quote: "My electricity bill dropped by 60% after switching to Lara BLDC. The energy efficiency is remarkable and the smart features are a game-changer.",
    name: "Rajeev Nair",
    designation: "Homeowner",
    location: "Bengaluru",
    rating: 5,
    product: "LARA BLDC",
    savings: "₹2,100/year",
    image: "/team2.png"
  },
  {
    id: 3,
    quote: "As a retailer, Anthem fans have become our premium category bestsellers. Customers love the build quality and the brand trust factor.",
    name: "Suraj Patel",
    designation: "Retail Partner",
    location: "Gujarat",
    rating: 5,
    product: "Complete Range",
    savings: "40% increase in sales",
    image: "/team3.jpg"
  },
  {
    id: 4,
    quote: "The installation team was professional and the after-sales service is exceptional. Three fans running for 2 years without any issues.",
    name: "Priya Sharma",
    designation: "Villa Owner",
    location: "Delhi",
    rating: 5,
    product: "SKYRO BLDC",
    savings: "₹1,650/year",
    image: "/team1.webp"
  },
  {
    id: 5,
    quote: "Bulk order for our hotel project was handled seamlessly. The fans operate silently even at high speeds - perfect for hospitality.",
    name: "Vikram Singh",
    designation: "Hotel Manager",
    location: "Jaipur",
    rating: 5,
    product: "eVAARA Commercial",
    savings: "₹15,000/year",
    image: "/team2.png"
  },
  {
    id: 6,
    quote: "The mobile app integration and remote control features make it so convenient. Modern technology meets traditional reliability.",
    name: "Anjali Gupta",
    designation: "Tech Professional",
    location: "Pune",
    rating: 5,
    product: "INARA Smart",
    savings: "₹1,950/year",
    image: "/team3.jpg"
  }
];

export default function Testimonial() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [direction, setDirection] = useState(1);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlay(!isAutoPlay);
  };

  // Get visible testimonials (3 at a time for carousel)
  const getVisibleTestimonials = () => {
    const visibleCount = 3; // Show 3 testimonials at a time
    const result = [];
    for (let i = 0; i < visibleCount; i++) {
      const index = (currentIndex + i) % testimonials.length;
      result.push({ ...testimonials[index], displayIndex: i });
    }
    return result;
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }
    })
  };

  return (
    <section className="py-20 bg-black snap-start w-full px-4 md:px-12 relative overflow-hidden" id="testimonials">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#ba6a5a] to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-[#e49385] to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-br from-[#ba6a5a]/30 to-[#e49385]/30 rounded-full blur-3xl"></div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#ba6a5a]/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Enhanced Header Section */}
        <div className="text-center mb-16">
          <motion.div
            className="inline-block px-6 py-3 bg-gradient-to-r from-[#ba6a5a]/20 to-[#e49385]/20 border border-[#ba6a5a]/30 rounded-full text-[#ba6a5a] text-sm font-semibold mb-8 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
          >
            ⭐ CUSTOMER TESTIMONIALS
          </motion.div>
          
          <motion.h2
            className="text-5xl md:text-7xl font-bold mb-8 text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            What Our{" "}
            <span className="bg-gradient-to-r from-[#ba6a5a] to-[#e49385] bg-clip-text text-transparent">
              Fans Say
            </span>
          </motion.h2>

          <motion.p 
            className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Discover how Anthem is changing lives, homes, and businesses across India –{" "}
            <span className="text-[#e49385] font-medium">Beyond Just Air</span>
          </motion.p>

          {/* Carousel Controls */}
          <motion.div 
            className="flex items-center justify-center gap-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <button
              onClick={goToPrevious}
              className="group p-3 bg-gradient-to-br from-[#111111] to-[#0a0a0a] rounded-full border border-[#ba6a5a]/30 hover:border-[#ba6a5a]/50 transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6 text-[#ba6a5a] group-hover:text-[#e49385] transition-colors" />
            </button>
            
            <button
              onClick={toggleAutoPlay}
              className="group p-3 bg-gradient-to-r from-[#ba6a5a] to-[#e49385] rounded-full hover:shadow-lg hover:shadow-[#ba6a5a]/25 transition-all duration-300 hover:scale-110"
            >
              {isAutoPlay ? 
                <Pause className="w-6 h-6 text-white" /> : 
                <Play className="w-6 h-6 text-white" />
              }
            </button>
            
            <button
              onClick={goToNext}
              className="group p-3 bg-gradient-to-br from-[#111111] to-[#0a0a0a] rounded-full border border-[#ba6a5a]/30 hover:border-[#ba6a5a]/50 transition-all duration-300 hover:scale-110"
            >
              <ChevronRight className="w-6 h-6 text-[#ba6a5a] group-hover:text-[#e49385] transition-colors" />
            </button>
          </motion.div>
        </div>

        {/* Premium Carousel Container */}
        <div className="relative perspective-1000 mb-12">
          <div className="min-h-[500px] flex items-center justify-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                  {getVisibleTestimonials().map((testimonial, index) => (
                    <motion.article
                      key={`${testimonial.id}-${currentIndex}-${index}`}
                      className="group relative bg-gradient-to-br from-[#111111] to-[#0a0a0a] rounded-3xl p-6 shadow-2xl border border-[#ba6a5a]/20 hover:border-[#ba6a5a]/50 transition-all duration-700 overflow-hidden"
                      style={{ 
                        transformStyle: 'preserve-3d',
                        perspective: '1000px'
                      }}
                      whileHover={{ 
                        scale: 1.05,
                        rotateY: 2,
                        rotateX: 2,
                        z: 20
                      }}
                      initial={{ opacity: 0, y: 50, scale: 0.9 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0, 
                        scale: 1,
                        transition: { 
                          delay: index * 0.1,
                          duration: 0.6,
                          ease: [0.4, 0, 0.2, 1]
                        }
                      }}
                    >
                      {/* Enhanced Glow Effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#ba6a5a]/30 via-transparent to-[#e49385]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl"></div>
                      
                      {/* Animated Border */}
                      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#ba6a5a] via-[#e49385] to-[#ba6a5a] p-[2px]">
                          <div className="w-full h-full bg-gradient-to-br from-[#111111] to-[#0a0a0a] rounded-3xl"></div>
                        </div>
                      </div>
                      
                      {/* Profile Header */}
                      <div className="relative z-10 flex items-center gap-3 mb-4">
                        <div className="relative">
                          <div className="w-12 h-12 bg-gradient-to-br from-[#ba6a5a] to-[#e49385] rounded-full flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform duration-300">
                            {testimonial.image ? (
                              <img 
                                src={testimonial.image} 
                                alt={testimonial.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <User className="w-6 h-6 text-white" />
                            )}
                          </div>
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="font-bold text-white text-base group-hover:text-[#e49385] transition-colors duration-300">
                            {testimonial.name}
                          </h3>
                          <p className="text-[#ba6a5a] text-xs font-medium">{testimonial.designation}</p>
                          <div className="flex items-center gap-1 text-gray-400 text-xs mt-1">
                            <MapPin className="w-2.5 h-2.5" />
                            {testimonial.location}
                          </div>
                        </div>
                      </div>

                      {/* Quote Section */}
                      <div className="relative z-10 mb-4">
                        <Quote className="w-6 h-6 text-[#ba6a5a]/50 mb-3" />
                        <blockquote className="text-gray-200 leading-relaxed text-sm group-hover:text-gray-100 transition-colors duration-300">
                          "{testimonial.quote}"
                        </blockquote>
                      </div>

                      {/* Product & Savings Info */}
                      <div className="relative z-10 space-y-2 mb-4">
                        <div className="flex items-center justify-between p-2.5 bg-[#0a0a0a] rounded-xl border border-[#ba6a5a]/10">
                          <span className="text-gray-400 text-xs">Product:</span>
                          <span className="text-[#e49385] font-semibold text-xs">{testimonial.product}</span>
                        </div>
                        <div className="flex items-center justify-between p-2.5 bg-[#0a0a0a] rounded-xl border border-[#ba6a5a]/10">
                          <span className="text-gray-400 text-xs">Savings:</span>
                          <span className="text-green-400 font-semibold text-xs">{testimonial.savings}</span>
                        </div>
                      </div>

                      {/* Rating Section */}
                      <div className="relative z-10 flex items-center justify-between">
                        <div className="flex items-center gap-0.5">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.1 * i }}
                            >
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            </motion.div>
                          ))}
                        </div>
                        <div className="text-[#ba6a5a] text-xs font-medium">
                          Verified
                        </div>
                      </div>

                      {/* Decorative Elements */}
                      <div className="absolute top-3 right-3 w-6 h-6 bg-gradient-to-br from-[#ba6a5a] to-[#e49385] rounded-full opacity-20 group-hover:opacity-60 transition-opacity duration-300 group-hover:animate-pulse"></div>
                      <div className="absolute bottom-3 left-3 w-8 h-8 bg-gradient-to-tl from-[#e49385] to-[#ba6a5a] rounded-full opacity-10 group-hover:opacity-40 transition-opacity duration-300"></div>
                      
                      {/* Floating Sparkles */}
                      {[...Array(2)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-[#ba6a5a] rounded-full opacity-0 group-hover:opacity-100"
                          style={{
                            left: `${20 + i * 30}%`,
                            top: `${15 + i * 10}%`,
                          }}
                          animate={{
                            y: [0, -8, 0],
                            scale: [0, 1, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.5,
                          }}
                        />
                      ))}
                    </motion.article>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Enhanced Pagination Dots */}
        <div className="flex items-center justify-center gap-3 mb-8">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className={`relative overflow-hidden rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'w-12 h-3 bg-gradient-to-r from-[#ba6a5a] to-[#e49385]' 
                  : 'w-3 h-3 bg-gray-700 hover:bg-gray-600'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              {index === currentIndex && (
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity, 
                    ease: 'linear',
                    delay: 0
                  }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {[
            { number: "10,000+", label: "Happy Customers", icon: "😊" },
            { number: "4.9/5", label: "Average Rating", icon: "⭐" },
            { number: "₹50L+", label: "Energy Saved", icon: "💰" },
            { number: "99.8%", label: "Satisfaction Rate", icon: "✅" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-6 bg-gradient-to-br from-[#111111] to-[#0a0a0a] rounded-2xl border border-[#ba6a5a]/20 hover:border-[#ba6a5a]/40 transition-all duration-300"
              whileHover={{ y: -5, scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-[#e49385] mb-1">{stat.number}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}