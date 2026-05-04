import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { fadeUp } from '@/lib/motion';
import './Booking.css';

interface BookingProps {
  bookingSuccess: boolean;
  setBookingSuccess: (success: boolean) => void;
}

export const Booking: React.FC<BookingProps> = ({ bookingSuccess, setBookingSuccess }) => {
  return (
    <section
      id="booking"
      className="section-padding bg-[#F5F7FA] overflow-hidden gradient-overlay"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-6xl mx-auto px-6"
      >
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

          {/* LEFT CONTENT */}
          <div className="w-full lg:w-[38%] shrink-0">
            <p className="text-xs font-semibold text-[#3BAA7E] uppercase tracking-[0.15em] mb-4">
              Book a visit
            </p>

            <h2 className="text-3xl md:text-4xl font-medium text-[#0A2540] tracking-tight leading-tight mb-5">
              Request an<br />appointment
            </h2>

            <p className="text-[#4A5568] leading-relaxed mb-8">
              Fill in the form and our team will confirm your slot within a few hours.
              No waiting rooms, you'll know your time before you arrive.
            </p>

            <div className="space-y-5">
              {[
                'Confirmations sent within a few hours',
                'On-time appointments, always',
                'Mon–Sat 9 AM – 7 PM · Sun 10 AM – 2 PM',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#3BAA7E] mt-0.5 shrink-0" />
                  <p className="text-sm text-[#4A5568]">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-8 border-t border-[#E2E8F0]">
              <p className="text-sm text-[#4A5568] mb-1">Prefer to call?</p>
              <a
                href="tel:+918179299096"
                className="text-[#0A2540] font-semibold hover:text-[#3BAA7E] transition-colors"
              >
                +91 8179299096
              </a>
            </div>
          </div>

          {/* RIGHT — GLASSY WATER-DROP CARD */}
          <motion.div
            className="booking-card-wrap w-full lg:w-[60%]"
            variants={fadeUp}
          >
            <div
              className="relative rounded-2xl p-8 lg:p-12 overflow-hidden booking-card"
            >
              {/* Animated water-drop blobs */}
              <div className="water-drop-bg" aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
              </div>

              {/* Top shimmer edge */}
              <div className="water-shimmer" aria-hidden="true" />

              {/* Content sits above blobs */}
              <div className="relative z-10">
                <AnimatePresence mode="wait">
                  {!bookingSuccess ? (
                    <motion.form
                      key="form"
                      onSubmit={(e) => {
                        e.preventDefault();
                        setBookingSuccess(true);
                      }}
                      className="space-y-8"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <label className="text-base font-medium text-[#0A2540]">
                            Full Name
                          </label>
                          <Input
                            required
                            placeholder="Your full name"
                            className="bg-white/60 backdrop-blur-md border border-white/50 text-[#0A2540] placeholder:text-[#4A5568]/60 rounded-premium h-14 text-base focus-visible:border-[#3BAA7E] focus-visible:ring-[#3BAA7E]/20"
                          />
                        </div>

                        <div className="space-y-3">
                          <label className="text-base font-medium text-[#0A2540]">
                            Phone Number
                          </label>
                          <Input
                            required
                            type="tel"
                            placeholder="+91 98765 43210"
                            className="bg-white/60 backdrop-blur-md border border-white/50 text-[#0A2540] placeholder:text-[#4A5568]/60 rounded-premium h-14 text-base focus-visible:border-[#3BAA7E] focus-visible:ring-[#3BAA7E]/20"
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="text-base font-medium text-[#0A2540]">
                          Concern
                        </label>
                        <Select required>
                          <SelectTrigger className="bg-white/60 backdrop-blur-md border border-white/50 text-[#0A2540] rounded-premium h-14 text-base">
                            <SelectValue placeholder="What would you like to discuss?" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">General Consultation</SelectItem>
                            <SelectItem value="preventive">Preventive Health Checkup</SelectItem>
                            <SelectItem value="skin">Skin & Hair Care</SelectItem>
                            <SelectItem value="dental">Dental Care</SelectItem>
                            <SelectItem value="physio">Physiotherapy</SelectItem>
                            <SelectItem value="cardiac">Cardiac Evaluation</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <label className="text-base font-medium text-[#0A2540]">
                            Preferred Date
                          </label>
                          <Input
                            required
                            type="date"
                            className="bg-white/60 backdrop-blur-md border border-white/50 text-[#0A2540] rounded-premium h-14 text-base focus-visible:border-[#3BAA7E] focus-visible:ring-[#3BAA7E]/20"
                          />
                        </div>

                        <div className="space-y-3">
                          <label className="text-base font-medium text-[#0A2540]">
                            Preferred Time
                          </label>
                          <Select required>
                            <SelectTrigger className="bg-white/60 backdrop-blur-md border border-white/50 text-[#0A2540] rounded-premium h-14 text-base">
                              <SelectValue placeholder="Morning / Afternoon / Evening" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="morning">Morning — 9 AM to 12 PM</SelectItem>
                              <SelectItem value="afternoon">Afternoon — 12 PM to 4 PM</SelectItem>
                              <SelectItem value="evening">Evening — 4 PM to 7 PM</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-[#0A2540] text-white hover:bg-[#0A2540]/90 rounded-button h-16 text-lg font-semibold shadow-[0_10px_30px_rgba(10,37,64,0.2)] mt-4"
                      >
                        Confirm Request
                      </Button>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="py-16 text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                        className="w-20 h-20 bg-[#3BAA7E]/10 rounded-full flex items-center justify-center mb-8 mx-auto"
                      >
                        <CheckCircle2 className="w-10 h-10 text-[#3BAA7E]" />
                      </motion.div>

                      <h3 className="text-3xl font-heading text-[#0A2540] mb-4">
                        Request received
                      </h3>

                      <p className="text-lg text-[#4A5568] max-w-sm mx-auto leading-relaxed font-body">
                        Our team will call you shortly to confirm your appointment.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
};