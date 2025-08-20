import React, { Suspense, lazy } from "react";

// Lazy load components with better loading fallbacks
const SupportHero = lazy(() => import("../components/support/SupportHero"));
const QuickContactBar = lazy(() => import("../components/support/QuickContactBar"));
const ServicesGrid = lazy(() => import("../components/support/ServicesGrid"));
const WarrantyTechnicalInfo = lazy(() => import("../components/support/WarrantyTechnicalInfo"));
const FAQQuickAccess = lazy(() => import("../components/support/FAQQuickAccess"));

// Optimized loading component with skeleton UI
const SectionLoading = ({ height = "h-64" }) => (
  <div className={`${height} bg-black rounded-3xl animate-pulse flex items-center justify-center`}>
    <div className="w-8 h-8 border-2 border-[#ba6a5a] border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// Main loading fallback for entire page
const PageLoading = () => (
  <div className="bg-black text-white min-h-screen pt-20 pb-16 w-full">
    <div className="max-w-7xl mx-auto px-4 md:px-12 space-y-16">
      <SectionLoading height="h-96" />
      <SectionLoading height="h-32" />
      <SectionLoading height="h-80" />
      <SectionLoading height="h-96" />
      <SectionLoading height="h-64" />
    </div>
  </div>
);

const Support = () => {
  return (
    <div className="bg-black text-white min-h-screen pt-20 pb-16 w-full" id="support">
      <Suspense fallback={<PageLoading />}>
        {/* Hero Section */}
        <Suspense fallback={<SectionLoading height="h-96" />}>
          <SupportHero />
        </Suspense>

        {/* Quick Contact Bar */}
        <Suspense fallback={<SectionLoading height="h-32" />}>
          <QuickContactBar />
        </Suspense>

        {/* Services Grid */}
        <Suspense fallback={<SectionLoading height="h-80" />}>
          <ServicesGrid />
        </Suspense>

        {/* Warranty & Technical Info */}
        <Suspense fallback={<SectionLoading height="h-96" />}>
          <WarrantyTechnicalInfo />
        </Suspense>

        {/* FAQ Quick Access */}
        <Suspense fallback={<SectionLoading height="h-64" />}>
          <FAQQuickAccess />
        </Suspense>
      </Suspense>
    </div>
  );
};

export default Support;