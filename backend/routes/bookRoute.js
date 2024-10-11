
const express=require('express');
const BookModel = require('../models/Books');
const { CreatBook, getAllBooks, getBooksById, deleteBook, updatebook, category } = require('../Controllr/bookController');
const { varifyUser, isAdmin } = require('../Controllr/userController');
const path=require('path')
const multer = require('multer');

const router=express.Router()

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images"); // Path to store images
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname)); // File name
    },
  }); 
  
  
  const upload = multer({ storage: storage });
  // router.post('/addbook',isAdmin, upload.single('image'), CreatBook);
//   router.post('/addbook', requireSignIn, upload.single('image'), CreatBook);
router.post('/addbook/:id', upload.single('image'),isAdmin, CreatBook);

// get book
router.get('/getBook',getAllBooks)
router.get('/getBookById/:id',getBooksById)
router.delete('/deleteBook/:id',deleteBook)
router.put('/updatebook/:id',updatebook)
router.get('/getBooksByCategory/:category',category)
module.exports=router