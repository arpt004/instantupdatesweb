import Link from 'next/link';
import classes from './menubar.module.css';
import Input from '@/components/ui/input';
import Button from '@/components/ui/button';
import Image from 'next/image';
import CentreTitle from './CentreTitle';

export default function Menubar() {
    return(
        <div className={classes.container}> 
            <div className={classes.search} >
                <button className={classes.search_btn}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} 
                        stroke="currentColor" className="w-6 h-6" height="20" width="20">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </button>
                <input type='text' placeholder='Enter Text' />
            </div>

            <div className={classes.header}>
                <CentreTitle />
            </div>

            <div className={classes.link}>
                {true && <Link href='/admin-control/single-upload'> <Button text={'Admin Control'}/>  </Link> }
            </div>
        </div>
    )
}