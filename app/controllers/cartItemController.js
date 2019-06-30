const express = require('express')
const router = express.Router()

const CartItem = require('../models/cartItem')

const authenticateUser = require('../middleware/authenticateUser')

// localhost:3006/cartitem

router.post('/', authenticateUser, (req,res)=>{
    const body = req.body
    const cart = new CartItem(body)
    cart.user = req.user._id
    cart.save()
        .then(cart=>res.send(cart))
        .catch(err=>res.send(err))
})

router.get('/', authenticateUser, (req, res)=>{
    CartItem.find({
        user : req.user._id
    }).populate('product',['name', 'price','category'])
        .then(cartItems=>{
            res.send(cartItems)
        })
        .catch(err=>res.send(err))
})

router.put('/:id', authenticateUser, (req, res)=>{
    const id = req.params.id
    const body = req.body
    CartItem.findOneAndUpdate({
        _id: id
    }, {$set: body}, {new: true})
        .then(cartItems=>res.send(cartItems))
        .catch(err=>res.send(err))
})

router.delete('/:id', authenticateUser, (req,res)=>{
    const id = req.params.id
    CartItem.findOneAndDelete({
        _id: id
    })
        .then(cartItems=>res.send(cartItems))
        .catch(err=>res.send(err))
})

module.exports = router
