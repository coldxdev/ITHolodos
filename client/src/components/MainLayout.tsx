import React from 'react';
import Fridge from './Fridge';
import Header from './Header';

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const ingredients = [
        {
            id: 1,
            name: 'Chicken',
            image: 'https://www.themealdb.com/images/ingredients/Chicken.png',
        },
        {
            id: 2,
            name: 'Chicken',
            image: 'https://www.themealdb.com/images/ingredients/Chicken.png',
        },
        {
            id: 3,
            name: 'Chicken',
            image: 'https://www.themealdb.com/images/ingredients/Chicken.png',
        },
        {
            id: 4,
            name: 'Chicken',
            image: 'https://www.themealdb.com/images/ingredients/Chicken.png',
        },
        {
            id: 5,
            name: 'Chicken',
            image: 'https://www.themealdb.com/images/ingredients/Chicken.png',
        },
        {
            id: 6,
            name: 'Chicken',
            image: 'https://www.themealdb.com/images/ingredients/Chicken.png',
        },
        {
            id: 7,
            name: 'Chicken',
            image: 'https://www.themealdb.com/images/ingredients/Chicken.png',
        },
    ];

    return (
        <div className='wrapper'>
            <Header />

            {children}

            <Fridge ingredients={ingredients} resultsList={ingredients} />
        </div>
    );
};

export default MainLayout;
