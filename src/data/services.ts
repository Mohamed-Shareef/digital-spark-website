import { Search, Share2, Megaphone, Palette, type LucideIcon } from "lucide-react";

export interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
}

export const services: Service[] = [
  {
    icon: Search,
    title: "SEO Optimization",
    description: "Rank higher, win more organic traffic with technical and content SEO that compounds.",
    features: ["Technical audits", "Keyword strategy", "Content & link building"],
  },
  {
    icon: Share2,
    title: "Social Media Marketing",
    description: "Build communities that buy. Strategy, content, and management across every channel.",
    features: ["Content calendars", "Community mgmt", "Influencer partnerships"],
  },
  {
    icon: Megaphone,
    title: "Paid Ads",
    description: "Performance campaigns on Google, Meta, TikTok and LinkedIn — engineered for ROAS.",
    features: ["Google Ads", "Meta & TikTok", "Conversion tracking"],
  },
  {
    icon: Palette,
    title: "Web Design",
    description: "Conversion-first websites that look incredible and load instantly.",
    features: ["Design systems", "Webflow / Next.js", "CRO experiments"],
  },
];