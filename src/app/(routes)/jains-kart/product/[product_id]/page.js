import ProductPage from "@/components/JainKart/Body/ProductPage/ProductPage";

export default function Page({ params }) {
    const { product_id } = params;  
    return <ProductPage product_id={product_id}/>
}
  
  
  
