import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request) { 
  try {
    const body = await request.json() 
    
    // ********************* // Fetch query
    const data = await sql`
      Delete
      FROM newsdata
      where id=${body.id};
    `;  
  
    console.log(data)
    return NextResponse.json(data);

  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all news.');
  }
}