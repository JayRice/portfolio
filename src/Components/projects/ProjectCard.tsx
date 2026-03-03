import { motion } from "framer-motion";
import type { ProjectData } from "../../data/projects";
import { Card, CardContent } from "../../Components/ui/card";
import { Badge } from "../../Components/ui/badge";

function statusBadge(status: ProjectData["status"]) {
    switch (status) {
        case "live":
            return <Badge>Live</Badge>;
        case "development":
            return <Badge variant="secondary">In Dev</Badge>;
        case "hold":
            return <Badge variant="outline">On Hold</Badge>;
    }
}

export default function ProjectCard({
                                        project,
                                        onOpen,
                                    }: {
    project: ProjectData;
    onOpen: () => void;
}) {
    const cover = project.images?.[0];

    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 16, scale: 0.98 },
                show: { opacity: 1, y: 0, scale: 1 },
            }}
            transition={{ duration: 0.35, ease: "easeOut" }}
        >
            <Card
                onClick={onOpen}
                className={[
                    "group cursor-pointer overflow-hidden rounded-2xl",
                    "bg-background/60 backdrop-blur",
                    "border border-white/10",
                    "transition-transform duration-300",
                    "hover:-translate-y-1 hover:shadow-2xl",
                ].join(" ")}
            >
                <div className="relative h-44 w-full overflow-hidden">
                    {cover ? (
                        <img
                            src={cover}
                            alt={project.name}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                        />
                    ) : (
                        <div className="h-full w-full bg-muted" />
                    )}

                    {/* subtle gradient overlay */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-90" />

                    {/* status top-left */}
                    <div className="absolute left-3 top-3">{statusBadge(project.status)}</div>

                    {/* little “shine” sweep on hover */}
                    <div className="pointer-events-none absolute -left-1/2 top-0 h-full w-1/2 rotate-12 bg-white/10 blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:animate-[shine_1.2s_ease-in-out]" />
                </div>

                <CardContent className="p-5 text-left">
                    <div className="flex items-start justify-between gap-3">
                        <div>
                            <h3 className="text-xl font-semibold">{project.name}</h3>
                            <p className="mt-1 text-sm text-muted-foreground">{project.tagline}</p>
                        </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                        {project.tech.slice(0, 4).map((t) => (
                            <Badge key={t} variant="secondary" className="font-normal">
                                {t}
                            </Badge>
                        ))}
                        {project.tech.length > 4 && (
                            <Badge variant="outline" className="font-normal">
                                +{project.tech.length - 4}
                            </Badge>
                        )}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}