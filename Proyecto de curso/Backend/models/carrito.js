import mongoose from 'mongoose'

const carritoCollection = 'carrito'

const CarritoSchema = new mongoose.Schema({
    name: {type: String, require: true},
    timestamp: {type: String, require: true},
    description: {type: String, require: true},
    code: {type: Number, require: true},
    stock: {type: Number, require: true},
    price: {type: Number, require: true},
    thumbnail: {type: String, require: true}

})

export const productos = mongoose.model(carritoCollection, CarritoSchema)

/*
{
    "id": 1,
    "timestamp": 4917971971,
    "productos": [
      {
        "name": "lavadora",
        "timestamp": 466146,
        "description": "Soy una lavadora",
        "code": 12345,
        "stock": 10,
        "price": 2990,
        "thumbnail": "http://www.google.cl",
        "id": 1
      },
      {
        "name": "lavadora",
        "timestamp": 466146,
        "description": "Soy una lavadora",
        "code": 12345,
        "stock": 10,
        "price": 2990,
        "thumbnail": "http://www.google.cl",
        "id": 2
      }
    ]
  }*/