const mongoose = require("mongoose")

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/andre")
.then(() => {
    console.log("Tudo show")
})
.catch((erro) => {
    console.log(`Deu tudo errado irmao ${erro}`)
})

const UserSchema = mongoose.Schema({

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

mongoose.model('Users', UserSchema)

const User = mongoose.model('Users')

new User({
    nome: 'Diego',
    sobrenome: 'Zapora',
    idade: 20,
    email: 'diego@gmail.com'
}).save()
.then(() => {
    console.log("Cadastado com sucesso")
})
.catch((erro) => {
    console.log(`Deu merda ${erro}`)
})