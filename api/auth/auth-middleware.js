const Auth = require('./auth-model')
const bcrypt = require('bcryptjs')

function checkUsernameFree(req, res, next) {
    const username = req.body.username
    Auth.findBy({username})
    .then(([user]) => {
        if(user) {
        res.status(422).json({
            message: `username taken`
        })
        } else {
        next()
        }
    })
}

function checkFields(req, res, next) {
    const {username, password} = req.body

    if (
        !username 
        || username.trim() === null 
        || !password
        || password.trim() === null
    ){
        res.status(422).json({
            message: `username and password required`
        })
    } else {
        next()
    }
}

function verifyReturningUser(req, res, next) {
    const {username, password} = req.body
  
    Auth.findBy({username})
    .then(([user]) => {
        if (user && bcrypt.compareSync(password, user.password)) {
            next()
        } else {
            res.status(401).json({
                message: `invalid credentials`
            })
        }
    })
}

module.exports = {
    checkUsernameFree,
    checkFields,
    verifyReturningUser
}