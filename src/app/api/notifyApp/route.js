import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';


async function sendPushNotification(registered_ids, title, text ) {
  
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

  const fcm_server_key = process.env.SERVER_KEY;
  const notifyTitle = title ? title : "Instant Updates!!";
  const notifyText = text ? text : "Get updated with Instant Updates";

  const data = JSON.stringify({
    "registration_ids": registered_ids,
    "notification": {
      "title": notifyTitle,
      "body": notifyText
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
    const body = await request.json()   
    const title = body.title;
    const text = body.text;

    // ********************* // Fetch query
    const data = await sql`
      SELECT
        pushkey
      FROM pushkeys
    `;

    let pushkeys = []
    if(data && data.rows.length>0) pushkeys = data.rows.map((eachRow) => eachRow.pushkey);
    const response = await sendPushNotification(pushkeys, title, text)

    if(response) return NextResponse.json({ "Success": "pushed all notifications" })
    else return NextResponse.json({ "msg": "error in push notification" });

  } catch(error) {
    console.log(error);
    return NextResponse.json({message: 'failed to Notify'});
  }
}