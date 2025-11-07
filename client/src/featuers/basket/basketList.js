import { removeFromBasket, clearBasket ,loadBasket} from "./basketSlice";
import { useSelector, useDispatch } from "react-redux";

const BasketList = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.basket.items);

  if (!items || items.length === 0) {
    return <h2 className="no-basket">הסל שלך ריק 🛒</h2>;
  }

  return (
    <div className="basket-container">
      <h2 className="basket-title">🛍️ סל הקניות שלך</h2>
      <div className="basket-grid">
        {items.map((item) => (
          <div key={item._id} className="basket-card">
            <img className="basket-image" src={`http://127.0.0.1:9636${item.image}`} alt={item.productName} />
            <h4 className="basket-name">{item.productName}</h4>
            <h3 className="basket-price">₪{item.price}</h3>
            <p className="basket-quantity">כמות: {item.quantity}</p>
            <button className="basket-remove" onClick={() => dispatch(removeFromBasket(item._id))}>הסר ❌</button>
          </div>
        ))}
      </div>
      <button className="basket-clear" onClick={() => dispatch(clearBasket())} >נקה סל 🗑️</button>
    </div>
  );
};

export default BasketList;

