const { PromisedDatabase } = require("promised-sqlite3");

const db = new PromisedDatabase();
db.open("database.db");
insertTables();
// skapar tables (database)
async function insertTables() {
  try {
    const res = await db.exec(
      `
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
