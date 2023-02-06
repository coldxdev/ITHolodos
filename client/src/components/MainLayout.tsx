import React, { useCallback, useEffect, useState } from 'react';
import { fetchIngredientByKeyword } from '../api/FridgeApi';
import { INGREDIENTS_KEY } from '../helpers/consts';
import { debounce } from '../helpers/utils';
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
        addStoredIngredient,
        removeStoredIngredient,
        setStoredIngredient,
        setIngredients,
    } = useFridgeStore();

    const [query, setQuery] = useState('');
    

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


    const onSelectCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(e.target.value);
        
    }
    
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
                query={query}
                onSearch={onSearch}
                onAddItem={addStoredIngredient}
                onRemoveItem={removeStoredIngredient}
                onSelectCategory={onSelectCategory}
                ingredients={ingredients}
                storedIngredients={storedIngredients}
            />
        </div>
    );
};

export default MainLayout;
