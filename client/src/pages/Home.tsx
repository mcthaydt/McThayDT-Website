import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ArrowUpRight, Moon, Sun, Twitter, Copy } from "lucide-react";
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
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 pr-4">
          <span className="text-2xl sm:text-3xl font-medium uppercase tracking-tight leading-none">{title}</span>
          {subtitle && <span className="text-sm font-mono text-muted-foreground group-hover:text-primary/70 transition-colors">[{subtitle}]</span>}
        </div>
        <span className="text-muted-foreground group-hover:text-primary transition-colors shrink-0 ml-4">
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
  <div className="flex justify-between items-baseline py-2 border-b border-dashed border-border last:border-0 group hover:bg-muted/20 transition-colors px-2 -mx-2">
    <span className="text-sm font-bold uppercase tracking-wider text-muted-foreground group-hover:text-primary transition-colors">{label}</span>
    <span className="font-mono text-right">{value}</span>
  </div>
);

const ListBlock = ({ items }: { items: string[] }) => (
  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
    {items.map((item, i) => {
      // Check if item has a colon for bolding the prefix (Show Name: Episode)
      const parts = item.split(":");
      const hasSeparator = parts.length > 1;
      
      return (
        <li key={i} className="flex items-start gap-2 text-base">
          <span className="text-primary/50 mt-1.5 text-[10px]">●</span>
          <span>
            {hasSeparator ? (
              <>
                <strong className="font-bold">{parts[0]}:</strong>{parts.slice(1).join(":")}
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

const prompts = [
  {
    title: "VC Investment Memo",
    subtitle: "GPT-4o",
    content: "Act as a partner at Sequoia Capital. Write a comprehensive investment memo for a Seed stage B2B SaaS startup. Structure it with: Executive Summary, Market Opportunity (TAM/SAM/SOM), Product/Technology, Competition, Go-to-Market Strategy, Team, and Key Risks. Focus on 'Why Now?' and 'Why This Team?'. Use concise, professional language."
  },
  {
    title: "SaaS Landing Page Copy",
    subtitle: "Claude 3.5",
    content: "You are a world-class copywriter specializing in conversion rate optimization. Write the copy for a high-converting landing page for a developer tool. Use the PAS (Problem-Agitation-Solution) framework. Include: Headline (Value Prop), Subheadline (How it works), 3 Key Benefits with icons, Social Proof section, and a compelling CTA. Tone: Technical, confident, no-fluff."
  },
  {
    title: "Cold Outreach Sequencer",
    subtitle: "GPT-4o",
    content: "Draft a 4-email cold outreach sequence targeting CTOs of Series B fintech companies. Goal: Schedule a 15-minute demo of a new API security tool. Email 1: Personalized observation + value prop. Email 2: Case study/Social proof. Email 3: Overcoming objection (implementation time). Email 4: Break-up email. Keep each email under 100 words."
  },
  {
    title: "Technical Co-founder Hunter",
    subtitle: "Perplexity",
    content: "Find me potential technical co-founders in San Francisco who have: 1) Ex-Stripe or Ex-Coinbase engineering experience, 2) Interest in Rust and WebAssembly, 3) Recently left their job or started a side project in the last 6 months. Search GitHub, Twitter, and LinkedIn public posts."
  }
];

const funFacts = {
  games: [
    "Persona 4 (PS2)", "Ocarina of Time", "Smash Ultimate", "Spyro 3", 
    "Animal Crossing: Wild World", "Super Mario 64 DS", "Uncharted 2", "Arkham City", 
    "Soulcalibur (Dreamcast)", "Call of Duty: Mobile", "Little Big Planet 2", "Minecraft", 
    "Warhawk", "Star Wars: Battlefront 2 (PSP)", "League of Legends", "Balatro", 
    "GTA San Andreas", "Guitar Hero 3", "Burnout Paradise", "Super Mario Bros 3"
  ],
  films: [
    "Parasite", "Inception", "Melancholy of Haruhi Suzamiya", "Paris is Burning", 
    "You’re Next", "Mission Impossible: Fallout", "Hereditary", "Dune 2", "Anora", "The Departed"
  ],
  tv: [
    "The Sopranos", "Clannad: After Story", "Toradora", "The Wire", "Breaking Bad", 
    "Madoka Magica", "Steins;Gate", "Death Note", "Boy Meets World", "Dexter’s Laboratory", 
    "Severance", "Chapelle Show", "The Boondocks", "The Knick", "Insatiable", "The Entire Arrowverse"
  ],
  artists: [
    "Michael Jackson", "Deftones", "Radiohead", "Sade", "Lana Del Rey", 
    "Kali Uchis", "Whirr", "OutKast", "Men I Trust", "Roy Ayers", "Justin Timberlake"
  ],
  hobbies: [
    "Frisbee", "TouchTunes DJ’ing", "Darts", "Options and Meme Coin Trading", "Competitive Multiplayer Games"
  ],
  episodes: [
    "Breaking Bad: Ozymandias", "The Flash: Last Temptation of Barry Allen", "Supergirl: Falling", 
    "Sopranos: Long Term Parking", "Sopranos: Whitecaps", "The Wire: Final Grades", 
    "Avatar The Last Airbender: Ember Island Players", "Clannad After Story: White Darkness", 
    "Bakemonogatri: Tsubasa Cat, Part 2"
  ]
};

export default function Home() {
  const [openProject, setOpenProject] = useState<number | null>(0);
  const [openService, setOpenService] = useState<number | null>(null);
  const [openPrompt, setOpenPrompt] = useState<number | null>(null);
  const [openFact, setOpenFact] = useState<string | null>("games");

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

        {/* Prompt Library */}
        <Section title="Prompt Library">
          {prompts.map((prompt, index) => (
            <AccordionItem
              key={index}
              title={prompt.title}
              subtitle={prompt.subtitle}
              isOpen={openPrompt === index}
              onClick={() => setOpenPrompt(openPrompt === index ? null : index)}
            >
              <div className="bg-muted/20 p-6 border border-border font-mono text-sm relative group">
                <button className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-background rounded-md">
                  <Copy size={16} />
                </button>
                {prompt.content}
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
                <ListBlock items={funFacts.games} />
              </AccordionItem>

              <AccordionItem
                title="Favorite Films"
                isOpen={openFact === "films"}
                onClick={() => setOpenFact(openFact === "films" ? null : "films")}
              >
                <ListBlock items={funFacts.films} />
              </AccordionItem>

              <AccordionItem
                title="Favorite TV Shows"
                isOpen={openFact === "tv"}
                onClick={() => setOpenFact(openFact === "tv" ? null : "tv")}
              >
                <ListBlock items={funFacts.tv} />
              </AccordionItem>

              <AccordionItem
                title="Favorite Artists"
                isOpen={openFact === "artists"}
                onClick={() => setOpenFact(openFact === "artists" ? null : "artists")}
              >
                <ListBlock items={funFacts.artists} />
              </AccordionItem>

              <AccordionItem
                title="Hobbies"
                isOpen={openFact === "hobbies"}
                onClick={() => setOpenFact(openFact === "hobbies" ? null : "hobbies")}
              >
                <ListBlock items={funFacts.hobbies} />
              </AccordionItem>

              <AccordionItem
                title="Favorite Episodes"
                isOpen={openFact === "episodes"}
                onClick={() => setOpenFact(openFact === "episodes" ? null : "episodes")}
              >
                <ListBlock items={funFacts.episodes} />
              </AccordionItem>
            </div>
          </Section>

          {/* Psychographics */}
          <Section title="Psychographics">
            <div className="space-y-2">
              <VisualStat label="Openness" value={96} />
              <VisualStat label="Conscientiousness" value={92} />
              <VisualStat label="Extraversion" value={45} />
              <VisualStat label="Agreeableness" value={55} />
              <VisualStat label="Neuroticism" value={35} />
              
              <div className="mt-8 grid grid-cols-2 gap-4">
                <FactItem label="Sun" value="Scorpio" />
                <FactItem label="Moon" value="Aquarius" />
                <FactItem label="Rising" value="Virgo" />
                <FactItem label="Mercury" value="Scorpio" />
                <FactItem label="Venus" value="Capricorn" />
                <FactItem label="Mars" value="Virgo" />
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
