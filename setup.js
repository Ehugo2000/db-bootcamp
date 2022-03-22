const { PromisedDatabase } = require("promised-sqlite3");

const db = new PromisedDatabase();
db.open("database.db");
insertTables();
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
      `
    );
  } catch (error) {
    console.log(error);
  }
}
