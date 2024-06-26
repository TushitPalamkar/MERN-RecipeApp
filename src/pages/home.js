import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios';
import { useGetUserID } from '../hooks/useGetUserID';
export const Home = () => {
  const[recipe,setRecipe]=useState([]);
  const[savedRecipe,setsavedRecipe]=useState([])
  const userID=useGetUserID();
  useEffect(()=>{
    const fetchRecipe=async()=>{
      try{
        const response=await axios.get("https://recipeapp-backend-rkvm.onrender.com/recipes")
        setRecipe(response.data)
        console.log(response.data)
      }
      catch(error)
      {
        console.error(error)
      }
    }
    const fetchsavedRecipe=async()=>{
      const response =await axios.get(`https://recipeapp-backend-rkvm.onrender.com/recipes/savedRecipes/ids/${userID}`)
      setsavedRecipe(response.data.savedRecipes)
    }
    fetchRecipe();
    fetchsavedRecipe();
  },[])
  const saveRecipe=async(recipeID)=>{
    await axios.put("https://recipeapp-backend-rkvm.onrender.com/recipes",{recipeID,userID})
  }
  // const issavedRecipe=(id)=>{
  //   return savedRecipe.includes(id);
  // };
  return (
    <div className='recipe-text'>
      <h2>Recipes</h2>
      <ul>
        {recipe.map((recipes)=>(
          <li key={recipes._id}>
            
            <div>
              <h2>{recipes.name}</h2>
              <button className='save-recipe' onClick={()=>saveRecipe(recipes._id)}>Save</button>
                // {issavedRecipe(recipes._id)?"Saved":"Save Recipe!"} 
                
            </div>
            <div className='instructions'>
              <p><b>Instructions: {recipes.instructions}</b></p>
            </div>
            <img src={recipes.imageURL} alt={recipes.name}/>
            <p><b>Cooking Time:{recipes.cookingTime} minutes</b></p>
          </li>
        ))}
      </ul>
    </div>
  )
}
