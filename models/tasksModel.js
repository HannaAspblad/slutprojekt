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

Task.getTaskById = async (id) => {
  const task = await Task.findOne({ where: { id: id } })
  return task
}

Task.getOwnTaskById = async (userid,id) => {
  const task = await Task.findAll({ where: { CustomerID: userid, id:id } })
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





Task.getTasks = async (query, userID) => {
 
  const { filter, search } = query
  

  if (search && filter == "done") {
    const tasks = await Task.findAll({
      where: {
        done: 1,
        CustomerID: userID,
      },
    })
    return tasks
  } else if (search && filter != "done") {
    const tasks = await Task.findAll({
      where: {
        CustomerID: userID,
      },
    })
    return tasks
  }

  if (Object.keys(query).length == 0 || filter == "all") {
    const tasks = await Task.findAll()
    return tasks
  }
  if (Object.keys(query).length == 0 || filter == "done") {
    const tasks = await Task.findAll({
      where: {
        done: 1,
      },
    })

    return tasks
  }
}

module.exports = Task
