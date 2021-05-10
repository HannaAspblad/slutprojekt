const db = require('../database/connection.js')
const {DataTypes} = require('sequelize')
//const Task = require('./tasksModel')


const Message = db.define('Message', {
  text:{
    type: DataTypes.STRING,
    allowNull:false
  }
})
module.exports = Message