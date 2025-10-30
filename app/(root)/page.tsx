import ProductList from "@/components/shared/products/product-list";
import sampleData from "@/db/sample-data";
const Homepage = async() => {
  return (
    <div className="wrapper">
      <ProductList data={sampleData.products} title="newst Arravials" limit={4} />
    </div>
  );
}
 
export default Homepage;