import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRecipesDetailById } from '../api/RecipesApi';
import Loader from '../components/Loader';
import MainLayout from '../components/MainLayout';
import RecipeInfo from '../components/RecipeInfo';
import { useRecipeDetailStore } from '../components/store';

const Recipe: React.FC = () => {
    const { id } = useParams();

    const { recipeDetail, setRecipeDetail } = useRecipeDetailStore();

    const getRecipesDetailById = async (id: number) => {
        const result = await fetchRecipesDetailById(id);
        setRecipeDetail(result);
    };

    useEffect(() => {
        if (id) {
            getRecipesDetailById(parseInt(id));
        }
    }, [id]);

    return (
        <MainLayout>
            {Object.keys(recipeDetail).length > 0 ? (
                <RecipeInfo {...recipeDetail} />
            ) : (
                <Loader />
            )}
        </MainLayout>
    );
};

export default Recipe;
