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
        ref: "groups"
    },
    followed_group: {
        type: [mongoose.Schema.Types.ObjectId],
        default: [],
        ref: "groups"
    }
})

UsersSchema.pre('save', function(next) {
    this.userID = crypto.randomUUID()
    next()
})

let userModel = mongoose.model('users', UsersSchema)
export default userModel