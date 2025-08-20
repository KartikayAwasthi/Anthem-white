import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Star, Zap, Volume2, Shield, ChevronDown, ChevronUp, ShoppingCart, Heart, X, ChevronLeft, ChevronRight, ZoomIn, Share2, Settings, Battery, Info, Eye, ArrowRight } from "lucide-react";
import { useCart } from '../../contexts/CartContext';
import ColorChangeTransition from '../ColorChangeTransition';
import CartButton from '../CartButton';

const laraImg1 = "/Lara/fan1.png";

const laraCreatives = [
  "/evaara-creatives/4.jpg",
  "/evaara-creatives/5.jpg"
];

const laraData = {
  name: "LARA",
  image: laraImg1,
  motorTypes: {
    bldc: {
      name: "BLDC Motor",
      price: "₹3,499",
      description: "The LARA offers a minimalist design with BLDC motor for energy efficiency and smooth operation. A perfect fit for contemporary spaces.",
      features: [
        "Powerfully efficient five star rated with ultra low energy consumption",
        "High speed with high Air Delivery",
        "Smooth noiseless operation",
        "Speed control on remote for 6 speed levels",
        "Boost mode for higher Air Delivery",
        "Easy installation",
        "Aero dynamic blades for strong air flow",
        "5 yrs warranty on motors",
        "2 yrs warranty on PCB",
        "Radio frequency (RF) remote for ease of operation from any corner of the room"
      ],
      specifications: {
        "Motor Type": "BLDC (Brushless DC)",
        "Power Consumption": "28W",
        "Input Voltage": "230V AC, 50Hz",
        "Power": "28W",
        "Air Delivery": "210 CMM",
        "Speed": "350 RPM",
        "Sweep": "1200mm",
        "Warranty": "5 Years Motor, 2 Years PCB"
      }
    }
  },
  rating: 4.5,
  colors: [
    { name: "Light Brown", image: laraImg1, code: "#8B4513" }
  ],
  itemDetails: {
    brandName: "Anthem by Emsquare Industries",
    modelName: "LARA",
    bldcComponents: [
      "BLDC Ceiling Fan Motor Assembly",
      "Aerodynamic Fan Blades (3 pieces)",
      "Decorative LED Canopy",
      "RF Remote Control with 6 Speed Settings",
      "Premium Mounting Hardware Kit",
      "Installation Manual",
      "Warranty Card",
      "LED Light Module"
    ],
    manufacturerAddress: {
      company: "Emsquare Industries",
      address: "Plot No. 72, GIDC, Bethora Industrial Estate, Bethora, Ponda, Goa-403409, India",
      phone: "+91 7400440127",
      email: "info@emsquareglobal.com",
      website: "www.anthemappliances.com"
    }
  }
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
  const [isItemDetailsOpen, setIsItemDetailsOpen] = useState(false);
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
        { icon: Zap, label: "Energy Efficient", desc: `${currentMotor.specifications?.["Power Consumption"] || "28W"} Power` },
        { icon: Volume2, label: "Silent Operation", desc: `${currentMotor.specifications?.["Speed"] || "350"} RPM` },
        { icon: Shield, label: "Long Warranty", desc: currentMotor.specifications?.["Warranty"] || "5 Years Motor" }
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

  // Get components based on selected motor type
  const getCurrentComponents = () => {
    if (selectedMotorType === 'bldc') {
      return laraData.itemDetails.bldcComponents;
    } else if (selectedMotorType === 'induction') {
      return laraData.itemDetails.inductionComponents;
    }
    // Default fallback
    return laraData.itemDetails.bldcComponents || [];
  };

  // Handle motor type change
  const handleMotorTypeChange = (motorType) => {
    setSelectedMotorType(motorType);
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
      }, 600);
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
    const totalImages = laraCreatives.length;
    setFullscreenImageIndex((prev) => (prev + 1) % totalImages);
  };

  const prevImage = () => {
    const totalImages = laraCreatives.length;
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
      <div className="bg-white text-black min-h-screen pt-24 pb-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#ba6a5a] mb-4">Fan not found</h2>
          <p className="text-gray-600">The requested fan model could not be loaded.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white text-black min-h-screen pt-24 pb-20">
      <div className="w-full">
        {/* Fullscreen Image Viewer */}
        <AnimatePresence>
          {showFullscreen && laraCreatives && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/90"
              onClick={closeFullscreen}
            >
              {/* Header controls */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20">
                <div className="bg-white/50 text-black text-sm px-4 py-2 rounded-full backdrop-blur-sm">
                  <span className="font-medium">{fullscreenImageIndex + 1} / {laraCreatives.length}</span>
                </div>
                <button
                  onClick={closeFullscreen}
                  className="bg-white/50 text-black p-3 hover:bg-red-600/50 rounded-full transition-all duration-200 backdrop-blur-sm"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation arrows */}
              {laraCreatives.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                    className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/50 text-black p-4 hover:bg-[#ba6a5a]/50 rounded-full transition-all duration-200 z-20 backdrop-blur-sm"
                  >
                    <ChevronLeft className="w-8 h-8" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                    className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/50 text-black p-4 hover:bg-[#ba6a5a]/50 rounded-full transition-all duration-200 z-20 backdrop-blur-sm"
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
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-black/80 text-sm text-center z-20">
                <div className="bg-white/50 rounded-xl px-6 py-3 backdrop-blur-sm">
                  <div className="flex items-center justify-center space-x-6 text-xs">
                    <span className="flex items-center space-x-1">
                      <span className="text-[#ba6a5a]">←→</span>
                      <span>Navigate</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <span className="text-[#ba6a5a]">ESC</span>
                      <span>Close</span>
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col lg:flex-row h-auto lg:h-[calc(100vh-120px)] lg:overflow-hidden">
          {/* Left Column - Images (60%) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-[60%] lg:sticky lg:top-24 h-[60vh] lg:h-full overflow-hidden"
          >
            {/* Main Image with Glassmorphism Effect */}
            <div className="relative bg-white h-full flex items-center justify-center p-0">
              {/* Glassmorphism circles/blobs in background */}
              <div className="absolute top-1/4 left-1/4 w-40 h-40 rounded-full bg-[#ba6a5a]/20 filter blur-3xl"></div>
              <div className="absolute bottom-1/4 right-1/3 w-60 h-60 rounded-full bg-[#e49385]/10 filter blur-3xl"></div>
              <div className="absolute top-1/2 left-1/3 w-32 h-32 rounded-full bg-black/5 filter blur-2xl"></div>
              
              {/* Remote image at bottom right (shifted left) */}
              <div className="absolute bottom-4 right-6 sm:right-10 md:right-16 lg:right-20 z-20 w-8 sm:w-10 md:w-14 lg:w-20">
                <img 
                  src="/remote.png" 
                  alt="Fan Remote" 
                  className="w-full h-auto object-contain drop-shadow-lg animate-float opacity-75 hover:opacity-100 transition-opacity"
                />
              </div>

              {/* Glassmorphism container for the fan - Full size */}
              <div className="relative z-10 bg-white backdrop-blur-md rounded-none lg:rounded-r-3xl border-r border-white/20 shadow-xl w-full h-full flex items-center justify-center">
                <motion.img
                  key={selectedColor?.name}
                  src={getCurrentImage()}
                  alt={`${laraData.name} ${selectedColor?.name}`}
                  className="w-full h-full object-contain transition-all duration-500 scale-125 sm:scale-120 md:scale-115 lg:scale-110 max-h-[90vh] lg:max-h-[calc(95vh-120px)]"
                  initial={{ opacity: 0.8, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                />
              </div>
              
              {/* Floating Action Buttons */}
              <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
                <button 
                  onClick={handleShare}
                  className="p-3 bg-black/10 backdrop-blur-md rounded-full hover:bg-black/20 transition-colors group"
                  title="Share this fan"
                >
                  <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform text-black" />
                </button>
                <button className="p-3 bg-black/10 backdrop-blur-md rounded-full hover:bg-black/20 transition-colors">
                  <Heart className="w-5 h-5 text-black" />
                </button>
              </div>
              
              {/* Localized Color Change Animation */}
              <div className="absolute inset-0 z-10 pointer-events-none">
                <ColorChangeTransition 
                  isVisible={showColorTransition} 
                  onComplete={() => setShowColorTransition(false)}
                  type="fan"
                  localized={true}
                />
              </div>
            </div>
          </motion.div>

          {/* Right Column - Details (40%) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-[40vh] lg:h-full lg:w-[40%] space-y-4 sm:space-y-6 p-4 sm:p-6 overflow-y-auto bg-[#f5f5f5]/80 lg:flex lg:flex-col"
          >
            {/* Product Title & Rating */}
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-black mb-1">
                 {laraData.name}
              </h1>
              <p className="text-sm font-medium mb-2 sm:mb-3 bg-gradient-to-r from-[#e49385] via-[#ba6a5a] to-[#D4AF37] bg-clip-text text-transparent inline-block">
                Sleek Elegance Defined
              </p>
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-3 sm:mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(laraData.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-black"
                      }`}
                    />
                  ))}
                  <span className="text-black ml-2">({laraData.rating})</span>
                </div>
                <span className="text-green-700 text-sm">In Stock</span>
                <span className="bg-[#ba6a5a] text-black px-3 py-1 rounded-full text-sm">
                  {getCurrentMotorData().name}
                </span>
              </div>
              <span className="text-black text-lg leading-relaxed">{getCurrentMotorData().description}</span>
            </div>

            {/* Price */}
            <div className="bg-black/5 backdrop-blur-md rounded-xl p-6 border border-black/10">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-3xl font-bold text-[#ba6a5a]">{getCurrentMotorData().price}</span>
                  <span className="text-black line-through ml-3">₹{parseInt(getCurrentMotorData().price?.replace('₹', '') || '0') + 1000}</span>
                </div>
                <span className="bg-green-300/80 backdrop-blur-sm text-black px-3 py-1 rounded-full text-sm">
                  Save ₹1000
                </span>
              </div>
            </div>

            {/* Color Variants - Moved below price */}
            {laraData.colors && laraData.colors.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-[#e49385] mb-3">Available Colors</h3>
                <div className="flex flex-wrap gap-2">
                  {laraData.colors.map((color, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`cursor-pointer p-2 rounded-lg border transition-all duration-300 backdrop-blur-md ${
                        selectedColor?.name === color.name
                          ? "border-[#ba6a5a] bg-[#ba6a5a]/20"
                          : "border-black/10 hover:border-[#e49385] bg-black/5"
                      }`}
                      onClick={() => handleColorChange(color)}
                    >
                      <img
                        src={color.image}
                        alt={color.name}
                        className="w-14 h-14 object-contain"
                      />
                      <p className="text-xs text-center mt-1">{color.name}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Motor Type Selection Buttons */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-[#e49385]">Motor Type</h3>
              <div className="flex flex-wrap gap-2">
                {Object.entries(laraData.motorTypes).map(([motorKey, motorData]) => (
                  <motion.button
                    key={motorKey}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-xl border text-sm transition-all duration-300 backdrop-blur-md ${
                      selectedMotorType === motorKey
                        ? "border-[#ba6a5a] bg-[#ba6a5a]/20"
                        : "border-black/10 hover:border-[#e49385] bg-black/5"
                    }`}
                    onClick={() => handleMotorTypeChange(motorKey)}
                  >
                    <div className="flex items-center gap-2">
                      {motorKey === 'bldc' ? (
                        <Battery className={`w-4 h-4 ${selectedMotorType === motorKey ? 'text-[#ba6a5a]' : 'text-gray-400'}`} />
                      ) : (
                        <Settings className={`w-4 h-4 ${selectedMotorType === motorKey ? 'text-[#ba6a5a]' : 'text-gray-400'}`} />
                      )}
                      <div>
                        <span className="font-medium text-black">{motorData.name}</span>
                        <span className="text-xs text-black ml-2">{motorData.price}</span>
                      </div>
                    </div>
                  </motion.button>
                ))}
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
                className="bg-black/5 backdrop-blur-md text-black py-4 px-6 rounded-xl font-semibold border border-[#ba6a5a] hover:bg-[#ba6a5a]/20 transition-all duration-300"
              >
                Buy Now
              </motion.button>
            </div>

            {/* Quick Info Icons */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              {getQuickInfo().map((info, index) => (
                <div key={index} className="text-center p-2 sm:p-4 bg-black/5 backdrop-blur-md rounded-xl border border-black/10">
                  <info.icon className="w-6 h-6 sm:w-8 sm:h-8 text-[#ba6a5a] mx-auto mb-1 sm:mb-2" />
                  <p className="text-xs sm:text-sm text-black">{info.label}</p>
                  <p className="text-[10px] sm:text-xs text-black mt-0.5 sm:mt-1">{info.desc}</p>
                </div>
              ))}
            </div>

            {/* Technical Specifications - Now inside the right column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-6 bg-black/5 backdrop-blur-md rounded-xl p-6 border border-black/10"
            >
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setIsSpecsOpen(!isSpecsOpen)}
              >
                <h3 className="text-lg font-semibold text-[#e49385]">Technical Specifications</h3>
                <motion.div
                  animate={{ rotate: isSpecsOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-[#e49385]"
                >
                  {isSpecsOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </motion.div>
              </div>
              <motion.div
                initial={false}
                animate={{ height: isSpecsOpen ? "auto" : 0, opacity: isSpecsOpen ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-4 grid grid-cols-1 gap-3">
                  {Object.entries(getCurrentMotorData().specifications || {}).map(([key, value], index) => (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: isSpecsOpen ? 1 : 0, y: isSpecsOpen ? 0 : 10 }}
                      transition={{ duration: 0.3, delay: isSpecsOpen ? index * 0.05 : 0 }}
                      className="flex justify-between items-center border-b border-[#bbb] pb-3"
                    >
                      <span className="text-black text-sm">{key}</span>
                      <span className="text-black font-medium text-sm text-right">{value}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Item Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-black/5 backdrop-blur-md rounded-xl p-6 mt-6 border border-black/10"
            >
              <div
                className="flex items-center justify-between cursor-pointer hover:bg-black/10 rounded-lg transition-colors duration-300 p-2 -m-2"
                onClick={() => setIsItemDetailsOpen(!isItemDetailsOpen)}
              >
                <h3 className="text-lg font-semibold text-[#e49385]">Item Details</h3>
                <motion.div
                  animate={{ rotate: isItemDetailsOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-[#e49385]"
                >
                  {isItemDetailsOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </motion.div>
              </div>
              <motion.div
                initial={false}
                animate={{ height: isItemDetailsOpen ? "auto" : 0, opacity: isItemDetailsOpen ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-4 space-y-4">
                  {/* Brand and Model */}
                  <div>
                    <h4 className="text-sm font-semibold text-[#e49385] mb-2">Product Information</h4>
                    <div className="grid grid-cols-1 gap-2">
                      <div className="flex justify-between items-center border-b border-[#bbb] pb-2">
                        <span className="text-black text-xs">Brand Name</span>
                        <span className="text-black font-medium text-xs text-right">{laraData.itemDetails.brandName}</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-[#bbb] pb-2">
                        <span className="text-black text-xs">Model Name</span>
                        <span className="text-black font-medium text-xs text-right">{laraData.itemDetails.modelName}</span>
                      </div>
                    </div>
                  </div>

                  {/* Components */}
                  <div>
                    <h4 className="text-sm font-semibold text-[#e49385] mb-2">Included Components</h4>
                    <div className="grid grid-cols-1 gap-1">
                      {getCurrentComponents().map((component, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: isItemDetailsOpen ? 1 : 0, y: isItemDetailsOpen ? 0 : 10 }}
                          transition={{ duration: 0.3, delay: isItemDetailsOpen ? index * 0.05 : 0 }}
                          className="flex items-center gap-2"
                        >
                          <div className="w-1.5 h-1.5 bg-[#ba6a5a] rounded-full flex-shrink-0"></div>
                          <span className="text-black text-xs">{component}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Manufacturer Details */}
                  <div>
                    <h4 className="text-sm font-semibold text-[#e49385] mb-2">Manufacturer Details</h4>
                    <div className="grid grid-cols-1 gap-2">
                      <div className="flex justify-between items-start border-b border-[#bbb] pb-2">
                        <span className="text-black text-xs">Company</span>
                        <span className="text-black font-medium text-xs text-right">{laraData.itemDetails.manufacturerAddress.company}</span>
                      </div>
                      <div className="flex justify-between items-start border-b border-[#bbb] pb-2">
                        <span className="text-black text-xs">Address</span>
                        <span className="text-black font-medium text-xs text-right max-w-xs">{laraData.itemDetails.manufacturerAddress.address}</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-[#bbb] pb-2">
                        <span className="text-black text-xs">Phone</span>
                        <span className="text-black font-medium text-xs text-right">{laraData.itemDetails.manufacturerAddress.phone}</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-[#bbb] pb-2">
                        <span className="text-black text-xs">Email</span>
                        <span className="text-black font-medium text-xs text-right">{laraData.itemDetails.manufacturerAddress.email}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-black text-xs">Website</span>
                        <span className="text-black font-medium text-xs text-right">{laraData.itemDetails.manufacturerAddress.website}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Creatives Section */}
        {laraCreatives && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-6"
          >
            <h3 className="text-2xl font-semibold text-[#e49385] mb-6">
              Creative Highlights
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {laraCreatives.map((img, index) => (
                <motion.div
                  key={index}
                  className="relative rounded-xl overflow-hidden shadow-lg bg-black/5 backdrop-blur-md hover:scale-[1.02] transition-all duration-300 cursor-pointer group border border-black/10"
                  onClick={() => openFullscreen(index)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden rounded-xl">
                    <img
                      src={img}
                      alt={`Creative ${index + 1}`}
                      className="w-full h-64 object-cover transition-all duration-300 group-hover:scale-105"
                    />
                  </div>
                  
                  {/* Overlay with zoom icon */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center rounded-xl">
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/20 backdrop-blur-sm rounded-full p-3">
                      <ZoomIn className="w-6 h-6 text-black" />
                    </div>
                  </div>
                  
                  {/* Index badge */}
                  <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm">
                    <span className="font-medium">{index + 1}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default LaraFan;
