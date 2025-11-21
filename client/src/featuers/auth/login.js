// import { useEffect, useState } from "react"
// import { useLoginMutation } from "./authApiSlice"
// import { useNavigate } from "react-router-dom"
// import { useDispatch } from "react-redux"
// import { removeToken, setToken ,setUser} from "./authSlice"
// import {jwtDecode} from "jwt-decode";
// import { loadBasket } from "../basket/basketSlice"
// import { auth, provider, signInWithRedirect, getRedirectResult } from "./firebase";

// const Login=()=>{
//     const nav=useNavigate()
//     const dispatch=useDispatch()

//     const [LoginForm, setLoginForm]=useState({
//         userName:"",
//         password:"",
//     })
//   const [googleLoading, setGoogleLoading] = useState(false);
//     const [loginFunc,{isError, isLoading,isSuccess,error,data}]=useLoginMutation()
//     const handleChange=(e)=>{
//         setLoginForm({...LoginForm,[e.target.name]:e.target.value})
//     }

//       useEffect(() => {
//   getRedirectResult(auth)
//     .then((result) => {
//       if (result) {
//         const user = result.user;
//         const userData = {
//           uid: user.uid,
//           displayName: user.displayName,
//           email: user.email,
//           photoURL: user.photoURL,
//         };
//         dispatch(setUser({ user: userData }));
//         nav("/home");
//       }
//     })
//     .catch((error) => console.error(error));
// }, [dispatch, nav]);


//     useEffect(()=>{
//         if(isSuccess){
//             console.log("Login response:", data)
//             //שומר את הטוקן שקיבלתי
//             dispatch(setToken({token:data.token}))
//             //מפענח את הטוקן בצד קליינט
//              const decoded = jwtDecode(data.token)
//              //שומר את הטוקן המפוענח
//             dispatch(setUser({ user: decoded }))
//              dispatch(loadBasket());
//              nav('/home')
//         }
//     },[isSuccess])

//     const handleSubmit =async(e)=>{
//         e.preventDefault()
//         //למחוק את הטוקן לפני התחברות חדשה
//         dispatch(removeToken())
//         await loginFunc(LoginForm)
//         setLoginForm({
//         userName:"",
//         password:"",
//         })
//     }
//  const handleLogin = () => {
//   signInWithRedirect(auth, provider);
// };





//     return<>
//     <form onSubmit={handleSubmit}>
//       <h4>{isLoading&&<h4>LOADING...</h4>}</h4>
//         <h2>כניסה</h2>

//         <div>
//             <label>שם</label>
//             <div><input id="userName" name="userName" type="text" onChange={handleChange}/></div>
//         </div>
//         <div>
//             <label>סיסמא</label>
//             <div><input id="password" name="password" type="password" onChange={handleChange}/></div>
//         </div>
//             {isError && (
//                 <h3 style={{ color: "red" }}>
//                     {error?.data?.message || "שם משתמש או סיסמה שגויים"}
//                 </h3>
//             )}
//         <div>
//             {/* <p className="forgetPassword" onClick={()=>{}}>שכחתי סיסמא</p> */}
//             <button>שלח</button>
//         </div>
//     </form>
//      <button
//         type="button"
//         onClick={handleLogin}
//         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//       >
//         התחבר עם Google
//       </button>
//     </>
// }
// export default Login


import { useEffect, useState } from "react";
import { useLoginMutation } from "./authApiSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeToken, setToken, setUser } from "./authSlice";
import { jwtDecode } from "jwt-decode";
import { loadBasket } from "../basket/basketSlice";
import { auth, provider, signInWithPopup } from "./firebase";

const Login = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();

  const [LoginForm, setLoginForm] = useState({ userName: "", password: "" });
  const [loginFunc, { isError, isLoading, isSuccess, error, data }] = useLoginMutation();

  const handleChange = (e) => {
    setLoginForm({ ...LoginForm, [e.target.name]: e.target.value });
  };

  // התחברות רגילה עם שם משתמש וסיסמה
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(removeToken());
    await loginFunc(LoginForm);
    setLoginForm({ userName: "", password: "" });
  };



  // התחברות עם Google
  const handleGoogleLogin = async () => {
    try {
      provider.setCustomParameters({
        prompt: 'select_account'
      });
      const result = await signInWithPopup(auth, provider);
      console.log('Google login result:', result);
      const user = result.user;
      const userData = {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        roles: 'User' // ברירת מחדל למשתמש Google
      };
      console.log('User data to save:', userData);
      dispatch(setUser({ user: userData }));
      console.log('Navigating to /home');
      nav("/home");
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  // JWT login effect
  useEffect(() => {
    if (isSuccess) {
      dispatch(setToken({ token: data.token }));
      const decoded = jwtDecode(data.token);
      dispatch(setUser({ user: decoded }));
      dispatch(loadBasket());
      nav("/home");
    }
  }, [isSuccess, data, dispatch, nav]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>כניסה</h2>
        <div>
          <label>שם</label>
          <div>
            <input id="userName" name="userName" type="text" onChange={handleChange} />
          </div>
        </div>
        <div>
          <label>סיסמא</label>
          <div>
            <input id="password" name="password" type="password" onChange={handleChange} />
          </div>
        </div>
        {isError && (
          <h3 style={{ color: "red" }}>
            {error?.data?.message || "שם משתמש או סיסמה שגויים"}
          </h3>
        )}
        <button type="submit">שלח</button>
      </form>

      <button
        type="button"
        onClick={handleGoogleLogin}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        התחבר עם Google
      </button>
    </>
  );
};

export default Login;
