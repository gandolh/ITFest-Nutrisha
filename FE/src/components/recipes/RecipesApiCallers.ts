import axios from 'axios';
import { toast } from 'react-toastify';

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
    return axios.put(`http://localhost:8080/users?id=${user.id}`, user)
        .then(response => {
            return response.data;
        })
        .catch(_ => {
            toast("User not found");
            return null;
        });
}


export {
    getRecipesByIngredients,
    updateUser
}