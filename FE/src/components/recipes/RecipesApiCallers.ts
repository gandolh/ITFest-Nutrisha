import axios from 'axios';
import { toast } from 'react-toastify';

const getRecipesByIngredients = async (ingredients : string[]) : Promise<Recipe[]> => {
    // do post call with axios. in body send ingredients. The url is http://localhost:8080/recipes/byIngredients
    return axios.post('http://localhost:8080/recipes/byIngredients', ingredients)
        .then(response => {
            console.log(response.data);
            return response.data;
        })
        .catch(_ => {
        toast("Recipies not found");
            return [];
        });
}

export {
    getRecipesByIngredients
}