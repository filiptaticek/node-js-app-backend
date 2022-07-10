const postRouter = require('express').Router()
const Post = require('../models/post')
const User = require('../models/user') 
const jwt = require('jsonwebtoken')

//ANOTATION: this controller is used for pushing notes to the server and getting them from it 

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

postRouter.get('/', async(request, response) => { //controller for getting the notes from the server
    const notes = await Post
      .find({}).populate('user', { username: 1})
  
    response.json(notes)
})

postRouter.post('/', async(request, response) => { //controller for sending new posts
  const { content, date } = request.body
  const likes = 0

  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  
  if (content === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }
  
  const post = new Post({
    content,
    likes,
    date,
    user,
  })
  
  const savedPost = await post.save()
  user.posts = user.posts.concat(savedPost._id)
  await user.save()

  response.status(201).json(savedPost)
})
  
module.exports = postRouter