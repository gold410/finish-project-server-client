const Product = require("../models/Product")

const getAllProducts=async(req,res)=>{
  const products= await Product.find().lean()
  if(!products){
  return res.status(400).json({message:'no products found'})
  }
  res.json(products)
}

const createNewProduct=async(req,res)=>{
    const {productName,price,description,kategory,inventory,unitType}= req.body
    if (!req.file) {
        return res.status(400).json({ message: 'Image file is required' })
    }
    const image=`/uploads/${req.file.filename}`
    if(!productName||!price||!image){
        return res.status(400).json({message:'productName,price,image are required'})
    }
    const newProduct=await Product.create({productName,price,image,description,kategory,inventory,unitType})
    if(newProduct){
        return res.status(201).json({message: "new product created"})
    }
    else{
        return res.status(400).json({message: "invalid product"})
    }
}

const updateProduct=async(req,res)=>{
    const {id} = req.params
    const {productName,price,description,kategory,inventory,unitType}= req.body
    if(!id||!productName||!price){
        return res.status(400).json({message:'id,productName price, are required'})
    }
    const product=await Product.findById(id)
    if(!product){
        return res.status(400).json({message:'product not found'})   
    }

    product.productName = productName ?? product.productName
    product.price = price ?? product.price
    product.description = description ?? product.description
    product.kategory = kategory ?? product.kategory
    product.inventory = inventory ?? product.inventory
   if (unitType) {
  product.unitType = unitType
}
 
    if (req.file) {
    product.image = `/uploads/${req.file.filename}`
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

module.exports={getAllProducts,createNewProduct,updateProduct,deleteProduct}
