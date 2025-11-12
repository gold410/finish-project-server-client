import { useEffect, useState } from "react"
import { useRegisterMutation ,useUpdateUserMutation} from "./authApiSlice"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { setUser } from "./authSlice"

const Register=()=>{

  const nav=useNavigate()
  const dispatch=useDispatch()
  const { user } = useSelector((state) => state.auth);
    const [registerFunc,{isError,isLoading,isSuccess,error}]=useRegisterMutation()
   // const[updateUserFunc]=useUpdateUserMutation()

    const [registerForm, setRegisterForm]=useState({
        name:user.name||"",
        userName:user.userName||"",
        password:"",
        email:user.email||"",
        phone:user.phone||"",
        city:user.address.city||"",
        street:user.address.street||"",
        buildingNumber:user.address.buildingNumber||"",
        housNumber:user.address.housNumber||"",
    })

    useEffect(()=>{
     if(isSuccess){
      nav('/')
     }
    },[isSuccess])
    const handleChange=(e)=>{
      setRegisterForm({...registerForm,[e.target.name]:e.target.value})
    }

    const handleSubmit=async(e)=>{
      e.preventDefault()

    if (!registerForm.name || !registerForm.userName|| !registerForm.email||!registerForm.phone) {
    alert("יש למלא את כל השדות לפני שליחה");
    return;
  }
  try{
    //  const updateData = {
    //   name: registerForm.name,
    //   userName: registerForm.userName,
    //   email: registerForm.email,
    // };

    // if (registerForm.password) {
    //   updateData.password = registerForm.password; // רק אם משתמש הזין סיסמה
    // }
    if(user){

 const payload = {
  name: registerForm.name,
  userName: registerForm.userName,
  email: registerForm.email,
  phone:registerForm.phone,
  city:registerForm.address.city,
  street:registerForm.address.street,
  buildingNumber:registerForm.address.buildingNumber,
  housNumber:registerForm.address.housNumber,
  ...(registerForm.password ? { password: registerForm.password } : {})
}

const updateData = await updateUserFunc({ id: user._id, data: payload }).unwrap();
      dispatch(setUser(updateData))
      console.log("user._id:", user._id);
      alert("המשתמש עודכן בהצלחה")
      }else{
      const data = await registerFunc(registerForm).unwrap();
      setRegisterForm({ name: "", userName: "", password: "", email: "" ,phone:""});
      alert("המשתמש נוסף בהצלחה");
    } }catch(err){
    console.error("שגיאה:", err);
    alert(err?.data?.message || "שגיאה בשרת");
    }

      // registerFunc(registerForm)
      // setRegisterForm({
      //   name:"",
      //   userName:"",
      //   password:"",
      //   email:"",
      //   phone:"",
      // })
    }
    // const updateUser=async()=>{
    //   if(!user)return
    //   try{
    //    const[updateData]=await updateUserFunc({id:user._id,...registerForm}).unwrap()
    //   dispatch(setUser({user:updateData}))
    //   alert("המשתמש עודכן בהצלחה")
    //   }catch{
    //     console.log(registerForm);
    //   alert("שגיאה בעדכון המשתמש")
    //   }
    // }
    return<>
    <form onSubmit={handleSubmit}>
      {isError && (<h4 style={{ color: "red" }}>{JSON.stringify(error, null, 2)}</h4>)}
      <h4>{isLoading&&<h4>LOADING...</h4>}</h4>
      <h4 style={{color:"green"}}>{isSuccess&&<h4>המשתמש נוסף בהצלחה </h4>}</h4>

    <h2>Register Form</h2>

    <div>
        <label>שם</label>
        <div><input id="name" name="name" type="text" value={registerForm.name} onChange={handleChange}/></div>
    </div>

    <div>
        <label>שם משתמש יחודי</label>
        <div><input id="userName" name="userName" type="text" value={registerForm.userName} onChange={handleChange}/></div>
    </div>

    <div>
        <label>סיסמא</label>
        <div><input id="password" name="password" type="password" value={registerForm.password} onChange={handleChange}/></div>
    </div>

    <div>
        <label>אימייל</label>
        <div><input id="email" name="email" type="email" value={registerForm.email} onChange={handleChange}/></div>
    </div>

     <div>
        <label>טלפון</label>
        <div><input id="phone" name="phone" type="phone" value={registerForm.phone} onChange={handleChange}/></div>
    </div>

     <div>
       <label>עיר</label>
        <div><input id="city" name="city" type="string" value={registerForm.phone} onChange={handleChange}/></div>
    </div>

     <div>
       <label>רחוב</label>
        <div><input id="street" name="street" type="string" value={registerForm.street} onChange={handleChange}/></div>
    </div>

     <div>
       <label>מספר בינין</label>
        <div><input id="buildingNumber" name="buildingNumber" type="number" value={registerForm.buildingNumber} onChange={handleChange}/></div>
    </div>

     <div>
       <label>מספר בית</label>
        <div><input id="housNumber" name="housNumber" type="number" value={registerForm.housNumber} onChange={handleChange}/></div>
    </div>

    <div>
        <button>שלח</button>
    </div>
     {/* <div>
       {user&&<button type="button" onClick={updateUser}>עדכון פרטים</button>} 
    </div> */}
   
    </form>
    </>
}
export default Register