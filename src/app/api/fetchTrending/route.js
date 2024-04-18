import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

async function fetchTrendingData() {

  try{
    const count = 50;
    const category = 'top_stories'
    const url = `https://m.inshorts.com/api/en/news?category=${category}&max_limit=${count}&include_card_data=true&randomParam=${new Date().getTime()}`;
    
    const response = await fetch(url, {
      next: { revalidate: 0 } 
    });

  //  { cache: 'no-store' } ,
  // { next: { revalidate: 10 } }
  // https://m.inshorts.com/api/en/news?category=top_stories&max_limit=20&include_card_data=true

    if(response.ok) {
        const res = await response.json();
        const data = res.data.news_list
        const formattedData = []

        data.forEach(eachNews => {
          const getData = Date(eachNews.news_obj.created_at);
          const formattedDate = getData.toLocaleString()

          const newsObject = {
            "id": eachNews.news_obj.hash_id ? eachNews.news_obj.hash_id : 'NA',
            "title": eachNews.news_obj.title ? eachNews.news_obj.title : 'NA',
            "author_name": eachNews.news_obj.author_name ? eachNews.news_obj.author_name : 'NA',
            "source": eachNews.news_obj.source_name ? eachNews.news_obj.source_name : 'NA',
            "source_link": eachNews.news_obj.source_url ? eachNews.news_obj.source_url : 'NA',
            "category":  eachNews.news_obj.category_names.length > 0 ? eachNews.news_obj.category_names[0] : 'NA',
            "image": eachNews.news_obj.image_url ? eachNews.news_obj.image_url : 'NA',
            "time": formattedDate ? formattedDate : 'NA',
            "description":  eachNews.news_obj.content ? eachNews.news_obj.content : 'NA',
            "detail_description": null
          }
          formattedData.push(newsObject);
        });
        return formattedData;
    }
  }catch(error) {
    console.log(error);
  }
}

export async function GET(request) { 
  try {
    // ********************* // Fetch query
    
    const response = await fetchTrendingData()

    const allNews = response;    
    return NextResponse.json(allNews);
    // return NextResponse.json({ revalidated: true, data: allNews});
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch trending news.');
  }
}