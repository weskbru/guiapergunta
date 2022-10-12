const express = require("express")
const bodyparse = require('body-parser')
const PORT = 8080;
const app = express()
const conection = require("./database/databese")
const pergunta = require('./database/Pergunta')

// responsavel para traduzir os dados enviado pelo formulario
app.use(bodyparse.urlencoded({extended:false}));
app.use(bodyparse.json());


//linkando a pasta public statica ao meu projeto
app.use(express.static("public"));

//fazendo o ejs roda
app.set("view engine" , "ejs")

// rotas 
app.get('/', (req,res) => {
    res.render('index')
})

app.get("/pergunta", (req,res) => {
    res.render('pergunta')
})

// autenticação com o banco de dados
conection
    .authenticate()
    .then(() => {
        console.log('conecção ok com o banco de dados')
    })
    .catch((msgErro) => {
        console.log(msgErro)
    })


// metodo que ira mostra os dados passado pelo usuario
app.post('/salvapergunta', (req ,res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    res.send(`A pergunta foi: ${titulo} descrição: ${descricao}`)
});


//servidor
app.listen(PORT, (err) => {
    console.log(`Servidor rodando na porta ${PORT}`)
});