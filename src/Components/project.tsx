
import {  useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';

import {Wrench, Settings, Clock} from "lucide-react"

type Props = {
    imgSources: string[],
    name: string,
    liveURL: string,
    learnUrl: string,
    status: "development" | "running" | "hold",
    className?: string
};

export default function Project({ imgSources, name, liveURL, learnUrl, status, className="" }: Props) {

    const [scrollCounter, setScrollCounter] = useState(0);

    console.log(imgSources);
    function capitalize(str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1);

    }
    function handleSendToUrl(url: string, button: string) {
        if(url == ""){
            const nm = capitalize(name)
            if (button == "live"){
                if(status=="development"){
                    toast(`${nm} is still in development. Click 'Learn more' to discover more about this app!`)
                }else if (status == "running"){
                    toast(`${nm} is running but there doesn't seem to be a URL for it right now. Click 'Learn more' to discover more about this app!`)
                } else if(status == "hold"){
                    toast(`${nm} is on a development hold right now. Click 'Learn more' to discover more about this app!`)
                }
            }else if(button == "learn"){
                toast(`Hmmm... There doesn't seem to be github link for this button. Please contact me at the bottom of this page to let me know. Thanks!`)
            }

            return;
        }
        window.location.href = url;
    }
    return (
       <div className={" block bg-project  mt-4 rounded-t-lg " + className}>
           <Toaster position="bottom-right" />
           <div className={"text-center flex flex-row w-full h-[40px] rounded-t-lg bg-project-light items-center"}>

               <div className={"flex flex-row justify-center justify-self-start p-4 gap-2"}>
                   <div className={"bg-red-600 rounded-full w-[10px] h-[10px]"}></div>
                   <div className={"bg-orange-400 rounded-full w-[10px] h-[10px]"}></div>
                   <div className={"bg-green-400 rounded-full w-[10px] h-[10px]"}></div>
               </div>
               <p className={"absolute left-1/2 -translate-x-1/2 text-2xl max-sm:text-md"}>{name}</p>

               {status == "development" ? <p className={"text-prim flex flex-row gap-2 absolute right-[7.5%] translate-x-[7.5%] font-bold max-xl:hidden"}>Status: In development <Wrench  className={" w={2} h={2}"}/></p>
                   : status == "running" ? <p className={"text-green-400 flex flex-row gap-2 absolute right-[7.5%] translate-x-[7.5%] font-bold max-xl:hidden"}>Status: Running <Settings className={" w={2} h={2}"}/></p>
                       : status == "hold" ? <p className={"text-red-600 flex flex-row gap-2 absolute right-[7.5%] translate-x-[7.5%] font-bold max-xl:hidden"}>Status: On Hold <Clock className={" w={2} h={2}"}/> </p>: <></>
               }

           </div>

           <img className={"max-w-full h-auto cursor-pointer"} src={imgSources[scrollCounter] + ".png"} alt={"Coming Soon!"} onClick={() =>setScrollCounter((prev) => {
               if(prev == imgSources.length-1){
                   return 0;
               }
               return prev+1;

           })}>

           </img>
    <div className={"text-center flex flex-row w-full h-[80px] rounded-b-lg bg-project-light items-center justify-around max-sm:h-[60px]"}>

                <button  onClick={() =>handleSendToUrl(liveURL, "live")} className={" w-full h-full text-2xl hover:brightness-90 bg-project  cursor-pointer rounded-bl-lg"}>Live App</button>
               <button  onClick={() =>handleSendToUrl(learnUrl, "learn")} className={"w-full h-full text-2xl hover:brightness-90 bg-project cursor-pointer rounded-br-lg"} >Learn More</button>
           </div>

   </div>)
}
