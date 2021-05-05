const db = require('../database/connection.js')
const {DataTypes} = require('sequelize')
const Messages = require('../models/messagesModel')
const Task = require('../models/tasksModel')

const User = db.define('User', {
  username:{
    type: DataTypes.STRING,
    allowNull:false,
    unique:{
      args: true,
      msg:'Username already exsists'
    }
  },
  password:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  role:{
    type: DataTypes.STRING,
    enum:['worker','client','admin'],
    defaultValue:'client'
  }
})

User.hasMany(Messages)
Messages.belongsTo(User)
User.hasMany(Task, {
  foreignKey:'OwnerID'
})
User.hasMany(Task, {
  foreignKey:'CustomerID'
})
  


module.exports = User