import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeUp, fadeIn } from '@/lib/motion';
import { whyUs, type WhyUsItem } from './data';

export const WhyUs: React.FC = () => {
  return (
    <section id="why-us" className="py-24 bg-[#F5F7FA] overflow-hidden">
      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-6xl mx-auto px-6"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <motion.div variants={fadeUp} className="mb-8">
              <p className="text-xs font-semibold text-[#3BAA7E] uppercase tracking-[0.15em] mb-3">The Verity Difference</p>
              <h2 className="text-3xl md:text-4xl font-medium text-[#0A2540] tracking-tight">Why Patients Choose Us</h2>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {whyUs.map((item: WhyUsItem, i: number) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={fadeUp}
                  className="rounded-xl bg-white p-6 shadow-sm"
                >
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-[#3BAA7E]/10">
                    {item.icon}
                  </div>
                  <h3 className="mb-1 text-base font-semibold text-[#0A2540]">{item.title}</h3>
                  <p className="text-sm text-[#4A5568] leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
          <motion.div
            variants={fadeIn}
            className="group order-1 lg:order-2 relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-xl shadow-black/10"
          >
            <img
              src="https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Clinic Interior"
              className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/40 to-transparent" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};