import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Plus, Minus, ArrowUpRight, Moon, Sun, Twitter, Copy, Check } from "lucide-react";
import { AsciiGlobe } from "@/components/ui/ascii-globe";
import { useQuery } from "@tanstack/react-query";
import type { Project, Service, Prompt, Psychographic } from "@shared/schema";

// --- Components ---

const NoiseOverlay = () => (
  <div className="bg-noise mix-blend-multiply dark:mix-blend-overlay" />
);

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50 mix-blend-difference"
      style={{ scaleX }}
    />
  );
};

const ThemeToggle = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <button 
      onClick={toggleTheme}
      className="fixed bottom-8 right-8 z-50 p-3 bg-foreground text-background hover:bg-primary hover:text-white transition-colors rounded-full shadow-lg"
      aria-label="Toggle theme"
    >
      {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
};

const NavLink = ({ href, children }: { href: string, children: React.ReactNode }) => {
  return (
    <a 
      href={href} 
      className="relative group overflow-hidden inline-block"
    >
      <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
        {children}
      </span>
      <span className="absolute top-0 left-0 inline-block translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-primary">
        [{children}]
      </span>
    </a>
  );
};

const Section = ({ title, children, className = "" }: { title: string, children: React.ReactNode, className?: string }) => (
  <section className={`mb-32 ${className}`}>
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex items-center gap-4 mb-12"
    >
      <div className="h-px w-8 bg-primary" />
      <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
        {title}
      </h2>
    </motion.div>
    <div className="space-y-4">
      {children}
    </div>
  </section>
);

const AccordionItem = ({ title, subtitle, children, isOpen, onClick }: { title: string, subtitle?: string, children: React.ReactNode, isOpen: boolean, onClick: () => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="border-b border-border pb-6"
    >
      <button 
        onClick={onClick}
        className="w-full flex items-center justify-between group transition-colors text-left py-2"
      >
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 pr-4">
          <span className={`text-2xl sm:text-3xl font-medium uppercase tracking-tight leading-none transition-colors ${isOpen ? 'text-primary' : 'group-hover:text-primary'}`}>
            {title}
          </span>
          {subtitle && <span className="text-sm font-mono text-muted-foreground group-hover:text-primary/70 transition-colors">[{subtitle}]</span>}
        </div>
        <span className={`text-muted-foreground transition-transform duration-300 ${isOpen ? 'text-primary rotate-180' : 'group-hover:text-primary'}`}>
          {isOpen ? <Minus size={24} /> : <Plus size={24} />}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-6 pb-2 text-base sm:text-lg leading-relaxed text-muted-foreground max-w-2xl">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const VisualStat = ({ label, value, max = 100, suffix = "%" }: { label: string, value: number, max?: number, suffix?: string }) => (
  <div className="mb-6">
    <div className="flex justify-between items-end mb-2">
      <span className="text-sm font-bold uppercase tracking-wider text-muted-foreground">{label}</span>
      <span className="font-mono text-sm">{value}{suffix}</span>
    </div>
    <div className="h-2 w-full bg-muted overflow-hidden relative">
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: `${(value / max) * 100}%` }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        className="h-full bg-foreground absolute top-0 left-0"
      />
    </div>
  </div>
);

const FactItem = ({ label, value }: { label: string, value: string }) => (
  <div className="flex justify-between items-baseline py-2 border-b border-dashed border-border last:border-0 group hover:bg-muted/20 transition-colors px-2 -mx-2 cursor-default">
    <span className="text-sm font-bold uppercase tracking-wider text-muted-foreground group-hover:text-primary transition-colors">{label}</span>
    <span className="font-mono text-right group-hover:translate-x-[-4px] transition-transform duration-300">{value}</span>
  </div>
);

const ListBlock = ({ items, boldPrefix = false }: { items: string[], boldPrefix?: boolean }) => (
  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
    {items.map((item, i) => {
      const parts = item.split(":");
      const hasSeparator = parts.length > 1;
      
      return (
        <li key={i} className="flex items-start gap-2 text-base group hover:text-foreground text-muted-foreground transition-colors">
          <span className="text-primary/50 mt-1.5 text-[10px] group-hover:text-primary transition-colors">●</span>
          <span>
            {boldPrefix && hasSeparator ? (
              <>
                <strong className="font-bold text-foreground">{parts[0]}:</strong>{parts.slice(1).join(":")}
              </>
            ) : (
              item
            )}
          </span>
        </li>
      );
    })}
  </ul>
);

