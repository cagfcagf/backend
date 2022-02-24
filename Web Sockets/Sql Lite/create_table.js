const {options} = require('./options/sqlDB')
const knex = require('knex')(options)

knex.schema.createTable('chat_table', table => {
    table.increments('id')
    table.string('name', 20)
    table.string('chat', 200)


})
    .then(() => console.log("tabla creada"))
    .catch((error) => {console.log(error); throw error})
    .finally(()=> {
        knex.destroy()
    })