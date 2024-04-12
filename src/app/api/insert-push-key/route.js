import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json()    

    // ********************* // Insert query
    const data = await sql`
    INSERT INTO pushKeys (pushKey)
    VALUES (${body.pushKey})
    ON CONFLICT (id) DO NOTHING;
    `;

    console.log(data)
    return NextResponse.json(data);

  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to Insert Pushkey.');
  }
}
