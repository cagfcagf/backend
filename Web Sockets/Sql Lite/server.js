const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const {options} = require('./options/sqlDB')
const knex = require('knex')(options)

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const mensajes = []

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname})
})

httpServer.listen(3000, () => console.log('SERVER ON')) // El servidor funcionando en el puerto 3000

io.on('connection', socket => { //"connection" se ejecuta la primera vez que se abre una nueva conexión
    console.log('Usuario conectado') // Se imprimirá solo la primera vez que se ha abierto la conexión    
    socket.emit('mensajes', mensajes)
    socket.on('new-message', data => {
    
    knex('chat_table').insert(data)
    .then(() => console.log("mensaje grabado"))
    .catch((error) => {console.log(error); throw error})


    knex.from('chat_table').select("*")
    .then((mensajes) => {
        io.sockets.emit('mensajes', mensajes)
    } 
    )
    .catch((error) => {console.log(error); throw error})


    
    })
  })


