const {Router} = require("express")
const router = new Router()
const MessageController = require('../controllers/messagesController')
const Auth = require('../middleware/auth')

router.get('/tasks/:id/messages', Auth.workerClientAccess, MessageController.getAll)
router.post('/tasks/:id/messages', Auth.workerClientAccess, MessageController.create)
router.delete('/tasks/:id/messages/:message', Auth.workerClientAccess, MessageController.delete)

module.exports = router