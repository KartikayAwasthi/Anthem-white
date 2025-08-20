import React from "react";
import { motion } from "framer-motion";

const TechnicalTab = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-2xl font-bold text-[#e49385] mb-6">BLDC Motor Specifications</h3>
        <div className="space-y-4">
          {[
            { label: "Power Consumption", value: "28W - 35W" },
            { label: "Air Delivery", value: "230 - 250 CMM" },
            { label: "Speed Control", value: "6 Speed Settings" },
            { label: "Noise Level", value: "< 35dB" },
            { label: "Energy Rating", value: "5 Star" }
          ].map((spec, index) => (
            <motion.div 
              key={index} 
              className="flex justify-between items-center p-3 bg-[#1c1c1c] rounded-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
            >
              <span className="text-gray-300">{spec.label}</span>
              <span className="font-semibold text-[#ba6a5a]">{spec.value}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <h3 className="text-2xl font-bold text-[#e49385] mb-6">Induction Motor Specifications</h3>
        <div className="space-y-4">
          {[
            { label: "Power Consumption", value: "70W - 80W" },
            { label: "Air Delivery", value: "200 - 220 CMM" },
            { label: "Speed Control", value: "3 Speed Settings" },
            { label: "Noise Level", value: "< 45dB" },
            { label: "Energy Rating", value: "3 Star" }
          ].map((spec, index) => (
            <motion.div 
              key={index} 
              className="flex justify-between items-center p-3 bg-[#1c1c1c] rounded-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
            >
              <span className="text-gray-300">{spec.label}</span>
              <span className="font-semibold text-[#ba6a5a]">{spec.value}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default TechnicalTab;
