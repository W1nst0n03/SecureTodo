const mongoose = require('mongoose');

const TodoSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false,
        required: true
    },
    timestamp: {
        type: String,
        default: Date.now(),
        required: true
    },
})
 
module.exports = mongoose.model("Todo", TodoSchema);
