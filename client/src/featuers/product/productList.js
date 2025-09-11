import { useGetProductsQuery ,useDeleteProductMutation } from "./productApiSlice";
import "../../App.css";
import AddProductForm from './addProductForm'
import { useState } from "react";
import { useSelector } from "react-redux"

const ProductList = () => {
  const { data: products = [], isLoading, isError, error } = useGetProductsQuery();
  const [deleteProduct]=useDeleteProductMutation()
  const [showAdd,setShowAdd]=useState(false)
  const user=useSelector(state=>state.auth.user)

  console.log("Current user:", user);

  if (isLoading) return <div className="loading">Loading...</div>;
  if (isError) return <div className="error">Error: {error.toString()}</div>;

  const handDelete=(productItem)=>{
    deleteProduct(productItem._id)
  }
  const handleAdd=()=>{
    setShowAdd(true)
  }
  const handleCloseForm=()=>{
    setShowAdd(false)
  }


  return (
    <div className="products-wrapper">
      {user?.roles?.includes("Seller")&&<button className="add-btn" onClick={()=>{handleAdd()}}>Add</button>}
      {showAdd&&<AddProductForm onClose={handleCloseForm}/>}
      <h1 className="products-title">Product List ({products.length})</h1>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product._id} className="product-container">
              <img className="product-image" src={`http://127.0.0.1:9636${product.image}`} alt={product.productName} />
            <div className="product-info">
              <h2 className="product-name">{product.productName}</h2>
              <p className="product-price">{product.price} ₪</p>
              <p className="product-description">{product.description}</p>
             {user?.roles?.includes("Seller")&&(<button className="delete-btn" onClick={()=>{handDelete(product)}}>Delete</button>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
