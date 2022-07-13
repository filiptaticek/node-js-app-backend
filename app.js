const config = require('./utils/config') //importing variables such as PORT or MONGO link
const express = require('express') //importing express for comunicating with server
const app = express() //making new express app
const cors = require('cors') //importing policy things
const postRouter = require('./controllers/posts') //importing controller for notes
const usersRouter = require('./controllers/users') //importing controller for users
const loginRouter = require('./controllers/login') //importing controller for login
const mongoose = require('mongoose') //importing mongoose for communicating with Mongo

mongoose.connect(config.MONGODB_URI) //connecting to database

app.use(cors()) //taking in use privacy things
app.use(express.json()) //taking in use express json 

app.use('/api/posts/', postRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter) 

module.exports = app



