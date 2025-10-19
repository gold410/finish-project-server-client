import { useEffect, useState } from "react"
import { useLoginMutation } from "./authApiSlice"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { removeToken, setToken ,setUser} from "./authSlice"
import {jwtDecode} from "jwt-decode";

const Login=()=>{
    const nav=useNavigate()
    const dispatch=useDispatch()

    const [LoginForm, setLoginForm]=useState({
        userName:"",
        password:"",
    })

    const [loginFunc,{isError, isLoading,isSuccess,error,data}]=useLoginMutation()
    const handleChange=(e)=>{
        setLoginForm({...LoginForm,[e.target.name]:e.target.value})
    }

    useEffect(()=>{
        if(isSuccess){
            console.log("Login response:", data)
            //שומר את הטוקן שקיבלתי
            dispatch(setToken({token:data.token}))
            //מפענח את הטוקן בצד קליינט
             const decoded = jwtDecode(data.token)
             //שומר את הטוקן המפוענח
            dispatch(setUser({ user: decoded }))
             nav('/home')
        }
    },[isSuccess])

    const handleSubmit =async(e)=>{
        e.preventDefault()
        //למחוק את הטוקן לפני התחברות חדשה
        dispatch(removeToken())
        await loginFunc(LoginForm)
        setLoginForm({
        userName:"",
        password:"",
        })
    }

    return<>
    <form onSubmit={handleSubmit}>
      <h4>{isError&&JSON.stringify(error)}</h4>
      <h4>{isLoading&&<h4>LOADING...</h4>}</h4>
        <h2>Login Form</h2>

        <div>
            <label>שם</label>
            <div><input id="userName" name="userName" type="text" onChange={handleChange}/></div>
        </div>
        <div>
            <label>סיסמא</label>
            <div><input id="password" name="password" type="password" onChange={handleChange}/></div>
        </div>
        <div>
            <button>שלח</button>
        </div>
    </form>
    </>
}
export default Login