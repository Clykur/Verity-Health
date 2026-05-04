import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer } from '@/lib/motion';

export const Doctor: React.FC = () => {
  return (
    <section id="doctor" className="section-padding bg-[#F5F7FA] overflow-hidden">
      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-[1200px] mx-auto px-6"
      >
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:w-[42%] shrink-0"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-[#3BAA7E]/8 to-transparent rounded-3xl blur-2xl" />
              <div className="group relative aspect-[3/4] rounded-2xl overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/6129647/pexels-photo-6129647.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Dr. Arjun Mehta — Verity Health Clinic"
                  className="w-full h-full object-cover object-top transition-transform duration-500 ease-in-out group-hover:scale-105"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-[#0A2540] text-white rounded-xl p-4 shadow-xl">
                <p className="text-2xl font-semibold tabular-nums">15+</p>
                <p className="text-xs text-white/70 mt-0.5">Years of practice</p>
              </div>
            </div>
          </motion.div>

          <div className="w-full lg:w-[58%]">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-xs font-semibold text-[#3BAA7E] uppercase tracking-[0.15em] mb-4"
            >
              Meet the doctor
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl md:text-4xl lg:text-5xl font-medium text-[#0A2540] tracking-[-0.02em] mb-2"
            >
              Dr. Arjun Mehta
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[#4A5568] font-medium mb-7"
            >
              MBBS, MD (Internal Medicine) · National Medical Commission Certified
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-[#4A5568] text-lg leading-relaxed mb-8 max-w-lg"
            >
              Dr. Mehta's practice is built on one principle: every patient should leave understanding exactly what is happening in their body and why. He avoids unnecessary investigations and focuses on practical, long-term treatment plans.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap gap-2 mb-10"
            >
              {["Internal Medicine", "Preventive Health", "Chronic Condition Care"].map((tag) => (
                <span key={tag} className="px-3.5 py-1.5 bg-white text-[#4A5568] text-sm rounded-full border border-[#E2E8F0] font-medium">
                  {tag}
                </span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="flex flex-col sm:flex-row gap-6 pt-8 border-t border-[#E2E8F0]"
            >
              <div>
                <p className="text-sm font-semibold text-[#0A2540]">Certified by</p>
                <p className="text-sm text-[#4A5568] mt-0.5">National Medical Commission</p>
              </div>
              <div className="hidden sm:block w-px bg-[#E2E8F0]" />
              <div>
                <p className="text-sm font-semibold text-[#0A2540]">Primary speciality</p>
                <p className="text-sm text-[#4A5568] mt-0.5">Internal & Preventive Medicine</p>
              </div>
              <div className="hidden sm:block w-px bg-[#E2E8F0]" />
              <div>
                <p className="text-sm font-semibold text-[#0A2540]">Patients cared</p>
                <p className="text-sm text-[#4A5568] mt-0.5">1,000+</p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};