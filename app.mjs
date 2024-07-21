// This file will have the express code for creating a server and making get and post requests to the db from that server.
// We are using express 5 instead of express 4 because 5 gives us the functionality of async error handling.

import express from "express";

// Now, we want to make the request and actuallyget the response from the db.
import { getNote, getNotes, createNotes } from "./database.mjs";

// Creating express app
const app = express();

// This is to say that any json body will be accepted and passed in the req.body object.
app.use(express.json());

// We are making a get request to the server, which can be checked by thunderclient. If we open
// thunderclient and then make a get request to the port 8080, we should get the response
// 'this should be the notes' in return.

app.get("/notes", async (req, res) => {
  const notes = await getNotes();
  res.status(201).send(notes);
});

// function to get a single note
app.get("/notes/:id", async (req, res) => {
  const id = req.params.id;
  const note = await getNote(id);
  res.send(note);
});

// Now, make a post request.
app.post("/notes", async (req, res) => {
  const { title, contents } = req.body;
  const notes = await createNotes(title, contents);
  res.send(notes);
});

// Error handling function
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// listening on port 8080, to check if the local server created by express is running there.
app.listen(8080, () => {
  console.log("server is running on port 8080");
});
