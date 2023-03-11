import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Favorite from "./pages/Favorite";
import Rated from "./pages/Rated";
import Login from "./pages/Login";
import MovieDetails from "./components/MovieDetails";

export default function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/rated" element={<Rated />} />
        <Route path="/login" element={<Login />} />
        <Route path="/movies/:movieId" element={<MovieDetails />} />
      </Routes>
    </div>
  );
}
