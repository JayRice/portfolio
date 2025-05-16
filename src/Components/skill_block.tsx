import { useEffect, useRef, useState } from 'react';



type Props = {
    imgSource: string,
    name: string,
    className?: string
};

export default function SkillBlock({ imgSource, name, className="" }: Props) {
   return (
       <div className={"w-full h-full flex flex-col  justify-center items-center p-4 " + className}>
       <img className={"w-auto h-auto"} src={imgSource}></img>
       <p className={" text-lg mt-4"}>
           {name}
       </p>
   </div>)
}
