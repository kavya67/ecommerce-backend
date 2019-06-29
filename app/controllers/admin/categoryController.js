const express = require('express')
const router = express.Router()
const Category = require('../../models/category')

const authenticateUser = require('../../middleware/authenticateUser')
const authorizeUser = require('../../middleware/authorizeUser')

//locahost:3006/category

router.post('/', authenticateUser, authorizeUser, (req,res)=>{
    const body = req.body
    const category = new Category(body)
    category.save()
        .then(category=>{
            res.send(category)
        })
        .catch(err=>{
            res.send(err)
        })
})

router.get('/', (req,res)=>{
    Category.find()
        .then(categories=>{
            res.send(categories)
        })
        .catch(err=>{
            res.send(err)
        })
})

router.put('/:id', authenticateUser, authorizeUser, (req,res)=>{
    const id =req.params.id
    const body = req.body
    Category.findOneAndUpdate({
        _id: id
    }, {$set: body}, {new: true})
        .then(category=>{
            res.send(category)
        })
        .catch(err=>res.send(err))

})

router.delete('/:id', authenticateUser, authorizeUser, (req,res)=>{
    const id = req.params.id
    Category.findOneAndDelete({_id: id})
        .then(()=>{
            res.send('deleted successfully')
        })
        .catch(err=>{
            res.send(err)
        })
})

module.exports = router