const authorizeUser = function(req, res, next){
    console.log(req.user.role)
    if(req.user.role.includes('admin')) {
        next()
    } else {
        res.status('403').send({
            notice: 'the page doesnt exist'
        })
    }
}

module.exports = authorizeUser