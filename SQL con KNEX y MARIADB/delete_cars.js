const {options} = require('./options/mariaDB')
const knex = require('knex')(options)


knex('articulos').where({ id: 3 })
.del()
    .then(() => {
        console.log('Se elimino de la data')
    } 
    )
    .catch((error) => {console.log(error); throw error})
    .finally(()=> {
        knex.destroy()
    })