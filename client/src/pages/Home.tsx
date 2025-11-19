import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ArrowUpRight, Moon, Sun, Twitter } from "lucide-react";
import { Globe } from "@/components/ui/globe";

// --- Components ---

const NoiseOverlay = () => (
  <div className="bg-noise mix-blend-multiply dark:mix-blend-overlay" />
);

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
      className="fixed bottom-8 right-8 z-40 p-3 bg-foreground text-background hover:bg-primary hover:text-white transition-colors rounded-full shadow-lg"
      aria-label="Toggle theme"
    >
      {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
    </button>
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
        className="w-full flex items-center justify-between group hover:text-primary transition-colors text-left"
      >
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6">
          <span className="text-2xl sm:text-3xl font-medium uppercase tracking-tight">{title}</span>
          {subtitle && <span className="text-sm font-mono text-muted-foreground group-hover:text-primary/70 transition-colors">[{subtitle}]</span>}
        </div>
        <span className="text-muted-foreground group-hover:text-primary transition-colors">
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

const LinkItem = ({ href, label, meta }: { href: string, label: string, meta?: string }) => (
  <motion.a 
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-between py-4 border-b border-border group hover:bg-muted/30 transition-colors px-2 -mx-2"
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
  >
    <span className="text-lg font-medium group-hover:text-primary group-hover:translate-x-2 transition-all duration-300">{label}</span>
    <div className="flex items-center gap-4">
      {meta && (
        <span className="px-2 py-1 text-[10px] uppercase tracking-wider border border-border rounded-full text-muted-foreground font-mono group-hover:border-primary/30 transition-colors">
          {meta}
        </span>
      )}
      <ArrowUpRight size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
    </div>
  </motion.a>
);

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
  <div className="flex justify-between items-baseline py-2 border-b border-dashed border-border last:border-0 group hover:bg-muted/20 transition-colors px-2 -mx-2">
    <span className="text-sm font-bold uppercase tracking-wider text-muted-foreground group-hover:text-primary transition-colors">{label}</span>
    <span className="font-mono text-right">{value}</span>
  </div>
);

// --- Data ---

const projects = [
  {
    title: "VentureScout",
    subtitle: "AI Due Diligence",
    description: "An automated due diligence engine for early-stage investors. Aggregates data from 50+ sources to generate comprehensive risk reports in seconds. Used by 3 Tier-1 VCs.",
    link: "#"
  },
  {
    title: "Nebula Protocol",
    subtitle: "Decentralized Identity",
    description: "Self-sovereign identity layer built on Solana. Focused on privacy-preserving KYC for DeFi applications. $1.2M seed round raised.",
    link: "#"
  },
  {
    title: "Chronos",
    subtitle: "Productivity OS",
    description: "A minimalist calendar and task manager that adapts to your energy levels. Built with React, Rust, and sheer willpower. 10k+ MAU.",
    link: "#"
  },
  {
    title: "Hyperion",
    subtitle: "Design System",
    description: "A comprehensive design system for enterprise applications. Focused on accessibility, performance, and developer experience. Open source.",
    link: "#"
  }
];

const services = [
  {
    title: "Product Strategy",
    description: "From zero to one. I help founders refine their vision, define MVPs, and find product-market fit through rapid iteration and user feedback loops."
  },
  {
    title: "Full-Stack Design",
    description: "I don't just make things pretty. I build systems. Design systems, component libraries, and high-fidelity prototypes that bridge the gap between design and engineering."
  },
  {
    title: "Technical Advisory",
    description: "Bridging the gap for non-technical founders. Architecture review, tech stack selection, and hiring support for founding engineering teams."
  }
];

export default function Home() {
  const [openProject, setOpenProject] = useState<number | null>(0);
  const [openService, setOpenService] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <NoiseOverlay />
      <ThemeToggle />
      
      <div className="max-w-screen-lg mx-auto px-6 py-12 sm:py-24 relative z-10">
        {/* Header */}
        <header className="mb-40 relative">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-between items-start mb-24"
          >
            <div className="w-8 h-8 bg-primary animate-pulse" />
            <nav className="flex gap-8 text-xs font-bold uppercase tracking-widest">
              <a href="mailto:hello@mcthaydt.com" className="hover:text-primary hover:underline decoration-2 underline-offset-4 transition-all">Email</a>
              <a href="#" className="hover:text-primary hover:underline decoration-2 underline-offset-4 transition-all">Twitter</a>
              <a href="#" className="hover:text-primary hover:underline decoration-2 underline-offset-4 transition-all">GitHub</a>
            </nav>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            <div className="lg:col-span-2 relative z-20">
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
            
            {/* 3D Spinning Globe */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="hidden lg:block relative h-[400px] w-[400px] -mr-24"
            >
              <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full" />
              <Globe className="relative z-10" />
            </motion.div>
          </div>
        </header>

        {/* Projects */}
        <Section title="Selected Works">
          {projects.map((project, index) => (
            <AccordionItem
              key={index}
              title={project.title}
              subtitle={project.subtitle}
              isOpen={openProject === index}
              onClick={() => setOpenProject(openProject === index ? null : index)}
            >
              <p className="mb-6">{project.description}</p>
              <a href={project.link} className="inline-flex items-center text-primary font-bold uppercase tracking-wider hover:gap-2 transition-all">
                View Case Study <ArrowUpRight size={16} className="ml-1" />
              </a>
            </AccordionItem>
          ))}
        </Section>

        {/* Services */}
        <Section title="Services">
          {services.map((service, index) => (
            <AccordionItem
              key={index}
              title={service.title}
              isOpen={openService === index}
              onClick={() => setOpenService(openService === index ? null : index)}
            >
              {service.description}
            </AccordionItem>
          ))}
        </Section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-12">
          {/* Prompt Library & Favorite Things */}
          <div className="space-y-24">
            <Section title="Prompt Library" className="mb-0">
              <div className="space-y-0">
                <LinkItem href="#" label="VC Investment Memo Generator" meta="GPT-4o" />
                <LinkItem href="#" label="SaaS Landing Page Copy" meta="Claude 3.5" />
                <LinkItem href="#" label="Cold Outreach Sequencer" meta="GPT-4o" />
                <LinkItem href="#" label="Technical Co-founder Hunter" meta="Perplexity" />
              </div>
            </Section>

            <Section title="Favorite Things" className="mb-0">
              <div className="space-y-1">
                <FactItem label="Editor" value="VS Code" />
                <FactItem label="Typeface" value="Geist Mono" />
                <FactItem label="Coffee" value="Pour Over" />
                <FactItem label="City" value="Tokyo" />
                <FactItem label="Reading" value="Snow Crash" />
              </div>
            </Section>
          </div>

          {/* Psychographics */}
          <Section title="Psychographics">
            <div className="space-y-2">
              <VisualStat label="Openness" value={96} />
              <VisualStat label="Conscientiousness" value={92} />
              <VisualStat label="Extraversion" value={45} />
              <div className="mt-8 space-y-1">
                <FactItem label="Myers-Briggs" value="INTJ-A" />
                <FactItem label="Enneagram" value="Type 5w6" />
                <FactItem label="Astrology" value="Scorpio Sun" />
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
                 {/* We can reuse the theme toggle button for visual consistency or keep it fixed */}
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
