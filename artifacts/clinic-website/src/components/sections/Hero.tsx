import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Stethoscope, Star, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { staggerContainer, fadeUp } from '@/lib/motion';
import { useScroll, useTransform } from 'framer-motion';

interface HeroProps {
  scrollTo: (id: string) => void;
  heroY: any;
  isMobile: boolean;
}

export const Hero: React.FC<HeroProps> = ({ scrollTo, heroY, isMobile }) => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-[80px] overflow-hidden noise-texture">
      {/* Abstract background shape */}
      <motion.div
        style={{ y: heroY }}
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#3BAA7E]/10 to-[#0A2540]/10 rounded-full blur-3xl opacity-60 pointer-events-none select-none"
      />
      <div className="absolute inset-0 gradient-overlay" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 w-full section-padding">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className={`flex flex-col ${isMobile ? "" : "lg:flex-row"} items-center gap-16 lg:gap-24`}
        >
          <div className="w-full lg:w-[48%] text-center lg:text-left">
            {/* Trust Badge */}
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-8 border border-[#E2E8F0]/50 shadow-premium"
            >
              <div className="w-2 h-2 bg-[#3BAA7E] rounded-full animate-pulse" />
              <span className="text-sm font-medium text-[#0A2540]">Trusted by 500+ clinics</span>
              <ArrowRight className="w-3 h-3 text-[#3BAA7E]" />
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-[clamp(2rem,5vw,4rem)] font-heading text-[#0A2540] leading-[1.1] mb-2"
            >
              Expert medical advice,
              <br />
              <span className="text-[#3BAA7E]">without the wait.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-xl text-[#4A5568] mb-12 max-w-xl leading-relaxed mx-auto lg:mx-0 font-body"
            >
              Appointments in minutes, not days. Speak with a trusted doctor from the comfort of your home.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-4 mb-16 justify-center lg:justify-start"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => scrollTo("booking")}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 whitespace-nowrap bg-[#0A2540] text-white hover:bg-[#0A2540]/90 rounded-button px-10 h-14 text-lg font-medium btn-premium shadow-premium"
              >
                <span>Book a consultation</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1 shrink-0" />
              </motion.button>
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="tel:+918179299096"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 whitespace-nowrap border border-[#E2E8F0] text-[#0A2540] hover:border-[#0A2540]/40 rounded-button px-10 h-14 text-lg font-medium transition-all duration-200 hover:bg-[#F5F7FA] btn-premium"
              >
                <Phone className="w-5 h-5 shrink-0" />
                <span>Speak to Clinic</span>
              </motion.a>
            </motion.div>
          </div>

          <motion.div
            className="w-full lg:w-[48%]"
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.9,
              delay: 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-[#3BAA7E]/15 to-[#0A2540]/10 rounded-3xl blur-2xl opacity-80" />
              <div className="group relative aspect-[3/4] sm:aspect-[4/3] lg:aspect-[16/11] xl:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-black/10">
                <img
                  src="https://images.pexels.com/photos/10826541/pexels-photo-10826541.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="Dr. Arjun Mehta at Verity Health Clinic"
                  className="w-full h-full object-cover object-top transition-transform duration-500 ease-in-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/30 via-transparent to-transparent" />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute bottom-5 left-5 right-5 bg-white/90 backdrop-blur-lg rounded-xl p-4 flex items-center gap-3 shadow-lg shadow-[#0A2540]/10"
              >
                <div className="w-10 h-10 rounded-full bg-[#3BAA7E]/15 flex items-center justify-center shrink-0">
                  <Stethoscope className="w-5 h-5 text-[#3BAA7E]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#0A2540]">
                    Dr. Arjun Mehta
                  </p>
                  <p className="text-xs text-[#4A5568]">
                    MBBS, MD — Internal Medicine
                  </p>
                </div>
                <div className="ml-auto flex">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className="w-3 h-3 fill-[#3BAA7E] text-[#3BAA7E]"
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

