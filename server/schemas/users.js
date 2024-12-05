import mongoose, { mongo } from "mongoose";

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
    owned_group: {
        type: [mongoose.Schema.Types.ObjectId],
        default: [],
        ref: "groups"
    }
})

let userModel = mongoose.model('users', UsersSchema)
export default userModel