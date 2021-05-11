const Message = require('../models/messagesModel')
const {InvalidBody, NotMatchingMessage} = require('../errors/errors')

module.exports = {

    async getAll(req, res, next){
        const page = req.params.page
        const task = req.params.id
        console.log('controller');
        try{
            const messages = await Message.findAllSorted(page, task)
            res.json({messages})
        }catch(err){next(err)}
    },

    async create(req, res, next){
        const text = req.body.text
        const task = req.params.id
        if(!text) {throw new InvalidBody(['text'])}
        try{
            const message = await Message.createMessage(text, task)
            res.json({message})
        }catch(err){next(err)}
    },

    async delete(req, res, next){
        const message = req.params.message
        const task = req.params.id
        try{
            if(await Message.matchTask(message, task)){
                await Message.deleteMessage(message, task)
                res.json({message: `Message with id ${message} deleted`})
            } else{throw new NotMatchingMessage()
            }            
        }catch(err){next(err)}
    }

}