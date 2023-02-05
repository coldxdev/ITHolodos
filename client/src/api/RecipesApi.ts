import { RecipeDetailI } from './../types/Recipe';
import { RecipeItemI } from '../types/Recipe';
import { IngredientI } from './../types/Ingredient';
import axios from './index';

// export const fetchRandomIngredient = () => {
// 	try{
// 		const result = axios.get('')
// 	} catch(e){
// 		throw new Error(e)
// 	}
// }

export interface RecipeData {
    results: RecipeItemI[];
    total: number;
    page: number;
    size: number;
    next: string | null;
    previous: string | null;
    first: string | null;
    last: string | null;
}

export const fetchRecipesByIngredients = (
    ingredients: IngredientI[]
): Promise<RecipeData> => {
    const mappedIngredientsNames = ingredients.map(i => i.name).join(',');

    try {
        const result = axios
            .get(
                `/recipes/available?ingredients=${mappedIngredientsNames}&page=1&size=6`
            )
            .then(res => res.data);

        return result;
    } catch (e) {
        throw new Error(e);
    }
};

export const fetchRecipesDetailById = (
    recipe_id: number
): Promise<RecipeDetailI> => {
    try {
        const result = axios
            .get(`/recipes/detail/${recipe_id}`)
            .then(res => res.data);
        // result.extendedIngredients.map(ingredient => {
        //     console.log(ingredient);
            
        //     return ingredient
        // })

        return result;
    } catch (e) {
        throw new Error(e);
    }
};
