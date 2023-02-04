import React, { Dispatch, SetStateAction, useState } from 'react';
import './Fridge.scss';
import { IngredientI } from '../../types/app';
import Ingredient from '../Ingredient';
import classnames from 'classnames';
import { PlusIcon } from '../../assets/images/icons';
import NewItem from './NewItem';

interface FridgeProps {
    storedIngredients: IngredientI[] | any[];
    ingredients: IngredientI[];
    onAddItem: (item: IngredientI) => void;
    onRemoveItem: (ingredientI: number) => void;
    query: string;
    setQuery: Dispatch<SetStateAction<string>>;
}

const Fridge: React.FC<FridgeProps> = ({
    storedIngredients,
    ingredients,
    onRemoveItem,
    onAddItem,
    query,
    setQuery,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisibleNewItem, setIsVisibleNewItem] = useState(false);

    const onAdd = (ingredient: IngredientI) => {
        if (storedIngredients?.find(i => i.id === ingredient.id)) return;
        onAddItem(ingredient);
    };

    const onTopClick = () => {
        setIsOpen(prev => !prev);
    };

    const onSearchIngredient = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
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
                            You havn’t add any products in fridge
                        </p>
                    )}
                </div>
            </div>

            <NewItem
                isVisible={isVisibleNewItem}
                onChange={onSearchIngredient}
                onClose={onCloseAddItem}
                value={query}
                resultsList={ingredients}
                onAdd={onAdd}
            />
        </div>
    );
};

export default Fridge;
