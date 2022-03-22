const express = require("express");
const { get } = require("express/lib/response");
const run = require("nodemon/lib/monitor/run");
const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.listen(8000);

//------------- Database ---------------------
const { PromisedDatabase } = require("promised-sqlite3");
const db = new PromisedDatabase();
db.open("database.db");

//----------- request handlers----------------
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/ask", (req, res) => {
  console.log(req.body);
});

app.get("/success", (req, res) => {
  res.render("success");
});
