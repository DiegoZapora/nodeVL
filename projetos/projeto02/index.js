const express = require("express")
const app = express()
const porta = 8085

const handlebars = require("express-handlebars")
const BodyParser = require("body-parser")

const Post = require("./banco/Post")

//Handle
app.engine("handlebars", handlebars.engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')


//BodyParser
app.use(BodyParser.urlencoded({extended: false}))
app.use(BodyParser.json())

//rotas

app.get("/", (req, res) => {
    Post.findAll({order: [['id', 'DESC']]})
    .then((posts) => {
        res.render('home', {posts: posts})
    })
})

app.get("/cadastro", (req, res) => {
    res.render('formulario')
})

app.post("/sucesso", (req, res) => {
    Post.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
    })
    .then(() => {
        res.redirect('/')
    })
    .catch((erro) => {
        res.send(`Ouve um erro ao cadastrar a postagem: ${erro}`)
    })
})

app.listen(porta, () => {
    console.log("Servidor Rodando!")
})