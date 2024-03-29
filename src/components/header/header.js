import classes from './header.module.css';
import Menubar from './menubar/menubar';
import Categories from './categories/categories';


export default function Header() {
    return(
        <div className={classes.container}> 
            <Menubar />
            <Categories />
        </div>
    )
}