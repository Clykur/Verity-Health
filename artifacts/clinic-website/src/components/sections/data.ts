import React from 'react';
import { LucideIcon } from "lucide-react";
import { ActivityIcon, ShieldCheckIcon, EyeIcon, BoneIcon, HeartPulseIcon, BadgeCheckIcon, UsersIcon, MicroscopeIcon, ZapIcon, CalendarIcon, FileTextIcon, StethoscopeIcon } from "lucide-react";
import { ToothIcon } from "./ToothIcon";

const Activity = ActivityIcon as any;
const ShieldCheck = ShieldCheckIcon as any;
const Eye = EyeIcon as any;
const Bone = BoneIcon as any;
const HeartPulse = HeartPulseIcon as any;
const BadgeCheck = BadgeCheckIcon as any;
const Users = UsersIcon as any;
const Microscope = MicroscopeIcon as any;
const Zap = ZapIcon as any;
const Calendar = CalendarIcon as any;
const FileText = FileTextIcon as any;
const Stethoscope = StethoscopeIcon as any;

export interface Service {
  num: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
}

export const services: Service[] = [
  { num: "01", title: "General Consultation", desc: "Thorough assessment, accurate diagnosis, and clear guidance for everyday and complex health concerns.", icon: React.createElement(Activity, { className: "w-5 h-5" }) },
  { num: "02", title: "Preventive Health Checkups", desc: "Comprehensive screenings designed to stay ahead of potential conditions before they become problems.", icon: React.createElement(ShieldCheck, { className: "w-5 h-5" }) },
  {
    num: "03",
    title: "Eye Care",
    desc: "Comprehensive eye examinations, vision correction, and early detection of conditions such as dry eye, infections, and refractive errors.",
    icon: React.createElement(Eye, { className: "w-5 h-5" })
  },
  { num: "04", title: "Dental Care", desc: "Full-spectrum oral health services, from preventive hygiene to complex restorative treatment.", icon: React.createElement(ToothIcon, {}) },
  { num: "05", title: "Physiotherapy", desc: "Structured rehabilitation and movement programs for recovery, pain relief, and long-term mobility.", icon: React.createElement(Bone, { className: "w-5 h-5" }) },
  { num: "06", title: "Cardiac Evaluation", desc: "Heart health diagnostics and monitoring for early detection and ongoing condition management.", icon: React.createElement(HeartPulse, { className: "w-5 h-5" }) },
];

export interface Testimonial {
  name: string;
  role: string;
  text: string;
  stars: number;
}

export const testimonials: Testimonial[] = [
  { name: "Priya S.", role: "Patient since 2021", text: "For the first time in years, I felt genuinely listened to. No rush, no shortcuts, just a clear explanation of what was happening and why.", stars: 5 },
  { name: "Rahul V.", role: "Patient since 2022", text: "Every appointment has been on time. The process is smooth, and you never feel like a number here.", stars: 5 },
  { name: "Ananya K.", role: "Patient since 2020", text: "Dr. Mehta explained my condition in plain language. No unnecessary tests, no vague advice. Just clarity.", stars: 5 },
  { name: "Suresh M.", role: "Patient since 2023", text: "The environment itself is calming. The staff are warm without being performative. Exactly what a clinic should feel like.", stars: 5 },
];

export interface FAQItem {
  q: string;
  a: string;
}

export const faqs: FAQItem[] = [
  { q: "How do appointments work?", a: "You can book online or call us directly. We confirm your slot within a few hours and send you a reminder the day before." },
  { q: "What are consultation timings?", a: "Monday through Saturday, 9 AM to 7 PM. Sundays are available for limited hours — 10 AM to 2 PM." },
  { q: "Do I need to bring prior reports?", a: "If you have recent test results, prescriptions, or discharge summaries, please bring them. It gives us a much clearer starting point." },
  { q: "Is follow-up required after treatment?", a: "It depends on your condition. Dr. Mehta will tell you directly whether and when to return — no unnecessary visits." },
  { q: "What conditions does the clinic handle?", a: "We cover general medicine, preventive care, chronic conditions, skin and dental health, cardiac evaluations, and physiotherapy." },
];

export interface Step {
  num: string;
  Icon: LucideIcon;
  title: string;
  desc: string;
}

export const steps: Step[] = [
  { num: "01", Icon: Calendar as LucideIcon, title: "Book your visit", desc: "Schedule online or call us. You'll receive confirmation within a few hours and a reminder before your visit." },
  { num: "02", Icon: Stethoscope as LucideIcon, title: "Consult with Dr. Mehta", desc: "A focused, unhurried consultation, he'll review your history, examine you, and explain his assessment clearly." },
  { num: "03", Icon: FileText as LucideIcon, title: "Leave with a clear plan", desc: "Every patient leaves understanding their diagnosis and next steps. No jargon, no ambiguity, just clarity." },
];

export interface WhyUsItem {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

export const whyUs: WhyUsItem[] = [
  { icon: React.createElement(BadgeCheck, { className: "w-5 h-5 text-[#3BAA7E]" }), title: "Evidence-based only", desc: "No unnecessary tests, no speculative prescriptions. Every recommendation is grounded in clinical evidence." },
  { icon: React.createElement(Users, { className: "w-5 h-5 text-[#3BAA7E]" }), title: "Continuity of care", desc: "Dr. Mehta follows your case over time. You aren't handed off, you're known." },
  { icon: React.createElement(Microscope, { className: "w-5 h-5 text-[#3BAA7E]" }), title: "Modern diagnostics on-site", desc: "Core tests and evaluations are done within the clinic. Fewer referrals, faster results." },
  { icon: React.createElement(Zap, { className: "w-5 h-5 text-[#3BAA7E]" }), title: "Minimal wait times", desc: "Appointments run on schedule. Your time is treated with the same respect as your health." },
];

