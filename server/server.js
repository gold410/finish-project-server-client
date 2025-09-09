require ("dotenv").config()
const express=require("express")
const cors=require("cors")
const mongoose=require('mongoose')
//const multer=require('multer')
const verifyJWT=require('./middleware/verifyJWT')

const corsOptions = require("./config/corsOptions")
const connectDB=require("./config/dbConn")
const upload = require('./middleware/uploads');


connectDB()
const app=express()
const PORT=process.env.PORT||2500

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.static("public"))

//להחליף להפניות לחנות
app.use("/api/auth",require('./routs/autherRouts'))
app.use(verifyJWT)
app.use('/api/user',verifyJWT,require('./routs/userRouts'))
app.use("/api/products",verifyJWT,require("./routs/productRouts"))
app.use("/api/comment",verifyJWT,require('./routs/commentRouts'))
app.use("/api/order",verifyJWT,require('./routs/orderRouts'))
app.post('/api/uploads',verifyJWT,upload.single('image'),(req,res)=>{
    res.json(req.file)
})

mongoose.connection.once('open',()=>{
    console.log("connect to server success")
    app.listen(PORT,()=>{
        console.log(`server runing on port ${PORT}`)
    })
})
mongoose.connection.on('error',()=>{
    console.log("****error****")
})