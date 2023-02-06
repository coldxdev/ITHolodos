import React, { SetStateAction, useEffect, useState } from 'react';
import {
    fetchRandomRecipes,
    fetchRecipesByIngredients,
    RecipeData,
} from '../api/RecipesApi';
import Loader from '../components/Loader';
import MainLayout from '../components/MainLayout';
import Recipes from '../components/Recipes';
import { useFridgeStore, useRecipesStore } from '../components/store';
import { RecipeItemI } from '../types/Recipe';
import { recipesPerPage } from '../helpers/consts';

const Home: React.FC = () => {
    const { storedIngredients } = useFridgeStore();
    const { recipes, setRecipes, isLoading, setIsLoading, size, setSize } =
        useRecipesStore();
    const [recipesData, setRecipesData] = useState<RecipeData>();

    const getRecipes = async (newSize: number = size) => {
        setIsLoading(true);
        let recipesData: RecipeData;

        if (storedIngredients.length) {
            recipesData = await fetchRecipesByIngredients(
                storedIngredients,
                newSize
            );
        } else {
            recipesData = await fetchRandomRecipes();
        }

        setRecipesData(recipesData);
        setRecipes(recipesData.results);
        setIsLoading(false);
    };

    const onLoadMore = () => {
        const newSize = size + 6;
        console.log(newSize);
        setSize(newSize);
        getRecipes(newSize);
    };

    useEffect(() => {
        getRecipes();
    }, [storedIngredients]);

    return (
        <MainLayout>
            {!isLoading ? (
                <Recipes
                    recipes={recipes}
                    next={recipesData?.next || null}
                    onLoadMore={onLoadMore}
                />
            ) : (
                <Loader />
            )}
        </MainLayout>
    );
};

export default Home;
