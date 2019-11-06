const express = require("express");
const app = express();
const multer = require("multer");
const cors = require("cors");
const port = 8080;
const path = require("path");


app.use(
  "/",
  express.static("./dist", {
    index: "index.html"
  })
);
app.use(cors());

app.listen(port, () => {
  console.log("this app is listenning on port", port);
});

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
    callback(null, 'blogs')
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname )
  }
});

var upload = multer({ storage: storage }).single('file');

app.post('/upload',function(req, res) {
     
    upload(req, res, function (err) {
           if (err instanceof multer.MulterError) {
               return res.status(500).json(err)
           } else if (err) {
               return res.status(500).json(err)
           }
      return res.status(200).send(req.file)

    })
});

app.get('/download', function (req, res, next) {
    var options = {
      root: '/Users/xi.cao/Documents/blog-nodejs-demo/blogs',
      dotfiles: 'deny',
      headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
      }
    }
  
    var fileName = 'Node.md';
    // res.sendFile(fileName, options, function (err) {
    //   if (err) {
    //     next(err)
    //   } else {
    //     console.log('Sent:', fileName)
    //   }
    // })
    res.download('blogs/Node.md','Node.md',function(err) {
        if(err) {
            console.log(err);
        }
    });
  })
