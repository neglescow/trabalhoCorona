const mysql = require('mysql2')
const fakeSick = require('./fakerInfected.js')

const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: 3336,
    user: 'root',
    password: 'faesa123',
    database: 'infectadosDB'
})

connection.connect(function(err){
    if(err) return console.log(err)
    console.log('banco de dados conectado!')
    createTableVirusControl(connection)
    populateVirusControl(connection)
})

function createTableVirusControl(conn){
    const sql = `CREATE TABLE IF NOT EXISTS VirusControl
                    (id INT NOT NULL AUTO_INCREMENT,
                    nome VARCHAR(200) NOT NULL,
                    endereco VARCHAR(200) NOT NULL,
                    telefone VARCHAR(200) NOT NULL,
                    peso INTEGER(3) NOT NULL,
                    altura INTEGER(3) NOT NULL,
                    idade INTEGER(3) NOT NULL,
                    prob_saude VARCHAR(200) NOT NULL,
                    obesidade VARCHAR(3) NOT NULL,
                    idoso VARCHAR(3) NOT NULL,                    
                    PRIMARY KEY (id)
                    );`
    conn.query(sql, function(error, results, fields){
        if(error) return console.log(error)
        console.log('Tabela criada com sucesso!')
    })
}

function populateVirusControl(conn){
    const sql = `
        INSERT INTO VirusControl(
            nome,
            endereco,
            telefone,
            peso,
            altura,
            idade,
            prob_saude,
            obesidade,
            idoso)
            VALUES ?`

    let values = [] 
    
    for(let i = 0; i < 10; i++){

        const data =  fakeSick.geraInfectado()

        values.push([
            data.nome,
            data.endereco,
            data.tel,
            data.peso,
            data.altura,
            data.idade,
            data.prob_saude,
            data.obesidade,
            data.idoso
        ])
    }

    conn.query(sql, [values], function(error, results, fields){
        if(error) return console.log(error)
        console.log('Registros inseridos com sucesso!')
        conn.end()
    })
}