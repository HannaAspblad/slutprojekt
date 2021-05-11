const {Router} = require('express')

const router = new Router()
const userController = require('../controllers/usersController')
const Auth = require('../middleware/auth')



router.post('/users', userController.createUser)
router.post('/authenticate', userController.login)
router.get('/me', userController.me)


module.exports = router