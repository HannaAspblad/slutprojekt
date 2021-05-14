const { Unauthorized } = require('../errors/errors')
const User = require('../models/usersModel')



function extractToken(headers) {
  const { authorization } = headers
  if (!authorization) { throw new Unauthorized() }
  const token = authorization.replace('Bearer ', '')
  return token
}


module.exports = {
  general: (req, res, next) => {
    const token = extractToken(req.headers)
    const user = User.validateToken(token)
    req.user = user
    //console.log(user);
    next()
  },
  workerClientAccess: (req, res, next) => {
    const token = extractToken(req.headers)
    const user = User.validateToken(token)
    if (user.role == 'worker' || user.role == 'client') {
      req.user = user
      //console.log(user);
      next()
    } else {
      throw new Unauthorized
    }
  },
  workerAdminAccess: (req, res, next) => {
    const token = extractToken(req.headers)
    const user = User.validateToken(token)
    if (user.role == 'worker' || user.role == 'admin') {
      req.user = user
      //console.log(user);
      next()
    } else {
      throw new Unauthorized
    }
  },
  workerAcess: (req, res, next) => {
    const token = extractToken(req.headers)
    const user = User.validateToken(token)
    if (user.role == 'worker') {
      req.user = user
      //console.log(worker);
      next()
    } else {
      throw new Unauthorized
    }
  },
  adminAcess: (req, res, next) => {
    const token = extractToken(req.headers)
    const user = User.validateToken(token)
    if (user.role == 'admin') {
      req.user = user
      //console.log(user);
      next()
    } else {
      throw new Unauthorized
    }
  }
}