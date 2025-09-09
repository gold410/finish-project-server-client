// import { useGetProductsQuery } from "./productApiSlice"

// const ProductList=()=> {
    
//     const {data: products = [],isLoading, isSuccess, isError,error}=useGetProductsQuery()
//     console.log(products,isLoading,isSuccess,isError)
//     console.log({isError})
//   return (
//     <div>
//         <h1>Product List ({products.length})</h1>
//         {products.map((product) => (
//         <div key={product.id} className="product-item">
//             <div className="product-container">
//             <h2 className="product-title">{product.productName}</h2>
//             <p className="product-date">{product.price}</p>
//             <p className="product-content">{product.description}</p>
//             </div>
//             <button className='delete-btn'>Delete</button>
//         </div>
// ))}

//     </div>
//   )
// }

// export default ProductList


import { useGetProductsQuery ,useDeleteProductMutation } from "./productApiSlice";
import "../../App.css";

const ProductList = () => {
  const { data: products = [], isLoading, isError, error } = useGetProductsQuery();
  const [deleteProduct]=useDeleteProductMutation()

  if (isLoading) return <div className="loading">Loading...</div>;
  if (isError) return <div className="error">Error: {error.toString()}</div>;

  const handDelete=(productItem)=>{
    deleteProduct(productItem._id)
  }

  return (
    <div className="products-wrapper">
      <h1 className="products-title">Product List ({products.length})</h1>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product._id} className="product-container">
              <img className="product-image" src={`http://127.0.0.1:9636${product.image}`} alt={product.productName} />
            <div className="product-info">
              <h2 className="product-name">{product.productName}</h2>
              <p className="product-price">{product.price} ₪</p>
              <p className="product-description">{product.description}</p>
              <button className="delete-btn" onClick={()=>{handDelete(product)}}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
