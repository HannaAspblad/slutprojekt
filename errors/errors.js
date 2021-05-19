class TaskManagerError extends Error {}

class InvalidBody extends TaskManagerError {
  constructor(fields) {
    super()
    this.fields = fields
    this.message = `invalid body, require ${this.fields.join(" & ")}`
    this.errorCode = 400
  }
}

class Unauthorized extends TaskManagerError{

    constructor(){
        super()
        this.message = "unauthorized"
        this.errorCode = 401

    }
}

class InvalidCredentials extends TaskManagerError{

    constructor(){
        super()
        this.message = "invalid credentials"
        this.errorCode = 403

    }
}

class NotMatchingMessage extends TaskManagerError{
  constructor(){
    super()
    this.message = 'Message does not match task'
    this.errorCode = 403
  }
}

class NoExistingMessages extends TaskManagerError{
  constructor(){
    super()
    this.message = 'Could not find any messages'
    this.errorCode = 404
  }
}

class UserNotFound extends TaskManagerError{
  constructor(){
    super()
    this.message = `Could not find user`
    this.errorCode = 404
  }
}

class NotValidRole extends TaskManagerError{
  constructor(){
    super()
    this.message = `Role not found`
    this.errorCode = 404
  }
}

module.exports = {
TaskManagerError,
InvalidBody,
Unauthorized,
InvalidCredentials,
NotMatchingMessage,
NoExistingMessages,
UserNotFound,
NotValidRole
}