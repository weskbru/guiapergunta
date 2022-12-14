const express = require("express")
const bodyparse = require('body-parser')
const PORT = 8080; 
const app = express()
const conection = require("./database/databese")
const Pergunta = require('./database/Pergunta')
const Resposta = require('./database/Resposta');




// responsavel para traduzir os dados enviado pelo formulario
app.use(bodyparse.urlencoded({extended:false}));
app.use(bodyparse.json());


//linkando a pasta public statica ao meu projeto
app.use(express.static("public"));

//fazendo o ejs roda
app.set("view engine" , "ejs");

// rotas 
app.get('/', (req,res) => {
    Pergunta.findAll({row:true, order: [
        ['id', 'DESC']// ASC CRESCENTE , DESC DESCRECENTE 
    ]})
    .then(perguntas => {
        res.render('index', {
            perguntas: perguntas
        });
    });
});

//rota pergunta
app.get("/pergunta", (req,res) => {
    res.render('pergunta');
});

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
    
    //Salvando no banco de dados 
    Pergunta.create({
        titulo: titulo,
        descricao: descricao 
    }).then(() => {
        res.redirect("/")
    })
});

// Criando a rota que leva a pagina das perguntas

app.get('/perguntaSelect/:id', (req, res) => {
    let id = req.params.id;
    Pergunta.findOne({
        where: {id: id}
    })
    .then(pergunta => {
        if(pergunta != undefined){ //pergunta encontrada

            Resposta.findAll({
                where: {perguntaId: pergunta.id},
                order: [
                    ['id', 'DESC']
                ]
            })
            .then(respostas => {
                res.render('perguntaSelect', {
                    pergunta: pergunta,
                    respostas: respostas
                });
            });
        }else { //pergunta nao encontrada retorna a pagina principal
            res.redirect('/')
        }
    })
})

// ROTA PARA RESPOSTA DO FORMULARIO 

app.post('/responder',(req,res) => {
    let corpoDaResposta = req.body.corpoDaResposta;
    let perguntaId = req.body.pergunta;

    Resposta.create({
        corpoDaResposta: corpoDaResposta,
        perguntaId: perguntaId
    })
    .then(() => {
        res.redirect("/perguntaSelect/"+perguntaId)
    })
});


//servidor
app.listen(PORT, (err) => {
    console.log(`Servidor rodando na porta ${PORT}`)
});