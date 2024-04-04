import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

import classes from './notes.module.css';
import Image from 'next/image';

const quotes = [
    "Stay informed, stay ahead. Get your Instant Updates! 📰✨",
    "Breaking news at your fingertips with Instant Updates. 📲🔔",
    "Where news breaks first – Instant Updates delivers! 🌐🗞️",
    "our daily dose of headlines, served instantly by Instant Updates. 📆",
    "Because news waits for no one – choose Instant Updates. 🕰️📡",
]

export default function Notes() {

    return(
        <div className={classes.container}> 
            {/* <marquee direction="left" >
                <h2 > Breaking news at your fingertips with Instant Updates. </h2>
            </marquee> */}

            <Carousel showThumbs={false} autoPlay>
                {quotes.map((quote, index) => {
                    return(
                        <div key={quote} className={classes.carousel} 
                            style={{backgroundImage: `url(/images/quotes/q${index+1}.jpg)`}} >
                            <h2 className={classes.notestext}>{quote}</h2>
                        </div>
                    )
                })}         
            </Carousel>




        </div>
    )
}