import Link from 'next/link';
import classes from './categories.module.css';
import { categories } from '@/data/allCategories';

export default function Categories() {
    return(
        <div className={classes.container}> 
            <ul className={classes.unordered_list}>
                { categories.map( (category) => {
                    return(
                        <li> <Link href={'?category='+category}> {category.toUpperCase()} </Link> </li>
                    )
                  })
                }
            </ul>
        </div>
    )
}