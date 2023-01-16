import mongoose from 'mongoose'

const postStructure = {
    userId: {
        type: String,
        required: true
    },
    description: String,
    likes: [],
    image: String
}

const opt = { timestamps: true }

const postSchema = new mongoose.Schema(postStructure, opt)
const Post = mongoose.model('Post', postSchema)
export default Post