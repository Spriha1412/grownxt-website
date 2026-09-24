import { servicePricing } from "../data/servicePricing";

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

export const contactServices = [
  "Social Media Marketing",
  "SEO",
  "Content Marketing",
  "Performance Marketing",
  "Branding & Creative Design",
  "Website & Digital Solutions",
  "Digital Marketing Plan: STARTER",
  "Digital Marketing Plan: BUSINESS",
  "Digital Marketing Plan: PERFORMANCE PRO",
  "Website Development: STARTER",
  "Website Development: BUSINESS",
  "Website Development: PROFESSIONAL",
  "Website Development: E-COMMERCE",
  "Video Content: ESSENTIAL",
  "Video Content: GROWTH",
  "Video Content: PREMIUM",
  ...servicePricing.flatMap((category) => category.items.map((item) => item.name)),
  "Custom / Individual Service",
];
