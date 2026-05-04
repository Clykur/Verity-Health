import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer, fadeUp } from '@/lib/motion';
import { steps, type Step } from './data';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const goTo = (n: number) => setActiveStep(n);
  const prev = () => setActiveStep((s) => Math.max(0, s - 1));
  const next = () => setActiveStep((s) => Math.min(steps.length - 1, s + 1));

  return (
    <section className="py-24 bg-[#F5F7FA] overflow-hidden">
      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: '-100px' }}
        className="max-w-6xl mx-auto px-6"
      >
        {/* Header */}
        <motion.div variants={fadeUp} className="mb-14">
          <p className="text-xs font-semibold text-[#3BAA7E] uppercase tracking-[0.15em] mb-3">
            The process
          </p>
          <h2 className="text-3xl md:text-4xl font-medium text-[#0A2540] tracking-tight">
            How a visit works
          </h2>
        </motion.div>

        {/* Dot + connector progress bar */}
        <motion.div variants={fadeUp} className="flex items-center gap-3 mb-10">
          {steps.map((_, i) => (
            <React.Fragment key={i}>
              <button
                onClick={() => goTo(i)}
                className="w-3 h-3 rounded-full flex-shrink-0 transition-all duration-300 focus:outline-none"
                style={{
                  background:
                    i <= activeStep ? '#3BAA7E' : 'transparent',
                  border: '1.5px solid',
                  borderColor: i <= activeStep ? '#3BAA7E' : '#CBD5E0',
                  opacity: i < activeStep ? 0.5 : 1,
                }}
                aria-label={`Go to step ${i + 1}`}
              />
              {i < steps.length - 1 && (
                <div className="flex-1 h-[2px] bg-[#E2E8F0] relative overflow-hidden rounded-full">
                  <motion.div
                    className="absolute left-0 top-0 h-full bg-[#3BAA7E] rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: i < activeStep ? '100%' : '0%' }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </motion.div>

        {/* Step cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {steps.map((step: Step, i: number) => {
            const isActive = activeStep === i;
            const isDone = i < activeStep;

            return (
              <motion.div
                key={i}
                animate={{
                  opacity: isActive ? 1 : 0.45,
                  y: isActive ? 0 : 6,
                  borderColor: isActive ? '#3BAA7E' : 'rgba(226,232,240,0.8)',
                  backgroundColor: isActive ? '#FFFFFF' : 'transparent',
                }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl p-7 border cursor-pointer"
                onClick={() => goTo(i)}
              >
                {/* Icon + step number */}
                <div className="flex items-center gap-3 mb-5">
                  <motion.div
                    animate={{
                      backgroundColor: isActive
                        ? '#3BAA7E'
                        : 'rgba(59,170,126,0.1)',
                    }}
                    transition={{ duration: 0.3 }}
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  >
                    <step.Icon
                      className="w-5 h-5 transition-colors duration-300"
                      style={{ color: isActive ? '#ffffff' : '#3BAA7E' }}
                      strokeWidth={isActive ? 2.5 : 2}
                    />
                  </motion.div>
                  <span className="text-[11px] font-semibold text-[#4A5568] uppercase tracking-widest tabular-nums">
                    {step.num}
                  </span>
                </div>

                {/* Text */}
                <h3
                  className="text-base font-semibold mb-2 transition-colors duration-300"
                  style={{ color: isActive ? '#0A2540' : '#718096' }}
                >
                  {step.title}
                </h3>
                <p className="text-[#718096] text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Navigation */}
        <motion.div
          variants={fadeUp}
          className="flex items-center justify-between"
        >
          <button
            onClick={prev}
            disabled={activeStep === 0}
            className="px-5 py-2 text-sm rounded-xl text-[#0A2540] hover:bg-[#F5F7FA] transition disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft/>
          </button>

          <span className="text-sm text-[#718096]">
            Step {activeStep + 1} of {steps.length}
          </span>

          <button
            onClick={next}
            disabled={activeStep === steps.length - 1}
            className="px-5 py-2 text-sm rounded-xl text-[#0A2540] hover:bg-[#F5F7FA] transition disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight/>
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};