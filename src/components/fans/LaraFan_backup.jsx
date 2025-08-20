import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Star, Zap, Volume2, Shield, ChevronDown, ChevronUp, ShoppingCart, Heart, X, ChevronLeft, ChevronRight, ZoomIn, Share2, Settings, Battery, Info, Eye, ArrowRight } from "lucide-react";
import { useCart } from '../../contexts/CartContext';
import ColorChangeTransition from '../ColorChangeTransition';
import CartButton from '../CartButton';

// Import LARA images
const laraImg = "/Lara/fan1.png";

const laraCreatives = [
  "/Inara-creatives/Lara/fan1.png"
];

const laraData = {
  name: "LARA",
  image: laraImg,
  motorTypes: {
    induction: {
      name: "Induction Motor",
      price: "₹3,199",
      description: "LARA with induction motor delivers elegant design combined with robust motor performance for reliable everyday use.",
      features: [
        "Double Ball Bearing",
        "Antidust Coating Technology",
        "Superior EN3B Shaft",
        "Efficient motor having low TR",
        "High Power Factor",
        "100% Copper Winding",
        "2 yrs warranty",
        "High Speed with high Air Delivery"
      ],
      specifications: {
        "Motor Type": "Single Phase Induction",
        "Power Consumption": "80W",
        "Air Delivery": "290 CMM",
        "Speed": "1400 RPM",
        "Sweep": "1200mm",
        "Warranty": "2 Years"
      }
    }
  },
  rating: 4.8,
  colors: [
    { name: "Classic White", image: laraImg, code: "#FFFFFF" }
  ]
};

