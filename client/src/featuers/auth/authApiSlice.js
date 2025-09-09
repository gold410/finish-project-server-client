import apiSlice from "../../app/apiSlice";


const apiAuthSlice=apiSlice.injectEndpoints({
    endpoints:(build)=>({
        register:build.mutation({
            query:(registerUser)=>({
                url:'/api/auth/register',
                method:"POST",
                body:registerUser
            })
        })
    })
})
export const {useRegisterMutation}=apiAuthSlice