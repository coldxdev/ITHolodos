import { IngredientI } from './Ingredient';


export interface RecipeItemI {
	id: number,
	title: string,
	image: string,
	missedIngredients: IngredientI[],
	usedIngredients: IngredientI[],
}





