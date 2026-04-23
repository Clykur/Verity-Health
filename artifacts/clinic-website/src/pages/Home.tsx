import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion";
import { useLenis } from "@/hooks/useLenis";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Menu, X, MessageCircle, User, Star, HeartPulse, Activity,
  Stethoscope, Smile, ShieldCheck, Bone, Phone, MapPin, Clock,
  Facebook, Instagram, Twitter, ArrowRight, Eye, CheckCircle2,
  Calendar, FileText, BadgeCheck, Users, Microscope, Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MotionDiv } from "@/components/ui/motion";
import { staggerContainer, fadeIn, fadeUp } from "@/lib/motion";

const services = [
  { num: "01", title: "General Consultation", desc: "Thorough assessment, accurate diagnosis, and clear guidance for everyday and complex health concerns.", icon: <Activity className="w-5 h-5" /> },
  { num: "02", title: "Preventive Health Checkups", desc: "Comprehensive screenings designed to stay ahead of potential conditions before they become problems.", icon: <ShieldCheck className="w-5 h-5" /> },
  { num: "03", title: "Skin & Hair Care", desc: "Clinical dermatology for conditions that affect how you look and feel, treated with precision.", icon: <Eye className="w-5 h-5" /> },
  { num: "04", title: "Dental Care", desc: "Full-spectrum oral health services, from preventive hygiene to complex restorative treatment.", icon: <Smile className="w-5 h-5" /> },
  { num: "05", title: "Physiotherapy", desc: "Structured rehabilitation and movement programs for recovery, pain relief, and long-term mobility.", icon: <Bone className="w-5 h-5" /> },
  { num: "06", title: "Cardiac Evaluation", desc: "Heart health diagnostics and monitoring for early detection and ongoing condition management.", icon: <HeartPulse className="w-5 h-5" /> },
];

