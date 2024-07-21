// ALL code is written here that connects to SQL and queries the database.
// Step 1 -> Create a database in mysql using mysql cmd.
// Step 2 -> Setup npm in the project and install mysql2 mosule in the project.
// Step 3 -> Establish a connection with the notes_app in mysql db and then query the notes table.
// Step 4 -> Use environment variables.
// Step 5 -> Create a function that returns the first object from the query that we are passing to the prepared statement.
// Step 6 -> Integrate all this into an express app.
// 6.1 export all the functions so that they can be imported and used by express.

// In this file, we basically have all the code that fetches all the data from the database and in a seperate app.js file
// we will be putting all express code that we require for creating a http server and then making get and post requests from
// the server to the db.

import mysql from "mysql2";

import dotenv from "dotenv";

dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

export async function getNotes() {
  const [notes] = await pool.query("select * from notes");
  return notes;
}

export async function getNote(id) {
  const [note] = await pool.query(
    `
    select * 
    from notes where 
    id = ?`,
    [id]
  );

  return note[0];
}

export async function createNotes(title, contents) {
  const [result] = await pool.query(
    `insert 
    into notes(title,contents) values
    (?,?)`,
    [title, contents]
  );

  return getNote(result.insertId);
}

// const result = await createNotes("test", "test");
// console.log(result);
