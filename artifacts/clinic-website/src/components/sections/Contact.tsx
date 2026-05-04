import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-[#F5F7FA] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs font-semibold text-[#3BAA7E] uppercase tracking-[0.15em] mb-4">Find us</p>
            <h2 className="text-3xl md:text-4xl font-medium text-[#0A2540] tracking-tight mb-10">Located in Bangalore</h2>
            <div className="space-y-7">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/70 backdrop-blur-md border border-white/40
shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-[#3BAA7E]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#0A2540] mb-0.5">Address</p>
                  <p className="text-[#4A5568]">Bangalore, Karnataka, India</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/70 backdrop-blur-md border border-white/40
shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-[#3BAA7E]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#0A2540] mb-0.5">Phone</p>
                  <a href="tel:+918179299096" className="text-[#4A5568] hover:text-[#0A2540] transition-colors">+91 81 7929 9096</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/70 backdrop-blur-md border border-white/40
shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-[#3BAA7E]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#0A2540] mb-0.5">Hours</p>
                  <p className="text-[#4A5568]">Mon–Sat: 9:00 AM – 7:00 PM</p>
                  <p className="text-[#4A5568] text-sm mt-0.5">Sunday: 10:00 AM – 2:00 PM</p>
                </div>
              </div>
            </div>
            <div className="mt-10">
              <Button className="bg-[#0A2540] text-white hover:bg-[#0A2540]/90 rounded-full px-8 h-11 text-sm font-medium transition-all duration-200 hover:shadow-md">
                Book a visit
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-sm"
            style={{ minHeight: 380 }}
          >
            <iframe
              title="Verity Health Clinic – Bangalore"
              src="https://www.openstreetmap.org/export/embed.html?bbox=77.5146%2C12.9116%2C77.6746%2C13.0316&layer=mapnik&marker=12.9716%2C77.5946"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 380, display: "block" }}
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

