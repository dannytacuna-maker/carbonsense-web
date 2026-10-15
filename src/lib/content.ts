import type { Article, Author } from "./types";

export const site = {
  name: "Carbon Sense",
  tagline: "Climate economics, clearly reasoned.",
  description:
    "Independent analysis on climate economics and policy — models, markets, and trade-offs made legible.",
  url: "https://carbonsense.net",
  email: "info@carbonsense.net",
  linkedIn: "https://www.linkedin.com/company/carbonsense1",
  substack: "https://carbonsense.substack.com/",
  goFundMe: "https://www.gofundme.com/f/carbon-sense-climate-economics-blog",
  reviewForm:
    "https://docs.google.com/forms/d/e/1FAIpQLSfD9vx3ONACYBMlG7wC9x0kHM3eaiE-bf1kbvY-DhmtaqC-qA/viewform",
  logo: "/brand/logo3.png",
};

export const authors: Author[] = [
  {
    name: "Andrew Wells",
    slug: "andrew-wells",
    avatar: "/experts/andrew-wells.png",
    role: "Electricity markets & climate policy",
    profession: "Engineer & economist — electricity markets, investment, and climate policy",
    education: [
      "MSc Economics of Energy, Climate Change & Sustainability — Barcelona School of Economics",
      "Bachelor of Engineering in Operations Research (First Class Honours)",
    ],
    country: "New Zealand",
    languages: ["English"],
    linkedIn: "https://www.linkedin.com/in/andrew-wells-48409b139",
    bio: "Andrew Wells is an engineer and economist specialising in the intersection of electricity markets, investment, and climate policy. He focuses on how market design and credible investment incentives can support a rapid, efficient transition to clean energy.",
    expertise: [
      "Electricity markets",
      "Clean energy investment",
      "Market design",
      "Climate policy",
    ],
  },
  {
    name: "Charles Nicholson",
    slug: "charles-nicholson",
    avatar: "/experts/charles-nicholson.png",
    role: "Carbon markets & competition",
    profession: "Economist — competition, energy transition, and climate policy",
    education: [
      "MSc Economics of Energy, Climate Change & Sustainability — Barcelona School of Economics",
    ],
    country: "United Kingdom",
    languages: ["English"],
    linkedIn: "https://www.linkedin.com/in/charles-nicholson45",
    bio: "Charles Nicholson is an economist with ten years’ consulting experience on competition matters, complemented by an academic focus on the energy transition and climate policy. He has advised on merger control, abuse of dominance, and damages — including at a leading competition economics consultancy and at the Australian Competition and Consumer Commission.",
    expertise: [
      "Carbon markets",
      "Competition economics",
      "Energy transition",
      "Climate policy design",
    ],
  },
  {
    name: "Euan Gilchrist",
    slug: "euan-gilchrist",
    avatar: "/experts/euan-gilchrist.png",
    role: "Climate, energy & agriculture",
    profession: "Economist — climate, energy, and agricultural economics",
    education: [
      "Master’s in the Economics of Energy, Climate Change and Sustainability — Barcelona School of Economics",
      "Bachelor of Economics (First Class Honours) — University of Manchester",
    ],
    country: "United Kingdom",
    languages: ["English"],
    linkedIn: "https://www.linkedin.com/in/euan-gilchrist-27079087",
    bio: "Euan Gilchrist is an economist working across climate, energy and agricultural economics. He is particularly interested in how economic analysis can support credible, value-for-money climate and energy policy.",
    expertise: [
      "Climate impacts",
      "Agricultural economics",
      "Energy policy",
      "Value-for-money analysis",
    ],
  },
  {
    name: "Juan Daniel Acuña-Román",
    slug: "juan-acuna",
    avatar: "/experts/juan-acuna.png",
    portfolioAvatar: "/experts/juan-acuna-portfolio.png",
    role: "Climate finance & just transition",
    profession: "Economist — energy, climate, and sustainable development",
    education: [
      "Master’s in the Economics of Energy, Climate Change and Sustainability — Barcelona School of Economics",
      "Bachelor of Economics — Universidad de Costa Rica",
    ],
    country: "Costa Rica",
    languages: ["Spanish", "English"],
    linkedIn: "https://www.linkedin.com/in/juandacuna",
    bio: "Juan Daniel Acuña-Román is an economist working on energy, climate, and sustainable development. He focuses on turning data into policy across emissions accounting, transition finance, green-jobs metrics, just-transition design, and place-based decarbonisation.",
    expertise: [
      "Transition finance",
      "Emissions accounting",
      "Just transition",
      "Green jobs metrics",
    ],
  },
  {
    name: "Lucien Vargas",
    slug: "lucien-vargas",
    avatar: "/experts/lucien-vargas.png",
    role: "Environmental & macro climate",
    profession: "Economist — environmental economics and climate–macro dynamics",
    education: [
      "Master’s in the Economics of Energy, Climate Change and Sustainability — Barcelona School of Economics",
    ],
    country: "Spain",
    languages: ["English"],
    linkedIn: "https://www.linkedin.com/in/lucvargas",
    bio: "Lucien Vargas is an economist specialising in environmental economics. His work focuses on how climate risks and climate policy design shape macroeconomic outcomes, including real-time indicators built from text data and quantitative methods for climate–macro dynamics.",
    expertise: [
      "Environmental economics",
      "Climate risk",
      "Macroeconomic modelling",
      "Text & LLM indicators",
    ],
  },
  {
    name: "Pau Orive",
    slug: "pau-orive",
    avatar: "/experts/pau-orive.png",
    role: "Carbon budgets & evaluation",
    profession: "Economist — environmental economics and policy evaluation",
    education: [
      "MSc in Specialized Economic Analysis (Energy, Climate Change & Sustainability) — Barcelona School of Economics",
      "BA in Philosophy, Politics and Economics — Pompeu Fabra University",
    ],
    country: "Spain",
    languages: ["Spanish", "Catalan", "English"],
    linkedIn: "https://www.linkedin.com/in/pau-orive-vidal-204a54229",
    bio: "Pau Orive is an economist specializing in environmental economics and policy evaluation. Passionate about both philosophy and programming, he believes in the potential of rigorous, data-driven analysis to inform policy.",
    expertise: [
      "Carbon budgets",
      "Policy evaluation",
      "Environmental economics",
      "Data-driven analysis",
    ],
  },
  {
    name: "Vaibhav Jain",
    slug: "vaibhav-jain",
    avatar: "/experts/vaibhav-jain.png",
    role: "Climate economics & sustainable finance",
    profession: "Economist & entrepreneur — climate economics, sustainable finance, and policy",
    education: [
      "Master’s in the Economics of Energy, Climate Change and Sustainability — Barcelona School of Economics",
      "Bachelor’s in Economics and International Affairs",
    ],
    country: "India",
    languages: ["English"],
    linkedIn: "https://www.linkedin.com/in/vjvaibhav",
    bio: "Vaibhav Jain is an economist and entrepreneur working at the intersection of climate economics, sustainable finance, and policy. He focuses on turning climate risks into opportunities and building scalable solutions — including through TerraTrack, his ag-tech venture.",
    expertise: [
      "Sustainable finance",
      "Climate policy",
      "Ag-tech & climate risk",
      "Entrepreneurship",
    ],
  },
];

