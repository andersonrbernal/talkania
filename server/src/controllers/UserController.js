import User from "../models/User.js";
import bcrypt, { compare } from 'bcrypt'
import jwt from 'jsonwebtoken'

class UserController {
    static async getUser(req, res) {
        /**
         * Gets the user data (except the password) stored in the database and sends it back as a json objectin the response.
         * @param {[Request]} req Request
         * @param {[Response]} res Response
         */
        const id = req.params.id

        try {
            const user = await User.findById(id)

            if (user) {
                const { password, ...otherDetails } = user._doc
                return res.status(200).json(otherDetails)
            }

            return res.status(404).json({ message: 'User not found.' })

        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }

    static async updateUser(req, res) {
        /**
         * Updates user data. It doesn't allow anyone other than the user or the admin to perform this action.
         * @param {[Request]} req Request
         * @param {[Response]} res Response
         */
        const id = req.params.id
        const { _id, currentUserAdminStatus, password } = req.body
        const theCurrentUserOrTheAdminIsUpdating = id === _id || currentUserAdminStatus

        if (theCurrentUserOrTheAdminIsUpdating) {
            if (password) {
                const saltRounds = await bcrypt.genSalt(10)
                req.body.password = await bcrypt.hash(password, saltRounds)
            }

            try {
                const user = await User.findByIdAndUpdate(id, req.body, { new: true })
                const token = jwt.sign(
                    { email: user.email, id: user._id },
                    process.env.JWT_SECRET,
                    { expiresIn: '1h' }
                )
                return res.status(200).json({ user: user, token: token })
            } catch (error) {
                return res.status(500).json({ message: error.message })
            }

        } else {
            return res.status(403).json({ message: 'Access Denied! You can only update your own account.' })
        }
    }

    static async deleteUser(req, res) {
        /**
         * Deletes the account. It doesn't allow anyone other than the user or the admin to perform this action.
         * @param {[Request]} req Request
         * @param {[Response]} res Response
         */
        const id = req.params.id
        const { currentUserId, currentUserAdminStatus } = req.body
        const theCurrentUserOrTheAdminIsDeleting = currentUserId == id || currentUserAdminStatus

        if (theCurrentUserOrTheAdminIsDeleting) {
            try {
                await User.findByIdAndDelete(id)
                return res.status(200).json({ message: 'User deleted successfully.' })
            } catch (error) {
                return res.status(500).json({ message: error.message })
            }

        }

        return res.status(403).json({ message: 'Access Denied. You can only delete your own account.' })
    }

    static async followUser(req, res) {
        /**
         * Follows another user. It doesn't allow anyone other than the user to perform this action.
         * @param {[Request]} req Request
         * @param {[Response]} res Response
         */
        const id = req.params.id
        const { _id } = req.body
        const userIsTryingToFollowTheirself = _id === id

        if (userIsTryingToFollowTheirself) {
            return res.status(403).json({ message: 'Action forbidden.' })
        }

        try {
            const followUser = await User.findById(id)
            const followingUser = await User.findById(_id)
            const followerIsNotAlreadyFollowingTheUser = !followUser.followers.includes(_id)

            if (followerIsNotAlreadyFollowingTheUser) {
                await followUser.updateOne({ $push: { followers: _id } })
                await followingUser.updateOne({ $push: { following: id } })
                return res.status(200).json({ message: 'User followed.' })
            }

            return res.status(403).json({ message: 'User is already followed by you.' })

        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }

    static async unfollowUser(req, res) {
        /**
         * Unfollows a user. It doesn't allow anyone other than the user or the admin to perform this action.
         * @param {[Request]} req Request
         * @param {[Response]} res Response
         */
        const id = req.params.id
        const { _id } = req.body
        const userIsTryingToFollowTheirself = _id === id

        if (userIsTryingToFollowTheirself) {
            return res.status(403).json({ message: 'Action forbidden.' })
        }

        try {
            const followUser = await User.findById(id)
            const followingUser = await User.findById(_id)
            const followerIsFollowingTheUser = followUser.followers.includes(_id)

            if (followerIsFollowingTheUser) {
                await followUser.updateOne({ $pull: { followers: _id } })
                await followingUser.updateOne({ $pull: { following: id } })
                return res.status(200).json({ message: 'User unfollowed.' })
            }

            return res.status(403).json({ message: 'User is not followed by you.' })

        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }

    static async getAllUsers(req, res) {
        try {
            let users = await User.find()
            users = users.map(user => {
                const { password, ...otherDetails } = user._doc
                return otherDetails
            })
            res.status(200).json(users)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }
}

export default UserController