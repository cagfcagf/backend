import { Router } from "express"
const productos = Router()








// import productosApi from "../daos/producto/productoDaoArchivo.js" 

import productosApi from "../daos/producto/productoDaoMongo.js" 

// Productos

productos.get('/', function (req, res, next) {

    res.send(productosApi.readAll())
   

})

productos.get('/:id', function (req, res, next) {

    res.send(productosApi.readid(req.params.id))

})

productos.post('/', function (req, res, next) {

    res.send(productosApi.addProduct(req.body))

})

productos.put('/:id', function (req, res, next) {

    res.send(productosApi.modifyproduct(req.params.id, req.body))

})


productos.delete('/:id', function (req, res, next) {

    res.send(productosApi.deleteProduct(req.params.id))

})

export default productos