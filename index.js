// index.js
const express = require("express");
const app = express();
const cors = require("cors");
const { BlogPosts } = require("./BlogPosts");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json(); 

app.use(cors()); // Kích hoạt CORS cho tất cả các route

app.post("/api/post", jsonParser, (req, res) => {
  const post = {
    slug: req.body.slug,
    title: req.body.title,
    description: req.body.description,
  };
  BlogPosts.push(post);
  res.status(200).send({ message: "Posted successful" });
});
app.post("/api/login", jsonParser, (req, res) => {
  const creds = {
    username: req.body.username,
    password: req.body.password,
  };
  if (creds.username === "admin" && creds.password === "123") {
    res.status(200).send({ message: "Login successful" });
  } else {
    res.status(400).send({ message: "Login failed" });
  }
});
app.get("/api/posts", function (req, res) {
  const q = req.query.q;
  if (q) {
    const post = BlogPosts.filter((d) =>
      d.slug.toLowerCase().includes(q.toLowerCase())
    );
    res.status(200).send(JSON.stringify(post));
  } else {
    res.send(JSON.stringify(BlogPosts));
  }
});
app.get("/api/posts/count", function (req, res) {
  const count = BlogPosts.length;
  res.status(200).send({ count: count });
});
app.get("/api/posts/:slug", function (req, res) {
  const slug = req.params.slug;
  const post = BlogPosts.find((element) => element.slug === slug);
  if (post) res.send(JSON.stringify(post));
  else res.status(404).send("Not found");
});
const port = 8080;
app.listen(port, function () {
  console.log(`Backend server đang chạy tại http://localhost:${port}`);
});
