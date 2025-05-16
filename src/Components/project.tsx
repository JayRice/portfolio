import { useEffect, useRef, useState } from 'react';

import {Wrench} from "lucide-react"

type Props = {
    imgSource: string,
    name: string,
    liveURL: string,
    learnUrl: string,
    status: string,
    className?: string
};

export default function Project({ imgSource, name, liveURL, learnUrl, className="" }: Props) {
   return (
       <div className={"w-full h-full block bg-project  mt-4 rounded-t-lg " + className}>
           <div className={"text-center flex flex-row w-full h-[40px] rounded-t-lg bg-project-light items-center"}>
               <div className={"flex flex-row justify-center justify-self-start p-4 gap-2"}>
                   <div className={"bg-red-600 rounded-full w-[10px] h-[10px]"}></div>
                   <div className={"bg-orange-400 rounded-full w-[10px] h-[10px]"}></div>
                   <div className={"bg-green-400 rounded-full w-[10px] h-[10px]"}></div>
               </div>
               <p className={"absolute left-1/2 -translate-x-1/2 text-2xl"}>{name}</p>

           </div>
           <img className={"w-[45vw] h-[70vh]"} src={imgSource} alt={"Coming Soon!"}></img>
           <div className={"flex"}>
               <a href={liveURL}>Live App</a>
               <a href={learnUrl}>Learn More</a>
           </div>

   </div>)
}
