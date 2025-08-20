import React, { useState, Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { Shield, Zap, Clock } from "lucide-react";
import { useIntersectionObserver } from "../../hooks/usePerformance";

// Lazy load tab components only when needed
const WarrantyTab = lazy(() => 
  import("./WarrantyTab").then(module => ({ default: module.default }))
);
const TechnicalTab = lazy(() => 
  import("./TechnicalTab").then(module => ({ default: module.default }))
);
const SupportTab = lazy(() => 
  import("./SupportTab").then(module => ({ default: module.default }))
);

// Enhanced loading fallback with skeleton animation
const TabLoading = () => (
  <div className="space-y-6 py-8">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="bg-[#1c1c1c] rounded-xl p-6 animate-pulse">
          <div className="w-12 h-12 bg-gray-600 rounded-full mx-auto mb-4"></div>
          <div className="h-6 bg-gray-600 rounded mb-3"></div>
          <div className="h-8 bg-gray-700 rounded mb-4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-600 rounded"></div>
            <div className="h-4 bg-gray-600 rounded"></div>
            <div className="h-4 bg-gray-600 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const WarrantyTechnicalInfo = () => {
  const [activeTab, setActiveTab] = useState('warranty');
  const [sectionRef, isIntersecting, hasIntersected] = useIntersectionObserver({
    threshold: 0.2
  });

  const tabs = [
    { id: 'warranty', label: 'Warranty Coverage', icon: <Shield className="w-4 h-4" /> },
    { id: 'technical', label: 'Technical Specs', icon: <Zap className="w-4 h-4" /> },
    { id: 'support', label: 'Support Hours', icon: <Clock className="w-4 h-4" /> }
  ];

  const renderTabContent = () => {
    // Only render content if the section has been viewed
    if (!hasIntersected) {
      return <TabLoading />;
    }

    switch (activeTab) {
      case 'warranty':
        return (
          <Suspense fallback={<TabLoading />}>
            <WarrantyTab />
          </Suspense>
        );
      case 'technical':
        return (
          <Suspense fallback={<TabLoading />}>
            <TechnicalTab />
          </Suspense>
        );
      case 'support':
        return (
          <Suspense fallback={<TabLoading />}>
            <SupportTab />
          </Suspense>
        );
      default:
        return (
          <Suspense fallback={<TabLoading />}>
            <WarrantyTab />
          </Suspense>
        );
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="py-16 bg-black relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#ba6a5a] to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-[#e49385] to-transparent rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-12">
        <div className="text-center mb-12">
          <motion.div
            className="inline-block px-4 py-2 bg-[#ba6a5a]/10 border border-[#ba6a5a]/20 rounded-full text-[#ba6a5a] text-sm font-medium mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: hasIntersected ? 1 : 0, y: hasIntersected ? 0 : 10 }}
            transition={{ duration: 0.3 }}
          >
            📋 DETAILED INFORMATION
          </motion.div>
          
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: hasIntersected ? 1 : 0, y: hasIntersected ? 0 : 10 }}
            transition={{ duration: 0.3, delay: 0.05 }}
          >
            Warranty{" "}
            <span className="bg-gradient-to-r from-[#ba6a5a] to-[#e49385] bg-clip-text text-transparent">
              & Technical
            </span>
          </motion.h2>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tabs.map((tab, index) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-150 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-[#ba6a5a] to-[#e49385] text-white shadow-lg'
                  : 'bg-[#2a2a2a] text-gray-300 hover:bg-[#3a3a3a] border border-[#ba6a5a]/20'
              }`}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: hasIntersected ? 1 : 0, y: hasIntersected ? 0 : 10 }}
              transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
              disabled={!hasIntersected}
            >
              {tab.icon}
              {tab.label}
            </motion.button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gradient-to-br from-[#2a2a2a] to-[#1f1f1f] rounded-3xl p-8 border border-[#ba6a5a]/20"
        >
          {renderTabContent()}
        </motion.div>
      </div>
    </section>
  );
};

export default WarrantyTechnicalInfo;
