const {Router} = require('express')

const router = new Router()
const userController = require('../controllers/usersController')
const auth = require('../middleware/auth')

router.post('/users', auth.adminAcess, userController.createUser)

router.post('/authenticate', userController.login)

router.get('/me', auth.general, userController.me)
router.patch('/me', auth.general, userController.updateMe)

router.get('/users', auth.workerAdminAccess, userController.getUsers)
router.get('/users/:id', auth.adminAcess, userController.getUserById)

router.patch('/users/:id', auth.adminAcess, userController.updateUser)
router.delete('/users/:id', auth.adminAcess, userController.deleteUser)

module.exports = router