import admin from "firebase-admin";
import serviceAccount from "../../DB/basenode-7c58e-firebase-adminsdk-c0rj9-63e403090c.json"



let adminUser = true

const today = Date.now()

class ContenedorArchivo {
    constructor() {

    }

    async readAll() {

        admin.initializeApp({ credential: admin.credential.cert(serviceAccount) })
        const db = admin.firestore()
        const query = db.collection("productos")

        try {

            const querySnapshot = await query.get()
            let docs = querySnapshot.docs

            const response = docs.map((doc) => ({
                id: doc.id,
                name: doc.data().name,
                timestamp: doc.data().timestamp,
                description: doc.data().description,
                code: doc.data().code,
                stock: doc.data().stock,
                price: doc.data().price,
                thumbnail: doc.data().thumbnail
            }))

            console.log(response)



        } catch (error) {
            console.log(error)
        }
    }



    async readid(idprod) {

        admin.initializeApp({ credential: admin.credential.cert(serviceAccount) })
        const db = admin.firestore()
        const query = db.collection("productos")

        try {


            let doc = query.doc(`${idprod}`)
            const item = await doc.get()


            const response = item.data()


            console.log(response)



        } catch (error) {
            console.log(error)
        }

    }

    async addProduct(body) {

        admin.initializeApp({ credential: admin.credential.cert(serviceAccount) })
        const db = admin.firestore()
        const query = db.collection("productos")

        try {

            const doc = query.doc()
            await doc.create({ ...body })

        } catch (error) {
            console.log(error)
        }


    }

    async modifyproduct(idMod, body) {


        admin.initializeApp({ credential: admin.credential.cert(serviceAccount) })
        const db = admin.firestore()
        const query = db.collection("productos")

        try {

            const doc = query.doc(`${idMod}`)
            let item = await doc.update({ ...body })

        } catch (error) {
            console.log(error)
        }

    }


    async deleteProduct(idParm) {

        admin.initializeApp({ credential: admin.credential.cert(serviceAccount) })
        const db = admin.firestore()
        const query = db.collection("productos")

        try {

            const doc = query.doc(`${idParm}`)
            let item = await doc.delete()

        } catch (error) {
            console.log(error)
        }


    }




}



export default ContenedorArchivo