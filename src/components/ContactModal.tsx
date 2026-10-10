import { X, Mail, Globe, Calendar } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  contact?: {
    email: string;
    phone: string;
  } | null;
  social?: {
    instagram: string;
    x: string;
    behance: string;
  } | null;
}

function normalizeSocialUrl(value: string, provider: "instagram" | "x" | "behance") {
  const raw = value.trim();
  if (!raw) {
    return "";
  }
  if (/^https?:\/\//i.test(raw)) {
    return raw;
  }
  const handle = raw.replace(/^@/, "");
  if (provider === "instagram") {
    return `https://instagram.com/${handle}`;
  }
  if (provider === "x") {
    return `https://x.com/${handle}`;
  }
  return `https://behance.net/${handle}`;
}

const ContactModal = ({ isOpen, onClose, contact, social }: ContactModalProps) => {
  const email = contact?.email?.trim() ?? "";
  const phone = contact?.phone?.trim() ?? "";
  const instagramUrl = normalizeSocialUrl(social?.instagram ?? "", "instagram");
  const xUrl = normalizeSocialUrl(social?.x ?? "", "x");
  const behanceUrl = normalizeSocialUrl(social?.behance ?? "", "behance");
  const instagramHandle = instagramUrl
    .replace(/^https?:\/\/(www\.)?instagram\.com\//i, "")
    .replace(/\/$/, "");
  const xHandle = xUrl
    .replace(/^https?:\/\/(www\.)?x\.com\//i, "")
    .replace(/\/$/, "");
  const behanceHandle = behanceUrl
    .replace(/^https?:\/\/(www\.)?behance\.net\//i, "")
    .replace(/\/$/, "");

  if (!isOpen) {
    return null;
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-background/60 backdrop-blur-xl"
        onClick={onClose}
      />

      {/* Sheet */}
      <div className="fixed inset-x-0 bottom-0 z-50 max-h-[85vh] overflow-y-auto glass-strong rounded-t-[2rem] section-padding pt-8 pb-20">
        {/* Handle */}
        <div className="w-10 h-1 rounded-full bg-foreground/20 mx-auto mb-8" />

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 min-h-[44px] min-w-[44px] p-2 rounded-full glass text-muted-foreground hover:text-foreground transition-colors"
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
          {email ? (
            <a
              href={`mailto:${email}`}
              className="glass-panel rounded-3xl min-h-[44px] p-6 flex flex-col items-center text-center gap-3 group transition-all duration-300 hover:scale-[1.02]"
            >
              <Mail size={24} className="text-muted-foreground group-hover:text-foreground transition-colors" />
              <span className="text-sm font-medium text-foreground">Email</span>
              <span className="text-xs text-muted-foreground">{email}</span>
            </a>
          ) : null}

              {instagramUrl ? (
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-panel rounded-3xl min-h-[44px] p-6 flex flex-col items-center text-center gap-3 group transition-all duration-300 hover:scale-[1.02]"
                >
                  <Globe size={24} className="text-muted-foreground group-hover:text-foreground transition-colors" />
                  <span className="text-sm font-medium text-foreground">Instagram</span>
                  <span className="text-xs text-muted-foreground">@{instagramHandle}</span>
                </a>
              ) : null}

              {xUrl ? (
                <a
                  href={xUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-panel rounded-3xl min-h-[44px] p-6 flex flex-col items-center text-center gap-3 group transition-all duration-300 hover:scale-[1.02]"
                >
                  <Globe size={24} className="text-muted-foreground group-hover:text-foreground transition-colors" />
                  <span className="text-sm font-medium text-foreground">X</span>
                  <span className="text-xs text-muted-foreground">@{xHandle}</span>
                </a>
              ) : null}

              {behanceUrl ? (
                <a
                  href={behanceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-panel rounded-3xl min-h-[44px] p-6 flex flex-col items-center text-center gap-3 group transition-all duration-300 hover:scale-[1.02]"
                >
                  <Globe size={24} className="text-muted-foreground group-hover:text-foreground transition-colors" />
                  <span className="text-sm font-medium text-foreground">Behance</span>
                  <span className="text-xs text-muted-foreground">{behanceHandle}</span>
                </a>
              ) : null}

              {phone ? (
                <a
                  href={`tel:${phone.replace(/\s+/g, "")}`}
                  className="glass-panel rounded-3xl min-h-[44px] p-6 flex flex-col items-center text-center gap-3 group transition-all duration-300 hover:scale-[1.02]"
                >
                  <Calendar size={24} className="text-muted-foreground group-hover:text-foreground transition-colors" />
                  <span className="text-sm font-medium text-foreground">Book a Call</span>
                  <span className="text-xs text-muted-foreground">
                    Schedule a session
                    <br />
                    {phone}
                  </span>
                </a>
              ) : null}
        </div>
        {!email && !instagramUrl && !xUrl && !behanceUrl && !phone ? (
          <p className="text-sm text-muted-foreground">No published contact details yet.</p>
        ) : null}
      </div>
    </>
  );
};

export default ContactModal;
