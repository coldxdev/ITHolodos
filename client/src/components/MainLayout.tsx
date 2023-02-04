import React, { useEffect, useState } from 'react';
import { fetchIngredientByKeyword } from '../api/FridgeApi';
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

    const getIngredientByKeyword = async () => {
        const ingredients = await fetchIngredientByKeyword(query);
        setIngredients(ingredients);
    };

    useEffect(() => {
        if (localStorage.getItem('ingredients')?.length) {
            const stringifiendIngredients = localStorage.getItem('ingredients');
            setStoreIngredient(JSON.parse(stringifiendIngredients));
        }
    }, []);

    useEffect(() => {
        if(query){
            getIngredientByKeyword();
        }
    }, [query]);

    useEffect(() => {
        localStorage.setItem('ingredients', JSON.stringify(storedIngredients));
    }, [storedIngredients]);

    return (
        <div className='wrapper'>
            <Header />
            {children}

            <Fridge
                query={query}
                setQuery={setQuery}
                onAddItem={addStoredIngredient}
                onRemoveItem={removeStoredIngredient}
                ingredients={ingredients}
                storedIngredients={storedIngredients}
            />
        </div>
    );
};

export default MainLayout;
