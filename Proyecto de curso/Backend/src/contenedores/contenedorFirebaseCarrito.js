
import admin from "firebase-admin";
import serviceAccount from "../../DB/basenode-7c58e-firebase-adminsdk-c0rj9-63e403090c.json"



let adminUser = true

const today = Date.now()

class ContenedorArchivo {
    constructor() {
    }

    async seeCart(idcart) {

        admin.initializeApp({ credential: admin.credential.cert(serviceAccount) })
        const db = admin.firestore()
        const query = db.collection("carrito")

        try {

            let doc = query.doc(`${idcart}`)
            const item = await doc.get()


            const response = item.data()


            console.log(response)


        } catch (error) {
            console.log(error)
        }


    }

    async createCart() {

        admin.initializeApp({ credential: admin.credential.cert(serviceAccount) })
        const db = admin.firestore()
        const query = db.collection("carrito")

        try {

            const doc = query.doc()
            await doc.create({})



        } catch (error) {
            console.log(error)
        }

    }

    async addProductCart(body, idprod) {

        admin.initializeApp({ credential: admin.credential.cert(serviceAccount) })
        const db = admin.firestore()
        const query = db.collection("carrito")

        try {

            let doc = query.doc()
            const item = await doc.update({
                productos: productos.push(body)
            })





        } catch (error) {
            console.log(error)
        }



    }

    async deleteProductById(id, id_prod) {

        admin.initializeApp({ credential: admin.credential.cert(serviceAccount) })
        const db = admin.firestore()
        const query = db.collection("carrito")

        try {

            let doc = query.doc(`${id}`)
            const item = await doc.update({
                productos: productos.filter(product => product.id !== id_prod)
            })





        } catch (error) {
            console.log(error)
        }


    }

    async deleteCart(idcart) {

        admin.initializeApp({ credential: admin.credential.cert(serviceAccount) })
        const db = admin.firestore()
        const query = db.collection("carrito")

        try {

            const doc = query.doc(`${idcart}`)
            let item = await doc.delete()

        } catch (error) {
            console.log(error)
        }



    }




}



export default ContenedorArchivo