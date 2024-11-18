const mongoose = require('mongoose')

const associateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    associateGrp: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
}, {timestamps: true})

module.exports = mongoose.model("Associate", associateSchema)
