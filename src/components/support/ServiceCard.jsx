import React, { memo } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const ServiceCard = memo(({ service, index }) => (
  <motion.div
    className="group relative bg-gradient-to-br from-[#2a2a2a] to-[#1f1f1f] rounded-3xl p-8 shadow-2xl border border-[#ba6a5a]/10 hover:border-[#ba6a5a]/30 transition-all duration-150 overflow-hidden"
    whileHover={{ scale: 1.005 }}
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.2, delay: index * 0.01 }}
  >
    {/* Minimal glow effect */}
    <div className="absolute inset-0 bg-gradient-to-br from-[#ba6a5a]/3 via-transparent to-[#e49385]/3 opacity-0 group-hover:opacity-100 transition-opacity duration-150 rounded-3xl"></div>
    
    <div className="relative z-10">
      <div className="w-16 h-16 bg-gradient-to-br from-[#ba6a5a] to-[#e49385] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-101 transition-transform duration-100">
        <div className="text-white">{service.icon}</div>
      </div>
      
      <h3 className="text-xl font-bold mb-4 text-white group-hover:text-[#e49385] transition-colors duration-100">
        {service.title}
      </h3>
      
      <p className="text-gray-300 mb-6 leading-relaxed">
        {service.description}
      </p>
      
      <ul className="space-y-2">
        {service.features.map((feature, idx) => (
          <li key={idx} className="flex items-center gap-2 text-sm text-gray-400">
            <CheckCircle className="w-4 h-4 text-[#ba6a5a]" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  </motion.div>
));

ServiceCard.displayName = 'ServiceCard';

export default ServiceCard;
