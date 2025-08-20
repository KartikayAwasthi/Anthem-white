import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const WarrantyTab = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        { 
          type: "Induction Motor", 
          period: "2 Years", 
          icon: "⚙️", 
          features: ["Motor replacement", "Electrical components", "Manufacturing defects"] 
        },
        { 
          type: "BLDC Motor", 
          period: "5 Years", 
          icon: "⚡", 
          features: ["Motor replacement", "PCB coverage", "Energy efficiency guarantee"] 
        },
        { 
          type: "General Components", 
          period: "2 Years", 
          icon: "🔧", 
          features: ["Blade replacement", "Light fixtures", "Remote control"] 
        }
      ].map((warranty, index) => (
        <motion.div 
          key={index} 
          className="text-center p-6 bg-[#1c1c1c] rounded-xl border border-[#ba6a5a]/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <div className="text-4xl mb-4">{warranty.icon}</div>
          <h3 className="text-xl font-bold text-[#e49385] mb-2">{warranty.type}</h3>
          <div className="text-3xl font-bold text-[#ba6a5a] mb-4">{warranty.period}</div>
          <ul className="space-y-2 text-gray-300">
            {warranty.features.map((feature, idx) => (
              <li key={idx} className="flex items-center justify-center gap-2">
                <Star className="w-4 h-4 text-[#ba6a5a]" />
                {feature}
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
};

export default WarrantyTab;
