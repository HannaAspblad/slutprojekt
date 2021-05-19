const User = require("../models/usersModel")
const { InvalidBody, UserNotFound } = require("../errors/errors.js")


module.exports = {
  async createUser(req, res, next) {

    try {
      const { username, password, role } = req.body

      if (!username || !password) {
        throw new InvalidBody(["username", "password"])
      }
      
      await User.create({ username: username.toLowerCase(), password, role})
      res.json({ message: "User created!" })
    } catch (error) {
      next(error)
    }
  },

  async login(req, res, next) {
    try {
      const { username, password } = req.body
      const token = await User.authenticate(username, password)
      res.json({ token, username })
    } catch (error) {
      next(error)
    }
  },

  me(req, res, next) {
    const user = req.user
    res.json({ user })
  },

  async updateMe(req, res, next) {
    // const { authorization } = req.headers
    // const token = authorization.replace("Bearer ", "")

    try {
      await User.updateMe(req.body, req.user.id)
      res.json({ message: "user updated" })
    } catch (error) {
      res.json({ message: error })
    }
  },

  async getUsers(req, res, next) {

    let user = false
    try {
      if (req.query.search) {
      user = await User.findUser(req.query.search)
      if(user == null){throw new UserNotFound()}
      }
      const users = await User.getUsers(req.query, user.id)
      res.json(users)
    } catch (error) {
      res.json(error)
    }
  },

  async getUserById(req, res, next) {

    const id = req.params.id
    try {
      const user = await User.getUserById(id)
      res.json(user)
    } catch (error) {
      res.json(error)
    }
  },

  async updateUser(req, res, next){
    const id = req.params.id
    try{
      const user = await User.updateUser(req.body, id)
      res.json({message: `User with id ${id} updated`})
    }catch(err){
      next(err)
    }
  },

  async deleteUser(req, res, next){
    const id = req.params.id
    try{
      const user = await User.deleteUser(id)
      res.json({message: `User with id ${id} deleted`})
    }catch(err){next(err)}
  }

}
