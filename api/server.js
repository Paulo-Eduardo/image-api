const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const knex = require("knex");
const bodyParser = require("body-parser");

//Database Setup
const db = knex({
  client: "pg",
  connection: process.env.POSTGRES_URI
});

const app = express();

app.use(morgan("combined"));
app.use(cors("*"));
app.use(bodyParser.json());

app.listen(3002, () => {
  console.log("app is running on port 3002");
});
