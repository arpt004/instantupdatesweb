import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';


export async function GET(request) { 
  try {
    const tag = request.nextUrl.searchParams.get('tag');
    revalidateTag(tag);
    
    // ********************* // Fetch query
    const data = await sql`
      SELECT id, title, source, source_link, category, image, time, description
      FROM newsdata
      ORDER BY time DESC;
    `;  

    const allNews = data.rows;    
    console.log(data)
    return NextResponse.json(allNews);

  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all news.');
  }
}