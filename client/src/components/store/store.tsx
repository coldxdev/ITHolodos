import { create } from 'zustand';
import { IngredientI } from '../../types/Ingredient';

interface FridgeState {
    ingredients: IngredientI[] | [];
    storedIngredients: IngredientI[] | [];
    setIngredients: (items: IngredientI[]) => void;
    setStoreIngredient: (items: IngredientI[]) => void;
    addStoredIngredient: (item: IngredientI) => void;
    removeStoredIngredient: (ingredientID: number) => void;
}

//TODO: Rename ingredients and storedIngredients
export const useFridgeStore = create<FridgeState>()(set => ({
    ingredients: [],
    storedIngredients: [],
    setIngredients: items =>
        set(state => ({ ingredients: items })),
    setStoreIngredient: items => set(state => ({ storedIngredients: items })),
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
