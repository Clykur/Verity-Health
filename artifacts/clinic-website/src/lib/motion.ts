import { Variants } from "framer-motion";

export const AppName = "Verity";

export const AppDescription =
  "Verity is a modern, accessible, and secure platform for managing your health records.";

export const AppURL =
  process.env.NODE_ENV === "production"
    ? "https://verity.health"
    : "http://localhost:3000";

export const easing: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const fadeUp: Variants = {
  initial: {
    y: 30,
    opacity: 0,
    scale: 0.9,
  },
  animate: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: easing,
    },
  },
};

export const fadeIn: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export const scaleIn: Variants = {
  initial: {
    scale: 0.5,
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.9,
      ease: easing,
    },
  },
};

export const staggerContainer: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};