export function getAuthor(slug: string) {
  return authors.find((a) => a.slug === slug);
}

export const articles: Article[] = [
  {
    slug: "hydrogen-essential-tool-or-expensive-detour",
    title: "Hydrogen: Essential Tool or Expensive Detour",
    deck: "Sorting climate value from industrial ambition",
    date: "2026-06-16",
    readTime: 10,
    tags: ["Industrial policy"],
    image: "/assets/article_imgs/green-hydrogen.png",
    authors: [authors[1]],
  },
  {
    slug: "how-much-carbon-am-i-allowed-to-emit",
    title: "How Much Carbon Am I Allowed to Emit?",
    deck: "What is important when it comes to our personal emissions?",
    date: "2026-04-23",
    readTime: 10,
    tags: ["Carbon budgets"],
    image: "/assets/article_imgs/flying.png",
    authors: [authors[5]],
  },
  {
    slug: "developing-countries-will-feel-the-heat-of-climate-mortality",
    title: "Developing Countries Will Feel the Heat of Climate Mortality",
    deck: "Climate mortality is more complex, and globally unequal, than many assume",
    date: "2026-03-31",
    readTime: 10,
    tags: ["Climate mortality"],
    image: "/assets/article_imgs/mortality.png",
    authors: [authors[2]],
  },
  {
    slug: "skiing-evs-and-the-kaya-identity",
    title: "Skiing, EVs, and the Kaya Identity",
    deck: "What if green technology isn't good enough?",
    date: "2026-03-17",
    readTime: 10,
    tags: ["Opinion"],
    image: "/assets/article_imgs/skiing.png",
    authors: [authors[0]],
  },
  {
    slug: "how-the-european-union-built-the-worlds-largest-carbon-market",
    title: "How the European Union Built the World's Largest Carbon Market",
    deck: "From pilot programme to climate policy cornerstone",
    date: "2026-03-11",
    readTime: 10,
    tags: ["Carbon markets"],
    image: "/assets/article_imgs/eu_ets_emissions.png",
    authors: [authors[1]],
  },
  {
    slug: "optimisation-vs-stabilisation",
    title:
      "Optimisation vs Stabilisation: Why Climate Strategy Looks Different Across Regions",
    deck: "Fighting the climate battle on two fronts",
    date: "2026-02-24",
    readTime: 10,
    tags: ["Climate finance"],
    image: "/assets/article_imgs/southeast-asia.png",
    authors: [{ name: "Will Mewhirter" }],
  },
  {
    slug: "the-spanish-economy-and-climate-change",
    title: "A Trip To Spain",
    deck: "Emissions by Scope using Input-Output analysis",
    date: "2026-02-17",
    readTime: 10,
    tags: ["Emissions by Scope", "Input-Output analysis"],
    image: "/assets/article_imgs/InputOutput_Spain.png",
    authors: [authors[3], authors[4]],
  },
  {
    slug: "carbon-budgets-from-concept-to-implementation",
    title: "Carbon Budgets: From Concept to Implementation",
    deck: "Bridging the gap between climate goals and concrete policy",
    date: "2026-02-10",
    readTime: 16,
    tags: ["Carbon budgets"],
    image: "/assets/article_imgs/tcre.png",
    authors: [authors[5]],
  },
  {
    slug: "the-orinoco-belt-tightens",
    title: "The Orinoco Belt Tightens",
    deck: "Venezuela's heavy crude and the narrowing climate margin",
    date: "2026-01-27",
    readTime: 16,
    tags: ["Climate change"],
    image: "/assets/article_imgs/flaring-venezuela.png",
    authors: [authors[1], authors[0]],
  },
  {
    slug: "escaping-dirty-growth",
    title: "Escaping Dirty Growth",
    deck: "The importance of innovation",
    date: "2026-01-20",
    readTime: 9,
    tags: ["Innovation"],
    image: "/assets/article_imgs/dirty-growth.jpg",
    authors: [authors[4]],
  },
  {
    slug: "a-short-history-of-the-voluntary-carbon-market",
    title: "A Short History of the Voluntary Carbon Market",
    deck: "From climate fix to credibility crisis",
    date: "2026-01-13",
    readTime: 10,
    tags: ["Voluntary carbon market"],
    image: "/assets/article_imgs/carbon-emissions.jpg",
    authors: [authors[0]],
  },
  {
    slug: "counting-megawatts-missing-people",
    title: "Counting Megawatts, Missing People",
    deck: "The social gap in climate finance",
    date: "2026-01-06",
    readTime: 7,
    tags: ["Just transition"],
    image: "/assets/article_imgs/just_transition.jpg",
    authors: [authors[3]],
  },
  {
    slug: "carbon-taxes-a-libertarians-secret-love",
    title: "Carbon Taxes: A Libertarian's Secret Love",
    deck: "How climate policy seduced a free-market purist",
    date: "2025-12-16",
    readTime: 12,
    tags: ["Carbon taxes"],
    image: "/assets/article_imgs/power-plant-smoke.png",
    authors: [authors[6]],
  },
  {
    slug: "the-social-cost-of-carbon-and-why-it-is-no-longer-counted",
    title: "The Social Cost of Carbon, and Why it is No Longer Counted",
    deck: "Treating it as zero cannot make it so",
    date: "2025-12-09",
    readTime: 7,
    tags: ["Macroeconomic modelling"],
    image: "/assets/article_imgs/Climate-Stripes.png",
    authors: [authors[1]],
  },
];

export function getArticlesByAuthor(slug: string) {
  const author = getAuthor(slug);
  if (!author) return [];
  return articles.filter((article) =>
    article.authors.some(
      (a) => a.slug === slug || (!a.slug && a.name === author.name)
    )
  );
}

export function formatDate(iso: string) {
  return new Date(iso + "T12:00:00").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export const navLinks = [
  { href: "/articles", label: "Articles" },
  { href: "/about", label: "About" },
  { href: "/support", label: "Support" },
  { href: "/contact", label: "Contact" },
] as const;
