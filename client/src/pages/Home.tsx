import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ArrowUpRight, Mail, Github, Twitter, Linkedin } from "lucide-react";

// --- Components ---

const Section = ({ title, children, className = "" }: { title: string, children: React.ReactNode, className?: string }) => (
  <section className={`mb-24 ${className}`}>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-8"
    >
      {title}
    </motion.h2>
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
      className="border-b border-border pb-4"
    >
      <button 
        onClick={onClick}
        className="w-full flex items-center justify-between py-2 group hover:text-primary transition-colors text-left"
      >
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
          <span className="text-lg font-medium uppercase tracking-tight">{title}</span>
          {subtitle && <span className="text-sm text-muted-foreground group-hover:text-primary/70 transition-colors">{subtitle}</span>}
        </div>
        <span className="text-muted-foreground group-hover:text-primary transition-colors">
          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pt-4 pb-2 text-sm sm:text-base leading-relaxed text-muted-foreground max-w-2xl">
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
    className="flex items-center justify-between py-3 border-b border-border group hover:border-primary/50 transition-colors"
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
  >
    <span className="text-lg font-medium group-hover:text-primary group-hover:pl-2 transition-all duration-300">{label}</span>
    <div className="flex items-center gap-4">
      {meta && <span className="text-xs text-muted-foreground font-mono hidden sm:inline-block">{meta}</span>}
      <ArrowUpRight size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
    </div>
  </motion.a>
);

const StatItem = ({ label, value }: { label: string, value: string }) => (
  <div className="flex justify-between items-baseline py-2 border-b border-dashed border-border">
    <span className="text-sm text-muted-foreground uppercase tracking-wider">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

// --- Data ---

const projects = [
  {
    title: "VentureScout",
    subtitle: "AI Due Diligence Platform",
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
    <div className="min-h-screen max-w-screen-md mx-auto px-6 py-12 sm:py-24 selection:bg-primary selection:text-white">
      {/* Header */}
      <header className="mb-32">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-start mb-24"
        >
          <div className="w-6 h-6 bg-primary" />
          <nav className="flex gap-6 text-xs font-bold uppercase tracking-widest">
            <a href="mailto:hello@mcthaydt.com" className="hover:text-primary transition-colors">Email</a>
            <a href="#" className="hover:text-primary transition-colors">Twitter</a>
            <a href="#" className="hover:text-primary transition-colors">GitHub</a>
          </nav>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-6xl font-bold uppercase tracking-tighter leading-[0.9] mb-8">
            HEY, I'M MCTHAY.
            <br />
            <span className="text-muted-foreground">DESIGN ENGINEER.</span>
          </h1>
          <div className="max-w-xl space-y-6 text-lg sm:text-xl leading-relaxed">
            <p>
              I build digital products for the <span className="text-primary font-medium">ambitious few</span>. 
              Currently crafting high-performance interfaces for elite VCs and accelerators.
            </p>
            <p className="text-muted-foreground">
              Based in San Francisco. Obsessed with micro-interactions, brutalist typography, and shipping code that feels like magic.
            </p>
          </div>
        </motion.div>
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
            <p className="mb-4">{project.description}</p>
            <a href={project.link} className="inline-flex items-center text-primary font-bold hover:underline">
              VIEW CASE STUDY <ArrowUpRight size={14} className="ml-1" />
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

      {/* Prompt Library (Link List) */}
      <Section title="Prompt Library">
        <div className="space-y-0">
          <LinkItem href="#" label="VC Investment Memo Generator" meta="GPT-4o" />
          <LinkItem href="#" label="SaaS Landing Page Copy" meta="Claude 3.5" />
          <LinkItem href="#" label="Cold Outreach Sequencer" meta="GPT-4o" />
          <LinkItem href="#" label="Technical Co-founder Hunter" meta="Perplexity" />
        </div>
      </Section>

      {/* Info / Personal Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
        <Section title="Psychographics">
          <div className="space-y-1">
            <StatItem label="Myers-Briggs" value="INTJ-A" />
            <StatItem label="Enneagram" value="Type 5w6" />
            <StatItem label="Big 5 (O)" value="96% Openness" />
            <StatItem label="Big 5 (C)" value="92% Conscientiousness" />
            <StatItem label="Astrology" value="Scorpio Sun" />
          </div>
        </Section>

        <Section title="Favorite Things">
          <div className="space-y-1">
            <StatItem label="Editor" value="VS Code" />
            <StatItem label="Typeface" value="Geist Mono" />
            <StatItem label="Coffee" value="Pour Over (Ethiopian)" />
            <StatItem label="City" value="Tokyo" />
            <StatItem label="Book" value="Snow Crash" />
          </div>
        </Section>
      </div>

      {/* TL;DR / Contact */}
      <Section title="TL;DR">
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <p className="text-xl">
            I started coding when I was 12. I've sold two micro-SaaS apps, failed at three others, and learned more from the failures.
            I don't believe in pixel-pushing without purpose. Every interaction must earn its place on the screen.
          </p>
          <div className="mt-12 p-8 border border-dashed border-border bg-muted/20">
            <h3 className="text-lg font-bold uppercase mb-4">Let's Build Something</h3>
            <p className="mb-6 text-muted-foreground">
              Currently accepting new projects for Q4 2025. Minimum engagement $15k.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="mailto:hello@mcthaydt.com" className="bg-foreground text-background px-6 py-3 font-bold uppercase hover:bg-primary transition-colors">
                Get in Touch
              </a>
              <a href="#" className="border border-foreground px-6 py-3 font-bold uppercase hover:bg-muted transition-colors">
                Copy Email
              </a>
            </div>
          </div>
        </div>
      </Section>
      
      <footer className="flex justify-between text-xs text-muted-foreground uppercase tracking-widest pt-12 border-t border-border">
        <span>© 2025 McThayDT</span>
        <span>San Francisco, CA</span>
      </footer>
    </div>
  );
}
