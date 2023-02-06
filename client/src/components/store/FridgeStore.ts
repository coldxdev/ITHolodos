import { INGREDIENTS_KEY } from './../../helpers/consts';
import { create } from 'zustand';
import { IngredientI } from './../../types/Ingredient';

interface FridgeState {
    ingredients: IngredientI[] | [];
    storedIngredients: IngredientI[] | [];
    setIngredients: (items: IngredientI[]) => void;
    setStoredIngredient: (items: IngredientI[]) => void;
    addStoredIngredient: (item: IngredientI) => void;
    removeStoredIngredient: (ingredientID: number) => void;
}

const cachedIngredients = localStorage.getItem(INGREDIENTS_KEY) || null;

export const useFridgeStore = create<FridgeState>()(set => ({
    ingredients: [],
    storedIngredients: cachedIngredients ? JSON.parse(cachedIngredients) : [],
    setIngredients: items => set(state => ({ ingredients: items })),
    setStoredIngredient: items => set(state => ({ storedIngredients: items })),
    addStoredIngredient: item =>
        set(state => ({
            storedIngredients: [...state.storedIngredients, item],
        })),
    removeStoredIngredient: ingredientID =>
        set(state => {
            const filteredStoredIngredients = state.storedIngredients.filter(
                ingredient => ingredient.id !== ingredientID
            );
            return {
                storedIngredients: filteredStoredIngredients,
            };
        }),
}));
