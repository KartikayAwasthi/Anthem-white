import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Star, Zap, Volume2, Shield, ChevronDown, ChevronUp, ShoppingCart, Heart, X, ChevronLeft, ChevronRight, ZoomIn, Share2, Settings, Battery, Info, ArrowRight } from "lucide-react";
import { useCart } from '../../contexts/CartContext';
import ColorChangeTransition from '../ColorChangeTransition';
import CartButton from '../CartButton';

// Import INARA 3D images
const inaraImg = "/fan 3d/Inaara/Black/1.png";

// Color images - each color has 3 images for different views
const inaraColorImages = {
  "Pearl White": [
    "/fan 3d/Inaara/pearl-white/1.png", 
    "/fan 3d/Inaara/pearl-white/2.png", 
    "/fan 3d/Inaara/pearl-white/3.png"
  ],
  "Midnight Black": [
    "/fan 3d/Inaara/Black/1.png", 
    "/fan 3d/Inaara/Black/2.png", 
    "/fan 3d/Inaara/Black/3.png"
  ],
  "Royal Blue": [
    "/fan 3d/Inaara/Blue/1.png", 
    "/fan 3d/Inaara/Blue/2.png", 
    "/fan 3d/Inaara/Blue/3.png"
  ],
  "Antique Gold": [
    "/fan 3d/Inaara/yellow/1.png", 
    "/fan 3d/Inaara/yellow/2.png", 
    "/fan 3d/Inaara/yellow/3.png"
  ],
  "Rose Gold": [
    "/fan 3d/Inaara/rose-gold/1.png", 
    "/fan 3d/Inaara/rose-gold/2.png", 
    "/fan 3d/Inaara/rose-gold/3.png"
  ],
  "Purple": [
    "/fan 3d/Inaara/purple/1.png", 
    "/fan 3d/Inaara/purple/2.png", 
    "/fan 3d/Inaara/purple/3.png"
  ],
  "Beckers Brown": [
    "/fan 3d/Inaara/Brown/1.png", 
    "/fan 3d/Inaara/Brown/2.png", 
    "/fan 3d/Inaara/Brown/3.png"
  ],
  "Classic White": [
    "/fan 3d/Inaara/white/1.png", 
    "/fan 3d/Inaara/white/2.png", 
    "/fan 3d/Inaara/white/3.png"
  ]
};

// Primary images for each color (first image of each color)
const inaraImg1 = "/fan 3d/Inaara/pearl-white/1.png";
const inaraImg2 = "/fan 3d/Inaara/Black/1.png";
const inaraImg3 = "/fan 3d/Inaara/Blue/1.png";
const inaraImg4 = "/fan 3d/Inaara/yellow/1.png";
const inaraImg5 = "/fan 3d/Inaara/purple/1.png";
const inaraImg6 = "/fan 3d/Inaara/rose-gold/1.png";
const inaraImg7 = "/fan 3d/Inaara/Brown/1.png";
const inaraImg8 = "/fan 3d/Inaara/white/1.png";

// Creative images for marketing
const inaraCreatives = [
  "/Inara-creatives/1.png",
  "/Inara-creatives/17.jpg",
  "/Inara-creatives/all.jpg",
  "/Inara-creatives/inarainfo.jpg"
];

// Banner images
const bannerImages = [
  "/Banner/1-w.jpg",
  "/Banner/1-wn.jpg",
  "/Banner/2-w.jpg",
  "/Banner/2-wn.jpg",
  "/Banner/3-w.jpg",
  "/Banner/3-wn.jpg"
];

