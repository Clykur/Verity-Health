import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { faqs } from './data';

interface FAQProps {
  active: number | null;
  setActive: (active: number | null) => void;
}

export const FAQ: React.FC<FAQProps> = ({ active, setActive }) => {
  return (
    <section id="faqs" className="section-padding bg-white overflow-hidden">
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-[1200px] mx-auto px-6"
      >
        <motion.div className="text-center mb-14">
          <p className="text-xs font-semibold text-[#3BAA7E] uppercase tracking-[0.15em] mb-3">Common Questions</p>
          <h2 className="text-3xl md:text-4xl font-medium text-[#0A2540] tracking-tight">Things patients often ask</h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, i: number) => {
            const isActive = active === i;
            return (
              <motion.div
                key={i}
                layout
                onClick={() => setActive(isActive ? null : i)}
                className="rounded-2xl p-6 cursor-pointer transition-colors bg-[#F5F7FA] hover:bg-white"
                animate={{
                  backgroundColor: isActive ? "#FFFFFF" : "#F5F7FA",
                  boxShadow: isActive ? "0 4px 12px rgba(0,0,0,0.05)" : "none"
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <motion.div layout="position" className="flex justify-between items-center gap-4">
                  <h3 className="text-base font-semibold text-[#0A2540]">{faq.q}</h3>
                  <motion.div
                    className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 relative"
                    animate={{
                      backgroundColor: isActive ? "#3BAA7E" : "rgba(59, 170, 126, 0.1)",
                      color: isActive ? "#FFFFFF" : "#3BAA7E"
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.span
                      animate={{ rotate: isActive ? 45 : 0 }}
                      className="absolute w-3.5 h-0.5 bg-current"
                    />
                    <motion.span
                      animate={{ rotate: isActive ? -45 : 90 }}
                      className="absolute w-3.5 h-0.5 bg-current"
                    />
                  </motion.div>
                </motion.div>
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="text-[#4A5568] text-sm leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};