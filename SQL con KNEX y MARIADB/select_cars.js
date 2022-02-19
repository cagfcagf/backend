const {options} = require('./options/mariaDB')
const knex = require('knex')(options)


knex.from('articulos').select("*")
    .then((rows) => {
        for (row of rows) {
            console.log(`${row['id']} ${row['name']} ${row['codigo']} ${row['precio']} ${row['stock']}`)
        }
    } 
    )
    .catch((error) => {console.log(error); throw error})
    .finally(()=> {
        knex.destroy()
    })

