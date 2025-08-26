const express = require('express')
const porta = 8085
const app = express()

app.get('/', (req, res) => {
    res.send('oi')
})

app.get('/sobre', (req, res) => {
    res.send('eae não, nois nao era um time?')
})

app.get('/andre', (req, res) => {
    res.send('oajfafjsof')
})

app.listen(porta, () => {
    console.log(`Servidor Rodando na porta ${porta}`)
})