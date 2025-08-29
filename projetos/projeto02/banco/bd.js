const Sequelize = require("sequelize")
const s = new Sequelize('samp', 'root', 'Diegod1k!', {
    host: 'localhost',
    dialect: 'mysql',
    query: {raw: true}
})

s.authenticate()
.then(() => {
    console.log("Conectado com sucesso")
})
.catch((erro) => {
    console.log(`Algo deu errado: ${erro}`)
})

module.exports = {
    Sequelize: Sequelize,
    s: s
}