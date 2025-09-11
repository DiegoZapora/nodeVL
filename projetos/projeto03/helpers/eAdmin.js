module.exports = {
    isAdmin: function(req, res, next) {
        if(req.isAuthenticated() && req.user.isAdmin == 1) {
            return next()
        }

        req.flash("erroMSG", "Você não tem permissão para entrar nesta pagina!")
        res.redirect("/")
    }
}