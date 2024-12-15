'use client'

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import classes from './body.module.css';
import NewsList from './newsList/newsList';
import Notes from './notes/notes';
import Loader from '../common/Loader/loader';
import Message from '../common/Message/message';
import Header from '../header/header';
import Associate from '../Associates/associate';

export default function Body() {

    const [news, setNews] = useState([]);
    const [allNews, setAllNews] = useState([]);
    const [newsCategory, setNewsCategory] = useState([]);
    const [loader, setLoader] = useState(false);
    const [message, setMessage] = useState(false);
    const [messageData, setMessageData] = useState({});

    const searchParams = useSearchParams()
    const paraCategory = searchParams.get('category');

    function formatCategoryData(news, category) {
        setNewsCategory(category);
        setAllNews(news)
        const categoryArray = ['business', 'politics', 'sports', 'technology', 'world', 'market']
        if(category && categoryArray.includes(category)) {
            const filterData = news.filter((eachNews) => eachNews.category.toLowerCase() === category);
            setNews(filterData)
        } else{
            setNews(news)
        }
    }

    // fetching Data from Postgress SQL Database
    async function fetchNewsData() {
        setLoader(true)

        try{
            const response = await fetch( `/api/fetchAll`, { next: { tags: ['newsdata'] } } );
            // const response = await fetch( `/api/fetchAll`, { next: { revalidate: 2 } } );
            // const response = await fetch( `/api/fetchAll`, { cache: 'no-store' } );
            // const response = await fetch( `/api/fetchAll`, { cache: 'force-cache'} );
            // const response = await fetch( `/api/fetchAll`);

            if(response.ok) {
                const res = await response.json();
                // setNews(res)
                formatCategoryData(res, paraCategory)
                setLoader(false)
            }
        }catch(error) {
            console.log(error);
            setLoader(false);
        }
    }

    // fetching Data from trending topics
    async function fetchTrendingData() {
        setLoader(true)

        try{
            const response = await fetch( `/api/fetchTrending`, { cache: 'no-store' } );

            if(response.ok) {
                const res = await response.json();
                formatCategoryData(res, paraCategory)
                setLoader(false)
            }
        }catch(error) {
            console.log(error);
            setLoader(false);
        }
    }

    useEffect(() => {
        // fetchNewsData();
        fetchTrendingData();
    }, [paraCategory])


    if(loader){
        return <Loader />
    }

    return(
        <>
            <Header setNews={setNews} allNews={allNews} />

            <div className={classes.container}> 
                <Notes />
                <div className={classes.associateComponent}> <Associate /> </div>
                <NewsList newsData={news} setNews={setNews} setMessage={setMessage} setMessageData={setMessageData} />

                { message && <Message type={messageData.type} message={messageData.message} onClose={() => setMessage(false)}/>}

            </div>
        </>
    )
}