const mongoose = require("mongoose")

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/andre")
.then(() => {
    console.log("Conectado com sucesso")
})
.catch((erro) => {
    console.log(`Nâo foi possivel se conectar ao servidor: ${erro}`)
})

const userSchema = mongoose.Schema({
    nome: {
        type: String,
        require: true
    },

    sobrenome: {
        type: String,
        require: true
    },

    idade: {
        type: Number,
        require: true
    },

    email: {
        type: String,
        require: true
    }
})

mongoose.model('Users', userSchema)

const User = mongoose.model('Users')

new User({
    nome: 'Chester',
    sobrenome: 'Burger',
    idade: 41,
    email: 'chester@gmail.com'
}).save()
.then(() => {
    console.log("Cadastrado com sucesso")
})
.catch((erro) => {
    console.log(`Erro ao cadastrar ${erro}`)
})