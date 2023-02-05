import React from 'react';
import { RecipeItemI } from '../../types/Recipe';
import RecipeItem from './RecipeItem';

interface RecipesProps {
    recipes: RecipeItemI[];
    
}

const Recipes: React.FC<RecipesProps> = ({ recipes }) => {
    const recipeItems = recipes.map(recipe => (
        <RecipeItem {...recipe} key={recipe.id} />
    ));

    return (
        <div className='Recipes'>
            <h2 className='Recipes__title'>Recipes</h2>

            <div className='Recipes__items'>
                {recipeItems}
            </div>
        </div>
    );
};

export default Recipes;
