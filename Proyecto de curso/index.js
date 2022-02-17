const express = require('express')
const { Router } = express
const fs = require ('fs')

const PORT = 8080 || process.env.PORT

const app = express()
const productos = Router()
const carrito = Router()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const today = Date.now()

let productsArray = JSON.parse(fs.readFileSync('./productos.txt'))

let id = productsArray.length + 1


let cartArray = JSON.parse(fs.readFileSync('./carro.txt'))

let idcart = cartArray.length + 1

let admin = true


app.use('/api/productos', productos)
app.use('/api/carrito', carrito)

app.listen(PORT, () => {
    console.log(`Escuchando en http://localhost:${PORT}`)
})

// Productos

productos.get('/:id', function(req,res,next){
    
  

    if (productsArray.find(archivo => archivo.id == req.params.id) == null) {
        res.send({ error : 'producto no encontrado' })
    } else {        
    res.send(productsArray.find(archivo => archivo.id == req.params.id))
    }

   
})

productos.post('/', function(req,res,next){
    if(admin) {
        const productAdd = req.body
    productsArray.push({...productAdd, "id": id})
    id++
    fs.writeFileSync('./productos.txt', JSON.stringify(productsArray, null, 2));
    res.send(productsArray)
    } else {
        res.send("No tienes permiso")
    }
})

productos.put('/:id', function(req,res,next){
    
    if (admin) {
        const id = req.params.id - 1
        productsArray[id].name = req.body.name
        productsArray[id].timestamp = today
        productsArray[id].description = req.body.description
        productsArray[id].code = req.body.code
        productsArray[id].stock = req.body.stock
        productsArray[id].price = req.body.price
        productsArray[id].thumbnail = req.body.thumbnail
        fs.writeFileSync('./productos.txt', JSON.stringify(productsArray, null, 2));
        res.send(productsArray)

    } else {
        res.send("No tienes permiso")
    }


})


productos.delete('/:id', function(req,res,next){

    if(admin) {

        productsArray = arrayRemove(productsArray, req.params.id);
        fs.writeFileSync('./productos.txt', JSON.stringify(productsArray, null, 2));
    res.send(productsArray)

    } else {
        res.send("No tienes permiso")
    }
        

})



// Carrito

carrito.get('/:id/productos', function(req,res,next){
    

    if (cartArray.find(archivo => archivo.id == req.params.id) == null) {
        res.send({ error : 'producto no encontrado' })
    } else {        
        res.send(cartArray.find(archivo => archivo.id == req.params.id).productos)
    }

   
})

carrito.post('/', function(req,res,next){
    const cartAdd = req.body
    cartArray.push({...cartAdd, "id": id})
    fs.writeFileSync('./carro.txt', JSON.stringify(cartArray, null, 2));
    res.send(id)
    idcart++
})

carrito.post('/:id/productos', function(req,res,next){
    const cartAdd = req.body
    cartArray.productos.push({...cartAdd, "id": req.params.id})
    fs.writeFileSync('./carro.txt', JSON.stringify(cartArray, null, 2));
})


carrito.delete('/:id/productos/:id_prod', function(req,res,next){
        
    cartArray = arrayRemove(cartArray[req.params.id].productos, req.params.id_prod);
    fs.writeFileSync('./carro.txt', JSON.stringify(cartArray, null, 2));
    res.send(cartArray)
})


function arrayRemove(arr, value) { 
    
    return arr.filter(function(ele){ 
        return ele.id != value; 
    });
}

