const express = require("express")
const router = express.Router()

const mongoose = require("mongoose")
require("../models/Categoria")
const Categoria = mongoose.model("categorias")

router.get('/', (req, res) => {
    res.render("admin/index")
})

router.get('/posts', (req, res) => {
    res.send("Posts")
})

router.get("/categorias", (req, res) => {
    res.render("admin/categorias")
})

router.get("/categorias/add", (req, res) => {
    res.render("admin/addcategorias")
})

router.post("/categorias/nova", (req, res) => {
    
    let erros = []

    if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
        erros.push({texto: "Nome inválido."})
    }

    if (!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null) {
        erros.push({texto: "Slug inválido."})
    }

    if(req.body.nome.length <= 1) {
        erros.push({texto: "Nome da categoria muito curto."})
    }

    if (erros.length > 0) {
        res.render("./admin/addcategorias", {erros: erros})
    } else {
        const novaCategoria = {
            nome: req.body.nome,
            slug: req.body.slug
        }

        new Categoria(novaCategoria).save()
        .then(() => {
            req.flash("sucessoMSG", "Categoria criada com sucesso")
            res.redirect("/admin/categorias")
        })
        .catch((erro) => {
            req.flash("erroMSG", "Erro ao salvar a categoria! Tente novamente.")
            res.redirect("/admin")
        })
    }
})

module.exports = router