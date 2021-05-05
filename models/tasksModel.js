const db = require('../database/connection.js')
const {DataTypes} = require('sequelize')
const Messages = require('../models/messagesModel')



const Task = db.define('Task', {
  description:{
    type: DataTypes.STRING,
    allowNull:false

  },
  imageFile:{
    type: DataTypes.STRING,
    allowNull: true
  }
})
Task.hasMany(Messages)
Messages.belongsTo(Task)


module.exports = Task