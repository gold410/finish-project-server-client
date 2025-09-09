const mongoose=require("mongoose")

const productSchema=new mongoose.Schema({
    productName:{
        type: String,
        required:true,
    },
    price:{
        type: String,
        required:true 
    },
    image:{
        type: String,
        required:true,
    },
    description:{
        type: String
    },
    kategory:{
        type:String,
        enum:["בגדי נשים",
            "בגדי גברים",
            "ילדים",
            "בית ומטבח",
            "נעליים",
            "תכשיטים",
            "צעצועים",
            "תינוקות",
           " מכשירי חשמל"],
    },
    //מלאי
    inventory:{
        type:Number
    },
    seller:{
        type:mongoose.Schema.Types.ObjectId,
        // required:true,
        ref:"Seller"
    },
    comments:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Comment"
    }

},{
    timestamps: true
})
module.exports=mongoose.model("Product",productSchema)