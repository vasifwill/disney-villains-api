const Sequelize = require('sequelize')
const villainsModel = require('./villains')

const connection = new Sequelize('villainscon', 'villainscon', 'vasif.will', {
  host: 'localhost', dialect: 'mysql'
})

const villains = villainsModel(connection, Sequelize)

module.exports = {villains}

