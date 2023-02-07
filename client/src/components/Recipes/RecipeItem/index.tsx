import React from 'react';
import { Link } from 'react-router-dom';
import { RecipeItemI } from '../../../types/Recipe';
import './RecipeItem.scss';
import { AppRoutes } from '../../../router';
import classNames from 'classnames';
import cover from '../../../assets/images/cover.jpg';

interface RecipeItemProps extends RecipeItemI {}

const RecipeItem: React.FC<RecipeItemProps> = ({
    image,
    title,
    id,
    missedIngredients,
    usedIngredients,
}) => {
    const hasIngredientsInfo =
        missedIngredients?.length || usedIngredients?.length;

    return (
        <Link className={'RecipeItem'} to={AppRoutes.RECIPES + '/' + id}>
            <div className='RecipeItem__wrapper'>
                <div className='RecipeItem__img'>
                    <img
                        src={image ? image : cover}
                        alt={`Recipe ${title} illustration`}
                    />
                </div>

                <h5 className='RecipeItem__title'>{title}</h5>

                {hasIngredientsInfo ? (
                    <p
                        className={classNames('RecipeItem__required-products', {
                            missed: missedIngredients?.length,
                        })}
                    >
                        {missedIngredients?.length
                            ? `You missed ${missedIngredients.length} ingrediets`
                            : 'You have all'}
                    </p>
                ) : null}
            </div>
        </Link>
    );
};

export default RecipeItem;
