import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Instagram, Calendar } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-background/60 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          {/* Sheet */}
          <motion.div
            className="fixed inset-x-0 bottom-0 z-50 max-h-[85vh] glass-strong rounded-t-[2rem] section-padding pt-8 pb-12"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            {/* Handle */}
            <div className="w-10 h-1 rounded-full bg-foreground/20 mx-auto mb-8" />

            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full glass text-muted-foreground hover:text-foreground transition-colors"
            >
              <X size={18} />
            </button>

            <h3 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-2">
              Let's Connect
            </h3>
            <p className="text-muted-foreground text-sm mb-10 max-w-md">
              Whether it's a commercial campaign, portrait session, or adventure shoot — I'd love to hear about your vision.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl">
              <a
                href="mailto:hello@alvinmichael.com"
                className="surface-card rounded-3xl p-6 flex flex-col items-center text-center gap-3 group transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_0_1px_hsla(0,0%,100%,0.1)]"
              >
                <Mail size={24} className="text-muted-foreground group-hover:text-foreground transition-colors" />
                <span className="text-sm font-medium text-foreground">Email</span>
                <span className="text-xs text-muted-foreground">hello@alvinmichael.com</span>
              </a>

              <a
                href="https://instagram.com/alvinmichael"
                target="_blank"
                rel="noopener noreferrer"
                className="surface-card rounded-3xl p-6 flex flex-col items-center text-center gap-3 group transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_0_1px_hsla(0,0%,100%,0.1)]"
              >
                <Instagram size={24} className="text-muted-foreground group-hover:text-foreground transition-colors" />
                <span className="text-sm font-medium text-foreground">Instagram</span>
                <span className="text-xs text-muted-foreground">@alvinmichael</span>
              </a>

              <a
                href="#"
                className="surface-card rounded-3xl p-6 flex flex-col items-center text-center gap-3 group transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_0_1px_hsla(0,0%,100%,0.1)]"
              >
                <Calendar size={24} className="text-muted-foreground group-hover:text-foreground transition-colors" />
                <span className="text-sm font-medium text-foreground">Book a Call</span>
                <span className="text-xs text-muted-foreground">Schedule a session</span>
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
