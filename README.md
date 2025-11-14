# Book Review API - Course Project

This project implements a RESTful API for managing books and reviews with user authentication.

## Installation

```bash
npm install
```

## Running the Server

```bash
node server.js
```

Server will run on `http://localhost:5000`

## Testing Instructions

### Tasks 1-5: General User Endpoints (No Authentication Required)

#### Task 1: Get all books
```bash
curl http://localhost:5000/books
```

#### Task 2: Get book by ISBN
```bash
curl http://localhost:5000/books/isbn/111
```

#### Task 3: Get books by author
```bash
curl http://localhost:5000/books/author/John
```

#### Task 4: Get books by title
```bash
curl http://localhost:5000/books/title/Node
```

#### Task 5: Get book reviews
```bash
curl http://localhost:5000/books/review/111
```

### Tasks 6-7: User Authentication

#### Task 6: Register new user
```bash
curl -X POST http://localhost:5000/users/register -H "Content-Type: application/json" -d "{\"username\":\"testuser\",\"password\":\"password123\"}"
```

#### Task 7: Login as registered user
```bash
curl -X POST http://localhost:5000/users/login -H "Content-Type: application/json" -d "{\"username\":\"testuser\",\"password\":\"password123\"}"
```

Save the token from the response for Tasks 8-9.

### Tasks 8-9: Authenticated User Endpoints

#### Task 8: Add/Modify a book review
```bash
curl -X PUT http://localhost:5000/books/review/111 -H "Content-Type: application/json" -H "Authorization: Bearer YOUR_TOKEN_HERE" -d "{\"review\":\"Amazing book!\"}"
```

#### Task 9: Delete book review
```bash
curl -X DELETE http://localhost:5000/books/review/111 -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Tasks 10-13: Node.js Client with Axios

Run the client program:
```bash
node client.js
```

This will execute all four tasks:
- Task 10: Get all books (async/await)
- Task 11: Search by ISBN (Promises)
- Task 12: Search by Author (async/await)
- Task 13: Search by Title (async/await)

## API Endpoints Summary

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | /books | Get all books | No |
| GET | /books/isbn/:isbn | Get book by ISBN | No |
| GET | /books/author/:author | Get books by author | No |
| GET | /books/title/:title | Get books by title | No |
| GET | /books/review/:isbn | Get book reviews | No |
| POST | /users/register | Register new user | No |
| POST | /users/login | Login user | No |
| PUT | /books/review/:isbn | Add/modify review | Yes |
| DELETE | /books/review/:isbn | Delete review | Yes |

## Screenshot Naming Convention

1. `1-getallbooks.png` - Task 1
2. `2-getdetailsISBN.png` - Task 2
3. `3-getbooksbyauthor.png` - Task 3
4. `4-getbooksbytitle.png` - Task 4
5. `5-getbookreview.png` - Task 5
6. `6-register.png` - Task 6
7. `7-login.png` - Task 7
8. `8-reviewadded.png` - Task 8
9. `9-deletereview.png` - Task 9




🧭 Aim

To build a secure user authentication system using Node.js, Express, MongoDB, bcrypt for password hashing, and JWT for token-based authentication.


---

⚙️ Algorithm (Short Version)

1. Start the Express server and connect to MongoDB.


2. Define user schema with username, email, and password.


3. Hash password using bcrypt before saving.


4. Create Register API to save new users.


5. Create Login API to verify user and generate JWT tokens.


6. Store and validate refresh tokens for renewing access.


7. Use JWT middleware to protect routes.


8. Implement Profile and Logout APIs.


9. Return JSON responses.


10. Stop the server.




---

💻 Program (Short Version)

// User Model
const userSchema = new mongoose.Schema({
  username: String, email: String, password: String
});

userSchema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

// Register
async function register(req, res) {
  const user = new User(req.body);
  await user.save();
  res.json({ msg: "User registered successfully" });
}

// Login
async function login(req, res) {
  const user = await User.findOne({ email: req.body.email });
  const accessToken = generateAccessToken(user);
  const refreshToken = crypto.randomBytes(64).toString("hex");
  res.json({ msg: "Login successful", accessToken, refreshToken });
}

// Auth Middleware
function auth(req, res, next) {
  jwt.verify(req.headers.token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = user;
    next();
  });
}


---

🧾 Output

Registration: “User registered successfully”

Login: Returns accessToken + refreshToken

Profile: Displays user details (password hidden)

Logout: “Logout successful”



---

📊 Result

Secure user registration, login, JWT authentication, and session handling were successfully implemented using Node.js, Express, MongoDB, bcrypt, and JWT.
