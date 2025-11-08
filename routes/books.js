const express = require("express");
const router = express.Router();
const books = require("../data/books.json");
const { authenticateToken } = require("./users");

// Store user reviews separately
const userReviews = {};

// Task 1: Get all books
router.get("/", (req, res) => {
  res.json(books);
});

// Task 2: Get books by ISBN
router.get("/isbn/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const book = Object.values(books).find(b => b.isbn === isbn);
  res.json(book || { message: "Book not found" });
});

// Task 3: Get books by author
router.get("/author/:author", (req, res) => {
  const author = req.params.author.toLowerCase();
  const results = Object.values(books).filter(b => b.author.toLowerCase() === author);
  res.json(results);
});

// Task 4: Get books by title
router.get("/title/:title", (req, res) => {
  const title = req.params.title.toLowerCase();
  const results = Object.values(books).filter(b => b.title.toLowerCase().includes(title));
  res.json(results);
});

// Task 5: Get book review
router.get("/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const book = Object.values(books).find(b => b.isbn === isbn);
  
  if (!book) {
    return res.json({ message: "Book not found" });
  }
  
  // Get all reviews for this book
  const reviews = userReviews[isbn] || {};
  res.json({ isbn, reviews });
});

// Task 8: Add/Modify a book review (authenticated)
router.put("/review/:isbn", authenticateToken, (req, res) => {
  const isbn = req.params.isbn;
  const { review } = req.body || {};
  const username = req.user.username;
  
  if (!review) {
    return res.status(400).json({ message: "Review text is required" });
  }
  
  const book = Object.values(books).find(b => b.isbn === isbn);
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }
  
  if (!userReviews[isbn]) {
    userReviews[isbn] = {};
  }
  
  userReviews[isbn][username] = review;
  res.json({ message: "Review added/updated successfully", review });
});

// Task 9: Delete book review (authenticated)
router.delete("/review/:isbn", authenticateToken, (req, res) => {
  const isbn = req.params.isbn;
  const username = req.user.username;
  
  if (!userReviews[isbn] || !userReviews[isbn][username]) {
    return res.status(404).json({ message: "Review not found" });
  }
  
  delete userReviews[isbn][username];
  res.json({ message: "Review deleted successfully" });
});

module.exports = router;
