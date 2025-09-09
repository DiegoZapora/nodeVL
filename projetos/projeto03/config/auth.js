const localStrategy = require("passport-local").Strategy
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const passport = require("passport")

require("../models/Usuario")
const Usuario = mongoose.model("usuarios")

const pass = passport.use(new localStrategy(
    {usernameField: "email", passwordField: "senha"},
    async (email, senha, done) => {
        try {
            const usuario = await Usuario.findOne({email})
            if (!usuario) {
                return done(null, false, {message: "Esta conta não existe!"})
            }

            bcrypt.compare(senha, usuario.senha, (erro, batem) => {
                if (batem) {
                    return done(null, usuario)
                } else {
                    return done(null, false, {message: "Senha incorreta"})
                }
            })
        } catch (err) {
            return done(err)
        }
    }
))

passport.serializeUser((usuario, done) => {
    done(null, usuario.id)
})

passport.deserializeUser(async (id, done) => {
    try {
        const usuario = await Usuario.findById(id)
        done(null, usuario)
    } catch (err) {
        done(err)
    }
})

module.exports = pass