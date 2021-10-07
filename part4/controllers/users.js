const bcrypt = require('bcrypt')
const router = require('express').Router()
const User = require('../models/user')

router.post('/', async (request, response) => {
  const { password, name, username } = request.body

  if (!password || password.length < 3) {
    return response.status(400).send({ error: 'password needs to be at least 3 characters' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username, name, passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

router.get('/', async (request, response) => {
  const users = await User
    .find({})
    .populate('user', { username: 1, name: 1 })

  response.json(users.map(u => u.toJSON()))
})

module.exports = router