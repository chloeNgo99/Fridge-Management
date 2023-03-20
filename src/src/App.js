import "./App.css";
import Fridge from "./Components/Fridge";
import Recipe from "./Components/recipe";
import Contact from "./Components/contact";
import Main from "./Components/Main";
import React from "react";
import style from"./Components/style.css";
import {BrowserRouter, Route, Routes, Link, useNavigate} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div>
      
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/fridge" element={<Fridge />} />
          <Route path="/recipe" element={<Recipe />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;




