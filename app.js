const express = require('express')
require('dotenv').config()

const app = express()
const userRoutes = require('./routes/users')

app.use( express.json() )

app.use('/api/v1', userRoutes)




const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Running on port ${PORT}`))