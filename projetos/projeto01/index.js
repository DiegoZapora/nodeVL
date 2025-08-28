const express = require("express")
const app = express()
const porta = 8085
const Post = require("./models/Post")

const handlebars = require("express-handlebars")
const bodyParser = require('body-parser')

//Handle
app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

//Body-Parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//Rotas
app.get("/cadastro", (req, res) => {
    res.render('formulario')
})

app.post('/sucesso', (req, res) => {
    res.send(`Titulo: ${req.body.titulo}, Conteudo: ${req.body.conteudo}`)
})

app.listen(porta, () => {
    console.log("Servidor Rodando")
})