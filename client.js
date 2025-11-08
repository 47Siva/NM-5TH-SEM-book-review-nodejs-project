const axios = require("axios");

const BASE_URL = "http://localhost:5000";

// Task 10: Get all books using async callback function
async function getAllBooks() {
  try {
    const response = await axios.get(`${BASE_URL}/books`);
    console.log("Task 10 - All Books:");
    console.log(JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// Task 11: Search by ISBN using Promises
function getBookByISBN(isbn) {
  return axios.get(`${BASE_URL}/books/isbn/${isbn}`)
    .then(response => {
      console.log(`Task 11 - Book with ISBN ${isbn}:`);
      console.log(JSON.stringify(response.data, null, 2));
      return response.data;
    })
    .catch(error => {
      console.error("Error:", error.message);
    });
}

// Task 12: Search by Author using async/await
async function getBooksByAuthor(author) {
  try {
    const response = await axios.get(`${BASE_URL}/books/author/${author}`);
    console.log(`Task 12 - Books by ${author}:`);
    console.log(JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// Task 13: Search by Title using async/await
async function getBooksByTitle(title) {
  try {
    const response = await axios.get(`${BASE_URL}/books/title/${title}`);
    console.log(`Task 13 - Books with title containing '${title}':`);
    console.log(JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// Run all tasks
async function runAllTasks() {
  console.log("=== Running Client Tasks ===\n");
  
  await getAllBooks();
  console.log("\n---\n");
  
  await getBookByISBN("111");
  console.log("\n---\n");
  
  await getBooksByAuthor("John");
  console.log("\n---\n");
  
  await getBooksByTitle("Node");
  console.log("\n---\n");
}

// Export functions for individual testing
module.exports = {
  getAllBooks,
  getBookByISBN,
  getBooksByAuthor,
  getBooksByTitle
};

// Run if executed directly
if (require.main === module) {
  runAllTasks();
}
