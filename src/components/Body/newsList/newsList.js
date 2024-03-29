import News from './news/news';
import classes from './newsList.module.css';


export default function NewsList({newsData, setNews}) {
    return(
        <div className={classes.container}> 
            { newsData.map(news => <News news={news} setNews={setNews} key={news.id}/> )}
        </div>
    )
}