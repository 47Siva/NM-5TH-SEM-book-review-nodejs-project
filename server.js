const express = require("express");
const booksRoutes = require("./routes/books");
const { router: usersRoutes } = require("./routes/users");

const app = express();

// Use Express built-in body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/books", booksRoutes);
app.use("/users", usersRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
