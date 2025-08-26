let http = require('http')

let servidor = http.createServer((req, res) => {
    res.end('Oi')
})

servidor.listen(8085, () => {
    console.log('Servidor Ligado')
})