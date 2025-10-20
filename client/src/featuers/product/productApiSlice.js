import apiSlice from "../../app/apiSlice";

const productApiSlice=apiSlice.injectEndpoints({
    endpoints:(build)=>({
        getProducts:build.query({
            query:()=>({
                url:"api/products/getAll"
            }),
            providesTags: ["Product"]
        }),
        createProduct:build.mutation({
            query:(product)=>({
                url:"api/products",
                method:"POST",
                body:product
            }),
            invalidatesTags: ["Product"]
        }),
        deleteProduct:build.mutation({
            query:(id)=>({
                url:`api/products/${id}`,
                method:"DELETE",
                body:{id:id}
            }),
            invalidatesTags:["Product"]
        }),
        updateProduct:build.mutation({
           query:({id,formData})=>({
               url:`api/products/${id}`,
               method:"PUT",
               body:formData
           }),
           invalidatesTags:["Product"]
        })
    })
})

export const{useGetProductsQuery, useDeleteProductMutation,useCreateProductMutation,useUpdateProductMutation}=productApiSlice