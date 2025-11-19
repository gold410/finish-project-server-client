const Product = require("../models/Product")

const getAllProducts=async(req,res)=>{
    //.skip(20).limit(20).populate("saller")
  const products= await Product.find().lean()
  if(!products){
  return res.status(400).json({message:'no products found'})
  }
  res.json(products)
}

const getProductById=async(req,res)=>{
    const{id}=req.params
    const product=await Product.findById(id).lean()
    if(!product){
        return res.status(404).json({message: "id not exist"})
    }
    else{
        return res.status(201).json(product)
    }
}

const createNewProduct=async(req,res)=>{
    const {productName,price,description,kategory,inventory,unitType,originalPrice }= req.body
    if (!req.file) {
        return res.status(400).json({ message: 'Image file is required' })
    }
    const image=`/uploads/${req.file.filename}`
    if(!productName||!price||!image){
        return res.status(400).json({message:'productName,price,image are required'})
    }
    const newProduct=await Product.create({productName,price,image,description,kategory,inventory,unitType,originalPrice })
    if(newProduct){
        return res.status(201).json({message: "new product created"})
    }
    else{
        return res.status(400).json({message: "invalid product"})
    }

}

const updateProduct=async(req,res)=>{
    const {id} = req.params
    const {productName,price,description,kategory,inventory,unitType,originalPrice }= req.body
    if(!id){
        return res.status(400).json({message:'id,productName price, are required'})
    }
    const product=await Product.findById(id)
    if(!product){
        return res.status(400).json({message:'product not found'})   
    }

    if (productName !== undefined) product.productName = productName;
    if (price !== undefined) product.price = price;
    if (description !== undefined) product.description = description;
    if (kategory !== undefined) product.kategory = kategory;
    if (inventory !== undefined) product.inventory = inventory;
    if (unitType !== undefined) product.unitType = unitType;
   if (unitType) {
  product.unitType = unitType;
}
if (originalPrice !== undefined) {
    product.originalPrice = originalPrice;
}
 
    if (req.file) {
    product.image = `/uploads/${req.file.filename}`;
}

    const updatedProduct=await product.save()
    res.json(`${updatedProduct.productName} updated`)
}

const deleteProduct=("/:id",async(req,res)=>{
    const {id}=req.params
    const product=await Product.findById(id)
    if(!product){
        return res.status(400).json({message:'product not found'})
    }
    const name=product.productName
    const result =await product.deleteOne()
    res.json(`${name} deleted`)
})

module.exports={getAllProducts,createNewProduct,getProductById,updateProduct,deleteProduct}
