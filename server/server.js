import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

mongoose.connect("mongodb://localhost:27017/edustream").then(() => {
    console.log(`Connected to database edustream`)
})

dotenv.config({ path: "E:/Programs/js/EduStream/server/.env" })

const app = express()
const port = process.env.PORT

app.listen(port, () => {
    console.log(`Server is listening on ${port}`)
})