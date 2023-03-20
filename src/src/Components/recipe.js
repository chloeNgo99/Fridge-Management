import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";

function recipe(props) {
  const [cookingTime, setCookingTime] = useState("0 minutes");
  const [recipeName, setRecipeName] = useState("Recipe Name");
  const [instructions, setInstructions] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    // console.log(inputValue);
  };

  //fetching the api
  const handleFormSubmit = (event) => {
    event.preventDefault();
    setInputValue("");
    // call API with inputValue
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "14c30e365dmsh0ec57fceeb56256p1db741jsn6ca9897824ab",
        "X-RapidAPI-Host": "recipe-generator.p.rapidapi.com",
      },
    };

    fetch(
      `https://recipe-generator.p.rapidapi.com/recipe-generator?ingredients=${inputValue}`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setInstructions(response.instructions);
        // setInstructions(response.searches);
        setIngredients(response.ingredients);
        setCookingTime(response.cookingTimeInMinutes);
        setRecipeName(response.recipeName);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    // re-render component whenever state updates
  }, [instructions, ingredients, cookingTime, recipeName]);

  const itemsPerPage = 7;
  const [currentPage, setCurrentPage] = useState(1);

  const handleClickPrev = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleClickNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return (
    <div
      className="recipeContainer"
      style={{ backgroundImage: "url(./images/recipeBG6.png)" }}
    >
      <Navbar style={{ display: "relative" }} />
      <div className="recipeTopPanel">
        <h2>Input the Ingredients</h2>
        <input
          type="text"
          id="textbox"
          name="textbox"
          className="textbox"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button type="submit" className="submitBtn" onClick={handleFormSubmit}>
          Submit
        </button>
        <h1>{recipeName}</h1>
      </div>
      <div className="recipeBottomPanel">
        <div className="recipeLeftPanel">
          <div className="recipeInstructions">
            <h2>Instructons:</h2>
            {instructions
              ? instructions.map((instruction, index) => {
                  return (
                    <div key={index} className="instruction">
                      - {instruction}
                    </div>
                  );
                })
              : null}
            <p>Cooking Time: {cookingTime}</p>
          </div>
        </div>
        <div className="recipeRightPanel">
          <h2>Ingredients</h2>
          <div className="ingredientDisplay">
            {ingredients
              ? ingredients
                  .slice(startIndex, endIndex)
                  .map((ingredient, index) => {
                    return (
                      <div key={index} className="ingredient">
                        - {ingredient}
                      </div>
                    );
                  })
              : null}
          </div>
          <div className="ingredientsBts">
            <button onClick={handleClickPrev} disabled={currentPage === 1}>
              {"<"}
            </button>
            <p>{`${currentPage}/${Math.ceil(
              ingredients.length / itemsPerPage
            )}`}</p>
            <button
              onClick={handleClickNext}
              disabled={endIndex >= ingredients.length}
            >
              {">"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default recipe;
