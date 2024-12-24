const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true, // Confirms true if the book title is added
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    trending: {
        type: Boolean,
        required: true,
    },
    coverImage: {
        type: String,
        required: true,
    },
    oldPrice: {
        type: Number,
        required: true,
    },
        newPrice: {
        type: Number,
        required: true,
    },
    
    createdAt: {
        type: Date,
        default: Date.now,
    }
}, {
    timestamps: true, // Adds `createdAt` and `updatedAt` automatically
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
