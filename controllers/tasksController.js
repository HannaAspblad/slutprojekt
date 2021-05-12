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
      res.json({ error: error })
    }
  } else if (req.user.role == 'client') {
    try { 
      const ownertask = await tasksModel.getOwnTaskById(userid,id)
      res.json(ownertask)
    } catch (error) {
      res.json({ error: error})
    }
  }
} 

async function deleteTaskById(req, res, next) {
  const id = req.params.id

  try {
    await tasksModel.deleteTaskById(id)
    res.json({ message: `successfully deleted task with id ${id}` })
  } catch (error) {
    res.json({ error: error })
  }
}
async function editTaskById(req, res, next) {
  const id = req.params.id
  const body = req.body

  try {
    await tasksModel.editTaskById(id, body)
    res.json({ message: `successfully edited task with id ${id}` })
  } catch (error) {
    res.json({ error: error })
  }
}

async function createTask(req, res, next) {
  const body = req.body

  try {
    await tasksModel.createTask(body)
    res.json({ message: `successfully added new task` })
  } catch (error) {
    res.json({ error: error })
  }
}

async function getTasks(req, res, next) {

  //client kan inte söka

  //if(req.user.role == 'worker' && req.query.params)

  let customer = false

  if (req.query.search) {
    customer = await User.findOne({
      where: {
        username: req.query.search,
      },
    })
  }

  try {
    const tasks = await tasksModel.getTasks(req.query, customer.id)
    res.json(tasks)
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
