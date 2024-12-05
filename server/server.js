import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import multer from 'multer'
import session from 'express-session'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import userModel from './schemas/users.js'

mongoose.connect("mongodb://localhost:27017/edustream").then(() => {
    console.log(`Connected to database edustream`)
})
dotenv.config({ path: "E:/Programs/js/EduStream/server/.env" })

class ManageDB {
    async registerUser(userData) {
        await userModel.create(userData)
    }

    async varifyLogin(userData) {
        return new Promise(async (resolve, rejecet) => {
            let user = await userModel.findOne({ email: userData.email })
            if (!user) {
                rejecet("No user is associated with this email!")
            } else {
                let password = user.password
                if (password === userData.password) {
                    resolve(user)
                } else {
                    rejecet("Password is incorrect!")
                }
            }
        })
    }

    async showProfile(email) {
        let user = await userModel.findOne({ email: email }, { email: 1, display_name: 1 })
        return user
    }
}
let db = new ManageDB()

const app = express()
const port = process.env.PORT

app.use(cors({ origin: "http://localhost:5173", credentials: true }))
app.use(session({
    secret: "a-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60
    }
}))
app.use(cookieParser())

app.get("/api/session", async (req, res) => {
    req.session.email ? res.json({ auth: true }) : res.json({ auth: false })
})

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

app.post("/login", multer().none(), async (req, res) => {
    if (req.session.email) {
        res.redirect("/profile")
    } else {
        try {
            let userData = {
                email: req.body.email,
                password: req.body.password
            }
            await db.varifyLogin(userData)
            req.session.email = userData.email
            res.json({ auth: true })
        } catch (error) {
            res.json({ auth: false, message: error })
        }
    }
})

app.get("/profile", async (req, res) => {
    if (!req.session.email) {
        res.redirect("/login")
    } else {
        let user = await db.showProfile(req.session.email)
        res.json(user)
    }
})

app.listen(port, () => {
    console.log(`Server is listening on ${port}`)
})