//Modulos

const express = require('express')
const app = express()
const porta = 8085
const handleBars = require("express-handlebars")
const mongoose = require("mongoose")
const path = require("path")

//Modulos Rotas

const admin = require("./routes/admin.js")

//Config

app.engine('handlebars', handleBars.engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(express.static(path.join('./public')))

//Rotas

app.get("/", (req, res) => {
    res.send("Rota principal")
})

app.use('/admin', admin)

//Rodando

app.listen(porta, () => {
    console.log("Servidor Rodando!")
})