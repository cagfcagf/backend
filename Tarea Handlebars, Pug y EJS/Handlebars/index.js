const express = require('express')
const { Router } = express
const exphbs = require('express-handlebars')

const app = express()
const router = Router()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/productos', router)

app.engine(
    "hbs", 
    exphbs.engine({
        extname: ".hbs",
        defaultLayout: "index.hbs",
        layoutsDir: __dirname + "/views/layouts",
        partialsDir: __dirname + "/views/partials/"

    }

    )
)




let productsArray = [
    {
        "title": 'lavadora',
        "price": 2990,
        "thumbnail": 'https://cdn3.iconfinder.com/data/icons/spring-2-1/30/Backpack-256.png',
        "id": 1
    },
    {
        "title": 'perro',
        "price": 5990,
        "thumbnail": 'https://cdn3.iconfinder.com/data/icons/spring-2-1/30/Rainbow-128.png',
        "id": 2
    }
]




app.listen(8080)

app.set('view engine', 'hbs');
app.set('views', './views')

let id = productsArray.length + 1

router.post('/', (req, res) => {
    
   
    productsArray.push({...req.body, "id": id})
    id++

    res.render('./partials/base.hbs', {productsArray})
    
})    


router.get('/', (req, res) => {
 
    res.render('./partials/formulario.hbs', {productsArray})
})    
