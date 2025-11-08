# Testing Guide - Step by Step

## Quick Start

### 1. Start the Server
Open a terminal and run:
```bash
cd book-review-api
node server.js
```

You should see: `Server running on port 5000`

### 2. Test All Endpoints Automatically
Open a NEW terminal (keep the server running) and run:
```bash
cd book-review-api
node test-api.js
```

This will test all Tasks 1-9 and show you the results.

### 3. Test Client Program (Tasks 10-13)
In the same terminal, run:
```bash
node client.js
```

This demonstrates the Axios client with async/await and Promises.

## Taking Screenshots

### For Postman/Thunder Client:
1. Import `postman-collection.json` into Postman or Thunder Client
2. Run each request and take screenshots

### For Browser (Tasks 1-5 only):
Open these URLs in your browser:
- Task 1: http://localhost:5000/books
- Task 2: http://localhost:5000/books/isbn/111
- Task 3: http://localhost:5000/books/author/John
- Task 4: http://localhost:5000/books/title/Node
- Task 5: http://localhost:5000/books/review/111

### For Command Line (curl):
Use the commands in README.md and take screenshots of the terminal output.

## Manual Testing Steps

### Tasks 6-9 (Requires Authentication):

1. **Register a user** (Task 6):
   - POST to http://localhost:5000/users/register
   - Body: `{"username": "testuser", "password": "password123"}`

2. **Login** (Task 7):
   - POST to http://localhost:5000/users/login
   - Body: `{"username": "testuser", "password": "password123"}`
   - **COPY THE TOKEN** from the response

3. **Add Review** (Task 8):
   - PUT to http://localhost:5000/books/review/111
   - Header: `Authorization: Bearer YOUR_TOKEN`
   - Body: `{"review": "Amazing book!"}`

4. **Delete Review** (Task 9):
   - DELETE to http://localhost:5000/books/review/111
   - Header: `Authorization: Bearer YOUR_TOKEN`

## Screenshot Checklist

- [ ] 1-getallbooks.png
- [ ] 2-getdetailsISBN.png
- [ ] 3-getbooksbyauthor.png
- [ ] 4-getbooksbytitle.png
- [ ] 5-getbookreview.png
- [ ] 6-register.png
- [ ] 7-login.png
- [ ] 8-reviewadded.png
- [ ] 9-deletereview.png
- [ ] Screenshot of client.js output (Tasks 10-13)

## Troubleshooting

**Server won't start:**
- Make sure port 5000 is not in use
- Run `npm install` first

**Authentication errors:**
- Make sure you registered the user first
- Check that you're using the correct token
- Token format: `Bearer YOUR_TOKEN_HERE`

**Client.js errors:**
- Make sure the server is running first
- Check that you're in the correct directory
