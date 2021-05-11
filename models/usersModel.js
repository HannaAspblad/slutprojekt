const db = require("../database/connection.js")
const { DataTypes } = require("sequelize")
const Messages = require("../models/messagesModel")
const Task = require("../models/tasksModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { InvalidCredentials, Unauthorized } = require("../errors/errors.js")

const User = db.define("User", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      args: true,
      msg: "Username already exsists",
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    enum: ["worker", "client", "admin"],
    defaultValue: "client",
  },
})

User.hasMany(Messages)
Messages.belongsTo(User)
User.hasMany(Task, {
  foreignKey: "OwnerID",
})
User.hasMany(Task, {
  foreignKey: "CustomerID",
})

User.beforeCreate((user, options) => {
  user.password = bcrypt.hashSync(user.password, 10)
})

User.authenticate = async (username, password) => {
  const user = await User.findOne({ where: { username } })
  if (!user) {
    throw new InvalidCredentials()
  }
  const passwordMatch = bcrypt.compareSync(password, user.password)
  if (passwordMatch) {
    const payload = { id: user.id, username: user.username, role: user.role }
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1w" })
  } else {
    throw new InvalidCredentials()
  }
}

User.validateToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET)
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new TokenExpiredError()
    } else if (error instanceof jwt.JsonWebTokenError) {
      throw new Unauthorized()
    } else {
      throw error
    }
  }
}




module.exports = User
