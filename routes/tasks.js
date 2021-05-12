
const {Router} = require("express")
const router = new Router()
const tasksController = require("../controllers/tasksController")
const Auth = require("../middleware/auth")

//worker&client
router.get("/tasks", Auth.workerClientAccess, tasksController.getTasks)

//worker
router.post("/tasks", Auth.workerAcess, tasksController.createTask)

// klar
router.get("/tasks/:id", Auth.workerClientAccess, tasksController.getTaskById)

//worker
router.patch("/tasks/:id", Auth.workerAcess, tasksController.editTaskById)

//admin
router.delete("/tasks/:id", Auth.adminAcess, tasksController.deleteTaskById)

// worker
router.post('/tasks/:id/image', Auth.workerAcess, tasksController.uploadImg)

module.exports = router