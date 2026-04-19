import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Phone, Calendar, Clock, MapPin, Menu, X, ChevronDown, MessageCircle, Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { toast } from "sonner";

const FADE_UP = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const STAGGER = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [hasShownExitIntent, setHasShownExitIntent] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
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
    toast.success("Appointment Confirmed! We will contact you shortly.");
  };

  const handleExitIntentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowExitIntent(false);
    toast.success("Consultation Request Received! We'll be in touch.");
  };

  return (
    <div className="min-h-[100dvh] bg-slate-50 font-sans text-slate-900 selection:bg-slate-200">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-100" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-xl font-serif font-bold tracking-tight text-slate-900">Dr. Mehta Clinic</div>
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600">
            <button onClick={() => scrollTo("home")} className="hover:text-slate-900 transition-colors">Home</button>
            <button onClick={() => scrollTo("services")} className="hover:text-slate-900 transition-colors">Services</button>
            <button onClick={() => scrollTo("doctor")} className="hover:text-slate-900 transition-colors">Doctor</button>
            <button onClick={() => scrollTo("testimonials")} className="hover:text-slate-900 transition-colors">Testimonials</button>
            <button onClick={() => scrollTo("contact")} className="hover:text-slate-900 transition-colors">Contact</button>
            <Button onClick={() => scrollTo("booking")} className="bg-slate-900 text-white hover:bg-slate-800 rounded-full px-6">Book Appointment</Button>
          </div>
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden">
            <div className="flex flex-col space-y-6 text-lg font-medium text-slate-700">
              <button onClick={() => scrollTo("home")} className="text-left py-2 border-b border-slate-100">Home</button>
              <button onClick={() => scrollTo("services")} className="text-left py-2 border-b border-slate-100">Services</button>
              <button onClick={() => scrollTo("doctor")} className="text-left py-2 border-b border-slate-100">Doctor</button>
              <button onClick={() => scrollTo("testimonials")} className="text-left py-2 border-b border-slate-100">Testimonials</button>
              <button onClick={() => scrollTo("contact")} className="text-left py-2 border-b border-slate-100">Contact</button>
              <Button onClick={() => scrollTo("booking")} className="w-full bg-slate-900 text-white rounded-full mt-4">Book Appointment</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div initial="hidden" animate="visible" variants={STAGGER} className="max-w-3xl">
            <motion.div variants={FADE_UP} className="inline-flex items-center space-x-2 bg-slate-100 rounded-full px-4 py-1.5 mb-6 border border-slate-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-medium text-slate-600 uppercase tracking-wide">Accepting New Patients</span>
            </motion.div>
            <motion.h1 variants={FADE_UP} className="text-5xl md:text-7xl font-serif font-medium text-slate-900 leading-tight mb-6">
              Expert Care.<br/>Trusted Results.
            </motion.h1>
            <motion.p variants={FADE_UP} className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl leading-relaxed">
              Premium healthcare experience in Bangalore with experienced specialists. We combine advanced treatments with compassionate care in a serene, modern facility.
            </motion.p>
            <motion.div variants={FADE_UP} className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
              <Button onClick={() => scrollTo("booking")} className="w-full sm:w-auto bg-slate-900 text-white hover:bg-slate-800 rounded-full px-8 py-6 text-base">Book Appointment</Button>
              <Button variant="outline" className="w-full sm:w-auto border-slate-300 text-slate-700 hover:bg-slate-50 rounded-full px-8 py-6 text-base" onClick={() => window.location.href = 'tel:+918179299096'}>
                <Phone className="w-4 h-4 mr-2" /> Call Now: +91 8179299096
              </Button>
            </motion.div>
            <motion.div variants={FADE_UP} className="flex flex-wrap items-center gap-6 text-sm font-medium text-slate-600">
              <div className="flex items-center"><CheckCircle2 className="w-5 h-5 text-emerald-500 mr-2" /> 10,000+ Patients Treated</div>
              <div className="flex items-center"><CheckCircle2 className="w-5 h-5 text-emerald-500 mr-2" /> Certified Specialists</div>
              <div className="flex items-center"><CheckCircle2 className="w-5 h-5 text-emerald-500 mr-2" /> Advanced Treatments</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={STAGGER}>
              <motion.h2 variants={FADE_UP} className="text-3xl md:text-4xl font-serif font-medium mb-4">Request an Appointment</motion.h2>
              <motion.p variants={FADE_UP} className="text-slate-600 mb-8 leading-relaxed">
                Take the first step towards better health. Fill out the form below and our team will confirm your appointment within 2 hours.
              </motion.p>
              <motion.form variants={FADE_UP} onSubmit={handleBookingSubmit} className="space-y-6 bg-slate-50 p-8 rounded-2xl border border-slate-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Full Name</label>
                    <Input required placeholder="John Doe" className="bg-white border-slate-200 focus-visible:ring-slate-900 rounded-lg" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Phone Number</label>
                    <Input required type="tel" placeholder="+91 98765 43210" className="bg-white border-slate-200 focus-visible:ring-slate-900 rounded-lg" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Treatment / Concern</label>
                  <Select required>
                    <SelectTrigger className="bg-white border-slate-200 rounded-lg h-10">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Consultation</SelectItem>
                      <SelectItem value="skin">Skin Care</SelectItem>
                      <SelectItem value="dental">Dental Care</SelectItem>
                      <SelectItem value="physio">Physiotherapy</SelectItem>
                      <SelectItem value="eye">Eye Care</SelectItem>
                      <SelectItem value="cardio">Cardiology</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Preferred Date</label>
                    <Input required type="date" className="bg-white border-slate-200 focus-visible:ring-slate-900 rounded-lg" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Preferred Time</label>
                    <Select required>
                      <SelectTrigger className="bg-white border-slate-200 rounded-lg h-10">
                        <SelectValue placeholder="Select a time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="morning">Morning (9 AM - 12 PM)</SelectItem>
                        <SelectItem value="afternoon">Afternoon (12 PM - 4 PM)</SelectItem>
                        <SelectItem value="evening">Evening (4 PM - 7 PM)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button type="submit" className="w-full bg-slate-900 text-white hover:bg-slate-800 rounded-lg h-12 text-base font-medium">
                  Confirm Appointment
                </Button>
              </motion.form>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="hidden lg:block relative rounded-3xl overflow-hidden h-[600px]">
              <img src="/images/clinic_1.jpg" alt="Modern clinic interior" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-slate-900/10 mix-blend-multiply"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Doctor Profile */}
      <section id="doctor" className="py-24 bg-slate-50 border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-12 lg:gap-20 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="w-full md:w-1/2 lg:w-5/12">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-xl shadow-slate-200/50">
                <img src="/images/doctor.jpg" alt="Dr. Arjun Mehta" className="absolute inset-0 w-full h-full object-cover" />
              </div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={STAGGER} className="w-full md:w-1/2 lg:w-7/12">
              <motion.div variants={FADE_UP} className="inline-block bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">Lead Specialist</motion.div>
              <motion.h2 variants={FADE_UP} className="text-3xl md:text-4xl font-serif font-medium text-slate-900 mb-2">Dr. Arjun Mehta</motion.h2>
              <motion.p variants={FADE_UP} className="text-lg text-slate-500 font-medium mb-6">MBBS, MD (Internal Medicine)</motion.p>
              
              <motion.div variants={FADE_UP} className="space-y-4 mb-8">
                <p className="text-slate-600 leading-relaxed">
                  With over 15 years of clinical experience, Dr. Mehta brings a wealth of expertise and a patient-first philosophy to his practice. He is dedicated to providing precise diagnoses and comprehensive care plans.
                </p>
                <div className="flex items-center text-slate-700 font-medium bg-white px-4 py-3 rounded-xl shadow-sm border border-slate-100 max-w-max">
                  <Star className="w-5 h-5 text-amber-400 mr-2 fill-amber-400" />
                  Trusted by 1,000+ patients
                </div>
              </motion.div>
              
              <motion.div variants={FADE_UP} className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-200 pt-8">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2 text-sm uppercase tracking-wide">Experience</h4>
                  <p className="text-slate-600">15+ Years</p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2 text-sm uppercase tracking-wide">Certification</h4>
                  <p className="text-slate-600">National Medical Commission</p>
                </div>
                <div className="sm:col-span-2 mt-2">
                  <h4 className="font-semibold text-slate-900 mb-2 text-sm uppercase tracking-wide">Specializations</h4>
                  <p className="text-slate-600">Internal Medicine · Preventive Care · Chronic Disease Management</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-slate-900 mb-4">Comprehensive Care</h2>
            <p className="text-slate-600 leading-relaxed">We offer a wide range of medical services under one roof, utilizing modern technology and evidence-based practices.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "General Consultation", desc: "Expert assessment and diagnosis for everyday health concerns and preventive care." },
              { title: "Skin Care", desc: "Advanced dermatology treatments for glowing, healthy skin and specialized conditions." },
              { title: "Dental Care", desc: "Complete oral health services from routine checkups to complex procedures." },
              { title: "Physiotherapy", desc: "Personalized rehabilitation programs to restore movement and reduce pain." },
              { title: "Eye Care", desc: "Comprehensive vision testing and specialized ophthalmology treatments." },
              { title: "Cardiology", desc: "Heart health monitoring, diagnostics, and chronic condition management." }
            ].map((service, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}>
                <Card className="bg-slate-50 border-slate-100 hover:border-slate-300 hover:shadow-md transition-all duration-300 rounded-2xl h-full">
                  <CardContent className="p-8">
                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center mb-6">
                      <CheckCircle2 className="w-6 h-6 text-slate-900" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-3">{service.title}</h3>
                    <p className="text-slate-600 leading-relaxed text-sm">{service.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust / Facilities */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-20">
          <img src="/images/clinic_2.jpg" alt="Clinic Facility" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={STAGGER} className="max-w-3xl mx-auto">
            <motion.h2 variants={FADE_UP} className="text-3xl md:text-5xl font-serif font-medium mb-6">Modern facilities with a patient-first approach</motion.h2>
            <motion.p variants={FADE_UP} className="text-slate-300 text-lg mb-10">We've designed our clinic to feel less like a hospital and more like a sanctuary. Calm spaces, advanced diagnostic tools, and a team that listens.</motion.p>
            <motion.div variants={FADE_UP}>
              <Button onClick={() => scrollTo("booking")} className="bg-white text-slate-900 hover:bg-slate-100 rounded-full px-8 py-6 text-base">Book a Visit</Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-slate-900 mb-4">Patient Stories</h2>
            <p className="text-slate-600 leading-relaxed">Don't just take our word for it. Here's what our patients have to say about their experience.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Priya Sharma", text: "The level of care is exceptional. Dr. Mehta took the time to listen to all my concerns. The clinic feels so serene and clean." },
              { name: "Rahul Verma", text: "Booking an appointment was seamless, and I didn't have to wait at all when I arrived. Highly professional environment." },
              { name: "Ananya Desai", text: "I've been bringing my family here for two years. The staff is courteous, and the treatments have always been effective." }
            ].map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}>
                <Card className="bg-white border-slate-100 shadow-sm rounded-2xl h-full">
                  <CardContent className="p-8">
                    <Quote className="w-8 h-8 text-slate-200 mb-6" />
                    <p className="text-slate-600 mb-6 italic leading-relaxed">"{t.text}"</p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="font-semibold text-slate-900">{t.name}</span>
                      <div className="flex">
                        {[1,2,3,4,5].map(star => <Star key={star} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-slate-900 mb-4">Common Questions</h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-slate-100">
              <AccordionTrigger className="text-lg font-medium text-slate-800 hover:text-slate-900">How do I book an appointment?</AccordionTrigger>
              <AccordionContent className="text-slate-600 text-base leading-relaxed">
                You can book an appointment by filling out the form on this website, or by calling us directly at +91 8179299096. We recommend booking in advance to secure your preferred time slot.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border-slate-100">
              <AccordionTrigger className="text-lg font-medium text-slate-800 hover:text-slate-900">What are the consultation charges?</AccordionTrigger>
              <AccordionContent className="text-slate-600 text-base leading-relaxed">
                Our base consultation fee varies by specialty. Please contact our front desk for specific pricing details regarding your required treatment.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border-slate-100">
              <AccordionTrigger className="text-lg font-medium text-slate-800 hover:text-slate-900">What are the clinic timings?</AccordionTrigger>
              <AccordionContent className="text-slate-600 text-base leading-relaxed">
                We are open Monday to Saturday from 9:00 AM to 7:00 PM, and on Sunday from 10:00 AM to 2:00 PM.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="border-slate-100">
              <AccordionTrigger className="text-lg font-medium text-slate-800 hover:text-slate-900">Do you provide emergency support?</AccordionTrigger>
              <AccordionContent className="text-slate-600 text-base leading-relaxed">
                While we handle urgent care during operational hours, we do not operate a 24/7 emergency room. For severe medical emergencies, please visit the nearest hospital ER.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5" className="border-slate-100">
              <AccordionTrigger className="text-lg font-medium text-slate-800 hover:text-slate-900">Is the clinic equipped with modern diagnostic tools?</AccordionTrigger>
              <AccordionContent className="text-slate-600 text-base leading-relaxed">
                Yes, our facility features state-of-the-art diagnostic equipment to ensure accurate and timely test results for our patients.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Location & Contact */}
      <section id="contact" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-10 md:p-16 flex flex-col justify-center">
                <h2 className="text-3xl font-serif font-medium text-slate-900 mb-8">Visit Our Clinic</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <MapPin className="w-6 h-6 text-slate-400 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-1">Address</h4>
                      <p className="text-slate-600">Bangalore, Karnataka, India</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="w-6 h-6 text-slate-400 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-1">Contact</h4>
                      <p className="text-slate-600">+91 8179299096</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="w-6 h-6 text-slate-400 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-1">Hours</h4>
                      <p className="text-slate-600">Mon–Sat: 9:00 AM – 7:00 PM</p>
                      <p className="text-slate-600">Sunday: 10:00 AM – 2:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-[400px] lg:h-auto w-full bg-slate-200">
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
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 pb-28 md:pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="text-xl font-serif font-bold text-white tracking-tight mb-6 md:mb-0">Dr. Mehta Clinic</div>
            <div className="flex space-x-6 text-sm font-medium mb-6 md:mb-0">
              <button onClick={() => scrollTo("home")} className="hover:text-white transition-colors">Home</button>
              <button onClick={() => scrollTo("services")} className="hover:text-white transition-colors">Services</button>
              <button onClick={() => scrollTo("contact")} className="hover:text-white transition-colors">Contact</button>
            </div>
            <div className="flex space-x-4">
              <a href="#" aria-label="Instagram" className="hover:text-white transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" stroke="none" fill="currentColor"/></svg></a>
              <a href="#" aria-label="Facebook" className="hover:text-white transition-colors"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg></a>
              <a href="#" aria-label="Twitter" className="hover:text-white transition-colors"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg></a>
            </div>
          </div>
          <div className="text-center text-sm border-t border-slate-800 pt-8">
            &copy; {new Date().getFullYear()} Dr. Mehta Clinic. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Sticky Bottom CTA (Mobile mostly) */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-100 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] md:hidden z-40">
        <Button onClick={() => scrollTo("booking")} className="w-full bg-slate-900 text-white rounded-xl h-12 text-base font-medium">
          Book Appointment Now
        </Button>
      </div>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/918179299096" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-24 md:bottom-8 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg shadow-emerald-500/20 hover:scale-110 transition-transform duration-300"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </a>

      {/* Exit Intent Popup */}
      <AnimatePresence>
        {showExitIntent && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowExitIntent(false)} />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative z-10">
              <button onClick={() => setShowExitIntent(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-2xl font-serif font-medium text-slate-900 mb-2">Get Free Consultation Today</h3>
              <p className="text-slate-600 mb-6">Leave your details and our medical coordinator will call you right back.</p>
              
              <form onSubmit={handleExitIntentSubmit} className="space-y-4">
                <div>
                  <Input required placeholder="Your Name" className="w-full border-slate-200 bg-slate-50 focus-visible:ring-slate-900 rounded-lg" />
                </div>
                <div>
                  <Input required type="tel" placeholder="Phone Number" className="w-full border-slate-200 bg-slate-50 focus-visible:ring-slate-900 rounded-lg" />
                </div>
                <Button type="submit" className="w-full bg-slate-900 text-white rounded-lg h-12 mt-2">Request Callback</Button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
