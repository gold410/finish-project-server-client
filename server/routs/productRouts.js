const express=require("express")
const router=express.Router()
const productController=require("../controllers/productController")
const upload = require("../middleware/uploads")

router.get("/getAll", productController.getAllProducts); // קודם כל הנתיב המפורש
//router.get("/:id", productController.getProductById);    // ואז הנתיב עם מזהה
 router.post("/", upload.single("image"), productController.createNewProduct)
 router.delete("/:id",productController.deleteProduct)
 router.put("/",productController.updateProduct)

module.exports=router