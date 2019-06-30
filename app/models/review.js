const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reviewSchema = new Schema({
    title :{
        type: String,

    },
    body: {
        type: String
    },
    rating:{
        type: Number
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    product:{
        type: Schema.Types.ObjectId,
        ref: "Product"
    },
    createdAt:{
        type: Date,
        default:Number(Date.now()) 
    }
})

const Review = mongoose.model('Review', reviewSchema)

module.exports = Review