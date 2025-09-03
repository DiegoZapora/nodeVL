//Modulos
const express = require('express')
const app = express()
const porta = 8085
const handleBars = require("express-handlebars")
const mongoose = require("mongoose")
const path = require("path")
const session = require("express-session")
const flash = require("connect-flash")

//Modulos Rotas

const admin = require("./routes/admin.js")

//Config

app.use(session({
    secret: "andrematos",
    resave: true,
    saveUninitialized: true
}))
app.use(flash())
app.use((req, res, next) => {
    res.locals.sucessoMSG = req.flash("sucessoMSG")
    res.locals.erroMSG = req.flash("erroMSG")
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

app.get("/", (req, res) => {
    res.send("Rota principal")
})

app.use('/admin', admin)

//Rodando

app.listen(porta, () => {
    console.log("Servidor Rodando!")
})