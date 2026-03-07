export function createComingSoonProject(id: string): ProjectData {
    return {
        id,
        slug: `coming-soon-${id}`,
        name: "Coming Soon",
        tagline: "New project in development",
        description:
            "I'm currently working on a new project that will be added here soon. Stay tuned for updates.",
        status: "development",
        tech: [],
        images: [],
        featured: false,
        variant: "desktop",
    }
}