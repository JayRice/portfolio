import { useMemo, useState} from "react";
import type { ProjectData } from "../../data/projects.ts";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../Components/ui/dialog";
import { Button } from "../../Components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../Components/ui/tabs";
import {TechBadge} from "../TechBadge.tsx";

const getEmbedUrl = (url: string) => {
    // Handle youtube.com/watch?v=
    const watchMatch = url.match(/youtube\.com\/watch\?v=([^&]+)/)
    if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`

    // Handle youtu.be short links
    const shortMatch = url.match(/youtu\.be\/([^?]+)/)
    if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`

    // Already an embed or other platform — return as-is
    return url
}
export default function ProjectModal({
                                         project,
                                         onClose,
                                     }: {
    project: ProjectData | null;
    onClose: () => void;
}) {
    const [imgIndex, setImgIndex] = useState(0);
    const [tab, setTab] = useState<string>("");

    const images = useMemo(() => project?.images ?? [], [project]);

    // reset image index when project changes
    if (project && imgIndex >= images.length) setImgIndex(0);

    return (
        <Dialog open={!!project} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-3xl rounded-2xl bg-project">
                {project && (
                    <>
                        <DialogHeader>
                            <DialogTitle className="text-2xl">{project.name}</DialogTitle>
                            <p className="text-sm text-muted-foreground">{project.tagline}</p>
                        </DialogHeader>

                        <Tabs value={tab} onValueChange={(value) => setTab(value)} defaultValue="overview" className="mt-2">
                            <TabsList >
                                <TabsTrigger className={`cursor-pointer  ${tab == "overview" && "border-[1px] border-white"} `} value="overview">Overview</TabsTrigger>
                                <TabsTrigger className={`cursor-pointer ${tab == "screens" && "border-[1px] border-white"}`} value="screens">Screens</TabsTrigger>
                                {project?.videoUrls && <TabsTrigger className={`cursor-pointer ${tab == "videos" && "border-[1px] border-white"}`} value="videos">Videos</TabsTrigger>}

                            </TabsList>

                            <TabsContent value="overview" className={`mt-4 space-y-4  `}>
                                <p className="leading-relaxed">{project.description}</p>

                                <div className="flex flex-wrap gap-2">
                                    {project.tech.map((t) => (
                                        <TechBadge tech={t}/>
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
                                        <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">
                                            <img
                                                src={"/images/projects/" + images[imgIndex]}
                                                alt={`${project.name} screenshot ${imgIndex + 1}`}
                                                className="w-full max-h-[500px] object-contain"
                                            />
                                        </div>

                                        {images.length > 1 && (
                                            <div className="flex gap-2 overflow-x-auto pb-2">
                                                {images.map((src, i) => (
                                                    <button
                                                        key={src}
                                                        onClick={() => setImgIndex(i)}
                                                        className={[
                                                            "h-16 w-28 shrink-0 overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950",
                                                            i === imgIndex ? "ring-2 ring-primary" : "opacity-60 hover:opacity-100",
                                                        ].join(" ")}
                                                    >
                                                        <img src={"/images/projects/" + src} className="h-full w-full object-contain" />
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <p className="text-muted-foreground">No screenshots yet.</p>
                                )}
                            </TabsContent>
                            <TabsContent value="videos" className="mt-4">
                                {project.videoUrls && project.videoUrls.length > 0 ? (
                                    <div className="space-y-6">
                                        <div>
                                            <h2 className="text-2xl font-bold text-white tracking-tight">Videos</h2>
                                            <p className="text-zinc-400 text-sm mt-1">
                                                {project.videoUrls.length === 1
                                                    ? "A video showcasing this project."
                                                    : `${project.videoUrls.length} videos showcasing this project.`}
                                            </p>
                                        </div>

                                        <div
                                            className={
                                                project.videoUrls.length === 1
                                                    ? "max-w-3xl"
                                                    : "grid grid-cols-1 md:grid-cols-2 gap-4"
                                            }
                                        >
                                            {project.videoUrls.map((url: string, index: number) => (
                                                <div
                                                    key={index}
                                                    className="rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-lg"
                                                >
                                                    <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                                                        <iframe
                                                            className="absolute inset-0 w-full h-full"
                                                            src={getEmbedUrl(url)}
                                                            title={`${project.name} video ${index + 1}`}
                                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                            allowFullScreen
                                                        />
                                                    </div>
                                                    {(project?.videoUrls?.length || 0) > 1 && (
                                                        <div className="px-4 py-3 border-t border-zinc-800">
                                                            <p className="text-zinc-400 text-xs">
                                                                Video {index + 1} of {project?.videoUrls?.length}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-20 text-center">
                                        <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center mb-4">
                                            <svg className="w-5 h-5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                                      d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9A2.25 2.25 0 0013.5 5.25h-9A2.25 2.25 0 002.25 8.25v9A2.25 2.25 0 004.5 18.75z" />
                                            </svg>
                                        </div>
                                        <p className="text-zinc-400 text-sm">No videos available for this project.</p>
                                    </div>
                                )}
                            </TabsContent>

                        </Tabs>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}