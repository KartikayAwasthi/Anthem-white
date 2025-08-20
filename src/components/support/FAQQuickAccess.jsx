import React from "react";
import { motion } from "framer-motion";
import { Lightbulb, ArrowRight, Download } from "lucide-react";

const FAQQuickAccess = () => {
  return (
    <section className="py-16 max-w-7xl mx-auto px-4 md:px-12">
      <div className="bg-gradient-to-br from-[#2a2a2a] to-[#1f1f1f] rounded-3xl p-8 border border-[#ba6a5a]/20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="w-16 h-16 bg-gradient-to-br from-[#ba6a5a] to-[#e49385] rounded-full flex items-center justify-center mx-auto mb-6"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.1, rotate: 360 }}
          >
            <Lightbulb className="w-8 h-8 text-white" />
          </motion.div>
          
          <motion.h3 
            className="text-3xl font-bold mb-4 text-white"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            Need Quick{" "}
            <span className="bg-gradient-to-r from-[#ba6a5a] to-[#e49385] bg-clip-text text-transparent">
              Answers?
            </span>
          </motion.h3>
          
          <motion.p 
            className="text-gray-300 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            Check our comprehensive FAQ section for instant solutions to common questions about installation, maintenance, and troubleshooting.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <motion.a
              href="/faq"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#ba6a5a] to-[#e49385] text-white font-semibold rounded-full hover:shadow-lg hover:shadow-[#ba6a5a]/25 transition-all duration-150"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Browse FAQ</span>
              <ArrowRight className="w-4 h-4" />
            </motion.a>
            
            <motion.a
              href="/anthem_catalog.pdf"
              download
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#2f2f2f] text-white font-semibold rounded-full border border-[#ba6a5a]/30 hover:bg-[#3a3a3a] transition-all duration-150"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Download className="w-4 h-4" />
              <span>Download Manual</span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQQuickAccess;