const inaraData = {
  name: "INARA",
  image: inaraImg,
  motorTypes: {
    bldc: {
      name: "BLDC Motor",
      price: "₹4,499",
      description: "INARA represents the pinnacle of ceiling fan engineering with premium BLDC motor technology and smart features for the discerning homeowner.",
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
        "Motor Type": "BLDC Premium",
        "Power Consumption": "32W",
        "Input Voltage": "230V AC, 50Hz",
        "Power": "32W",
        "Air Delivery": "250 CMM",
        "Speed": "320 RPM",
        "Sweep": "1200mm",
        "Warranty": "5 Years Motor, 2 Years PCB"
      }
    },
    induction: {
      name: "Induction Motor",
      price: "₹3,499",
      description: "INARA with powerful induction motor delivers exceptional performance and reliability for demanding environments.",
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
        "Power Consumption": "85W",
        "Input Voltage": "230V AC, 50Hz",
        "Power": "85W",
        "Air Delivery": "300 CMM",
        "Speed": "1450 RPM",
        "Sweep": "1200mm",
        "Warranty": "2 Years"
      }
    }
  },
  rating: 4.9,
  colors: [
    { name: "Pearl White", image: inaraImg1, code: "#F8F8FF" },
    { name: "Midnight Black", image: inaraImg2, code: "#2F2F2F" },
    { name: "Royal Blue", image: inaraImg3, code: "#4169E1" },
    { name: "Antique Gold", image: inaraImg4, code: "#D4AF37" },
    { name: "Purple", image: inaraImg5, code: "#8A2BE2" },
    { name: "Rose Gold", image: inaraImg6, code: "#B76E79" },
    { name: "Beckers Brown", image: inaraImg7, code: "#8B4513" },
    { name: "Classic White", image: inaraImg8, code: "#FFFFFF" }
  ],
  itemDetails: {
    brandName: "Anthem by Emsquare Industries",
    modelName: "INARA",
    bldcComponents: [
      "Premium BLDC Ceiling Fan Motor Assembly",
      "Aerodynamic Fan Blades (3 pieces)",
      "Designer LED Canopy with Smart Integration",
      "RF Remote Control with 6 Speed Settings",
      "Premium Mounting Hardware Kit",
      "Installation Manual",
      "Warranty Card",
      "LED Light Module with Dimmer Control"
    ],
    inductionComponents: [
      "Premium Induction Motor Assembly",
      "Aerodynamic Fan Blades (3 pieces)",
      "Designer Canopy",
      "Wall Switch Control",
      "Premium Mounting Hardware Kit",
      "Installation Manual",
      "Warranty Card"
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

const InaraFan = () => {
  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState(inaraData.colors[0]);
  const [colorImageIndex, setColorImageIndex] = useState(0);
  
  const getDefaultMotorType = () => {
    const availableTypes = Object.keys(inaraData.motorTypes);
    if (availableTypes.includes('bldc')) return 'bldc';
    if (availableTypes.includes('induction')) return 'induction';
    return availableTypes[0];
  };
  
  const [selectedMotorType, setSelectedMotorType] = useState(getDefaultMotorType());
  const [showColorTransition, setShowColorTransition] = useState(false);
  const [isSpecsOpen, setIsSpecsOpen] = useState(false);
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
  const [isItemDetailsOpen, setIsItemDetailsOpen] = useState(false);
  
  // Fullscreen image viewer states
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [fullscreenImageIndex, setFullscreenImageIndex] = useState(0);
  const [fullscreenImageType, setFullscreenImageType] = useState('creative');

  // Get current motor data based on selection
  const getCurrentMotorData = () => {
    const currentMotor = inaraData.motorTypes[selectedMotorType];
    if (currentMotor) return currentMotor;
    
    const availableTypes = Object.keys(inaraData.motorTypes);
    return inaraData.motorTypes[availableTypes[0]] || {};
  };

  // Get dynamic quick info based on motor type
  const getQuickInfo = () => {
    const currentMotor = getCurrentMotorData();
    const motorType = selectedMotorType;
    
    if (motorType === 'bldc') {
      return [
        { icon: Zap, label: "Energy Efficient", desc: `${currentMotor.specifications?.["Power Consumption"] || "32W"} Power` },
        { icon: Volume2, label: "Silent Operation", desc: `${currentMotor.specifications?.["Speed"] || "320"} RPM` },
        { icon: Shield, label: "Long Warranty", desc: currentMotor.specifications?.["Warranty"] || "5 Years Motor" }
      ];
    } else if (motorType === 'induction') {
      return [
        { icon: Settings, label: "High Performance", desc: "Powerful Motor" },
        { icon: Zap, label: "High Air Delivery", desc: `${currentMotor.specifications?.["Air Delivery"] || "300"} CMM` },
        { icon: Shield, label: "Warranty", desc: currentMotor.specifications?.["Warranty"] || "2 Years" }
      ];
    } else {
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
      return inaraData.itemDetails.bldcComponents;
    } else if (selectedMotorType === 'induction') {
      return inaraData.itemDetails.inductionComponents;
    }
    return inaraData.itemDetails.bldcComponents || inaraData.itemDetails.inductionComponents || [];
  };

  // Handle motor type change
  const handleMotorTypeChange = (motorType) => {
    setSelectedMotorType(motorType);
  };

  // Handle add to cart
  const handleAddToCart = () => {
    const currentMotor = getCurrentMotorData();
    const cartItem = {
      id: `inara-${selectedMotorType}`,
      name: `${inaraData.name} (${currentMotor.name})`,
      price: currentMotor.price,
      image: getCurrentImage(),
      desc: currentMotor.description,
      color: selectedColor?.name || 'Default',
      motorType: currentMotor.name
    };
    addToCart(cartItem);
    
    alert(`${inaraData.name} with ${currentMotor.name} added to cart!`);
  };

  // Handle share function
  const handleShare = async () => {
    const shareData = {
      title: `Anthem ${inaraData.name}`,
      text: `Check out this amazing ${inaraData.name} ceiling fan`,
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
        setColorImageIndex(0);
      }, 600);
    }
  };

  // Navigation functions for color images
  const nextColorImage = () => {
    const colorImages = inaraColorImages[selectedColor?.name] || [];
    if (colorImages.length > 0) {
      setColorImageIndex((prev) => (prev + 1) % colorImages.length);
    }
  };

  const prevColorImage = () => {
    const colorImages = inaraColorImages[selectedColor?.name] || [];
    if (colorImages.length > 0) {
      setColorImageIndex((prev) => (prev - 1 + colorImages.length) % colorImages.length);
    }
  };

  const getCurrentImage = () => {
    const colorImages = inaraColorImages[selectedColor?.name] || [];
    if (colorImages.length > 0) {
      return colorImages[colorImageIndex];
    }
    return selectedColor ? selectedColor.image : inaraData.image;
  };

  // Fullscreen image viewer functions
  const openFullscreen = (imageIndex, type = 'creative') => {
    setFullscreenImageIndex(imageIndex);
    setFullscreenImageType(type);
    setShowFullscreen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeFullscreen = () => {
    setShowFullscreen(false);
    document.body.style.overflow = 'unset';
  };

  const nextImage = () => {
    if (fullscreenImageType === 'creative') {
      const totalImages = inaraCreatives.length;
      setFullscreenImageIndex((prev) => (prev + 1) % totalImages);
    } else if (fullscreenImageType === 'banner') {
      const totalImages = bannerImages.length;
      setFullscreenImageIndex((prev) => (prev + 1) % totalImages);
    }
  };

  const prevImage = () => {
    if (fullscreenImageType === 'creative') {
      const totalImages = inaraCreatives.length;
      setFullscreenImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
    } else if (fullscreenImageType === 'banner') {
      const totalImages = bannerImages.length;
      setFullscreenImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (showFullscreen) {
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'Escape') closeFullscreen();
      } else {
        if (e.key === 'ArrowRight') nextColorImage();
        if (e.key === 'ArrowLeft') prevColorImage();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showFullscreen]);

  const currentMotor = getCurrentMotorData();

  if (!inaraData) {
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
          {showFullscreen && (
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
                  <span className="font-medium">
                    {fullscreenImageIndex + 1} / {fullscreenImageType === 'creative' ? inaraCreatives.length : bannerImages.length}
                  </span>
                </div>
                <button
                  onClick={closeFullscreen}
                  className="bg-white/50 text-black p-3 hover:bg-red-600/50 rounded-full transition-all duration-200 backdrop-blur-sm"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation arrows */}
              {((fullscreenImageType === 'creative' && inaraCreatives.length > 1) || 
                (fullscreenImageType === 'banner' && bannerImages.length > 1)) && (
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
                className="relative flex items-center justify-center w-full h-full p-8 "
                onClick={(e) => e.stopPropagation()}
              >
                <motion.div
                  className="relative flex items-center justify-center rounded-lg shadow-2xl"
                >
                  <motion.img
                    key={`${fullscreenImageType}-${fullscreenImageIndex}`}
                    src={fullscreenImageType === 'creative' 
                      ? inaraCreatives[fullscreenImageIndex]
                      : bannerImages[fullscreenImageIndex]
                    }
                    alt={`${fullscreenImageType === 'creative' ? 'Creative' : 'Banner'} ${fullscreenImageIndex + 1}`}
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
              
              {/* Remote image at bottom right (shifted left) - Only show for BLDC motor */}
              {selectedMotorType === 'bldc' && (
                <div className="absolute bottom-4 right-6 sm:right-10 md:right-16 lg:right-20 z-20 w-8 sm:w-10 md:w-14 lg:w-20">
                  <img 
                    src="/remote.png" 
                    alt="Fan Remote" 
                    className="w-full h-auto object-contain drop-shadow-lg animate-float opacity-100 hover:opacity-100 transition-opacity"
                  />
                </div>
              )}
              {/* Glassmorphism container for the fan - Full size */}
              <div className="relative z-10 bg-gray-200 backdrop-blur-md rounded-none lg:rounded-r-3xl border-r border-white/20 shadow-xl w-full h-full flex items-center justify-center">
                {/* Fan Image */}
                <motion.img
                  key={`${selectedColor?.name}-${colorImageIndex}`}
                  src={getCurrentImage()}
                  alt={`${inaraData.name} ${selectedColor?.name}`}
                  className="w-full h-full object-contain transition-all duration-500 scale-125 sm:scale-120 md:scale-115 lg:scale-110 max-h-[90vh] lg:max-h-[calc(95vh-120px)]"
                  initial={{ opacity: 0.8, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                />

                {/* Navigation arrows for color images */}
                {inaraColorImages[selectedColor?.name]?.length > 1 && (
                  <>
                    <button
                      onClick={(e) => { e.stopPropagation(); prevColorImage(); }}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/70 text-black p-3 hover:bg-[#ba6a5a]/70 hover:text-white rounded-full transition-all duration-200 z-20 backdrop-blur-sm shadow-lg"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); nextColorImage(); }}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/70 text-black p-3 hover:bg-[#ba6a5a]/70 hover:text-white rounded-full transition-all duration-200 z-20 backdrop-blur-sm shadow-lg"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}

                {/* Image indicator dots */}
                {inaraColorImages[selectedColor?.name]?.length > 1 && (
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20 bg-white/30 backdrop-blur-sm px-3 py-2 rounded-full">
                    {inaraColorImages[selectedColor?.name].map((_, index) => (
                      <button 
                        key={index}
                        onClick={() => setColorImageIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          colorImageIndex === index 
                            ? "bg-[#ba6a5a] scale-125" 
                            : "bg-black/40 hover:bg-black/60"
                        }`}
                        aria-label={`View image ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
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
                 {inaraData.name}
              </h1>
              <p className="text-sm font-medium mb-2 sm:mb-3 bg-gradient-to-r from-[#e49385] via-[#ba6a5a] to-[#D4AF37] bg-clip-text text-transparent inline-block">
                Premium Performance & Elegance
              </p>
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-3 sm:mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(inaraData.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-black"
                      }`}
                    />
                  ))}
                  <span className="text-black ml-2">({inaraData.rating})</span>
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

            {/* Color Variants - Using the Inara design */}
            {inaraData.colors && inaraData.colors.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-[#e49385] mb-3">Available Colors</h3>
                <div className="flex flex-wrap gap-2">
                  {inaraData.colors.map((color, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`cursor-pointer p-2 rounded-lg border transition-all duration-300 ${
                        selectedColor?.name === color.name
                          ? "border-[#ba6a5a] bg-[#ba6a5a]/20"
                          : "border-gray-200 hover:border-[#e49385] bg-white"
                      }`}
                      onClick={() => handleColorChange(color)}
                    >
                      <div className="relative">
                        <img
                          src={color.image}
                          alt={color.name}
                          className="w-14 h-14 object-contain"
                        />
                      </div>
                      <p className="text-xs text-center mt-1 text-gray-700">{color.name}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Motor Type Selection Buttons */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-[#e49385]">Motor Type</h3>
              <div className="flex flex-wrap gap-2">
                {Object.entries(inaraData.motorTypes).map(([motorKey, motorData]) => (
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
                    id: `inara-${selectedMotorType}`,
                    name: `${inaraData.name} (${getCurrentMotorData().name})`,
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
            
            {/* Key Features Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-6 bg-black/5 backdrop-blur-md rounded-xl p-6 border border-black/10"
            >
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setIsFeaturesOpen(!isFeaturesOpen)}
              >
                <h3 className="text-lg font-semibold text-[#e49385]">Key Features</h3>
                <motion.div
                  animate={{ rotate: isFeaturesOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-[#e49385]"
                >
                  {isFeaturesOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </motion.div>
              </div>
              <motion.div
                initial={false}
                animate={{ height: isFeaturesOpen ? "auto" : 0, opacity: isFeaturesOpen ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-4 space-y-2">
                  {getCurrentMotorData().features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: isFeaturesOpen ? 1 : 0, y: isFeaturesOpen ? 0 : 10 }}
                      transition={{ duration: 0.3, delay: isFeaturesOpen ? index * 0.05 : 0 }}
                      className="flex items-start gap-2 mb-2"
                    >
                      <div className="w-1.5 h-1.5 bg-[#ba6a5a] rounded-full flex-shrink-0 mt-1.5"></div>
                      <span className="text-black text-sm">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Technical Specifications */}
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
                        <span className="text-black font-medium text-xs text-right">{inaraData.itemDetails.brandName}</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-[#bbb] pb-2">
                        <span className="text-black text-xs">Model Name</span>
                        <span className="text-black font-medium text-xs text-right">{inaraData.itemDetails.modelName}</span>
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
                        <span className="text-black font-medium text-xs text-right">{inaraData.itemDetails.manufacturerAddress.company}</span>
                      </div>
                      <div className="flex justify-between items-start border-b border-[#bbb] pb-2">
                        <span className="text-black text-xs">Address</span>
                        <span className="text-black font-medium text-xs text-right max-w-xs">{inaraData.itemDetails.manufacturerAddress.address}</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-[#bbb] pb-2">
                        <span className="text-black text-xs">Phone</span>
                        <span className="text-black font-medium text-xs text-right">{inaraData.itemDetails.manufacturerAddress.phone}</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-[#bbb] pb-2">
                        <span className="text-black text-xs">Email</span>
                        <span className="text-black font-medium text-xs text-right">{inaraData.itemDetails.manufacturerAddress.email}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-black text-xs">Website</span>
                        <span className="text-black font-medium text-xs text-right">{inaraData.itemDetails.manufacturerAddress.website}</span>
                      </div>
                </div>
              </div>
            </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Creatives Section */}
        {inaraCreatives && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-6"
          >
            <h3 className="text-2xl font-semibold text-[#e49385] mb-6">
              Creative Highlights
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {inaraCreatives.map((img, index) => (
                <motion.div
                  key={index}
                  className="relative rounded-xl overflow-hidden shadow-lg bg-[#2f2f2f] hover:scale-[1.02] transition-all duration-300 cursor-pointer group aspect-square"
                  onClick={() => openFullscreen(index, 'creative')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden rounded-xl w-full h-full">
                    <img
                      src={img}
                      alt={`Creative ${index + 1}`}
                      className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                    />
                  </div>
                  
                  {/* Overlay with zoom icon */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center rounded-xl">
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/20 backdrop-blur-sm rounded-full p-3">
                      <ZoomIn className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  
                  {/* Index badge */}
                  <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm">
                    <span className="font-medium">{index + 1}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Overview Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mt-12 px-6 sm:px-10 py-10 bg-gradient-to-br from-[#fdf8f7] to-white
                         rounded-2xl border border-[#e9b2a9]/40 shadow-lg relative overflow-hidden"
            >
              {/* Decorative Copper Glow */}
              <div className="absolute top-0 right-0 w-44 h-44 bg-[#e49385]/20 rounded-full blur-3xl -z-10" />
              <div className="absolute bottom-0 left-0 w-36 h-36 bg-[#d87c6a]/20 rounded-full blur-2xl -z-10" />
            
              {/* Heading */}
              <div className="flex items-center mb-6">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="p-3 rounded-full bg-gradient-to-tr from-[#e49385] to-[#d87c6a] shadow-md"
                >
                  <Info className="w-6 h-6 text-white" />
                </motion.div>
                <h3 className="ml-3 text-3xl font-bold bg-gradient-to-r from-[#e49385] to-[#d87c6a] bg-clip-text text-transparent">
                  🌟 INARA Overview
                </h3>
              </div>
            
              {/* Description */}
              <p className="text-gray-800 leading-relaxed text-lg sm:text-xl font-medium tracking-wide mb-6">
                Experience the perfect blend of <span className="text-[#d87c6a] font-semibold">premium design 🎨</span> 
                and <span className="text-[#e49385] font-semibold">cutting-edge technology ⚡</span> with the 
                <span className="text-[#d87c6a] font-semibold"> INARA Series</span> by Anthem. Engineered for 
                discerning homeowners who value both form and function, INARA delivers 
                <span className="italic"> exceptional performance</span> with <span className="italic">elegant aesthetics</span> 
                to elevate any living space 🏡.
              </p>
            
              {/* Highlights */}
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  "Premium materials and flawless finish ✨",
                  "Advanced BLDC motor technology for efficiency ⚡",
                  "Whisper-quiet operation with powerful airflow 🔇",
                  "Perfect harmony of luxury and performance 💎"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <span className="w-3 h-3 mt-2 rounded-full bg-gradient-to-br from-[#e49385] to-[#d87c6a]" />
                    <p className="text-gray-700 font-medium">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            
            {/* Premium Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-12 px-4 sm:px-6 bg-white rounded-xl py-8 border border-[#e9b2a9]/40 shadow-sm"
            >
              <h3 className="text-2xl font-semibold bg-gradient-to-r from-[#e49385] to-[#d87c6a] bg-clip-text text-transparent mb-6">
                Premium Features
              </h3>
            
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Card */}
                <div className="bg-gradient-to-br from-[#fdf8f7] to-white rounded-xl p-5 shadow-sm border border-[#e9b2a9]/40">
                  <div className="flex items-start">
                    <div className="bg-gradient-to-tr from-[#e49385] to-[#d87c6a] p-3 rounded-full mr-4 shadow-md">
                      <Star className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg text-[#d87c6a] mb-2">Premium Materials ✨</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li>🎯 High-quality components for durability</li>
                        <li>💎 Luxurious finish that complements any decor</li>
                      </ul>
                    </div>
                  </div>
                </div>
            
                <div className="bg-gradient-to-br from-[#fdf8f7] to-white rounded-xl p-5 shadow-sm border border-[#e9b2a9]/40">
                  <div className="flex items-start">
                    <div className="bg-gradient-to-tr from-[#e49385] to-[#d87c6a] p-3 rounded-full mr-4 shadow-md">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg text-[#d87c6a] mb-2">Advanced Efficiency ⚡</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li>🌟 5-star BLDC motor technology</li>
                        <li>💡 Significant energy savings</li>
                      </ul>
                    </div>
                  </div>
                </div>
            
                <div className="bg-gradient-to-br from-[#fdf8f7] to-white rounded-xl p-5 shadow-sm border border-[#e9b2a9]/40">
                  <div className="flex items-start">
                    <div className="bg-gradient-to-tr from-[#e49385] to-[#d87c6a] p-3 rounded-full mr-4 shadow-md">
                      <Volume2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg text-[#d87c6a] mb-2">Silent Performance 🔇</h4>
                      <p className="text-gray-700">Noiseless operation for peaceful environments 🌌</p>
                    </div>
                  </div>
                </div>
            
                <div className="bg-gradient-to-br from-[#fdf8f7] to-white rounded-xl p-5 shadow-sm border border-[#e9b2a9]/40">
                  <div className="flex items-start">
                    <div className="bg-gradient-to-tr from-[#e49385] to-[#d87c6a] p-3 rounded-full mr-4 shadow-md">
                      <Battery className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg text-[#d87c6a] mb-2">Smart Control 🎛️</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li>📡 RF remote with multiple speed settings</li>
                        <li>📍 Convenient operation from anywhere in the room</li>
                      </ul>
                    </div>
                  </div>
                </div>
            
                <div className="bg-gradient-to-br from-[#fdf8f7] to-white rounded-xl p-5 shadow-sm border border-[#e9b2a9]/40 md:col-span-2">
                  <div className="flex items-start">
                    <div className="bg-gradient-to-tr from-[#e49385] to-[#d87c6a] p-3 rounded-full mr-4 shadow-md">
                      <Settings className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg text-[#d87c6a] mb-2">Engineered Excellence 🛠️</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li>🌀 Precision-balanced blades for optimal airflow</li>
                        <li>✨ Superior craftsmanship meets innovative design</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            
              {/* Design Philosophy */}
              <div className="bg-gradient-to-br from-[#fdf8f7] to-white p-6 rounded-xl mb-8 border border-[#e9b2a9]/40 shadow-md">
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-full bg-gradient-to-tr from-[#e49385] to-[#d87c6a] shadow-md mr-3">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-2xl font-semibold bg-gradient-to-r from-[#e49385] to-[#d87c6a] bg-clip-text text-transparent">Design Philosophy</h4>
                </div>
                <p className="text-base leading-relaxed text-gray-700">
                  INARA was conceived for those who <span className="text-[#d87c6a] font-semibold">appreciate fine craftsmanship</span> — where every detail matters. 
                  From its elegant silhouette to its advanced engineering, INARA represents 
                  <span className="text-[#e49385] font-semibold"> the future of ceiling fan technology</span> while maintaining timeless appeal. 
                  Ideal for modern homes, luxury apartments, and premium commercial spaces.
                </p>
              </div>
            
              {/* Ideal Settings */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-[#fdf8f7] to-white p-6 rounded-xl border border-[#e9b2a9]/40 shadow-md">
                  <div className="flex items-center mb-3">
                    <span className="mr-3 text-xl">🏡</span>
                    <h4 className="text-lg font-semibold text-[#d87c6a]">Modern Homes</h4>
                  </div>
                  <p className="text-gray-700">Contemporary residences with premium furnishings and decor</p>
                </div>
                
                <div className="bg-gradient-to-br from-[#fdf8f7] to-white p-6 rounded-xl border border-[#e9b2a9]/40 shadow-md">
                  <div className="flex items-center mb-3">
                    <span className="mr-3 text-xl">🌿</span>
                    <h4 className="text-lg font-semibold text-[#d87c6a]">Luxury Spaces</h4>
                  </div>
                  <p className="text-gray-700">High-end apartments and premium living spaces with elegant interiors</p>
                </div>
                
                <div className="bg-gradient-to-br from-[#fdf8f7] to-white p-6 rounded-xl border border-[#e9b2a9]/40 shadow-md">
                  <div className="flex items-center mb-3">
                    <span className="mr-3 text-xl">☕</span>
                    <h4 className="text-lg font-semibold text-[#d87c6a]">Premium Venues</h4>
                  </div>
                  <p className="text-gray-700">Boutique hotels, luxury offices, and high-end commercial establishments</p>
                </div>
              </div>
            
                {/* Why Choose INARA */}
                <div className="bg-gradient-to-br from-[#e49385] to-[#d87c6a] p-6 rounded-xl border border-[#e9b2a9]/60 shadow-lg mt-6 text-white">
                  <div className="flex items-center mb-3">
                    <Heart className="w-6 h-6 text-white/90 mr-3" />
                    <h4 className="text-2xl font-semibold">Why Choose INARA?</h4>
                  </div>
                  <p className="text-white/90 leading-relaxed mb-6">
                    Because excellence deserves recognition. INARA isn't just a ceiling fan — it's a 
                    <span className="font-semibold"> statement of sophistication</span>, a 
                    <span className="font-semibold"> commitment to quality</span>, and a 
                    <span className="font-semibold"> testament to innovation</span>. 
                    For those who refuse to compromise on style or performance.
                  </p>
                  <button
                    className="bg-white text-[#d87c6a] py-3 px-6 rounded-xl font-semibold hover:bg-white/95 transition-all duration-300 flex items-center"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart
                  </button>
                </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default InaraFan;