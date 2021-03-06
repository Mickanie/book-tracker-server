const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = express.Router();

const app = express();
app.use(cors());
app.use(express.json()); //żeby móc pracować z jsonem
app.use(bodyParser.urlencoded({ extended: true })); //do czytania formularzy
app.use(bodyParser.json());
app.use(router);

const db = [];

//get all books
router.get("/booklist", async (req, res) => {
  res.send(db);
});

//add a new book
router.post("/add-book", async (req, res) => {
  const { title, author, ISBN, pages, rating } = req.body;
  const newBook = {
    title,
    author,
    ISBN,
    pages,
    rating
  };
  console.log(db);
  db.push(newBook);
  res.json(db);
});

//delete a book
router.delete("/delete-book", async (req, res) => {
  const { ISBN } = req.body;
  index = db.findIndex(x => x.ISBN === ISBN);
  db.splice(index, 1);
  res.json(db);
});

//edit a book
router.put("/edit-book", async (req, res) => {
  const { ISBN, title, author, newISBN, pages, rating } = req.body;
  index = db.findIndex(x => x.ISBN === ISBN);
  const modifiedBook = {
    title,
    author,
    ISBN: newISBN,
    pages,
    rating
  };
  db[index] = modifiedBook;
  res.json(db);
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
