const db = require('./db.js')

const Post = db.s.define('postagens', {
    titulo: {
        type: db.Sequelize.STRING
    },

    conteudo: {
        type: db.Sequelize.TEXT
    }
})

module.exports = Post