const { Unauthorized } = require('../errors/errors')
const User = require('../models/usersModel')



function extractToken(headers) {
  const {authorization} = headers
  if (!authorization) { throw new Unauthorized() }
  const token = authorization.replace('Bearer ', '')
  return token
}


module.exports = {
  user: (req, res, next) => {
    const token = extractToken(req.headers)
    const user = User.validateToken(token)
    req.user = user
    console.log(user);
    next()
  },
  worker: (req, res, next) => {
    const token = extractToken(req.headers)
    const worker = User.validateToken(token)
    req.user = worker
    console.log(worker);
    next()
  },
  admin: (req, res, next) => {
    const token = extractToken(req.headers)
    const admin = User.validateToken(token)
    req.user = admin
    console.log(admin);
    next()
  },
  client: (req, res, next) => {
    const token = extractToken(req.headers)
    const client = User.validateToken(token)
    req.user = client
    console.log(client);
    next()
  }
}