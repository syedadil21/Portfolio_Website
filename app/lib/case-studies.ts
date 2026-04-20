export interface CaseStudyImage {
  src: string;
  alt: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  stack: string[];
  images: CaseStudyImage[];
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
    images: [],
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
    images: [
      { src: "/projects/quickbuy/admin/Dashboard.png", alt: "Admin dashboard — KPI cards, sales chart, and order analytics" },
      { src: "/projects/quickbuy/admin/Dashboard2.png", alt: "Admin dashboard — low stock alerts, order status donut chart, and breakdown" },
      { src: "/projects/quickbuy/admin/DashboardWithNotifications.png", alt: "Admin dashboard with real-time SignalR notification panel" },
      { src: "/projects/quickbuy/admin/InventoryManagement.png", alt: "Inventory lot management — stock tracking with dates and quantities" },
      { src: "/projects/quickbuy/admin/NotificationList.png", alt: "Full notification list with mark-as-read and pagination" },
      { src: "/projects/quickbuy/admin/ProductsList.png", alt: "Product catalog with search filters, pricing, and UPC codes" },
      { src: "/projects/quickbuy/user/CartByStores.png", alt: "Multi-vendor cart — items grouped by store with per-store checkout" },
      { src: "/projects/quickbuy/user/CompareCarts.png", alt: "Cross-store price comparison — color-coded savings per vendor" },
      { src: "/projects/quickbuy/user/Dashboard.png", alt: "Mobile home — featured categories, quick actions, and recent orders" },
      { src: "/projects/quickbuy/user/Orders.png", alt: "Order history — status badges, store names, and sort/filter options" },
    ],
    subtitle: "Cross-platform grocery app with multi-vendor cart management and per-store checkout",
    category: "Mobile",
    stack: [
      "React Native (Expo)",
      "ASP.NET Core",
      "Next.js",
      "SQL Server",
      "Entity Framework",
      "GraphQL (HotChocolate)",
      "SignalR",
      "JWT",
    ],
    overview:
      "A cross-platform grocery application where users manage multiple carts across vendors and checkout per store, with a GraphQL API, SignalR real-time notifications, condition-based promotions, inventory lot tracking, and a Next.js purveyor dashboard for analytics and order management.",
    problem: [
      "Users needed to shop from multiple grocery purveyors simultaneously, but existing apps only supported single-vendor cart management.",
      "Multi-tenant data isolation was critical — each purveyor's data must be strictly separated while sharing the same infrastructure.",
      "Purveyors needed real-time visibility into orders, inventory, and sales without constant page refreshes.",
      "Inventory management needed to support both real-time REST API updates and batch operations via Excel import for purveyors with varying technical capabilities.",
      "The platform needed a flexible promotions system that could apply different discount rules based on configurable conditions.",
    ],
    solution: [
      "Built a React Native (Expo) mobile app with multi-vendor cart management — items grouped by purveyor with per-store checkout, cross-store price comparison, order lifecycle tracking (Created → Processing → Shipped → Delivered), and internationalization with RTL language support. Implemented dual state management using Zustand (cart) and MobX-State-Tree (auth).",
      "Designed secure ASP.NET Web APIs with JWT authentication and role-based access control for users and purveyors.",
      "Implemented multi-tenant architecture using row-level data isolation with a CompanyKey discriminator resolved from JWT claims — every service query filters by CompanyKey.",
      "Built a GraphQL API with HotChocolate featuring 40+ schema types and conversion layers between domain models and graph types.",
      "Implemented SignalR real-time notifications with company-scoped channels and exponential backoff reconnection for live order and inventory updates.",
      "Built an EF Core audit logging interceptor that captures all entity changes with full change history for compliance.",
      "Designed a condition-based promotions engine with priority evaluation and automatic discount calculation.",
      "Implemented inventory lot tracking with expiry date management and Excel bulk import (multi-sheet: Products, InventoryLots, Promotions) for batch operations.",
      "Built a Next.js purveyor dashboard with TanStack Query caching, KPI overview, sales analytics, and order status reporting.",
    ],
    features: [
      "Multi-vendor cart management with per-store checkout",
      "Cross-store price comparison for the same product",
      "Order lifecycle tracking (Created → Processing → Shipped → Delivered)",
      "Dual state management (Zustand for cart, MobX-State-Tree for auth)",
      "Internationalization with RTL language support",
      "Dark/light theme with system detection",
      "Multi-tenant row-level data isolation (CompanyKey from JWT)",
      "GraphQL API with HotChocolate (40+ schema types)",
      "SignalR real-time notifications (company-scoped channels)",
      "EF Core audit logging interceptor (full change history)",
      "Condition-based promotions engine with priority evaluation",
      "Inventory lot tracking with expiry management",
      "Excel bulk import (Products, InventoryLots, Promotions)",
      "Account security (lockout mechanism, rate limiting, data redaction)",
      "Cloudinary image upload for product management",
      "Next.js purveyor dashboard with reporting analytics",
      "TanStack Query caching with query invalidation",
    ],
    outcome: [
      "Delivered a production-ready cross-platform grocery app serving multiple purveyors with strict data isolation.",
      "GraphQL API with 40+ types provided flexible querying for both mobile and dashboard clients.",
      "SignalR real-time notifications eliminated the need for manual page refreshes for purveyors.",
      "Audit logging provided a complete change history for all entities, supporting compliance requirements.",
      "Excel bulk import enabled non-technical purveyors to manage inventory without API knowledge.",
    ],
    role: "Full stack developer — built the React Native mobile app, designed the multi-tenant ASP.NET API with GraphQL and SignalR, implemented the promotions engine and audit logging, and built the Next.js purveyor dashboard.",
  },
  {
    slug: "fbta-learning-platform",
    title: "FBTA — Learning Platform",
    images: [
      { src: "/projects/fbta/dashboard.png", alt: "Platform dashboard — quick access, live activity feed, and user management" },
      { src: "/projects/fbta/deviceManagement.png", alt: "Device management — trusted devices list with remove option (max 2)" },
      { src: "/projects/fbta/lectures.png", alt: "Video player with watermark overlay and content protection notice" },
      { src: "/projects/fbta/lecturesList.png", alt: "Lecture catalog with category filters and security feature callouts" },
      { src: "/projects/fbta/materials.png", alt: "Protected PDF viewer — copy, download, and print disabled" },
    ],
    subtitle: "Video learning platform with multi-layer content security and device verification",
    category: "Web",
    stack: [
      "Next.js",
      "Fastify",
      "Node.js",
      "PostgreSQL",
      "Knex.js",
      "Backblaze B2",
      "Redis",
      "Socket.IO",
      "Video.js",
      "TypeScript",
      "Docker",
    ],
    overview:
      "A full-stack video learning platform with course management, multi-layer content security (presigned URLs, device limits, stream locking, watermarking), and a real-time admin dashboard for session monitoring and security alerts.",
    problem: [
      "Video content needed to be delivered securely — preventing unauthorized downloads, screen recording, and link sharing.",
      "The platform needed device-level access control to prevent credential sharing across unlimited devices.",
      "Video hosting and CDN costs needed to be minimized while maintaining fast, global delivery.",
      "User sessions required encryption and IP geolocation tracking for audit and security compliance.",
      "Administrators needed real-time visibility into active sessions, suspicious activities, and device changes.",
    ],
    solution: [
      "Stored video content on Backblaze B2 (S3-compatible) with optional Cloudflare CDN delivery, using presigned URLs with 10-minute expiry to prevent link sharing.",
      "Implemented OTP-based new device verification — 6-digit OTP via email with Redis-backed storage, max 5 attempts, and 10-minute TTL. Configurable trusted device limit (default: 2) with automatic oldest-device removal.",
      "Built SHA-256 device fingerprinting from userAgent, screenResolution, timezone, and language for device identification.",
      "Enforced single concurrent stream per user with Redis-based locking, 30-second heartbeat refresh, and Socket.IO stream_revoked events when a stream is replaced.",
      "Implemented video player security: disabled context menu, hidden native controls, DevTools detection (pauses video), and rotating watermarks with user email/ID.",
      "Built sodium-encrypted sessions via @fastify/secure-session with MaxMind GeoLite2 IP geolocation tracking for comprehensive audit trails.",
      "Designed a Fastify backend with Knex.js query builder for performant database operations on PostgreSQL.",
    ],
    features: [
      "Presigned URLs with 10-minute expiry via Backblaze B2",
      "OTP-based device verification (6-digit, Redis-backed, max 5 attempts)",
      "SHA-256 device fingerprinting (max 2 trusted devices)",
      "Single concurrent stream enforcement with Redis locking",
      "Video watermarking with user identification",
      "DevTools detection — pauses video if detected",
      "Sodium-encrypted sessions with MaxMind IP geolocation",
      "Real-time admin dashboard with Socket.IO (active sessions, security alerts)",
      "Course and lecture management system",
      "Fastify backend with Knex.js on PostgreSQL",
    ],
    outcome: [
      "Secured video content with 6+ layers of protection (presigned URLs, device limits, stream locking, watermarking, DevTools detection, encrypted sessions).",
      "Chose Backblaze B2 + Cloudflare for significant cost savings over AWS S3 + CloudFront.",
      "Device fingerprinting with configurable trust limits effectively curbed credential sharing without degrading UX.",
      "Real-time admin dashboard provided instant visibility into suspicious activities and device changes.",
    ],
    role: "Full stack developer — designed the multi-layer security architecture, implemented presigned URL pipeline, OTP device verification, stream locking, video player protections, admin dashboard, Fastify API, and Next.js frontend.",
  },
  {
    slug: "communityvotetracker",
    title: "CommunityVoteTracker",
    images: [
      { src: "/projects/communityvotetracker/AdminScreen.png", alt: "Admin panel — user list with roles and access level management" },
      { src: "/projects/communityvotetracker/IssuesScreen.png", alt: "Issues list with status badges, vote progress, and filtering" },
      { src: "/projects/communityvotetracker/IssueDetailsScreen.png", alt: "Issue details — vote tally, status, and voting actions" },
      { src: "/projects/communityvotetracker/CastVoteScreen.png", alt: "Cast vote screen — For/Against/Abstain with confirmation" },
      { src: "/projects/communityvotetracker/SearchIssuesScreen.png", alt: "Search issues — filter by keyword, type, and date range" },
    ],
    subtitle: "Community voting platform with mobile app and admin portal",
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
      "A community-focused voting application with a React Native mobile app for For/Against/Abstain issue voting and a Next.js admin portal for community and user management. Features push notifications, tiered access control, and Docker containerized deployment.",
    problem: [
      "Community organizations needed a transparent, accessible way for members to vote on issues — paper ballots and email polls were unreliable and hard to track.",
      "Voting needed to be secure with role-based access — only authorized members should vote, and administrators needed full audit control.",
      "Members needed real-time notifications about new issues and voting deadlines without manually checking the app.",
      "The solution needed to work across mobile and web with a consistent experience.",
    ],
    solution: [
      "Built a React Native mobile app for community members to vote (For/Against/Abstain) on issues, and a Next.js admin portal for PMAC administrators to manage communities, users, and permissions.",
      "Implemented role-based access control with voting permissions (Allowed to Vote / Non Voter) and tiered access levels (Full Access / Limited Access) for different user types.",
      "Used Redux Toolkit and RTK Query for efficient state management, API caching, and cache invalidation on the mobile client.",
      "Integrated OneSignal push notifications on both backend (OneSignal API) and mobile (react-native-onesignal) to alert members about new issues, voting deadlines, and results.",
      "Built the backend with ASP.NET Core and Dapper ORM using stored procedures for performant database operations.",
      "Initially deployed APIs and SQL Server to Azure; later migrated to Render with Docker for cost optimization.",
    ],
    features: [
      "For/Against/Abstain voting on community issues",
      "React Native mobile app for voting",
      "Next.js admin portal for community management",
      "Voting permissions and tiered access levels",
      "Redux Toolkit/RTK Query state management and caching",
      "OneSignal push notifications (backend + mobile)",
      "ASP.NET Core API with Dapper ORM and stored procedures",
      "Azure deployment (initial) with Docker containerization",
    ],
    outcome: [
      "Provided a transparent, auditable voting platform replacing unreliable paper/email methods.",
      "Push notifications increased voting participation by keeping members informed of new issues and deadlines.",
      "Separated voting (mobile) from administration (web) for a clean UX tailored to each user type.",
      "Docker containerization enabled smooth migration from Azure to Render without code changes.",
    ],
    role: "Full stack developer — built the React Native voting app, Next.js admin portal, designed ASP.NET APIs with Dapper, and integrated OneSignal push notifications.",
  },
  {
    slug: "osintify",
    title: "OSINTify — OSINT Analysis Tool",
    images: [
      { src: "/projects/osintify/Dashboard.png", alt: "Scan configuration — module selection and target input" },
      { src: "/projects/osintify/ScanList.png", alt: "Scan history — targets, statuses, and timestamps" },
      { src: "/projects/osintify/ScanDetails.png", alt: "Scan results — data elements breakdown by type" },
      { src: "/projects/osintify/Chart.png", alt: "Results visualization — data elements found per category" },
    ],
    subtitle: "Multi-source OSINT data aggregation platform",
    category: "AI",
    stack: ["Next.js", "React", "Supabase", "PostgreSQL", "Tailwind CSS", "Node.js"],
    overview:
      "Final Year Project. A Next.js web application that aggregates data from 6 OSINT APIs into a unified search interface, supporting email, username, IP, phone, domain, and blockchain lookups with intelligent routing based on input type. Try the live demo at osintify.vercel.app (Email: test1@gmail.com / Password: test123).",
    problem: [
      "OSINT analysis was a manual, time-consuming process requiring analysts to check multiple platforms and databases individually.",
      "Different data sources required different query types (email vs IP vs username) with no unified interface to search across them.",
      "Analysts needed aggregated results from multiple sources in one view rather than switching between tools.",
    ],
    solution: [
      "Built a Next.js web app with Supabase (PostgreSQL) that routes queries to relevant OSINT APIs based on input type — email triggers Dehashed + Blackbird, IP triggers Dehashed + AntiTor, etc.",
      "Integrated 6 data sources: Dehashed (breach database), Blackbird (username/social media search), Hunter.io (domain email extraction), Blockchain.info (Bitcoin address lookup), AntiTor (Tor node detection), and SimInfo (phone number lookup).",
      "Designed a summary dashboard with data volume visualization per source using MUI X-Charts.",
      "Implemented scan history persistence with Supabase so users can review past queries.",
      "Built authentication via Supabase Auth (email/password).",
    ],
    features: [
      "6 OSINT API integrations (Dehashed, Blackbird, Hunter.io, Blockchain.info, AntiTor, SimInfo)",
      "Unified search supporting email, username, IP, phone, domain, and blockchain inputs",
      "Intelligent routing — automatically queries relevant APIs based on input type",
      "Summary dashboard with data volume chart per source",
      "Scan history persistence via Supabase",
      "Authentication via Supabase Auth",
    ],
    outcome: [
      "Consolidated what was previously a multi-tool manual process into a single unified interface.",
      "Intelligent routing eliminated the need for analysts to know which tool to use for which input type.",
      "Successfully delivered as the Final Year Project at FAST NUCES.",
    ],
    role: "Primary developer — designed the architecture, built the query routing engine, integrated all 6 OSINT APIs, and built the Next.js frontend with Supabase backend.",
  },
  {
    slug: "bento",
    title: "Bento — AI-Powered Recipe App",
    images: [],
    subtitle: "Recipe app with voice visualizer, ESP-32 hardware integration, and AI assistant",
    category: "AI",
    stack: ["React Native (Expo)", "Reanimated", "Audio API", "ESP-32", "Bluetooth"],
    overview:
      "A food recipe application with an AI-powered cooking assistant (ElevenLabs voice agent on ESP-32 hardware). Built real-time voice visualization, Bluetooth hardware provisioning, and contributed to UI redesign. Team project.",
    problem: [
      "The AI assistant needed a visual feedback mechanism during voice interaction — users had no way to tell if the app was listening, processing, or responding.",
      "The ESP-32 hardware device needed initial Wi-Fi configuration, which is complex for non-technical users who can't access a serial terminal.",
      "The existing UI didn't match the product's premium positioning and needed a redesign.",
    ],
    solution: [
      "Engineered a real-time voice visualizer with an animated halo effect that expands and contracts based on live microphone decibel levels — similar to Siri's visual feedback. Used React Native Reanimated for smooth 60fps animation driven by the Audio API's amplitude values.",
      "Implemented Wi-Fi provisioning over Bluetooth — the mobile app connects to the ESP-32 device via BLE and securely transfers Wi-Fi credentials without the device needing an existing network connection.",
      "Contributed to a full UI redesign of the application screens for a more polished user experience.",
    ],
    features: [
      "Real-time voice visualizer (Reanimated + Audio API, 60fps)",
      "Animated halo responding to microphone decibel levels",
      "Wi-Fi provisioning over Bluetooth (BLE) for ESP-32",
      "Hardware-software bridge — configures IoT device from mobile app",
      "UI redesign contribution",
      "AI voice assistant powered by ElevenLabs (team feature)",
    ],
    outcome: [
      "Voice visualizer provided intuitive visual feedback during AI interactions, matching the quality of Siri/Alexa-style assistants.",
      "Bluetooth provisioning eliminated the need for complex manual device configuration — setup takes under a minute.",
      "UI redesign improved the overall product feel to match premium positioning.",
    ],
    role: "Contributor (team project) — built the real-time voice visualizer, implemented Bluetooth Wi-Fi provisioning for ESP-32, and contributed to UI redesign.",
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}
