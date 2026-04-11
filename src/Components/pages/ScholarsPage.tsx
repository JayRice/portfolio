/*
 * PDF assets for this page:
 * - Put PDF files inside: public/pdfs
 * - Link to them using paths like: /pdfs/your-file-name.pdf
 */

import type { ReactNode } from "react"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { setScholarsVisited } from "../../lib/scholarsVisited.ts"
import DotAnimation from "../dot_animation.tsx"
import "../../App.css"

const REFLECTION_HNRS_210: readonly string[] = [
  "HNRS 210 changed how I think about learning in a more structured and evidence-based way. Before that class, I mostly approached problems by trying things until something worked, especially in coding. That works sometimes, but the scientific inquiry process showed me how much more effective it is to slow down, form a clear question, and test ideas intentionally. It pushed me to think about why something works, not just whether it works. That shift made me more patient and more precise when solving problems.",
  "This way of thinking has carried over directly into how I build applications. When something breaks in a system, I am less likely to randomly change things and more likely to isolate the issue and test specific possibilities. It also made me more aware of how small assumptions can affect results, both in experiments and in code. Overall, the class helped me move from a trial-and-error mindset to a more methodical approach, which has improved both my academic work and my projects outside of school.",
]

const REFLECTION_HNRS_201: readonly string[] = [
  "HNRS 201 helped me develop a deeper level of thinking when it comes to reading and writing. Working with texts like Paradise Lost forced me to slow down and actually analyze what I was reading instead of just trying to understand the surface meaning. I started to pay more attention to themes like pride, ambition, and human behavior, and how those ideas connect to real life. Writing about those concepts made me realize that there is often more than one valid interpretation, and that strong writing comes from being able to support your perspective clearly.",
  "The formal essay process also improved how I organize my thoughts. Instead of just putting ideas down, I had to structure them in a way that made sense and built toward a clear point. That skill has been useful outside of that class as well, especially when explaining technical ideas or presenting my own projects. Overall, the class helped me become more intentional in both how I think and how I communicate.",
]

const REFLECTION_HNRS_202: readonly string[] = [
  "In HNRS 202, I have continued to build on the writing and thinking skills I started developing earlier, but with more independence. I feel like I am less focused on just meeting the requirements of an assignment and more focused on actually expressing my ideas clearly. I have also become more comfortable taking a position and backing it up, rather than trying to write what I think is expected.",
  "This class has also made me more aware of my own writing process. I have learned that my best work comes when I take time to revise and rethink what I am saying, instead of trying to get everything right on the first attempt. That connects back to the patience I have been working on in other areas of my life. Overall, HNRS 202 feels like a continuation of my growth, where I am starting to develop more confidence in my voice and how I communicate my ideas.",
]

const REFLECTION_FINAL_ESSAY: readonly string[] = [
  "I started college seeing education as a checklist focused on getting a job, but over time my perspective shifted. I now view education as something that goes beyond practical use, helping shape how I think, approach problems, and grow as a person.",
]

type ScholarsSectionProps = {
  id?: string
  children: ReactNode
}

function ScholarsSection({ id, children }: ScholarsSectionProps) {
  return (
    <section id={id} className="relative w-full py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-6">{children}</div>
    </section>
  )
}

type PdfLinkButtonProps = {
  href: string
  label: string
}

function PdfLinkButton({ href, label }: PdfLinkButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex cursor-pointer items-center justify-center gap-2 border-2 border-prim px-5 py-2.5 text-base font-medium text-white transition-colors hover:bg-prim hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-prim"
    >
      {label}
    </a>
  )
}

type HomePointerCardProps = {
  title: string
  description: string
  buttonText: string
}

function HomePointerCard({ title, description, buttonText }: HomePointerCardProps) {
  return (
    <div className="rounded-lg border border-white/10 bg-background/40 p-6 text-left backdrop-blur-sm">
      <h3 className="mb-2 text-xl font-semibold text-white">{title}</h3>
      <p className="mb-5 text-sm font-light text-white/70 md:text-base">{description}</p>
      <Link
        to="/"
        className="inline-flex cursor-pointer items-center gap-2 border-2 border-prim px-5 py-2.5 text-base font-medium transition-colors hover:bg-prim"
      >
        {buttonText}
      </Link>
    </div>
  )
}

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="relative mb-8 inline-block border-t-2 border-t-sec pt-2 text-3xl font-semibold tracking-tight text-white md:text-4xl">
      {children}
    </h2>
  )
}

function ReflectionProse({ paragraphs }: { paragraphs: readonly string[] }) {
  return (
    <div className="mt-6 rounded-md border border-white/15 bg-white/[0.03] p-4 text-left md:p-5">
      <div className="space-y-3 md:space-y-3.5">
        {paragraphs.map((text, i) => (
          <p
            key={i}
            className="text-xs font-light leading-relaxed text-white/75 sm:text-sm md:text-[0.9375rem] md:leading-[1.65] md:text-white/80"
          >
            {text}
          </p>
        ))}
      </div>
    </div>
  )
}

