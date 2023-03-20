import React from "react";
import { Link } from "react-router-dom";
function navbar(props) {
  return (
    <nav>
      <Link to="/">Main</Link>
      <Link to="/fridge">Fridge</Link>
      <Link to="/recipe">Recipe</Link>
      <Link to="/contact">Contact</Link>
    </nav>
  );
}

export default navbar;
