const express = require("express")
const PORT = 8080;
const app = express()

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


//servidor
app.listen(PORT, (err) => {
    console.log(`Servidor rodando na porta ${PORT}`)
});