import React, { SyntheticEvent, useState } from 'react';
import './Fridge.scss';
import { IngredientI } from '../../types/app';
import Ingredient from '../Ingredient';
import classnames from 'classnames';
import { PlusIcon } from '../../assets/images/icons';
import NewItem from './NewItem';

interface FridgeProps {
    ingredients: IngredientI[] | null;
    resultsList: IngredientI[];
}

const Fridge: React.FC<FridgeProps> = ({ ingredients, resultsList }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisibleNewItem, setIsVisibleNewItem] = useState(false);
    const [query, setQuery] = useState('');

    const onTopClick = () => {
        setIsOpen(prev => !prev);
    };

    const onSearchIngredient = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    const onCloseAddItem = () => {
        setIsVisibleNewItem(false);
    };

    const onRemoveIngredient = (id: number) => {
        console.log(`item with id ${id} removed`)
    }


    const onPlusItem = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setIsVisibleNewItem(prevState => !prevState);
    };

    const ingredientsElems = ingredients?.map(ingredient => (
        <Ingredient onRemoveIngredient={onRemoveIngredient} {...ingredient} key={ingredient.id} />
    ));

    return (
        <div
            className={classnames('Fridge', {
                opened: isOpen,
            })}
        >
            <div className='Fridge__wrapper container'>
                <div className='Fridge__top' onClick={onTopClick}>
                    <h4 className='Fridge__top-title'>Fridge</h4>

                    <button className='Fridge__btn' onClick={onPlusItem}>
                        <PlusIcon />
                    </button>
                </div>

                <div className='Fridge__body'>
                    <select className='Fridge__select'>
                        <option value='1'>All products</option>
                        <option value='2'>Fruit</option>
                        <option value='3'>Meat</option>
                        <option value='4'>Fish</option>
                    </select>

                    <div className='Fridge__list'>{ingredientsElems}</div>
                </div>
            </div>

            <NewItem
                isVisible={isVisibleNewItem}
                onChange={onSearchIngredient}
                onClose={onCloseAddItem}
                value={query}
                resultsList={[]}
            />
        </div>
    );
};

export default Fridge;
