import { create } from 'zustand';
import { RecipeDetailI } from './../../types/Recipe';

interface RecipeDetailState {
    recipeDetail: RecipeDetailI | null;
    setRecipeDetail: (items: RecipeDetailI) => void;
    isLoading: boolean;
    setIsLoading: (state: boolean) => void;
}

export const useRecipeDetailStore = create<RecipeDetailState>()(set => ({
    isLoading: false,
    setIsLoading: loadingState => set(state => ({ isLoading: loadingState })),
    recipeDetail: null,
    setRecipeDetail: data => set(state => ({ recipeDetail: data })),
}));
