import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json()    

    console.log(body.devicecatalogid)
    // ********************* // Insert query
    const data = await sql`
    Delete from devices Where devicecatalogid = ${body.devicecatalogid}
    `;         
    // ON CONFLICT (id) DO NOTHING;
      
    console.log(data)
    return NextResponse.json(data);

  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to Delete from devices');
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