import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer } from '@/lib/motion';

export const Clinic: React.FC = () => {
  return (
    <section className="section-padding bg-white overflow-hidden">
      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-[1200px] mx-auto px-6"
      >
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:w-[45%] shrink-0"
          >
            <p className="text-xs font-semibold text-[#3BAA7E] uppercase tracking-[0.15em] mb-4">The clinic</p>
            <h2 className="text-3xl md:text-4xl font-medium text-[#0A2540] tracking-tight leading-tight mb-6">
              Designed for comfort.<br />Built for clarity.
            </h2>
            <p className="text-[#4A5568] text-lg leading-relaxed mb-8">
              Our clinic reduces the anxiety that often accompanies medical visits, through quiet interiors, private rooms, and a process designed around the patient, not the schedule.
            </p>
            <div className="space-y-4">
              {["Modern diagnostic equipment on-site", "Private consultation rooms", "Minimal wait times by appointment"].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#3BAA7E] shrink-0" />
                  <p className="text-[#4A5568] text-sm">{item}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="w-full lg:w-[55%] grid grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="group aspect-[3/4] rounded-xl overflow-hidden"
            >
              <img src="https://images.pexels.com/photos/5619462/pexels-photo-5619462.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Clinic interior" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group aspect-[3/4] rounded-xl overflow-hidden mt-10"
            >
              <img src="https://images.pexels.com/photos/33812023/pexels-photo-33812023.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Clinic corridor" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};