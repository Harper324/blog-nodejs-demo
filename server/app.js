// import {addPosts} from "../service/db-operation";
const express = require("express");
const app = express();
const multer = require("multer");
const cors = require("cors");
const port = 8080;
const path = require("path");
const jwt = require("jsonwebtoken");
const {
  addUser,
  addPost,
  getUser,
  getUserPosts,
  getAllPosts
} = require("../service/db-operation");

const mockUser = {
  userName: "aaa",
  password: "111"
};

app.use(
  "/",
  express.static("./dist", {
    index: "index.html"
  })
);
app.use(cors());
app.use(express.urlencoded());
app.use(express.json());

app.listen(port, () => {
  console.log(`server is listenning on http://localhost:${port}`);
});

var storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, "blogs");
  },
  filename: function(req, file, callback) {
    callback(null, file.originalname);
  }
});

var upload = multer({ storage: storage }).single("file");

app.post("/upload", function(req, res) {
  upload(req, res, function(err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).send(req.file);
  });
});

app.get("/download", function(req, res, next) {
  res.download("blogs/Node.md", "Node.md", function(err) {
    if (err) {
      console.log(err);
    }
  });
});

app.post("/login", function(req, res, next) {
  console.log(req.headers, "reqreq--------");
  console.log(req.body, "bodybody-----");
  // res.send("<p>hhhhhhhh</p>");
  const { body } = req;
  const { userName, password } = body;
  if (userName === mockUser.userName && password === mockUser.password) {
    jwt.sign({ mockUser }, "privatekey", { expiresIn: "1h" }, (err, token) => {
      if (err) throw err;
      res.setHeader("token", token);
      res.send("<p>hhhhhhhh</p>");
    });
  } else {
    console.log("Login failed!");
  }
});

app.get("/", function(req, res) {
  console.log(req.headers, "req----------");
  getAllPosts().then(result => res.send(result));
});

app.get("/user/1/posts", function(req, res) {
  const token = req.headers.authorization.slice(6);
  console.log(token, "token--------------------");
  jwt.verify(token, "privatekey", { expiresIn: "1h" }, err => {
    if (err) throw err;
    getUserPosts(1).then(result => res.send(result));
  });
});

app.post("/", function(req, res) {
  console.log(req.body, "req from frontend----------");
  const post = req.body;
  addPost(post);
  res.write("yes");
  res.end();
});
