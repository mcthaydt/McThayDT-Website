export interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  link: string;
  order: number;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "VentureScout",
    subtitle: "AI Due Diligence",
    description: "An automated due diligence engine for early-stage investors. Aggregates data from 50+ sources to generate comprehensive risk reports in seconds. Used by 3 Tier-1 VCs.",
    link: "#",
    order: 1
  },
  {
    id: 2,
    title: "Nebula Protocol",
    subtitle: "Decentralized Identity",
    description: "Self-sovereign identity layer built on Solana. Focused on privacy-preserving KYC for DeFi applications. $1.2M seed round raised.",
    link: "#",
    order: 2
  },
  {
    id: 3,
    title: "Chronos",
    subtitle: "Productivity OS",
    description: "A minimalist calendar and task manager that adapts to your energy levels. Built with React, Rust, and sheer willpower. 10k+ MAU.",
    link: "#",
    order: 3
  }
];
