import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import {
  Plus,
  Minus,
  ArrowUpRight,
  Moon,
  Sun,
  Linkedin,
  Twitter,
  Instagram,
  Github,
  Copy,
  Check,
  Lock,
} from "lucide-react";
import { AsciiGlobe } from "@/components/ui/ascii-globe";

// Import static data directly
import { projects } from "../data/projects";
import { services } from "../data/services";
import { prompts } from "../data/prompts";
import { funFacts } from "../data/facts";
import { psychographics } from "../data/psychographics";

// --- Constants ---

const SPACING = {
  container: "max-w-screen-lg mx-auto px-6 md:px-12 py-12 sm:py-24",
  sectionMb: "mb-24 sm:mb-32",
  sectionGap: "space-y-16",
  headerMb: "mb-32 sm:mb-40",
};

// --- Components ---

const NoiseOverlay = () => (
  <div className="bg-noise mix-blend-multiply dark:mix-blend-overlay" />
);

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
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
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const initialTheme = prefersDark ? "dark" : "light";
    setTheme(initialTheme);
    if (prefersDark) {
      document.documentElement.classList.add("dark");
    }
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

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
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

const Section = ({
  title,
  children,
  className = "",
  noMargin = false,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
  noMargin?: boolean;
}) => (
  <section className={`${noMargin ? "" : SPACING.sectionMb} ${className}`}>
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
    <div className="space-y-4">{children}</div>
  </section>
);

