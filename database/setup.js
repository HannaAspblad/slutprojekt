const db = require('./connection.js')
const messages = require('../models/messagesModel.js')
const tasks = require('../models/tasksModel.js')
const users = require('../models/usersModel.js')

db.sync()
