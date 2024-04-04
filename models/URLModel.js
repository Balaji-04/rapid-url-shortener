const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema( {
    urlKey: {
        unique: true,
        required: true,
        type: String
    },
    longURL: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
} );

const UrlModel = mongoose.model("UrlModel", urlSchema);

module.exports = UrlModel;
