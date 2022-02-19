const {options} = require('./options/mariaDB')
const knex = require('knex')(options)

knex.schema.createTable('articulos', table => {
    table.increments('id').primary()
    table.string('name', 15).notNulltable()
    table.integer('codigo', 10).notNulltable()
    table.float('precio')
    table.integer('stock')


})
    .then(() => console.log("tabla creada"))
    .catch((error) => {console.log(error); throw error})
    .finally(()=> {
        knex.destroy()
    })