import { useFridgeStore } from './../components/store/FridgeStore';
import { recipesPerPage } from './../helpers/consts';
import { RecipeDetailI } from './../types/Recipe';
import { RecipeItemI } from '../types/Recipe';
import { IngredientI } from './../types/Ingredient';
import axios from './index';

export const fetchRandomRecipes = (size: number = recipesPerPage) => {
    try {
        const result = axios
            .get(`/recipes/random?number=${recipesPerPage}`)
            .then(res => res.data);
        console.log(result);

        return result;
    } catch (e) {
        throw new Error(e);
    }
};

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
    ingredients: IngredientI[],
    size: number = recipesPerPage
): Promise<RecipeData> => {
    const mappedIngredientsNames = ingredients.map(i => i.name).join(',');

    try {
        const result = axios
            .get(
                `/recipes/available?ingredients=${mappedIngredientsNames}&page=1&size=${size}`
            )
            .then(res => res.data);

        return result;
    } catch (e) {
        throw new Error(e);
    }
};

export const fetchRecipesDetailByIdAPI = async (
    recipe_id: number
): Promise<RecipeDetailI> => {
    try {
        const result: Promise<RecipeDetailI> = await axios
            .get(`/recipes/detail/${recipe_id}`)
            .then(res => res.data);

        return result;
    } catch (e) {
        throw new Error(e);
    }
};
