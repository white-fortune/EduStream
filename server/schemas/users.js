import mongoose from "mongoose";

let UsersSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    display_name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userID: {
        type: String,
        unique: true
    },
    owned_group: {
        type: [mongoose.Schema.Types.ObjectId],
        default: [],
        ref: "streams"
    },
    followed_group: {
        type: [mongoose.Schema.Types.ObjectId],
        default: [],
        ref: "streams"
    }
})

UsersSchema.pre('save', function(next) {
    this.userID = crypto.randomUUID()
    next()
})

let userModel = mongoose.model('users', UsersSchema)
export default userModel