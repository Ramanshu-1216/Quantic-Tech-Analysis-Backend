const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    contactPerson: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
});

const Client = mongoose.model('Client', clientSchema);
module.exports = Client;
