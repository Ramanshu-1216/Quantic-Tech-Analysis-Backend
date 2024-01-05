const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    client: {
        type: mongoose.Types.ObjectId,
        ref: "Client"
    },
    camname: {
        type: String
    },
    location: {
        tpye: String
    },
    violationType: {
        type: String
    },
    tags: {
        type: String
    },
    assigned: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String
    },
    imagepath: {
        type: String
    },
    live: {
        type: String,
        enum: ["yes", "no"]
    },
    comments: [
        {
            user: {
                type: mongoose.Types.ObjectId,
                ref: "User"
            },
            message: {
                type: String
            },
            time: {
                type: Date
            },
        },
    ],
})

const ReportModel = mongoose.model('Report', reportSchema);
module.exports = ReportModel;