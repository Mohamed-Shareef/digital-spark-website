import {
  Search,
  Share2,
  Video,
  Mail,
  Facebook,
  MousePointerClick,
  MapPin,
  type LucideIcon,
} from "lucide-react";

export interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
}

export const services: Service[] = [
  {
    icon: Share2,
    title: "Social Media Management",
    description:
      "We handle your complete social presence — planning, posting, engagement and analytics — so your brand grows consistently while you run your business.",
    features: ["Content planning & posting", "Audience engagement", "Performance tracking"],
  },
  {
    icon: Video,
    title: "Content Creation",
    description:
      "Videography and editing that grabs attention and connects with your audience — built to make your brand stand out and drive real results.",
    features: ["Professional videography", "Reels & ad creatives", "High-quality video editing"],
  },
  {
    icon: Search,
    title: "Search Engine Optimization",
    description:
      "Show up on Google when it matters. We improve your rankings, bring in the right audience, and build long-term organic growth.",
    features: ["On-page & technical SEO", "Keyword strategy", "Long-term organic growth"],
  },
  {
    icon: Mail,
    title: "Email Marketing",
    description:
      "Turn potential customers into repeat buyers with smart email strategies — campaigns, automations and follow-ups, fully managed.",
    features: ["Campaign setup", "Automation flows", "Follow-up sequences"],
  },
  {
    icon: Facebook,
    title: "Meta Ads",
    description:
      "Facebook & Instagram campaigns that reach the right people at the right time — better results without wasting your budget.",
    features: ["Audience targeting", "Creative testing", "Budget optimization"],
  },
  {
    icon: MousePointerClick,
    title: "Google Ads",
    description:
      "Reach customers already searching for your services. Optimized campaigns that bring in high-quality leads and measurable outcomes.",
    features: ["Search & Performance Max", "Keyword bidding", "Conversion tracking"],
  },
  {
    icon: MapPin,
    title: "Local Business Marketing",
    description:
      "Get noticed in your area and attract nearby customers — perfect for shops and service-based businesses ready to grow locally.",
    features: ["Google Business Profile", "Local SEO", "Review management"],
  },
];