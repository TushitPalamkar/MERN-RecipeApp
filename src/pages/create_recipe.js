// import React, { useState } from 'react';
// import axios from 'axios';
// import { useGetUserID } from '../hooks/useGetUserID';

// export const Create_recipe = () => {
//   const userID = useGetUserID();
//   const [recipe, setRecipe] = useState({
//     name: "",
//     ingredients: [],
//     instructions: "",
//     imageURL: "",
//     cookingTime: 0,
//     userOwner: userID,
//   });

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setRecipe({ ...recipe, [name]: value });
//   };

//   const handleInstructionChange = (event) => {
//     setRecipe({ ...recipe, instructions: event.target.value });
//   };

//   const addIngredient = () => {
//     setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
//   };

//   const handleIngredientChange = (event, index) => {
//     const { value } = event.target;
//     const ingredients = [...recipe.ingredients];
//     ingredients[index] = value;
//     setRecipe({ ...recipe, ingredients });
//   };

//   const handleImageUrlChange = (event) => {
//     setRecipe({ ...recipe, imageUrl: event.target.value });
//   };

//   const handleCookingTimeChange = (event) => {
//     setRecipe({ ...recipe, cookingTime: Number(event.target.value) });
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
    
//     try {
//       await axios.post("http://localhost:3001/recipes",recipe,{
//         headers:{
//         'Content-type':'application/json'
//         }
//       })
//       alert('Recipe Created');
      
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   console.log(recipe);

//   return (
//     <div className='create-recipe'>
//       <h2>Create Recipe</h2>
//       <form onSubmit={handleSubmit}>
//         <label htmlFor='name'>Name:</label>
//         <input type='text' id='name' name='name' onChange={handleChange} />

//         <label htmlFor='ingredients'>Ingredients:</label>
//         {recipe.ingredients.map((item, index) => (
//           <input
//             type='text'
//             id='ingredients'
//             key={index}
//             value={item}
//             onChange={(event) => handleIngredientChange(event, index)}
//           />
//         ))}
//         <button type='button' onClick={addIngredient}>Add Ingredients</button>

//         <label htmlFor='instructions'>Instructions</label>
//         <textarea id='instructions' name='instructions' onChange={handleInstructionChange}></textarea>

//         <label htmlFor='imageURL'>Image URL</label>
//         <input type='text' id='imageURL' name='imageURL' onChange={handleImageUrlChange} />

//         <label htmlFor='cookingTime'>Cooking Time (minutes)</label>
//         <input type='number' id='cookingTime' name='cookingTime' onChange={handleCookingTimeChange} />

//         <button type='submit'>Create Recipe</button>
//       </form>
//     </div>
//   );
// };


import React from 'react';
import { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const Create_recipe = () => {
  const userID = useGetUserID();
  const [cookies, _] = useCookies(["access_token"]);
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageURL: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleIngredientChange = (event, index) => {
    const { value } = event.target;
    const ingredients = [...recipe.ingredients];
    ingredients[index] = value;
    setRecipe({ ...recipe, ingredients });
  };

  const handleAddIngredient = () => {
    const ingredients = [...recipe.ingredients, ""];
    setRecipe({ ...recipe, ingredients });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        "http://localhost:3001/recipes",
        { ...recipe },
        {
          headers: { authorization: cookies.access_token },
        }
      );

      alert("Recipe Created");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="create-recipe">
      <h2>Create Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={recipe.name}
          onChange={handleChange}
        />
        
        <label htmlFor="ingredients">Ingredients</label>
        {recipe.ingredients.map((ingredient, index) => (
          <input
            key={index}
            type="text"
            name="ingredients"
            value={ingredient}
            onChange={(event) => handleIngredientChange(event, index)}
          />
        ))}
        <button type="button" className='ingredients-button' onClick={handleAddIngredient}>Add Ingredient</button>
        <label htmlFor="instructions">Instructions</label>
        <textarea id="instructions" name="instructions" value={recipe.instructions} onChange={handleChange}
        ></textarea>
        <label htmlFor="imageURL">Image URL</label>
        <input type="text" id="imageURL" name="imageURL" value={recipe.imageURL} onChange={handleChange}
        />
        <label htmlFor="cookingTime">Cooking Time (minutes)</label>
        <input type="number" id="cookingTime" name="cookingTime" value={recipe.cookingTime} onChange={handleChange}
        />
        <button type="submit" className='create-recipe-button'>Create Recipe</button>
      </form>
    </div>
  );
};