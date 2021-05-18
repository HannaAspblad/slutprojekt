const db = require('../database/connection.js')
const {DataTypes} = require('sequelize')
const { NoExistingMessages } = require('../errors/errors.js')


const Message = db.define('Message', {
  text:{
    type: DataTypes.STRING,
    allowNull:false
  }
})

Message.getMessages = async (page, taskId) => {
  !page ? page = 1 : page = page
  const messages = await Message.findAll({where: { TaskId: taskId,  }, offset: (page -1) * 5, limit: 5, order: ['createdAt']})
  if(messages.length > 1){
    return messages
  } else {
    throw new NoExistingMessages()
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