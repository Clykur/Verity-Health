import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView, useMotionValue, useSpring } from "framer-motion";
import {
  Menu, X, MessageCircle, Star, HeartPulse, Activity,
  Stethoscope, Smile, ShieldCheck, Bone, Phone, MapPin, Clock,
  Facebook, Instagram, Twitter, ArrowRight, Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

function useCountUp(target: number, isInView: boolean, duration = 1.8) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = target / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);
  return count;
}

const services = [
  { num: "01", title: "General Consultation", desc: "Thorough assessment, accurate diagnosis, and clear guidance for everyday and complex health concerns.", icon: <Activity className="w-5 h-5" /> },
  { num: "02", title: "Preventive Health Checkups", desc: "Comprehensive screenings designed to stay ahead of potential conditions before they become problems.", icon: <ShieldCheck className="w-5 h-5" /> },
  { num: "03", title: "Skin & Hair Care", desc: "Clinical dermatology for conditions that affect how you look and feel — treated with precision.", icon: <Eye className="w-5 h-5" /> },
  { num: "04", title: "Dental Care", desc: "Full-spectrum oral health services, from preventive hygiene to complex restorative treatment.", icon: <Smile className="w-5 h-5" /> },
  { num: "05", title: "Physiotherapy", desc: "Structured rehabilitation and movement programs for recovery, pain relief, and long-term mobility.", icon: <Bone className="w-5 h-5" /> },
  { num: "06", title: "Cardiac Evaluation", desc: "Heart health diagnostics and monitoring for early detection and ongoing condition management.", icon: <HeartPulse className="w-5 h-5" /> },
];

const testimonials = [
  { name: "Priya S.", role: "Patient since 2021", text: "For the first time in years, I felt genuinely listened to. No rush, no shortcuts — just a clear explanation of what was happening and why.", stars: 5 },
  { name: "Rahul V.", role: "Patient since 2022", text: "Every appointment has been on time. The process is smooth, and you never feel like a number here.", stars: 5 },
  { name: "Ananya K.", role: "Patient since 2020", text: "Dr. Mehta explained my condition in plain language. No unnecessary tests, no vague advice. Just clarity.", stars: 5 },
  { name: "Suresh M.", role: "Patient since 2023", text: "The environment itself is calming. The staff are warm without being performative. Exactly what a clinic should feel like.", stars: 5 },
];