const testimonials = [
  { name: "Priya S.", role: "Patient since 2021", text: "For the first time in years, I felt genuinely listened to. No rush, no shortcuts, just a clear explanation of what was happening and why.", stars: 5 },
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

const steps = [
  { num: "01", Icon: Calendar, title: "Book your visit", desc: "Schedule online or call us. You'll receive confirmation within a few hours and a reminder before your visit." },
  { num: "02", Icon: Stethoscope, title: "Consult with Dr. Mehta", desc: "A focused, unhurried consultation, he'll review your history, examine you, and explain his assessment clearly." },
  { num: "03", Icon: FileText, title: "Leave with a clear plan", desc: "Every patient leaves understanding their diagnosis and next steps. No jargon, no ambiguity, just clarity." },
];

const whyUs = [
  { icon: <BadgeCheck className="w-5 h-5 text-[#3BAA7E]" />, title: "Evidence-based only", desc: "No unnecessary tests, no speculative prescriptions. Every recommendation is grounded in clinical evidence." },
  { icon: <Users className="w-5 h-5 text-[#3BAA7E]" />, title: "Continuity of care", desc: "Dr. Mehta follows your case over time. You aren't handed off, you're known." },
  { icon: <Microscope className="w-5 h-5 text-[#3BAA7E]" />, title: "Modern diagnostics on-site", desc: "Core tests and evaluations are done within the clinic. Fewer referrals, faster results." },
  { icon: <Zap className="w-5 h-5 text-[#3BAA7E]" />, title: "Minimal wait times", desc: "Appointments run on schedule. Your time is treated with the same respect as your health." },
];

export default function Home() {
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [hasShownExitIntent, setHasShownExitIntent] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [hidden, setHidden] = useState(false);

  const { scrollY, scrollYProgress } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (previous !== undefined && latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  useLenis(true);
  const [active, setActive] = useState<number | null>(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep(prev => (prev + 1) % steps.length);
    }, 3000); // Loop every 3 seconds
    return () => clearInterval(timer);
  }, []);

  const scrollYProgressSpring = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 90,
  });
  const heroY = useTransform(scrollYProgress, [0, 0.3], ["0%", "12%"]);


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

      {/* Scroll progress */}
      <motion.div className="fixed top-0 left-0 h-[2px] bg-[#3BAA7E] z-[60] origin-left" style={{ scaleX: scrollYProgressSpring }} />

      {/* Navbar */}
   <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 w-full z-[100] bg-white/95 backdrop-blur-md shadow-[0_1px_0_rgba(10,37,64,0.08)]"
    >
        <div className="max-w-6xl mx-auto px-6 h-[72px] flex items-center justify-between">
          <button onClick={() => scrollTo("home")} className="flex items-center gap-2 group">
            <span className="text-lg font-semibold tracking-tight text-[#0A2540]">Verity Health</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#3BAA7E] group-hover:scale-125 transition-transform duration-300" />
          </button>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#4A5568]">
            {[["home","Home"],["services","Services"],["doctor","Doctor"],["faqs","FAQs"],["contact","Contact"]].map(([id, label]) => (
              <button key={id} onClick={() => scrollTo(id)} className="relative hover:text-[#0A2540] transition-colors duration-200 group">
                {label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#3BAA7E] group-hover:w-full transition-all duration-300" />
              </button>
            ))}
            <Button onClick={() => scrollTo("booking")} className="bg-[#0A2540] text-white hover:bg-[#0A2540]/90 rounded-full px-6 h-9 text-sm transition-all duration-200 hover:shadow-md">
              Book Consultation
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
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }} className="fixed inset-0 z-40 bg-white pt-20 px-6 md:hidden">
            <div className="flex flex-col space-y-1">
              {[["home","Home"],["services","Services"],["doctor","Doctor"],["faqs","FAQs"],["contact","Contact"]].map(([id, label], i) => (
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
      <section id="home" ref={heroRef} className="relative min-h-screen flex items-center pt-[72px] overflow-hidden">
        <motion.div
          style={{ y: heroY }}
          className="absolute inset-0 pointer-events-none select-none overflow-hidden animated-gradient opacity-20 dark:opacity-10"
        />
        <div className="relative z-10 max-w-6xl mx-auto px-6 w-full py-20 md:py-28">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className={`flex flex-col ${isMobile ? "" : "lg:flex-row"} items-center gap-12 lg:gap-16`}
          >
            <div className="w-full lg:w-[52%] text-center lg:text-left">
              <motion.h1
                variants={fadeUp}
                className="text-[clamp(2.4rem,5.5vw,4rem)] font-medium text-[#0A2540] leading-[1.08] tracking-[-0.02em] mb-6"
              >
                Get expert medical advice,
                <br />
                <span className="text-[#3BAA7E]">without the wait.</span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-lg text-[#4A5568] mb-10 max-w-lg leading-relaxed mx-auto lg:mx-0"
              >
                Appointments in minutes, not days. Speak with a trusted doctor from the comfort of your home.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="flex flex-col sm:flex-row gap-3 mb-14 justify-center lg:justify-start"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollTo("booking")}
                  className="group w-full sm:w-auto bg-[#0A2540] text-white hover:bg-[#0A2540]/90 rounded-full px-8 h-12 text-base transition-all duration-300 hover:shadow-lg hover:shadow-[#0A2540]/20 flex items-center justify-center gap-2"
                >
                  Book a consultation
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </motion.button>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="tel:+918179299096"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 border border-[#E2E8F0] text-[#0A2540] hover:border-[#0A2540]/40 rounded-full px-8 h-12 text-base font-medium transition-all duration-200 hover:bg-[#F5F7FA]"
                >
                  <Phone className="w-4 h-4" />
                  Speak to Clinic
                </motion.a>
              </motion.div>
              {/* <MotionDiv variants={fadeIn} className="flex items-center justify-center lg:justify-start gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />)}
                </div>
                <p className="text-sm text-[#4A5568]">Trusted by <span className="font-semibold text-[#0A2540]">10,000+</span> patients</p>
              </MotionDiv> */}
            </div>

            <motion.div
              className="w-full lg:w-[48%]"
              initial={{ opacity: 0, scale: 0.96, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-[#3BAA7E]/15 to-[#0A2540]/10 rounded-3xl blur-2xl opacity-80" />
                <div className="group relative aspect-[3/4] sm:aspect-[4/3] lg:aspect-[16/11] xl:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-black/10">
                  <img
                    src="https://images.pexels.com/photos/10826541/pexels-photo-10826541.jpeg?auto=compress&cs=tinysrgb&w=1200"
                    alt="Dr. Arjun Mehta at Verity Health Clinic"
                    className="w-full h-full object-cover object-top transition-transform duration-500 ease-in-out group-hover:scale-105"
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
                    <p className="text-sm font-semibold text-[#0A2540]">
                      Dr. Arjun Mehta
                    </p>
                    <p className="text-xs text-[#4A5568]">
                      MBBS, MD — Internal Medicine
                    </p>
                  </div>
                  <div className="ml-auto flex">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className="w-3 h-3 fill-[#3BAA7E] text-[#3BAA7E]"
                      />
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-[#F5F7FA] overflow-hidden">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-6xl mx-auto px-6"
        >
          <motion.div variants={fadeUp} className="mb-14">
            <p className="text-xs font-semibold text-[#3BAA7E] uppercase tracking-[0.15em] mb-3">The process</p>
            <h2 className="text-3xl md:text-4xl font-medium text-[#0A2540] tracking-tight">How a visit works</h2>
          </motion.div>

          <div className={`grid grid-cols-1 ${isMobile ? "md:grid-cols-1" : "md:grid-cols-3"} gap-8`}>
            {steps.map((step, i) => {
              const isActive = activeStep === i;
              const cardVariants = {
                active: {
                  opacity: 1,
                  y: 0,
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                  backgroundColor: "#FFFFFF",
                },
                inactive: {
                  opacity: 0.7,
                  y: 10,
                  boxShadow: "0 0 #0000",
                  backgroundColor: "transparent",
                },
              };
              const iconVariants = {
                active: {
                  backgroundColor: "#3BAA7E",
                },
                inactive: {
                  backgroundColor: "rgba(59, 170, 126, 0.1)",
                },
              };

              return (
                <motion.div
                  key={i}
                  variants={cardVariants}
                  animate={isActive ? "active" : "inactive"}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-2xl p-8"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <motion.div
                      variants={iconVariants}
                      animate={isActive ? "active" : "inactive"}
                      transition={{ duration: 0.3 }}
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    >
                      <step.Icon 
                        className={`w-6 h-6 transition-colors duration-300 ${isActive ? "text-white" : "text-[#3BAA7E]"}`} 
                        strokeWidth={isActive ? 2.5 : 2} 
                      />
                    </motion.div>
                    <span className="text-xs font-semibold text-[#4A5568] tabular-nums">{step.num}</span>
                  </div>
                  <h3 className={`text-lg font-semibold mb-3 transition-colors duration-300 ${isActive ? "text-[#0A2540]" : "text-[#4A5568]"}`}>
                    {step.title}
                  </h3>
                  <p className="text-[#4A5568] text-sm leading-relaxed">{step.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 bg-white overflow-hidden">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-6xl mx-auto px-6"
        >
          <motion.div variants={fadeUp} className="mb-14 text-center">
            <p className="text-xs font-semibold text-[#3BAA7E] uppercase tracking-[0.15em] mb-3">Our Services</p>
            <h2 className="text-3xl md:text-4xl font-medium text-[#0A2540] tracking-tight">Comprehensive Care for You</h2>
          </motion.div>

          <div className={`grid grid-cols-1 ${isMobile ? "md:grid-cols-1" : "md:grid-cols-2 lg:grid-cols-3"} gap-8`}>
            {services.map((service, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={fadeUp}
                className="group cursor-pointer rounded-2xl border border-[#E2E8F0] bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[#0A3D2E] hover:shadow-2xl hover:shadow-emerald-900/20"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#3BAA7E]/10 text-[#3BAA7E] transition-colors duration-300 group-hover:bg-white/10 group-hover:text-white">
                  {service.icon}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-[#0A2540] transition-colors duration-300 group-hover:text-white">
                  {service.title}
                </h3>
                <p className="mb-6 text-sm leading-relaxed text-[#5A7A6E] transition-colors duration-300 group-hover:text-white/75">
                  {service.desc}
                </p>
                <div className="flex items-center gap-1.5 text-sm font-semibold text-[#3BAA7E] transition-colors duration-300 group-hover:text-[#A8D8C4]">
                  Learn more
                  <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Booking Form — open layout, no card */}
      <section id="booking" className="py-24 md:py-32 bg-white overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-6xl mx-auto px-6"
        >
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            <div className="w-full lg:w-[38%] shrink-0">
              <p className="text-xs font-semibold text-[#3BAA7E] uppercase tracking-[0.15em] mb-4">Book a visit</p>
              <h2 className="text-3xl md:text-4xl font-medium text-[#0A2540] tracking-tight leading-tight mb-5">
                Request an<br/>appointment
              </h2>
              <p className="text-[#4A5568] leading-relaxed mb-8">
                Fill in the form and our team will confirm your slot within a few hours. No waiting rooms, you'll know your time before you arrive.
              </p>
              <div className="space-y-5">
                {[
                  "Confirmations sent within a few hours",
                  "On-time appointments, always",
                  "Mon–Sat 9 AM – 7 PM · Sun 10 AM – 2 PM",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#3BAA7E] mt-0.5 shrink-0" />
                    <p className="text-sm text-[#4A5568]">{item}</p>
                  </div>
                ))}
              </div>
              <div className="mt-10 pt-8 border-t border-[#E2E8F0]">
                <p className="text-sm text-[#4A5568] mb-1">Prefer to call?</p>
                <a href="tel:+918179299096" className="text-[#0A2540] font-semibold hover:text-[#3BAA7E] transition-colors">+91 8179299096</a>
              </div>
            </div>

            <div className="w-full lg:w-[62%]">
              <AnimatePresence mode="wait">
                {!bookingSuccess ? (
                  <motion.form key="form" onSubmit={(e) => { e.preventDefault(); setBookingSuccess(true); }} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-[#0A2540]">Full Name</label>
                        <Input required placeholder="Your full name" className="bg-[#F5F7FA] border-[#E2E8F0] focus-visible:border-[#3BAA7E] focus-visible:ring-[#3BAA7E]/20 rounded-xl h-12" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-[#0A2540]">Phone Number</label>
                        <Input required type="tel" placeholder="+91 98765 43210" className="bg-[#F5F7FA] border-[#E2E8F0] focus-visible:border-[#3BAA7E] focus-visible:ring-[#3BAA7E]/20 rounded-xl h-12" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-[#0A2540]">Concern</label>
                      <Select required>
                        <SelectTrigger className="bg-[#F5F7FA] border-[#E2E8F0] focus:ring-[#3BAA7E]/20 rounded-xl h-12 text-[#4A5568]">
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-[#0A2540]">Preferred Date</label>
                        <Input required type="date" className="bg-[#F5F7FA] border-[#E2E8F0] focus-visible:border-[#3BAA7E] focus-visible:ring-[#3BAA7E]/20 rounded-xl h-12 text-[#4A5568]" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-[#0A2540]">Preferred Time</label>
                        <Select required>
                          <SelectTrigger className="bg-[#F5F7FA] border-[#E2E8F0] focus:ring-[#3BAA7E]/20 rounded-xl h-12 text-[#4A5568]">
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
                    <Button type="submit" className="w-full bg-[#0A2540] text-white hover:bg-[#0A2540]/90 rounded-xl h-12 text-base font-medium transition-all duration-200 hover:shadow-md mt-2">
                      Confirm Request
                    </Button>
                  </motion.form>
                ) : (
                  <motion.div key="success" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="py-16">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1, type: "spring", stiffness: 200 }} className="w-14 h-14 bg-[#3BAA7E]/12 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 className="w-7 h-7 text-[#3BAA7E]" />
                    </motion.div>
                    <h3 className="text-2xl font-medium text-[#0A2540] mb-3">Request received</h3>
                    <p className="text-[#4A5568] max-w-sm leading-relaxed">Our team will call you shortly to confirm your appointment. Thank you for choosing Verity Health.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Doctor */}
      <section id="doctor" className="py-24 md:py-32 bg-[#F5F7FA] overflow-hidden">
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
        </div>
      </section>

      {/* Why Us */}
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
                {whyUs.map((item, i) => (
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
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-[#F5F7FA] overflow-hidden">
        <MotionDiv
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-6xl mx-auto px-6"
        >
          <MotionDiv
            variants={fadeIn}
            className="text-center mb-14"
          >
            <p className="text-xs font-semibold text-[#3BAA7E] uppercase tracking-[0.15em] mb-3">Patient Stories</p>
            <h2 className="text-3xl md:text-4xl font-medium text-[#0A2540] tracking-tight">Heard from our patients</h2>
          </MotionDiv>

          <div className={`grid grid-cols-1 ${isMobile ? "" : "md:grid-cols-2"} gap-8`}>
            {testimonials.map((t, i) => (
              <MotionDiv
                key={i}
                variants={fadeIn}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="bg-white p-8 rounded-2xl flex flex-col"
              >
                <div className="flex mb-4">
                  {[...Array(t.stars)].map((_, s) => <Star key={s} className="w-4 h-4 fill-[#3BAA7E] text-[#3BAA7E]" />)}
                </div>
<p className="font-serif italic text-[18px] md:text-[19px] leading-[1.8] text-[#1F3D2B] mb-6 flex-grow">
  “{t.text}”
</p>                <div className="flex items-center gap-3 mt-auto">
                  <div className="w-10 h-10 rounded-full bg-[#E2E8F0] flex-shrink-0 flex items-center justify-center">
                    <User className="w-5 h-5 text-[#4A5568]" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-[#0A2540]">{t.name}</p>
                    <p className="text-xs text-[#4A5568]">{t.role}</p>
                  </div>
                </div>
              </MotionDiv>
            ))}
          </div>
        </MotionDiv>
      </section>

      {/* Conditions We Treat */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
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
              {[
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
              ].map((group, gi) => (
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
        </div>
      </section>

      {/* Philosophy Banner */}
      <section className="py-20 md:py-24 bg-[#F5F7FA] border-y border-[#E2E8F0]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-xs font-semibold text-[#3BAA7E] uppercase tracking-[0.15em] mb-6"
          >
            Our approach
          </motion.p>
          <motion.blockquote
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.07, ease: [0.22, 1, 0.36, 1] }}
            className="text-2xl md:text-3xl lg:text-4xl font-light text-[#0A2540] leading-snug tracking-tight mb-8"
          >
            "A doctor's job is not to manage symptoms.<br className="hidden md:block" />
            It is to find what's actually causing the problem<br className="hidden md:block" />
            and to say so, clearly."
          </motion.blockquote>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-[#4A5568] text-sm"
          >
            — Dr. Arjun Mehta, Founder · Verity Health Clinic
          </motion.p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faqs" className="py-24 bg-white">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-4xl mx-auto px-6"
        >
          <motion.div variants={fadeUp} className="text-center mb-14">
            <p className="text-xs font-semibold text-[#3BAA7E] uppercase tracking-[0.15em] mb-3">Common Questions</p>
            <h2 className="text-3xl md:text-4xl font-medium text-[#0A2540] tracking-tight">Things patients often ask</h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, i) => {
              const isActive = active === i;
              return (
                <motion.div
                  key={i}
                  layout
                  onClick={() => setActive(isActive ? null : i)}
                  className="rounded-2xl border border-[#E2E8F0] p-6 cursor-pointer transition-colors bg-[#F5F7FA] hover:bg-white"
                  animate={{
                    backgroundColor: isActive ? "#FFFFFF" : "#F5F7FA",
                    boxShadow: isActive ? "0 4px 12px rgba(0,0,0,0.05)" : "none"
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <motion.div layout="position" className="flex justify-between items-center gap-4">
                    <h3 className="text-base font-semibold text-[#0A2540]">{faq.q}</h3>
                    <motion.div
  className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 relative"
  animate={{
    backgroundColor: isActive ? "#3BAA7E" : "rgba(59, 170, 126, 0.1)",
    color: isActive ? "#FFFFFF" : "#3BAA7E"
  }}
  transition={{ duration: 0.3 }}
>
  <motion.span
    animate={{ rotate: isActive ? 45 : 0 }}
    className="absolute w-3.5 h-0.5 bg-current"
  />
  <motion.span
    animate={{ rotate: isActive ? -45 : 90 }}
    className="absolute w-3.5 h-0.5 bg-current"
  />
</motion.div>
                  </motion.div>
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="text-[#4A5568] text-sm leading-relaxed">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
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
                    <a href="tel:+918179299096" className="text-[#4A5568] hover:text-[#0A2540] transition-colors">+91 81 7929 9096</a>
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

      {/* Footer */}
      <footer className="bg-[#0A2540] text-white">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-1">
              <button onClick={() => scrollTo("home")} className="flex items-center gap-2 group mb-4">
                <span className="text-lg font-semibold tracking-tight text-white">Verity Health</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#3BAA7E] group-hover:scale-125 transition-transform duration-300" />
              </button>
              <p className="text-sm text-white/60 leading-relaxed">Clear, compassionate, and evidence-based medical care.</p>
            </div>
            <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-semibold text-white/90 mb-4">Navigation</h3>
                <ul className="space-y-3">
                  {[["home","Home"],["services","Services"],["doctor","Doctor"],["contact","Contact"]].map(([id, label]) => (
                    <li key={id}><button onClick={() => scrollTo(id)} className="text-white/60 hover:text-white transition-colors">{label}</button></li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-white/90 mb-4">Legal</h3>
                <ul className="space-y-3">
                  {["Privacy Policy", "Terms of Service"].map(label => (
                    <li key={label}><a href="#" className="text-white/60 hover:text-white transition-colors">{label}</a></li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-white/90 mb-4">Connect</h3>
                <div className="flex space-x-4">
                  {[Facebook, Instagram, Twitter].map((Icon, i) => (
                    <a key={i} href="#" className="text-white/60 hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-white/50">
            <p>&copy; {new Date().getFullYear()} Verity Health. All rights reserved.</p>
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

      {/* Exit intent */}
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