import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  hidden: boolean;
  scrollTo: (id: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  mobileMenuOpen,
  setMobileMenuOpen,
  hidden,
  scrollTo,
}) => {
  return (
    <>
      {/* Navbar */}
      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-0 w-full z-[100] glass shadow-sm"
      >
        <div className="max-w-[1200px] mx-auto px-6 h-[80px] flex items-center justify-between">
          
          {/* Logo */}
          <button
            onClick={() => scrollTo("home")}
            className="flex items-center gap-3 group"
          >
            <span className="text-xl font-heading text-[#0A2540]">
              Verity Health
            </span>
            <span className="w-2 h-2 rounded-full bg-[#3BAA7E] group-hover:scale-125 transition-transform duration-300" />
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-sm font-body-medium text-[#4A5568]">
            {[
              ["home", "Home"],
              ["services", "Services"],
              ["doctor", "Doctor"],
              ["faqs", "FAQs"],
              ["contact", "Contact"],
            ].map(([id, label]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="nav-link hover:text-[#0A2540] transition-colors duration-200"
              >
                {label}
              </button>
            ))}

            <Button
              onClick={() => scrollTo("booking")}
              className="bg-[#0A2540] text-white hover:bg-[#0A2540]/90 rounded-button px-8 h-11 text-sm font-medium btn-premium shadow-premium"
            >
              Book Consultation
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-[#0A2540] p-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="x"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="m"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-white pt-20 px-6 md:hidden"
          >
            <div className="flex flex-col space-y-1">
              {[
                ["home", "Home"],
                ["services", "Services"],
                ["doctor", "Doctor"],
                ["faqs", "FAQs"],
                ["contact", "Contact"],
              ].map(([id, label], i) => (
                <motion.button
                  key={id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => scrollTo(id)}
                  className="text-left py-4 text-xl font-medium text-[#0A2540] border-b border-[#E2E8F0]"
                >
                  {label}
                </motion.button>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
                className="pt-6"
              >
                <Button
                  onClick={() => scrollTo("booking")}
                  className="w-full bg-[#0A2540] text-white rounded-full h-12 text-base"
                >
                  Book Appointment
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;