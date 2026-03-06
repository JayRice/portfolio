

type Props = {
    imgSource: string,
    name: string,
    className?: string
    bordered?: boolean;
};

export default function SkillBlock({ imgSource, name, bordered=false, className="" }: Props) {
   return (
       <div style={{
           animationDelay: `${Math.floor(Math.random() * 1000)}ms`
       }} className={`animate-float w-full h-full flex flex-col  justify-center items-center p-4   ${className}`}>
       <img className={`w-auto h-auto ${bordered && "bg-white rounded-full border-2 border-white"}`} src={imgSource}></img>
       <p className={" text-lg mt-4"}>
           {name}
       </p>
   </div>)
}
