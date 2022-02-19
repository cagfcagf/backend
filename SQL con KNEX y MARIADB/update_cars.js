const {options} = require('./options/mariaDB')
const knex = require('knex')(options)


knex('articulos').where({ id: 2 })
.update({ stock: '0' })
    .then(() => {
        console.log('Se actualizo la data')
    } 
    )
    .catch((error) => {console.log(error); throw error})
    .finally(()=> {
        knex.destroy()
    })