const AccordionItem = ({
  title,
  subtitle,
  children,
  isOpen,
  onClick,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
}) => {
  const itemRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    const wasOpen = isOpen;
    onClick();
    // Scroll to top when opening (wait for animation to complete)
    if (!wasOpen) {
      setTimeout(() => {
        itemRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 450);
    }
  };

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="border-b border-border pb-6"
    >
      <button
        onClick={handleClick}
        className="w-full flex items-center justify-between group transition-colors text-left py-2"
      >
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 pr-4">
          <span
            className={`text-2xl sm:text-3xl font-medium uppercase tracking-tight leading-none transition-colors ${
              isOpen ? "text-primary" : "group-hover:text-primary"
            }`}
          >
            {title}
          </span>
          {subtitle && (
            <span className="text-sm font-mono text-muted-foreground group-hover:text-primary/70 transition-colors">
              [{subtitle}]
            </span>
          )}
        </div>
        <span
          className={`text-muted-foreground transition-transform duration-300 ${
            isOpen ? "text-primary rotate-180" : "group-hover:text-primary"
          }`}
        >
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

const VisualStat = ({
  label,
  value,
  max = 100,
  suffix = "%",
}: {
  label: string;
  value: number;
  max?: number;
  suffix?: string;
}) => (
  <div className="mb-6">
    <div className="flex justify-between items-end mb-2">
      <span className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <span className="font-mono text-sm">
        {value}
        {suffix}
      </span>
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

const FactItem = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between items-baseline py-2 border-b border-dashed border-border last:border-0 group hover:bg-muted/20 transition-colors px-2 -mx-2 cursor-default">
    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground group-hover:text-primary transition-colors">
      {label}
    </span>
    <span className="font-mono text-sm text-right group-hover:translate-x-[-4px] transition-transform duration-300">
      {value}
    </span>
  </div>
);

const ListBlock = ({
  items,
  boldPrefix = false,
}: {
  items: string[];
  boldPrefix?: boolean;
}) => (
  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
    {items.map((item, i) => {
      const parts = item.split(":");
      const hasSeparator = parts.length > 1;

      return (
        <li
          key={i}
          className="flex items-start gap-2 text-base group hover:text-foreground text-muted-foreground transition-colors"
        >
          <span className="text-primary/50 mt-1.5 text-[10px] group-hover:text-primary transition-colors">
            ●
          </span>
          <span>
            {boldPrefix && hasSeparator ? (
              <>
                <strong className="font-bold text-foreground">
                  {parts[0]}:
                </strong>
                {parts.slice(1).join(":")}
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
      {copied ? (
        <Check size={16} className="text-green-500" />
      ) : (
        <Copy size={16} />
      )}
    </button>
  );
};

const ChicagoTime = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const chicagoTime = new Date().toLocaleTimeString("en-US", {
        timeZone: "America/Chicago",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setTime(chicagoTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return <span>{time}</span>;
};

export default function Home() {
  const [openProject, setOpenProject] = useState<number | null>(0);
  const [openService, setOpenService] = useState<number | null>(null);
  const [openPrompt, setOpenPrompt] = useState<number | null>(null);
  const [openFact, setOpenFact] = useState<string | null>("games");

  // Split psychographics into stats and facts
  const stats = psychographics?.filter((p) => p.type === "stat") || [];
  const facts = psychographics?.filter((p) => p.type === "fact") || [];

  return (
    <div className="min-h-screen animated-gradient text-foreground transition-colors duration-300 relative overflow-x-hidden cursor-none">
      <ScrollProgress />
      <NoiseOverlay />
      <ThemeToggle />

      <div className={SPACING.container}>
        {/* Header */}
        <header
          className={`${SPACING.headerMb} pt-8 relative flex flex-col gap-16`}
        >
          {/* ASCII Globe Background */}
          <div className="absolute right-0.5 md:right-24 top-[65%] -translate-y-1/2  translate-x-1/3 md:translate-x-0 opacity-30 pointer-events-none text-primary scale-200">
            <AsciiGlobe />
          </div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6 items-start w-full border-t border-border pt-6"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Finance Bro + Tech Bro + Artist
            </span>
            <nav className="flex gap-8 text-xs font-bold uppercase tracking-widest">
              <NavLink href="mailto:mcthaydawson@gmail.com">Email</NavLink>
              <NavLink href="https://linkedin.com/in/dawsonmcthay">
                LinkedIn
              </NavLink>
              <NavLink href="https://mcthaydt.substack.com/">Substack</NavLink>
            </nav>
          </motion.div>

          <div className="space-y-12 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="font-mono text-sm tracking-[0.2em] text-primary mb-8">
                HEY, I'M
              </p>
              <h1 className="text-5xl sm:text-6xl font-serif font-medium tracking-tight text-foreground leading-[1.1]">
                Dawson.
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.2,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="max-w-xl text-xl sm:text-2xl leading-relaxed font-light text-muted-foreground"
            >
              <p>
                Building{" "}
                <span className="text-foreground font-normal">
                  strategic foundations
                </span>{" "}
                for next-gen startups. Focused on clarity in product, precision
                in economics, and speed in AI adoption.
              </p>
            </motion.div>
          </div>
        </header>

        {/* Projects */}
        <Section title="Side Quests">
          {projects.map((project, index) => (
            <AccordionItem
              key={project.id}
              title={project.title}
              subtitle={project.subtitle}
              isOpen={openProject === index}
              onClick={() =>
                setOpenProject(openProject === index ? null : index)
              }
            >
              <p className="mb-6">{project.description}</p>
              {project.id === 1 ? (
                <div className="inline-flex items-center text-muted-foreground font-bold uppercase tracking-wider cursor-not-allowed opacity-70">
                  Locked <Lock size={16} className="ml-2" />
                </div>
              ) : (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary font-bold uppercase tracking-wider hover:gap-2 transition-all group/link"
                >
                  View Project{" "}
                  <ArrowUpRight
                    size={16}
                    className="ml-1 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform"
                  />
                </a>
              )}
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
              onClick={() =>
                setOpenService(openService === index ? null : index)
              }
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
                <p className="leading-relaxed whitespace-pre-wrap">
                  {prompt.content}
                </p>
              </div>
            </AccordionItem>
          ))}
        </Section>

        {/* Info Grid */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-12 ${SPACING.sectionMb}`}
        >
          {/* Fact Sheet */}
          <Section title="Fact Sheet" noMargin>
            <div className="space-y-0">
              <AccordionItem
                title="Favorite Games"
                isOpen={openFact === "games"}
                onClick={() =>
                  setOpenFact(openFact === "games" ? null : "games")
                }
              >
                <ListBlock items={funFacts.games || []} />
              </AccordionItem>

              <AccordionItem
                title="Favorite Films"
                isOpen={openFact === "films"}
                onClick={() =>
                  setOpenFact(openFact === "films" ? null : "films")
                }
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
                title="Favorite Episodes"
                isOpen={openFact === "episodes"}
                onClick={() =>
                  setOpenFact(openFact === "episodes" ? null : "episodes")
                }
              >
                <ListBlock items={funFacts.episodes || []} boldPrefix={true} />
              </AccordionItem>

              <AccordionItem
                title="Favorite Artists"
                isOpen={openFact === "artists"}
                onClick={() =>
                  setOpenFact(openFact === "artists" ? null : "artists")
                }
              >
                <ListBlock items={funFacts.artists || []} />
              </AccordionItem>

              <AccordionItem
                title="Hobbies"
                isOpen={openFact === "hobbies"}
                onClick={() =>
                  setOpenFact(openFact === "hobbies" ? null : "hobbies")
                }
              >
                <ListBlock items={funFacts.hobbies || []} />
              </AccordionItem>
            </div>
          </Section>

          {/* Psychographics */}
          <Section title="Psychographics" noMargin>
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
                  <FactItem
                    key={fact.id}
                    label={fact.label}
                    value={fact.value}
                  />
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                {facts.slice(2).map((fact) => (
                  <FactItem
                    key={fact.id}
                    label={fact.label}
                    value={fact.value}
                  />
                ))}
              </div>
            </div>
          </Section>
        </div>

        {/* Contact / Footer */}
        <section className="pt-12 border-t-2 border-foreground">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold uppercase tracking-tighter mb-6">
                Let's Build
                <br />
                The Future.
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-md">
                Currently accepting new projects for Q4 2025. I only work with
                founders who are obsessed with quality.
              </p>
            </div>
            <div className="flex flex-col items-start justify-center space-y-4">
              <a
                href="https://calendly.com/mcthaydt"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 text-2xl sm:text-3xl font-medium hover:text-primary transition-colors"
              >
                calendly.com/mcthaydt
                <ArrowUpRight className="opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
              </a>
              <div className="flex gap-6 mt-8">
                <a
                  href="https://x.com/McThayDT"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-12 w-12 flex items-center justify-center border border-border hover:bg-foreground hover:text-background transition-colors rounded-full"
                >
                  <Twitter size={20} />
                </a>
                <a
                  href="https://instagram.com/mcthaydt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-12 w-12 flex items-center justify-center border border-border hover:bg-foreground hover:text-background transition-colors rounded-full"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="https://github.com/mcthaydt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-12 w-12 flex items-center justify-center border border-border hover:bg-foreground hover:text-background transition-colors rounded-full"
                >
                  <Github size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Apple Music Embed */}
          <div className="mt-16 w-full">
            <iframe
              allow="autoplay *; encrypted-media *;"
              frameBorder="0"
              height="450"
              style={{
                width: "100%",
                overflow: "hidden",
                background: "transparent",
              }}
              sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
              src="https://embed.music.apple.com/us/playlist/replay-all-time/pl.rp-YnCAv7xO9a"
            />
          </div>

          <footer className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-24">
            <span>
              © 2025 Dawson // Jack of All Trades, Master of Quite a Few
            </span>
            <span>Chicago, IL // 41.8781° N, 87.6298° W</span>
            <ChicagoTime />
          </footer>
        </section>
      </div>
    </div>
  );
}
