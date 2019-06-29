const express = require('express')
const router = express.Router()

const Product = require('../../models/product')

const authenticateUser = require('../../middleware/authenticateUser')
const authorizeUser = require('../../middleware/authorizeUser')

router.post('/', authenticateUser, authorizeUser, (req,res)=>{
    const body = req.body
    const product = new Product(body)
    product.save()
        .then(product=>res.send(product))
        .catch(err=>res.send(err))
} )

router.get('/' , (req, res)=>{
    Product.find().populate('category',['name'])
        .then(products=>res.send(products))
        .catch(err=>res.send(err))
})

router.put('/:id', authenticateUser, authorizeUser, (req,res)=>{
    const id =req.params.id
    const body = req.body
    Product.findOneAndUpdate({
        _id: id
    },{$set: body}, {new: true})
        .then(product=>res.send(product))
        .catch(err=>res.send(err))
})

router.delete('/:id' , authenticateUser, authorizeUser, (req, res)=>{
    const id = req.params.id
    Product.findOneAndDelete({
        _id: id
    })
        .then((product)=>res.send(product))
        .catch(err=>res.send(err))

})

module.exports = router