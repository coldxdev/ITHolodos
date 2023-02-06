import { RecipeItemI } from './../../types/Recipe';
import { recipesPerPage } from './../../helpers/consts';
import { create } from 'zustand';
interface RecipesState {
    recipes: RecipeItemI[] | [];
    setRecipes: (items: RecipeItemI[]) => void;
    isLoading: boolean;
    setIsLoading: (state: boolean) => void;
    size: number;
    setSize: (size: number) => void;
}

export const useRecipesStore = create<RecipesState>()(set => ({
    recipes: [],
    isLoading: false,
    setRecipes: items => set(state => ({ recipes: items })),
    setIsLoading: loadingState => set(state => ({ isLoading: loadingState })),
    size: recipesPerPage,
    setSize: newSize => set(state => ({ size: newSize })),
}));
