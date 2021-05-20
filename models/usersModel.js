const db = require("../database/connection.js")
const { DataTypes, Op } = require("sequelize")
const Messages = require("../models/messagesModel")
const Task = require("../models/tasksModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { InvalidCredentials, Unauthorized, UserNotFound, NotValidRole } = require("../errors/errors.js")

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



User.updateMe = async (body, userid) => {
 
  const { password, username, role } = body

  const newPassword = bcrypt.hashSync(password, 10)

  const patched = await User.update(
    { username: username, role: role, password: newPassword },
    { where: { id: userid } }
  )
  return patched
},


  User.getUsers = async (query, userId) => {
    
    let { role, search } = query
    

    if(role && role !== 'worker' && role !== 'admin' && role !== 'client' && role !== 'all'){
        throw new NotValidRole()
    }

    if(search && role =="all"){
      const users = await User.findAll({
        where: {
          id: userId,
        },
      })
      return users
    }

    if (search && role) {
      const user = await User.findOne({
        where: {
          id: userId,
          role: role,
        },
      })
      return user
    }else if(search && !role){

      const user = await User.findOne({
        where: {
          id: userId
        },
      })
      return user
    }

    if (!role || role == "all") {
      const users = await User.findAll()
      return users
    } else if (role) {
      const users = await User.findAll({
        where: {
          role: role,
        },
      })
      return users
    }

    
   
  },

//test flr git

  User.getUserById = async (id) => {
    const user = await User.findOne({
      where: {
        id: id,
      },
    })
    return user
  }


  User.findUser = async (name) => {
    try{
   const user = User.findOne({
     where:{
       username: {[Op.substring]: name}
    }
   })
   return user
  } catch(error){
    throw Error
  }
}

User.updateUser = async (body, userid) => {
 
  const { password, username, role } = body
  const newPassword = bcrypt.hashSync(password, 10)

  const patched = await User.update(
    { username: username, role: role, password: newPassword },
    { where: { id: userid } }
  )
  return patched
}

User.deleteUser = async (id) => {

  const user = await User.findOne({where: {id: id}})
  if(user !== null){
    return User.destroy({where: {id: id}})
  } else {
    throw new UserNotFound()
  }
}

module.exports = User
