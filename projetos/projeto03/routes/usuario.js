const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
require("../models/Usuario")
const Usuario = mongoose.model("usuarios")
const bcrypt = require("bcryptjs")

router.get("/registro", (req, res) => {
    res.render("usuarios/registro")
})

router.post("/registro", (req, res) => {

    let erros = []

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
        erros.push({texto: "Nome invalido"})
    }

    if(!req.body.email || typeof req.body.email == undefined || req.body.email == null) {
        erros.push({texto:  "E-mail invalido"})
    }

    if(!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null) {
        erros.push({texto: "Senha invalida"})
    }

    if (req.body.senha.length < 8) {
        erros.push({texto: "Senha muito curta"})
    }

    if (req.body.senha != req.body.senha2) {
        erros.push({texto: "As SENHAS não são iguais."})
    }

    if (erros.length > 0) {
        res.render("usuarios/registro", {erros: erros})
    } else {
        Usuario.findOne({email: req.body.email}).lean()
        .then((usuario) => {
            if (usuario) {
                req.flash("erroMSG", "E-mail já registado!")
                res.redirect("/usuarios/registro")
            } else {
                const novoUsuario = new Usuario({
                    nome: req.body.nome,
                    email: req.body.email,
                    senha: req.body.senha,
                })

                bcrypt.genSalt(10, (erro, salt) => {
                    bcrypt.hash(novoUsuario.senha, salt, (erro, hash) => {
                        if (erro) {
                            req.flash("erroMSG", "Houve um erro no salvamento do usuarios")
                            res.redirect("/")
                        }

                        novoUsuario.senha = hash

                        novoUsuario.save()
                        .then(() => {
                            req.flash("sucessoMSG", "Usuario cadastrado com sucesso")
                            res.redirect("/")
                        })
                        .catch((err) => {
                            req.flash("erroMSG", "Houve um erro ao cadastrar o usuario. Tente novamente")
                            res.redirect("/")
                        })
                    })
                })
            }
        })
        .catch((err) => {
            req.flash("erroMSG", "Houve um erro interno")
            res.redirect("/")
        })
    }
})


module.exports = router