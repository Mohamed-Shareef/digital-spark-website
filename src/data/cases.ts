export interface CaseStudy {
  id: string;
  client: string;
  category: string;
  headline: string;
  metric: string;
  metricLabel: string;
  results: { label: string; value: string }[];
  summary: string;
  details: string;
}

export const cases: CaseStudy[] = [
  {
    id: "lumen",
    client: "Lumen Apparel",
    category: "E-commerce",
    headline: "From DTC startup to 8-figure brand in 14 months.",
    metric: "+412%",
    metricLabel: "Revenue YoY",
    results: [
      { label: "ROAS", value: "8.4x" },
      { label: "Email Rev.", value: "+260%" },
      { label: "CAC", value: "-38%" },
    ],
    summary: "Full-funnel paid + email + lifecycle redesign.",
    details:
      "We rebuilt Lumen's paid Meta and Google strategy around creative testing velocity, moved their email program to a behavior-triggered architecture, and shipped a new Shopify storefront. Result: a profitable scale from $80k/mo to $1.2M/mo.",
  },
  {
    id: "nordic",
    client: "Nordic Health",
    category: "Healthcare SaaS",
    headline: "Organic traffic that actually converts.",
    metric: "+8.6x",
    metricLabel: "Organic Leads",
    results: [
      { label: "Sessions", value: "+340%" },
      { label: "MQLs", value: "+760%" },
      { label: "Domain Rating", value: "62" },
    ],
    summary: "Programmatic SEO + thought-leadership content engine.",
    details:
      "Built a 1,200-page programmatic SEO architecture targeting bottom-funnel terms, paired with weekly long-form content from in-house clinicians. Domain Rating climbed from 18 to 62; MQLs grew 8.6x in 9 months.",
  },
  {
    id: "vault",
    client: "Vault Fintech",
    category: "Fintech",
    headline: "A launch that broke the App Store charts.",
    metric: "1.2M",
    metricLabel: "App Installs",
    results: [
      { label: "Install CPA", value: "$2.18" },
      { label: "TikTok Views", value: "44M" },
      { label: "Press Hits", value: "120+" },
    ],
    summary: "Integrated launch: PR, paid social, creator partnerships.",
    details:
      "Coordinated a 6-week launch sprint across 30 creators, paid TikTok/Meta, and tier-1 PR. Drove 1.2M installs at sub-$3 CPA and #2 in Finance category for 9 days straight.",
  },
  {
    id: "hearth",
    client: "Hearth Studio",
    category: "Hospitality",
    headline: "A website that doubled bookings.",
    metric: "+118%",
    metricLabel: "Direct Bookings",
    results: [
      { label: "Conv. Rate", value: "5.7%" },
      { label: "PageSpeed", value: "98" },
      { label: "Bounce", value: "-44%" },
    ],
    summary: "Brand refresh + conversion-optimized website rebuild.",
    details:
      "New visual identity, photography direction, and a custom Next.js booking experience with on-page availability. Direct bookings doubled in the first quarter post-launch.",
  },
  {
    id: "atlas",
    client: "Atlas Logistics",
    category: "B2B",
    headline: "Pipeline built on LinkedIn.",
    metric: "$4.2M",
    metricLabel: "Pipeline Created",
    results: [
      { label: "SQLs", value: "+312%" },
      { label: "CPL", value: "-51%" },
      { label: "Reply Rate", value: "18%" },
    ],
    summary: "ABM on LinkedIn with creative-led demand gen.",
    details:
      "Built a 3-stage LinkedIn ABM program targeting 800 logistics decision-makers, paired with weekly thought-leadership video. Generated $4.2M in pipeline in two quarters.",
  },
  {
    id: "sprout",
    client: "Sprout & Co.",
    category: "Local",
    headline: "Local SEO domination in 6 months.",
    metric: "#1",
    metricLabel: "Map Pack",
    results: [
      { label: "Calls", value: "+220%" },
      { label: "Reviews", value: "612" },
      { label: "Locations", value: "12" },
    ],
    summary: "Multi-location local SEO and review automation.",
    details:
      "Launched a multi-location GBP optimization sprint, built city pages, and automated review requests via SMS. Achieved #1 map pack across all 12 locations.",
  },
];