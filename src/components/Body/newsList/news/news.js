'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import classes from './news.module.css';
import Loader from '@/components/common/Loader/loader';
import { setMessageDetails } from '@/components/utils/utils';
import { valdiateUser } from '@/components/Auth/authGuard';

export default function News({news, setNews, setMessage, setMessageData}) {

    const [loader, setLoader] = useState(false);
    const [authenticate, setAuthenticate] = useState(false);

    useEffect(() => {
        const checkUser = valdiateUser();
        if(checkUser){
            setAuthenticate(true)
        }else{
            setAuthenticate(false)
        }
    })

    async function deleteNews(id) { 
        console.log('handle click')
        console.log(id)
        setLoader(true);
        try{
            const responseDeleteOne = await fetch( `/api/deleteOne`, 
                {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id: id}),
                },
            );
            if(responseDeleteOne.ok){
                setLoader(false);
                setMessageDetails('success', 'Successfully deleted the rows', setMessage, setMessageData);
                setNews(pn => {
                    const removedItem = pn.filter( news => news.id !== id)
                    console.log(removedItem)
                    return removedItem
                })
            }else{
                setLoader(false);
                setMessageDetails('error', 'Failed to Delete the rows', setMessage, setMessageData)
            }
            
        }catch(error) {
            console.log(error);
            setLoader(false);
            setMessageDetails('error', 'Failed to Delete the rows', setMessage, setMessageData)
        }          
    }

    if(loader){
        return <Loader />
    }

    return(
        <div className={classes.container} > 
            {authenticate &&
                <div className={classes.remove}>
                    <button onClick={() => deleteNews(news.id)}> &times; </button>
                </div>
            }
            <div className={classes.imageContainer}>
                <Image  
                    height={1}
                    width={1}   
                    src={news.image}
                    alt={news.title} 
                    className={classes.image}
                    unoptimized
                />
            </div>
            <div className={classes.news}>
                <h3 className={classes.title}> {news.title} </h3>
                <h6> {news.source} </h6>
                <p className={classes.para}> {news.description} </p>
            </div>
        </div>
    )
}