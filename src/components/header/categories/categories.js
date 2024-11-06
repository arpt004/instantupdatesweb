'use client'

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import classes from './categories.module.css';
import { categories } from '@/data/allCategories';

export default function Categories() {

    const searchParams = useSearchParams()
    const queryParams = searchParams.get('category'); 
    
    return(
        <div className={classes.container}> 
            <ul className={classes.unordered_list}>
                { categories.map( (category) => {
                    return(
                        <li key={category}> 
                            <Link href={'?category='+category} 
                                className={category.toLowerCase()===queryParams ? classes.link+' '+classes.blue: classes.link} 
                                > 
                                {category.toUpperCase()} 
                            </Link> 
                        </li>
                    )
                  })
                }
                <li> <Link href='/jains-kart' className={classes.link}> Jain Shop </Link> </li>
            </ul>
        </div>
    )
}