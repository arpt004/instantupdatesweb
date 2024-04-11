import { NextResponse } from 'next/server';

export async function POST(request) {
  
  try{
    const res = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        to: 'ExponentPushToken[BHj3CCMmxO2DxISmfM8Kwl]',
        title: 'Instant Updates!!',
        body: 'Get updated with instant updates!!'
      })
    })

    if(res.ok) {
      const response = await res.json()
      console.log(response)
      return NextResponse.json({message: 'Success'});
    }
    return NextResponse.json({message: 'failed to Notify'});

  } catch(error) {
    console.log(error);
    return NextResponse.json({message: 'failed to Notify'});
  }
}