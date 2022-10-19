const sequelize = require('sequelize')
const conection = require('./databese')

const Resposta = conection.define('resposta', {
    corpoDaResposta: {
        type: sequelize.TEXT,
        allowNull:false
    },
    perguntaId: {
        type: sequelize.INTEGER
    }
})

Resposta.sync({force: false});

module.exports = Resposta