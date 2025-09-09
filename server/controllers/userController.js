const User=require("../models/User")
const bcrypt=require("bcrypt")

const getAllUsers=async(req,res)=>{
  const user= await User.find({},{password:0}).lean()
  if(!user.length){
    return res.status(400).json({message:'no user found'})
  }
  res.json(user)
}

const createNewUser=async(req,res)=>{
    const {userName,password,name,email,phone}= req.body
    if(!userName||!password||!name){
        return res.status(400).json({message:'userName,password and name are required'})
    }
    const chekUnique=await User.find({userName})
    if(chekUnique.length>0){
        return res.status(409).json({message:'userName is not unique'})
    }
    const hashPassword=await bcrypt.hash(password,10)

    const newUser=await User.create({userName,password:hashPassword,name,email,phone})
    if(!newUser){
        return res.status(400).json({message: "invalid user"})
    }
    else{
       
        return res.status(201).json({message: `new user ${userName} created`})
    }
   

}
const getUserById=async(req,res)=>{
    const{id}=req.params
    const user=await User.findById(id,{password:0}).lean()
    if(!user){
        
        return res.status(404).json({message: "id not exist"})
    }
    else{
        return res.status(201).json(user) 
    }
}

const updateUser=async(req,res)=>{
    const {_id,userName,password,name,email,phone}= req.body
    if(!userName||!_id||!password||!name){
        return res.status(400).json({message:'userName,password and name are required'})
    }
    const chekUnique=await User.find({userName})
    if(chekUnique.length>0){
        return res.status(409).json({message:'userName is not unique'})
    }
    const hashPassword= await bcrypt.hash(password,10)
    const user=await User.findById(_id)
    if(!user){
        return res.status(400).json({message:'user not found'})   
    }
    user.userName=userName
    user.password=hashPassword
    user.name=name
    user.email=email
    user.phone=phone
    
    const updatedUser=await user.save()
    res.json(`${updatedUser.name} updated`)
}

const deleteUser=async (req,res)=>{
    const {id}=req.body
    const user=await User.findById(id)
    if(!user){
        return res.status(400).json({message:'user not found'})
    }
    const result =await user.deleteOne()
    const name=user.name
    res.json(`${name} deleted`)
}

module.exports={getAllUsers,getUserById,createNewUser,updateUser,deleteUser}
