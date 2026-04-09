export interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  stack: string[];
  overview: string;
  problem: string[];
  solution: string[];
  features: string[];
  outcome: string[];
  role: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "ai-analytics-module",
    title: "AI Analytics Module",
    subtitle: "Natural language querying over orthodontic patient management data",
    category: "AI",
    stack: [
      "Next.js",
      "GPT-4o",
      "PostgreSQL",
      "Vercel AI SDK",
      "Prisma",
      "Recharts",
      "TanStack Query",
      "TypeScript",
    ],
    overview:
      "Built a production-grade AI-powered analytics layer inside an orthodontic patient management system. Users can query operational and financial data in plain English and receive instant visual reports.",
    problem: [
      "Clinical staff needed to query complex operational and financial datasets but lacked technical SQL knowledge.",
      "Existing reporting was static and limited to pre-built templates, requiring developer intervention for custom queries.",
      "LLMs hallucinate SQL — generating queries against non-existent tables, columns, or enum values — making naive AI integrations unsafe for production.",
      "Marketing attribution data (GA4) was siloed from clinical/revenue data, making ROI analysis impossible.",
    ],
    solution: [
      "Implemented dynamic PostgreSQL schema introspection that reads real table names, column types, enum values, and foreign key relationships at runtime — grounding GPT-4o's context in the actual database schema.",
      "Built a schema-grounded SQL generation pipeline with structured output enforcement via Vercel AI SDK, ensuring the LLM always produces valid, executable queries.",
      "Added SELECT-only validation and read-only database connections to prevent any destructive operations in production.",
      "Integrated GA4 marketing attribution data to bridge the gap between ad spend, lead sources, and treatment start revenue.",
      "Built 12+ interactive report types with Recharts and TanStack Query for real-time data visualization with caching.",
    ],
    features: [
      "Natural language to SQL conversion with zero hallucinations",
      "Dynamic schema introspection (tables, enums, relationships)",
      "SELECT-only query validation for production safety",
      "Read-only database connections",
      "12+ interactive dashboard report types",
      "GA4 marketing attribution integration",
      "Real-time visualizations with Recharts",
      "Efficient data caching with TanStack Query",
    ],
    outcome: [
      "Enabled non-technical staff to self-serve complex data queries without developer involvement.",
      "Eliminated LLM hallucinations through schema grounding — 100% valid SQL output.",
      "Bridged marketing and clinical data, enabling ROI attribution from ad spend to treatment revenue.",
      "Reduced reporting turnaround from days (developer-dependent) to seconds (self-serve).",
    ],
    role: "Sole developer — designed architecture, implemented schema introspection pipeline, integrated GPT-4o, built dashboards, and deployed to production.",
  },
  {
    slug: "quickbuy",
    title: "QuickBuy — Multi-Purveyor Grocery Platform",
    subtitle: "Cross-platform grocery app with multi-vendor checkout",
    category: "Mobile",
    stack: [
      "React Native (Expo)",
      "ASP.NET Core",
      "Next.js",
      "SQL Server",
      "Entity Framework",
      "JWT",
      "Docker",
      "GitHub Actions",
    ],
    overview:
      "A cross-platform grocery application where users manage multiple carts simultaneously and checkout across different stores, with a dedicated purveyor dashboard for inventory and order management.",
    problem: [
      "Users needed to shop from multiple grocery purveyors simultaneously, but existing apps only supported single-vendor checkout.",
      "Purveyors ranged from tech-enabled (with APIs) to manual operations, requiring a hybrid inventory management approach.",
      "Multi-tenant data isolation was critical — each purveyor's data must be strictly separated while sharing the same infrastructure.",
      "Purveyors needed real-time visibility into orders, inventory, and sales without constant page refreshes.",
    ],
    solution: [
      "Built a React Native (Expo) mobile app supporting simultaneous multi-cart management across different vendors with a unified checkout flow.",
      "Designed secure ASP.NET Web APIs with JWT authentication and role-based access control for users and purveyors.",
      "Implemented multi-tenant architecture using row-level data isolation with a CompanyKey discriminator resolved from JWT claims — ensuring strict data separation.",
      "Built a real-time Next.js purveyor dashboard with TanStack Query for caching and live updates, reducing API load while keeping data fresh.",
      "Delivered hybrid inventory management with API integrations for tech-enabled purveyors and manual update interfaces for others.",
    ],
    features: [
      "Multi-cart simultaneous management across vendors",
      "Unified cross-vendor checkout flow",
      "JWT-based authentication with role-based access",
      "Multi-tenant row-level data isolation",
      "Real-time purveyor dashboard with TanStack Query",
      "Hybrid inventory management (API + manual)",
      "CI/CD pipeline with GitHub Actions",
      "Docker containerized deployment",
    ],
    outcome: [
      "Delivered a production-ready cross-platform grocery app serving multiple purveyors.",
      "Multi-tenant architecture ensured data isolation while keeping infrastructure costs low.",
      "TanStack Query caching reduced API calls by ~40% while maintaining real-time data freshness.",
      "Hybrid inventory approach enabled onboarding of both tech-savvy and traditional purveyors.",
    ],
    role: "Full stack developer — built the mobile app, designed APIs and database schema, implemented multi-tenancy, and built the purveyor dashboard.",
  },
  {
    slug: "fbta-learning-platform",
    title: "FBTA — Learning Platform",
    subtitle: "Video learning platform with secure HLS streaming and device verification",
    category: "Web",
    stack: [
      "Next.js",
      "Fastify",
      "Node.js",
      "PostgreSQL",
      "Knex.js",
      "AWS S3",
      "TypeScript",
      "Docker",
    ],
    overview:
      "A full-stack video learning platform with course management, secure HLS video streaming, device fingerprinting, and multi-layer security to prevent unauthorized content access.",
    problem: [
      "Video content needed to be delivered securely — preventing unauthorized downloads, screen recording, and link sharing.",
      "The platform needed device-level access control to prevent credential sharing across unlimited devices.",
      "Video hosting and CDN costs needed to be minimized while maintaining fast, global delivery.",
      "User sessions required encryption and IP geolocation tracking for audit and security compliance.",
    ],
    solution: [
      "Implemented HLS video streaming via Backblaze B2 (S3-compatible) with Cloudflare CDN for cost-effective, globally distributed delivery.",
      "Built presigned URL generation for secure, time-limited video access — URLs expire after a short window, preventing link sharing.",
      "Implemented OTP-based new device verification with device fingerprinting to limit concurrent device access per account.",
      "Built secure encrypted sessions with IP geolocation tracking for comprehensive audit trails.",
      "Designed a Fastify backend with Knex.js query builder for performant database operations on PostgreSQL.",
    ],
    features: [
      "HLS video streaming with Backblaze B2 + Cloudflare CDN",
      "Presigned URLs for time-limited secure video access",
      "OTP-based new device verification",
      "Device fingerprinting for access control",
      "Encrypted sessions with IP geolocation",
      "Course and lecture management system",
      "Fastify backend with Knex.js ORM",
      "Docker containerized deployment",
    ],
    outcome: [
      "Secured video content delivery with multi-layer protection (HLS + presigned URLs + device limits).",
      "Reduced CDN costs by ~60% using Backblaze B2 + Cloudflare compared to traditional providers.",
      "Device fingerprinting effectively limited credential sharing without degrading user experience.",
      "Encrypted sessions and IP tracking provided a comprehensive security audit trail.",
    ],
    role: "Full stack developer — designed the security architecture, implemented video streaming pipeline, built the Fastify API, and frontend.",
  },
  {
    slug: "communityvotetracker",
    title: "CommunityVoteTracker",
    subtitle: "Community voting platform with mobile and web clients",
    category: "Mobile",
    stack: [
      "React Native",
      "Next.js",
      "ASP.NET Core",
      "SQL Server",
      "Dapper",
      "OneSignal",
      "Azure",
      "Docker",
    ],
    overview:
      "A community-focused voting application enabling secure, issue-based voting with both mobile and web interfaces, push notifications, and Azure cloud deployment.",
    problem: [
      "Community organizations needed a transparent, accessible way for members to vote on issues — paper ballots and email polls were unreliable and hard to track.",
      "Voting needed to be secure with role-based access — only authorized members should vote, and administrators needed full audit control.",
      "Members needed real-time notifications about new issues and voting deadlines without manually checking the app.",
      "The solution needed to work across mobile and web with a consistent experience.",
    ],
    solution: [
      "Built a React Native mobile app and Next.js web client sharing the same ASP.NET backend APIs.",
      "Implemented secure issue-based voting with role-based access control — separate permissions for voters, moderators, and administrators.",
      "Used Redux Toolkit and RTK Query for efficient state management and API caching on the mobile client.",
      "Integrated OneSignal push notifications to alert members about new issues, voting deadlines, and results.",
      "Built the backend with ASP.NET Core and Dapper ORM for lightweight, performant database operations.",
      "Deployed APIs and SQL Server to Azure with Docker for scalability and availability.",
    ],
    features: [
      "Cross-platform voting (React Native + Next.js)",
      "Role-based access control (voter/moderator/admin)",
      "Redux Toolkit/RTK Query state management",
      "OneSignal push notifications",
      "ASP.NET Core API with Dapper ORM",
      "Azure cloud deployment with Docker",
      "Real-time voting results and tracking",
    ],
    outcome: [
      "Provided a transparent, auditable voting platform replacing unreliable paper/email methods.",
      "Push notifications increased voting participation by keeping members informed of deadlines.",
      "Cross-platform support ensured accessibility for all community members.",
      "Azure deployment with Docker ensured high availability and easy scaling.",
    ],
    role: "Full stack developer — built mobile and web clients, designed APIs, integrated push notifications, and managed Azure deployment.",
  },
  {
    slug: "osintify",
    title: "OSINTify — OSINT Analysis Tool",
    subtitle: "Automated open-source intelligence analysis platform",
    category: "AI",
    stack: ["MongoDB", "Express.js", "React", "Node.js"],
    overview:
      "Final Year Project. A MERN stack web application for automating Open-Source Intelligence (OSINT) analysis, generating actionable insights into digital footprints by aggregating data from multiple public sources.",
    problem: [
      "OSINT analysis was a manual, time-consuming process requiring analysts to check multiple platforms and databases individually.",
      "Digital footprint data was scattered across social media, public records, and forums with no unified way to aggregate and correlate it.",
      "Analysts needed actionable threat intelligence, not just raw data — requiring automated correlation and pattern detection.",
    ],
    solution: [
      "Built a MERN stack web app that automatically aggregates data from multiple OSINT sources including social media, public records, and forums.",
      "Implemented automated data correlation to identify connections and patterns across disparate sources.",
      "Designed an intuitive dashboard for visualizing digital footprints and threat indicators.",
      "Led the development team and managed the project lifecycle from architecture to delivery.",
    ],
    features: [
      "Multi-source OSINT data aggregation",
      "Automated data correlation and pattern detection",
      "Digital footprint visualization dashboard",
      "Social media, public records, and forum scanning",
      "Threat identification and alerting",
    ],
    outcome: [
      "Automated what was previously a multi-hour manual process into minutes.",
      "Successfully demonstrated comprehensive digital footprint analysis across multiple data sources.",
      "Led the team to successful project delivery as the Final Year Project.",
    ],
    role: "Project lead — designed the architecture, led the development team, built core aggregation engine, and presented the final project.",
  },
  {
    slug: "bento",
    title: "Bento — AI-Powered Recipe App",
    subtitle: "Recipe app with AI assistant and ESP-32 hardware integration",
    category: "AI",
    stack: ["React Native (Expo)", "ESP-32", "Bluetooth"],
    overview:
      "A food recipe application with an AI-powered cooking assistant, featuring hardware integration with ESP-32 devices via Bluetooth for smart kitchen functionality.",
    problem: [
      "Users wanted an intelligent recipe assistant that could guide them through cooking — not just display static recipes.",
      "The AI assistant device (ESP-32) needed initial Wi-Fi configuration, which is complex for non-technical users.",
      "Bluetooth provisioning over Wi-Fi required a seamless mobile UX that hides the underlying protocol complexity.",
    ],
    solution: [
      "Built a React Native (Expo) app integrating an AI-powered cooking assistant.",
      "Implemented Wi-Fi provisioning over Bluetooth — the mobile app connects to the ESP-32 device via BLE and securely transfers Wi-Fi credentials without requiring the user to leave the app.",
      "Designed a step-by-step provisioning UX that guides users through device setup in under a minute.",
    ],
    features: [
      "AI-powered cooking assistant",
      "Wi-Fi provisioning over Bluetooth (BLE)",
      "ESP-32 hardware integration",
      "Step-by-step device setup UX",
      "Cross-platform React Native app",
    ],
    outcome: [
      "Delivered seamless hardware-software integration for non-technical users.",
      "Wi-Fi provisioning via Bluetooth eliminated the need for complex manual device configuration.",
    ],
    role: "Mobile developer — implemented the React Native app and Bluetooth provisioning flow for ESP-32 configuration.",
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}
