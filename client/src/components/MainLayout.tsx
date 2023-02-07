import React, { useCallback, useEffect, useState } from 'react';
import {
    fetchDetailIngredientById,
    fetchIngredientByKeyword,
} from '../api/FridgeApi';
import { INGREDIENTS_KEY } from '../helpers/consts';
import { debounce } from '../helpers/utils';
import { IngredientDetailI } from '../types/Ingredient';
import Fridge from './Fridge';
import Header from './Header';
import { useFridgeStore } from './store';

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const {
        storedIngredients,
        ingredients,
        categories,
        addCategory,
        removeCategory,
        addStoredIngredient,
        removeStoredIngredient,
        setIngredients,
    } = useFridgeStore();

    const [query, setQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('');

    const getIngredientByKeyword = async (query: string) => {
        const ingredients = await fetchIngredientByKeyword(query);
        setIngredients(ingredients);
    };

    const debouncedGetIngredientByKeyword = useCallback(
        debounce(getIngredientByKeyword),
        []
    );

    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value) {
            debouncedGetIngredientByKeyword(e.target.value);
        }
        setQuery(e.target.value);
    };

    const onAddItem = async (item: IngredientDetailI) => {
        const detailedIngredient = await fetchDetailIngredientById(item.id);

        detailedIngredient.categoryPath?.forEach(category => {
            addCategory(category);
        });

        addStoredIngredient(detailedIngredient);
    };

    const onRemoveItem = async (ingredientID: number) => {
        const currentIngredient = storedIngredients.find(
            item => item.id === ingredientID
        );

        currentIngredient?.categoryPath?.forEach(category => {
            removeCategory(category);
        });

        setActiveCategory('');
        removeStoredIngredient(ingredientID);
    };

    const onSelectCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setActiveCategory(e.target.value);
    };

    const uniqueCategories = categories.filter(
        (category, idx) => categories.indexOf(category) === idx
    );

    useEffect(() => {
        if (storedIngredients) {
            localStorage.setItem(
                INGREDIENTS_KEY,
                JSON.stringify(storedIngredients)
            );
        }
    }, [storedIngredients]);

    return (
        <div className='wrapper'>
            <Header />
            <div className='container'>{children}</div>

            <Fridge
                categories={uniqueCategories}
                activeCategory={activeCategory}
                query={query}
                onSearch={onSearch}
                onAddItem={onAddItem}
                onRemoveItem={onRemoveItem}
                onSelectCategory={onSelectCategory}
                ingredients={ingredients}
                storedIngredients={storedIngredients}
            />
        </div>
    );
};

export default MainLayout;
