const mongoose  = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect(`mongodb://localhost:27017/ecommerce-backend-app`, {useNewUrlParser: true})
    .then(()=>{
        console.log('connected to db')
    })
    .catch(()=>{
        console.log('error connecting to db')
    })

module.exports = mongoose