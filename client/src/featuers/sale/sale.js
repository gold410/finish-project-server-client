import ProductGrid from "../product/productGrid";
import { useGetProductsQuery } from "../product/productApiSlice";

const Sale=()=>{

    const { data: products = [] } = useGetProductsQuery();
    const oldPrice = JSON.parse(localStorage.getItem("oldPrice") || "{}")

const saleProducts = products.filter(p => oldPrice && oldPrice[p._id] !== undefined);

    return(<div className="products-title">
        <h1>🔥 מוצרים במבצע 🔥</h1>
    <ProductGrid
     products={saleProducts}
     oldPrice={oldPrice}
    />
    </div>)
}
export default Sale