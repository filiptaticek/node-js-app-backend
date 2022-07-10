const bcrypt = require('bcrypt') //importing module for hashing the password
const usersRouter = require('express').Router() //creating a new router
const User = require('../models/user') //importing User mongo object 

//ANOTATION: this controller is used for pushing users data to the server and getting them from it

usersRouter.get('/', async (request, response) => { //controller for getting all the users from the server
    const users = await User
    .find({}).populate('posts', {content:1, likes: 1, date: 1})
    response.json(users)
  })

usersRouter.post('/', async (request, response) => { //controller for sending new people to the database
  const { username, name, password } = request.body

  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(400).json({
      error: 'username must be unique'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter
