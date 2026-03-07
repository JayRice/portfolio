import { useMemo } from "react";
import { motion } from "framer-motion";
import {type ProjectData, PROJECTS} from "../../data/projects.ts";

import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal.tsx";
import {createComingSoonProject} from "../../lib/createComingSoonProject.ts";

export default function ProjectsSection({active, setActive}: {active: ProjectData|null, setActive: React.Dispatch<React.SetStateAction<ProjectData|null>>}) {

    const sorted = useMemo(() => {
        // featured first, then rest
        return [...PROJECTS].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
    }, []);


    const web_apps = sorted.filter((s) => s.variant!="phone")
    const mobile_apps = sorted.filter((s) => s.variant=="phone")

    const paddedProjects = [...web_apps]

    const remainder = paddedProjects.length % 3

    if (remainder !== 0) {
        const needed = 3 - remainder

        for (let i = 0; i < needed; i++) {
            paddedProjects.push(createComingSoonProject(`placeholder-${i}`))
        }
    }


    function onOpen(project: ProjectData) {
        if (project.id.split("-")[0] === "placeholder"){return}

        setActive(project)
    }
    return (
        <section id="projects" className="relative w-full px-6 sm:px-10 lg:px-20 py-20">
            <div className="mx-auto max-w-6xl text-center">
                <h1 className="inline border-t-2 border-t-sec text-5xl sm:text-6xl">Projects</h1>
                <p className="mt-4 text-muted-foreground">
                    Click a project to see details, screenshots, and links.
                </p>
            </div>

            {/* WEB APPS */}
            <div className="mx-auto max-w-6xl mt-16">
                <h2 className="text-3xl font-semibold mb-12">Web Apps</h2>

                <motion.div
                    className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 items-stretch"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={{
                        hidden: {},
                        show: { transition: { staggerChildren: 0.08 } },
                    }}
                >
                    {paddedProjects.map((p) => (
                        <ProjectCard key={p.id} project={p} onOpen={() => onOpen(p)} />
                    ))}
                </motion.div>
            </div>

            {/* MOBILE APPS */}
            <div className="mx-auto max-w-6xl mt-20">
                <h2 className="text-3xl font-semibold mb-12">Mobile Apps</h2>

                <motion.div
                    className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 items-stretch"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={{
                        hidden: {},
                        show: { transition: { staggerChildren: 0.08 } },
                    }}
                >
                    {mobile_apps.map((p) => (
                        <ProjectCard key={p.id} project={p} onOpen={() => setActive(p)} />
                    ))}
                </motion.div>
            </div>

            <ProjectModal project={active} onClose={() => setActive(null)} />
        </section>
    );
}