import React from 'react';
import { services, type Service } from './data';

export const Services: React.FC = () => {
  return (
    <section id="services" className="section-padding relative overflow-hidden bg-gradient-to-br from-[#F8FAFC] via-white to-[#EEF2F7]">
      <div className="max-w-[1200px] mx-auto px-6">

        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <p className="text-xs font-semibold text-[#3BAA7E] uppercase tracking-[0.15em] mb-3">
            Services
          </p>

          <h2 className="text-3xl md:text-4xl font-medium text-[#0A2540] leading-tight mb-4">
            Care designed around your health
          </h2>

          <p className="text-[#4A5568] leading-relaxed">
            Evidence-based treatments across general medicine, dental care, physiotherapy, and preventive health.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 border border-[#E2E8F0] rounded-2xl overflow-hidden">

          {services.map((service: Service, i: number) => (
            <div
              key={i}
              className="p-8 bg-white border-b border-r border-[#E2E8F0] 
          last:border-r-0 md:nth-[2n]:border-r-0 lg:nth-[3n]:border-r-0"
            >
              {/* Icon */}
              <div className="w-10 h-10 rounded-lg bg-[#3BAA7E]/10 flex items-center justify-center mb-5 text-[#3BAA7E]">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-[#0A2540] mb-2">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-[#4A5568] leading-relaxed">
                {service.desc}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

