import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRecipesDetailByIdAPI } from '../api/RecipesApi';
import Loader from '../components/Loader';
import MainLayout from '../components/MainLayout';
import RecipeInfo from '../components/RecipeInfo';
import { useFridgeStore, useRecipeDetailStore } from '../components/store';
import { IngredientI } from '../types/Ingredient';

// newResult.extendedIngredients = result.extendedIngredients.map(
//     (item: IngredientI) => ({
//         ...item,
//         stored: storedIngredients.find(storedItem =>
//             item.name.toLowerCase().includes(storedItem.name)
//         ),
//     })
// );

const Recipe: React.FC = () => {
    const { id } = useParams();

    const { storedIngredients } = useFridgeStore();
    const { recipeDetail, setRecipeDetail, setIsLoading, isLoading } =
        useRecipeDetailStore();

    const getRecipesDetailById = async (id: number) => {
        setIsLoading(true);
        const result = await fetchRecipesDetailByIdAPI(id);
        setRecipeDetail(result);
        setIsLoading(false);
    };

    useEffect(() => {
        if (id) {
            getRecipesDetailById(parseInt(id));
        }
    }, [id]);

    return (
        <MainLayout>
            {!isLoading && recipeDetail ? (
                <RecipeInfo
                    id={recipeDetail?.id}
                    image={recipeDetail?.image}
                    title={recipeDetail?.title}
                    instruction={recipeDetail?.instruction}
                    extendedIngredients={recipeDetail?.extendedIngredients}
                />
            ) : (
                <Loader />
            )}
        </MainLayout>
    );
};

export default Recipe;
