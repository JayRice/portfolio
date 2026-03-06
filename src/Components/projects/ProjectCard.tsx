import { motion } from "framer-motion"
import type { ProjectData } from "../../data/projects"
import { Card, CardContent } from "../../Components/ui/card"
import { Badge } from "../../Components/ui/badge"
import {TechBadge} from "../TechBadge.tsx";

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
            className={(isPhone ? "flex justify-center mx-auto w-full max-w-[360px]" : undefined)  }
        >
            {/* Phone shell */}
            {isPhone ? (
                <div className={" w-3/4 rounded-[2.25rem] border bg-project border-white/10  p-3 shadow-2xl backdrop-blur"}>
                    {/* Notch / speaker */}
                    <div className="mx-auto mb-3 h-5 w-24 rounded-full bg-muted/60" />

                    <Card
                        onClick={onOpen}
                        className={[
                            "group cursor-pointer overflow-hidden rounded-[1.75rem]",
                            "bg-background/60 backdrop-blur",
                            "border border-white/10",
                            "transition-transform duration-300",
                            "active:scale-[0.99]",
                        ].join(" ")}
                    >
                        <div className="relative h-56 w-full overflow-hidden">
                            {cover ? (
                                <img
                                    src={"/images/projects/"+cover}
                                    alt={project.name}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    loading="lazy"
                                />
                            ) : (
                                <div className="h-full w-full bg-muted" />
                            )}

                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-95" />
                            <div className="absolute left-3 top-3">{statusBadge(project.status)}</div>
                            <div className="pointer-events-none absolute -left-1/2 top-0 h-full w-1/2 rotate-12 bg-white/10 blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:animate-[shine_1.2s_ease-in-out]" />
                        </div>

                        <CardContent className="p-4  text-left">
                            <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                    <h3 className="truncate text-lg font-semibold">{project.name}</h3>
                                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                                        {project.tagline}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-3 flex flex-wrap gap-2">
                                {project.tech.slice(0, 3).map((t) => (
                                    <TechBadge tech={t}/>

                                ))}
                                {project.tech.length > 3 && (
                                    <Badge variant="outline" className="font-normal">
                                        +{project.tech.length - 3}
                                    </Badge>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Home indicator */}
                    <div className="mx-auto mt-3 h-1.5 w-28 rounded-full bg-muted/60" />
                </div>
            ) : (
                // Desktop version (your original)
                <Card
                    onClick={onOpen}
                    className={[
                        "group cursor-pointer overflow-hidden rounded-2xl",
                        "bg-background/60 backdrop-blur",
                        "bg-project border border-white/10",
                        "transition-transform duration-300",
                        "hover:-translate-y-1 hover:shadow-2xl",
                    ].join(" ")}
                >
                    <div className="relative h-44 w-full overflow-hidden">
                        {cover ? (
                            <img
                                src={"/images/projects/"+cover}
                                alt={project.name}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                loading="lazy"
                            />
                        ) : (
                            <div className="h-full w-full bg-muted" />
                        )}

                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-90" />
                        <div className={"absolute left-3 top-3 rounded-lg flex flex-row gap-2"}>
                            {project.featured && <div className=" rounded-lg text-white bg-prim px-1">Featured</div>}
                            <div className="bg-project rounded-lg">{statusBadge(project.status)}</div>

                        </div>
                        <div className="pointer-events-none absolute -left-1/2 top-0 h-full w-1/2 rotate-12 bg-white/10 blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:animate-[shine_1.2s_ease-in-out]" />
                    </div>

                    <CardContent className="my-4 py-4 text-left h-48">
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <h3 className="text-xl font-semibold">{project.name}</h3>
                                <p className="mt-1 text-sm text-muted-foreground">{project.tagline}</p>
                            </div>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2">
                            {project.tech.slice(0, 4).map((t) => (
                                <TechBadge tech={t}/>
                            ))}
                            {project.tech.length > 4 && (
                                <Badge variant="outline" className="font-normal">
                                    +{project.tech.length - 4}
                                </Badge>
                            )}
                        </div>
                    </CardContent>
                </Card>
            )}
        </motion.div>
    )
}