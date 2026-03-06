import { motion } from "framer-motion"
import type { ProjectData } from "../../data/projects"
import { Card, CardContent } from "../../Components/ui/card"
import { Badge } from "../../Components/ui/badge"
import { TechBadge } from "../TechBadge.tsx"

function statusBadge(status: ProjectData["status"]) {
    switch (status) {
        case "live":
            return <Badge>Live</Badge>
        case "development":
            return <Badge variant="secondary">In Dev</Badge>
        case "hold":
            return <Badge variant="outline">On Hold</Badge>
    }
}

export default function ProjectCard({
                                        project,
                                        onOpen,
                                    }: {
    project: ProjectData
    onOpen: () => void
}) {
    const cover = project.images?.[0]
    const isPhone = project.variant === "phone"

    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 16, scale: 0.98 },
                show: { opacity: 1, y: 0, scale: 1 },
            }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className={isPhone ? "flex justify-center mx-auto w-full max-w-[320px]" : "w-full"}
        >
            {isPhone ? (
                <div className="w-full rounded-[2.25rem] border bg-project border-white/10 p-3 shadow-2xl backdrop-blur">
                    <div className="mx-auto mb-3 h-5 w-24 rounded-full bg-muted/60" />

                    <Card
                        onClick={onOpen}
                        className="group cursor-pointer overflow-hidden rounded-[1.75rem] bg-background/60 backdrop-blur border border-white/10 transition-transform duration-300 active:scale-[0.99]"
                    >
                        <div className="relative h-80  w-full overflow-hidden">
                            {cover ? (
                                <img
                                    src={"/images/projects/" + cover}
                                    alt={project.name}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    loading="lazy"
                                />
                            ) : (
                                <div className="h-full w-full bg-muted" />
                            )}
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                            <div className="absolute left-3 top-3">{statusBadge(project.status)}</div>
                        </div>

                        <CardContent className="p-4 text-left">
                            <h3 className="truncate text-lg font-semibold">{project.name}</h3>
                            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{project.tagline}</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                {project.tech.slice(0, 3).map((t) => <TechBadge key={t} tech={t} />)}
                                {project.tech.length > 3 && (
                                    <Badge variant="outline" className="font-normal">+{project.tech.length - 3}</Badge>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    <div className="mx-auto mt-3 h-1.5 w-28 rounded-full bg-muted/60" />
                </div>
            ) : (
                <Card
                    onClick={onOpen}
                    className="group cursor-pointer overflow-hidden rounded-2xl bg-project border border-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl h-full flex flex-col"
                >
                    {/* Image — always fills, never empty space */}
                    <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/9" }}>
                        {cover ? (
                            <img
                                src={"/images/projects/" + cover}
                                alt={project.name}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                loading="lazy"
                            />
                        ) : (
                            <div className="h-full w-full bg-muted flex items-center justify-center text-muted-foreground text-sm">
                                No preview
                            </div>
                        )}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                        <div className="absolute left-3 top-3 flex gap-2">
                            {project.featured && (
                                <span className="rounded-md bg-prim px-2 py-0.5 text-xs font-medium text-white">Featured</span>
                            )}
                            <div className="rounded-md bg-project">{statusBadge(project.status)}</div>
                        </div>
                        <div className="pointer-events-none absolute -left-1/2 top-0 h-full w-1/2 rotate-12 bg-white/10 blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </div>

                    {/* Content — grows to fill remaining space */}
                    <CardContent className="flex flex-col flex-1 gap-3 p-4 text-left">
                        <div>
                            <h3 className="text-lg font-semibold leading-snug">{project.name}</h3>
                            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{project.tagline}</p>
                        </div>
                        <div className="mt-auto flex flex-wrap gap-2">
                            {project.tech.slice(0, 4).map((t) => <TechBadge key={t} tech={t} />)}
                            {project.tech.length > 4 && (
                                <Badge variant="outline" className="font-normal">+{project.tech.length - 4}</Badge>
                            )}
                        </div>
                    </CardContent>
                </Card>
            )}
        </motion.div>
    )
}