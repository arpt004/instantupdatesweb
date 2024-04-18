import classes from './header.module.css';
import Menubar from './menubar/menubar';
import Categories from './categories/categories';


export default function Header({setNews, allNews}) {
    return(
        <div className={classes.container}> 
            <Menubar setNews={setNews} allNews={allNews} />
            <Categories />
        </div>
    )
}