import axios from 'axios';
import { toast } from 'react-toastify';
import { ingredients } from './ingredients';

const getRecipesByIngredients = async (ingredients : string[]) : Promise<Recipe[]> => {
    // do post call with axios. in body send ingredients. The url is http://localhost:8080/recipes/byIngredients
    return axios.post('http://localhost:8080/recipes/byIngredients', ingredients)
        .then(response => {
            return response.data;
        })
        .catch(_ => {
        toast("Recipies not found");
            return [];
        });
}

const updateUser = async (user : User) : Promise<User> => {
    console.log(user);
    return axios.put(`http://localhost:8080/users/${user.id}`, user)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            console.log(err);
            toast("User not found");
            return null;
        });
}

const GenerateNewRecipes = async (ingredients : string[]) : Promise<Recipe[]> => {
    return axios.post('http://127.0.0.1:5000/recipes/addRecipesByIngredients', ingredients)
        .then(response => {
            return response.data;
        })
        .catch(_ => {
            toast("Generation wasn't possible");
            return [];
        });
}


export {
    getRecipesByIngredients,
    updateUser,
    GenerateNewRecipes
}