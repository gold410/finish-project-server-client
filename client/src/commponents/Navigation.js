
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
    <div style={navBarStyle}>

       <div style={logoContainer}>
        <img src="/logo.png" alt="logo" style={logoStyle} />
      </div>
      <div style={linksContainer}>
      <NavLink to='/home' style={linkStyle}>בית 🏠</NavLink>
      <NavLink to='/' style={linkStyle}>כניסה / הרשמה 🚪</NavLink>
      <NavLink to='/basket' style={linkStyle}>עגלת קניות 🛒</NavLink>
      <NavLink to='/sale' style={linkStyle}>מבצעים ✨</NavLink>
      <NavLink to='/update' style={linkStyle}>עדכון פרטים ✏️</NavLink>
      <NavLink to='/'onClick={(e)=>{e.preventDefault()
         exit()}} style={linkStyle} >יציאה👋🏼</NavLink>
         </div>
<h1 style={userTextStyle}>שלום {user ? user.name : "אורח/ת"}</h1>    
</div>
  );
};
const navBarStyle = {
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "8px 20px",
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: 1000,
backgroundImage: "linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url('/backgruond2.jpg')",
    backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  borderBottom: "2px solid #3a6b35",
  direction: "rtl"
};
const logoContainer = {
  display: "flex",
  alignItems: "center",
};

const logoStyle = {
  height: "200px",
  width: "auto",
  objectFit: "contain",
};
const linksContainer = {
  display: "flex",
  gap: "15px",
  alignItems: "center",
  justifyContent: "center",
  flex: 1,    
};
const userTextStyle = {
  color: "black",
  fontSize: "27px",
  fontWeight: "500",
  padding: "0 12px",
  whiteSpace: "nowrap",
};
const linkStyle = {
  color: "black",      
  fontSize: "26px",
  textDecoration: "none",
  padding: "8px 12px",
  borderRadius: "4px",     
  transition: "all 0.3s ease",
  fontWeight: "500",
  cursor: "pointer"
};
export default Navigation;
