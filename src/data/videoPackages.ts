export const videoPackages = [
  {
    id: "essential",
    name: "ESSENTIAL",
    tagline: "Short Videos for Your Brand Presence",
    volume: "4",
    volumeLabel: "Short Videos / Reels per month",
    popular: false,
    includes: [
      "Instagram & Facebook Reels",
      "Product / Service Showcase",
      "Trend-based Content",
      "Basic Motion Graphics & Editing",
      "Captions, Music & Editing",
      "1 Revision per Video",
    ],
  },
  {
    id: "growth",
    name: "GROWTH",
    tagline: "More Content, More Visibility",
    volume: "6–8",
    volumeLabel: "Short Videos / Reels per month",
    popular: true,
    includes: [
      "Instagram & Facebook Reels",
      "Product / Service Showcase",
      "Educational / Tip-based Videos",
      "Trend-based & Creative Content",
      "Motion Graphics & Editing",
      "Captions, Music & Editing",
      "2 Revisions per Video",
    ],
  },
  {
    id: "premium",
    name: "PREMIUM",
    tagline: "Maximum Impact for Your Brand",
    volume: "8–12",
    volumeLabel: "Short Videos / Reels per month",
    popular: false,
    includes: [
      "Instagram & Facebook Reels",
      "Product / Service Showcase",
      "Educational / Tip-based Videos",
      "Trend-based & Viral Content",
      "Advanced Motion Graphics & Editing",
      "Captions, Music & Editing",
      "3 Revisions per Video",
      "Content Planning Support",
    ],
  },
] as const;

export const videoLongForm = {
  title: "LONG-FORM VIDEOS",
  price: "₹999 per video",
  note: "Long-form videos are NOT included in any package and will be charged separately.",
};

export const videoNotes = [
  "Short videos (Reels) are included in the selected package.",
  "For long videos, we charge ₹999 per video.",
  "Advertising budget is NOT included in the package fee.",
] as const;

export const videoFooterLine = "ALL YOUR DIGITAL NEEDS. ONE PARTNER.";
