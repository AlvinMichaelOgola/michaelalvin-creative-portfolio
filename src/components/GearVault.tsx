import { motion } from "framer-motion";

const gear = [
  { title: "Sony a7iii", subtitle: "85mm f/1.4", desc: "Primary body for portraits & commercial work" },
  { title: "Nikon D5300", subtitle: "18-55mm & 35mm", desc: "Backup & street photography" },
  { title: "Continuous Lighting", subtitle: "Aputure 300d II", desc: "Studio & video lighting kit" },
  { title: "iPhone 14", subtitle: "ProRAW", desc: "Run-and-gun & behind the scenes" },
];

const GearVault = () => {
  return (
    <section className="section-padding py-32" id="gear">
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">Equipment</p>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">The Gear Vault</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
        {gear.map((item, i) => (
          <motion.div
            key={item.title}
            className="surface-card rounded-3xl p-8 group transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_0_1px_hsla(0,0%,100%,0.1)]"
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 className="text-xl font-bold text-foreground tracking-tight">{item.title}</h3>
            <p className="text-sm text-muted-foreground mt-1 font-medium">{item.subtitle}</p>
            <p className="text-sm text-muted-foreground/60 mt-4 leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default GearVault;
