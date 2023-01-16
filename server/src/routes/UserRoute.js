import express from "express"
import authMiddleWare from "../../middleware/authMiddleware.js"
import UserController from "../controllers/UserController.js"

const router = express.Router()
router.get('/', UserController.getAllUsers)
router.get('/:id', UserController.getUser)
router.put('/:id', authMiddleWare, UserController.updateUser)
router.delete('/:id', authMiddleWare, UserController.deleteUser)
router.put('/:id/follow', authMiddleWare, UserController.followUser)
router.put('/:id/unfollow', authMiddleWare, UserController.unfollowUser)

export default router