const tasksModel = require("../models/tasksModel")

async function getTasks(req, res, next) {
    
  try {
    const tasks = await tasksModel.getTasks()
    res.json(tasks)
  } catch (error) {
    res.json({ error: error })
  }
}

async function getTaskById(req, res, next) {
    const id = req.params.id

    try {
      const task = await tasksModel.getTaskById(id)
      res.json(task)
    } catch (error) {
      res.json({ error: error })
    }
  }

  async function deleteTaskById(req, res, next) {
    const id = req.params.id

    try {
        await tasksModel.deleteTaskById(id)
        res.json({message: `successfully deleted task with id ${id}`})
        
    } catch (error) {
      res.json({ error: error })
    }
  }
  async function editTaskById(req, res, next) {

    const id = req.params.id
    const body = req.body

    try {
        await tasksModel.editTaskById(id, body)
        res.json({message: `successfully edited task with id ${id}`})
        
    } catch (error) {
      res.json({ error: error })
    }
  }


  async function createTask(req, res, next) {

    const body = req.body


    try {
        await tasksModel.createTask(body)
        res.json({message: `successfully added new task`})
        
    } catch (error) {
      res.json({ error: error })
    }
  }

module.exports = { getTasks, getTaskById, deleteTaskById, editTaskById, createTask }
