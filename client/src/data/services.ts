export interface Service {
  id: number;
  title: string;
  description: string;
  order: number;
}

export const services: Service[] = [
  {
    id: 1,
    title: "Product Strategy",
    description: "From zero to one. I help founders refine their vision, define MVPs, and find product-market fit through rapid iteration and user feedback loops.",
    order: 1
  },
  {
    id: 2,
    title: "Business Model Design", 
    description: "From gut-feel to grid. I help founders stress-test their assumptions, map out unit economics, and architect a clear revenue logic to prove (or disprove) the financial viability of the idea.",
    order: 2
  },
  {
    id: 3,
    title: "AI Strategy & Feasibility",
    description: "From buzzword to blueprint. I help teams demystify LLM capabilities, evaluate technical trade-offs, and define exactly where and how AI fits into your product ecosystem.",
    order: 3
  },
];
