import { motion } from "framer-motion";

export const JourneyVisual = ({ progress }: { progress: any }) => {
  return (
    <svg viewBox="0 0 100 400" className="w-full h-auto">
      <motion.path
        d="M 50 0 V 400"
        stroke="rgba(10, 37, 64, 0.1)"
        strokeWidth="2"
        strokeDasharray="0 1"
        style={{ pathLength: progress }}
      />
      <motion.path
        d="M 50 0 V 400"
        stroke="#3BAA7E"
        strokeWidth="2"
        strokeDasharray="1 1"
        style={{ pathLength: progress }}
      />
    </svg>
  );
};
