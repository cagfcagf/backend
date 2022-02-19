const {options} = require('./options/mariaDB')
const knex = require('knex')(options)


const articulos = [
    {name: 'producto1', codigo: 42525, precio: 658, stock:5 },
    {name: 'producto2', codigo: 2424, precio: 4456, stock:3 },
    {name: 'producto3', codigo: 4454, precio: 456, stock:5 },
    {name: 'producto4', codigo: 75757, precio: 678, stock:4 },
    {name: 'producto5', codigo: 78755, precio: 787, stock:8 }
 
]





knex('articulos').insert(articulos)
    .then(() => console.log("tabla creada"))
    .catch((error) => {console.log(error); throw error})
    .finally(()=> {
        knex.destroy()
    })