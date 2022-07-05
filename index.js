/*const Post = require('./models/post') //importing our user object

const express = require('express') //importing express app
const app = express() //making new express app

const cors = require('cors') //importing policy
app.use(cors()) //allowing policy
app.use(express.json()) //THIS IS EXTREMELY IMPORTANT

app.get('/', (request, response) => {
  Post.find({}).then(
    posts=>response.json(posts)
  )
})  

app.post('/api/posts', (request, response) =>{
  const body = request.body

  if (body.content === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const post = new Post({
    content: body.content,
    likes: body.likes
  })

  post.save().then(savedNote => {
    response.json(savedNote)
  })
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})*/

const app = require('./app') // the actual Express application
const http = require('http')
const config = require('./utils/config')

const server = http.createServer(app)

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})
