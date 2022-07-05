require('dotenv').config() //importing dotenv, that brings us password from the .env file
const { default: mongoose } = require('mongoose')

mongoose.connect(process.env.MONGODB_URI)

const postSchema = new mongoose.Schema({
    content: String,
    likes: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  })

postSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
  
const Post = mongoose.model('Post', postSchema)

module.exports = Post