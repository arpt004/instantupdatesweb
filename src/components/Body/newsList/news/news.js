'use client'

import Image from 'next/image';
import classes from './news.module.css';

export default function News({news, setNews}) {

    async function deleteNews(id) { 
        console.log('handle click')
        console.log(id)
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
                setNews(pn => {
                    const removedItem = pn.filter( news => news.id !== id)
                    console.log(removedItem)
                    return removedItem
                })
            }
            
        }catch(error) {
            console.log(error)
        }          
    }

    return(
        <div className={classes.container} > 
            {true &&
                <div className={classes.remove}>
                    <button onClick={() => deleteNews(news.id)}> &times; </button>
                </div>
            }
            <div className={classes.imageContainer}>
                <Image  
                    height={1}
                    width={1}   
                    src={news.image}
                    alt="Picture of the author" 
                    className={classes.image}
                />
            </div>
            <div className={classes.news}>
                <h3 className={classes.title}> {news.title} </h3>
                <h6> {news.source} </h6>
                <p> {news.description} </p>
            </div>
        </div>
    )
}