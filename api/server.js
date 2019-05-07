const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const knex = require("knex");
const bodyParser = require("body-parser");
const tinify = require("tinify");

tinify.key = process.env.TINY_KEY;

var multer = require("multer");
var upload = multer({ dest: "uploads/" });

const imageController = require("./controllers/image");
//Database Setup
const db = knex({
  client: "pg",
  connection: process.env.POSTGRES_URI
});

const app = express();

app.use(morgan("combined"));
app.use(cors("*"));
app.use(bodyParser.json());

app.post("/upload", upload.single("image"), (req, res) => {
  imageController.handleUploadImage(req, res, db, tinify);
});

app.listen(3002, () => {
  console.log("app is running on port 3002");
});
