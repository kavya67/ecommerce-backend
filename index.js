const express = require('express')
const mongoose = require('./config/database')

const app = express()
const port  = 3006

const userRouter = require('./app/controllers/usercontroller')
const addressRouter = require('./app/controllers/addressController')
const categoryRouter  = require('./app/controllers/admin/categoryController')

app.use(express.json())
app.use('/users', userRouter)
app.use('/address', addressRouter)
app.use('/category', categoryRouter)

app.listen(port, ()=>{
    console.log('listening to port ', port)
})
