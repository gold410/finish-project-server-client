const express=require("express")
const router=express.Router()
const productController=require("../controllers/productController")
const upload = require("../middleware/uploads")

router.get("/getAll", productController.getAllProducts);
//router.get("/:id", productController.getProductById);
 router.post("/", upload.single("image"), productController.createNewProduct)
 router.delete("/:id",productController.deleteProduct)
 router.put("/:id",productController.updateProduct)

module.exports=router