import { createSlice } from "@reduxjs/toolkit";

const authSlice=createSlice({
name:"auth",
initialState:{
    token:localStorage.getItem("token")||"",
    isLoginUser:localStorage.getItem("token")?true:false,
},
reducers:{
    setToken:(state,action)=>{
    const token=action.payload.token
    state.token=token
    state.isLoginUser=true
    localStorage.setItem("token",token)
    },
    removeToken:(state)=>{
        state.token=""
        state.isLoginUser=false
        localStorage.removeItem("token")
    }
}
})
export default authSlice.reducer
export const {setToken,removeToken}=authSlice.actions