import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request) { 
  try {
    console.log('hit')
    // ********************* // Fetch query
    const data = await sql`
      SELECT * from devices;
    `;  

    const allNews = data.rows;    
    console.log(data)
    return NextResponse.json(allNews);
    // return NextResponse.json({ revalidated: true, data: allNews});
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all news.');
  }
}