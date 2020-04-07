var express = require('express');
var app = express();
var multer = require('multer');
var cors = require('cors');
router = express.Router();

const db = require('./src/Components/DB');

app.use(cors());
app.use(express.json());

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/pdf');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

var upload = multer({ storage: storage }).single('file');

app.post('/upload', function (req, res) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    console.log('this is the req file');
    console.log(req.file.filename);
    console.log('this is the req file');
    return res.status(200).send(req.file);
  });
});
app.post('/saveData', function (req, res, next) {
  console.log('hi');
  console.log(req.body);
  // console.log(req.body);
  console.log(typeof req.body);
  db.data.push(req.body);
  // console.log(db.data);
});
app.get('/getData', function (req, res, next) {
  res.send({ result: db.data });
});

app.listen(8000, function (req, res, next) {
  console.log('App running on port 8000');
});

module.exports = router;
