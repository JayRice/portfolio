

type Props = {

    className?: string
};

export default function Form({className=""}: Props) {



    return (<form action="https://formspree.io/f/mjkwjnzq"
                  method="POST"
                  className={"min-xl:w-[50vw] w-[75vw] h-full  flex flex-col gap-4 py-8  " + className}>

            <input  placeholder="Name" name="Name" className={"p-2 w-full h-[50px] border-2 border-project-light bg-project"}/>
            <input placeholder="Email" name={"Email"} type={"email"} className={"p-2 w-full h-[50px] border-2 border-project-light bg-project"}/>
            <textarea placeholder={"Message"} name={"Message"} className={"p-2 border-2 border-project-light min-h-[20vh] bg-project"}></textarea>
            <button type={"submit"} className={"hover:brightness-90 bg-project h-10 border-1  rounded-md cursor-pointer"} >Submit</button>
        </form> )
}
