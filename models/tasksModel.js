const db = require("../database/connection.js")
const { DataTypes } = require("sequelize")
const Messages = require("../models/messagesModel")

const Task = db.define("Task", {
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageFile: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  done: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
})
Task.hasMany(Messages)
Messages.belongsTo(Task)

Task.getTasks = async () => {
  const tasks = await Task.findAll()
  return tasks
}

Task.getTaskById = async (id) => {
  const task = await Task.findOne({ where: { id: id } })
  return task
}

Task.deleteTaskById = async (id) => {
  const task = await Task.destroy({ where: { id: id } })
  return task
}

Task.editTaskById = async (id, body) => {
  const { description, done, CustomerID } = body

  const task = await Task.update(
    { description: description, done: done, CustomerID: CustomerID },
    { where: { id: id } }
  )

  return task
}

Task.createTask = async (body) => {
  const { description, done, OwnerID, CustomerID, imageFile } = body

  const task = await Task.create({
    description: description,
    done: done,
    OwnerID: OwnerID,
    CustomerID: CustomerID,
    imageFile: imageFile,
  })

  return task
}

module.exports = Task
