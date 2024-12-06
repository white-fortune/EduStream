import mongoose from "mongoose";
import slugify from "slugify";

let StreamsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "users"
    },
    description: {
        type: String,
        default: "I don't know man!"
    },
    stream_type: {
        type: String,
        enum: ["private", "public"],
        default: "private"
    },
    stream_id: {
        type: String,
        unique: true
    }
})

StreamsSchema.pre('save', function(next) {
    if (this.isModified("name")) {
        this.stream_id = slugify(this.name, {
            lower: "true",
            strict: true,
            trim: true
        }) + "-" + crypto.randomUUID().split("-")[4]
    }
    next()
})

let streamModel = mongoose.model('streams', StreamsSchema)
export default streamModel