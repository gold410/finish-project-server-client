// import { useEffect, useState } from "react"

// const UpdateUser=()=>{
//     const[updateForm,setUpdateForm]=useState({
//         name:"",
//         userName:"",
//         password:"",
//         email:"",
//     })
//     useEffect(()=>{
//     setUpdateForm({
//         name:"",
//         userName:"",
//         password:"",
//         email:"",
//     })
//     })
//      const handleChange=(e)=>{
//      setUpdateForm({...updateForm,[e.target.name]:e.target.value})
//     }

// return<>
// <form onSubmit={handleSubmit}>
//       {/* <h4>{isError&&JSON.stringify(error)}</h4>
//       <h4>{isLoading&&<h4>LOADING...</h4>}</h4>
//       <h4 style={{color:"green"}}>{isSuccess&&<h4>המשתמש השתנה בהצלחה </h4>}</h4> */}
//     <h2>Update Form</h2>

//     <div>
//         <label>שם</label>
//         <div><input id="name" name="name" type="text" value={updateForm.name} onChange={handleChange}/></div>
//     </div>

//     <div>
//         <label>שם משתמש</label>
//         <div><input id="userName" name="userName" type="text" value={updateForm.userName} onChange={handleChange}/></div>
//     </div>

//     <div>
//         <label>סיסמא</label>
//         <div><input id="password" name="password" type="password" value={updateForm.password} onChange={handleChange}/></div>
//     </div>

//     <div>
//         <label>אימייל</label>
//         <div><input id="email" name="email" type="email" value={updateForm.email} onChange={handleChange}/></div>
//     </div>
    
//     <div>
//         <button>שלח</button>
//     </div>
   
//     </form>

// </>
// }
// export default UpdateUser