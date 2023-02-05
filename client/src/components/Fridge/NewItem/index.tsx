import classNames from 'classnames';
import React, { useEffect, useRef } from 'react';
import { CrossIcon, SearchIcon } from '../../../assets/images/icons';
import { IngredientI } from '../../../types/Ingredient';
import Button from '../../../UI/Button';
import './NewItem.scss';

interface NewItemProps {
    isVisible: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClose: () => void;
    onAdd: (ingredient: IngredientI) => void;
    value: string;
    resultsList: IngredientI[];
}

const NewItem: React.FC<NewItemProps> = ({
    isVisible,
    onChange,
    value,
    onClose,
    onAdd,
    resultsList,
}) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isVisible) {
            inputRef?.current?.focus();
        }
    }, []);

    //TODO: Create component newItemElem
    const newItemElems = resultsList?.map(ingredient => {
        return (
            <li className='NewItem__item' key={ingredient.id}>
                <div className='NewItem__item-info'>
                    <div className='NewItem__item-img'>
                        <img src={ingredient.image} alt='Photo' />
                    </div>
                    <div className='NewItem__item-name'>{ingredient.name}</div>
                </div>
                <Button
                    className='NewItem__item-btn'
                    onClick={() => onAdd(ingredient)}
                >
                    Add Item
                </Button>
            </li>
        );
    });

    return (
        <div
            className={classNames('NewItem', {
                visible: isVisible,
            })}
        >
            <div className='NewItem__wrapper'>
                <div className='NewItem__content'>
                    <button className='NewItem__close' onClick={onClose}>
                        <CrossIcon />
                    </button>
                    <div className='NewItem__search'>
                        <input
                            ref={inputRef}
                            className='NewItem__search-input'
                            onChange={onChange}
                            placeholder={'Find ingridient...'}
                            value={value}
                            type='search'
                        />
                        <Button className='NewItem__search-btn'>
                            Search <SearchIcon />
                        </Button>
                    </div>
                    <ul className='NewItem__list'>
                        {resultsList?.length ? (
                            newItemElems
                        ) : (
                            <p className='NewItem__list-error'>
                                Ingredients not found 😔
                            </p>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default NewItem;
