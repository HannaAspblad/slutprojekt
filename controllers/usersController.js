const User = require('../models/usersModel')
const {InvalidBody} = require('../errors/errors.js')


module.exports = {

  async createUser(req, res, next) {
    try{

      const { username, password, role} = req.body

      if( !username || !password) {
        throw new InvalidBody(['username','password'])
      }

      const user = await User.create({ username, password, role})
      res.json({ message: 'User created!'})

    }catch(error) { next(error) }
  },

  async login(req, res, next) {
    try{
      const { username, password } = req.body
      const token = await User.authenticate(username, password)
      res.json({ token, username})
    } catch(error) { next(error) }
  },


  me(req, res, next){
    const user = req.user
    res.json({user})
  }




}