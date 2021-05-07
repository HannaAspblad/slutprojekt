
const {Router} = require("express")
const router = new Router()
const tasksController = require("../controllers/tasksController")

router.get("/tasks", tasksController.getTasks)

router.get("/tasks/:id", tasksController.getTaskById)
router.post("/tasks", tasksController.createTask)
router.patch("/tasks/:id", tasksController.editTaskById)
router.delete("/tasks/:id", tasksController.deleteTaskById)

module.exports = router