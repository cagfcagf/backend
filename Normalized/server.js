const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const { faker } = require('@faker-js/faker')

const {options} = require('./options/sqlDB')
const knex = require('knex')(options)

const {normalize, schema, denormalize} = require("normalizr")

// normalized

const autorSchema = new schema.Entity('users')
const mensajesSchema = new schema.Entity('mensajes')

const mensajeria = new schema.Entity('mensajeria', {
    author: autorSchema,
    text: [ mensajesSchema]
},
    { idAttribute: 'email' }
)





const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const mensajes = []

function generarCombinacion() {
    return {
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        picture: faker.image.avatar()
    }
}

function generarData() {
        const productos= []
        for(let i=1; i< 6; i++) {
            productos.push(generarCombinacion())
        }

        return productos
}





app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname})
})

app.get('/api/productos-test', (req, res) => {

    const productos = generarData()

    function generarbase(productos) {

       
   
        const productosHTML = productos
        .map(prod => `<tr>
        <td>${prod.name}<td>
        <td>${prod.price}<td>
        <td><img src="${prod.picture}" alt="alternatetext"><td>
        </tr>` )
        .join('')

        const tablatotal = `<table>
            ${productosHTML}
        </table>`



    
    return tablatotal
    
    }

    res.send(generarbase(productos))
})

httpServer.listen(3000, () => console.log('SERVER ON')) // El servidor funcionando en el puerto 3000

io.on('connection', socket => { //"connection" se ejecuta la primera vez que se abre una nueva conexión
    console.log('Usuario conectado') // Se imprimirá solo la primera vez que se ha abierto la conexión    
    socket.emit('mensajes', mensajes)
    socket.on('new-message', data => {

        const normalizeddata = normalize(data, mensajeria)
        console.log(normalizeddata)

        const denormalizado = denormalize(normalizeddata.result, mensajeria, normalizeddata.entities )
        console.log(denormalizado)

    
 

    knex('chat_table_2').insert(data)
    .then(() => console.log("mensaje grabado"))
    .catch((error) => {console.log(error); throw error})


    knex.from('chat_table_2').select("*")
    .then((mensajes) => {
        io.sockets.emit('mensajes', mensajes)
    } 
    )
    .catch((error) => {console.log(error); throw error})


    
    })
  })


