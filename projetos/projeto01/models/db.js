const Sequelize = require("sequelize")
const s = new Sequelize('postapp', 'root', 'Diegod1k!', {
    host: "localhost",
    dialect: "mysql",
    query: {raw: true}
})

s.authenticate()
.then(() => {
    console.log("Conectado com sucesso")
})
.catch((erro) => {
    console.log(`Filha ao conectar ${erro}`)
})

module.exports = {
    Sequelize: Sequelize,
    s: s
}