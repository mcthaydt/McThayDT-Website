export interface Prompt {
  id: number;
  title: string;
  subtitle: string;
  content: string;
  order: number;
}

export const prompts: Prompt[] = [
  {
    id: 1,
    title: "VC Investment Memo",
    subtitle: "Venture Capital",
    content: "Act as a partner at Sequoia Capital. Write a comprehensive investment memo for a Seed stage B2B SaaS startup. Structure it with: Executive Summary, Market Opportunity (TAM/SAM/SOM), Product/Technology, Competition, Go-to-Market Strategy, Team, and Key Risks. Focus on 'Why Now?' and 'Why This Team?'. Use concise, professional language.",
    order: 1
  },
  {
    id: 2,
    title: "SaaS Landing Page Copy",
    subtitle: "Growth Marketing",
    content: "You are a world-class copywriter specializing in conversion rate optimization. Write the copy for a high-converting landing page for a developer tool. Use the PAS (Problem-Agitation-Solution) framework. Include: Headline (Value Prop), Subheadline (How it works), 3 Key Benefits with icons, Social Proof section, and a compelling CTA. Tone: Technical, confident, no-fluff.",
    order: 2
  },
  {
    id: 3,
    title: "Cold Outreach Sequencer",
    subtitle: "Sales",
    content: "Draft a 4-email cold outreach sequence targeting CTOs of Series B fintech companies. Goal: Schedule a 15-minute demo of a new API security tool. Email 1: Personalized observation + value prop. Email 2: Case study/Social proof. Email 3: Overcoming objection (implementation time). Email 4: Break-up email. Keep each email under 100 words.",
    order: 3
  },
  {
    id: 4,
    title: "Technical Co-founder Hunter",
    subtitle: "Recruiting",
    content: "Find me potential technical co-founders in San Francisco who have: 1) Ex-Stripe or Ex-Coinbase engineering experience, 2) Interest in Rust and WebAssembly, 3) Recently left their job or started a side project in the last 6 months. Search GitHub, Twitter, and LinkedIn public posts.",
    order: 4
  }
];
