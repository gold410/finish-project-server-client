import { createSlice } from "@reduxjs/toolkit";

//שומר את הID כדי לבדוק האם המשתמש מחובר
const getUserId=()=>{
const currentUser=JSON.parse(localStorage.getItem("user"))
return currentUser?currentUser._id:"guest"
}
const initialState = {
  items: []
}
const basketSlice=createSlice({
    name:"basket",
    initialState,
    reducers:{
        addToBasket:(state,action)=>{
            const userId=getUserId()
            const product=action.payload
            const findProduct=state.items.find((item)=>item._id===product._id)

            if(findProduct){
                findProduct.quantity+= product.quantity
            }else{
                state.items.push(product)
            }
            localStorage.setItem(`basketItems${userId}`,JSON.stringify(state.items))
        },
        removeFromBasket:(state,action)=>{
            const userId=getUserId()
            state.items=state.items.filter(item=>item._id!==action.payload)
            localStorage.setItem(`basketItems${userId}`,JSON.stringify(state.items))
        },
        clearBasket:(state)=>{
            const userId=getUserId()
            state.items=[]
            localStorage.removeItem(`basketItems${userId}`)
        },
        loadBasket:(state)=>{
            const userId=getUserId()
            const saveBasket=localStorage.getItem(`basketItems${userId}`)
            state.items=saveBasket ? JSON.parse(saveBasket):[]
    }
}
})
export const{addToBasket,removeFromBasket,clearBasket,loadBasket }=basketSlice.actions
export default basketSlice.reducer