const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    bookname: { // Changed from `name` to `bookname`
        type: String,
        required: true // Added required validation
    },
    author: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
    },
    publishDate: {
        type: Date,
        default: Date.now
    },
    pages: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true // Image field is required
    },
    publisher: {
        type: String,
    },
    category:{
        type:String
    }
});

const BookModel = mongoose.model('Book', bookSchema); // Singular name convention for the collection

module.exports = BookModel;
