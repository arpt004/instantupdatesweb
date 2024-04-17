'use client'

import Footer from '../footer/footer';
import classes from './main.module.css';
import Body from "../Body/body";
import Header from "../header/header";

export default function Main() {

    async function insert_push_key() {

        try{
            // instantupdates.in/api/insert-push-key
            // Notification Push token for expo in mobile : ExponentPushToken[BHj3CCMmxO2DxISmfM8Kwl]
            // Notification Push token for android studio emulator : ExponentPushToken[25jUfPHtleWIrwD-jWVIXN]
            const deviceData = { pushKey : 'ExponentPushToken[25jUfPHtleWIrwD-jWVIXN]'}
            const responseInsertPushKey = await fetch( `/api/insert-push-key`, 
                {
                    method: 'POST',
                    headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(deviceData),
                },
            );

            if(responseInsertPushKey.ok){
                console.log(responseInsertPushKey)
            }
          }catch(error) {
            console.log(error);
          }
    }

    return(
        <div className={classes.container}> 
            <Header />
            <button onClick={insert_push_key}> insert User </button>
            <Body />
            <Footer />
        </div>
    )
}