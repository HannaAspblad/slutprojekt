const User = require('../models/usersModel')


module.exports = {

  async createUser(req, res, next) {
    try{

      const { username, password, role} = req.body

      if( !username || !password) {
        throw new Error
      }

      const user = await User.create({ username, password, role})
      res.json({ message: 'User created!'})

    }catch(error) { next(error) }
  },







}