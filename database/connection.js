const {Sequelize} = require('sequelize')


const db = new Sequelize ({
  dialect: 'sqlite',
  storage: 'database/taskmanager.db'
})


module.exports = db