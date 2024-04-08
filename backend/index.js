const express = require('express')
const mongoose = require('mongoose')
const Product = require("./Model/product.model")

const app = express()

app.use(express.json())

app.use(express.urlencoded({ extended:true}))

app.get("/",(req,res)=>{
    res.send("You are in homepage")
})

app.get('/get',async(req,res)=>{
    try{
        const products = await Product.find()
        if(products.length > 0) res.send({status:'success',data:products})
        else res.send({status:'success',msg:"Product not found"})
    }catch(err){
        res.send({status:'error',msg:"internal server error",err})
    }
})

app.post("/create",async(req,res)=>{
    try {
    console.log(req.body)
    const product = await new Product(req.body)
    product.save((error,success)=>{
if(error){
    res.send({status:'error',msg:'data not save',error})
}else{
res.send({status:"success",msg:"data saved successfully"})
}
    }
    )
    } catch (error) {
        console.log("Error While Creating",error)
    }

})

app.patch("/update/:id",async(req,res)=>{
    try{
const _id = req.params.id;
const updateProduct = await Product.findByIdAndUpdate({_id},req.body);
updateProduct.save((error,success)=>{
    if(error){
        res.send({status:'error',msg:'data not saved'})
    }else{
        res.send({status:'success',msg:'data saved successfully'})
    }
})
    }catch (error) {
        console.log("Error updating:",error)
    }
})

app.delete("/delete/:id",async(req,res)=>{
    try{
const _id = req.params.id;
console.log("id",_id)
const deleteProduct = await Product.deleteOne({_id});
     return res.send({status:'success',msg:'data deleted successfully'})

    }catch (error) {
        console.log("Error deleting:",error)
    }
})


app.listen(8080,()=>{

    mongoose.connect("mongodb+srv://aknath_08:9H4BTiN8yKn3EvHT@cluster0.hfkca9p.mongodb.net/?retryWrites=true&w=majority").then(()=>{
        console.log("mongoose database connected")
        console.log("Port 8080 Running")

    }).catch((err)=>{
    console.log(err)
    })

    
})