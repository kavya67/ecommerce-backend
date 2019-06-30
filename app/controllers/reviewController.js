const express = require('express')
const router = express.Router()
const Review = require('../models/review')

const authenticateUser = require('../middleware/authenticateUser')


// localhost:3006/review

router.post('/', authenticateUser, (req,res)=>{
    const body = req.body
    const review = new Review(body)
    review.user = req.user._id
    review.save()
        .then(review=>res.send(review))
        .catch(err=>res.send(err))
})

router.get('/', (req, res)=>{
    Review.find().populate('product',['name']).populate('user', ['username'])
        .then(reviews=>{
            res.send(reviews)
        })
        .catch(err=>res.send(err))
})

router.put('/:id', authenticateUser, (req, res)=>{
    const id = req.params.id
    const body = req.body
    Review.findOneAndUpdate({
        _id: id
    }, {$set: body}, {new: true})
        .then(review=>res.send(review))
        .catch(err=>res.send(err))
})

review('/:id', authenticateUser, (req,res)=>{
    const id = req.params.id
    Review.findOneAndDelete({
        _id: id
    })
        .then(review=>res.send(review))
        .catch(err=>res.send(err))
})

module.exports = router