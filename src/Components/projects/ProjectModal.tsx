import { useMemo, useState } from "react";
import type { ProjectData } from "../../data/projects.ts";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../Components/ui/dialog";
import { Button } from "../../Components/ui/button";
import { Badge } from "../../Components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../Components/ui/tabs";

export default function ProjectModal({
                                         project,
                                         onClose,
                                     }: {
    project: ProjectData | null;
    onClose: () => void;
}) {
    const [imgIndex, setImgIndex] = useState(0);

    const images = useMemo(() => project?.images ?? [], [project]);

    // reset image index when project changes
    if (project && imgIndex >= images.length) setImgIndex(0);

    return (
        <Dialog open={!!project} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-3xl rounded-2xl">
                {project && (
                    <>
                        <DialogHeader>
                            <DialogTitle className="text-2xl">{project.name}</DialogTitle>
                            <p className="text-sm text-muted-foreground">{project.tagline}</p>
                        </DialogHeader>

                        <Tabs defaultValue="overview" className="mt-2">
                            <TabsList>
                                <TabsTrigger value="overview">Overview</TabsTrigger>
                                <TabsTrigger value="screens">Screens</TabsTrigger>
                            </TabsList>

                            <TabsContent value="overview" className="mt-4 space-y-4">
                                <p className="leading-relaxed">{project.description}</p>

                                <div className="flex flex-wrap gap-2">
                                    {project.tech.map((t) => (
                                        <Badge key={t} variant="secondary" className="font-normal">
                                            {t}
                                        </Badge>
                                    ))}
                                </div>

                                <div className="flex flex-wrap gap-3 pt-2">
                                    {project.liveUrl && (
                                        <Button asChild>
                                            <a href={project.liveUrl} target="_blank" rel="noreferrer">
                                                Live Site
                                            </a>
                                        </Button>
                                    )}
                                    {project.learnUrl && (
                                        <Button variant="outline" asChild>
                                            <a href={project.learnUrl} target="_blank" rel="noreferrer">
                                                Learn More
                                            </a>
                                        </Button>
                                    )}
                                </div>
                            </TabsContent>

                            <TabsContent value="screens" className="mt-4">
                                {images.length ? (
                                    <div className="space-y-3">
                                        <div className="overflow-hidden rounded-xl border">
                                            <img
                                                src={images[imgIndex]}
                                                alt={`${project.name} screenshot ${imgIndex + 1}`}
                                                className="h-[340px] w-full object-cover"
                                            />
                                        </div>

                                        <div className="flex gap-2 overflow-x-auto pb-2">
                                            {images.map((src, i) => (
                                                <button
                                                    key={src}
                                                    onClick={() => setImgIndex(i)}
                                                    className={[
                                                        "h-16 w-28 shrink-0 overflow-hidden rounded-lg border",
                                                        i === imgIndex ? "ring-2 ring-primary" : "opacity-80 hover:opacity-100",
                                                    ].join(" ")}
                                                >
                                                    <img src={src} className="h-full w-full object-cover" />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-muted-foreground">No screenshots yet.</p>
                                )}
                            </TabsContent>
                        </Tabs>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}