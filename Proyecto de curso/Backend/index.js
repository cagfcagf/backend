import express from 'express'

import cors from 'cors'

import productos from './src/routers/productos.js'
import carrito from './src/routers/carrito.js'
import config from './src/config.js'


const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors());





app.use('/api/productos', productos)
app.use('/api/carrito', carrito)

app.listen(config.PORT, () => {
    console.log(`Escuchando en http://localhost:${config.PORT}`)
})









