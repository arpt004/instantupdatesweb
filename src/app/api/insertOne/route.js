import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const getTime = new Date()
    const body = await request.json()    

    const news = {
      newsid: getTime.toLocaleString(),
      title: body.title,
      source: body.source,
      source_link: body.source_link,
      category: body.category,
      image: body.image,
      time: getTime.toDateString(),
      description: body.description,
      detail_description: null,
    }

    // ********************* // Insert query
    const data = await sql`
    INSERT INTO newsdata (newsid, title, source, source_link, category, image, time, description, detail_description)
    VALUES (${news.newsid}, ${news.title}, ${news.source}, ${news.source_link},
      ${news.category}, ${news.image}, ${news.time}, ${news.description},
      ${news.detail_description});
    `;         
    // ON CONFLICT (id) DO NOTHING;

    console.log(data)
    return NextResponse.json(data);

  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to Insert one news data.');
  }
}
