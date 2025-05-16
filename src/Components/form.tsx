

type Props = {

    className?: string
};

export default function Form({className=""}: Props) {



    return (<form action="https://formspree.io/f/mjkwjnzq"
                  method="POST"
                  className={"min-xl:w-[50vw] w-[75vw] h-full  flex flex-col gap-4 p-20  " + className}>

            <input  placeholder="Name" name="Name" className={"w-full h-[50px] border-2 border-project- bg-project"}/>
            <input placeholder="Email" name={"Email"} type={"email"} className={"w-full h-[50px] border-2 border-project-light bg-project"}/>
            <textarea placeholder={"Message"} name={"Message"} className={"border-2 border-project-light min-h-[20vh] bg-project"}></textarea>
            <button type={"submit"} className={"hover:brightness-90 bg-project h-10"} >Submit</button>
        </form> )
}
