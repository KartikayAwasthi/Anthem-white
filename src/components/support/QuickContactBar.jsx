import React, { useMemo } from "react";
import { Mail, Phone, MessageCircle } from "lucide-react";
import ContactCard from "./ContactCard";

const QuickContactBar = () => {
  // Optimized contact data with faster delays
  const contactData = useMemo(() => [
    {
      href: "tel:+919930101710",
      icon: <Phone className="w-5 h-5 text-[#ba6a5a]" />,
      title: "Call Support",
      subtitle: "+91 9930101710",
      delay: 0.05,
      bgColor: "bg-[#ba6a5a]/20"
    },
    {
      href: "mailto:support@anthemfans.com",
      icon: <Mail className="w-5 h-5 text-[#e49385]" />,
      title: "Email Support", 
      subtitle: "support@anthemfans.com",
      delay: 0.1,
      bgColor: "bg-[#e49385]/20"
    },
    {
      href: "https://wa.me/919930101710",
      target: "_blank",
      rel: "noopener noreferrer",
      icon: <MessageCircle className="w-5 h-5 text-green-400" />,
      title: "WhatsApp",
      subtitle: "Quick Chat",
      delay: 0.15,
      bgColor: "bg-green-500/20"
    }
  ], []);

  return (
    <section className="py-8 bg-black border-y border-[#ba6a5a]/20">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {contactData.map((contact, index) => (
            <ContactCard key={index} {...contact} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickContactBar;
