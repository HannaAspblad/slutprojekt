
const {Router} = require("express")
const router = new Router()
const tasksController = require("../controllers/tasksController")
const Auth = require("../middleware/auth")

router.get("/tasks", Auth.general, tasksController.getTasks)
router.post("/tasks", Auth.workerAcess, tasksController.createTask)

router.get("/tasks/:id", Auth.workerClientAccess, tasksController.getTaskById)
router.patch("/tasks/:id", Auth.workerAcess, tasksController.editTaskById)
router.delete("/tasks/:id", Auth.adminAcess, tasksController.deleteTaskById)

router.post('/tasks/:id/image', Auth.workerAcess, tasksController.uploadImg)

module.exports = router