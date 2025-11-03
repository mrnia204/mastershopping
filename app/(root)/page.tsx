import ProductList from "@/components/shared/products/product-list";
import { getLatestProducts } from "@/lib/actions/product.actions";


const Homepage = async() => {

  const latestProducts = await getLatestProducts();
  return (
    <div className="wrapper">
      <ProductList 
        data={latestProducts} 
        title="Newst Arravials" 
      />
    </div>
  );
}
 
export default Homepage;