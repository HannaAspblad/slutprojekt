const {Router} = require("express")
const router = new Router()
const MessageController = require('../controllers/messagesController')

router.get('/tasks/:id/messages/:page', MessageController.getAll)
router.post('/tasks/:id/messages', MessageController.create)
router.delete('/tasks/:id/messages/:message', MessageController.delete)


module.exports = router