import { useRef } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X, Mail, Instagram, Calendar } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  const opener = useRef<HTMLElement | null>(null);
  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
        <DialogPrimitive.Portal>
          {/* Backdrop */}
          <DialogPrimitive.Overlay
            className="fixed inset-0 z-50 bg-background/60 backdrop-blur-xl"
          />

          {/* Sheet */}
          <DialogPrimitive.Content
            className="fixed inset-x-0 bottom-0 z-50 max-h-[85dvh] overflow-y-auto overscroll-contain bg-background border border-border md:glass-strong rounded-t-[2rem] section-padding pt-8 pb-[max(2rem,env(safe-area-inset-bottom))] focus:outline-none"
            onOpenAutoFocus={() => {
              opener.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
            }}
            onCloseAutoFocus={(event) => {
              event.preventDefault();
              opener.current?.focus();
            }}
          >
            {/* Handle */}
            <div className="w-10 h-1 rounded-full bg-foreground/20 mx-auto mb-8" />

            {/* Close */}
            <DialogPrimitive.Close
              aria-label="Close contact details"
              className="absolute top-4 right-4 flex h-11 w-11 items-center justify-center rounded-full glass text-muted-foreground hover:text-foreground transition-colors"
            >
              <X size={18} />
            </DialogPrimitive.Close>

            <DialogPrimitive.Title className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-2">
              Let's Connect
            </DialogPrimitive.Title>
            <DialogPrimitive.Description className="text-muted-foreground text-sm mb-6 md:mb-10 max-w-md">
              Whether it's a commercial campaign, portrait session, or adventure shoot — I'd love to hear about your vision.
            </DialogPrimitive.Description>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl">
              <a
                href="mailto:michaelalvin.media@gmail.com"
                className="surface-card rounded-3xl p-6 flex flex-col items-center text-center gap-3 group transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_0_1px_hsla(0,0%,100%,0.1)]"
              >
                <Mail size={24} className="text-muted-foreground group-hover:text-foreground transition-colors" />
                <span className="text-sm font-medium text-foreground">Email</span>
                <span className="text-xs text-muted-foreground">michaelalvin.media@gmail.com</span>
              </a>

              <a
                href="https://instagram.com/_michaelalvin_"
                target="_blank"
                rel="noopener noreferrer"
                className="surface-card rounded-3xl p-6 flex flex-col items-center text-center gap-3 group transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_0_1px_hsla(0,0%,100%,0.1)]"
              >
                <Instagram size={24} className="text-muted-foreground group-hover:text-foreground transition-colors" />
                <span className="text-sm font-medium text-foreground">Instagram</span>
                <span className="text-xs text-muted-foreground">@_michaelalvin_</span>
              </a>

              <a
                href="#"
                className="surface-card rounded-3xl p-6 flex flex-col items-center text-center gap-3 group transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_0_1px_hsla(0,0%,100%,0.1)]"
              >
                <Calendar size={24} className="text-muted-foreground group-hover:text-foreground transition-colors" />
                <span className="text-sm font-medium text-foreground">Book a Call</span>
                <span className="text-xs text-muted-foreground">Schedule a session<br />+254 797 347 822</span>
              </a>
            </div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default ContactModal;
