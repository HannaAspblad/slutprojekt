const Message = require('../models/messagesModel')
const {InvalidBody} = require('../errors/errors')

module.exports = {

    async getAll(req, res, next){
        const user = req.params.id
        try{
            const messages = await Message.findAll({ where: { TaskId: user } })
            res.json({messages})
        }catch(err){
            next(err)
        }
    },

    async create(req, res, next){
        const text = req.body.text
        const id = req.params.id
        if(!text) {
            throw new InvalidBody(['text'])
          }
        try{
            const message = await Message.create({text: text, TaskId: id})
            res.json({message})
        }catch(err){next(err)}
    },

    async delete(req, res, next){
        const id = req.body.id
        try{
            await Message.destroy({ where: {id: id} })
            res.json({message: `Message with id ${id} deleted`})
        }catch(err){next(err)}
    }

}