import CategoryPage from "@/components/JainKart/Body/CategoryPage/CategoryPage";

export default function Page({ params }) {
    const { category_id } = params;  
    return <CategoryPage category_id={category_id}/>
}
  
  
  
