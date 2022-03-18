/*import { promises as fs} from 'fs'*/
import fs from 'fs'

let admin = true

const today = Date.now()

class ContenedorArchivo {
    constructor(ruta) {
        this.ruta = ruta;
    }

    readAll() {

        let productsArray = JSON.parse(fs.readFileSync(this.ruta))
        let id = productsArray.length + 1
        return productsArray
    }

    readid(id) {

        let productsArray = JSON.parse(fs.readFileSync(this.ruta))
        if (productsArray.find(archivo => archivo.id == id) == null) {
            return { error: 'producto no encontrado' }
        } else {
            return productsArray.find(archivo => archivo.id == id)
        }

    }

    addProduct(body) {

        if (admin) {
            let productsArray = JSON.parse(fs.readFileSync(this.ruta))
            let id = productsArray.length + 1
            productsArray.push({
                "name": body.name,
                "timestamp": today,
                "description": body.description,
                "code": body.code,
                "stock": body.stock,
                "price": body.price,
                "thumbnail": body.thumbnail,
                "id": id
            })
            id++
            fs.writeFileSync(this.ruta, JSON.stringify(productsArray, null, 2));
            res.send(productsArray)
        } else {
            res.send("No tienes permiso")
        }



    }

    modifyproduct(idMod, body) {
        if (admin) {

            let productsArray = JSON.parse(fs.readFileSync(this.ruta))

            let id = productsArray.findIndex(x => x.id == idMod);
            if (body.name != undefined) {
                productsArray[id].name = body.name
            }
            if (body.description != undefined) {
                productsArray[id].description = body.description
            }
            if (body.code != undefined) {
                productsArray[id].code = body.code
            }
            if (body.stock != undefined) {
                productsArray[id].stock = body.stock
            }
            if (body.price != undefined) {
                productsArray[id].price = body.price
            }
            if (body.thumbnail != undefined) {
                productsArray[id].thumbnail = body.thumbnail
            }

            fs.writeFileSync(this.ruta, JSON.stringify(productsArray, null, 2));

            return productsArray

        } else {
            return "No tienes permiso"
        }
    }

    deleteProduct(idParm) {

        if (admin) {

            let productsArray = JSON.parse(fs.readFileSync(this.ruta))
            productsArray = productsArray.filter(x => x.id != idParm)
            fs.writeFileSync(this.ruta, JSON.stringify(productsArray, null, 2));
            return productsArray

        } else {
            return "No tienes permiso"
        }
    }

    seeCart(id) {

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