const LaraFan = () => {
  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState(laraData.colors[0]);
  
  // Initialize motor type based on available options
  const getDefaultMotorType = () => {
    const availableTypes = Object.keys(laraData.motorTypes);
    if (availableTypes.includes('bldc')) return 'bldc';
    if (availableTypes.includes('induction')) return 'induction';
    return availableTypes[0];
  };
  
  const [selectedMotorType, setSelectedMotorType] = useState(getDefaultMotorType());
  const [showColorTransition, setShowColorTransition] = useState(false);
  const [isSpecsOpen, setIsSpecsOpen] = useState(false);
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  // Fullscreen image viewer states
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [fullscreenImageIndex, setFullscreenImageIndex] = useState(0);

  // Get current motor data based on selection
  const getCurrentMotorData = () => {
    const currentMotor = laraData.motorTypes[selectedMotorType];
    if (currentMotor) return currentMotor;
    
    const availableTypes = Object.keys(laraData.motorTypes);
    return laraData.motorTypes[availableTypes[0]] || {};
  };

  // Get dynamic quick info based on motor type
  const getQuickInfo = () => {
    const currentMotor = getCurrentMotorData();
    const motorType = selectedMotorType;
    
    if (motorType === 'bldc') {
      return [
        { icon: Zap, label: "Energy Efficient", desc: `${currentMotor.specifications?.["Power Consumption"] || "25W"} Power` },
        { icon: Volume2, label: "Silent Operation", desc: `${currentMotor.specifications?.["Speed"] || "280"} RPM` },
        { icon: Shield, label: "Long Warranty", desc: currentMotor.specifications?.["Warranty"] || "5 Years Motor" }
      ];
    } else if (motorType === 'induction') {
      return [
        { icon: Settings, label: "High Performance", desc: "Reliable Motor" },
        { icon: Zap, label: "High Air Delivery", desc: `${currentMotor.specifications?.["Air Delivery"] || "290"} CMM` },
        { icon: Shield, label: "Warranty", desc: currentMotor.specifications?.["Warranty"] || "2 Years" }
      ];
    } else {
      // Default info
      return [
        { icon: Zap, label: "Energy Efficient", desc: "Low Power" },
        { icon: Volume2, label: "Silent Operation", desc: "Quiet Performance" },
        { icon: Shield, label: "Warranty", desc: "Coverage Included" }
      ];
    }
  };

  // Handle motor type change
  const handleMotorTypeChange = (motorType) => {
    setSelectedMotorType(motorType);
    setShowColorTransition(true);
    setTimeout(() => {
      setShowColorTransition(false);
    }, 500);
  };

  // Handle add to cart
  const handleAddToCart = () => {
    const currentMotor = getCurrentMotorData();
    const cartItem = {
      id: `lara-${selectedMotorType}`,
      name: `${laraData.name} (${currentMotor.name})`,
      price: currentMotor.price,
      image: getCurrentImage(),
      desc: currentMotor.description,
      color: selectedColor?.name || 'Default',
      motorType: currentMotor.name
    };
    addToCart(cartItem);
    
    alert(`${laraData.name} with ${currentMotor.name} added to cart!`);
  };

  // Handle share function
  const handleShare = async () => {
    const shareData = {
      title: `Anthem ${laraData.name}`,
      text: `Check out this amazing ${laraData.name} ceiling fan`,
      url: window.location.href
    };

    try {
      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (error) {
      console.log('Error sharing:', error);
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      } catch (clipboardError) {
        console.log('Clipboard error:', clipboardError);
      }
    }
  };

  const handleColorChange = (color) => {
    if (selectedColor?.name !== color.name) {
      setShowColorTransition(true);
      setTimeout(() => {
        setSelectedColor(color);
        setShowColorTransition(false);
      }, 300);
    }
  };

  const getCurrentImage = () => {
    return selectedColor ? selectedColor.image : laraData.image;
  };

  // Fullscreen image viewer functions
  const openFullscreen = (imageIndex) => {
    setFullscreenImageIndex(imageIndex);
    setShowFullscreen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeFullscreen = () => {
    setShowFullscreen(false);
    document.body.style.overflow = 'unset';
  };

  const nextImage = () => {
    const totalImages = laraData.colors.length + laraCreatives.length;
    setFullscreenImageIndex((prev) => (prev + 1) % totalImages);
  };

  const prevImage = () => {
    const totalImages = laraData.colors.length + laraCreatives.length;
    setFullscreenImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (showFullscreen) {
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'Escape') closeFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showFullscreen]);

  const currentMotor = getCurrentMotorData();

  if (!laraData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#e49385] mb-4">Fan not found</h2>
          <p className="text-gray-400">The requested fan model could not be loaded.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1c1c1c] text-white min-h-screen pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Back Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 text-[#e49385] hover:text-[#ba6a5a] transition-colors duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Products</span>
          </button>
        </motion.div>

        {/* Color transition overlay */}
        <ColorChangeTransition show={showColorTransition} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Main Image */}
            <div className="relative bg-gradient-to-br from-[#ffffff9a] to-[#ffffff91] rounded-2xl p-8 shadow-2xl">
              <img
                src={getCurrentImage()}
                alt={laraData.name}
                className="w-full h-96 object-contain transition-all duration-500"
              />
              {/* Floating Action Buttons */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <button 
                  onClick={handleShare}
                  className="p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-colors group"
                  title="Share this fan"
                >
                  <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </button>
                <button className="p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
              </div>
              
              {/* Localized Color Change Animation */}
              <ColorChangeTransition 
                isVisible={showColorTransition} 
                onComplete={() => setShowColorTransition(false)}
                type="fan"
                localized={true}
              />
            </div>

            {/* Color Variants */}
            {laraData.colors && laraData.colors.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#e49385]">Available Colors</h3>
                <div className="flex flex-wrap gap-3">
                  {laraData.colors.map((color, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`cursor-pointer p-3 rounded-xl border-2 transition-all duration-300 bg-[#2f2f2f] ${
                        selectedColor?.name === color.name
                          ? "border-[#ba6a5a] bg-[#ba6a5a]/10"
                          : "border-gray-600 hover:border-[#e49385]"
                      }`}
                      onClick={() => handleColorChange(color)}
                    >
                      <img
                        src={color.image}
                        alt={color.name}
                        className="w-16 h-16 object-contain"
                      />
                      <p className="text-xs text-center mt-2">{color.name}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-3">
              {laraCreatives.map((image, index) => (
                <button
                  key={index}
                  onClick={() => openFullscreen(index)}
                  className="aspect-square bg-[#2a2a2a] rounded-lg overflow-hidden border border-[#ba6a5a]/30 hover:border-[#ba6a5a] transition-all duration-300 group"
                >
                  <img
                    src={image}
                    alt={`Creative ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = "/fallback.jpg";
                    }}
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Header */}
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-[#e49385]">{laraData.name}</h1>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(laraData.rating) ? 'fill-current' : 'stroke-current fill-transparent'
                      }`}
                    />
                  ))}
                  <span className="text-gray-300 ml-2">({laraData.rating})</span>
                </div>
                <span className="text-green-400 text-sm">In Stock</span>
                <span className="bg-[#ba6a5a] text-white px-3 py-1 rounded-full text-sm">
                  {getCurrentMotorData().name}
                </span>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed">
                {getCurrentMotorData().description}
              </p>
            </div>

            {/* Price */}
            <div className="bg-gradient-to-r from-[#2f2f2f] to-[#1f1f1f] rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-3xl font-bold text-[#ba6a5a]">{getCurrentMotorData().price}</span>
                  <span className="text-gray-400 line-through ml-3">₹{parseInt(getCurrentMotorData().price?.replace('₹', '') || '0') + 1000}</span>
                </div>
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                  Save ₹1000
                </span>
              </div>
            </div>

            {/* Motor Type Information - Since Lara only has Induction */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-[#e49385]">Motor Type</h3>
              <div className="bg-gradient-to-r from-[#ba6a5a] to-[#e49385] text-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center gap-3">
                  <Settings className="w-6 h-6 text-white" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-lg">{getCurrentMotorData().name}</span>
                      <span className="text-white/90 font-bold">{getCurrentMotorData().price}</span>
                    </div>
                    <p className="text-white/80 text-sm">
                      Reliable induction motor for consistent high-speed performance
                    </p>
                  </div>
                  <div className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium">
                    Standard
                  </div>
                </div>
              </div>
              <div className="bg-[#2f2f2f]/50 p-3 rounded-lg border border-gray-600">
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-[#e49385] mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-gray-300">
                    <span>This model comes with a reliable induction motor for consistent high-speed performance.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <div className="flex-1">
                <CartButton 
                  product={{
                    id: `lara-${selectedMotorType}`,
                    name: `${laraData.name} (${getCurrentMotorData().name})`,
                    price: getCurrentMotorData().price,
                    image: getCurrentImage(),
                    desc: getCurrentMotorData().description,
                    color: selectedColor?.name || 'Default',
                    motorType: getCurrentMotorData().name
                  }}
                  className="py-4 px-6"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#2f2f2f] text-white py-4 px-6 rounded-xl font-semibold border border-[#ba6a5a] hover:bg-[#ba6a5a]/10 transition-all duration-300"
              >
                Buy Now
              </motion.button>
            </div>

            {/* Quick Info Icons */}
            <div className="grid grid-cols-3 gap-4">
              {getQuickInfo().map((info, index) => (
                <div key={index} className="text-center p-4 bg-[#2f2f2f] rounded-xl">
                  <info.icon className="w-8 h-8 text-[#ba6a5a] mx-auto mb-2" />
                  <p className="text-sm text-gray-300">{info.label}</p>
                  <p className="text-xs text-gray-500 mt-1">{info.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        </div>

        {/* Key Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 bg-[#2f2f2f] rounded-xl p-6"
        >
          {/* Key Features Section */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-[#e49385]">Key Features</h3>
            <motion.button
              className="flex items-center gap-2 cursor-pointer text-[#e49385] hover:text-[#ba6a5a] transition-colors"
              onClick={() => setIsFeaturesOpen(!isFeaturesOpen)}
            >
              <span className="text-lg font-semibold">Features</span>
              <motion.div
                animate={{ rotate: isFeaturesOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isFeaturesOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </motion.div>
            </motion.button>
          </div>
          
          <motion.div
            initial={false}
            animate={{ height: isFeaturesOpen ? "auto" : 0, opacity: isFeaturesOpen ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-4 grid grid-cols-1 gap-3">
              {getCurrentMotorData().features?.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: isFeaturesOpen ? 1 : 0, y: isFeaturesOpen ? 0 : 10 }}
                  transition={{ duration: 0.3, delay: isFeaturesOpen ? index * 0.05 : 0 }}
                  className="flex items-start gap-3 p-3 bg-[#1c1c1c] rounded-lg"
                >
                  <div className="w-2 h-2 bg-[#ba6a5a] rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-200">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Technical Specifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 bg-[#2f2f2f] rounded-xl p-6"
        >
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => setIsSpecsOpen(!isSpecsOpen)}
          >
            <h3 className="text-2xl font-semibold text-[#e49385]">Technical Specifications</h3>
            <motion.div
              animate={{ rotate: isSpecsOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-[#e49385]"
            >
              {isSpecsOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
            </motion.div>
          </div>
          <motion.div
            initial={false}
            animate={{ height: isSpecsOpen ? "auto" : 0, opacity: isSpecsOpen ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(getCurrentMotorData().specifications || {}).map(([key, value], index) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: isSpecsOpen ? 1 : 0, y: isSpecsOpen ? 0 : 10 }}
                  transition={{ duration: 0.3, delay: isSpecsOpen ? index * 0.05 : 0 }}
                  className="flex justify-between items-center border-b border-[#444] pb-3"
                >
                  <span className="text-gray-400 text-sm">{key}</span>
                  <span className="text-white font-medium text-sm text-right">{value}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Creatives Section */}
        {laraCreatives && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12"
          >
            <h2 className="text-2xl font-bold text-[#e49385] mb-6">Product Showcase</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {laraCreatives.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-xl bg-[#2f2f2f] cursor-pointer"
                  onClick={() => openFullscreen(index)}
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={image}
                      alt={`Creative ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <ZoomIn className="w-8 h-8 text-white" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Fullscreen Image Viewer */}
      <AnimatePresence>
        {showFullscreen && laraCreatives && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90"
            onClick={closeFullscreen}
          >
            {/* Header controls */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20">
              <div className="bg-black/50 text-white text-sm px-4 py-2 rounded-full backdrop-blur-sm">
                <span className="font-medium">{fullscreenImageIndex + 1} / {laraCreatives.length}</span>
              </div>
              <button
                onClick={closeFullscreen}
                className="bg-black/50 text-white p-3 hover:bg-red-600/50 rounded-full transition-all duration-200 backdrop-blur-sm"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation arrows */}
            {laraCreatives.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-4 hover:bg-[#ba6a5a]/50 rounded-full transition-all duration-200 z-20 backdrop-blur-sm"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-4 hover:bg-[#ba6a5a]/50 rounded-full transition-all duration-200 z-20 backdrop-blur-sm"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </>
            )}

            {/* Image */}
            <motion.div
              className="relative flex items-center justify-center w-full h-full p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                className="relative flex items-center justify-center rounded-lg shadow-2xl"
              >
                <motion.img
                  key={fullscreenImageIndex}
                  src={laraCreatives[fullscreenImageIndex]}
                  alt={`Creative ${fullscreenImageIndex + 1}`}
                  className="select-none rounded-lg max-w-[80vw] max-h-[80vh] object-contain"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  draggable={false}
                />
              </motion.div>
            </motion.div>

            {/* Bottom instructions */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white/80 text-sm text-center z-20">
              <div className="bg-black/50 rounded-xl px-6 py-3 backdrop-blur-sm">
                <div className="flex items-center justify-center space-x-6 text-xs">
                  <span className="flex items-center space-x-1">
                    <span className="text-[#e49385]">←→</span>
                    <span>Navigate</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span className="text-[#e49385]">ESC</span>
                    <span>Close</span>
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LaraFan;
