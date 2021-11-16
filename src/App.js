import React, { Component } from "react";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import Home from "./components/Home";
import Photo from "./components/Photo";

function App() {
  const isLoggedIn = false;
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/photo" element={<Photo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
