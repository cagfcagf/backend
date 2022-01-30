const express = require('express')
const app = express()


app.listen(8080)

// Configuracion de handlebars
app.set('view engine', 'ejs');

app.set('views', './views')

app.get('/datos', (req, res) => {
 
    res.render('nivel.ejs', req.query)
})    
