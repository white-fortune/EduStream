import mongoose from "mongoose";

let TasksSchema = new mongoose.Schema({
    stream: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "streams"
    },
    title: {
        type: String,
        requird: true
    },
    description: {
        type: String,
        default: "Didn't you get it from the title!?"
    },
    state: {
        type: String,
        enum: ["on-going", "done", "backlog"],
        required: true
    },
    task_id: {
        type: String,
        unique: true
    },
    date: {
        type: Date,
        default: new Date()
    }
})

TasksSchema.pre("save", function(next) {
    this.task_id = crypto.randomUUID()
    next()
})


let taskModel = mongoose.model('tasks', TasksSchema)
export default taskModel