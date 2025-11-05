import { createSlice } from "@reduxjs/toolkit";

const basketSlice=createSlice({
    name:"basket",
    initialState:{
        items:[],
    },
    reducers:{
        addToBasket:(state,action)=>{
            const product=action.payload
            const findProduct=state.items.find((item)=>item._id===product._id)

            if(findProduct){
                findProduct.quantity+= product.quantity
            }else{
                state.items.push(product)
            }
            localStorage.setItem("basketItems",JSON.stringify(state.items))
        },
        removeFromBasket:(state,action)=>{
               state.items=state.items.filter(item=>item._id!==action.payload)
               localStorage.setItem("basketItems",JSON.stringify(state.items))
        },
        clearBasket:(state)=>{
            state.items=[]
            localStorage.removeItem("basketItems")
        }
    }
})
export const{addToBasket,removeFromBasket,clearBasket}=basketSlice.actions
export default basketSlice.reducer