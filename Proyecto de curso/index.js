const express = require('express')
const { Router } = express
const fs = require('fs')

const PORT = 8080 || process.env.PORT

const app = express()
const productos = Router()
const carrito = Router()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

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

productos.get('/', function (req, res, next) {

    res.send(productsArray)

})

productos.get('/:id', function (req, res, next) {

    if (productsArray.find(archivo => archivo.id == req.params.id) == null) {
        res.send({ error: 'producto no encontrado' })
    } else {
        res.send(productsArray.find(archivo => archivo.id == req.params.id))
    }

})

productos.post('/', function (req, res, next) {

    if (admin) {
        const productAdd = req.body
        productsArray.push({
            "name": req.body.name,
            "timestamp": today,
            "description": req.body.description,
            "code": req.body.code,
            "stock": req.body.stock,
            "price": req.body.price,
            "thumbnail": req.body.thumbnail,
            "id": id
        })
        id++
        fs.writeFileSync('./productos.txt', JSON.stringify(productsArray, null, 2));
        res.send(productsArray)
    } else {
        res.send("No tienes permiso")
    }
})

productos.put('/:id', function (req, res, next) {

    if (admin) {
        let id = productsArray.findIndex(x => x.id == req.params.id);
        if (req.body.name != undefined) {
            productsArray[id].name = req.body.name
        }
        if (req.body.description != undefined) {
            productsArray[id].description = req.body.description
        }
        if (req.body.code != undefined) {
            productsArray[id].code = req.body.code
        }
        if (req.body.stock != undefined) {
            productsArray[id].stock = req.body.stock
        }
        if (req.body.price != undefined) {
            productsArray[id].price = req.body.price
        }
        if (req.body.thumbnail != undefined) {
            productsArray[id].thumbnail = req.body.thumbnail
        }

        fs.writeFileSync('./productos.txt', JSON.stringify(productsArray, null, 2));
        res.send(productsArray)

    } else {
        res.send("No tienes permiso")
    }
})


productos.delete('/:id', function (req, res, next) {

    if (admin) {

        productsArray = productsArray.filter(x => x.id != req.params.id)
        fs.writeFileSync('./productos.txt', JSON.stringify(productsArray, null, 2));
        res.send(productsArray)

    } else {
        res.send("No tienes permiso")
    }
})



// Carrito

/*GET: '/:id/productos' - Me permite listar todos los productos guardados en el carrito  OK*/

carrito.get('/:id/productos', function (req, res, next) {

    if (cartArray.find(archivo => archivo.id == req.params.id) == null) {
        res.send({ error: 'producto no encontrado' })
    } else {
        res.send(cartArray.find(archivo => archivo.id == req.params.id).productos)
    }

})

/*POST: '/' - Crea un carrito y devuelve su id. OK*/

carrito.post('/', function (req, res, next) {

    const cartAdd = req.body
    cartArray.push({ ...cartAdd, "id": idcart })
    fs.writeFileSync('./carro.txt', JSON.stringify(cartArray, null, 2));
    res.send(`${idcart}`)
    idcart++

})

/*POST: '/:id/productos' - Para incorporar productos al carrito por su id de producto OK */

carrito.post('/:id/productos', function (req, res, next) {

    const cartAdd = req.body
    cartArray[0].productos.push({ ...cartAdd, "id": req.params.id })
    fs.writeFileSync('./carro.txt', JSON.stringify(cartArray, null, 2));

})

/*DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto OK*/

carrito.delete('/:id/productos/:id_prod', function (req, res, next) {

    const index_cart = cartArray.findIndex(x => x.id == req.params.id)
    const index_product = cartArray[index_cart].productos.findIndex(x => x.id == req.params.id_prod)

    cartArray[index_cart].productos.splice(index_product, 1);

    fs.writeFileSync('./carro.txt', JSON.stringify(cartArray, null, 2));
    res.send(cartArray)
})

/*DELETE: '/:id' - Vacía un carrito y lo elimina. OK*/

carrito.delete('/:id', function (req, res, next) {

    cartArray = cartArray.filter(x => x.id != req.params.id)
    fs.writeFileSync('./carro.txt', JSON.stringify(cartArray, null, 2));
    res.send(cartArray)
    
})



