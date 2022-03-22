const express = require("express");

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
app.get("/", async (req, res) => {
  try {
    const departments = await db.all("SELECT * FROM departments");
    res.render("index", { departments: departments });
  } catch (error) {
    console.log(error);
  }
});

app.post("/ask", async (req, res) => {
  console.log(req.body);
  const { email, title, department, question } = req.body;
  console.log(email, title, Number(department), question);
  try {
    const response = await db.insert(
      `INSERT INTO messages 
      (email, title, body, department_id, answered) VALUES 
      (${email}, ${title}, ${question},${department}, '0');`
    );
    res.redirect("/success");
  } catch (error) {
    console.log(error);
    res.redirect("/error");
  }
});

app.get("/success", (req, res) => {
  res.render("success");
});
app.get("/error", (req, res) => {
  res.render("error");
});
