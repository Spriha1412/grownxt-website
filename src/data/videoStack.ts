export const stackVideos = {
  camera: "https://res.cloudinary.com/djg2ny5jw/video/upload/v1790225779/grownxtvideo_bmcbyd.mp4",
  services: "https://res.cloudinary.com/djg2ny5jw/video/upload/v1790225748/grownxt_s1y9a5.mp4",
} as const;

export const stackPosters = {
  camera: "https://res.cloudinary.com/djg2ny5jw/video/upload/v1790225779/grownxtvideo_bmcbyd.jpg",
  services: "https://res.cloudinary.com/djg2ny5jw/video/upload/v1790225748/grownxt_s1y9a5.jpg",
} as const;

function missionClip(src: string) {
  return { src, poster: src.replace(/\.mp4$/i, ".jpg") };
}

export const missionVideos = [
  missionClip("https://res.cloudinary.com/djg2ny5jw/video/upload/v1790253360/Green_fish_reaches_fishing_hook_20260924180452_tagmxv.mp4"),
  missionClip("https://res.cloudinary.com/djg2ny5jw/video/upload/v1790253313/Green_paper_airplane_standing_out_20260924175543_czfkas.mp4"),
  missionClip("https://res.cloudinary.com/djg2ny5jw/video/upload/v1790253223/Hands_rotating_glowing_brain_model_20260924180235_epz28a.mp4"),
  missionClip("https://res.cloudinary.com/djg2ny5jw/video/upload/v1790253142/Hammer_striking_bent_screw_1080p_20260924180007_sdixyq.mp4"),
  missionClip("https://res.cloudinary.com/djg2ny5jw/video/upload/v1790253105/Silver_scale_tipping_with_balls_20260924175748_djc2f5.mp4"),
  missionClip("https://res.cloudinary.com/djg2ny5jw/video/upload/v1790252244/Green_pencil_xtmt1i.mp4"),
] as const;

export const videoChapters = [
  {
    id: "frame",
    title: "A frame people actually stop for.",
    copy: "We shoot and cut for the feed: product, people, and the offer, in a look that feels like your brand, not a stock template.",
  },
  {
    id: "story",
    title: "Then we give that frame a job.",
    copy: "A reel is not the campaign. It sits in a plan: who it is for, where it runs, and what we want them to do next.",
  },
  {
    id: "system",
    title: "Content, media, and the page pull the same way.",
    copy: "The same brief runs social, search, and the site they land on. Nothing is posted just to fill a calendar.",
  },
  {
    id: "services",
    title: "This is the full team, in one place.",
    copy: "Strategy, creative, performance, websites, and video. One partner for the year ahead, not a one-week burst.",
  },
] as const;
