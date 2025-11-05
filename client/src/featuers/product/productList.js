import { useGetProductsQuery ,useDeleteProductMutation} from "./productApiSlice";
import { addToBasket } from "../basket/basketSlice";
import "../../App.css";
import AddProductForm from './addProductForm'
import UpdateProductForm from "./updateProductForm";
import { useState } from "react";
import { useSelector,useDispatch } from "react-redux"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductList = () => {
  const dispatch=useDispatch()
  const { data: products = [], isLoading, isError, error } = useGetProductsQuery();
  const [deleteProduct]=useDeleteProductMutation()
  const [showAdd,setShowAdd]=useState(false)
  const [showUpdate,setShowUpdate]=useState(false)
  const [productToUpdate,setProductToUpdate]=useState(null)
  const [quantities,setQuantities]= useState({})

  const user=useSelector(state=>state.auth.user)

  console.log("Current user:", user);

  if (isLoading) return <div className="loading">Loading...</div>;
  if (isError) return <div className="error">Error: {error.toString()}</div>;

  const handDelete=(productItem)=>{
    deleteProduct(productItem._id)
  }
  
  const handleOpenAdd=()=>{setShowAdd(true)}
  const handleCloseAdd=()=>{setShowAdd(false)}

  const handleOpenUpdate=(product)=>{
    setProductToUpdate(product)
    setShowUpdate(true)
  }
  const handleCloseUpdate=()=>{
    setProductToUpdate(null)
    setShowUpdate(false)
  }

  const handBasket=(product)=>{
    const quantity=quantities[product._id]||1
    dispatch(addToBasket({...product, quantity }))
    toast.success("המוצר נוסף לסל בהצלחה!");
  }

  const handleChangeQuantities=(productItem,value,unitType)=>{
    let newValue=value
    if(unitType==="יח'"){
     newValue= Math.max(1,Math.round(value))
    }else{
     newValue= Math.max(0.5,value)
    }
    setQuantities((prev)=>({
      ...prev,
    [productItem]:newValue,
    }))
  }
    console.log("user roles:", user?.roles)
  return (
    <div className="products-wrapper">
      {user?.roles==="Seller"&&<button className="add-btn" onClick={()=>{handleOpenAdd()}}>Add ➕</button>}
      {showAdd&&<AddProductForm onClose={handleCloseAdd}/>}
      {showUpdate&&<UpdateProductForm product={productToUpdate} onClose={handleCloseUpdate}/>}
      <h1 className="products-title">Product List ({products.length})</h1>
      <div className="products-grid">
        {products.map((product) => {
          const quentity=quantities[product._id]||1
          return(
          <div key={product._id} className="product-container">
              <img className="product-image" src={`http://127.0.0.1:9636${product.image}`} alt={product.productName} />
            <div className="product-info">
              <h2 className="product-name">{product.productName}</h2>
              {/* <p className="product-unit">{product.unitType}</p> */}
              <p className="product-description">{product.description}</p>
              <div className="field">
              {/* <label htmlFor={`quentity-${product._id}`}>{product.unitType}</label> */}
              <div className="controler">
                {product.unitType === "יח'" ? "'יח" : "'קג"}
                <input id="quantity" name="quantity" type="number" min={1} step={product.unitType === "יח'" ? 1 : 0.5} value={quentity} onChange={(e)=>{
                let val = Number(e.target.value);
                  if (product.unitType === "יח'") {
                    val = Math.max(1, Math.round(val)); // עיגול למספר שלם למוצרים ביחידות
                  } else {
                    val = Math.max(0.5, val); // מינימום 0.5 לקילו
                  }
                  handleChangeQuantities(product._id,val,product.unitType)
                }}/>
              </div>
              </div>
              <p className="product-price">מחיר: ₪{(quentity*product.price).toFixed(2)}</p>
              {user?.roles==="User"&&(
              <button className="basket-btn" onClick={()=>{handBasket(product)}}>add basket ➕</button>
              )}
             {user?.roles==="Seller"&&(
              <>
              <button className="delete-btn" onClick={()=>{handDelete(product)}}>Delete 🗑️</button>
              <button className="update-btn" onClick={()=>{handleOpenUpdate(product)}}>Update ✏️</button>
              </>
              )}
            </div>
          </div>
          )
        })}
      </div>
    </div>
  );
};

export default ProductList;
