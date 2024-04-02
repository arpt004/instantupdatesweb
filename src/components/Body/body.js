'use client'

import { useEffect, useState } from 'react';
// import { useSearchParams } from 'next/navigation';

import classes from './body.module.css';
import NewsList from './newsList/newsList';
import Notes from './notes/notes';
import Loader from '../common/Loader/loader';
import Message from '../common/Message/message';

const newsData = [
    {
        'id':1,
        'newsid': 'id1',
        'title':"MEA: PM Modi’s visit to Bhutan postponed due to bad weather",
        'category': '',
        'image':"https://v3ndqtum6cv80yw6.public.blob.vercel-storage.com/Air-India-1-FmipwP0Pr3wvJdifzfMqtxP8h36nOi.png",
        'source':"Hindustan Times",
        'source_link':' ',
        "description":"Prime Minister Narendra Modi’s upcoming Bhutan visit has been postponed due to bad weather conditions, the Ministry of External Affairs said on Wednesday.The PM was scheduled to visit the neighbouring country on March 21-22. “Due to ongoing inclement weather conditions over Paro airport, it has been mutually decided to postpone the State visit of Prime Minister to Bhutan on 21-22 March 2024. New dates are being worked out by the two sides through diplomatic channels,” the MEA’s statement read.",
        "detail_description": `Prime Minister Narendra Modi’s upcoming Bhutan visit has been postponed due to bad weather conditions, the Ministry of External Affairs said on Wednesday.
        The PM was scheduled to visit the neighbouring country on March 21-22.
        “Due to ongoing inclement weather conditions over Paro airport, it has been mutually decided to postpone the State visit of Prime Minister to Bhutan on 21-22 March 2024. New dates are being worked out by the two sides through diplomatic channels,” the MEA’s statement read.`
    },
    {
        'id':2,
        'newsid': 'id2',
        'title':"MEA: PM Modi’s visit to Bhutan postponed due to bad weather",
        'category': '',
        'image':"https://v3ndqtum6cv80yw6.public.blob.vercel-storage.com/Air-India-1-FmipwP0Pr3wvJdifzfMqtxP8h36nOi.png",
        'source':"Times of India",
        'source_link':' ',
        "description":"Prime Minister Narendra Modi’s upcoming Bhutan visit has been postponed due to bad weather conditions, the Ministry of External Affairs said on Wednesday.The PM was scheduled to visit the neighbouring country on March 21-22. “Due to ongoing inclement weather conditions over Paro airport, it has been mutually decided to postpone the State visit of Prime Minister to Bhutan on 21-22 March 2024. New dates are being worked out by the two sides through diplomatic channels,” the MEA’s statement read.",
        "detail_description": `Prime Minister Narendra Modi’s upcoming Bhutan visit has been postponed due to bad weather conditions, the Ministry of External Affairs said on Wednesday.
        The PM was scheduled to visit the neighbouring country on March 21-22.
        “Due to ongoing inclement weather conditions over Paro airport, it has been mutually decided to postpone the State visit of Prime Minister to Bhutan on 21-22 March 2024. New dates are being worked out by the two sides through diplomatic channels,” the MEA’s statement read.`
    },
    {
        'id':3,
        'newsid': 'id3',
        'title':"MEA: PM Modi’s visit to Bhutan postponed due to bad weather",
        'category': '',
        'image':"https://v3ndqtum6cv80yw6.public.blob.vercel-storage.com/samantha-ZBZA20T68Qr8eoBUFqnmm3zULUge2n.png",
        'source':"Times of India",
        'source_link':' ',
        "description":"Prime Minister Narendra Modi’s upcoming Bhutan visit has been postponed due to bad weather conditions, the Ministry of External Affairs said on Wednesday.The PM was scheduled to visit the neighbouring country on March 21-22. “Due to ongoing inclement weather conditions over Paro airport, it has been mutually decided to postpone the State visit of Prime Minister to Bhutan on 21-22 March 2024. New dates are being worked out by the two sides through diplomatic channels,” the MEA’s statement read.",
        "detail_description": `Prime Minister Narendra Modi’s upcoming Bhutan visit has been postponed due to bad weather conditions, the Ministry of External Affairs said on Wednesday.
        The PM was scheduled to visit the neighbouring country on March 21-22.
        “Due to ongoing inclement weather conditions over Paro airport, it has been mutually decided to postpone the State visit of Prime Minister to Bhutan on 21-22 March 2024. New dates are being worked out by the two sides through diplomatic channels,” the MEA’s statement read.`
    },
]

export default function Body() {

    const [news, setNews] = useState([]);
    const [loader, setLoader] = useState(false);
    const [message, setMessage] = useState(false);
    const [messageData, setMessageData] = useState({});

    // const router = useSearchParams();
    // console.log(router.get('newsdata'))


    async function fetchNewsData() {
        setLoader(true)
        // revalidateTag('newsdata');

        try{
            const response = await fetch( `/api/fetchAll`, { next: { tags: ['newsdata'] } } );
            // const response = await fetch( `/api/fetchAll`, { next: { revalidate: 2 } } );
            // const response = await fetch( `/api/fetchAll`, { cache: 'no-store' } );
            // const response = await fetch( `/api/fetchAll`, { cache: 'force-cache'} );
            // const response = await fetch( `/api/fetchAll`);

            console.log(response)
            if(response.ok) {
                const res = await response.json();
                setNews(res)
                setLoader(false)
                console.log(res)
            }
        }catch(error) {
            console.log(error);
            setLoader(false);
        }
    }

    useEffect(() => {
        fetchNewsData()
    },[])


    if(loader){
        return <Loader />
    }

    return(
        <div className={classes.container}> 
            <Notes />
            <NewsList newsData={news} setNews={setNews} setMessage={setMessage} setMessageData={setMessageData} />

            { message && <Message type={messageData.type} message={messageData.message} onClose={() => setMessage(false)}/>}

        </div>
    )
}