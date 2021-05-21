const router = require('express').Router();
const {checkUsernameFree, checkFields, verifyReturningUser} = require('./auth-middleware')
const tokenBuilder = require('../middleware/token-builder')
const Auth = require('./auth-model')
const bcrypt = require('bcryptjs')

router.post('/register', checkUsernameFree, checkFields, (req, res, next) => {
  const {username, password} = req.body
  const trimUser = username.trim()
  const hash = bcrypt.hashSync(password, 8)

  Auth.add({username: trimUser, password: hash})
  .then(user => {
    res.status(201).json(user)
  })
  .catch(next)

});

router.post('/login', checkFields, verifyReturningUser, (req, res, next) => {
  const {username} = req.body

  Auth.findBy({username})
  .then(([user]) => {
    const token = tokenBuilder(user)
    res.json({
      message: `welcome, ${user.username}`,
      token
    })
  })
  .catch(next)
});

module.exports = router;
