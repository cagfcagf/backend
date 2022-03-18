import { Router } from "express"
const carrito = Router()


//import carroApi from "../daos/carrito/carritoDaoArchivo.js";

import carroApi from "../daos/carrito/carritoDaoMongo.js";






// Carrito

/*GET: '/:id/productos' - Me permite listar todos los productos guardados en el carrito  OK*/

carrito.get('/:id/productos', function (req, res, next) {

    res.send(carroApi.seeCart(req.params.id))
})

/*POST: '/' - Crea un carrito y devuelve su id. OK*/

carrito.post('/', function (req, res, next) {

    res.send(carroApi.createCart(req.body))
    

})

/*POST: '/:id/productos' - Para incorporar productos al carrito por su id de producto OK */

carrito.post('/:id/productos', function (req, res, next) {

    res.send(carroApi.addProductCart(req.body, req.params.id))

})

/*DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto OK*/

carrito.delete('/:id/productos/:id_prod', function (req, res, next) {

  
    res.send(carroApi.deleteProductById(req.params.id, req.params.id_prod))
})

/*DELETE: '/:id' - Vacía un carrito y lo elimina. OK*/

carrito.delete('/:id', function (req, res, next) {


    res.send(carroApi.deleteCart(req.params.id))
    
})

export default carrito