import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLoading } from '../contexts/LoadingContext';

const anthemLogo = '/Anthem-logo.png';

const LoadingScreen = () => {
  const { isLoading, loadingMessage, isTransitioning } = useLoading();
  
  if (!isLoading) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] bg-gradient-to-br from-[#1c1c1c] via-[#2f2f2f] to-[#1c1c1c] flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {/* Optimized background particles - fewer elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#ba6a5a] rounded-full opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 0.6, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center">
          {/* Optimized Logo */}
          <motion.div 
            className="mb-6"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="w-20 h-20 mx-auto mb-4 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center p-3"
              animate={isTransitioning ? {
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              } : {
                scale: [1, 1.05, 1]
              }}
              transition={isTransitioning ? {
                duration: 0.8,
                repeat: Infinity,
                ease: "linear"
              } : {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <img
                src={anthemLogo}
                alt="Anthem Logo"
                className="w-full h-full object-contain filter brightness-110"
                loading="eager"
              />
            </motion.div>
            
            <motion.h2 
              className="text-xl font-bold text-[#ba6a5a] mb-2"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              ANTHEM
            </motion.h2>
            
            <motion.p 
              className="text-gray-400 text-sm"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Premium Ceiling Fans
            </motion.p>
          </motion.div>

          {/* Simplified loading indicator */}
          <motion.div 
            className="flex space-x-2 justify-center mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-gradient-to-r from-[#ba6a5a] to-[#e49385] rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </motion.div>

          {/* Loading text */}
          <motion.p 
            className="text-gray-300 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {loadingMessage || 'Loading...'}
          </motion.p>

          {/* Simplified progress bar for transitions */}
          {isTransitioning && (
            <motion.div
              className="w-32 h-1 bg-gray-700 rounded-full mx-auto mt-4 overflow-hidden"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 128 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-[#ba6a5a] to-[#e49385]"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              />
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;
