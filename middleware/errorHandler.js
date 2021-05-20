const {TaskManagerError} = require("../errors/errors")
const {BaseError} = require("sequelize")


function errorHandler(error, req,res,next){
    if(error instanceof TaskManagerError){
        res
        .status(error.errorCode)
        .json({error: error.message})
    }else if(error instanceof BaseError){
        res
        .status(400)
        .json({error: error.message})
    }else{
        res.status(500)
        .json({error: "something went wrong"})
    }
}



module.exports = errorHandler