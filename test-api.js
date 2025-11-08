const axios = require("axios");

const BASE_URL = "http://localhost:5000";
let authToken = "";

async function testAPI() {
  console.log("=== Testing Book Review API ===\n");

  try {
    // Task 1: Get all books
    console.log("Task 1: Get all books");
    const allBooks = await axios.get(`${BASE_URL}/books`);
    console.log("✓ Success:", JSON.stringify(allBooks.data, null, 2));
    console.log("\n---\n");

    // Task 2: Get book by ISBN
    console.log("Task 2: Get book by ISBN (111)");
    const bookByISBN = await axios.get(`${BASE_URL}/books/isbn/111`);
    console.log("✓ Success:", JSON.stringify(bookByISBN.data, null, 2));
    console.log("\n---\n");

    // Task 3: Get books by author
    console.log("Task 3: Get books by author (John)");
    const booksByAuthor = await axios.get(`${BASE_URL}/books/author/John`);
    console.log("✓ Success:", JSON.stringify(booksByAuthor.data, null, 2));
    console.log("\n---\n");

    // Task 4: Get books by title
    console.log("Task 4: Get books by title (Node)");
    const booksByTitle = await axios.get(`${BASE_URL}/books/title/Node`);
    console.log("✓ Success:", JSON.stringify(booksByTitle.data, null, 2));
    console.log("\n---\n");

    // Task 5: Get book review
    console.log("Task 5: Get book review (ISBN: 111)");
    const bookReview = await axios.get(`${BASE_URL}/books/review/111`);
    console.log("✓ Success:", JSON.stringify(bookReview.data, null, 2));
    console.log("\n---\n");

    // Task 6: Register new user
    console.log("Task 6: Register new user");
    const register = await axios.post(`${BASE_URL}/users/register`, {
      username: "testuser",
      password: "password123"
    });
    console.log("✓ Success:", register.data);
    console.log("\n---\n");

    // Task 7: Login
    console.log("Task 7: Login as registered user");
    const login = await axios.post(`${BASE_URL}/users/login`, {
      username: "testuser",
      password: "password123"
    });
    authToken = login.data.token;
    console.log("✓ Success:", login.data);
    console.log("Token saved for authenticated requests");
    console.log("\n---\n");

    // Task 8: Add/Modify review
    console.log("Task 8: Add/Modify book review");
    const addReview = await axios.put(
      `${BASE_URL}/books/review/111`,
      { review: "This is an amazing book! Highly recommended." },
      { headers: { Authorization: `Bearer ${authToken}` } }
    );
    console.log("✓ Success:", addReview.data);
    console.log("\n---\n");

    // Verify review was added
    console.log("Verifying review was added:");
    const verifyReview = await axios.get(`${BASE_URL}/books/review/111`);
    console.log("✓ Current reviews:", JSON.stringify(verifyReview.data, null, 2));
    console.log("\n---\n");

    // Task 9: Delete review
    console.log("Task 9: Delete book review");
    const deleteReview = await axios.delete(
      `${BASE_URL}/books/review/111`,
      { headers: { Authorization: `Bearer ${authToken}` } }
    );
    console.log("✓ Success:", deleteReview.data);
    console.log("\n---\n");

    console.log("=== All Tests Completed Successfully! ===");
    
  } catch (error) {
    console.error("✗ Error:", error.response?.data || error.message);
  }
}

testAPI();
