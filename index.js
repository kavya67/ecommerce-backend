const express = require('express')
const mongoose = require('./config/database')

const app = express()
const port  = 3006

const userRouter = require('./app/controllers/usercontroller')

app.use(express.json())
app.use('/users', userRouter)

app.listen(port, ()=>{
    console.log('listening to port ', port)
})
