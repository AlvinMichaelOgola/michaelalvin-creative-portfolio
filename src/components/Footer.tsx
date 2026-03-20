import { motion } from "framer-motion";

const Footer = ({ onContactClick }: { onContactClick: () => void }) => {
  return (
    <footer className="section-padding py-40 text-center">
      <motion.h2
        className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground text-balance mx-auto max-w-3xl leading-[1.05]"
        initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        Ready to Tell
        <br />
        Your Story?
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <button onClick={onContactClick} className="pill-button mt-10 text-base">
          Let's Create Together
        </button>
      </motion.div>

      <motion.p
        className="mt-24 text-xs text-muted-foreground/40 tracking-widest uppercase"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        © 2024 Alvin Michael. All rights reserved.
      </motion.p>
    </footer>
  );
};

export default Footer;
