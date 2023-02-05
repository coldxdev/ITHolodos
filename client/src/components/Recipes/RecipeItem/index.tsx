import React from 'react';
import { RecipeItemI } from '../../../types/Recipe';
import './RecipeItem.scss';

interface RecipeItemProps extends RecipeItemI {}

const RecipeItem: React.FC<RecipeItemProps> = ({
    image,
    title,
    id,
    missedIngredients,
    usedIngredients,
}) => {
    return (
        <div className={'RecipeItem'}>
            <div className='RecipeItem__wrapper'>
                <div className='RecipeItem__img'>
                    <img src={image} alt={`Recipe ${title} illustration`} />
                </div>

                <h5 className='RecipeItem__title'>{title}</h5>

                <p className='RecipeItem__required-products'>
                    {missedIngredients.length > 1 ? (
                        <p>You missed {missedIngredients.length}</p>
                    ) : (
                        <p>You have all</p>
                    )}
                </p>
            </div>
        </div>
    );
};

export default RecipeItem;
