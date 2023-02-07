import React from 'react';
import { IngredientI } from '../../types/Ingredient';
import './Ingredient.scss';
import classnames from 'classnames';
import { CrossIcon } from '../../assets/images/icons';
import cover from '../../assets/images/cover.jpg';

interface IngredientProps extends IngredientI {
    className?: string;
    onRemoveIngredient: (id: number) => void;
}

const Ingredient: React.FC<IngredientProps> = ({
    id,
    name,
    image,
    className,
    onRemoveIngredient,
}) => {
    const onRemove = () => {
        onRemoveIngredient(id);
    };

    return (
        <div className={classnames('Ingredient', className)}>
            <button className='Ingredient__remove' onClick={onRemove}>
                <CrossIcon />
            </button>

            <div className='Ingredient__img'>
                <img src={image ? image : cover} alt={`Photo ${name}`} />
            </div>

            <p className='Ingredient__name'>{name}</p>
        </div>
    );
};

export default Ingredient;
