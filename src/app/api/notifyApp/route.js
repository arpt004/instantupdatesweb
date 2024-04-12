import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';


async function sendPushNotification(pushKey) {
  
  try{
    const res = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        to: pushKey,
        title: 'Instant Updates!!',
        body: 'Get updated with instant updates!!'
      })
    })
    if(res.ok) {
      const response = await res.json()
    }
  }catch(error){
    return NextResponse.json({message: 'failed to Notify'});
  }
}

export async function POST(request) {
  
  try{

    // ********************* // Fetch query
    const data = await sql`
      SELECT
        pushkey
      FROM pushkeys
    `;

    if(data && data.rows.length>0){
      data.rows.forEach( async (eachKey) => {
        await sendPushNotification(eachKey.pushkey)
      });
    }
    return NextResponse.json({message: 'Success'});

  } catch(error) {
    console.log(error);
    return NextResponse.json({message: 'failed to Notify'});
  }
}