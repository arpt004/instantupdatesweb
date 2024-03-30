import Link from "next/link";

export default function Page() {
    return(
        <div> 
            <Link href={'/'}> {'<- back'} </Link>
            <h2> home </h2>
        </div>
    )
}