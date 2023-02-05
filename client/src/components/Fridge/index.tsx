import React, { useState } from 'react';
import './Fridge.scss';
import { IngredientI } from '../../types/app';
import Ingredient from '../Ingredient';
import classnames from 'classnames';
import { PlusIcon } from '../../assets/images/icons';
import NewItem from './NewItem';
import { useFridgeStore } from '../store/store';

interface FridgeProps {
    storedIngredients: IngredientI[] | any[];
    ingredients: IngredientI[];
    onAddItem: (item: IngredientI) => void;
    onRemoveItem: (ingredientI: number) => void;
    query: string;
    onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Fridge: React.FC<FridgeProps> = ({
    storedIngredients,
    ingredients,
    onRemoveItem,
    onAddItem,
    query,
    onSearch,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisibleNewItem, setIsVisibleNewItem] = useState(false);

    const { setIngredients } = useFridgeStore();

    const onAdd = (ingredient: IngredientI) => {
        if (storedIngredients?.find(i => i.id === ingredient.id)) return;
        onAddItem(ingredient);
    };

    const onTopClick = () => {
        setIsOpen(prev => !prev);
    };

    const onCloseAddItem = () => {
        setIsVisibleNewItem(false);
    };

    const onPlusItem = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (!isOpen) {
            setIsOpen(true);
        }
        setIsVisibleNewItem(prevState => !prevState);
    };

    const ingredientsElems = storedIngredients?.map(ingredient => (
        <Ingredient
            onRemoveIngredient={onRemoveItem}
            key={ingredient.id}
            {...ingredient}
        />
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

                    {storedIngredients?.length ? (
                        <div className='Fridge__list'>{ingredientsElems}</div>
                    ) : (
                        <p className='Fridge__no-items'>
                            You can add products by clicking on the plus. 👆
                        </p>
                    )}
                </div>
            </div>

            <NewItem
                isVisible={isVisibleNewItem}
                onChange={onSearch}
                onClose={onCloseAddItem}
                value={query}
                resultsList={ingredients}
                onAdd={onAdd}
            />
        </div>
    );
};

export default Fridge;
