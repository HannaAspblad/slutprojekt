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


module.exports = {
TaskManagerError,
InvalidBody,
Unauthorized,
InvalidCredentials 
}