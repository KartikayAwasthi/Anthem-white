import React from "react";
import { motion } from "framer-motion";
import { Clock, MapPin } from "lucide-react";

const SupportTab = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-20 h-20 bg-gradient-to-br from-[#ba6a5a] to-[#e49385] rounded-full flex items-center justify-center mx-auto mb-6">
          <Clock className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-[#e49385] mb-4">Customer Support Hours</h3>
        <div className="space-y-3 text-gray-300">
          <motion.div 
            className="flex justify-between items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <span>Monday - Saturday</span>
            <span className="font-semibold text-[#ba6a5a]">10:00 AM - 6:00 PM</span>
          </motion.div>
          <motion.div 
            className="flex justify-between items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
          >
            <span>Sunday</span>
            <span className="font-semibold text-gray-400">Closed</span>
          </motion.div>
          <motion.div 
            className="flex justify-between items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <span>Emergency Support</span>
            <span className="font-semibold text-[#e49385]">WhatsApp 24/7</span>
          </motion.div>
        </div>
      </motion.div>
      
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="w-20 h-20 bg-gradient-to-br from-[#e49385] to-[#ba6a5a] rounded-full flex items-center justify-center mx-auto mb-6">
          <MapPin className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-[#e49385] mb-4">Service Locations</h3>
        <div className="space-y-3 text-gray-300">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            Head Office: Goa
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.25 }}
          >
            Service Centers: Pan India
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            Response Time: 24-48 hrs
          </motion.div>
          <motion.div 
            className="mt-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.35 }}
          >
            <a
              href="https://www.google.com/maps/search/?api=1&query=Plot+No.72,+GDIC,+Bethora+Industrial+Estate,+Bethora,+Ponda,+Goa+-+403409"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#ba6a5a] text-white rounded-lg hover:bg-[#e49385] transition-colors"
            >
              <MapPin className="w-4 h-4" />
              Find Location
            </a>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default SupportTab;
