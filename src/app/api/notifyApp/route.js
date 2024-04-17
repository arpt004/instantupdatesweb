import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';


async function sendPushNotification(registered_ids) {
  
  // try{
    // const res = await fetch('https://exp.host/--/api/v2/push/send', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     to: pushKey,
    //     title: 'Instant Updates!!',
    //     body: 'Get updated with instant updates!!'
    //   })
    // })

  // const registered_ids = [
  //   "e-rP6gfoShuH-dEu4fXD0R:APA91bHPW5EUA9yHh7rgYkci3OFS4oxgbSTIMUR6jRYfaOBOWWoKxB6BOhpyvuiJW5awsjxTKvo91a4NrgUXu0HbtDczb9uiMTQdzxQFXE-hIpPeZDIVflsSLMhKEwWIxxsXYmbFS0Zt",
  //   "cWfZCsdDSbuRIzGaKwFIqj:APA91bHPAyyq_yC3BCi2sbynOjEoyngA6MhQzSIgFu7hIZGvtNYkqM3xsrTsLEQ7YpADBnZaSkKv14XzYxwJy3rmI18Z3WJjgqpRqDLb8rUajNnEQKVp4z1jP_Auy4FfHowTrW64Co6n",
  // ]

  const fcm_server_key = process.env.SERVER_KEY;

  const data = JSON.stringify({
    "registration_ids": registered_ids,
    "notification": {
      "title": "Instant Updates!!",
      "body": "Get updated with instant updates updated"
    }
  });

  const config = {
    method: 'post',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `key=${fcm_server_key}`
    },
    body : data
  };

  try{
    const response = await fetch('https://fcm.googleapis.com/fcm/send',config)
    if(response.status===200) {
      const res = await response.json()
      console.log(res);
      return true;
    }
    return false;
  }
  catch(error) {
    return false;
  };     
}

export async function POST(request) {
  
  try{

    // ********************* // Fetch query
    const data = await sql`
      SELECT
        pushkey
      FROM pushkeys
    `;

    let pushkeys = []
    if(data && data.rows.length>0) pushkeys = data.rows.map((eachRow) => eachRow.pushkey);
    const response = await sendPushNotification(pushkeys)

    if(response) return NextResponse.json({ "Success": "pushed all notifications" })
    else return NextResponse.json({ "msg": "error in push notification" });

  } catch(error) {
    console.log(error);
    return NextResponse.json({message: 'failed to Notify'});
  }
}