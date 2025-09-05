const express = require("express")
const router = express.Router()

const mongoose = require("mongoose")
require("../models/Categoria")
const Categoria = mongoose.model("categorias")
require("../models/Postagem")
const Postagem = mongoose.model("postagens")

router.get('/', (req, res) => {
    res.render("admin/index")
})

router.get('/posts', (req, res) => {
    res.send("Posts")
})

router.get("/categorias", (req, res) => {
    Categoria.find().sort({date: 'desc'}).lean()
    .then((categorias) => {
        res.render("admin/categorias", {categorias: categorias})
    })
    .catch((erro) => {
        req.flash("erroMSG", "Erro ao carregar categorias! Tente novamente.")
        res.redirect("/admin")
    })
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

router.get("/categorias/editar/:id", (req, res) => {
    Categoria.findOne({_id: req.params.id}).lean()
    .then((categoria) => {
        res.render("admin/editar", {categoria: categoria})
    })
    .catch((erro) => {
        req.flash('erroMSG', 'Está categoria não existe!')
        res.redirect("/admin/categorias")
    })
})

router.post("/categorias/editar", (req, res) => {

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
        res.render("./admin/editar", {erros: erros})
    } else {
        Categoria.findOne({_id: req.body.id})
        .then((categoria) => {
            categoria.nome = req.body.nome
            categoria.slug = req.body.slug

            categoria.save()
            .then(() => {
                req.flash("sucessoMSG", "Categoria editada com sucesso.")
                res.redirect("/admin/categorias")
            })
            .catch((erro) => {
                req.flash("erroMSG", "Erro ao editar categoria!")
                res.redirect("/admin/categorias")
            })
        })
        .catch((erro) => {
            req.flash("erroMSG", "Houve um erro ao editar a categoria! Tente novamente." + erro)
            res.redirect("/admin/categorias")
        })
    }
})

router.post("/categorias/deletar", (req, res) => {
    Categoria.deleteOne({_id: req.body.id})
    .then(() => {
        req.flash("sucessoMSG", "Categoria deletada com sucesso.")
        res.redirect("/admin/categorias")
    })
    .catch((erro) => {
        req.flash("erroMSG", "Houve um erro ao deltar a categoria.")
        res.redirect("/admin/categorias")
    })
})

router.get("/postagens", (req, res) => {
    Postagem.find().populate("categoria").sort({data: "desc"}).lean()
    .then((postagens) => {
        res.render("admin/postagens", {postagens: postagens})
    })
    .catch((erro) => {
        req.flash("erroMSG", "Erro ao carregar postagens.")
        res.redirect("/admin")
    })
})

router.get("/postagens/add", (req, res) => {
    Categoria.find().lean()
    .then((categorias) => {
        res.render("admin/addpostagens", {categorias: categorias})
    })
    .catch((erro) => {
        req.flash("erroMSG", "Houve um erro ao carregar o formulario")
        res.redirect("/admin")
    })
})

router.post("/postagens/nova", (req, res) => {

    const novaPostagem = {
        titulo: req.body.titulo,
        slug: req.body.slug,
        descricao: req.body.descricao,
        conteudo: req.body.conteudo,
        categoria: req.body.categoria
    }

    new Postagem(novaPostagem).save()
    .then(() => {
        req.flash("sucessoMSG", "Postagem criada com sucesso.")
        res.redirect("/admin/postagens")
    })
    .catch((erro) => {
        req.flash("erroMSG", "Erro ao criar postagem. Tente novamente.")
        res.redirect("/admin/postagens")
    })
})

router.get("/postagens/edit/:id", (req, res) => {

    Postagem.findOne({_id: req.params.id}).lean()
    .then((postagem) => {

        Categoria.find().lean()
        .then((categorias) => {
            res.render("admin/editpostagens", {categorias: categorias, postagem: postagem})
        })
        .catch(() => {
            req.flash("erroMSG", "Houve um erro ao carregar categorias.")
            res.redirect("/admin/postagens")
        })
    })
    .catch(() => {
        req.flash("erroMSG", "Houve um erro ao carregar o formulario de edição")
        res.redirect("/admin/postagens")
    })
})

router.post("/postagem/edit", (req, res) => {
    
    Postagem.findOne({_id: req.body.id})
    .then((postagem) => {

        postagem.titulo = req.body.titulo
        postagem.slug = req.body.slug
        postagem.conteudo = req.body.conteudo
        postagem.descricao = req.body.descricao
        postagem.categoria = req.body.categoria

        postagem.save()
        .then(() => {
            req.flash("sucessoMSG", "Postagem editada com sucesso")
            res.redirect("/admin/postagens")
        })
        .catch(() => {
            req.flash("erroMSG", "Erro ao editar postagem")
            res.redirect("/admin/postagens")
        })

    })
    .catch((err) => {
        req.flash("erroMSG", "Houve um erro ao salvar a edição" + err)
        res.redirect("/admin/postagens")
    })

})

router.post("/postagens/deletar/:id", (req, res) => {
    Postagem.deleteOne({_id: req.params.id})
    .then(() => {
        req.flash("sucessoMSG", "Postagem deletada com sucesso.")
        res.redirect("/admin/postagens")
    })
    .catch(() => {
        req.flash("erroMSG", "Houve um erro ao deletar postagem!")
        res.redirect("/admin/postagens")
    })
})

module.exports = router