const express = require('express')
const app = express()
//cargamos el modulo de handlebars

const exphbs = require ('express-handlebars')


app.listen(8080)

// Configuracion de handlebars

app.engine('hbs', exphbs.engine({
        extname: '.hbs',
        defaultLayout: 'index.hbs',
    }))


app.get('/', (req, res) => {
    res.render('datos.hbs', {
        nombre: 'coder',
        apellido: 'house',
        edad: 25,
        email: 'coderarrr',
        telefono: '259464'
    }

    )
})    

app.set('view engine', 'handlebars');

app.set('views', './public')


