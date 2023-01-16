import express from 'express'
import PostController from '../controllers/PostController.js'

const router = express.Router()

router.get('/:id', PostController.getPost)
router.post('/create', PostController.createPost)
router.put('/:id', PostController.updatePost)
router.delete('/:id', PostController.deletePost)
router.put('/:id/like', PostController.likePost)
router.get('/:id/timeline', PostController.getTimelinePosts)

export default router