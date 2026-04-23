import { motion, easeOut } from "framer-motion";
import React from "react";

export const magneticIcon = {
  rest: { scale: 1 },
  hover: { scale: 1.1, transition: { duration: 0.2, ease: easeOut } },
};

export const HoverLiftCard = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <motion.div
    whileHover={{ y: -8, boxShadow: "var(--shadow-lg)" }}
    transition={{ duration: 0.3, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

export const MotionButton = motion.button;
export const MotionCard = motion.div;
export const MotionH1 = motion.h1;
export const MotionP = motion.p;
export const MotionDiv = motion.div;
export const MotionLink = motion.a;

export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

export const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

export const FadeInSection = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    variants={fadeIn}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.25 }}
  >
    {children}
  </motion.div>
);
