import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const getTime = new Date()
    const body = await request.json()    

    // ********************* // Insert query
    const data = await sql`
    INSERT INTO devices (
    devicecatalogid, 
    title, 
    mrp, 
    devicesku, 
    shortdescription, 
    description, 
    images, 
    devicetype, 
    category, 
    inventorystatus, 
    manufacturername, 
    marketplacelistingstate, 
    price, 
    resellerid, 
    startingleaseformattedprice, 
    variants
    ) VALUES (
        ${body.devicecatalogid},
        ${body.title},
        ${body.mrp},
        ${body.devicesku},
        ${body.shortdescription},
        ${body.description},
        ${body.images},
        ${body.devicetype},
        ${body.category},
        ${body.inventorystatus},
        ${body.manufacturername},
        ${body.marketplacelistingstate},
        ${body.price},
        ${body.resellerid},
        ${body.startingleaseformattedprice},
        ${body.variants}
    );

    `;         
    // ON CONFLICT (id) DO NOTHING;
      
    console.log(data)
    return NextResponse.json(data);

  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to Insert in devices database');
  }
}




// CREATE TABLE devices (
//     DeviceCatalogId INT PRIMARY KEY,
//     Title VARCHAR(255),
//     MRP DECIMAL(10, 2),
//     DeviceSKU VARCHAR(255),
//     ShortDescription TEXT,
//     Description TEXT,
//     Images TEXT,
//     DeviceType INT,
//     Category VARCHAR(50),
//     InventoryStatus INT,
//     ManufacturerName VARCHAR(100),
//     MarketPlaceListingState INT,
//     Price VARCHAR(50),
//     ResellerId INT,
//     StartingLeaseFormattedPrice VARCHAR(50),
//     Variants TEXT
// );