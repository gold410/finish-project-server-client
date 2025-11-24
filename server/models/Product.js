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
    unitType:{
        type:String,
        enum:["יח'",
            "קג'",
            ],
         required: false, // עכשיו אפשר להשאיר ריק
         default: "יח'"   // או להגדיר ערך ברירת מחדל
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
        enum:["פרות",
            "ירקות",
            "עלים",
            ],
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