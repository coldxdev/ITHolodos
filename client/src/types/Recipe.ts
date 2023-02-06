import { IngredientI } from './Ingredient';

export interface RecipeInstructionI {
    number: number;
    step: string;
}

export interface RecipeDetailI {
    id: number;
    title: string;
    image: string;
    extendedIngredients: IngredientI[];
    instruction: RecipeInstructionI[];
}

export interface RecipeItemI {
    id: number;
    title: string;
    image: string;
    missedIngredients: IngredientI[] | null;
    usedIngredients: IngredientI[] | null;
}
