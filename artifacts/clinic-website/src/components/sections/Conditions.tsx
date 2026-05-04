import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer } from '@/lib/motion';
import { Phone } from 'lucide-react';

export const Conditions: React.FC = () => {
  const conditionGroups = [
    {
      category: "General & Internal Medicine",
      items: ["Fever & infections", "Fatigue & weakness", "Anaemia", "Diabetes management", "Hypertension", "Thyroid disorders"],
    },
    {
      category: "Respiratory & Cardiac",
      items: ["Asthma & bronchitis", "Chronic cough", "Breathlessness", "Chest discomfort", "Cardiac risk evaluation", "Lipid disorders"],
    },
    {
      category: "Gastroenterology",
      items: ["Acidity & GERD", "IBS & bloating", "Constipation", "Liver function monitoring", "Weight management", "Nutritional deficiency"],
    },
    {
      category: "Skin, Hair & Dental",
      items: ["Acne & eczema", "Hair loss", "Pigmentation", "Dental hygiene", "Tooth extraction & fillings", "Gum health"],
    },
  ];

  return (
    <section className="section-padding bg-white overflow-hidden">
      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-[1200px] mx-auto px-6"
      >
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:w-[34%] shrink-0"
          >
            <p className="text-xs font-semibold text-[#3BAA7E] uppercase tracking-[0.15em] mb-4">Scope of care</p>
            <h2 className="text-3xl md:text-4xl font-medium text-[#0A2540] tracking-tight leading-tight mb-5">
              Conditions we treat
            </h2>
            <p className="text-[#4A5568] leading-relaxed mb-6">
              Verity Health handles a broad range of acute and chronic conditions. If you don't see your concern listed, call us — Dr. Mehta will tell you honestly if we can help.
            </p>
            <a href="tel:+918179299096" className="inline-flex items-center gap-2 text-[#0A2540] text-sm font-medium hover:text-[#3BAA7E] transition-colors">
              <Phone className="w-4 h-4" />
              Call to ask
            </a>
          </motion.div>

          <div className="w-full lg:w-[66%]">
            {conditionGroups.map((group, gi) => (
              <motion.div
                key={gi}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: gi * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="mb-8 last:mb-0 pb-8 last:pb-0 border-b last:border-b-0 border-[#E2E8F0]"
              >
                <p className="text-xs font-semibold text-[#0A2540] uppercase tracking-[0.12em] mb-4">{group.category}</p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="px-3.5 py-1.5 text-sm text-[#4A5568] bg-[#F5F7FA] rounded-full border border-[#E2E8F0]">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};