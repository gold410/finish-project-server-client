
import { NavLink } from "react-router-dom";
import { useState } from "react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div style={{ display: "flex", gap: "10px", position: "relative", direction: "rtl" }}>
      <NavLink to='/home' style={linkStyle}>בית</NavLink>
      <NavLink to='/register' style={linkStyle}>הרשמה</NavLink>
      <NavLink to='/' style={linkStyle}>כניסה</NavLink>
      <NavLink to='/basket' style={linkStyle}>עגלת קניות</NavLink>
      <NavLink to='/sale' style={linkStyle}>מבצעים</NavLink>

      {/* כפתור הקטגוריה */}
      <div style={{ position: "relative" }}>
        <button onClick={toggleDropdown} style={linkStyle}>קטגוריה</button>

        {/* תפריט נפתח */}
        {isOpen && (
          <div style={{ position: "absolute", top: "45px", right: "0", backgroundColor: "#f5f5f5", borderRadius: "5px", zIndex: 1 }}>
            <NavLink to='/category/electronics' style={dropdownLinkStyle}>בגדי נשים</NavLink>
            <NavLink to='/category/fashion' style={dropdownLinkStyle}>אופנה</NavLink>
            <NavLink to='/category/home' style={dropdownLinkStyle}>בית</NavLink>
          </div>
        )}
      </div>

      <NavLink to='/update' style={linkStyle}>עדכון פרטים</NavLink>
    </div>
  );
};

const linkStyle = {
  color: "#ee82ee",
  fontSize: "15px",
  backgroundColor: "#f5f5f5",
  borderRadius: "5px",
  padding: "10px 20px",
  textDecoration: "none",
  textAlign: "center"
};

const dropdownLinkStyle = {
  display: "block",
  color: "#ee82ee",
  fontSize: "15px",
  backgroundColor: "#f5f5f5",
  borderRadius: "5px",
  padding: "10px 20px",
  textDecoration: "none",
  textAlign: "center",
  margin: "5px 0"
};

export default Navigation;
