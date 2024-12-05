import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import multer from 'multer'
import session from 'express-session'
import cors from 'cors'
import userModel from './schemas/users.js'

mongoose.connect("mongodb://localhost:27017/edustream").then(() => {
    console.log(`Connected to database edustream`)
})
dotenv.config({ path: "E:/Programs/js/EduStream/server/.env" })

class ManageDB {
    async registerUser(userData) {
        await userModel.create(userData)
    }
}
let db = new ManageDB()

const app = express()
const port = process.env.PORT

app.use(cors({ origin: "*" }))
app.use(session({
    secret: "a-secret-key",
    resave: false,
    saveUninitialized: true
}))

app.post("/register", multer().none(), async (req, res) => {
    try {
        let userData = {
            email: req.body.email,
            display_name: req.body.display_name,
            password: req.body.password
        }
        req.session.email = userData.email
        await db.registerUser(userData)

        res.json({ auth: true })
    } catch (error) {

        if (error.code === 11000) {
            let duplicate_field = error.keyPattern
            res.json({ auth: false, message: `Please check the "${Object.keys(duplicate_field)[0]}" again. Account with this email already exists!!` })
        } else {
            res.json({ auth: false, message: "Can you please try again in some time?? The server is crying in under-pressure!!" })
        }

    }
})

app.listen(port, () => {
    console.log(`Server is listening on ${port}`)
})