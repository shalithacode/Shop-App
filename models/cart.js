const fs = require('fs');
const path = require('path')
const rootDir = require("../util/path");
const cartFilePath = path.join(rootDir, "data", "cart.json");


module.exports = class Cart{
    static addProduct(id,productPrice){
fs.readFile(cartFilePath, (err, fileContent)=>{
    let cart = {products:[], totalPrice:0}

    if(!err){
        cart = JSON.parse(fileContent)
    }
    const exsistingProduct = cart.products.find(prod => prod.id ===id)
    let upatedProdct 
    if(exsistingProduct){
        upatedProdct = {...exsistingProduct}
        upatedProdct.qty += 1

    }else{
        upatedProdct = {id:id,qty:1}
    }
    cart.totalPrice +=productPrice;
})
    }
}