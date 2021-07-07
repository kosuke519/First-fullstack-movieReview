const express = require("express");
const cors = require("cors");
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "dragon1",
  database: "movie-review",
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/get", (req, res) => {
  const sqlSelect = "SELECT * FROM movie_reviews";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.post("/insert", (req, res) => {
  const movieName = req.body.movieName;
  const movieReview = req.body.movieReview;
  const sqlInsert =
    "INSERT INTO movie_reviews (movieName, movieReview) VALUES (?,?)";
  db.query(sqlInsert, [movieName, movieReview], (err, result) => {
    console.log(result);
  });
});

app.delete("/delete/:id", (req, res) => {
  const name = req.params.id;
  const sqlDelete = "DELETE FROM movie_reviews WHERE id = ?";
  db.query(sqlDelete, name, (err, result) => {
    if (err) console.log(err);
  });
});

app.put("/update", (req, res) => {
  const id = req.body.id;
  const review = req.body.movieReview;

  db.query(
    "UPDATE movie_reviews SET movieReview = ? WHERE movieName = ?",
    [review, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.listen(3001, () => {
  console.log("running on port 3001");
});
