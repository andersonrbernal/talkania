import mongoose from 'mongoose'

class Connection {
    constructor(app) {
        this.app = app
    }

    static connect(app) {
        try {
            mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
            console.log(process.env.DB_URI, process.env.PORT, process.env.JWT_SECRET)
            app.listen(3000)
        } catch (error) {
            console.log(error.message)
        }
    }
}

export default Connection