const CopyButton = ({ content }: { content: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button 
      onClick={handleCopy}
      className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all p-2 hover:bg-background rounded-md border border-transparent hover:border-border"
      title="Copy to clipboard"
    >
      {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
    </button>
  );
};

export default function Home() {
  const [openProject, setOpenProject] = useState<number | null>(0);
  const [openService, setOpenService] = useState<number | null>(null);
  const [openPrompt, setOpenPrompt] = useState<number | null>(null);
  const [openFact, setOpenFact] = useState<string | null>("games");

  const { data: projects, isError: isProjectsError } = useQuery<Project[]>({ 
    queryKey: ["/api/projects"],
    queryFn: async () => {
      const res = await fetch("/api/projects");
      if (!res.ok) throw new Error("Failed to fetch projects");
      return res.json();
    }
  });
  const { data: services, isError: isServicesError } = useQuery<Service[]>({ 
    queryKey: ["/api/services"],
    queryFn: async () => {
      const res = await fetch("/api/services");
      if (!res.ok) throw new Error("Failed to fetch services");
      return res.json();
    }
  });
  const { data: prompts, isError: isPromptsError } = useQuery<Prompt[]>({ 
    queryKey: ["/api/prompts"],
    queryFn: async () => {
      const res = await fetch("/api/prompts");
      if (!res.ok) throw new Error("Failed to fetch prompts");
      return res.json();
    }
  });
  const { data: funFacts, isError: isFactsError } = useQuery<Record<string, string[]>>({ 
    queryKey: ["/api/facts"],
    queryFn: async () => {
      const res = await fetch("/api/facts");
      if (!res.ok) throw new Error("Failed to fetch facts");
      return res.json();
    }
  });
  const { data: psychographics, isError: isPsychographicsError } = useQuery<Psychographic[]>({ 
    queryKey: ["/api/psychographics"],
    queryFn: async () => {
      const res = await fetch("/api/psychographics");
      if (!res.ok) throw new Error("Failed to fetch psychographics");
      return res.json();
    }
  });

  const stats = psychographics?.filter(p => p.type === "stat") || [];
  const facts = psychographics?.filter(p => p.type === "fact") || [];

  if (isProjectsError || isServicesError || isPromptsError || isFactsError || isPsychographicsError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="text-red-500 text-xl font-mono border border-red-500 p-4 bg-red-500/10">
          SYSTEM_MALFUNCTION: DATA_CORRUPTION_DETECTED
          <br/>
          <span className="text-sm opacity-70">Please refresh the neural link.</span>
        </div>
      </div>
    );
  }

  if (!projects || !services || !prompts || !funFacts || !psychographics) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="animate-pulse text-primary text-xl font-mono">LOADING_SYSTEM...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 relative overflow-x-hidden">
      <ScrollProgress />
      <NoiseOverlay />
      <ThemeToggle />
      
      <div className="max-w-screen-lg mx-auto px-6 py-12 sm:py-24 relative z-10">
        {/* Header */}
        <header className="mb-40 relative min-h-[50vh] flex flex-col justify-center">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-between items-start mb-24 relative z-20"
          >
            <div className="w-8 h-8 bg-primary animate-pulse" />
            <nav className="flex gap-8 text-xs font-bold uppercase tracking-widest">
              <NavLink href="mailto:hello@mcthaydt.com">Email</NavLink>
              <NavLink href="#">Twitter</NavLink>
              <NavLink href="#">GitHub</NavLink>
            </nav>
          </motion.div>

          <div className="relative">
            {/* ASCII Wireframe Globe - Positioned Absolutely Behind */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.15 }}
              transition={{ delay: 0.8, duration: 1.5 }}
              className="absolute -top-20 -right-20 sm:-right-40 w-[100%] sm:w-[600px] h-[600px] flex items-center justify-center z-0 pointer-events-none mix-blend-multiply dark:mix-blend-screen"
            >
              <AsciiGlobe className="text-primary dark:text-primary scale-[1.5] sm:scale-[1.8] origin-center" />
            </motion.div>

            <div className="relative z-10 max-w-2xl">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-5xl sm:text-7xl md:text-8xl font-bold uppercase tracking-tighter leading-[0.85] mb-12"
              >
                HEY, I'M <br/>
                <span className="text-outline-foreground text-transparent bg-clip-text bg-foreground">MCTHAY.</span>
              </motion.h1>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="max-w-xl space-y-6 text-xl sm:text-2xl leading-relaxed font-light"
              >
                <p>
                  Design Engineer for the <span className="text-primary font-medium">ambitious few</span>. 
                  Crafting high-performance interfaces for elite VCs and accelerators.
                </p>
              </motion.div>
            </div>
          </div>
        </header>

        {/* Projects */}
        <Section title="Selected Works">
          {projects.map((project, index) => (
            <AccordionItem
              key={project.id}
              title={project.title}
              subtitle={project.subtitle}
              isOpen={openProject === index}
              onClick={() => setOpenProject(openProject === index ? null : index)}
            >
              <p className="mb-6">{project.description}</p>
              <a href={project.link} className="inline-flex items-center text-primary font-bold uppercase tracking-wider hover:gap-2 transition-all group/link">
                View Case Study <ArrowUpRight size={16} className="ml-1 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
              </a>
            </AccordionItem>
          ))}
        </Section>

        {/* Services */}
        <Section title="Services">
          {services.map((service, index) => (
            <AccordionItem
              key={service.id}
              title={service.title}
              isOpen={openService === index}
              onClick={() => setOpenService(openService === index ? null : index)}
            >
              {service.description}
            </AccordionItem>
          ))}
        </Section>

        {/* Prompt Library */}
        <Section title="Prompt Library">
          {prompts.map((prompt, index) => (
            <AccordionItem
              key={prompt.id}
              title={prompt.title}
              subtitle={prompt.subtitle}
              isOpen={openPrompt === index}
              onClick={() => setOpenPrompt(openPrompt === index ? null : index)}
            >
              <div className="bg-muted/20 p-6 border border-border font-mono text-sm relative group hover:border-primary/30 transition-colors">
                <CopyButton content={prompt.content} />
                <p className="leading-relaxed whitespace-pre-wrap">{prompt.content}</p>
              </div>
            </AccordionItem>
          ))}
        </Section>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-12">
          
          {/* Fact Sheet */}
          <Section title="Fact Sheet" className="mb-0">
            <div className="space-y-0">
              <AccordionItem
                title="Favorite Games"
                isOpen={openFact === "games"}
                onClick={() => setOpenFact(openFact === "games" ? null : "games")}
              >
                <ListBlock items={funFacts.games || []} />
              </AccordionItem>

              <AccordionItem
                title="Favorite Films"
                isOpen={openFact === "films"}
                onClick={() => setOpenFact(openFact === "films" ? null : "films")}
              >
                <ListBlock items={funFacts.films || []} />
              </AccordionItem>

              <AccordionItem
                title="Favorite TV Shows"
                isOpen={openFact === "tv"}
                onClick={() => setOpenFact(openFact === "tv" ? null : "tv")}
              >
                <ListBlock items={funFacts.tv || []} />
              </AccordionItem>

              <AccordionItem
                title="Favorite Artists"
                isOpen={openFact === "artists"}
                onClick={() => setOpenFact(openFact === "artists" ? null : "artists")}
              >
                <ListBlock items={funFacts.artists || []} />
              </AccordionItem>

              <AccordionItem
                title="Hobbies"
                isOpen={openFact === "hobbies"}
                onClick={() => setOpenFact(openFact === "hobbies" ? null : "hobbies")}
              >
                <ListBlock items={funFacts.hobbies || []} />
              </AccordionItem>

              <AccordionItem
                title="Favorite Episodes"
                isOpen={openFact === "episodes"}
                onClick={() => setOpenFact(openFact === "episodes" ? null : "episodes")}
              >
                <ListBlock items={funFacts.episodes || []} boldPrefix={true} />
              </AccordionItem>
            </div>
          </Section>

          {/* Psychographics */}
          <Section title="Psychographics">
            <div className="space-y-2">
              {stats.map((stat) => (
                <VisualStat 
                  key={stat.id}
                  label={stat.label} 
                  value={parseInt(stat.value)} 
                  max={stat.maxValue || 100} 
                  suffix={stat.suffix || "%"} 
                />
              ))}
              
              <div className="mt-8 grid grid-cols-2 gap-4 mb-6">
                {facts.slice(0, 2).map((fact) => (
                  <FactItem key={fact.id} label={fact.label} value={fact.value} />
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                {facts.slice(2).map((fact) => (
                   <FactItem key={fact.id} label={fact.label} value={fact.value} />
                ))}
              </div>
            </div>
          </Section>
        </div>

        {/* Contact / Footer */}
        <section className="mt-32 pt-12 border-t-2 border-foreground">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold uppercase tracking-tighter mb-6">Let's Build<br/>The Future.</h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-md">
                Currently accepting new projects for Q4 2025. 
                I only work with founders who are obsessed with quality.
              </p>
            </div>
            <div className="flex flex-col items-start justify-center space-y-4">
               <a href="mailto:hello@mcthaydt.com" className="group flex items-center gap-4 text-2xl sm:text-3xl font-medium hover:text-primary transition-colors">
                 hello@mcthaydt.com 
                 <ArrowUpRight className="opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
               </a>
               <div className="flex gap-6 mt-8">
                 <a href="#" className="h-12 w-12 flex items-center justify-center border border-border hover:bg-foreground hover:text-background transition-colors rounded-full">
                   <Twitter size={20} />
                 </a>
               </div>
            </div>
          </div>
          
          <footer className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-24">
            <span>© 2025 McThayDT // Design Engineer</span>
            <span>San Francisco, CA // 37.7749° N, 122.4194° W</span>
          </footer>
        </section>
      </div>
    </div>
  );
}
