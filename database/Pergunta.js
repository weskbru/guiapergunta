const sequelize = require('sequelize')
const conection = require('./databese')


const Pergunta = conection.define('perguntas', {
    titulo: {
        type: sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: sequelize.TEXT,
        allowNull: false
    }
});

Pergunta.sync({force:false}).then(() => {
    console.log('tabela criada')
})