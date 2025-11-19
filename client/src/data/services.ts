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
    title: "Full-Stack Design",
    description: "I don't just make things pretty. I build systems. Design systems, component libraries, and high-fidelity prototypes that bridge the gap between design and engineering.",
    order: 2
  },
  {
    id: 3,
    title: "Technical Advisory",
    description: "Bridging the gap for non-technical founders. Architecture review, tech stack selection, and hiring support for founding engineering teams.",
    order: 3
  }
];
