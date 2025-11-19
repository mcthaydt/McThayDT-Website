import { 
  type Project, type InsertProject,
  type Service, type InsertService,
  type Prompt, type InsertPrompt,
  type FactSheetItem, type InsertFactSheetItem,
  type Psychographic, type InsertPsychographic,
  projects, services, prompts, factSheetItems, psychographics
} from "@shared/schema";
import { db } from "./db";
import { eq, asc } from "drizzle-orm";

export interface IStorage {
  getProjects(): Promise<Project[]>;
  getServices(): Promise<Service[]>;
  getPrompts(): Promise<Prompt[]>;
  getFactSheetItems(): Promise<FactSheetItem[]>;
  getPsychographics(): Promise<Psychographic[]>;
  seed(): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects).orderBy(asc(projects.order));
  }

  async getServices(): Promise<Service[]> {
    return await db.select().from(services).orderBy(asc(services.order));
  }

  async getPrompts(): Promise<Prompt[]> {
    return await db.select().from(prompts).orderBy(asc(prompts.order));
  }

  async getFactSheetItems(): Promise<FactSheetItem[]> {
    return await db.select().from(factSheetItems).orderBy(asc(factSheetItems.order));
  }

  async getPsychographics(): Promise<Psychographic[]> {
    return await db.select().from(psychographics).orderBy(asc(psychographics.order));
  }

  async seed(): Promise<void> {
    // Check if data exists
    const existingProjects = await this.getProjects();
    if (existingProjects.length > 0) return;

    console.log("Seeding database...");

    // Projects
    await db.insert(projects).values([
      {
        title: "VentureScout",
        subtitle: "AI Due Diligence",
        description: "An automated due diligence engine for early-stage investors. Aggregates data from 50+ sources to generate comprehensive risk reports in seconds. Used by 3 Tier-1 VCs.",
        link: "#",
        order: 1
      },
      {
        title: "Nebula Protocol",
        subtitle: "Decentralized Identity",
        description: "Self-sovereign identity layer built on Solana. Focused on privacy-preserving KYC for DeFi applications. $1.2M seed round raised.",
        link: "#",
        order: 2
      },
      {
        title: "Chronos",
        subtitle: "Productivity OS",
        description: "A minimalist calendar and task manager that adapts to your energy levels. Built with React, Rust, and sheer willpower. 10k+ MAU.",
        link: "#",
        order: 3
      },
      {
        title: "Hyperion",
        subtitle: "Design System",
        description: "A comprehensive design system for enterprise applications. Focused on accessibility, performance, and developer experience. Open source.",
        link: "#",
        order: 4
      }
    ]);

    // Services
    await db.insert(services).values([
      {
        title: "Product Strategy",
        description: "From zero to one. I help founders refine their vision, define MVPs, and find product-market fit through rapid iteration and user feedback loops.",
        order: 1
      },
      {
        title: "Full-Stack Design",
        description: "I don't just make things pretty. I build systems. Design systems, component libraries, and high-fidelity prototypes that bridge the gap between design and engineering.",
        order: 2
      },
      {
        title: "Technical Advisory",
        description: "Bridging the gap for non-technical founders. Architecture review, tech stack selection, and hiring support for founding engineering teams.",
        order: 3
      }
    ]);

    // Prompts
    await db.insert(prompts).values([
      {
        title: "VC Investment Memo",
        subtitle: "Venture Capital",
        content: "Act as a partner at Sequoia Capital. Write a comprehensive investment memo for a Seed stage B2B SaaS startup. Structure it with: Executive Summary, Market Opportunity (TAM/SAM/SOM), Product/Technology, Competition, Go-to-Market Strategy, Team, and Key Risks. Focus on 'Why Now?' and 'Why This Team?'. Use concise, professional language.",
        order: 1
      },
      {
        title: "SaaS Landing Page Copy",
        subtitle: "Growth Marketing",
        content: "You are a world-class copywriter specializing in conversion rate optimization. Write the copy for a high-converting landing page for a developer tool. Use the PAS (Problem-Agitation-Solution) framework. Include: Headline (Value Prop), Subheadline (How it works), 3 Key Benefits with icons, Social Proof section, and a compelling CTA. Tone: Technical, confident, no-fluff.",
        order: 2
      },
      {
        title: "Cold Outreach Sequencer",
        subtitle: "Sales",
        content: "Draft a 4-email cold outreach sequence targeting CTOs of Series B fintech companies. Goal: Schedule a 15-minute demo of a new API security tool. Email 1: Personalized observation + value prop. Email 2: Case study/Social proof. Email 3: Overcoming objection (implementation time). Email 4: Break-up email. Keep each email under 100 words.",
        order: 3
      },
      {
        title: "Technical Co-founder Hunter",
        subtitle: "Recruiting",
        content: "Find me potential technical co-founders in San Francisco who have: 1) Ex-Stripe or Ex-Coinbase engineering experience, 2) Interest in Rust and WebAssembly, 3) Recently left their job or started a side project in the last 6 months. Search GitHub, Twitter, and LinkedIn public posts.",
        order: 4
      }
    ]);

    // Fact Sheet Items
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

    const factItems: InsertFactSheetItem[] = [];
    let order = 1;

    Object.entries(funFacts).forEach(([category, items]) => {
      items.forEach((item) => {
        factItems.push({
          category,
          value: item,
          order: order++
        });
      });
    });

    await db.insert(factSheetItems).values(factItems);

    // Psychographics
    await db.insert(psychographics).values([
      // Stats
      { type: "stat", label: "Openness", value: "96", maxValue: 100, suffix: "%", order: 1 },
      { type: "stat", label: "Conscientiousness", value: "92", maxValue: 100, suffix: "%", order: 2 },
      { type: "stat", label: "Extraversion", value: "45", maxValue: 100, suffix: "%", order: 3 },
      { type: "stat", label: "Agreeableness", value: "55", maxValue: 100, suffix: "%", order: 4 },
      { type: "stat", label: "Neuroticism", value: "35", maxValue: 100, suffix: "%", order: 5 },
      // Facts
      { type: "fact", label: "Myers-Briggs", value: "INTJ-A", order: 6 },
      { type: "fact", label: "Enneagram", value: "Type 5w6", order: 7 },
      { type: "fact", label: "Sun", value: "Scorpio", order: 8 },
      { type: "fact", label: "Moon", value: "Aquarius", order: 9 },
      { type: "fact", label: "Rising", value: "Virgo", order: 10 },
      { type: "fact", label: "Mercury", value: "Scorpio", order: 11 },
      { type: "fact", label: "Venus", value: "Capricorn", order: 12 },
      { type: "fact", label: "Mars", value: "Virgo", order: 13 },
    ]);
    
    console.log("Seeding completed.");
  }
}

export const storage = new DatabaseStorage();
