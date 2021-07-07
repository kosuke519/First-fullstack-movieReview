import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";

function App() {
  const [movieName, setMovieName] = useState("");
  const [review, setReview] = useState("");
  const [movieReviewList, setMovieList] = useState([]);

  const { newReview, setNewReview } = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/get").then((response) => {
      setMovieList(response.data);
    });
  }, []);

  const submitReview = () => {
    Axios.post("http://localhost:3001/insert", {
      movieName: movieName,
      movieReview: review,
    });

    setMovieList([
      ...movieReviewList,
      { movieName: movieName, movieReview: review },
    ]);
  };

  const deleteReview = (movie) => {
    Axios.delete(`http://localhost:3001/delete/${movie}`);
  };

  const updateReview = (movie) => {
    Axios.put("http://localhost:3001/update", {
      movieName: movie,
      movieReview: newReview,
    });

    setNewReview("");
  };

  return (
    <div className="App">
      <h1>映画レビュー</h1>

      <div className="form">
        <label>映画名</label>
        <input
          type="text"
          name="movieName"
          onChange={(e) => {
            setMovieName(e.target.value);
          }}
        />

        <label>感想</label>
        <input
          type="text"
          name="review"
          onChange={(e) => {
            setReview(e.target.value);
          }}
        />

        <button onClick={submitReview}>作成</button>

        {movieReviewList.map((val) => {
          return (
            <div className="card">
              <h1>{val.movieName}</h1>
              <p> {val.movieReview}</p>

              <button
                onClick={() => {
                  deleteReview(val.id);
                }}
              >
                削除
              </button>

              <input
                type="text"
                id="updateInput"
                onChange={(e) => {
                  setNewReview(e.target.value);
                }}
              />
              <button
                onClick={() => {
                  updateReview(val.movieName);
                }}
              >
                更新
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
