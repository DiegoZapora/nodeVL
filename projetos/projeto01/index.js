const express = require("express")
const app = express()
const porta = 8085
const Post = require("./models/Post")

const handlebars = require("express-handlebars")
const bodyParser = require('body-parser')

//Handle
app.engine('handlebars', handlebars.engine({
    defaultLayout: 'main',
}))
app.set('view engine', 'handlebars')

//Body-Parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//Rotas
app.get("/cadastro", (req, res) => {
    res.render('formulario')
})

app.get('/', (req, res) => {
  Post.findAll({order: [['id', 'DESC']]})
  .then((posts) => {
    res.render('home', {posts: posts})
  }) 
})

app.post('/sucesso', (req, res) => {
    Post.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
    })
    .then(() => {
        res.redirect('/')
    })
    .catch((erro) => {
        res.send(`Houve um erro ${erro}`)
    })
})

app.get('/deletar/:id', (req, res) => {
    Post.destroy({where: {'id': req.params.id}})
    .then(() => {
        res.send("Postagem Removida.")
    })
    .catch((erro) => {
        res.send(`Essa postagem não existe!`)
    })
})

app.listen(porta, () => {
    console.log("Servidor Rodando")
})