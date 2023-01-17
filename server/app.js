import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import AuthRoute from './src/routes/AuthRoute.js'
import dotenv from 'dotenv'
import cors from 'cors'
import UserRoute from './src/routes/UserRoute.js'
import PostRoute from './src/routes/PostRoute.js'
import UploadRoute from './src/routes/UploadRoute.js'
import Connection from './src/database/Connection.js'

const app = express()
dotenv.config()

const bodyParserConfig = { limit: '30mb', extended: true }
const publicFolder = express.static('public')

// Middleware
app.use(bodyParser.json(bodyParserConfig))
app.use(bodyParser.urlencoded(bodyParserConfig))
app.use(cors())
app.use(publicFolder)
app.use('/images', express.static('images'))
mongoose.set('strictQuery', true)

// Connection
Connection.connect(app)

// Routes
app.use('/auth', AuthRoute)
app.use('/user', UserRoute)
app.use('/post', PostRoute)
app.use('/upload', UploadRoute)