const bd = require("./bd")

const Post = bd.s.define('postagens', {
    titulo: {
        type: bd.Sequelize.STRING
    },

    conteudo: {
        type: bd.Sequelize.TEXT
    }
})

module.exports = Post