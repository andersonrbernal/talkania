import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

class AuthController {
    static async register(req, res) {
        /**
         * Register a new user in the database.
         * @param {[Request]} req Request
         * @param {[Response]} res Response
         */
        const saltRounds = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds)
        req.body.password = hashedPassword
        const newUser = new User(req.body)
        const { email } = req.body

        try {
            const oldUser = await User.findOne({ email })
            if (oldUser) {
                return res.status(400).json({ message: 'That email already exists.' })
            }

            const user = await newUser.save()
            const payload = { email: user.email, id: user._id }
            const header = { expiresIn: '3d' }

            const token = jwt.sign(payload, process.env.JWT_SECRET, header)
            return res.status(201).json({ user: newUser, token })

        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }

    static async login(req, res) {
        /**
         * Logs in the user if the email and password are correct.
         * @param {[Request]} req Request
         * @param {[Response]} res Response
         */
        const { email, password } = req.body
        const errors = { message: 'Incorrect email or password.' }

        try {
            const user = await User.findOne({ email })

            if (user) {
                const isPasswordValid = await bcrypt.compare(password, user.password)

                if (!isPasswordValid) {
                    res.status(400).json(errors)
                } else {
                    const payload = { email: user.email, id: user._id }
                    const header = { expiresIn: '3d' }

                    const token = jwt.sign(payload, process.env.JWT_SECRET, header)
                    return res.status(201).json({ user, token })
                }
            }
            else {
                return res.status(404).json(errors)
            }

        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }
}

export default AuthController