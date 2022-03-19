import mongoose from 'mongoose'

const productosCollection = 'productos'

const ProductosSchema = new mongoose.Schema({
    name: { type: String, require: true },
    timestamp: { type: String, require: true },
    description: { type: String, require: true },
    code: { type: Number, require: true },
    stock: { type: Number, require: true },
    price: { type: Number, require: true },
    thumbnail: { type: String, require: true }

})

export const productos = mongoose.model(productosCollection, ProductosSchema)