import React from "react";
import { motion } from "framer-motion";
import { BriefcaseBusiness, PackageCheck, Users, TrendingUp, Award, Shield, Star, Zap } from "lucide-react";

const amazonLogo = "/amazon.png";
const flipkartLogo = "/flipkart.png";

const Dealer = () => {
  return (
    <div className="bg-black text-white py-16 w-full relative overflow-hidden" id="dealer">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#ba6a5a] to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-[#e49385] to-transparent rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 px-4 md:px-12 max-w-7xl mx-auto space-y-20">

        {/* Premium Header Section */}
        <section aria-labelledby="dealer-heading" className="text-center">
          <motion.div
            className="inline-block px-4 py-2 bg-[#ba6a5a]/10 border border-[#ba6a5a]/20 rounded-full text-[#ba6a5a] text-sm font-medium mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            🤝 PARTNERSHIP OPPORTUNITIES
          </motion.div>
          
          <motion.h2
            id="dealer-heading"
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Distribute{" "}
            <span className="bg-gradient-to-r from-[#ba6a5a] to-[#e49385] bg-clip-text text-transparent">
              Excellence
            </span>
            {" "}– Partner with Anthem
          </motion.h2>

          <motion.p
            className="text-lg text-gray-300 text-center max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Business with Anthem means dealing in products that don't just sell, but{" "}
            <span className="text-[#e49385] font-medium">delight customers</span> and{" "}
            <span className="text-[#e49385] font-medium">drive growth</span>. Join our premium network of partners.
          </motion.p>
        </section>

        {/* Enhanced Partnership Benefits Grid */}
        <section aria-labelledby="partnership-benefits" className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* For Dealers Card */}
          <motion.div
            className="group relative bg-gradient-to-br from-[#111111] to-[#0a0a0a] rounded-3xl p-8 shadow-2xl border border-[#ba6a5a]/10 hover:border-[#ba6a5a]/30 transition-all duration-500 overflow-hidden"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            whileHover={{ 
              scale: 1.02,
              rotateX: 2,
              rotateY: 2
            }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#ba6a5a]/20 via-transparent to-[#e49385]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-[#ba6a5a] to-[#e49385] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <BriefcaseBusiness className="w-8 h-8 text-white" />
              </div>
              
              <h3
                id="dealer-benefits"
                className="text-2xl font-bold text-white mb-4 group-hover:text-[#e49385] transition-colors duration-300"
              >
                For Dealers
              </h3>
              
              <div className="space-y-4">
                {[
                  { icon: <Award className="w-5 h-5" />, text: "Exclusive Premium Rights", desc: "Territory-based exclusivity" },
                  { icon: <TrendingUp className="w-5 h-5" />, text: "Eye-Catching Products, Easy to Sell", desc: "High-demand premium fans" },
                  { icon: <Users className="w-5 h-5" />, text: "Marketing Tools & Training Support", desc: "Complete business support" }
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-[#ba6a5a]/20 rounded-lg flex items-center justify-center text-[#e49385] mt-1">
                      {benefit.icon}
                    </div>
                    <div>
                      <p className="text-white font-medium">{benefit.text}</p>
                      <p className="text-sm text-gray-400 mt-1">{benefit.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-[#ba6a5a] to-[#e49385] rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
          </motion.div>

          {/* For B2B & Corporates Card */}
          <motion.div
            className="group relative bg-gradient-to-br from-[#111111] to-[#0a0a0a] rounded-3xl p-8 shadow-2xl border border-[#ba6a5a]/10 hover:border-[#ba6a5a]/30 transition-all duration-500 overflow-hidden"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            whileHover={{ 
              scale: 1.02,
              rotateX: 2,
              rotateY: -2
            }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#e49385]/20 via-transparent to-[#ba6a5a]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-[#e49385] to-[#ba6a5a] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <PackageCheck className="w-8 h-8 text-white" />
              </div>
              
              <h3
                id="b2b-benefits"
                className="text-2xl font-bold text-white mb-4 group-hover:text-[#e49385] transition-colors duration-300"
              >
                For B2B & Corporates
              </h3>
              
              <div className="space-y-4">
                {[
                  { icon: <Shield className="w-5 h-5" />, text: "Bulk Orders for Projects, Hotels, Real Estate", desc: "Volume discounts available" },
                  { icon: <Star className="w-5 h-5" />, text: "Co-Branding & Custom Solutions", desc: "Tailored business solutions" },
                  { icon: <Zap className="w-5 h-5" />, text: "Expert Technical Consulting", desc: "Professional guidance" }
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-[#e49385]/20 rounded-lg flex items-center justify-center text-[#ba6a5a] mt-1">
                      {benefit.icon}
                    </div>
                    <div>
                      <p className="text-white font-medium">{benefit.text}</p>
                      <p className="text-sm text-gray-400 mt-1">{benefit.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-[#e49385] to-[#ba6a5a] rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
          </motion.div>
        </section>

        {/* Call-to-Action Section */}
        <section className="relative">
          <motion.div
            className="bg-gradient-to-br from-[#111111] to-[#0a0a0a] rounded-3xl p-8 border border-[#ba6a5a]/20 text-center relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-[#ba6a5a] to-[#e49385] rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative z-10">
              <motion.div
                className="w-16 h-16 bg-gradient-to-br from-[#ba6a5a] to-[#e49385] rounded-full flex items-center justify-center mx-auto mb-6"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
                whileHover={{ scale: 1.1, rotate: 360 }}
              >
                <Users className="w-8 h-8 text-white" />
              </motion.div>
              
              <h3 className="text-3xl font-bold mb-4 text-white">
                Ready to{" "}
                <span className="bg-gradient-to-r from-[#ba6a5a] to-[#e49385] bg-clip-text text-transparent">
                  Partner?
                </span>
              </h3>
              
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                Join our growing network of successful dealers and B2B partners. Let's build something exceptional together.
              </p>
              
              <motion.a
                href="mailto:support@anthemfans.com?subject=Partnership%20Inquiry"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#ba6a5a] to-[#e49385] text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Contact for Partnership</span>
                <motion.span
                  className="inline-block"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.a>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default Dealer;