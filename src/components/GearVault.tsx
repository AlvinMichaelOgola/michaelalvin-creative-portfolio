import type { GearContentItem } from "@/lib/cms-content";

const GearVault = ({ gear }: { gear?: GearContentItem[] }) => {
  const sourceGear = gear ?? [];

  return (
    <section className="section-padding py-10 md:py-24" id="gear">
      <div className="mb-12">
          <p className="section-title-pill mb-3 text-muted-foreground">Equipment</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">The Gear Vault</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl lg:mr-auto lg:ml-0">
        {sourceGear.length === 0 ? (
          <p className="text-muted-foreground text-sm md:text-base col-span-full">
            No published gear items yet.
          </p>
        ) : (
          sourceGear.map((item) => (
            <div
              key={item.title}
              className="glass-panel p-8 group transition-all duration-500 hover:scale-[1.02]"
            >
              <h3 className="text-xl font-bold text-foreground tracking-tight">{item.title}</h3>
              <p className="text-sm text-muted-foreground mt-1 font-medium">{item.subtitle}</p>
              <p className="text-sm text-muted-foreground/60 mt-4 leading-relaxed">{item.desc}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default GearVault;
