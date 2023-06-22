const express = require("express");
const app = express();
const cors = require('cors');
const port = 3000;

// Sample initial book list
let blogs = [
    {
      id: 1,
      title: "Blog 1",
      author: "Author 1",
      body: "Body 1"
    },
    {
      id: 2,
      title: "Blog 2",
      author: "Author 2",
      body: "Body 2"
    },
    {
      id: 3,
      title: "Blog 3",
      author: "Author 3",
      body: "Body 3"
    },
  ];

app.use(cors());
app.use(express.json());

app.use(express.static('public'));

//app.get("/", (req, res) => res.send("Hello World!"));
  
// Get all books
app.get("/bloglist", (req, res) => {
    res.json(blogs);
});
  
// Create a new book
app.post("/blogadd", (req, res) => {
    const { id, title, author, body } = req.body;
  
    // Check if required fields are provided
    if (!id || !title || !author || !body) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }
  
    const newBlog = { id, title, author, body };
    blogs.push(newBlog);
  
    res.status(201).json(newBlog);
});
  
// Delete a book by ID
app.delete("/blogdelete", (req, res) => {
    const blogId = parseInt(req.body.id);
    const index = blogs.findIndex((blog) => blog.id === blogId);
  
    if (index !== -1) {
      blogs.splice(index, 1);
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Blog not found" });
    }
  });

app.put("/blogedit", (req, res) => {
    const blogId = parseInt(req.body.id);
    const { title, author, body } = req.body;
  
    // Find the book in the array
    const blogIndex = blogs.findIndex((blog) => blog.id === blogId);
  
    // Check if the book exists
    if (blogIndex === -1) {
      res.status(404).json({ error: "Book not found" });
      return;
    }
  
    // Update the book information
    blogs[blogIndex].title = title || blogs[blogIndex].title;
    blogs[blogIndex].author = author || blogs[blogIndex].author;
    blogs[blogIndex].body = body || blogs[blogIndex].body;
  
    res.status(205).json(blogs[blogIndex]);
  });
  

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
