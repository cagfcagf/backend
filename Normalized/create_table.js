const {options} = require('./options/sqlDB')
const knex = require('knex')(options)

knex.schema.createTable('chat_table_2', table => {
    table.increments('id')
    table.string('email', 20)
    table.string('username', 200)
    table.string('lastname', 200)
    table.string('edad', 200)
    table.string('alias', 200)
    table.string('text', 200)



})
    .then(() => console.log("tabla creada"))
    .catch((error) => {console.log(error); throw error})
    .finally(()=> {
        knex.destroy()
    })


