import React, { useState } from "react";
import Navbar from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Services } from "@/components/sections/Services";
import { Booking } from "@/components/sections/Booking";
import { Doctor } from "@/components/sections/Doctor";
import { WhyUs } from "@/components/sections/WhyUs";
import { Clinic } from "@/components/sections/Clinic";
import { Testimonials } from "@/components/sections/Testimonials";
import { Conditions } from "@/components/sections/Conditions";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

import { useLenis } from "@/hooks/useLenis";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";

export default function Home() {
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const { scrollY, scrollYProgress } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (previous !== undefined && latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  useLenis(true);

  const scrollYProgressSpring = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 90,
  });

  const heroY = useTransform(scrollYProgress, [0, 0.3], ["0%", "12%"]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-[100dvh] bg-white font-sans text-[#0A2540] overflow-x-hidden">
      
      {/* Scroll progress */}
      <motion.div
        className="fixed top-0 left-0 h-[2px] bg-[#3BAA7E] z-[60] origin-left"
        style={{ scaleX: scrollYProgressSpring }}
      />

      {/* Sections */}
      <Navbar
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        hidden={hidden}
        scrollTo={scrollTo}
      />

      <Hero scrollTo={scrollTo} heroY={heroY} isMobile={isMobile} />

      <HowItWorks />
      <Services />

      <Booking
        bookingSuccess={bookingSuccess}
        setBookingSuccess={setBookingSuccess}
      />

      <Doctor />

      <WhyUs />

      <Clinic />

      <Testimonials />

      <Conditions />

      <FAQ active={activeFaq} setActive={setActiveFaq} />

      <Contact />

      <Footer />
    </div>
  );
}