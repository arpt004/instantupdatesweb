import Link from 'next/link';
import classes from './centerTitle.module.css';
import Image from 'next/image';

export default function CentreTitle() {
    return(
        <div className={classes.centreTitle}>
            <Link href={'/'}>
                <h2> 
                    <Image src={'/images/IU-logo.png'} alt='Instant updates logo' width={28} height={28}/>
                    {' Instant Updates'} 
                </h2>
            </Link>
        </div>
    )
}