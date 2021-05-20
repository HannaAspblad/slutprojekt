const User = require('../models/usersModel.js')
const Task = require('../models/tasksModel.js')
const Message = require('../models/messagesModel.js')

User.create({username:'Tuffaste Admin', password:'makrill', role:'admin'})