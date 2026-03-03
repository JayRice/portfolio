export type ProjectStatus = "live" | "development" | "hold";

export type ProjectData = {
    id: string;
    name: string;
    tagline: string;
    description: string;
    status: ProjectStatus;
    tech: string[];
    images: string[]; // paths to your images
    liveUrl?: string;
    learnUrl?: string; // github
    featured?: boolean;
};

export const PROJECTS: ProjectData[] = [
    {
        id: "pwnprep",
        name: "PwnPrep",
        tagline: "OSCP-style practice + prep tooling.",
        description:
            "A focused prep platform for penetration testing workflows. Built for speed, organization, and repeatable practice.",
        status: "development",
        tech: ["React", "TypeScript", "Tailwind", "Node"],
        images: [
            "./images/projects/pwnprep1.png",
            "./images/projects/pwnprep2.png",
            "./images/projects/pwnprep3.png",
        ],
        liveUrl: "https://pwnprep.com",
        learnUrl: "https://github.com/jayrice/pwnprep",
        featured: true,
    },
    {
        id: "devmesa",
        name: "DevMesa",
        tagline: "Developer dashboard + workspace hub.",
        description:
            "A personal dev hub to track projects, notes, and systems. Designed for clarity and momentum.",
        status: "hold",
        tech: ["React", "TypeScript"],
        images: ["./images/projects/devmesa1.png", "./images/projects/devmesa2.png"],
    },
];