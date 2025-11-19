
import { NavLink } from "react-router-dom";
import { useDispatch ,useSelector} from "react-redux";
import { removeToken } from "../featuers/auth/authSlice";

const Navigation = () => {
  const dispatch=useDispatch()
  const user=useSelector(state=>state.auth.user)

  const exit=()=>{
    dispatch(removeToken())
  }

  return (
    <div style={{ display: "flex", gap: "10px", zIndex:1000, position: "fixed",    width: "100%", // קו לאורך כל המסך
    backgroundColor: "rgb(246, 237, 223)",top:0,left:0,
    borderBottom: "2px solid #3a6b35", direction: "rtl" }}>
      <NavLink to='/home' style={linkStyle}>בית 🏠</NavLink>
      <NavLink to='/register' style={linkStyle}>הרשמה 👤</NavLink>
      <NavLink to='/' style={linkStyle}>כניסה 🚪</NavLink>
      <NavLink to='/basket' style={linkStyle}>עגלת קניות 🛒</NavLink>
      <NavLink to='/sale' style={linkStyle}>מבצעים ✨</NavLink>
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
export default Navigation;
