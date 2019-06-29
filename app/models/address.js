const mongoose  = require('mongoose')
const Schema = mongoose.Schema

const addressSchema = new Schema({
    type: {
        type: String
    },
    street:{
        type: String                                                                                            
    },
    city: {
        type: String 
    },
    pin: {
        type: String
    },
    landmark:{
        type: String
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

})

const Address = mongoose.model('Address', addressSchema)
module.exports = Address