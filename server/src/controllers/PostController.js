import mongoose from 'mongoose'
import Post from '../models/Post.js'
import User from '../models/User.js'

class PostController {
    static async createPost(req, res) {
        /**
         * Creates the post based on the request data, and the ID of the user who is creating it.
         * @param {[Request]} req Request
         * @param {[Response]} res Response
         */
        const newPost = new Post(req.body)

        try {
            await newPost.save()
            return res.status(200).json({ message: newPost })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: error.message })
        }
    }

    static async getPost(req, res) {
        /**
         * Sends the post back as a response.
         * @param {[Request]} req Request
         * @param {[Response]} res Response
         */
        const id = req.params.id

        try {
            const post = await Post.findById(id)
            return res.status(200).json(post)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }

    static async updatePost(req, res) {
        /**
         * Gets the data as well as the ID of the user, and updates the post with the newest data. 
         * @param {[Request]} req Request
         * @param {[Response]} res Response
         */
        const postId = req.params.id
        const { userId } = req.body

        try {
            const post = await Post.findById(postId)
            const userCanUpdatePost = post.userId === userId

            if (userCanUpdatePost) {
                await post.updateOne({ $set: req.body })
                return res.status(200).json({ message: 'Post updated.' })
            } else {
                return res.status(403).json({ message: 'Action forbidden.' })
            }
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }

    static async deletePost(req, res) {
        /**
         * Deletes post.
         * @param {[Request]} req Request
         * @param {[Response]} res Response
         */
        const postId = req.params.id
        const { userId } = req.body

        try {
            const post = await Post.findById(postId)
            const userCanDeletePost = post.userId === userId

            if (userCanDeletePost) {
                await post.deleteOne()
                return res.status(200).json({ message: 'Post deleted.' })
            } else {
                return res.status(403).json({ message: 'Action forbidden.' })
            }
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }

    static async likePost(req, res) {
        /**
         * Likes the post if the person hasn't liked it yet, otherwise, dislikes it.
         * @param {[Request]} req Request
         * @param {[Response]} res Response
         */
        const id = req.params.id
        const { userId } = req.body

        try {
            const post = await Post.findById(id)
            const userHasNotLikedPost = !post.likes.includes(userId)

            if (userHasNotLikedPost) {
                await post.updateOne({ $push: { likes: userId } })
                return res.status(200).json({ message: 'Post liked.' })
            } else {
                await post.updateOne({ $pull: { likes: userId } })
                return res.status(200).json({ message: 'Post disliked.' })
            }

        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }

    static async getTimelinePosts(req, res) {
        /**
         * Gets the posts of the own user and the people he/she is following.
         * @param {[Request]} req Request
         * @param {[Response]} res Response
         */
        const userId = req.params.id

        try {
            const currentUserPosts = await Post.find({ userId: userId })
            const followingPosts = await User.aggregate([
                {
                    $match: {
                        _id: new mongoose.Types.ObjectId(userId)
                    }
                },
                {
                    $lookup: {
                        from: 'posts',
                        localField: 'following',
                        foreignField: 'userId',
                        as: 'followingPosts'
                    }
                },
                {
                    $project: {
                        followingPosts: 1,
                        _id: 0
                    }
                }
            ])

            return res.status(200).json(currentUserPosts.concat(...followingPosts[0].followingPosts).sort((a, b) => {
                return b.createdAt - a.createdAt
            }))

        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }
}

export default PostController