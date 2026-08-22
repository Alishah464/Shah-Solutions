import {
  Search, Globe, Code2, Smartphone, TrendingUp, Cloud,
  CheckCircle2, Bot, Map, Store,
  Layout, ShoppingCart, Cpu, Database, Lock, Server,
  Activity, Share2, Mail, MousePointerClick,
  GitBranch, Terminal, Gauge,
  MessageSquare, LineChart, Workflow, Puzzle, ShieldCheck, FileSearch, BarChart3, Link2, Layers,
  type LucideIcon,
} from 'lucide-react'

export interface ServiceCategory {
  slug: string
  legacyAnchor: string
  icon: LucideIcon
  color: string
  borderColor: string
  glowColor: string
  title: string
  /** Overrides the default `${title} Services` pattern for pages where that
   * reads awkwardly (e.g. "Cloud Solutions Services", "AI Chatbots Services"). */
  metaTitle?: string
  metaDescription: string
  keywords: string[]
  subtitle: string
  longDesc: string
  serviceType: string
  features: { icon: LucideIcon; label: string }[]
  results: string[]
  disclaimer?: string
}

export const serviceCategories: ServiceCategory[] = [
  {
    slug: 'seo',
    legacyAnchor: 'seo',
    icon: Search,
    color: 'from-purple-600 to-violet-800',
    borderColor: 'border-purple-500/20',
    glowColor: 'rgba(124,58,237,0.3)',
    title: 'SEO Optimization',
    metaDescription: 'Technical SEO audits, keyword research, and authority link building — data-driven SEO services to help your business rank higher and grow organic traffic.',
    keywords: ['SEO services Pakistan', 'SEO agency', 'technical SEO audit', 'keyword research services', 'link building services', 'SEO company Pakistan'],
    subtitle: 'Rank Higher. Get Found. Grow Faster.',
    serviceType: 'Search Engine Optimization',
    longDesc:
      'Our data-driven SEO strategies are built on deep technical audits, competitive analysis, and content frameworks that get you to page 1 — and keep you there. We don\'t chase rankings; we build authority.',
    features: [
      { icon: FileSearch, label: 'Technical SEO Audit & Fix' },
      { icon: BarChart3, label: 'Keyword Research & Mapping' },
      { icon: Link2, label: 'Authority Link Building' },
      { icon: Layout, label: 'On-Page Optimization' },
      { icon: Gauge, label: 'Core Web Vitals Optimization' },
      { icon: Activity, label: 'SEO Analytics & Reporting' },
    ],
    results: ['Full technical SEO audits and fixes', 'Keyword-mapped content strategy', 'Transparent monthly reporting'],
  },
  {
    slug: 'geo',
    legacyAnchor: 'geo',
    icon: Globe,
    color: 'from-blue-600 to-cyan-700',
    borderColor: 'border-blue-500/20',
    glowColor: 'rgba(37,99,235,0.3)',
    title: 'GEO / AI Search Optimization',
    metaDescription: 'Get cited and recommended by ChatGPT, Perplexity, and Google AI Overviews with GEO — structured data, E-E-A-T authority, and AI search monitoring.',
    keywords: ['GEO services', 'Generative Engine Optimization', 'AI search optimization', 'ChatGPT SEO', 'Google AI Overviews optimization', 'answer engine optimization'],
    subtitle: 'Own the AI-Powered Search Landscape.',
    serviceType: 'Generative Engine Optimization',
    longDesc:
      'Generative Engine Optimization (GEO) is the next frontier of search. We position your brand to be cited, featured, and recommended by AI systems like ChatGPT, Perplexity, Google AI Overview, and Gemini — where millions of users are now getting their answers.',
    features: [
      { icon: Bot, label: 'AI Citation Strategy' },
      { icon: FileSearch, label: 'Structured Data & Schema' },
      { icon: Globe, label: 'E-E-A-T Authority Building' },
      { icon: Map, label: 'Local GEO Targeting' },
      { icon: Store, label: 'Google Business Optimization' },
      { icon: Activity, label: 'AI Search Monitoring' },
    ],
    results: ['Structured for AI citation', 'Authority E-E-A-T signals', 'Improved local search visibility'],
  },
  {
    slug: 'web-development',
    legacyAnchor: 'web',
    icon: Code2,
    color: 'from-cyan-600 to-blue-700',
    borderColor: 'border-cyan-500/20',
    glowColor: 'rgba(6,182,212,0.3)',
    title: 'Web Development',
    metaDescription: 'Custom websites and web apps built with Next.js, React, and TypeScript — engineered for speed, accessibility, and conversion from day one.',
    keywords: ['web development Pakistan', 'Next.js development', 'React development agency', 'custom website development', 'web application development'],
    subtitle: 'Websites That Perform Like Products.',
    serviceType: 'Web Development',
    longDesc:
      'We build high-performance websites and web applications using modern tech stacks — Next.js, React, TypeScript, and more. Every project is engineered for speed, accessibility, and conversion from day one.',
    features: [
      { icon: Layout, label: 'Custom Website Design' },
      { icon: ShoppingCart, label: 'E-Commerce Platforms' },
      { icon: Cpu, label: 'Web App Development' },
      { icon: Database, label: 'CMS Integration' },
      { icon: Gauge, label: 'Performance Optimization' },
      { icon: Lock, label: 'Security Hardening' },
    ],
    results: ['Sub-2s load time target', 'Mobile-first responsive design', 'Built for reliability'],
  },
  {
    slug: 'mobile-app-development',
    legacyAnchor: 'app',
    icon: Smartphone,
    color: 'from-emerald-600 to-teal-700',
    borderColor: 'border-emerald-500/20',
    glowColor: 'rgba(16,185,129,0.3)',
    title: 'Mobile App Development',
    metaDescription: 'Native iOS & Android and cross-platform Flutter/React Native app development — from concept to App Store launch.',
    keywords: ['mobile app development Pakistan', 'Flutter app development', 'React Native development', 'iOS app development', 'Android app development'],
    subtitle: 'Apps That Users Love. Businesses Rely On.',
    serviceType: 'Mobile App Development',
    longDesc:
      'From concept to App Store launch, we build native iOS & Android and cross-platform mobile applications with Flutter and React Native. Intuitive UX, robust architecture, and seamless backend integration.',
    features: [
      { icon: Smartphone, label: 'Flutter Cross-Platform' },
      { icon: Layers, label: 'React Native Apps' },
      { icon: Server, label: 'Backend API Development' },
      { icon: Database, label: 'Real-time Database' },
      { icon: Lock, label: 'App Store Submission' },
      { icon: Activity, label: 'Performance Monitoring' },
    ],
    results: ['Built for App Store & Play Store approval', 'Fast, responsive APIs', 'Offline-first architecture'],
  },
  {
    slug: 'digital-marketing',
    legacyAnchor: 'marketing',
    icon: TrendingUp,
    color: 'from-orange-600 to-red-700',
    borderColor: 'border-orange-500/20',
    glowColor: 'rgba(234,88,12,0.3)',
    title: 'Digital Marketing',
    metaDescription: 'Full-funnel digital marketing — PPC ads, social media management, and email automation backed by data and conversion tracking.',
    keywords: ['digital marketing agency Pakistan', 'PPC management', 'Google Ads agency', 'social media marketing', 'email marketing automation'],
    subtitle: 'Marketing That Converts, Not Just Impresses.',
    serviceType: 'Digital Marketing',
    longDesc:
      'Full-funnel digital marketing backed by data, not gut feeling. We run targeted PPC campaigns, build engaged social followings, and create email sequences that nurture leads into paying customers.',
    features: [
      { icon: MousePointerClick, label: 'Google & Meta PPC Ads' },
      { icon: Share2, label: 'Social Media Management' },
      { icon: Mail, label: 'Email Marketing & Automation' },
      { icon: BarChart3, label: 'Conversion Rate Optimization' },
      { icon: Activity, label: 'Marketing Analytics' },
      { icon: GitBranch, label: 'A/B Testing & Optimization' },
    ],
    results: ['Full-funnel campaign strategy', 'Conversion-focused landing pages', 'Full attribution reporting'],
  },
  {
    slug: 'cloud-solutions',
    legacyAnchor: 'cloud',
    icon: Cloud,
    color: 'from-violet-600 to-indigo-700',
    borderColor: 'border-violet-500/20',
    glowColor: 'rgba(139,92,246,0.3)',
    title: 'Cloud Solutions',
    metaTitle: 'Cloud Solutions & DevOps',
    metaDescription: 'AWS, Azure, and GCP infrastructure with DevOps best practices — CI/CD pipelines, monitoring, and cost-optimized cloud architecture.',
    keywords: ['cloud consulting Pakistan', 'AWS consulting', 'DevOps services', 'cloud migration services', 'CI/CD pipeline setup'],
    subtitle: 'Infrastructure Built to Scale Infinitely.',
    serviceType: 'Cloud Computing',
    longDesc:
      'Architect, deploy, and manage cloud infrastructure on AWS, Azure, or GCP with DevOps best practices. We handle everything from containerization to CI/CD pipelines, monitoring, and cost optimization.',
    features: [
      { icon: Server, label: 'AWS / Azure / GCP Setup' },
      { icon: Terminal, label: 'DevOps & CI/CD Pipelines' },
      { icon: Lock, label: 'Cloud Security & Compliance' },
      { icon: Database, label: 'Database Management' },
      { icon: Activity, label: 'Monitoring & Alerting' },
      { icon: Gauge, label: 'Cost Optimization' },
    ],
    results: ['Reliable, monitored infrastructure', 'Cost-optimized architecture', 'Auto-scaling setup'],
  },
  {
    slug: 'ai-development',
    legacyAnchor: 'ai-agents',
    icon: Bot,
    color: 'from-fuchsia-600 to-purple-800',
    borderColor: 'border-fuchsia-500/20',
    glowColor: 'rgba(192,38,211,0.3)',
    title: 'AI Development',
    metaDescription: 'Custom AI agents and workflow automation that plan and take action across your tools, with human-in-the-loop controls where it matters.',
    keywords: ['AI development company Pakistan', 'AI agent development', 'AI automation services', 'custom AI agents', 'LLM integration services'],
    subtitle: 'Autonomous Software That Gets Work Done.',
    serviceType: 'AI Development',
    longDesc:
      'We design and build custom AI agents and automation that plan, reason, and take action across your tools — automating multi-step workflows instead of just answering questions. Every system is scoped to your business logic, connected to your existing systems, and built with human-in-the-loop checkpoints where it matters.',
    features: [
      { icon: Workflow, label: 'Custom Workflow Automation' },
      { icon: Puzzle, label: 'Tool & API Integrations' },
      { icon: ShieldCheck, label: 'Human-in-the-Loop Controls' },
      { icon: Database, label: 'Connects to Your Existing Data' },
      { icon: Activity, label: 'Usage Monitoring & Logging' },
      { icon: Cpu, label: 'Built on Leading LLM Providers' },
    ],
    results: ['Tailored to your exact workflow', 'Safe-by-design approval checkpoints', 'Works alongside your existing team'],
  },
  {
    slug: 'ai-chatbots',
    legacyAnchor: 'ai-chatbots',
    icon: MessageSquare,
    color: 'from-pink-600 to-rose-700',
    borderColor: 'border-pink-500/20',
    glowColor: 'rgba(219,39,119,0.3)',
    title: 'AI Chatbots',
    metaTitle: 'AI Chatbot Development',
    metaDescription: 'Custom AI chatbots for your website, WhatsApp, or internal tools — trained on your own content, with lead capture and human handoff.',
    keywords: ['AI chatbot development Pakistan', 'WhatsApp chatbot development', 'custom chatbot for business', 'conversational AI development'],
    subtitle: 'Conversational AI, Trained On Your Business.',
    serviceType: 'AI Chatbot Development',
    longDesc:
      'We build custom AI chatbots — for your website, WhatsApp, or internal tools — trained on your own content so they answer accurately, capture leads, and hand off to a human exactly when needed. Not a generic script: a chatbot that actually knows your business.',
    features: [
      { icon: MessageSquare, label: 'Custom Conversational Flows' },
      { icon: FileSearch, label: 'Trained on Your Content' },
      { icon: Share2, label: 'Web, WhatsApp & Slack Deployment' },
      { icon: Mail, label: 'Lead Capture & Handoff' },
      { icon: Lock, label: 'Data Privacy Safeguards' },
      { icon: Activity, label: 'Conversation Analytics' },
    ],
    results: ['Answers grounded in your real content', 'Escalates to your team when needed', 'Deployed wherever your customers are'],
  },
  {
    slug: 'trading-bots',
    legacyAnchor: 'trading-bots',
    icon: LineChart,
    color: 'from-yellow-600 to-amber-700',
    borderColor: 'border-yellow-500/20',
    glowColor: 'rgba(234,179,8,0.3)',
    title: 'Trading Bots',
    metaTitle: 'Algorithmic Trading Bot Development',
    metaDescription: 'Custom algorithmic trading bots built to your strategy — backtested against historical data, with full source code ownership.',
    keywords: ['algorithmic trading bot development', 'custom trading bot Pakistan', 'trading bot backtesting', 'exchange API integration'],
    subtitle: 'Algorithmic Trading, Built To Your Strategy.',
    serviceType: 'Algorithmic Trading Software Development',
    longDesc:
      'We build custom trading bots that execute your strategy programmatically — from signal generation to order execution — across the exchanges and brokers you use. Every bot is built to your rules, backtested against historical data, and handed over with full source code ownership.',
    features: [
      { icon: LineChart, label: 'Custom Strategy Implementation' },
      { icon: Activity, label: 'Historical Backtesting' },
      { icon: Server, label: 'Exchange & Broker API Integration' },
      { icon: Gauge, label: 'Risk & Position Management Rules' },
      { icon: Lock, label: 'Secure Key & Credential Handling' },
      { icon: Terminal, label: 'Full Source Code Ownership' },
    ],
    results: ['Built to your exact strategy and risk rules', 'Backtested against historical market data'],
    disclaimer: 'This is custom software development, not financial or investment advice. Trading involves substantial risk — backtested or simulated performance does not guarantee future results.',
  },
]

