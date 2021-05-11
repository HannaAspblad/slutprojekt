const Message = require('../models/messagesModel')
const {InvalidBody, Unauthorized} = require('../errors/errors')

module.exports = {

    async getAll(req, res, next){
        const task = req.params.id
        try{
            const messages = await Message.findAll({ where: { TaskId: task } })
            res.json({messages})
        }catch(err){
            next(err)
        }
    },

    async create(req, res, next){
        const text = req.body.text
        const task = req.params.id
        if(!text) {
            throw new InvalidBody(['text'])
          }
        try{
            const message = await Message.create({text: text, TaskId: task})
            res.json({message})
        }catch(err){next(err)}
    },

    async delete(req, res, next){
        const id = req.params.message
        try{
            const match = await Message.findOne({ where: {id: id, TaskId: req.params.id} })
            if(match){
                await Message.destroy({ where: {id: id, TaskId: req.params.id} })
                res.json({message: `Message with id ${id} deleted`})
            } else{
                throw new Unauthorized() //message and task does not match
            }            
        }catch(err){next(err)}
    }

}