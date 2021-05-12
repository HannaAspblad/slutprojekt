
const {Router} = require("express")
const router = new Router()
const tasksController = require("../controllers/tasksController")
const Auth = require("../middleware/auth")


router.get("/tasks", tasksController.getTasks)
router.post("/tasks", tasksController.createTask)

router.get("/tasks/:id", Auth.workerClientAccess, tasksController.getTaskById)
router.patch("/tasks/:id", tasksController.editTaskById)
router.delete("/tasks/:id", tasksController.deleteTaskById)

router.post('/tasks/:id/image', tasksController.uploadImg)

module.exports = router