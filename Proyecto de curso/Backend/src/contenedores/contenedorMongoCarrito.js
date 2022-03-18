import mongoose from "mongoose";

import * as model from '../../models/carrito.js'


let admin = true

const today = Date.now()

class ContenedorArchivo {
    constructor(ruta) {
        this.ruta = ruta;
    }

    
    seeCart(id) {

        mongoose.connect(this.ruta.cnxStr)
        .then(async () => {
            try {
                let productsArray = await model.productos.find()
                console.log(productsArray)
            } catch (error) {
                console.log(error)
            } finally {
                mongoose.disconnect().catch((err) => {
                    console.log(err)
                })
            }
        })


        let cartArray = JSON.parse(fs.readFileSync(this.ruta))

        if (cartArray.find(archivo => archivo.id == id) == null) {
            return 'producto no encontrado'
        } else {
            return cartArray.find(archivo => archivo.id == id).productos

        }

    }

    createCart(body) {
        const cartAdd = body
        let cartArray = JSON.parse(fs.readFileSync(this.ruta))
        let idcart = cartArray.length + 1
        cartArray.push({ ...cartAdd, "id": idcart })
        fs.writeFileSync(this.ruta, JSON.stringify(cartArray, null, 2));

        return `${idcart}`

    }

    addProductCart(body, id) {
        let cartArray = JSON.parse(fs.readFileSync(this.ruta))
        const cartAdd = body
        cartArray[0].productos.push({ ...cartAdd, "id": id })
        fs.writeFileSync(this.ruta, JSON.stringify(cartArray, null, 2));
    }

    deleteProductById(id, id_prod) {
        let cartArray = JSON.parse(fs.readFileSync(this.ruta))
        const index_cart = cartArray.findIndex(x => x.id == id)
        const index_product = cartArray[index_cart].productos.findIndex(x => x.id == id_prod)

        cartArray[index_cart].productos.splice(index_product, 1);

        fs.writeFileSync(this.ruta, JSON.stringify(cartArray, null, 2));
        return cartArray
    }

    deleteCart(id) {
        let cartArray = JSON.parse(fs.readFileSync(this.ruta))
        cartArray = cartArray.filter(x => x.id != id)
        fs.writeFileSync(this.ruta, JSON.stringify(cartArray, null, 2));
        return cartArray
    }
    


}




export default ContenedorArchivo