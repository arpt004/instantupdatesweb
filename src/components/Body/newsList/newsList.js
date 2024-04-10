import News from './news/news';
import classes from './newsList.module.css';


export default function NewsList({newsData, setNews, setMessage, setMessageData}) {
    return(
        <div className={classes.container}> 
            { newsData.length > 0 ?
                newsData.map(news => <News news={news} setNews={setNews} setMessage={setMessage} 
                    setMessageData={setMessageData} key={news.id}/> )
                :
                <h2> No Record!! </h2>
            }
        </div>
    )
}