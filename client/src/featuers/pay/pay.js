import { useSelector,useDispatch } from "react-redux"
import { toast } from 'react-toastify'
import { clearBasket } from "../basket/basketSlice"
import { useState } from "react"

const Pay=()=>{
  const items = useSelector((state) => state.basket.items)
  const dispatch=useDispatch()
  const [thankYou, setThankYou]=useState(false);
  // const [inventory, setInventory]= useState("")

   const handlePay=()=>{

  dispatch(clearBasket())
  toast.success("התשלום הצליח!")
  setThankYou(true);
  }
    const totalPrice=items.reduce((sum,item)=>sum+item.price*item.quantity,0)

return<>
<h2 className="pay-title">🛍️ סיכום קניה</h2>
{thankYou&&(
    <h1 style={{ textAlign: "center", margin: "30px 0", color: "#e3b448" }}>!תודה שקנית אצלינו 🍇</h1>
)}
{!thankYou&&(
<div className="pay-grid">
        {items.map((item) => (
          <div key={item._id} className="pay-card">
            <img className="pay-image" src={`http://127.0.0.1:9636${item.image}`} alt={item.productName} />
            <h4 className="pay-name">{item.productName}</h4>
            <h3 className="pay-price">₪{item.price*item.quantity}</h3>
            <p className="pay-quantity">כמות: {item.quantity}</p>
          </div>
        ))}
      </div>
)}
 <div className="total-pay">
       <h3>סה״כ לתשלום: ₪{totalPrice}</h3>
        </div>
      <button className="pay" onClick={()=>handlePay()}>לחץ לתשלום</button>
</>
}
export default Pay