import { useEffect, useState } from "react"
import { useLoginMutation } from "./authApiSlice"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setToken ,setUser} from "./authSlice"

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
            nav('/home')
            dispatch(setToken(data))
              if (data.user) {
            dispatch(setUser({ user: data.user }))
        }
        }
    },[isSuccess])

    const handleSubmit=(e)=>{
        e.preventDefault()
        loginFunc(LoginForm)
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