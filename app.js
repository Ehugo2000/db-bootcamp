const express = require('express');
const { get } = require('express/lib/response');
const run = require('nodemon/lib/monitor/run');
const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.listen(8000);

//------------- Database ---------------------
const { PromisedDatabase } = require('promised-sqlite3');
const db = new PromisedDatabase();
db.open('database.db');

// skapar tables (database)
async function insertTables() {
  try {
    const res = await db.exec(
      `
      CREATE TABLE departments (
        department_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        PRIMARY KEY('department_id' AUTOINCREMENT)
      );
      CREATE TABLE messages (
        message_id INTEGER NOT NULL,
        email TEXT NOT NULL,
        title TEXT NOT NULL,
        body TEXT NOT NULL,
        answered INTEGER NOT NULL,
        department_id INTEGER NOT NULL,
        FOREIGN KEY('department_id')
          REFERENCES deparments (department_id)
      );
      INSERT INTO departments (name) VALUES ('IT');
      INSERT INTO departments (name) VALUES ('Finance');
      INSERT INTO departments (name) VALUES ('Human resources');
      INSERT INTO departments (name) VALUES ('Marketing');
      INSERT INTO departments (name) VALUES ('Production');
      INSERT INTO departments (name) VALUES ('Research');
      `

    );
  } catch (error) {
    console.log(error);
  }
}

function dbEntryPoint() {
  insertTables()
}

dbEntryPoint();

//----------- request handlers----------------
app.get('/', (req, res) => {
  res.render('index');
});

app.post('/ask', (req, res) => {
  console.log(req.body);
});

app.get('/success', (req, res) => {
  res.render('success');
});
