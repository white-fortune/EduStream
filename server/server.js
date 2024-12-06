import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import multer from 'multer'
import session from 'express-session'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import userModel from './schemas/users.js'
import streamModel from './schemas/streams.js'
import taskModel from './schemas/tasks.js'

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
                    resolve(user.userID)
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

    async createStream(streamData) {
        let stream = await streamModel.create(streamData)
        return stream.populate('author', 'display_name')
    }

    async getProfileMetaData(userID) {
        let user = await userModel.findOne({ userID: userID }, { display_name: 1, email: 1 })
        return user
    }

    async getStreamMetaData(stream_id) {
        let stream = await streamModel.findOne({ stream_id: stream_id }, { name: 1 })
        return stream
    }

    async getStreams() {
        let streams = await streamModel.find({ stream_type: "public"}).populate('author', 'display_name')
        return streams
    }

    async addTask(taskData) {
        let task = await taskModel.create(taskData)
        return task
    }

    async getTasks(stream_id) {
        let stream = await streamModel.findOne({ stream_id: stream_id }, { _id: 1 })
        let tasks = await taskModel.find({ stream: stream._id })
        return tasks
    }
}
let db = new ManageDB()

const app = express()
const port = process.env.PORT

app.use(cors({ origin: "http://localhost:5173", credentials: true }))
app.use(cookieParser())
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

app.get("/api/session", async (req, res) => {
    req.session.email ? res.json({ auth: true }) : res.json({ auth: false })
})
app.get("/api/getStreams", async (req, res) => {
    let publicStreams = await db.getStreams()
    res.json({ streams: publicStreams })
})
app.post("/api/createStream", multer().none(), async (req, res) => {
    let streamData = {
        name: req.body.name,
        author: (await db.getProfileMetaData(req.body.userID))._id,
        description: req.body.description,
        stream_type: req.body.stream_type
    }
    try {
        let stream = await db.createStream(streamData)
        return res.json({ ok: true, stream: stream })
    } catch (error) {
        res.json({ ok: false, message: error })
    }
})
app.get("/api/getStreamMetaData", async (req, res) => {
    let stream_id = req.query.streamID
    let stream = await db.getStreamMetaData(stream_id)
    res.json(stream)
})
app.post("/api/addTask", multer().none(), async (req, res) => {
    let stream = (await db.getStreamMetaData(req.body.stream))._id
    let taskData = {
        stream: stream,
        title: req.body.title,
        description: req.body.description,
        state: req.body.state
    }
    let task = await db.addTask(taskData)
    res.json(task)
})
app.get("/api/getTasks", async (req, res) => {
    let stream_id = req.query.streamID
    let tasks = await db.getTasks(stream_id)
    res.json(tasks)
})

app.post("/register", multer().none(), async (req, res) => {
    if (req.session.email) {
        res.redirect("/profile")
    } else {
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
            let userID = await db.varifyLogin(userData)
            req.session.email = userData.email
            res.cookie('userID', userID)

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