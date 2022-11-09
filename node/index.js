const express = require('express');
const request = require('request');

const app = express();
const port = 3000

const config = {
    host: "db",
    user: "root",
    password: "root",
    database: "nodeapp",
    port: 3306,
};
const mysql = require('mysql');

// Criar tabela se não existe **************************************************************
const createTable = `CREATE TABLE IF NOT EXISTS people ( id INT AUTO_INCREMENT, name VARCHAR(255) NOT NULL, CONSTRAINT PK_Person PRIMARY KEY (ID))`; 
let conn = newConn();
conn.query(createTable);
conn.end();

// Insere novo registro
const query = `INSERT INTO people(name) values (?)`;

app.get('/', (req, res) => {
    insertName()

    let retorno = "<h1>Hello World</h1>\n"
    retorno += "<table><tr><td>ID</td><td>Nome</td></tr>\n"

    const conn = newConn();
    conn.query(
        'SELECT * FROM people', 
        function (err, result, fields) {
            if (err) throw err;
            for (let i = 0; i < result.length; i++) {
                const id = result[i]['id']
                const name = result[i]['name']
                retorno += `<tr><td>${id}</td><td>${name}</td></tr>\n`
            }
            retorno += `</table>`
            res.send(retorno);
        }
        );
    conn.end();
});

app.listen(port, () => {
console.log(`Rodando na porta ${port}`);
});


function insertName() {
    request.get("https://servicodados.ibge.gov.br/api/v2/censos/nomes", (error, response, body) =>{
        if(error) {
            console.log(error);
            return 
        }
        const dados = JSON.parse(body);
        const index = Math.floor(Math.random() * dados.length);
        const nome = dados[index]['nome'];

        conn = newConn();
        conn.query(query,[nome]);
        conn.commit();
        conn.end();
    });
}

function newConn(){
    const conn = mysql.createConnection(config);
    return conn
}
