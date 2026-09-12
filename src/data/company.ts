export const company = {
  name: "Grow NXT",
  shortName: "GrowNXT.co",
  tagline: "Digital Marketing Agency",
  positioning: "Growing Brands. Driving Digital Success.",
  description:
    "Grow NXT is a full-service digital marketing team. We pair creative work with a clear plan and honest numbers so a business can show up online — and keep growing after the first campaign.",
  hero: {
    heading: "DIGITAL MARKETING",
    headingLead: "THAT DRIVES",
    headingAccent: "GROWTH",
    lead: "Smart strategy. Bold creativity. Measurable results.",
  },
  about: {
    heading: "About Us",
    copy: "Your brand already has a voice. We help it carry — in the feed, on the search page, and in the conversations that turn into customers.",
    cards: [
      {
        id: "serve",
        title: "WHO WE SERVE",
        body: "Founders, local companies, and growing teams who want a digital partner, not another vendor. New launch, a reset, or growth that has gone quiet — we plan around your market, not a canned playbook.",
      },
      {
        id: "work",
        title: "HOW WE WORK",
        body: "The idea, the plan, and the execution sit in one room. Creative, media, and reporting share a single brief so every reel, page, and campaign is pulling the same way.",
      },
      {
        id: "build",
        title: "WHAT WE BUILD",
        body: "A digital presence that gets stronger with time. Clearer identity, steadier demand, and customer relationships that last longer than a thirty-day burst.",
      },
    ],
  },
  mission: {
    heading: "Our Mission",
    subheading: "What we stand for",
    copy: "Help ambitious companies use digital in a way that is inventive, honest, and tied to the numbers that matter — visibility, demand, and growth.",
    deliverHeading: "How the work gets done",
    deliver:
      "We cut digital down to what a founder can follow: a clear position, useful content, and campaigns with a job. The aim is simple — more of the right people find you, stay, and buy.",
  },
  contact: {
    heading: "LET’S GET TO WORK",
    line: "You bring the ambition. We bring the plan. We grow from there.",
    ready: "Is your brand ready for a sharper digital chapter?",
    support:
      "Launching something new or scaling what already works — Grow NXT is set up for the year ahead, not a one-week burst.",
    start: "Tell us where things stand. We will sketch the next twelve months together.",
    phone: "+91 1120-6993099",
    phoneHref: "tel:+9111206993099",
    addressLines: [
      "Bhutani Alphatum, Tower-A, 2010-11,",
      "Sector-90, Noida, Uttar Pradesh - 201304",
    ],
    website: "www.grownxt.co",
    websiteHref: "https://www.grownxt.co",
    email: "hr@grownxt.co",
    emailHref: "mailto:hr@grownxt.co",
  },
} as const;

export const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "pricing", label: "Pricing" },
  { id: "contact", label: "Contact" },
] as const;

export const pricingNav = [
  { id: "pricing-digital", label: "Digital Marketing" },
  { id: "pricing-website", label: "Website" },
  { id: "pricing-services", label: "Services" },
  { id: "pricing-video", label: "Video" },
] as const;
