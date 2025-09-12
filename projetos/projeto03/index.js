//Modulos
const express = require('express')
const app = express()
const handleBars = require("express-handlebars")
const mongoose = require("mongoose")
const path = require("path")
const session = require("express-session")
const flash = require("connect-flash")
const passport = require("passport")

require("./models/Postagem.js")
const Postagem = mongoose.model("postagens")
require("./models/Categoria.js")
const Categoria = mongoose.model("categorias")
require("./config/auth.js")

//Modulos Rotas

const admin = require("./routes/admin.js")
const usuarios = require("./routes/usuario.js")

//Config

app.use(session({
    secret: "andrematos",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use((req, res, next) => {
    res.locals.sucessoMSG = req.flash("sucessoMSG")
    res.locals.erroMSG = req.flash("erroMSG")
    res.locals.error = req.flash("error")
    res.locals.user = req.user || null
    next()
})

app.engine('handlebars', handleBars.engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(express.static(path.join('./public')))

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/blogapp")
.then(() => {
    console.log("Conectado com sucesso")
})
.catch((err) => {
    console.log(`Erro ao se conectar ${err}`)
})

//Rotas

app.get("/postagem/:slug", (req, res) => {
    Postagem.findOne({slug: req.params.slug}).lean()
    .then((postagem) => {
        if (postagem) {
            res.render("postagem/index", {postagem: postagem})
        } else {
            req.flash("erroMSG", "Esta postagem não existe!")
            res.redirect("/")
        }
    })
    .catch((err) => {
        req.flash("erroMSG", "Houve um erro interno.")
        console.log(err)
        res.redirect("/")
    })
})

app.get("/", (req, res) => {
    Postagem.find().populate("categoria").sort({data: "desc"}).lean()
    .then((postagens) => {
        res.render("index", {postagens: postagens})
    })
    .catch((err) => {
        req.flash("erroMSG", "Não foi possivel carregar as postagens")
        console.log(err)
        res.redirect("/404")
    })
})

app.get("/categorias", (req, res) => {
    Categoria.find().lean()
    .then((categorias) => {
        res.render("categorias/index", {categorias: categorias})
    })
    .catch((err) => {
        req.flash("erroMSG", "Erro interno")
        console.log(err)
        res.redirect("/")
    })
})

app.get("/categorias/:slug", (req, res) => {
    Categoria.findOne({slug: req.params.slug}).lean()
    .then((categoria) => {
        if (categoria) {
            
            Postagem.find({categoria: categoria._id}).lean()
            .then((postagens) => {
                res.render("categorias/postagens", {postagens: postagens, categoria: categoria})
            })
            .catch((err) => {
                req.flash("erroMSG", "Erro ao listar postagens.")
                res.redirect("/")
            })

        } else {
            req.flash("erroMSG", "Esta categoria não existe!")
            res.redirect("/")
        }
    })
    .catch((err) => {
        req.flash("erroMSG", "Erro interno!")
        console.log(err)
        res.redirect("/")
    })
})

app.get("/404", (req, res) => {
    res.send("Erro 404!")
})

app.use('/admin', admin)
app.use("/usuarios", usuarios)

//Rodando

const porta = process.env.PORT || 8085

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Conectado ao MongoDB Atlas!"))
.catch(err => console.error("Erro ao conectar:", err));

app.listen(porta, () => {
    console.log("Servidor Rodando!")
})