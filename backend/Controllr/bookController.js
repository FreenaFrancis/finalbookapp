const BookModel = require('../models/Books'); // Correct import path

// Create a new book
const CreatBook = async (req, res) => {
  try {
    const { bookname, author, price, description, publishDate, pages, publisher,category } = req.body;

    // Check if the image file exists
    if (!req.file) {
      return res.status(400).send({ message: 'Image file is required' });
    }

    const image = req.file.filename; // Get image file name from Multer

    // Create a new book in the database
    const newBook = await BookModel.create({
      bookname,
      price,
      description,
      author,
      pages,
      publishDate,
      publisher, 
      category,
      image
    });

    res.status(201).send(newBook);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Failed to create book', error: err });
  }
};

// get by category

const category= async (req, res) => {
  try {
    const books = await BookModel.find({ category: req.params.category });
    res.status(200).json(books);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching books by category', error });
  }
};


// Get all books
const getAllBooks = (req, res) => {
  BookModel.find()
    .then((books) => {
      res.send(books);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ message: 'Failed to fetch books', error: err });
    });
};

// Get book by ID
const getBooksById = (req, res) => {
  const id = req.params.id;

  BookModel.findById(id)
    .then((book) => {
      res.send(book);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ message: 'Failed to fetch book', error: err });
    });
};

// Delete book
const deleteBook = (req, res) => {
  const id = req.params.id;

  BookModel.findByIdAndDelete(id)
    .then((book) => {
      res.send(book);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ message: 'Failed to delete book', error: err });
    });
};

// Update book
const updatebook = (req, res) => {
  const id = req.params.id;

  BookModel.findByIdAndUpdate(id, req.body, { new: true }) // Use { new: true } to return the updated document
    .then((book) => {
      res.send(book);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ message: 'Failed to update book', error: err });
    });
};

module.exports = { CreatBook, getAllBooks, getBooksById, deleteBook, updatebook,category };
