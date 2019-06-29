const express  = require('express')
const router = express.Router() 
const Address = require('../models/address')
const authenticateUSer = require('../middleware/authenticateUser')

//localhost:3006/address

router.post('/', authenticateUSer, (req, res)=>{
    const {user} = req
    const body = req.body
    const address = new Address(body)
    address.user = user._id
    address.save()
        .then(address=>res.send(address))
        .catch(err=>res.send(err))
})

router.get('/', authenticateUSer , (req,res)=>{
    Address.find({
        user: req.user._id,
      
    })
        .then(addresses=>{
            res.send(addresses)
        })
        .catch(err=>res.send(err))
})

router.put('/:id', authenticateUSer, (req,res)=>{
    const id = req.params.id
    const body = req.body
    Address.findOneAndUpdate({
        _id: id,
        user: req.user._id
        }, {$set:body},{new:true})
            .then(address=>res.send(address))
            .catch(err=>res.send(err))
})

router.delete('/:id', authenticateUSer, (req, res)=>{
    const id = req.params.id
    Address.findOneAndDelete({
        _id: id,
        user: req.user._id
    })
        .then((address)=>{
            res.send(address)
        })
        .catch(err=>res.send(err))
})

module.exports = router