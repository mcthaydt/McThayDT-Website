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
    title: "Stealth Startup",
    subtitle: "Co-Created Franchise Platform (2026)",
    description: "Riot Games + Steam Workshop + Royalty Enforcement + Community Canon. (This is the big one.)",
    link: "#",
    order: 1
  },
  {
    id: 2,
    title: "Crispy Cabaret MVP",
    subtitle: "Token-Gated Access Clubs (2025)",
    description: "Implemented crypto token-gated access clubs, designed to reward members with a percentage-based ownership stake in user-created digital communities. Focused on decentralized club governance and value distribution.",
    link: "https://crispy-cabaret-beta.vercel.app/",
    order: 2
  },
  {
    id: 3,
    title: "OSAS: Open Source Asset Store MVP",
    subtitle: "Open Source Game Assets (2024)",
    description: "Created an open-source asset marketplace specifically engineered to support game engines like Godot and Bevy. The platform promotes collaborative development and facilitates a paid model for shared community assets.",
    link: "https://testing-osas.netlify.app/",
    order: 3
  }
];