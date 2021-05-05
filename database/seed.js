const User = require('../models/usersModel.js')
const Task = require('../models/tasksModel.js')
const Message = require('../models/messagesModel.js')

User.create({username:'Tuffaste Admin', password:'makrill', role:'admin'})
User.create({username:'Grabben', password:'makrill', role:'worker'})
User.create({username:'Tönt-klient', password:'*HASH*AWDWADWAD'})


Task.create({description:'Du skall göra ditt och datt', imageFile:'badad124-123ad-b2q.jpeg'})


Message.create({text:'Fan vad fult det blev....lol'})