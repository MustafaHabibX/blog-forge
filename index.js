import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

// In-memory data store, because we are not using any database curretnly
let posts = [
  {
    id: 1,
    title: "Understanding RESTful APIs in Node.js",
    content:
      "RESTful APIs are the backbone of modern web applications. In this post, we explore how to design and implement REST APIs using Node.js and Express, covering best practices, route structuring, and error handling for scalable applications.",
    author: "Mustafa Habib",
    date: "2025-11-01T10:00:00Z",
  },
  {
    id: 2,
    title: "Introduction to Middleware in Express",
    content:
      "Middleware functions in Express are essential for handling requests, responses, and errors. This post dives into creating custom middleware, using third-party middleware, and understanding the request-response lifecycle for efficient backend development.",
    author: "Mustafa Habib",
    date: "2025-11-05T14:30:00Z",
  },
  {
    id: 3,
    title: "Building a Dynamic Blog Backend with Node.js",
    content:
      "Creating a fully functional blog backend requires managing routes, connecting to databases, and handling CRUD operations. This post demonstrates how to set up a dynamic blog backend using Node.js, Express, and a RESTful API architecture for modern web apps.",
    author: "Mustafa Habib",
    date: "2025-11-07T09:00:00Z",
  },
];

let lastId = 3;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// GET All posts
app.get("/posts", (req, res) => {
  res.json(posts);
});

// GET a specific post by id
app.get("/posts/:id", (req, res) => {
  const specifiedID = parseInt(req.params.id);
  const indexOfSpecifedID = posts.findIndex((post) => post.id === specifiedID);
  if (indexOfSpecifedID !== -1) {
    res.json(posts[indexOfSpecifedID]);
  } else {
    res.json({ error: "ID not found" });
  }
});

// POST a new post
app.post("/posts", (req, res) => {
  const recievedRequest = req.body;
  const newPost = {
    id: lastId + 1,
    title: recievedRequest.title,
    content: recievedRequest.content,
    author: recievedRequest.author,
  };
  posts.push(newPost);
  res.json(posts);
});

// PATCH a post when you just want to update one parameter
app.patch("/posts/:id", (req, res) => {
  const recievedRequest = req.body;
  const specifiedID = parseInt(req.params.id);
  const indexOfSpecifedID = posts.findIndex((post) => post.id === specifiedID);
  const specifiedPost = posts[indexOfSpecifedID];

  if (indexOfSpecifedID !== -1) {
    const updatedPost = {
      id: specifiedPost.id,
      title:
        (specifiedPost.title = recievedRequest.title) || specifiedPost.title,
      content:
        (specifiedPost.content = recievedRequest.content) ||
        specifiedPost.content,
      author:
        (specifiedPost.author = recievedRequest.author) || specifiedPost.author,
    };

    res.json(posts);
  } else {
    res.json({ error: "Error" });
  }
});

// DELETE a specific post by providing the post id.
app.delete("/posts/:id", (req, res) => {
  const specifiedID = parseInt(req.params.id);
  const indexOfSpecifedID = posts.findIndex((post) => post.id === specifiedID);

  if (indexOfSpecifedID !== -1) {
    posts.splice(indexOfSpecifedID, 1);
    res.json(posts);
  } else {
    res.json(posts);
  }
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
