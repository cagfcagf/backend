import mongoose from "mongoose";

import * as model from '../../models/productos.js'


let admin = true

const today = Date.now()

class ContenedorArchivo {
    constructor(ruta) {
        this.ruta = ruta;
    }

    readAll() {

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
    }


    readid(idprod) {

        mongoose.connect(this.ruta.cnxStr)
            .then(async () => {
                try {
                    let productsArray = await model.productos.find({ _id: idprod })
                    console.log(productsArray)
                } catch (error) {
                    console.log(error)
                } finally {
                    mongoose.disconnect().catch((err) => {
                        console.log(err)
                    })
                }
            })
    }

    addProduct(body) {

        mongoose.connect(this.ruta.cnxStr)
            .then(async () => {
                try {
                    if (admin) {

                        await new model.productos({
                            name: body.name,
                            timestamp: today,
                            description: body.description,
                            code: body.code,
                            stock: body.stock,
                            price: body.price,
                            thumbnail: body.thumbnail
                        }).save()
                    } else {
                        res.send("No tienes permiso")
                    }

                } catch (error) {
                    console.log(error)
                } finally {
                    mongoose.disconnect().catch((err) => {
                        console.log(err)
                    })
                }
            })
    }

    modifyproduct(idMod, body) {

        mongoose.connect(this.ruta.cnxStr)
            .then(async () => {
                try {
                    if (admin) {

                        let productsArray = await model.productos.updateOne({ _id: idMod }, {
                            $set: {
                                name: body.name,
                                timestamp: today,
                                description: body.description,
                                code: body.code,
                                stock: body.stock,
                                price: body.price,
                                thumbnail: body.thumbnail
                            }
                        })

                    } else {
                        return "No tienes permiso"
                    }
                } catch (error) {
                    console.log(error)
                } finally {
                    mongoose.disconnect().catch((err) => {
                        console.log(err)
                    })
                }
            })
    }


    deleteProduct(idParm) {


        mongoose.connect(this.ruta.cnxStr)
            .then(async () => {
                try {
                    if (admin) {

                        let productsArray = await model.productos.deleteOne({ _id: idParm })
                        console.log(productsArray)

                    } else {
                        return "No tienes permiso"
                    }
                } catch (error) {
                    console.log(error)
                } finally {
                    mongoose.disconnect().catch((err) => {
                        console.log(err)
                    })
                }
            })
    }




}




export default ContenedorArchivo