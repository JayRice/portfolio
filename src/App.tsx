import { useState } from 'react'
import {ChevronDown} from 'lucide-react'

import './App.css'
import DotAnimation from './Components/dot_animation.tsx'
import SkillBlock from "./Components/skill_block.tsx";
import Project from "./Components/project.tsx";
import Form from "./Components/form.tsx";
import './index.css'

function App() {

    function sendToUrl(url: string){
        window.location.href = url;
    }
    function scrollToSection(id: string) {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    }
  return (
      <div className={"bg-background"}>

          <DotAnimation id="fixed-canvas" mode={"uninteractive"} className={"absolute z-[-1] w-full h-full"} count={50}  velocity={.5}  />
          <DotAnimation  mode={"interactive"} className={"z-10 bg-background w-full h-full"} count={400}  velocity={.1} stopDistance={125} mouseFadeDistanceParticle={1500} mouseFadeDistanceLine={1200}  />

        <div className={"flex gap-6 flex-col relative w-[100vw] h-[100vh] justify-center items-center z-20 "}>
          <h1 className={"text-6xl animate-fade-left max-sm:text-3xl "}>Hello, I'm <span className={"text-prim "}>Jayden</span></h1>
            <h2 className={"text-6xl animate-fade-right animate-delay-[1s]  max-sm:text-2xl"}>An AI Enchanced web developer.</h2>
            <button className={"flex cursor-pointer items-center gap-2 border-2  max-sm:text-xl animate-fade-up border-prim p-4 text-2xl mt-4 hover:bg-prim animate-delay-[2s]"} onClick={() => {
                scrollToSection("about")
            }}> View my work <ChevronDown className={"w-8 h-8"}/> </button>
        </div>
          <nav className={"max-lg:justify-center max-sm:p-10 max-sm:text-xl sticky top-0 bg-navbar shadow-2xl text-2xl items-center gap-10 bg-background-400  flex flex-row justify-end bg-prim-500 h-20 z-30 min-lg:pr-40"}>
              <a onClick={() => {scrollToSection("about")}} className={"hover:text-prim"}>About me</a>
              <a onClick={() => {scrollToSection("projects")}} className={"hover:text-prim"}>Projects</a>
              <a onClick={() => {scrollToSection("contact")}}  className={"hover:text-prim"}>Contact me</a>

          </nav>

          <div className={"z-30  w-full h-full"}>



              <div id="about" className={"relative w-full h-full inline-block flex-row justify-center mt-4 text-center p-20  "}>
                  <h1 className={"relative text-6xl border-t-2 border-t-sec inline"}> About me </h1>

                  <div className={"flex flex-row justify-center gap-10 h-[100%] w-[100%] max-md:flex-col max-md:items-center"}>

                      <div className={"flex justify-around items-center flex-col-reverse basis-1/2 max-w-1/2 grow-0 shrink-0 h-[100%] w-[100%] text-left"}>

                          <p className={"relative basis-1/2 shrink-0 grow-0 lg:text-3xl md:text-xl text-xl  font-light bottom-[3%] "}>
                              I've been coding since I was 10, and the ability to bring ideas to life through code has always inspired me. Now at 18, I'm fully committed to Web and App development, building fast, responsive experiences from the ground up.
                              I use modern AI coding tools like Bolt.new to accelerate my workflow and explore creative solutions faster—while making sure I understand and refine every line. Join me on the journey to craft the next generation of web experiences.
                          </p>
                          <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              stroke="url(#grad1)"
                              fill="none"
                              strokeWidth="2"
                              className="basis-1/2 shrink-0 grow-0 mt-10 min-lg:w-[60%] min-lg:h-[40%] min-md:w-[40%] min-md:h-[40%] min-sm:h-[100%] min-sm:w-[100%] "
                          >
                              <defs>
                                  <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                                      <stop offset="0%" stopColor="#74ABFF" />
                                      <stop offset="100%" stopColor="#FF5078" />
                                  </linearGradient>
                              </defs>
                              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4S8 5.79 8 8s1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                          </svg>
                      </div>

                      <div className={"flex justify-center items-center flex-row basis-1/2 max-w-1/2 grow-0 shrink-0 p-[10%]"}>
                          <div className={"flex flex-col"}>
                              <SkillBlock imgSource={"./images/typescript.png"} className={"hover:scale-125"} name={"Typescript"}/>
                              <SkillBlock imgSource={"./images/react.png"} className={"hover:scale-125"} name={"React"}/>
                              <SkillBlock imgSource={"./images/firebase.png"} className={"hover:scale-125"} name={"Firebase"}/>
                          </div>
                          <div className={"flex flex-col"}>
                              <SkillBlock imgSource={"./images/html.png"} className={"hover:scale-125"}  name={"HTML"}/>
                              <SkillBlock imgSource={"./images/css.png"} className={"hover:scale-125"} name={"CSS"}/>
                              <SkillBlock imgSource={"./images/javascript.png"} className={"hover:scale-125"} name={"Javascript"}/>
                              <SkillBlock imgSource={"./images/git.png"} className={"hover:scale-125"} name={"Git"}/>
                          </div>
                          <div className={"flex flex-col"}>
                              <SkillBlock imgSource={"./images/mongodb.png"} className={"hover:scale-125"} name={"MongoDB"}/>
                              <SkillBlock imgSource={"./images/nextjs.png"} className={"hover:scale-125"} name={"Next.js"}/>
                              <SkillBlock imgSource={"./images/nodejs.png"} className={"hover:scale-125"} name={"Node.js"}/>
                          </div>
                      </div>



                  </div>






              </div>



          <div id="projects" className={"relative w-full h-full inline-block flex-row justify-center mt-4 text-center p-20 "}>
              <h1 className={"relative text-6xl border-t-2 border-t-sec inline"}>  Projects </h1>

              <div className={"w-full h-full"}>
                  <Project name={"PwnPrep"} imgSources={["./images/projects/pwnprep1", "./images/projects/pwnprep2", "./images/projects/pwnprep3"]} learnUrl={""} liveURL={""} status={"development"} className={"mt-20"}/>
                  <Project name={"DevMesa"} imgSources={["./images/projects/devmesa1", "./images/projects/devmesa2"]} learnUrl={""} liveURL={""} status={"hold"} className={"mt-20"}/>

              </div>

          </div>

          <div id="contact" className={"relative w-full h-full inline-block flex-row justify-center text-center  mt-20   "}>
              <h1 className={"relative text-6xl border-t-2 border-t-sec inline"}>  Contact me </h1>
              <div className={"flex justify-center w-100vw h-full "}>
                  <Form className={"max-lg:w-full "}></Form>
              </div>

          </div>

           <footer className={"w-100vw h-full bg-project z-50 flex flex-col justify-center gap-4 p-2"}>
               <div className={"flex flex-row justify-center gap-6 z-50"}>
                   <img className={"rounded-full w-10 h-10 cursor-pointer"} alt={"Linkldn"} src={"./images/icons/linkedin.png"} onClick={() => sendToUrl("https://www.linkedin.com/in/jaydenrice/")}></img>
                   <img className={"rounded-full w-10 h-10 cursor-pointer"} alt={"Instagram"} src={"./images/icons/instagram.png"} onClick={() => sendToUrl("https://www.instagram.com/jjrice_17")}></img>
                   <img className={"rounded-full w-10 h-10 cursor-pointer"} alt={"Youtube"} src={"./images/icons/youtube.png"} onClick={() => sendToUrl("https://www.youtube.com/@prodijay7058")}></img>
                   <a href="mailto:ricejjayden@gmail.com">
                    <img className={"rounded-full w-10 h-10 cursor-pointer"} alt={"Email"} src={"./images/icons/email.png"}></img>
                   </a>
               </div>
               <p className={"capitalize"}>©JAYDEN RICE</p>
           </footer>

          </div>
      </div>
  )
}

export default App
