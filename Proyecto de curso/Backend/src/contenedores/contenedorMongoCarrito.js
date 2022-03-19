import { timeStamp } from "console";
import mongoose from "mongoose";

import * as model from '../../models/carrito.js'


let admin = true

const today = Date.now()

class ContenedorArchivo {
    constructor(ruta) {
        this.ruta = ruta;
    }


    seeCart(idcart) {

        mongoose.connect(this.ruta.cnxStr)
            .then(async () => {
                try {

                    let cartArray = await model.carrito.find({ _id: idcart })
                    console.log(cartArray)

                } catch (error) {
                    console.log(error)
                } finally {
                    mongoose.disconnect().catch((err) => {
                        console.log(err)
                    })
                }
            })


    }

    createCart() {

        mongoose.connect(this.ruta.cnxStr)
            .then(async () => {
                try {

                    await new model.carrito({ timeStamp: today }).save()


                } catch (error) {
                    console.log(error)
                } finally {
                    mongoose.disconnect().catch((err) => {
                        console.log(err)
                    })
                }
            })

    }

    addProductCart(body, idprod) {

        mongoose.connect(this.ruta.cnxStr)
            .then(async () => {
                try {
                    const cartAdd = body
                    await new model.carrito({ ...body, _id: idprod }).save()



                } catch (error) {
                    console.log(error)
                } finally {
                    mongoose.disconnect().catch((err) => {
                        console.log(err)
                    })
                }
            })









    }

    deleteProductById(id, id_prod) {


        mongoose.connect(this.ruta.cnxStr)
            .then(async () => {
                try {

                    await model.carrito.updateMany(
                        { _id: id },
                        { $pull: { producto: { _id: id_prod } } }
                    )



                } catch (error) {
                    console.log(error)
                } finally {
                    mongoose.disconnect().catch((err) => {
                        console.log(err)
                    })
                }
            })

    }

    deleteCart(idcart) {

        mongoose.connect(this.ruta.cnxStr)
            .then(async () => {
                try {

                    await model.carrito.deleteOne({ _id: idcart })



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