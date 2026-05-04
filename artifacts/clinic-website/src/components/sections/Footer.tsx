import React from 'react';
import {
    Phone, Mail, MapPin, ChevronRight,
    Facebook, Instagram, Twitter, Linkedin,Heart
} from 'lucide-react';

const socials = [
    { Icon: Facebook, href: "#" },
    { Icon: Instagram, href: "#" },
    { Icon: Twitter, href: "#" },
    { Icon: Linkedin, href: "https://www.linkedin.com/company/clykur" },
];

export const Footer: React.FC = () => {
    return (
        <footer className="bg-[#0A2540] text-white section-padding overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#3BAA7E]/5 to-transparent" />
            <div className="max-w-[1200px] mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Logo + Tagline */}
                    <div className="md:col-span-1">
                        <button className="flex items-center gap-3 group mb-6">
                            <div className="w-10 h-10 rounded-premium bg-gradient-to-br from-[#3BAA7E] to-[#3BAA7E]/80 flex items-center justify-center shadow-premium">
                              <Heart className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-2xl font-heading text-white">Verity Health</span>
                        </button>
                        <p className="text-base text-white/70 leading-relaxed font-body">
                            Clear, compassionate, and evidence-based medical care. Your health is our priority.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h3 className="font-semibold text-white mb-6 text-lg">Navigation</h3>
                        <ul className="space-y-4">
                            {[["home", "Home"], ["services", "Services"], ["doctor", "Doctor"], ["contact", "Contact"]].map(([id, label]) => (
                                <li key={id}>
                                    <button className="text-white/70 hover:text-[#3BAA7E] transition-colors font-body flex items-center gap-2 group">
                                        <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-semibold text-white mb-6 text-lg">Contact</h3>
                        <div className="space-y-4">
                            <a href="tel:+918179299096" className="flex items-center gap-3 text-white/70 hover:text-[#3BAA7E] transition-colors">
                                <Phone className="w-4 h-4" />
                                <span className="font-body">+91 81792 99096</span>
                            </a>
                            <a href="mailto:hello@verityhealth.com" className="flex items-center gap-3 text-white/70 hover:text-[#3BAA7E] transition-colors">
                                <Mail className="w-4 h-4" />
                                <span className="font-body">hello@verityhealth.com</span>
                            </a>
                            <div className="flex items-start gap-3 text-white/70">
                                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                                <span className="font-body">123 Healthcare Ave<br />Medical District, MD 12345</span>
                            </div>
                        </div>
                    </div>

                    {/* Social */}
                    <div>
                        <h3 className="font-semibold text-white mb-6 text-lg">Follow Us</h3>
                        <p className="text-white/70 mb-6 font-body">Stay connected for health tips and updates.</p>
                        <div className="flex space-x-3">

                            <div className="flex space-x-3">
                                {socials.map(({ Icon, href }, i) => (
                                    <a
                                        key={i}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#3BAA7E] flex items-center justify-center text-white transition-all duration-300 group"
                                    >
                                        <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Gradient border */}
                <div className="mt-16 pt-8 border-t border-white/10 relative">
                    <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-[#3BAA7E] to-transparent" />
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-white/50 font-body">&copy; {new Date().getFullYear()} Verity Health. All rights reserved.</p>
                        <div className="flex items-center gap-6 text-sm text-white/50">
                            <a href="#" className="hover:text-[#3BAA7E] transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-[#3BAA7E] transition-colors">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};