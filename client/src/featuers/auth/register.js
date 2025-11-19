import { useEffect, useState } from "react"
import { useRegisterMutation ,useUpdateUserMutation} from "./authApiSlice"
import { useNavigate } from "react-router-dom"
// import { useDispatch, useSelector } from "react-redux"
// import { setUser } from "./authSlice"

const Register=()=>{

  const nav=useNavigate()
  // const dispatch=useDispatch()
  // const { user } = useSelector((state) => state.auth);
    const [registerFunc,{isError,isLoading,isSuccess,error}]=useRegisterMutation()
   // const[updateUserFunc]=useUpdateUserMutation()

    const [form, setForm]=useState({
    name: "",
    userName: "",
    password: "",
    email: "",
    })

    // useEffect(()=>{
    //  if(isSuccess){
    //   nav('/')
    //  }
    // },[isSuccess])
    const handleChange=(e)=>{
      setForm({...form,[e.target.name]:e.target.value})
    }

    const handleSubmit=async(e)=>{
      e.preventDefault()

    if (!form.name || !form.userName|| !form.email||!form.password) {
    alert("יש למלא את כל השדות לפני שליחה");
    return;
  }
  try{
    await registerFunc(form).unwrap();
      alert("ההרשמה בוצעה בהצלחה!");

      setForm({
        name: "",
        userName: "",
        password: "",
        email: "",
      });

      nav("/"); // נווט לדף הבית או דף לוגין
    } catch (err) {
      console.error("שגיאה בהרשמה:", err);
      alert(err?.data?.message || "שגיאה בשרת");
    }
  };
    return(
    <form onSubmit={handleSubmit}>
    <h2>Register Form</h2>

      {isLoading && <h4>טוען...</h4>}
      {isError && (
        <h4 style={{ color: "red" }}>{JSON.stringify(error?.data || error)}</h4>
      )}
      {isSuccess && (
        <h4 style={{ color: "green" }}>המשתמש נוסף בהצלחה</h4>
      )}
    <div>
        <label>שם</label>
        <input
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>שם משתמש</label>
        <input
          name="userName"
          type="text"
          value={form.userName}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>סיסמא</label>
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>אימייל</label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
        />
      </div>

      <button type="submit">הרשמה</button>
    </form>
  );
}
export default Register