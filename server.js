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

app.listen(/*process.env.PORT || */ 3001, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
