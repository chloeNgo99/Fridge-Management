import React from "react";
import { useNavigate } from "react-router-dom";

function Main(props) {
  const navigate = useNavigate();
  let click = false;
  const handleLoginClick = () => {
    navigate("/fridge");
  };

  return (
    <div className="MainContainer">
      <div
        className="MainLeftPanel"
        style={{ backgroundImage: "url(./images/recipeBG2.png)" }}
      >
        <div className="mainLeftContainer">
          <img className="logo" src="./images/logo.png" />       
          <h1>What's In My Fridge</h1>
          <h4>
            Managing your fridge better with personal food checker. Help improve
            your eating habits and your spending ✨
          </h4>
          <div className="mainButtons">
            <button onClick={handleLoginClick}>Login</button>
            <button>Sign Up</button>
          </div>
        </div>
      </div>
      <div className="MainRightPanel">
        <img src="./images/foodgrid1.png" alt="background" />
      </div>
    </div>
  );
}

export default Main;
