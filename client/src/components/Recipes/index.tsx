import React from 'react';
import { RecipeItemI } from '../../types/Recipe';
import Button from '../../UI/Button';
import Loader from '../Loader';
import RecipeItem from './RecipeItem';
import './Recipes.scss';

interface RecipesProps {
    recipes: RecipeItemI[];
    next: string | null;
    previos: string | null;
    isLoading: boolean;
}

const Recipes: React.FC<RecipesProps> = ({ recipes, next, isLoading }) => {
    const recipeItems = recipes.map(recipe => (
        <RecipeItem {...recipe} key={recipe.id} />
    ));

    return (
        <div className='Recipes'>
            <h2 className='Recipes__title'>Recipes</h2>

            <div className='Recipes__items'>
                {recipeItems}
                {isLoading && <Loader />}
            </div>

            {next ? (
                <Button className='Recipes__btn'>Load more receipts</Button>
            ) : null}
        </div>
    );
};

export default Recipes;
