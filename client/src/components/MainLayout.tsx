import React, { useCallback, useEffect, useState } from 'react';
import { fetchIngredientByKeyword } from '../api/FridgeApi';
//@ts-ignore
import { debounce } from '../helpers/utils';
import Fridge from './Fridge';
import Header from './Header';
import { useFridgeStore } from './store/store';

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const {
        storedIngredients,
        ingredients,
        addStoredIngredient,
        removeStoredIngredient,
        setStoreIngredient,
        setIngredients,
    } = useFridgeStore();

    const [query, setQuery] = useState('');

    useEffect(() => {
        if (localStorage.getItem('ingredients')?.length) {
            const stringifiendIngredients = localStorage.getItem('ingredients');
           // @ts-ignore
            setStoreIngredient(JSON.parse(stringifiendIngredients)); // @ts-nocheck
        }
    }, []);

    const getIngredientByKeyword = async (query: string) => {
        const ingredients = await fetchIngredientByKeyword(query);
        setIngredients(ingredients);
    };

    const debouncedGetIngredientByKeyword = useCallback(debounce(getIngredientByKeyword), []);

    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value) {
            debouncedGetIngredientByKeyword(e.target.value);
        }
        setQuery(e.target.value);
    };

    useEffect(() => {
        localStorage.setItem('ingredients', JSON.stringify(storedIngredients));
    }, [storedIngredients]);

    return (
        <div className='wrapper'>
            <Header />
            {children}

            <Fridge
                query={query}
                onSearch={onSearch}
                onAddItem={addStoredIngredient}
                onRemoveItem={removeStoredIngredient}
                ingredients={ingredients}
                storedIngredients={storedIngredients}
            />
        </div>
    );
};

export default MainLayout;
