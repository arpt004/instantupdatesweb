import News from './news/news';
import classes from './newsList.module.css';


export default function NewsList({newsData, setNews, setMessage, setMessageData}) {
    return(
        <div className={classes.container}> 
            { 
                newsData.map(news => <News news={news} setNews={setNews} setMessage={setMessage} 
                    setMessageData={setMessageData} key={news.id}/> )
            }
        </div>
    )
}