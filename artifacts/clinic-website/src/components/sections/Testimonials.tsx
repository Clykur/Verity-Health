import React from 'react';
import { Star, User } from 'lucide-react';
import { testimonials, type Testimonial } from './data';

export const Testimonials: React.FC = () => {
  const doubled = [...testimonials, ...testimonials];

  return (
    <section className="section-padding bg-[#F5F7FA] overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-[#E2E8F0]/50 shadow-premium">
            <Star className="w-4 h-4 text-[#3BAA7E]" />
            <span className="text-sm font-semibold text-[#0A2540]">Patient Stories</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-medium text-[#0A2540] tracking-tight">
            Heard from our patients
          </h2>
          <p className="text-xl text-[#4A5568] font-body max-w-2xl mx-auto leading-relaxed">
            Real experiences from people who've experienced our care firsthand.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative overflow-hidden">
          {/* Left fade mask */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-[#F5F7FA] to-transparent" />
          {/* Right fade mask */}
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-[#F5F7FA] to-transparent" />

          {/* Scrolling track */}
          <div
            className="flex gap-6 w-max"
            style={{
              animation: 'testimonial-scroll 32s linear infinite',
            }}
            onMouseEnter={e => (e.currentTarget.style.animationPlayState = 'paused')}
            onMouseLeave={e => (e.currentTarget.style.animationPlayState = 'running')}
          >
            {doubled.map((t: Testimonial, i: number) => (
              <div
                key={i}
                className="w-[340px] flex-shrink-0 card-premium p-8 flex flex-col relative overflow-hidden"
              >
                {/* Background quotation mark */}
                <div className="absolute top-4 right-5 text-7xl text-[#3BAA7E]/10 font-serif leading-none select-none pointer-events-none">
                  "
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {[...Array(t.stars)].map((_, s) => (
                    <Star key={s} className="w-4 h-4 fill-[#3BAA7E] text-[#3BAA7E]" />
                  ))}
                </div>

                {/* Quote text */}
                <p className="font-serif italic text-lg leading-relaxed text-[#0A2540] mb-6 flex-grow relative z-10">
                  {t.text}
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 mt-auto relative z-10">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3BAA7E]/10 to-[#0A2540]/10 flex-shrink-0 flex items-center justify-center shadow-premium">
                    <User className="w-5 h-5 text-[#3BAA7E]" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-[#0A2540]">{t.name}</p>
                    <p className="text-xs text-[#4A5568]">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Keyframe injection */}
      <style>{`
        @keyframes testimonial-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};