const faqs = [
  { q: "How do appointments work?", a: "You can book online or call us directly. We confirm your slot within a few hours and send you a reminder the day before." },
  { q: "What are consultation timings?", a: "Monday through Saturday, 9 AM to 7 PM. Sundays are available for limited hours — 10 AM to 2 PM." },
  { q: "Do I need to bring prior reports?", a: "If you have recent test results, prescriptions, or discharge summaries, please bring them. It gives us a much clearer starting point." },
  { q: "Is follow-up required after treatment?", a: "It depends on your condition. Dr. Mehta will tell you directly whether and when to return — no unnecessary visits." },
  { q: "What conditions does the clinic handle?", a: "We cover general medicine, preventive care, chronic conditions, skin and dental health, cardiac evaluations, and physiotherapy." },
];

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [hasShownExitIntent, setHasShownExitIntent] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingSectionVisible, setBookingSectionVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" });

  const consultCount = useCountUp(10000, statsInView);
  const yearsCount = useCountUp(15, statsInView);
  const patientsCount = useCountUp(1000, statsInView);

  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], ["0%", "12%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 60);
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      setScrollProgress(totalHeight > 0 ? (scrollY / totalHeight) * 100 : 0);
      const bookingEl = document.getElementById("booking");
      if (bookingEl) {
        const rect = bookingEl.getBoundingClientRect();
        setBookingSectionVisible(rect.top <= window.innerHeight && rect.bottom >= 0);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShownExitIntent) {
        setTimeout(() => { setShowExitIntent(true); setHasShownExitIntent(true); }, 400);
      }
    };
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [hasShownExitIntent]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-[100dvh] bg-white font-sans text-[#0A2540] overflow-x-hidden">

      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 h-[2px] bg-[#3BAA7E] z-[60] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? "bg-white/90 backdrop-blur-xl shadow-[0_1px_0_rgba(10,37,64,0.08)]" : "bg-transparent"}`}>
        <div className="max-w-6xl mx-auto px-6 h-[72px] flex items-center justify-between">
          <button onClick={() => scrollTo("home")} className="flex items-center gap-2 group">
            <span className="text-lg font-semibold tracking-tight text-[#0A2540]">Verity Health</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#3BAA7E] group-hover:scale-125 transition-transform duration-300" />
          </button>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#4A5568]">
            {[["home","Home"],["services","Services"],["doctor","Doctor"],["contact","Contact"]].map(([id, label]) => (
              <button key={id} onClick={() => scrollTo(id)} className="relative hover:text-[#0A2540] transition-colors duration-200 group">
                {label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#3BAA7E] group-hover:w-full transition-all duration-300" />
              </button>
            ))}
            <Button onClick={() => scrollTo("booking")} className="bg-[#0A2540] text-white hover:bg-[#0A2540]/90 rounded-full px-6 h-9 text-sm transition-all duration-200 hover:shadow-md">
              Book Appointment
            </Button>
          </div>
          <button className="md:hidden text-[#0A2540] p-1" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <AnimatePresence mode="wait">
              {mobileMenuOpen
                ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}><X className="w-5 h-5" /></motion.div>
                : <motion.div key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}><Menu className="w-5 h-5" /></motion.div>
              }
            </AnimatePresence>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }} className="fixed inset-0 z-40 bg-white pt-20 px-6 md:hidden">
            <div className="flex flex-col space-y-1">
              {[["home","Home"],["services","Services"],["doctor","Doctor"],["contact","Contact"]].map(([id, label], i) => (
                <motion.button key={id} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }} onClick={() => scrollTo(id)} className="text-left py-4 text-xl font-medium text-[#0A2540] border-b border-[#E2E8F0]">
                  {label}
                </motion.button>
              ))}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} className="pt-6">
                <Button onClick={() => scrollTo("booking")} className="w-full bg-[#0A2540] text-white rounded-full h-12 text-base">Book Appointment</Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero */}
      <section id="home" ref={heroRef} className="relative min-h-screen flex items-center pt-[72px] overflow-hidden bg-white">
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
          <motion.span
            style={{ y: heroY }}
            className="absolute -right-16 top-1/2 -translate-y-1/2 text-[22vw] font-black text-[#F5F7FA] leading-none select-none"
          >
            VERITY
          </motion.span>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 w-full py-20 md:py-28">
          <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-20">
            <div className="w-full lg:w-[52%]">
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              >
                <h1 className="text-[clamp(2.4rem,5.5vw,4rem)] font-medium text-[#0A2540] leading-[1.08] tracking-[-0.02em] mb-6">
                  Care that listens.<br />
                  <span className="text-[#3BAA7E]">Treatment</span> that works.
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="text-lg text-[#4A5568] mb-10 max-w-lg leading-relaxed"
              >
                A modern clinic in Bangalore focused on accurate diagnosis, thoughtful treatment, and long-term well-being.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col sm:flex-row gap-3 mb-14"
              >
                <Button
                  onClick={() => scrollTo("booking")}
                  className="group w-full sm:w-auto bg-[#0A2540] text-white hover:bg-[#0A2540]/90 rounded-full px-8 h-12 text-base transition-all duration-300 hover:shadow-lg hover:shadow-[#0A2540]/20 flex items-center gap-2"
                >
                  Book Appointment
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
                <a
                  href="tel:+918179299096"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 border border-[#E2E8F0] text-[#0A2540] hover:border-[#0A2540]/40 rounded-full px-8 h-12 text-base font-medium transition-all duration-200 hover:bg-[#F5F7FA]"
                >
                  <Phone className="w-4 h-4" />
                  Speak to Clinic
                </a>
              </motion.div>

              <motion.div
                ref={statsRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="flex flex-wrap gap-10 pt-8 border-t border-[#E2E8F0]"
              >
                <div>
                  <p className="text-2xl font-semibold text-[#0A2540] tabular-nums">{statsInView ? consultCount.toLocaleString() : 0}+</p>
                  <p className="text-sm text-[#4A5568] mt-0.5">Consultations</p>
                </div>
                <div>
                  <p className="text-2xl font-semibold text-[#0A2540] tabular-nums">{statsInView ? yearsCount : 0}+</p>
                  <p className="text-sm text-[#4A5568] mt-0.5">Years experience</p>
                </div>
                <div>
                  <p className="text-2xl font-semibold text-[#0A2540] tabular-nums">{statsInView ? patientsCount.toLocaleString() : 0}+</p>
                  <p className="text-sm text-[#4A5568] mt-0.5">Active patients</p>
                </div>
              </motion.div>
            </div>

            <motion.div
              className="w-full lg:w-[48%]"
              initial={{ opacity: 0, scale: 0.96, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative">
                <div className="absolute -inset-3 bg-gradient-to-br from-[#3BAA7E]/12 to-[#0A2540]/8 rounded-3xl blur-2xl" />
                <div className="relative aspect-[3/4] md:aspect-[4/3] lg:aspect-[3/4] rounded-2xl overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=1200"
                    alt="Dr. Arjun Mehta at Verity Health Clinic"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/30 via-transparent to-transparent" />
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="absolute bottom-5 left-5 right-5 bg-white/90 backdrop-blur-lg rounded-xl p-4 flex items-center gap-3 shadow-lg shadow-[#0A2540]/10"
                >
                  <div className="w-10 h-10 rounded-full bg-[#3BAA7E]/15 flex items-center justify-center shrink-0">
                    <Stethoscope className="w-5 h-5 text-[#3BAA7E]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#0A2540]">Dr. Arjun Mehta</p>
                    <p className="text-xs text-[#4A5568]">MBBS, MD — Internal Medicine</p>
                  </div>
                  <div className="ml-auto flex">
                    {[1,2,3,4,5].map(s => <Star key={s} className="w-3 h-3 fill-[#3BAA7E] text-[#3BAA7E]" />)}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Booking form */}
      <section id="booking" className="py-24 bg-[#F5F7FA] relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-[#3BAA7E]/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none" />
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-10"
          >
            <p className="text-xs font-semibold text-[#3BAA7E] uppercase tracking-[0.15em] mb-3">Schedule a visit</p>
            <h2 className="text-3xl md:text-4xl font-medium text-[#0A2540] tracking-tight mb-3">Request a Visit</h2>
            <p className="text-[#4A5568]">We'll confirm your appointment within a few hours.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white p-8 md:p-10 rounded-2xl border border-[#E2E8F0] shadow-sm"
          >
            <AnimatePresence mode="wait">
              {!bookingSuccess ? (
                <motion.form key="form" onSubmit={(e) => { e.preventDefault(); setBookingSuccess(true); }} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-[#0A2540]">Full Name</label>
                      <Input required placeholder="Your full name" className="bg-[#F5F7FA] border-[#E2E8F0] focus-visible:border-[#3BAA7E] focus-visible:ring-[#3BAA7E]/20 rounded-xl h-11" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-[#0A2540]">Phone Number</label>
                      <Input required type="tel" placeholder="+91 98765 43210" className="bg-[#F5F7FA] border-[#E2E8F0] focus-visible:border-[#3BAA7E] focus-visible:ring-[#3BAA7E]/20 rounded-xl h-11" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-[#0A2540]">Concern</label>
                    <Select required>
                      <SelectTrigger className="bg-[#F5F7FA] border-[#E2E8F0] focus:ring-[#3BAA7E]/20 rounded-xl h-11 text-[#4A5568]">
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-[#0A2540]">Preferred Date</label>
                      <Input required type="date" className="bg-[#F5F7FA] border-[#E2E8F0] focus-visible:border-[#3BAA7E] focus-visible:ring-[#3BAA7E]/20 rounded-xl h-11 text-[#4A5568]" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-[#0A2540]">Preferred Time</label>
                      <Select required>
                        <SelectTrigger className="bg-[#F5F7FA] border-[#E2E8F0] focus:ring-[#3BAA7E]/20 rounded-xl h-11 text-[#4A5568]">
                          <SelectValue placeholder="Select a timeframe" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="morning">Morning — 9 AM to 12 PM</SelectItem>
                          <SelectItem value="afternoon">Afternoon — 12 PM to 4 PM</SelectItem>
                          <SelectItem value="evening">Evening — 4 PM to 7 PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button type="submit" className="w-full bg-[#0A2540] text-white hover:bg-[#0A2540]/90 rounded-xl h-12 text-base font-medium transition-all duration-200 hover:shadow-md">
                    Request Appointment
                  </Button>
                </motion.form>
              ) : (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="py-14 text-center">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1, type: "spring", stiffness: 200 }} className="w-16 h-16 bg-[#3BAA7E]/12 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Stethoscope className="w-7 h-7 text-[#3BAA7E]" />
                  </motion.div>
                  <h3 className="text-2xl font-medium text-[#0A2540] mb-2">Request received</h3>
                  <p className="text-[#4A5568] max-w-xs mx-auto">Our team will contact you shortly to confirm your visit.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Doctor section */}
      <section id="doctor" className="py-24 md:py-32 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
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
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                  <img src="https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Dr. Arjun Mehta" className="w-full h-full object-cover" />
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
                MBBS, MD (Internal Medicine)
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="text-[#4A5568] text-lg leading-relaxed mb-8 max-w-lg"
              >
                Dr. Mehta's practice is built on one principle: the patient should leave understanding exactly what is happening in their body and why. His approach avoids unnecessary tests and prioritizes practical, long-term treatment plans.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-wrap gap-2 mb-10"
              >
                {["Internal Medicine", "Preventive Health", "Chronic Condition Care"].map((tag) => (
                  <span key={tag} className="px-3.5 py-1.5 bg-[#F5F7FA] text-[#4A5568] text-sm rounded-full border border-[#E2E8F0] font-medium">
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
                  <p className="text-sm font-semibold text-[#0A2540]">Patients seen</p>
                  <p className="text-sm text-[#4A5568] mt-0.5">1,000+</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 bg-[#F5F7FA] overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-xs font-semibold text-[#3BAA7E] uppercase tracking-[0.15em] mb-3">What we treat</p>
              <h2 className="text-3xl md:text-4xl font-medium text-[#0A2540] tracking-tight">Services & specialities</h2>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#E2E8F0] rounded-2xl overflow-hidden border border-[#E2E8F0]">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.06, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white p-8 group hover:bg-[#0A2540] transition-colors duration-300 cursor-default"
              >
                <div className="flex items-start justify-between mb-6">
                  <span className="text-xs font-semibold text-[#4A5568] group-hover:text-white/50 transition-colors tabular-nums">{service.num}</span>
                  <div className="w-9 h-9 rounded-lg bg-[#F5F7FA] group-hover:bg-white/10 transition-colors flex items-center justify-center text-[#3BAA7E] group-hover:text-[#3BAA7E]">
                    {service.icon}
                  </div>
                </div>
                <h3 className="text-base font-semibold text-[#0A2540] group-hover:text-white transition-colors mb-3">{service.title}</h3>
                <p className="text-sm text-[#4A5568] group-hover:text-white/65 transition-colors leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Clinic space */}
      <section className="py-24 md:py-32 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
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
                Designed for comfort.<br/>Built for clarity.
              </h2>
              <p className="text-[#4A5568] text-lg leading-relaxed mb-8">
                Our clinic is designed to reduce stress and support focused care — quiet interiors, modern diagnostics, and a patient-first environment. Nothing clinical for its own sake.
              </p>
              <div className="space-y-4">
                {[
                  "Modern diagnostic equipment",
                  "Private consultation rooms",
                  "Minimal wait times by appointment",
                ].map((item, i) => (
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
                className="aspect-[3/4] rounded-xl overflow-hidden"
              >
                <img src="https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Clinic interior" className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 48 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="aspect-[3/4] rounded-xl overflow-hidden mt-10"
              >
                <img src="https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Clinic equipment" className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-[#0A2540] overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="mb-14"
          >
            <p className="text-xs font-semibold text-[#3BAA7E] uppercase tracking-[0.15em] mb-3">Patient feedback</p>
            <h2 className="text-3xl md:text-4xl font-medium text-white tracking-tight">What patients say</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`bg-white/5 border border-white/10 rounded-xl p-8 hover:bg-white/8 transition-colors duration-300 ${i === 0 ? "md:col-span-2 md:grid md:grid-cols-2 md:items-center md:gap-8" : ""}`}
              >
                <div>
                  <div className="flex mb-4">
                    {[1,2,3,4,5].map(s => <Star key={s} className="w-3.5 h-3.5 fill-[#3BAA7E] text-[#3BAA7E] mr-0.5" />)}
                  </div>
                  <p className={`text-white leading-relaxed mb-6 ${i === 0 ? "text-xl md:text-2xl font-light" : "text-base"}`}>
                    "{t.text}"
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white text-xs font-semibold shrink-0">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{t.name}</p>
                    <p className="text-white/50 text-xs">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12"
          >
            <p className="text-xs font-semibold text-[#3BAA7E] uppercase tracking-[0.15em] mb-3">Common questions</p>
            <h2 className="text-3xl md:text-4xl font-medium text-[#0A2540] tracking-tight">Things patients often ask</h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Accordion type="single" collapsible>
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-[#E2E8F0] py-1">
                  <AccordionTrigger className="text-base md:text-lg font-medium text-[#0A2540] hover:text-[#0A2540] hover:no-underline text-left">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-[#4A5568] leading-relaxed pb-5">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Contact / Location */}
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
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#E2E8F0] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-[#3BAA7E]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#0A2540] mb-0.5">Address</p>
                    <p className="text-[#4A5568]">Bangalore, Karnataka, India</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#E2E8F0] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-[#3BAA7E]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#0A2540] mb-0.5">Phone</p>
                    <a href="tel:+918179299096" className="text-[#4A5568] hover:text-[#0A2540] transition-colors">+91 8179299096</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#E2E8F0] flex items-center justify-center shrink-0">
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
                <Button onClick={() => scrollTo("booking")} className="bg-[#0A2540] text-white hover:bg-[#0A2540]/90 rounded-full px-8 h-11 text-sm font-medium transition-all duration-200 hover:shadow-md">
                  Book a visit
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl overflow-hidden border border-[#E2E8F0] min-h-[380px] shadow-sm"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1p3!2d77.5946!3d12.9716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBangalore%2C%20Karnataka%2C%20India!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "380px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Verity Health Clinic Location"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A2540] text-white py-14">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg font-semibold tracking-tight">Verity Health</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#3BAA7E]" />
              </div>
              <p className="text-white/50 text-sm">Thoughtful Medicine. Trusted Care.</p>
            </div>
            <div className="flex justify-center gap-8 text-sm text-white/60">
              {[["home","Home"],["services","Services"],["doctor","Doctor"],["contact","Contact"]].map(([id, label]) => (
                <button key={id} onClick={() => scrollTo(id)} className="hover:text-white transition-colors">{label}</button>
              ))}
            </div>
            <div className="flex justify-center md:justify-end gap-3">
              {[<Instagram />, <Facebook />, <Twitter />].map((icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center hover:bg-white/10 transition-colors text-white/60 hover:text-white [&>svg]:w-4 [&>svg]:h-4">
                  {icon}
                </a>
              ))}
            </div>
          </div>
          <div className="border-t border-white/10 pt-7 text-center text-white/35 text-sm">
            © 2025 Verity Health Clinic. All rights reserved.
          </div>
        </div>
      </footer>

      {/* WhatsApp */}
      <motion.a
        href="https://wa.me/918179299096"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/30 z-50"
      >
        <MessageCircle className="w-6 h-6" />
      </motion.a>

      {/* Sticky bottom CTA */}
      <AnimatePresence>
        {!bookingSectionVisible && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-0 left-0 right-0 bg-[#0A2540]/95 backdrop-blur-md border-t border-white/10 z-40 md:hidden px-4 py-3"
          >
            <Button onClick={() => scrollTo("booking")} className="w-full bg-[#3BAA7E] text-white hover:bg-[#3BAA7E]/90 h-11 rounded-xl font-medium">
              Book an Appointment
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Exit intent popup */}
      <AnimatePresence>
        {showExitIntent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-[#0A2540]/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
            onClick={() => setShowExitIntent(false)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 10 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setShowExitIntent(false)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#F5F7FA] flex items-center justify-center text-[#4A5568] hover:bg-[#E2E8F0] transition-colors">
                <X className="w-4 h-4" />
              </button>
              <div className="mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#3BAA7E]/12 flex items-center justify-center mb-4">
                  <Stethoscope className="w-5 h-5 text-[#3BAA7E]" />
                </div>
                <h3 className="text-xl font-medium text-[#0A2540] mb-1.5">Free consultation available</h3>
                <p className="text-[#4A5568] text-sm">Leave your number and we'll call you back to schedule.</p>
              </div>
              <form onSubmit={(e) => { e.preventDefault(); setShowExitIntent(false); }} className="space-y-3">
                <Input required placeholder="Your name" className="bg-[#F5F7FA] border-[#E2E8F0] rounded-xl h-11" />
                <Input required type="tel" placeholder="+91 98765 43210" className="bg-[#F5F7FA] border-[#E2E8F0] rounded-xl h-11" />
                <Button type="submit" className="w-full bg-[#0A2540] text-white hover:bg-[#0A2540]/90 rounded-xl h-11 font-medium mt-1">
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
