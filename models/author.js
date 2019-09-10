const mongoose = require("mongoose")

// our schema
const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Author", authorSchema)