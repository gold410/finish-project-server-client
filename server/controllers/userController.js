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
    if(!email.includs('@')||!email.includs('.')){
        return res.status(409).json({message:"error emeil"})
    }
   const strongPassword = /^(?=.*[A-Za-z])(?=.*[^A-Za-z0-9]).{6,}$/;
   if(!strongPassword.test(password)){
        return res.status(400).json({message:"password is not strong"})
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

const updateUser = async (req, res) => {
    const { userName, password, name, email, phone } = req.body
    const {id}=req.params
console.log("user._id:", user._id);
    // בדיקה בסיסית
    if (!_id) {
        
        return res.status(400).json({ message: '_id' });
    }
     if (!userName) {
        
        return res.status(400).json({ message: 'userName' });
    }
     if (!name) {
        
        return res.status(400).json({ message: 'name' });
    }




    const objectId = mongoose.Types.ObjectId(_id);

    // בדיקה אם יש משתמש אחר עם אותו userName
    const checkUnique = await User.findOne({ userName, _id: { $ne: objectId } });
    if (checkUnique) {
        return res.status(409).json({ message: 'userName is not unique' });
    }

    // מצא את המשתמש הקיים
    const user = await User.findById(objectId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    // עדכון שדות
    user.userName = userName;
    user.name = name;
    user.email = email;
    user.phone = phone;

    // אם הסיסמה שונתה
    if (password) {
        user.password = await bcrypt.hash(password, 10);
    }
    console.log("user._id:", user._id); // עכשיו user מוגדר

    const updatedUser = await user.save();

    // החזרת המשתמש המעודכן בלי סיסמה
    const userToReturn = updatedUser.toObject();
    delete userToReturn.password;

    res.json(userToReturn);
};





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
