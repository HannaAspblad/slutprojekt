const db = require('../database/connection.js')
const {DataTypes} = require('sequelize')
const { NoExsistingTasks } = require('../errors/errors.js')


const Message = db.define('Message', {
  text:{
    type: DataTypes.STRING,
    allowNull:false
  }
})

Message.findAllSorted = async (page, task) => {
  try{
    const messages = await Message.findAll({where: { TaskId: task }, offset: (page -1) * 5, limit: 5, order: ['createdAt']})
    return messages
  } catch(err){
    throw new NoExsistingTasks()
  }
}

Message.matchTask = async (message, task) => {
  if(await Message.findOne({ where: {id: message, TaskId: task} }) ) {
    return true
  } else{
    return false
  }
}

Message.deleteMessage = async (message, task) => {
  await Message.destroy({ where: {id: message, TaskId: task} })
}  

Message.createMessage = async (text, task) => {
  return await Message.create({ text: text, TaskId: task })
}


module.exports = Message