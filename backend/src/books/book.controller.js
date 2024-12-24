const Book = require("./book.model");
const mongoose = require('mongoose');


const postABook = async (req, res) => {
    try {
        // Create a new book instance
        const newBook = new Book(req.body); // No need for `await` here

        // Save the book to the database
        await newBook.save();

        // Send success response
        res.status(200).send({ message: "Book posted successfully", book: newBook });
    } catch (error) {
        // Log and send error response
        console.error("Error creating book:", error);
        res.status(500).send({ message: "Failed to create book", error: error.message });
    }
}

//get all books
const getAllBooks = async(req, res) => {
    try{
        const books = await Book.find().sort({ createdAt: -1})// createdAt -1 updates books based on time created
        //get books from frontend/database Book(model) find(method)
        res.status(200).send(books)//send books to frontend
    } catch (error) {
        // Log and send error response
        console.error("Error fetching books:", error);
        res.status(500).send({ message: "Failed to fetch books", error: error.message });
    }

}

//get single book
const getSingleBook = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate the ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ message: "Invalid book ID" });
        }

        const book = await Book.findById(id);

        if (!book) {
            return res.status(404).send({ message: "Book not found" });
        }

        res.status(200).send(book); // Send book to frontend
    } catch (error) {
        console.error("Error fetching book:", error);
        res.status(500).send({ message: "Failed to fetch book", error: error.message });
    }
}

//update book data
const UpdateBook = async (req, res) =>{
    try {
        const {id} = req.params;
        const updatedBook = await Book.findByIdAndUpdate(id, req.body, {new: true});
        if(!updatedBook){
            res.status(404).send({message: "Book is not found"})
        }
         res.status(200).send({
            message: "Book updated successfully",
            book: updatedBook
         })
    } catch (error) {
      console.error("Error updating a book:", error);
        res.status(500).send({ message: "Failed to update a book", error: error.message });  
    }
}

//delete a book
const deleteABook = async (req, res) => { 
    try {
        const { id } = req.params;
        // Validate the ID format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ message: "Invalid book ID" });
        }

        const deletedBook = await Book.findByIdAndDelete(id); 
        if (!deletedBook) {
            return res.status(404).send({ message: "Book not found" });
        }

        res.status(200).send({
            message: "Book deleted successfully",
            book: deletedBook, // Include deleted book information
        });

    } catch (error) {
        console.error("Error deleting a book:", error);
        res.status(500).send({ message: "Failed to delete a book", error: error.message });
    }
};


module.exports = {
    postABook,
    getAllBooks,
    getSingleBook,
    UpdateBook,
    deleteABook
}