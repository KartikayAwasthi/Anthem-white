import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Wrench, Headphones, Shield, Users, Zap, Award } from "lucide-react";
import ServiceCard from "./ServiceCard";
import { useIntersectionObserver, usePerformanceMonitor } from "../../hooks/usePerformance";

const ServicesGrid = () => {
  // Performance monitoring in development
  usePerformanceMonitor('ServicesGrid');
  
  // Intersection observer for lazy loading
  const [sectionRef, isIntersecting, hasIntersected] = useIntersectionObserver({
    threshold: 0.1
  });

  // Memoized service data to prevent recreation on each render
  const serviceData = useMemo(() => [
    {
      icon: <Wrench className="w-8 h-8" />,
      title: "Professional Installation",
      description: "Expert technicians ensure perfect setup with safety compliance and optimal performance testing.",
      features: ["Free home visit", "Safety inspection", "Performance testing"]
    },
    {
      icon: <Headphones className="w-8 h-8" />,
      title: "24/7 Technical Support",
      description: "Round-the-clock assistance for troubleshooting, remote diagnostics, and technical queries.",
      features: ["Remote diagnostics", "Live chat support", "Video assistance"]
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Comprehensive Warranty",
      description: "Extended warranty coverage with quick replacement and hassle-free claim process.",
      features: ["Quick replacements", "Free repairs", "Doorstep service"]
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Smart Usage Training",
      description: "Complete guidance on operating your fan efficiently and maximizing its lifespan.",
      features: ["User manual", "Video tutorials", "Tips & tricks"]
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Energy Optimization",
      description: "Help you achieve maximum energy savings with personalized usage recommendations.",
      features: ["Energy audit", "Savings calculator", "Optimization tips"]
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Premium Care Package",
      description: "Exclusive maintenance services with priority support and regular health checkups.",
      features: ["Priority support", "Annual maintenance", "Health checkups"]
    }
  ], []);

  return (
    <section ref={sectionRef} className="py-16 max-w-7xl mx-auto px-4 md:px-12 bg-black">
      <div className="text-center mb-16">
        <motion.div
          className="inline-block px-4 py-2 bg-[#ba6a5a]/10 border border-[#ba6a5a]/20 rounded-full text-[#ba6a5a] text-sm font-medium mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: hasIntersected ? 1 : 0, y: hasIntersected ? 0 : 10 }}
          transition={{ duration: 0.3 }}
        >
          🔧 OUR SERVICES
        </motion.div>
        
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-6 text-white"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: hasIntersected ? 1 : 0, y: hasIntersected ? 0 : 10 }}
          transition={{ duration: 0.3, delay: 0.05 }}
        >
          What We{" "}
          <span className="bg-gradient-to-r from-[#ba6a5a] to-[#e49385] bg-clip-text text-transparent">
            Offer
          </span>
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {hasIntersected ? (
          serviceData.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))
        ) : (
          // Skeleton loading for services
          Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="bg-gradient-to-br from-[#2a2a2a] to-[#1f1f1f] rounded-3xl p-8 animate-pulse">
              <div className="w-16 h-16 bg-gray-600 rounded-2xl mb-6"></div>
              <div className="h-6 bg-gray-600 rounded mb-4"></div>
              <div className="h-4 bg-gray-700 rounded mb-2"></div>
              <div className="h-4 bg-gray-700 rounded mb-6"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-600 rounded"></div>
                <div className="h-4 bg-gray-600 rounded"></div>
                <div className="h-4 bg-gray-600 rounded"></div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default ServicesGrid;
