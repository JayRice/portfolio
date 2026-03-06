import { useMemo } from "react";
import { motion } from "framer-motion";
import {type ProjectData, PROJECTS} from "../../data/projects.ts";

import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal.tsx";

export default function ProjectsSection({active, setActive}: {active: ProjectData|null, setActive: React.Dispatch<React.SetStateAction<ProjectData|null>>}) {

    const sorted = useMemo(() => {
        // featured first, then rest
        return [...PROJECTS].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
    }, []);


    const web_apps = sorted.filter((s) => s.variant!="phone")
    const mobile_apps = sorted.filter((s) => s.variant=="phone")


    return (
        <section id="projects" className="relative w-full px-6 sm:px-10 lg:px-20 py-20">
            <div className="mx-auto max-w-6xl text-center">
                <h1 className="inline border-t-2 border-t-sec text-5xl sm:text-6xl">Projects</h1>
                <p className="mt-4 text-muted-foreground">
                    Click a project to see details, screenshots, and links.
                </p>
            </div>

            <motion.div
                className="mx-auto mt-12 grid max-w-6xl w-full grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 items-stretch"                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                variants={{
                    hidden: {},
                    show: { transition: { staggerChildren: 0.08 } },
                }}
            >
                {web_apps.map((p) => (
                    <ProjectCard key={p.id} project={p} onOpen={() => setActive(p)} />
                ))}
            </motion.div>
            <motion.div
                className="mx-auto mt-12 grid max-w-6xl w-full grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 items-stretch"                initial="hidden"
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



            <ProjectModal project={active} onClose={() => setActive(null)} />
        </section>
    );
}