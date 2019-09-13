const mongoose = require('mongoose');

const BookSchema = mongoose.Schema({
    title: String,
    content: String,
    author: String,
    page: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('Book', BookSchema);