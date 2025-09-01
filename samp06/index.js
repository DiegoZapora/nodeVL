const mongoose = require("mongoose")

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://locallhost")
.then(() => {
    console.log("Conectado com sucesso")
})
.catch((erro) => {
    console.log(`Nâo foi possivel se conectar ao servidor: ${erro}`)
})

const userSchema = mongoose.Schema({
    nome: {
        type: String
    },

    idade: {
        type: Number
    }
})

mongoose.model('Users', userSchema)
const User = mongoose.model('Users')

new User({
    nome: 'Cynosa',
    idade: '21'
}).save()
.then(() => {
    console.log("Deu tudo certo truta")
})
.catch((erro) => {
    console.log(`Deu tudo errado irmao ${erro}`)
})