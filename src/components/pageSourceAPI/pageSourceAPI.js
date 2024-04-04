'use client'
import { useEffect, useState } from 'react'
import classes from './pageSourceAPI.module.css'
import UploadHeader from '../ui/uploadHeader/uploadHeader'
import CentreTitle from '../header/menubar/CentreTitle'
import Button from '../ui/button';
import { news_result } from './data';
import Message from '../common/Message/message';
import { setMessageDetails } from '@/components/utils/utils';
import Loader from '../common/Loader/loader'

// const API_KEY = 'a5a7da6ec5a44702a9578e14aedc84b2' // world news api
const API_KEY = 'pub_41376245a92efaa3beab9276bea5939419358';  // newsdata.io

function PageSourceAPI() {

    const [ sourceData, setSourceData ] = useState([]);
    const [loader, setLoader] = useState(false);
    const [message, setMessage] = useState(false);
    const [messageData, setMessageData] = useState({});

    const country = 'india'
    // const url = `https://api.worldnewsapi.com/search-news?api-key=${API_KEY}&text=${country}`  // world news api
    // const url = 'https://newsdata.io/api/1/news?apikey=pub_41376245a92efaa3beab9276bea5939419358&q=india&country=in&language=en&category=politics,sports,technology,top,world' // newsdata.io
    
    useEffect(() => {
        // async function fetchData() {
        //     try{
        //         const response = await fetch(url)
        //         if(response.ok){
        //             const res = await response.json()
        //             console.log(res.data)
        //             // setSourceData(res.data.news)
        //             setSourceData(res.data.results)
        //         }
        //     } catch(error){
        //         console.log(error)
        //     }
        // }

        // fetchData()
        setSourceData(news_result)
    },[])

    async function handleAdd(news) {
        setLoader(true)
        const formData = {
            title: news.title,
            source: news.source_id.toUpperCase(),
            source_link: news.source_url,
            category: news.category[0],
            image: news.image_url,
            description: news.description,
        }
        try{
            const responseInsertOne = await fetch( `/api/insertOne`, 
                    {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData),
                    },
            );
            console.log(responseInsertOne)
            if(responseInsertOne.ok){
                setLoader(false);
                setMessageDetails('success', 'Successfully insert the data', setMessage, setMessageData);
            }else{
                setLoader(false);
                setMessageDetails('error', 'failed to insert the data', setMessage, setMessageData);
            }
        }catch(error){
            setLoader(false);
            setMessageDetails('error', 'failed to insert the data', setMessage, setMessageData);
        }
        
    }
    
    if(loader){
        return <Loader />
    }

  return (
    <div> 
        <CentreTitle />
        <div className={classes.shadow}>
            <div className={classes.container}>
                <UploadHeader uploadType={'excel'}/>
            </div>
        </div>

        <div className={classes.table_container}>
            <table className={classes.table}>
                <thead >
                    <tr>
                        <th className={classes.table_header} > Title </th>
                        <th className={classes.table_header} > Publish Date </th>
                        <th className={classes.table_header} > Author </th>
                        <th className={classes.table_header} > Action </th>
                    </tr>
                </thead>
                <tbody>
                    { sourceData.map(news => {
                        return(
                            <tr key={news.article_id}  >
                                <td className={classes.table_data} > {news.title} </td>
                                <td className={classes.table_data} > {news.pubDate} </td>
                                <td className={classes.table_data} > {news.source_id.toUpperCase()} </td>
                                <td className={classes.table_data} >
                                    {loader ?
                                        <Loader />
                                        :
                                        <Button text={'add'} onClick={() => handleAdd(news)} /> 
                                    }  
                                </td>
                            </tr>  
                        )                                          
                    })}
                </tbody>
            </table>
        </div>

        { message && <Message type={messageData.type} message={messageData.message} onClose={() => setMessage(false)}/>}

    </div>
  )
}

export default PageSourceAPI



{/* <tr key={news.id}> 
<td> {news.title} </td>
<td> {news.publish_date} </td>
<td> {news.author} </td>
<td> <Button title={'add'} onClick={() => handleAdd(news)} /> </td>
</tr>  */}