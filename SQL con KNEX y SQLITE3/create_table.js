const {options} = require('./options/mariaDB')
const knex = require('knex')(options)

knex.schema.createTable('articulos', table => {
    table.increments('id')
    table.string('name', 15)
    table.integer('codigo', 10)
    table.float('precio')
    table.integer('stock')


})
    .then(() => console.log("tabla creada"))
    .catch((error) => {console.log(error); throw error})
    .finally(()=> {
        knex.destroy()
    })