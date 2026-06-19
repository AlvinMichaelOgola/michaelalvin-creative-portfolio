import type { FooterContent } from "@/lib/cms-content";

const Footer = ({
  onContactClick,
  content,
}: {
  onContactClick: () => void;
  content?: FooterContent | null;
}) => {
  if (!content) {
    return null;
  }

  const footerContent = content;
  if (!footerContent.heading && !footerContent.ctaText && !footerContent.copyright) {
    return null;
  }
  const headingLines = footerContent.heading
    .split("\n")
    .filter((line) => line.trim().length > 0);

  return (
    <footer className="section-padding py-10 text-center">
      <div className="glass-panel px-5 py-10 md:px-12">
      <h2
        className="text-3xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground text-balance mx-auto max-w-3xl leading-[1.05]"
      >
        {headingLines.map((line, index) => (
          <span key={`${line}-${index}`}>
            {line}
            {index < headingLines.length - 1 ? <br /> : null}
          </span>
        ))}
      </h2>

      <div>
        {footerContent.ctaText ? (
          <button onClick={onContactClick} className="pill-button mt-10 w-full sm:w-auto text-base">
            {footerContent.ctaText}
          </button>
        ) : null}
      </div>

      <p className="mt-16 md:mt-24 text-xs text-muted-foreground/40 tracking-widest uppercase">
        {footerContent.copyright}
      </p>
      </div>
    </footer>
  );
};

export default Footer;