export function getServiceBySlug(slug: string): ServiceCategory | undefined {
  return serviceCategories.find(s => s.slug === slug)
}

export const process = [
  { step: '01', title: 'Discovery Call', desc: 'We learn your goals, constraints, and success metrics. No templates — pure listening.' },
  { step: '02', title: 'Strategy & Proposal', desc: 'Custom strategy document with timeline, deliverables, and transparent pricing.' },
  { step: '03', title: 'Design & Build', desc: 'Iterative development with weekly check-ins and live preview environments.' },
  { step: '04', title: 'Launch & Grow', desc: 'Launch with confidence. Then ongoing optimization to keep scaling your results.' },
]

export const serviceFaqs = [
  {
    q: 'What does Aiventra Labs SEO optimization service include?',
    a: 'Our SEO service covers full technical SEO audits, keyword research and mapping, authority link building, on-page optimization, Core Web Vitals improvements, structured data implementation, and monthly reporting. We handle both on-page and off-page factors for comprehensive search visibility across Google and Bing.',
  },
  {
    q: 'What is GEO (Generative Engine Optimization) and how does it differ from SEO?',
    a: 'GEO is the technical and content discipline behind AI citations: structured data, clear entity signals, topical depth, and demonstrated E-E-A-T, so systems like ChatGPT, Perplexity, and Google AI Overviews treat your business as a source worth citing. It\'s a different skill set from classic keyword-and-backlink SEO, and most agencies haven\'t caught up to it yet.',
  },
  {
    q: 'How long does a web development project take at Aiventra Labs?',
    a: 'A standard business website takes 2–4 weeks. E-commerce platforms take 4–8 weeks. Custom web applications take 6–16 weeks depending on complexity. Timelines are agreed upfront in our project proposal, with weekly updates and live preview environments throughout.',
  },
  {
    q: 'Do you build apps for both Android and iOS?',
    a: 'Yes. We build native Android and iOS apps as well as cross-platform applications using Flutter and React Native. Cross-platform development reduces cost and time-to-market while maintaining near-native performance. We also handle App Store and Google Play submission and post-launch support.',
  },
  {
    q: 'What cloud platforms does Aiventra Labs support?',
    a: 'Aiventra Labs designs and manages infrastructure on Amazon Web Services (AWS), Microsoft Azure, and Google Cloud Platform (GCP). We also deploy on Vercel, Cloudflare, and DigitalOcean. All cloud setups include CI/CD pipelines, monitoring, alerting, and cost optimization.',
  },
  {
    q: 'Do you offer ongoing support after project delivery?',
    a: 'Yes. All projects include 30 days of free post-launch support. We also offer monthly maintenance retainer plans covering updates, security patches, performance monitoring, and minor changes. SEO and digital marketing clients typically work with us on ongoing monthly contracts for sustained growth.',
  },
  {
    q: 'What is an AI agent, and can Aiventra Labs build one for my business?',
    a: 'An AI agent is software that plans and takes action across your tools — not just answering questions, but completing multi-step tasks. We build custom AI agents scoped to your workflows, connected to your existing systems, with human-in-the-loop approval checkpoints so nothing happens without oversight where it matters.',
  },
  {
    q: 'Can you build an AI chatbot trained on our own content?',
    a: 'Yes. We build custom AI chatbots trained on your business content — services, FAQs, policies — so they answer accurately instead of guessing. They can be deployed on your website, WhatsApp, or Slack, capture leads, and hand off to your team when a conversation needs a human.',
  },
  {
    q: 'Do you build trading bots? Do you guarantee returns?',
    a: 'We build custom algorithmic trading bots to your own strategy and risk rules, including historical backtesting and exchange/broker API integration. This is custom software development, not financial or investment advice — we do not and cannot guarantee returns, and trading involves substantial risk. Backtested or simulated performance never guarantees future results.',
  },
]

export const RELATED_ARTICLES: Record<string, string[]> = {
  seo: ['what-to-expect-hiring-seo-services-2026', 'how-to-identify-the-best-it-company-2026'],
  geo: ['geo-generative-engine-optimization-2026', 'geo-best-practices-2026', 'aeo-answer-engine-optimization-2026'],
  'web-development': ['hiring-nextjs-developer-vs-agency', 'how-to-find-an-affordable-web-development-company'],
  'ai-chatbots': ['how-to-optimize-website-for-chatgpt-2026', 'what-is-ai-seo-2026-guide'],
}
