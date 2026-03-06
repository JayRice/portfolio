export type Tech =
    | "React"
    | "Next.js"
    | "TypeScript"
    | "JavaScript"
    | "TailwindCSS"
    | "shadcn/ui"
    | "Node"
    | "Supabase"
    | "Firebase"
    | "Twilio"
    | "Stripe"
    | "Vite"
    | "Python"
    | "PostgreSQL"
    | "Prisma"
    | "Docker"
    | "AWS"
    | "Vercel"

export type ProjectStatus = "live" | "development" | "hold"

export type ProjectData = {
    id: string
    slug: string
    name: string
    tagline: string
    description: string
    status: ProjectStatus
    tech: Tech[]
    images: string[]
    liveUrl?: string
    learnUrl?: string
    featured?: boolean
    variant?: "desktop" | "phone"
    videoUrls?: string[]
}

export const PROJECTS: ProjectData[] = [
    {
        id: "pwnprep",
        slug: "pwnprep",
        name: "PwnPrep",
        tagline: "OSCP-style practice + prep tooling.",
        description:
            "A focused prep platform for penetration testing workflows. Built for speed, organization, and repeatable practice.",
        status: "hold",
        tech: ["React", "TypeScript", "TailwindCSS", "Node"],
        images: ["pwnprep1.png", "pwnprep2.png", "pwnprep3.png"],
        liveUrl: "https://pwnprep-68ppxn4rh-jayrices-projects.vercel.app/",
        learnUrl: "https://github.com/jayrice/pwnprep",
        featured: false,
        videoUrls: ["https://www.youtube.com/watch?v=eviJmtSewuo"],
    },
    {
        id: "devmesa",
        slug: "devmesa",
        name: "DevMesa",
        tagline: "Developer dashboard + workspace hub.",
        description:
            "A personal dev hub to track projects, notes, and systems. Designed for clarity and momentum.",
        status: "hold",
        tech: ["React", "TypeScript", "TailwindCSS", "Node"],
        images: ["devmesa1.png", "devmesa2.png"],
    },
    {
        id: "handled",
        slug: "handled",
        name: "Handled",
        tagline: "Missed-call automation + AI follow-ups for service businesses.",
        description:
            "Handled is a B2B SaaS that helps local service companies (HVAC, plumbing, electrical) capture more leads by automatically responding to missed calls and triggering SMS/AI follow-ups.",
        status: "development",
        tech: ["Next.js", "React", "TypeScript", "Supabase", "Twilio", "Stripe", "TailwindCSS", "shadcn/ui"],
        images: ["handled/overview.png", "handled/dashboard.png", "handled/inbox.png"],
        learnUrl: "https://github.com/jayrice/handledapp",
        featured: true,
    },
    {
        id: "history-love",
        slug: "history-love",
        name: "History.love",
        variant: "phone",
        tagline: "An AI-powered relationship history and insights app.",
        description:
            "History.love is a personal relationship assistant that helps users capture memories, track relationship moments, and generate meaningful insights with AI.",
        status: "development",
        tech: ["React", "TypeScript", "TailwindCSS", "shadcn/ui", "Supabase"],
        images: ["history-love/timeline.png", "history-love/insights.png", "history-love/prompts.png"],
        learnUrl: "https://github.com/jayrice/history.love",
        featured: false,
    },
    {
        id: "service-business-dynamic-site",
        slug: "service-business-dynamic-site",
        name: "Dynamic Service Business Website System",
        tagline: "A high-converting website template that instantly rebrands for any local trade.",
        description:
            "A reusable, conversion-focused website system built for local service businesses that can dynamically switch branding, colors, services, reviews, and CTAs from a single config.",
        status: "live",
        tech: ["React", "TypeScript", "TailwindCSS", "shadcn/ui"],
        images: ["service-site/home.png", "service-site/services.png", "service-site/reviews.png"],
        liveUrl: "https://demo.jaydenrice.dev/demo/crowe-heating-air-15vna4",
        learnUrl: "https://github.com/jayrice/hvac-demo",
        featured: true,
    },
]