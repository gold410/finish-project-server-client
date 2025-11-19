
import { useSelector, useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import { clearBasket } from "../basket/basketSlice";
import { useState } from "react";

const Pay = () => {
  const items = useSelector((state) => state.basket.items);
const userEmail = useSelector((state) => state.auth.user?.email);
  const dispatch = useDispatch();
  const [thankYou, setThankYou] = useState(false);
  const [emailInput, setEmailInput] = useState(""); // אם המשתמש לא מחובר

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePay = async () => {
     const email = userEmail || emailInput;
    if (!email) {
      toast.error("אנא הזן את המייל כדי לקבל קבלה");
      return;
    }
    try {
      // שולחים את הקבלה למייל
      await fetch("http://localhost:9636/api/receipt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail, items, totalPrice })
      });
      toast.success("קבלה נשלחה למייל!");
    } catch (err) {
      console.error(err);
      toast.error("שגיאה בשליחת הקבלה");
    }

    // מנקים סל ומציגים תודה
    dispatch(clearBasket());
    setThankYou(true);
    toast.success("התשלום הצליח!");
  };

  return (
    <>
      <h2 className="pay-title">🛍️ סיכום קניה</h2>

      {thankYou && (
        <h1 style={{ textAlign: "center", margin: "30px 0", color: "#e3b448" }}>
          !תודה שקנית אצלינו 🍇
        </h1>
      )}

      {!thankYou && (
        <div className="pay-grid">
          {items.map((item) => (
            <div key={item._id} className="pay-card">
              <img className="pay-image" src={`http://127.0.0.1:9636${item.image}`} alt={item.productName} />
              <h4 className="pay-name">{item.productName}</h4>
              <h3 className="pay-price">₪{item.price * item.quantity}</h3>
              <p className="pay-quantity">כמות: {item.quantity}</p>
            </div>
          ))}
        </div>
      )}

      <div className="total-pay">
        <h3>סה״כ לתשלום: ₪{totalPrice}</h3>
      </div>

      {!thankYou && (
        <button className="pay" onClick={handlePay}>לחץ לתשלום</button>
      )}
    </>
  );
};

export default Pay;
