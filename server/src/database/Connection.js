import mongoose from 'mongoose'

class Connection {
    constructor(app) {
        this.app = app
    }

    static connect(app) {
        try {
            mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
            app.listen(process.env.PORT)
        } catch (error) {
            console.log(error.message)
        }
    }
}

export default Connection