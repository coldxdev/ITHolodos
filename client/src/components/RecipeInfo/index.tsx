import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowIcon, CrossIcon, TickIcon } from '../../assets/images/icons';
import { AppRoutes } from '../../router';
import { RecipeDetailI } from '../../types/Recipe';
import './RecipeInfo.scss';

interface RecipeInfoProps extends RecipeDetailI {}

const RecipeInfo: React.FC<RecipeInfoProps> = ({
    id,
    image,
    extendedIngredients,
    title,
    instruction,
}) => {
    console.log(extendedIngredients);
    
    const ingredientElems = extendedIngredients.map((ingredient, idx) => (
        <li className='RecipeInfo__ingredient' key={idx}>
            <div className='RecipeInfo__ingredient-wrapper'>
                <div className='RecipeInfo__ingredient-img'>
                    <img
                        src={ingredient.image}
                        alt={`Ingredient ${ingredient.name}`}
                    />
                </div>

                <p className='RecipeInfo__ingredient-text'>
                    {ingredient.name} {ingredient.amount} {ingredient.unit}
                </p>
            </div>

            <div
                className={classNames('RecipeInfo__ingredient-status', {
                    outOfStock: !ingredient.stored,
                })}
            >
                {ingredient.stored ? <TickIcon /> : <CrossIcon />}
            </div>
        </li>
    ));

    return (
        <div className='RecipeInfo'>
            <Link className='RecipeInfo__back' to={AppRoutes.HOME}>
                <ArrowIcon /> Go back
            </Link>
            <div className='RecipeInfo__body'>
                <div className='RecipeInfo__img'>
                    <img src={image} alt={`Photo recipe ${image}`} />
                </div>

                <div className='RecipeInfo__content'>
                    <h2 className='RecipeInfo__title'>{title}</h2>
                    <div className='RecipeInfo__ingredients'>
                        <h5 className='RecipeInfo__ingredients-title'>
                            Ingredients
                        </h5>
                        <ul className='RecipeInfo__list'>{ingredientElems}</ul>
                    </div>

                    {instruction?.length ? (
                        <div className='RecipeInfo__recipe'>
                            <h5 className='RecipeInfo__recipe-title'>
                                Full Recipe
                            </h5>
                            <ol className='RecipeInfo__recipe-items'>
                                {instruction?.map(item => (
                                    <li
                                        className='RecipeInfo__recipe-item'
                                        key={item.number}
                                    >
                                        {item.step}
                                    </li>
                                ))}
                            </ol>
                        </div>
                    ) : <p className='RecipeInfo__error'>
                             Unfortunately, we don't have full recipe 😢
                        </p>}
                </div>
            </div>
        </div>
    );
};

export default RecipeInfo;
