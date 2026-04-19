import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, MessageCircle, Star, HeartPulse, Activity,
  Stethoscope, Smile, ShieldCheck, Bone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Facebook, Instagram, Twitter } from "lucide-react";

const FADE_UP = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const STAGGER = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [hasShownExitIntent, setHasShownExitIntent] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingSectionVisible, setBookingSectionVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const bookingEl = document.getElementById("booking");
      if (bookingEl) {
        const rect = bookingEl.getBoundingClientRect();
        setBookingSectionVisible(rect.top <= window.innerHeight && rect.bottom >= 0);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShownExitIntent) {
        setShowExitIntent(true);
        setHasShownExitIntent(true);
      }
    };
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [hasShownExitIntent]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
  };

  const handleExitIntentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowExitIntent(false);
  };

  const services = [
    { title: "General Consultation", desc: "Expert assessment and diagnosis for everyday health concerns and preventive care.", icon: <Activity className="w-5 h-5 text-[#3BAA7E]" /> },
    { title: "Preventive Health Checkups", desc: "Comprehensive screenings to maintain optimal wellness and detect issues early.", icon: <ShieldCheck className="w-5 h-5 text-[#3BAA7E]" /> },
    { title: "Skin & Hair Care", desc: "Advanced dermatology treatments for glowing, healthy skin and specialized conditions.", icon: <Smile className="w-5 h-5 text-[#3BAA7E]" /> },
    { title: "Dental Care", desc: "Complete oral health services from routine checkups to complex procedures.", icon: <Smile className="w-5 h-5 text-[#3BAA7E]" /> },
    { title: "Physiotherapy", desc: "Personalized rehabilitation programs to restore movement and reduce pain.", icon: <Bone className="w-5 h-5 text-[#3BAA7E]" /> },
    { title: "Cardiac Evaluation", desc: "Heart health monitoring, diagnostics, and chronic condition management.", icon: <HeartPulse className="w-5 h-5 text-[#3BAA7E]" /> }
  ];

  const testimonials = [
    { name: "Priya S.", text: "Clear explanation, no rush, and very reassuring." },
    { name: "Rahul V.", text: "Appointments are smooth and on time. Felt heard." },
    { name: "Ananya K.", text: "Dr. Mehta explained everything carefully. No unnecessary tests." },
    { name: "Suresh M.", text: "The clinic feels calm and the staff is genuinely helpful." }
  ];

  return (
    <div className="min-h-[100dvh] bg-white font-sans text-[#0A2540] selection:bg-[#E2E8F0] overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-[#E2E8F0]" : "bg-transparent"}`}>
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-semibold tracking-tight text-[#0A2540]">Verity Health</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#3BAA7E]"></span>
          </div>
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-[#4A5568]">
            <button onClick={() => scrollTo("home")} className="hover:text-[#0A2540] transition-colors">Home</button>
            <button onClick={() => scrollTo("services")} className="hover:text-[#0A2540] transition-colors">Services</button>
            <button onClick={() => scrollTo("doctor")} className="hover:text-[#0A2540] transition-colors">Doctor</button>
            <button onClick={() => scrollTo("contact")} className="hover:text-[#0A2540] transition-colors">Contact</button>
            <Button onClick={() => scrollTo("booking")} className="bg-[#0A2540] text-white hover:bg-[#0A2540]/90 rounded-full px-6 transition-colors">Book Appointment</Button>
          </div>
          <button className="md:hidden text-[#0A2540]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden">
            <div className="flex flex-col space-y-6 text-lg font-medium text-[#4A5568]">
              <button onClick={() => scrollTo("home")} className="text-left py-2 border-b border-[#E2E8F0]">Home</button>
              <button onClick={() => scrollTo("services")} className="text-left py-2 border-b border-[#E2E8F0]">Services</button>
              <button onClick={() => scrollTo("doctor")} className="text-left py-2 border-b border-[#E2E8F0]">Doctor</button>
              <button onClick={() => scrollTo("contact")} className="text-left py-2 border-b border-[#E2E8F0]">Contact</button>
              <Button onClick={() => scrollTo("booking")} className="w-full bg-[#0A2540] text-white rounded-full mt-4 h-12">Book Appointment</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <motion.div initial="hidden" animate="visible" variants={STAGGER} className="w-full lg:w-1/2">
              <motion.div variants={FADE_UP} className="inline-flex items-center space-x-2 bg-[#F5F7FA] rounded-full px-3 py-1 mb-6 border border-[#E2E8F0]">
                <span className="w-2 h-2 rounded-full bg-[#3BAA7E]"></span>
                <span className="text-xs font-medium text-[#4A5568] tracking-wide">Accepting New Patients</span>
              </motion.div>
              <motion.h1 variants={FADE_UP} className="text-4xl md:text-5xl lg:text-6xl font-medium text-[#0A2540] leading-[1.1] mb-6 tracking-tight">
                Care that listens. Treatment that works.
              </motion.h1>
              <motion.p variants={FADE_UP} className="text-lg text-[#4A5568] mb-10 max-w-xl leading-relaxed">
                A modern clinic in Bangalore focused on accurate diagnosis, thoughtful treatment, and long-term well-being.
              </motion.p>
              <motion.div variants={FADE_UP} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-12">
                <Button onClick={() => scrollTo("booking")} className="w-full sm:w-auto bg-[#0A2540] text-white hover:bg-[#0A2540]/90 rounded-full px-8 py-6 text-base shadow-sm">
                  Book Appointment
                </Button>
                <Button variant="outline" className="w-full sm:w-auto border-[#0A2540] text-[#0A2540] hover:bg-[#F5F7FA] rounded-full px-8 py-6 text-base" onClick={() => scrollTo("contact")}>
                  Speak to Clinic
                </Button>
              </motion.div>
              <motion.div variants={FADE_UP} className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-8 border-t border-[#E2E8F0]">
                <div className="text-sm text-[#4A5568]">
                  <span className="block font-semibold text-[#0A2540] mb-1">10,000+</span>
                  Consultations
                </div>
                <div className="text-sm text-[#4A5568]">
                  <span className="block font-semibold text-[#0A2540] mb-1">15+ Years</span>
                  Experience
                </div>
                <div className="text-sm text-[#4A5568]">
                  <span className="block font-semibold text-[#0A2540] mb-1">Evidence-Based</span>
                  Treatments
                </div>
              </motion.div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: "easeOut" }} className="w-full lg:w-1/2">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                <img src="https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Clinic Interior" className="w-full h-full object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Appointment Form */}
      <section id="booking" className="py-24 bg-[#F5F7FA]">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="text-sm font-medium text-[#3BAA7E] uppercase tracking-wider mb-2">Quick Appointment</div>
            <h2 className="text-3xl md:text-4xl font-medium text-[#0A2540] mb-4">Request a Visit</h2>
            <p className="text-[#4A5568]">We'll confirm your appointment within a few hours.</p>
          </div>

          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-[#E2E8F0]">
            {!bookingSuccess ? (
              <form onSubmit={handleBookingSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#0A2540]">Full Name</label>
                    <Input required placeholder="Your full name" className="bg-[#F5F7FA] border-transparent focus-visible:border-[#3BAA7E] focus-visible:ring-[#3BAA7E] rounded-lg h-12" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#0A2540]">Phone Number</label>
                    <Input required type="tel" placeholder="+91" className="bg-[#F5F7FA] border-transparent focus-visible:border-[#3BAA7E] focus-visible:ring-[#3BAA7E] rounded-lg h-12" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#0A2540]">Concern</label>
                  <Select required>
                    <SelectTrigger className="bg-[#F5F7FA] border-transparent focus:ring-[#3BAA7E] rounded-lg h-12 text-[#4A5568]">
                      <SelectValue placeholder="Select a service" />
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
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#0A2540]">Preferred Date</label>
                    <Input required type="date" className="bg-[#F5F7FA] border-transparent focus-visible:border-[#3BAA7E] focus-visible:ring-[#3BAA7E] rounded-lg h-12 text-[#4A5568]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#0A2540]">Preferred Time</label>
                    <Select required>
                      <SelectTrigger className="bg-[#F5F7FA] border-transparent focus:ring-[#3BAA7E] rounded-lg h-12 text-[#4A5568]">
                        <SelectValue placeholder="Select timeframe" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="morning">Morning (9–12)</SelectItem>
                        <SelectItem value="afternoon">Afternoon (12–4)</SelectItem>
                        <SelectItem value="evening">Evening (4–7)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button type="submit" className="w-full bg-[#0A2540] text-white hover:bg-[#0A2540]/90 rounded-lg h-12 text-base font-medium mt-4">
                  Request Appointment
                </Button>
              </form>
            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-12 text-center">
                <div className="w-16 h-16 bg-[#3BAA7E]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Stethoscope className="w-8 h-8 text-[#3BAA7E]" />
                </div>
                <h3 className="text-2xl font-medium text-[#0A2540] mb-2">Request Received</h3>
                <p className="text-[#4A5568]">Our team will contact you shortly to confirm your visit.</p>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Doctor Section */}
      <section id="doctor" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="w-full lg:w-5/12">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-[#F5F7FA]">
                <img src="https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Dr. Arjun Mehta" className="w-full h-full object-cover" />
              </div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={STAGGER} className="w-full lg:w-7/12">
              <motion.h2 variants={FADE_UP} className="text-3xl md:text-4xl font-medium text-[#0A2540] mb-2">Dr. Arjun Mehta</motion.h2>
              <motion.p variants={FADE_UP} className="text-[#4A5568] font-medium mb-6">MBBS, MD (Internal Medicine)</motion.p>
              <motion.p variants={FADE_UP} className="text-[#4A5568] leading-relaxed text-lg mb-8">
                Dr. Mehta focuses on clear diagnosis and practical treatment plans. His approach prioritizes patient understanding, preventive care, and long-term health outcomes.
              </motion.p>
              <motion.div variants={FADE_UP} className="flex flex-wrap gap-2 mb-8">
                {["Internal Medicine", "Preventive Health", "Chronic Condition Care"].map((tag, i) => (
                  <span key={i} className="px-3 py-1 bg-[#F5F7FA] text-[#4A5568] text-sm rounded-md border border-[#E2E8F0]">
                    {tag}
                  </span>
                ))}
              </motion.div>
              <motion.div variants={FADE_UP} className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-[#E2E8F0]">
                <div>
                  <p className="font-semibold text-[#0A2540] mb-1">15+ Years</p>
                  <p className="text-sm text-[#4A5568]">Experience</p>
                </div>
                <div>
                  <p className="font-semibold text-[#0A2540] mb-1">NMC Certified</p>
                  <p className="text-sm text-[#4A5568]">Medical Commission</p>
                </div>
                <div>
                  <p className="font-semibold text-[#0A2540] mb-1">1,000+</p>
                  <p className="text-sm text-[#4A5568]">Patients</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-[#F5F7FA]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-medium text-[#0A2540] mb-4">What We Treat</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }}>
                <div className="bg-white p-8 rounded-xl border border-[#E2E8F0] hover:-translate-y-0.5 hover:shadow-md transition-all duration-300 h-full flex flex-col">
                  <div className="mb-4 bg-[#F5F7FA] w-12 h-12 rounded-lg flex items-center justify-center">
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-medium text-[#0A2540] mb-3">{service.title}</h3>
                  <p className="text-[#4A5568] leading-relaxed text-sm flex-grow">{service.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Clinic Space Section */}
      <section className="py-24 bg-white border-t border-[#E2E8F0]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl mb-12">
            <h2 className="text-3xl md:text-4xl font-medium text-[#0A2540] mb-4">A space designed for comfort and clarity</h2>
            <p className="text-[#4A5568] leading-relaxed text-lg">
              Our clinic is designed to reduce stress and support focused care — quiet interiors, modern diagnostics, and a patient-first environment.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#F5F7FA]">
              <img src="https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Clinic Interior 1" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#F5F7FA]">
              <img src="https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Clinic Interior 2" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Patient Feedback Section */}
      <section className="py-24 bg-[#F5F7FA]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-medium text-[#0A2540]">What Patients Say</h2>
          </div>
          
          <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-6 pb-8 -mx-6 px-6 md:mx-0 md:px-0">
            {testimonials.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }} className="min-w-[280px] md:min-w-[320px] snap-start bg-white p-8 rounded-xl border border-[#E2E8F0] shadow-xs">
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-4 h-4 text-[#3BAA7E] fill-[#3BAA7E] mr-0.5" />)}
                </div>
                <p className="text-[#0A2540] text-lg mb-6 leading-relaxed">"{t.text}"</p>
                <p className="text-[#4A5568] text-sm font-medium">— {t.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-medium text-[#0A2540]">Common Questions</h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-[#E2E8F0] py-2">
              <AccordionTrigger className="text-lg font-medium text-[#0A2540] hover:text-[#0A2540] hover:no-underline">How do appointments work?</AccordionTrigger>
              <AccordionContent className="text-[#4A5568] text-base leading-relaxed pb-4">
                You can book online or by phone. We'll confirm within a few hours and send you timing details.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border-[#E2E8F0] py-2">
              <AccordionTrigger className="text-lg font-medium text-[#0A2540] hover:text-[#0A2540] hover:no-underline">What are consultation timings?</AccordionTrigger>
              <AccordionContent className="text-[#4A5568] text-base leading-relaxed pb-4">
                Mon–Sat: 9 AM to 7 PM. Sundays: limited hours, 10 AM to 2 PM.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border-[#E2E8F0] py-2">
              <AccordionTrigger className="text-lg font-medium text-[#0A2540] hover:text-[#0A2540] hover:no-underline">Do I need to bring prior reports?</AccordionTrigger>
              <AccordionContent className="text-[#4A5568] text-base leading-relaxed pb-4">
                If you have recent test results or prescriptions, please bring them. It helps us understand your history better.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="border-[#E2E8F0] py-2">
              <AccordionTrigger className="text-lg font-medium text-[#0A2540] hover:text-[#0A2540] hover:no-underline">Is follow-up required after treatment?</AccordionTrigger>
              <AccordionContent className="text-[#4A5568] text-base leading-relaxed pb-4">
                For most conditions, yes. Dr. Mehta will advise based on your specific case.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5" className="border-[#E2E8F0] py-2">
              <AccordionTrigger className="text-lg font-medium text-[#0A2540] hover:text-[#0A2540] hover:no-underline">What conditions does the clinic handle?</AccordionTrigger>
              <AccordionContent className="text-[#4A5568] text-base leading-relaxed pb-4">
                We handle general medicine, preventive care, chronic conditions, skin, dental, cardiac evaluations, and physiotherapy.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Location & Contact */}
      <section id="contact" className="py-24 bg-[#F5F7FA]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={STAGGER}>
              <motion.h2 variants={FADE_UP} className="text-3xl md:text-4xl font-medium text-[#0A2540] mb-8">Find Us in Bangalore</motion.h2>
              <div className="space-y-8">
                <motion.div variants={FADE_UP}>
                  <h4 className="text-sm font-semibold text-[#0A2540] uppercase tracking-wider mb-2">Address</h4>
                  <p className="text-[#4A5568] text-lg">Bangalore, Karnataka, India</p>
                </motion.div>
                <motion.div variants={FADE_UP}>
                  <h4 className="text-sm font-semibold text-[#0A2540] uppercase tracking-wider mb-2">Phone</h4>
                  <p className="text-[#4A5568] text-lg">+91 8179299096</p>
                </motion.div>
                <motion.div variants={FADE_UP}>
                  <h4 className="text-sm font-semibold text-[#0A2540] uppercase tracking-wider mb-2">Hours</h4>
                  <p className="text-[#4A5568] text-lg">Mon–Sat: 9 AM – 7 PM<br/>Sunday: 10 AM – 2 PM</p>
                </motion.div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="rounded-2xl overflow-hidden shadow-sm border border-[#E2E8F0] h-[400px] lg:h-auto min-h-[400px]">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1p3!2d77.5946!3d12.9716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBangalore%2C%20Karnataka%2C%20India!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Clinic Location"
              ></iframe>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A2540] text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center text-center md:text-left mb-12">
            <div>
              <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
                <span className="text-xl font-semibold tracking-tight text-white">Verity Health</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#3BAA7E]"></span>
              </div>
              <p className="text-white/70 text-sm">Thoughtful Medicine. Trusted Care.</p>
            </div>
            <div className="flex justify-center space-x-6 text-sm">
              <button onClick={() => scrollTo("home")} className="hover:text-white/70 transition-colors">Home</button>
              <button onClick={() => scrollTo("services")} className="hover:text-white/70 transition-colors">Services</button>
              <button onClick={() => scrollTo("doctor")} className="hover:text-white/70 transition-colors">Doctor</button>
              <button onClick={() => scrollTo("contact")} className="hover:text-white/70 transition-colors">Contact</button>
            </div>
            <div className="flex justify-center md:justify-end space-x-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>
          <div className="text-center border-t border-white/10 pt-8 text-white/50 text-sm">
            © 2025 Verity Health Clinic. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/918179299096" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform z-50 animate-[pulse_2s_infinite]"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </a>

      {/* Sticky Bottom CTA (Mobile primarily) */}
      <AnimatePresence>
        {!bookingSectionVisible && (
          <motion.div 
            initial={{ y: 100 }} 
            animate={{ y: 0 }} 
            exit={{ y: 100 }} 
            className="fixed bottom-0 left-0 right-0 p-4 bg-[#0A2540]/95 backdrop-blur-md border-t border-white/10 z-40 md:hidden flex justify-center"
          >
            <Button onClick={() => scrollTo("booking")} className="w-full max-w-sm bg-[#3BAA7E] text-white hover:bg-[#3BAA7E]/90 h-12 rounded-lg font-medium text-base">
              Book an Appointment
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Exit Intent Popup */}
      <AnimatePresence>
        {showExitIntent && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-50 bg-[#0A2540]/40 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.95, opacity: 0 }} 
              className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full relative"
            >
              <button onClick={() => setShowExitIntent(false)} className="absolute top-4 right-4 text-[#4A5568] hover:text-[#0A2540]">
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-2xl font-medium text-[#0A2540] mb-2">Get a Free Consultation</h3>
              <p className="text-[#4A5568] mb-6">Leave your number and we'll call you back.</p>
              <form onSubmit={handleExitIntentSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Input required placeholder="Name" className="bg-[#F5F7FA] border-transparent focus-visible:border-[#3BAA7E] focus-visible:ring-[#3BAA7E] rounded-lg h-12" />
                </div>
                <div className="space-y-2">
                  <Input required type="tel" placeholder="Phone Number" className="bg-[#F5F7FA] border-transparent focus-visible:border-[#3BAA7E] focus-visible:ring-[#3BAA7E] rounded-lg h-12" />
                </div>
                <Button type="submit" className="w-full bg-[#0A2540] text-white hover:bg-[#0A2540]/90 rounded-lg h-12 text-base font-medium mt-2">
                  Request Callback
                </Button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
