var express = require("express");
var app = express();
var http = require("http").Server(app);
const fs = require("fs");
const download = require("download");
var xml2js = require("xml2js");
var parser = new xml2js.Parser();
const path = require("path");
const axios = require("axios");
var multer = require("multer");
var cors = require("cors");
const connectDB = require("./DB/Connnection");
router = express.Router();
const mongoose = require("mongoose");
const transSchema = require("./DB/TransactionSchema");
const db_json = require("./src/Components/DB");

var cookieParser = require("cookie-parser");

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public/img")));
// mongoose.connect('mongodb://localhost:27017/myDb', { useNewUrlParser: true });

// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function () {
//   // we're connected!
// });

connectDB();

app.use(cors());
app.use(express.json());

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/pdf");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

var upload = multer({ storage: storage }).single("file");

app.post("/upload", function (req, res) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    console.log("this is the req file");
    console.log(req.file.filename);
    console.log("this is the req file");
    return res.status(200).send(req.file);
  });
});
app.post("/saveData", async function (req, res, next) {
  let trans = new transSchema(req.body);

  try {
    await trans.save();
    res.send({ result: "true" });
  } catch {
    res.send({ result: "false" });
  }
});
app.get("/getData", async function (req, res, next) {
  let trans = await transSchema.find({});
  res.send({ result: trans });
});
app.get("/getCurrency", async function (req, res, next) {
  axios.get("https://www.boi.org.il/currency.xml").then(function (response) {
    parser.parseString(response.data, function (err, result) {
      res.send({ result: result.CURRENCIES.CURRENCY });
    });
  });
});
app.get("/getCurrency/:date/:curr", async function (req, res, next) {
  console.log(req.params.date);
  console.log(req.params.curr);
  // var url = "https://www.boi.org.il/currency.xml";
  var url = `https://www.boi.org.il/currency.xml?rdate=${req.params.date}&curr=${req.params.curr}`;
  console.log(url);

  axios.get(url).then(function (response) {
    parser.parseString(response.data, function (err, result) {
      console.log("this is result of currencyid:");
      try {
        var tryCurr = result.CURRENCIES.CURRENCY[0].RATE[0];
        res.send({ result: true, rate: tryCurr });
        console.log("end log currncyid");
      } catch {
        console.log("you are failllddd");
        res.send({ result: false, rate: 0 });
      }
    });
  });
});

app.post("/updateData", async function (req, res, next) {
  await transSchema.findOneAndUpdate(
    { _id: req.body._id },
    req.body,
    {},
    function (err) {
      if (err) {
        res.send({ result: false });
        console.log(err);
      } else {
        res.send({ result: true });
      }
    }
  );
});

app.delete("/deleteData/:id/:file", async function (req, res, next) {
  console.log(req.params.id);

  var path = __dirname + "/public/pdf/" + req.params.file;

  await transSchema.deleteOne({ _id: req.params.id }, function (err) {
    if (err) {
      res.send({ result: false });
      console.log(err);
    } else {
      res.send({ result: true });
    }
  });
  if (req.params.file !== "null") {
    console.log(req.params.file);
    fs.unlink(path, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
  }
});
app.get("/downloadFile/:file", function (req, res, next) {
  console.log(req.params.file);
  console.log("you are in download file");
  console.log(__dirname + "/logo192.png");
  res.download(__dirname + "/public/pdf/" + req.params.file, req.params.file);
  console.log("you end the download file ");
});

app.listen(8000, function (req, res, next) {
  console.log("App running on port 8000");
});

module.exports = router;
