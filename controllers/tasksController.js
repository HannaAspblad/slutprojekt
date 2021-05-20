const tasksModel = require("../models/tasksModel")
const User = require("../models/usersModel")

async function getTaskById(req, res, next) {
  const id = req.params.id
  const userid = req.user.id
  if (req.user.role == 'worker') {
    try {
      const task = await tasksModel.getTaskById(id)
      res.json(task)
    } catch (error) {
      next(error)
    }
  } else if (req.user.role == 'client') {
    try { 
      const ownertask = await tasksModel.getOwnTaskById(userid,id)
      res.json(ownertask)
    } catch (error) {
      next(error)
    }
  }
} 

async function deleteTaskById(req, res, next) {
  const id = req.params.id
  try {
    await tasksModel.deleteTaskById(id)
    res.json({ message: `successfully deleted task with id ${id}` })
  } catch (error) {
    next(error)
  }
}
async function editTaskById(req, res, next) {
  const id = req.params.id
  const body = req.body
  try {
    await tasksModel.editTaskById(id, body)
    res.json({ message: `successfully edited task with id ${id}` })
  } catch (error) {
    next(error)
  }
}

async function createTask(req, res, next) {
  const body = req.body
  try {
    await tasksModel.createTask(body,req.user.id)
    res.json({ message: `successfully added new task` })
  } catch (error) {
    next(error)
  }
}

async function getTasks(req, res, next) {
let {search, filter} = req.query 
try{
  if(req.user.role == 'admin'){
   if(search){
     const client = await User.findUser(search)
     const tasks = await tasksModel.getTasksAdmin(client.id,filter)
     res.json({tasks})
    } else {
      search = false
      const tasks = await tasksModel.getTasksAdmin(search,filter)
      res.json({tasks})
    }
  } else if(req.user.role == 'worker'){
    if(search){
      const client = await User.findUser(search)
      const tasks = await tasksModel.getTasksWorker(client.id,filter, req.user.id)
      res.json({tasks})
     } else {
       search = false
       const tasks = await tasksModel.getTasksWorker(search,filter, req.user.id)
       res.json({tasks})
     }
  } else if(req.user.role == 'client'){
    const tasks = await tasksModel.getTasksClient(req.user.id)
    res.json({tasks})
  }
} catch (error) {
  next(error)
}
}


const uploadImg = async (req, res, next) => {
  const img = req.files.pic
  const id = req.params.id
  try{
    tasksModel.uploadImg(id, img)
    res.json({message: `File successfully uploaded`})
  }catch(err){
    next(err)
  }
}


module.exports = {
  getTasks,
  getTaskById,
  deleteTaskById,
  editTaskById,
  createTask,
  uploadImg
}