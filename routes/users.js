const {Router} = require('express')

const router = new Router()
const userController = require('../controllers/usersController')
const auth = require('../middleware/auth')

router.post('/users', auth.adminAcess, userController.createUser)

router.post('/authenticate', userController.login)

router.get('/me', userController.me)
router.patch('/me', userController.updateMe)

router.get('/users', auth.workerAdminAccess, userController.getUsers)
router.get('/users/:id', userController.getUserById)


module.exports = router