export default function ScholarsPage() {
  useEffect(() => {
    setScholarsVisited()
  }, [])

  return (
    <div className="bg-background min-h-screen text-center">
      <DotAnimation
        id="fixed-canvas"
        mode="uninteractive"
        className="absolute z-[-1] w-full h-full"
      />
      <DotAnimation
        mode="interactive"
        className="z-10 absolute bg-background w-full h-full"
        stopDistance={125}
        mouseFadeDistanceParticle={1500}
        mouseFadeDistanceLine={1200}
      />

      <nav className="sticky top-0 z-30 backdrop-blur-md bg-background/70 border-b border-white/10">
        <div className="max-w-6xl mx-auto flex h-16 items-center justify-between px-6 text-base font-medium md:h-20">
          <span className="text-white/90 max-sm:text-sm">Scholars portfolio</span>
          <Link
            to="/"
            className="cursor-pointer border-2 border-prim px-4 py-2 text-sm transition-colors hover:bg-prim md:px-5 md:text-base"
          >
            Home
          </Link>
        </div>
      </nav>

      <div className="relative z-20 flex min-h-[42vh] flex-col items-center justify-center gap-5 px-6 pb-16 pt-12 md:min-h-[38vh] md:gap-6 md:pb-20 md:pt-16">
        <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-white md:text-5xl">
          University <span className="text-prim">Scholars</span> Portfolio
        </h1>
        <p className="max-w-xl text-base font-light text-white/80 md:text-lg">
          Selected coursework, writing samples, and portfolio artifacts for the Scholars program.
        </p>
        <Link
          to="/"
          className="mt-2 inline-flex cursor-pointer items-center gap-2 border-2 border-prim px-6 py-3 text-lg transition-colors hover:bg-prim md:text-xl"
        >
          Back to portfolio home
        </Link>
      </div>

      <div className="relative z-20 w-full pb-24">
        <ScholarsSection>
          <div className="grid gap-6 md:grid-cols-3">
            <HomePointerCard
              title="About Me"
              description="Updated statement and introduction, hosted on the main site."
              buttonText="View About Me"
            />
            <HomePointerCard
              title="Second-year goals"
              description="Goals and reasons are on the main portfolio page."
              buttonText="View Goals"
            />
            <HomePointerCard
              title="Resume"
              description="Current resume, available on the main portfolio page."
              buttonText="View Resume"
            />
          </div>
        </ScholarsSection>

        <ScholarsSection id="hnrs-210">
          <SectionHeading>HNRS 210 Writings</SectionHeading>
          <div className="rounded-lg border border-white/10 bg-background/40 p-6 text-left backdrop-blur-sm md:p-8">
            <p className="mb-6 text-sm font-light text-white/75 md:text-base">
              Selected writing examples from HNRS 210.
            </p>
            <div className="flex flex-wrap gap-4">
              <PdfLinkButton href="/pdfs/hnrs-210-writing-1.pdf" label="View Writing Sample 1" />
              <PdfLinkButton href="/pdfs/hnrs-210-writing-2.pdf" label="View Writing Sample 2" />
            </div>
            <ReflectionProse paragraphs={REFLECTION_HNRS_210} />
          </div>
        </ScholarsSection>

        <ScholarsSection id="hnrs-201">
          <SectionHeading>HNRS 201 Formal Essay</SectionHeading>
          <div className="rounded-lg border border-white/10 bg-background/40 p-6 text-left backdrop-blur-sm md:p-8">
            <div className="flex flex-wrap gap-4">
              <PdfLinkButton href="/pdfs/hnrs-201-formal-essay.pdf" label="View Formal Essay" />
            </div>
            <ReflectionProse paragraphs={REFLECTION_HNRS_201} />
          </div>
        </ScholarsSection>

        <ScholarsSection id="hnrs-202">
          <SectionHeading>HNRS 202 Writing Sample</SectionHeading>
          <div className="rounded-lg border border-white/10 bg-background/40 p-6 text-left backdrop-blur-sm md:p-8">
            <div className="flex flex-wrap gap-4">
              <PdfLinkButton href="/pdfs/hnrs-202-writing-sample-1.pdf" label="View Writing Sample 1" />
              <PdfLinkButton href="/pdfs/hnrs-202-writing-sample-2.pdf" label="View Writing Sample 2" />
            </div>
            <ReflectionProse paragraphs={REFLECTION_HNRS_202} />
          </div>
        </ScholarsSection>

        <ScholarsSection id="final-essay">
          <SectionHeading>Final Reflective Essay</SectionHeading>
          <div className="rounded-lg border border-white/10 bg-background/40 p-6 text-left backdrop-blur-sm md:p-8">
            <div className="flex flex-wrap gap-4">
              <PdfLinkButton href="/pdfs/final-reflective-essay.pdf" label="View Final Reflective Essay" />
            </div>
            <ReflectionProse paragraphs={REFLECTION_FINAL_ESSAY} />
          </div>
        </ScholarsSection>
      </div>
    </div>
  )
}
