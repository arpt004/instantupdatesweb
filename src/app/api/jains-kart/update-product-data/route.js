import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json()    

    // ********************* // Insert query
    const data = await sql`
    UPDATE devices
    SET 
    title = ${body.title},
    mrp = ${body.mrp},
    devicesku = ${body.devicesku},
    shortdescription = ${body.shortdescription},
    description = ${body.description},
    images = ${body.images},
    devicetype = ${body.devicetype},
    category = ${body.category},
    inventorystatus = ${body.inventorystatus},
    manufacturername = ${body.manufacturername},
    marketplacelistingstate = ${body.marketplacelistingstate},
    price = ${body.price},
    resellerid = ${body.resellerid},
    startingleaseformattedprice = ${body.startingleaseformattedprice},
    variants = ${body.variants}
    WHERE 
    devicecatalogid = ${body.devicecatalogid};
    `;         
    // ON CONFLICT (id) DO NOTHING;
      
    console.log(data)
    return NextResponse.json(data);

  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to Insert in devices database');
  }
}