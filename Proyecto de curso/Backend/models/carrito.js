import mongoose from 'mongoose'
import * as model from './productos.js'



const Schema = model.productos.schema

const carritoCollection = 'carrito'

const CarritoSchema = new mongoose.Schema({
    timestamp: { type: String, require: true },
    productos: [Schema]
})

export const carrito = mongoose.model(carritoCollection, CarritoSchema)
