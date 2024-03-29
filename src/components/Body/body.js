'use client'

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import classes from './body.module.css';
import NewsList from './newsList/newsList';
import Notes from './notes/notes';

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
    const router = useSearchParams();
    console.log(router.get('category'))

    async function fetchNews() {
        try{
            const response = await fetch( `/api/fetchAll`, { next: { revalidate: 5 } } );
            // const response = await fetch( `/api/fetchAll`, { cache: 'no-store' } );
            console.log(response)
            if(response.ok) {
                const res = await response.json();
                setNews(res)
                console.log(res)
            }
        }catch(error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchNews()
    },[])

    return(
        <div className={classes.container}> 
            <Notes />
            <NewsList newsData={news} setNews={setNews} />
        </div>
    )
}