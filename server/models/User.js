const mongoose=require("mongoose")

const usersSchema=new mongoose.Schema({
    userName:{
        type: String,
        required:true,
        unique: true
    },
    password:{
        type: String,
        required:true
    },
    name:{
        type: String,
        required:true 
    },
    email:{
        type: String,
        lowercase: true,
        trim:true
    },
    phone:{
        type: String
    },
    roles:{
        type: String,
        enum:["User","Seller"],
        default:"User"
    },
    active:{
        type:Boolean,
        default:true
    },
    address:{
        city:{
            type:string
        },
        street:{
            type:string
        },
        buildingNumber:{
            type:string
        },
        housNumber:{
            type:string
        }
    }
},{
    timestamps: true
})
module.exports=mongoose.model("User",usersSchema)