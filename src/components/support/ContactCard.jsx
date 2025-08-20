import React, { memo } from "react";
import { motion } from "framer-motion";

const ContactCard = memo(({ href, icon, title, subtitle, delay, bgColor, target, rel }) => (
  <motion.a
    href={href}
    target={target}
    rel={rel}
    className="group flex items-center justify-center gap-3 p-4 bg-gradient-to-br from-[#2a2a2a] to-[#1f1f1f] rounded-xl border border-[#ba6a5a]/20 hover:border-[#ba6a5a]/40 transition-all duration-100"
    whileHover={{ scale: 1.002 }}
    initial={{ opacity: 0, y: 5 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.15, delay }}
  >
    <div className={`p-3 ${bgColor} rounded-full group-hover:opacity-80 transition-opacity`}>
      {icon}
    </div>
    <div className="text-left">
      <div className="font-semibold text-white group-hover:text-[#e49385] transition-colors">{title}</div>
      <div className="text-sm text-gray-400">{subtitle}</div>
    </div>
  </motion.a>
));

ContactCard.displayName = 'ContactCard';

export default ContactCard;
