import type { Tech } from "../data/projects"

const TECH_COLORS: Record<Tech, { bg: string; text: string; dot: string }> = {
    "React":       { bg: "bg-cyan-950",    text: "text-cyan-300",   dot: "bg-cyan-400" },
    "Next.js":     { bg: "bg-zinc-800",    text: "text-zinc-200",   dot: "bg-zinc-400" },
    "TypeScript":  { bg: "bg-blue-950",    text: "text-blue-300",   dot: "bg-blue-400" },
    "JavaScript":  { bg: "bg-yellow-950",  text: "text-yellow-300", dot: "bg-yellow-400" },
    "TailwindCSS": { bg: "bg-teal-950",    text: "text-teal-300",   dot: "bg-teal-400" },
    "shadcn/ui":   { bg: "bg-violet-950",  text: "text-violet-300", dot: "bg-violet-400" },
    "Node":        { bg: "bg-green-950",   text: "text-green-300",  dot: "bg-green-400" },
    "Supabase":    { bg: "bg-emerald-950", text: "text-emerald-300",dot: "bg-emerald-400" },
    "Firebase":    { bg: "bg-orange-950",  text: "text-orange-300", dot: "bg-orange-400" },
    "Twilio":      { bg: "bg-red-950",     text: "text-red-300",    dot: "bg-red-400" },
    "Stripe":      { bg: "bg-indigo-950",  text: "text-indigo-300", dot: "bg-indigo-400" },
    "Vite":        { bg: "bg-purple-950",  text: "text-purple-300", dot: "bg-purple-400" },
    "Python":      { bg: "bg-sky-950",     text: "text-sky-300",    dot: "bg-sky-400" },
    "PostgreSQL":  { bg: "bg-blue-950",    text: "text-blue-200",   dot: "bg-blue-300" },
    "Prisma":      { bg: "bg-slate-800",   text: "text-slate-300",  dot: "bg-slate-400" },
    "Docker":      { bg: "bg-blue-950",    text: "text-blue-400",   dot: "bg-blue-500" },
    "AWS":         { bg: "bg-amber-950",   text: "text-amber-300",  dot: "bg-amber-400" },
    "Vercel":      { bg: "bg-zinc-900",    text: "text-zinc-100",   dot: "bg-zinc-300" },
}

export function TechBadge({ tech }: { tech: Tech }) {
    const colors = TECH_COLORS[tech]
    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${colors.bg} ${colors.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
            {tech}
    </span>
    )
}

export function TechBadgeList({ tech }: { tech: Tech[] }) {
    return (
        <div className="flex flex-wrap gap-2">
            {tech.map((t) => (
                <TechBadge key={t} tech={t} />
            ))}
        </div>
    )
}