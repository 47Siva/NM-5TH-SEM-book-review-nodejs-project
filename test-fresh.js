const axios = require("axios");

const BASE_URL = "http://localhost:5000";
let authToken = "";

// Generate random username to avoid conflicts
const randomUser = `user${Date.now()}`;

async function testAPI() {
  console.log("=== Testing Book Review API (Fresh Test) ===\n");

  try {
    // Task 6: Register new user
    console.log("Task 6: Register new user");
    const register = await axios.post(`${BASE_URL}/users/register`, {
      username: randomUser,
      password: "password123"
    });
    console.log("✓ Success:", register.data);
    console.log("\n---\n");

    // Task 7: Login
    console.log("Task 7: Login as registered user");
    const login = await axios.post(`${BASE_URL}/users/login`, {
      username: randomUser,
      password: "password123"
    });
    authToken = login.data.token;
    console.log("✓ Success:", login.data);
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

    console.log("=== All Authentication Tests Completed Successfully! ===");
    
  } catch (error) {
    console.error("✗ Error:", error.response?.data || error.message);
  }
}

testAPI();
