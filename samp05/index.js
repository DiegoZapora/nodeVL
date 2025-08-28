const Sequelize = require('sequelize')
const s = new Sequelize('teste', 'root', 'Diegod1k!', {
    host: "localhost",
    dialect: "mysql"
})

const Postagem = s.define('postagens', {
    titulo: {
        type: Sequelize.STRING
    },

    conteudo: {
        type: Sequelize.TEXT
    }
})

Postagem.create({
    titulo: "Andre Matos",
    conteudo: "Maestro do Heavy Metal!"
})

const Usuarios = s.define('usuarios', {
    nome: {
        type: Sequelize.STRING
    },

    sobrenome: {
        type: Sequelize.STRING
    },

    idade: {
        type: Sequelize.INTEGER
    },

    email: {
        type: Sequelize.STRING
    }
})

Usuarios.create({
    nome: "Diego",
    sobrenome: "Matos",
    idade: 23,
    email: "diego.samp@gmail.com"
})

s.authenticate()
.then(() => {
    console.log('Conectado com Sucesso')
})
.catch((err) => {
    console.log(`Falha ao se conectar ${err}`)
})