
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useDispatch ,useSelector} from "react-redux";
import { removeToken } from "../featuers/auth/authSlice";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch=useDispatch()
  const user=useSelector(state=>state.auth.user)

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const exit=()=>{
    dispatch(removeToken())
  }

  return (
    <div style={{ display: "flex", gap: "10px", zIndex:1000, position: "fixed",    width: "100%",          // קו לאורך כל המסך
    backgroundColor: "rgb(246, 237, 223)",top:0,left:0,
    borderBottom: "2px solid #3a6b35", direction: "rtl" }}>
      <NavLink to='/home' style={linkStyle}>בית 🏠</NavLink>
      <NavLink to='/register' style={linkStyle}>הרשמה 👤</NavLink>
      <NavLink to='/' style={linkStyle}>כניסה 🚪</NavLink>
      <NavLink to='/basket' style={linkStyle}>עגלת קניות 🛒</NavLink>
      <NavLink to='/sale' style={linkStyle}>מבצעים ✨</NavLink>

      {/* כפתור הקטגוריה */}
      <div style={{ position: "relative" }}>
        <button onClick={toggleDropdown} style={linkStyle}>קטגוריה</button>

        {/* תפריט נפתח */}
        {isOpen && (
          <div style={{ position: "absolute", top: "45px", right: "0", backgroundColor: "#f5f5f5", borderRadius: "5px", zIndex: 1 }}>
            <NavLink to='/category/Fruits' style={dropdownLinkStyle}>פירות 🍎</NavLink>
            <NavLink to='/category/Vegetables' style={dropdownLinkStyle}>ירקות 🥕</NavLink>
            <NavLink to='/category/Leaves' style={dropdownLinkStyle}>עלים 🥬</NavLink>
          </div>
        )}
      </div>

      <NavLink to='/update' style={linkStyle}>עדכון פרטים ✏️</NavLink>
      <NavLink to='/'onClick={(e)=>{e.preventDefault()
         exit()}} style={linkStyle} >יציאה👋🏼</NavLink>
         
<h1 style={{
  color: "#3a6b35",
  fontSize: "16px",
  fontWeight: "500",
  marginRight: "auto", 
  padding: "0px 12px"}}>שלום {user ? user.name : "אורח/ת"}</h1>    
  
</div>
  );
};

const linkStyle = {
  color: "#3a6b35",      
  fontSize: "16px",
  textDecoration: "none",
  padding: "8px 12px",
  borderRadius: "4px",     
  transition: "all 0.3s ease",
  fontWeight: "500",
  cursor: "pointer"
};

const dropdownLinkStyle = {
  display: "block",
  color: "#3a6b35",
  fontSize: "16px",
  textDecoration: "none",
  padding: "6px 12px",
  margin: "2px 0",
  transition: "all 0.3s ease",
  fontWeight: "500",
  cursor: "pointer"
};

// Hover effect
const hoverStyle = {
  color: "#ffffff",
  backgroundColor: "#e3b448"
};



export default Navigation;
