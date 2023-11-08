const express = require('express');
const router = express.Router();
const { body, check, validationResult } = require('express-validator');
const Book = require('./model/Book')

const validateIdParam = [
  check('id')
    .notEmpty()
    .isMongoId()
    .withMessage('Invalid ID format')
];

const countWords = (value) => {
  if (!value) {
    return true; 
  }
  const wordCount = value.split(/\s+/).filter((word) => word.length > 0).length;
  return wordCount >= 5; 
};

const createReuseableValidation = () => {
  return [
    body('title').notEmpty().trim().withMessage('Title should not be empty'),
    body('author').notEmpty().trim().withMessage('Author name should not be empty'),
    body('description').custom(countWords).withMessage('Description should be at least 5 words'),
  ];
};
router.post('/create-book', createReuseableValidation(), async(req,res)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    return res.status(400).json({ errors: errorMessages });
  }
    try {
        const { title, author, description} = req.body;
        const deleted = false;
        const newBook = new Book({ title, author, description, deleted });
        await newBook.save();
        res.status(201).json({ message: 'Book details stored successfully' });
      } catch (error) {
        res.status(501).json({ error: error.message });
      }
})

router.put('/update-book/:id',[...createReuseableValidation(), ...validateIdParam], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    return res.status(400).json({ errors: errorMessages });
  }

  const { title, author, description } = req.body;
  const bookId = req.params.id;

  try {
    const book = await Book.findOne({ _id: bookId, deleted: true });
    if (book) {
      return res.status(404).json({ error: 'Book not found or has been deleted' });
    }
    const updatedBook = await Book.findOneAndUpdate(
      { _id: bookId },
      { $set: { title, author, description } },
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ error: 'Book not found' });
    }

    return res.status(200).json({ message: 'Book details updated successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
    
  });

  router.get('/get-all-books', async (req, res) => {
    try {
      const nonDeletedBooks = await Book.find({ deleted: false });
      return res.status(200).json(nonDeletedBooks);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });

  router.get('/get-book/:id', validateIdParam, async (req, res) => {
    const bookId = req.params.id; 
  
    try {
      const book = await Book.findById(bookId);
  
      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }
      return res.status(200).json(book);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });

  router.patch('/delete-book/:id', validateIdParam, async (req, res) => {
    const bookId = req.params.id;
    try {
      const updatedBook = await Book.findByIdAndUpdate(
        bookId,
        { deleted: true },
        { new: true }
      );
      if (!updatedBook) {
        return res.status(404).json({ error: 'Book not found' });
      }
      return res.status(200).json({ message: 'Book details deleted successfully' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });

module.exports = router;