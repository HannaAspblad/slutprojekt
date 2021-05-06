const {Router} = require('express')

const router = new Router()
const userController = require('../controllers/usersController')


router.post('/users', userController.createUser)



module.exports = router