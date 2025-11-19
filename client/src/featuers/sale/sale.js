import ProductGrid from "../product/productGrid";
import { useGetProductsQuery,useDeleteProductMutation,useUpdateProductMutation } from "../product/productApiSlice";
import { toast } from 'react-toastify';
import { useDispatch,useSelector } from "react-redux";
import { useState ,useEffect} from "react";
import { addToBasket } from "../basket/basketSlice";

const Sale=()=>{

    const dispatch=useDispatch()
    const { data: products = [], isLoading, isError, error } = useGetProductsQuery();
    const user = useSelector(state => state.auth.user);
      // const [deleteProduct]=useDeleteProductMutation()
      // const [showAdd,setShowAdd]=useState(false)
      const [showUpdate,setShowUpdate]=useState(false)
      const [productToUpdate,setProductToUpdate]=useState(null)
      const [quantities,setQuantities]= useState({})
    //   const [selectCategory, setSelectCategory] = useState("all");
    //   const [search,setSearch]=useState("")
      const [oldPrice, setOldPrice] = useState({});
      const [updateProduct]=useUpdateProductMutation()

      useEffect(() => {
        const savedOldPrices = localStorage.getItem("oldPrice");
        if (savedOldPrices) {
          setOldPrice(JSON.parse(savedOldPrices));
        }
      }, []);

       if (isLoading) return <div className="loading">Loading...</div>;
       if (isError) return <div className="error">Error: {error.toString()}</div>;

    const saleProducts = products.filter(p => oldPrice[p._id] !== undefined);

  //     const handDelete=(productItem)=>{
  //   deleteProduct(productItem._id)
  // }
  
  // const handleOpenAdd=()=>{setShowAdd(true)}
  // const handleCloseAdd=()=>{setShowAdd(false)}

  // const handleOpenUpdate=(product)=>{
  //   setProductToUpdate(product)
  //   setShowUpdate(true)
  // }
  // const handleCloseUpdate=()=>{
  //   setProductToUpdate(null)
  //   setShowUpdate(false)
  // }

    const handBasket = (product) => {
        const quantity = quantities[product._id] || 1
        dispatch(addToBasket({ ...product, quantity }))
        toast.success("המוצר נוסף לסל בהצלחה!")
    }

  const handleSale = async (product) => {
  //בודק האם המוצר במבצע
  const isCurrentlyOnSale = oldPrice[product._id] !== undefined;
  //אם כן - ביטול סייל
  if (isCurrentlyOnSale) {
    //שולף את המחיר הקודם
    const prevPrice = oldPrice[product._id];
     console.log("PrevPrice:", oldPrice[product._id]);
console.log("Sending update:", { price: Number(oldPrice[product._id]) });

     try {
      // מחזירים את המחיר הקודם לשרת
      // const result=await updateProduct({
      //   id: product._id,
      //   formData: { price: prevPrice } // body של PUT
      // }).unwrap();
const prevPrice = Number(oldPrice[product._id]); // המרה למספר

console.log("Sending update:", { price: prevPrice });

await updateProduct({
  id: product._id,
  formData: { price: prevPrice } // רק price
}).unwrap();


    // מוחקים את המוצר שלא בסייל כבר
    setOldPrice(prev => {
      const { [product._id]: _, ...rest } = prev;
      localStorage.setItem("oldPrice", JSON.stringify(rest));
      return rest;
    });
     toast.info("המבצע בוטל בהצלחה! המחיר הקודם הוחזר.");

//       console.log("Sending update:", { _id: product._id, price: prevPrice });
//       // מחזירים מחיר לשרת
//      const result= await updateProduct({
//   id: product._id,
//   formData: { price: prevPrice } // body של PUT
// }).unwrap();

//       console.log("Server response:", result);
    } catch (err) {
      console.error("Update error:", err);
      toast.error("שגיאה בעדכון המחיר!");
    }

    return;
  }
  // אם המוצר לא במבצע- מפעילים סייל
  setOldPrice(prev => {
    const newPrice = { ...prev, [product._id]: product.price };
    localStorage.setItem("oldPrice", JSON.stringify(newPrice));
    return newPrice;
  });

  setProductToUpdate(product);
  setShowUpdate(true);
};

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
    
    return(<div className="products-title">
    <h1>🔥 מוצרים במבצע 🔥</h1>
    <ProductGrid
    products={saleProducts}
    user={user}
  quantities={quantities}
  handleChangeQuantities={handleChangeQuantities}
  handBasket={handBasket}
  // handDelete={handDelete}
  // handleOpenUpdate={handleOpenUpdate}
  handleSale={handleSale}
  oldPrice={oldPrice}
    />
    </div>)
}
export default Sale