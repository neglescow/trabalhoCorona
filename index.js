const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3000
const mysql = require('mysql2')

//configurações do ambiente
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

//criando um roteador
const router = express.Router()
router.get('/', (req, res) => res.json({message: 'API ok!'}))
app.use('/', router)

function execQuery(query, res){
    const connection = mysql.createConnection({
        host: '127.0.0.1',
        port: 3336,
        user: 'root',
        password: 'faesa123',
        database: 'infectadosDB'
    })

    connection.query(query, function(error, results, fields){
        if(error) res.json(error)
        else res.json(results)
    
        connection.end()
        console.log('Query executada com sucesso!')
    })
}

//Rotas Users
router.get('/users', (req, res) => {
    execQuery('SELECT * FROM VirusControl;', res)
})

router.get('/users/:id?', (req, res) => {
    let filter = ''
    if(req.params.id) filter = 'WHERE id = ' + parseInt(req.params.id)
    execQuery('SELECT * FROM VirusControl ' + filter, res)
})

router.delete('/users/:id', (req, res) => {
    execQuery('DELETE FROM VirusControl WHERE id=' +parseInt(req.params.id), res)
})

router.post('/users/', (req, res) => {
    const nome = req.body.nome.substring(0,200)
    const endereco = req.body.endereco.substring(0, 200)
    const tel = req.body.endereco.substring(0, 200)
    const peso = req.body.endereco.substring(0, 3)
    const altura = req.body.endereco.substring(0, 3)
    const idade = req.body.endereco.substring(0, 3)
    const prob_saude = req.body.endereco.substring(0, 200)
    const obesidade = req.body.endereco.substring(0, 3)
    const idoso = req.body.endereco.substring(0, 3)
    execQuery(`
    INSERT INTO VirusControl (
        nome, 
        endereco, 
        telefone, 
        peso, 
        altura, 
        idade, 
        prob_saude, 
        obesidade, 
        idoso) VALUES (
            '${nome}', 
            '${endereco}',
            '${tel}',
            '${peso}',
            '${altura}',
            '${idade}',
            '${prob_saude}',
            '${obesidade}',
            '${idoso}');`, res)
})

router.patch('/users/:id', (req, res) => {
    const nome = req.body.nome.substring(0,200)
    const endereco = req.body.endereco.substring(0, 200)
    const tel = req.body.endereco.substring(0, 200)
    const peso = req.body.endereco.substring(0, 3)
    const altura = req.body.endereco.substring(0, 3)
    const idade = req.body.endereco.substring(0, 3)
    const prob_saude = req.body.endereco.substring(0, 200)
    const obesidade = req.body.endereco.substring(0, 3)
    const idoso = req.body.endereco.substring(0, 3)
    execQuery(`UPDATE VirusControl SET 
        nome='${nome}', 
        endereco='${endereco}', 
        telefone='${tel}', 
        peso='${peso}', 
        altura='${altura}', 
        idade='${idade}', 
        prob_saude='${prob_saude}', 
        obesidade='${obesidade}', 
        idoso='${idoso}',
        WHERE id = '${req.params.id}'`, res)
})

//iniciando o servidor
app.listen(port)
console.log('API rodando .... ')