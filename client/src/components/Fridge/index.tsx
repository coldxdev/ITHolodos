import React, { useState } from 'react';
import './Fridge.scss';
import { IngredientDetailI, IngredientI } from '../../types/Ingredient';
import Ingredient from '../Ingredient';
import classnames from 'classnames';
import { PlusIcon } from '../../assets/images/icons';
import NewItem from './NewItem';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

interface FridgeProps {
    categories: string[];
    activeCategory: string;
    storedIngredients: IngredientI[] | any[];
    ingredients: IngredientDetailI[];
    query: string;
    onAddItem: (item: IngredientI) => void;
    onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onRemoveItem: (ingredientI: number) => void;
    onSelectCategory: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Fridge: React.FC<FridgeProps> = ({
    storedIngredients,
    ingredients,
    categories,
    activeCategory,
    query,
    onRemoveItem,
    onAddItem,
    onSearch,
    onSelectCategory,
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

    const filteredIngredients = activeCategory
        ? storedIngredients.filter(ingredient =>
              ingredient.categoryPath.includes(activeCategory)
          )
        : storedIngredients;

    const ingredientsElems = filteredIngredients?.map(ingredient => (
        <CSSTransition timeout={250} key={ingredient.id}>
            <Ingredient onRemoveIngredient={onRemoveItem} {...ingredient} />
        </CSSTransition>
    ));

    return (
        <div
            className={classnames('Fridge', {
                opened: isOpen,
            })}
        >
            <div className='Fridge__wrapper container'>
                <div className='Fridge__top' onClick={onTopClick}>
                    <h4 className='Fridge__top-title'>
                        Fridge
                        {storedIngredients?.length
                            ? ` (${storedIngredients.length} items)`
                            : null}
                    </h4>

                    <button className='Fridge__btn' onClick={onPlusItem}>
                        <PlusIcon />
                    </button>
                </div>

                <div className='Fridge__body'>
                    <select
                        className='Fridge__select'
                        onChange={onSelectCategory}
                    >
                        <option value=''>All products</option>
                        {categories.map(category => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>

                    <div className='Fridge__list-wrapper'>
                        {storedIngredients?.length > 0 ? (
                            <TransitionGroup className='Fridge__list'>
                                {ingredientsElems}
                            </TransitionGroup>
                        ) : (
                            <p className='Fridge__no-items'>
                                You can add products by clicking on the plus. 👆
                            </p>
                        )}
                    </div>
                </div>
            </div>
            <CSSTransition timeout={350} unmountOnExit in={isVisibleNewItem}>
                <NewItem
                    isVisible={isVisibleNewItem}
                    onChange={onSearch}
                    onClose={onCloseAddItem}
                    value={query}
                    resultsList={ingredients}
                    onAdd={onAdd}
                />
            </CSSTransition>
        </div>
    );
};

export default Fridge;
