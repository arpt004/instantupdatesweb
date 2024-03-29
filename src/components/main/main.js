import Link from "next/link"; 

import Footer from '../footer/footer';
import classes from './main.module.css';
import Body from "../Body/body";
import Header from "../header/header";


export default function Main() {
    return(
        <div className={classes.container}> 
            <Header />
            <Body />
            <Link href={'/home'}> home </Link>
            <Footer />
        </div>
    )
}