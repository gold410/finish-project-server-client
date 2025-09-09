import { useState } from "react"

const Login=()=>{

    const [LoginForm, setLoginForm]=useState({
        name:"",
        password:"",
    })

    const handleChange=(e)=>{
        setLoginForm({...LoginForm,[e.target.name]:e.target.value})
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        setLoginForm({
        name:"",
        password:"",
        })
    }

    return<>
    <form onSubmit={handleSubmit}>
        <h2>Login Form</h2>

        <div>
            <label>שם</label>
            <div><input id="name" name="name" type="text" onChange={handleChange}/></div>
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