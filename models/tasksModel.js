const db = require("../database/connection.js")
const { DataTypes } = require("sequelize")
const Messages = require("../models/messagesModel")
const path = require('path')
const { v4: uuid } = require('uuid')
const User = require('../models/usersModel')


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

Task.getOwnTaskById = async (userid, id) => {
  const task = await Task.findAll({ where: { CustomerID: userid, id: id } })
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




// [Op.substring]



Task.getTasksAdmin = async (client, filter) => {


  console.log(filter)
  console.log(client)
  if (client && filter == 'done') {
    const tasks = await Task.findAll({
      where: {
        done: true,
        CustomerID: client
      }
    })
    return tasks
  } else if (client && filter == 'all' || client && !filter) {
    const tasks = await Task.findAll({
      where: {
        CustomerID: client
      }
    })
    return tasks
  } else if (!client && filter == 'done') {
    const tasks = await Task.findAll({
      where: {
        done: true
      }
    })
    return tasks
  } else if (!client && filter == 'all' || !client && !filter) {
    return await Task.findAll()
  } else {
    throw Error
  }

}

Task.getTasksWorker = async (client, filter, user) => {


  console.log(filter)
  console.log(client)
  if (client && filter == 'done') {
    const tasks = await Task.findAll({
      where: {
        done: true,
        CustomerID: client,
        OwnerID: user
      }
    })
    return tasks
  } else if (client && filter == 'all' || client && !filter) {
    const tasks = await Task.findAll({
      where: {
        CustomerID: client,
        OwnerID: user
      }
    })
    return tasks
  } else if (!client && filter == 'done') {
    const tasks = await Task.findAll({
      where: {
        done: true,
        OwnerID: user
      }
    })
    return tasks
  } else if (!client && filter == 'all' || !client && !filter) {
    return await Task.findAll({
      where: {
        OwnerID: user
      }
    })
  } else {
    throw Error
  }

}

Task.getTasksClient = async (user) => {
  return await Task.findAll({
    where: {
      CustomerID: user
    }
  })
}


Task.uploadImg = async (id, img) => {
  const extension = path.extname(img.name)
  const fileName = uuid() + extension
  const outputPath = path.join("uploads", fileName)
  await Task.update(
    { imageFile: fileName },
    { where: { id: id } }
  )
  img.mv(outputPath)
}



module.exports = Task