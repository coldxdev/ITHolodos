import React from 'react';
import { RecipeItemI } from '../../types/Recipe';
import Button from '../../UI/Button';
import Loader from '../Loader';
import RecipeItem from './RecipeItem';
import './Recipes.scss';

interface RecipesProps {
    recipes: RecipeItemI[];
    next: string | null;
    onLoadMore: () => void;
}

const Recipes: React.FC<RecipesProps> = ({ recipes, next, onLoadMore }) => {
    const recipeItems = recipes.map(recipe => (
        <RecipeItem {...recipe} key={recipe.id} />
    ));

    return (
        <div className='Recipes'>
            <h2 className='Recipes__title'>Recipes</h2>

            <div className='Recipes__items'>{recipeItems}</div>

            {next ? (
                <Button className='Recipes__btn' onClick={onLoadMore}>
                    Load more receipts
                </Button>
            ) : null}
        </div>
    );
};

export default Recipes;
