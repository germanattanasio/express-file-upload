var express = require('express');
var multer  = require('multer');
var bodyParser = require('body-parser');


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
var upload = multer({ storage: storage });
var app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.post('/upload', upload.single('file'), function (req, res, next) {
  console.log(req.body);
  console.log(req.file);
  res.send('File uploaded!');
});

app.get('/ping', function (req, res, next) {
  res.send('pong');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
