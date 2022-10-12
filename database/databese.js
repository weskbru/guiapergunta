const { Sequelize } = require("sequelize");

const conection = new Sequelize("database","root","Bruno@sk8", {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = conection;