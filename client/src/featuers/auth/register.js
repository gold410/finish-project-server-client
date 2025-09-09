import { useEffect, useState } from "react"
import { useRegisterMutation } from "./authApiSlice"
import { useNavigate } from "react-router-dom"

const Register=()=>{

    const [registerFunc,{isError,isLoading,isSuccess,data,error}]=useRegisterMutation()
    const [registerForm, setRegisterForm]=useState({
        name:"",
        userName:"",
        password:"",
        email:"",
    })
    const nav=useNavigate()

    useEffect(()=>{
     if(isSuccess){
      nav('/')
     }
    },[isSuccess])
    const handleChange=(e)=>{
      setRegisterForm({...registerForm,[e.target.name]:e.target.value})
    }

    const handleSubmit=(e)=>{
      e.preventDefault()
      registerFunc(registerForm)
      setRegisterForm({
         name:"",
        userName:"",
        password:"",
        email:"",
      })
    }
    return<>
    <form onSubmit={handleSubmit}>
      <h4>{isError&&JSON.stringify(error)}</h4>
      <h4>{isLoading&&<h4>LOADING...</h4>}</h4>
      <h4 style={{color:"green"}}>{isSuccess&&<h4>המשתמש נוסף בהצלחה </h4>}</h4>
    <h2>Register Form</h2>

    <div>
        <label>שם</label>
        <div><input id="name" name="name" type="text" value={registerForm.name} onChange={handleChange}/></div>
    </div>

    <div>
        <label>שם משתמש</label>
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
        <button>שלח</button>
    </div>
   
    </form>
    </>
}
export default Register