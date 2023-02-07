import { INGREDIENTS_KEY } from './../../helpers/consts';
import { create } from 'zustand';
import { IngredientI, IngredientDetailI } from './../../types/Ingredient';

interface FridgeState {
    ingredients: IngredientDetailI[] | [];
    categories: string[];
    storedIngredients: IngredientDetailI[] | [];
    addCategory: (category: string) => void;
    removeCategory: (category: string) => void;
    setIngredients: (items: IngredientI[]) => void;
    setStoredIngredient: (items: IngredientI[]) => void;
    addStoredIngredient: (item: IngredientI) => void;
    removeStoredIngredient: (ingredientID: number) => void;
}

const cachedIngredients = localStorage.getItem(INGREDIENTS_KEY) || '';

const getCachedCategories = () => {
    if (!cachedIngredients) return [];

    const parsedIngredients: IngredientDetailI[] =
        JSON.parse(cachedIngredients);

    let categories: string[] = [];

    parsedIngredients.forEach(item => {
        item.categoryPath?.forEach(category => {
            categories.push(category);
        });
    });

    return categories;
};

export const useFridgeStore = create<FridgeState>()(set => ({
    ingredients: [],
    categories: getCachedCategories(),
    storedIngredients: cachedIngredients ? JSON.parse(cachedIngredients) : [],
    setIngredients: items => set(state => ({ ingredients: items })),
    addCategory: category =>
        set(state => ({ categories: [...state.categories, category] })),
    removeCategory: categoryToDel =>
        set(state => ({
            categories: state.categories.filter(
                category => category !== categoryToDel
            ),
        })),
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
