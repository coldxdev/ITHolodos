import React, { useEffect } from 'react';
import { fetchRecipesByIngredients } from '../api/RecipesApi';
import Loader from '../components/Loader';
import MainLayout from '../components/MainLayout';
import Recipes from '../components/Recipes';
import { useFridgeStore, useRecipesStore } from '../components/store';

const Home: React.FC = () => {
    const { storedIngredients } = useFridgeStore();
    const { recipes, setRecipes, isLoading, setIsLoading } = useRecipesStore();

    const mockup = {
        results: [
            {
                id: 673463,
                title: 'Slow Cooker Apple Pork Tenderloin',
                image: 'https://spoonacular.com/recipeImages/673463-312x231.jpg',
                usedIngredientCount: 2,
                missedIngredientCount: null,
                missedIngredients: null,
                usedIngredients: [
                    {
                        id: 9003,
                        amount: 1,
                        unit: 'serving',
                        name: 'apple r',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/apple.jpg',
                    },
                    {
                        id: 1069003,
                        amount: 2,
                        unit: '',
                        name: 'apples',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/grannysmith-apple.png',
                    },
                ],
            },
            {
                id: 636989,
                title: 'Caramel Apple-Brownie Cheesecake',
                image: 'https://spoonacular.com/recipeImages/636989-312x231.jpg',
                usedIngredientCount: 2,
                missedIngredientCount: 7,
                missedIngredients: [
                    {
                        id: 18369,
                        amount: 2.5,
                        unit: 'teaspoons',
                        name: 'baking powder',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/white-powder.jpg',
                    },
                    {
                        id: 1001,
                        amount: 0.5,
                        unit: 'cup',
                        name: 'butter',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/butter-sliced.jpg',
                    },
                    {
                        id: 1017,
                        amount: 12,
                        unit: 'oz',
                        name: 'cream cheese',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/cream-cheese.jpg',
                    },
                    {
                        id: 1123,
                        amount: 3,
                        unit: '',
                        name: 'eggs',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/egg.png',
                    },
                    {
                        id: 1012010,
                        amount: 2,
                        unit: 'tablespoons',
                        name: 'ground cinnamon',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/cinnamon.jpg',
                    },
                    {
                        id: 10012142,
                        amount: 0.25,
                        unit: 'cup',
                        name: 'pecans',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/pecans.jpg',
                    },
                    {
                        id: 2050,
                        amount: 4,
                        unit: 'teaspoons',
                        name: 'vanilla extract',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/vanilla-extract.jpg',
                    },
                ],
                usedIngredients: [
                    {
                        id: 9003,
                        amount: 1.5,
                        unit: 'cups',
                        name: 'baking apples',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/apple.jpg',
                    },
                    {
                        id: 1029003,
                        amount: 8,
                        unit: 'servings',
                        name: 'baking apples are apples that have a sweet-tart balance and hold their shape when',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/grannysmith-apple.png',
                    },
                ],
            },
            {
                id: 632622,
                title: 'Apple- Pomegranate Crisp',
                image: 'https://spoonacular.com/recipeImages/632622-312x231.jpg',
                usedIngredientCount: 2,
                missedIngredientCount: 9,
                missedIngredients: [
                    {
                        id: 9442,
                        amount: 0.5,
                        unit: 'cup',
                        name: 'pom wonderful pomegranate juice',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/pomegranate-juice.jpg',
                    },
                    {
                        id: 1012010,
                        amount: 0.5,
                        unit: 'teaspoon',
                        name: 'ground cinnamon',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/cinnamon.jpg',
                    },
                    {
                        id: 1022001,
                        amount: 0.5,
                        unit: 'teaspoon',
                        name: 'ground allspice',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/allspice-ground.jpg',
                    },
                    {
                        id: 9152,
                        amount: 1,
                        unit: 'tablespoon',
                        name: 'lemon juice',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/lemon-juice.jpg',
                    },
                    {
                        id: 20027,
                        amount: 1,
                        unit: 'tablespoon',
                        name: 'corn starch',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/white-powder.jpg',
                    },
                    {
                        id: 8120,
                        amount: 2,
                        unit: 'cups',
                        name: 'old-fashioned rolled oats',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/rolled-oats.jpg',
                    },
                    {
                        id: 9016,
                        amount: 0.25,
                        unit: 'cup',
                        name: 'apple juice',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/apple-juice.jpg',
                    },
                    {
                        id: 10112155,
                        amount: 0.5,
                        unit: 'cup',
                        name: 'walnuts',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/walnuts.jpg',
                    },
                    {
                        id: 1145,
                        amount: 0.25,
                        unit: 'cup',
                        name: 'butter',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/butter-sliced.jpg',
                    },
                ],
                usedIngredients: [
                    {
                        id: 9003,
                        amount: 12,
                        unit: 'servings',
                        name: 'baked apples',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/apple.jpg',
                    },
                    {
                        id: 1099003,
                        amount: 5,
                        unit: 'medium',
                        name: 'pink lady apples',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/apple.jpg',
                    },
                ],
            },
            {
                id: 715732,
                title: 'Smoothies',
                image: 'https://spoonacular.com/recipeImages/715732-312x231.jpg',
                usedIngredientCount: 2,
                missedIngredientCount: 14,
                missedIngredients: [
                    {
                        id: 1116,
                        amount: 2,
                        unit: 'servings',
                        name: 'chocolate almond yogurt smoothie',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/plain-yogurt.jpg',
                    },
                    {
                        id: 9040,
                        amount: 2,
                        unit: 'servings',
                        name: 'blueberry banana smoothie',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/bananas.jpg',
                    },
                    {
                        id: 9050,
                        amount: 2,
                        unit: 'servings',
                        name: 'blueberry pineapple smoothie',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/blueberries.jpg',
                    },
                    {
                        id: 12061,
                        amount: 2,
                        unit: 'servings',
                        name: 'cherry almond smoothie',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/almonds.jpg',
                    },
                    {
                        id: 99075,
                        amount: 2,
                        unit: 'servings',
                        name: 'chocolate java protein shake',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/chocolate-protein-powder.jpg',
                    },
                    {
                        id: 1053,
                        amount: 2,
                        unit: 'servings',
                        name: 'banana cream smoothie',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/fluid-cream.jpg',
                    },
                    {
                        id: 6987,
                        amount: 10,
                        unit: '',
                        name: 'healthy smoothie recipes',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/cream-of-celery-soup.jpg',
                    },
                    {
                        id: 9176,
                        amount: 2,
                        unit: 'servings',
                        name: 'blueberry mango smoothie',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/mango.jpg',
                    },
                    {
                        id: 8121,
                        amount: 2,
                        unit: 'servings',
                        name: 'blueberry oatmeal smoothie',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/rolled-oats.jpg',
                    },
                    {
                        id: 19151,
                        amount: 2,
                        unit: 'servings',
                        name: 'chocolate peanut butter smoothie',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/reeses-pieces-or-peanut-butter-candies.png',
                    },
                    {
                        id: 16098,
                        amount: 2,
                        unit: 'servings',
                        name: 'peanut butter and jelly smoothie',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/peanut-butter.png',
                    },
                    {
                        id: 9266,
                        amount: 2,
                        unit: 'servings',
                        name: 'tropical pineapple smoothie',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/pineapple.jpg',
                    },
                    {
                        id: 11426,
                        amount: 2,
                        unit: 'servings',
                        name: 'pumpkin pie smoothie',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/pumpkin-puree.jpg',
                    },
                    {
                        id: 9302,
                        amount: 2,
                        unit: 'servings',
                        name: 'raspberry protein shake',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/raspberries.jpg',
                    },
                ],
                usedIngredients: [
                    {
                        id: 9003,
                        amount: 2,
                        unit: 'servings',
                        name: 'cranberry apple smoothie',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/apple.jpg',
                    },
                    {
                        id: 1059003,
                        amount: 2,
                        unit: 'servings',
                        name: 'delicious apple pie smoothie',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/red-delicious-apples.png',
                    },
                ],
            },
            {
                id: 715742,
                title: 'Beverages',
                image: 'https://spoonacular.com/recipeImages/715742-312x231.jpg',
                usedIngredientCount: 2,
                missedIngredientCount: 17,
                missedIngredients: [
                    {
                        id: 1116,
                        amount: 2,
                        unit: 'servings',
                        name: 'chocolate almond yogurt smoothie',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/plain-yogurt.jpg',
                    },
                    {
                        id: 9040,
                        amount: 2,
                        unit: 'servings',
                        name: 'blueberry banana smoothie',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/bananas.jpg',
                    },
                    {
                        id: 9050,
                        amount: 2,
                        unit: 'servings',
                        name: 'blueberry pineapple smoothie',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/blueberries.jpg',
                    },
                    {
                        id: 12061,
                        amount: 2,
                        unit: 'servings',
                        name: 'cherry almond smoothie',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/almonds.jpg',
                    },
                    {
                        id: 99075,
                        amount: 2,
                        unit: 'servings',
                        name: 'chocolate java protein shake',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/chocolate-protein-powder.jpg',
                    },
                    {
                        id: 1053,
                        amount: 2,
                        unit: 'servings',
                        name: 'banana cream smoothie',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/fluid-cream.jpg',
                    },
                    {
                        id: 6987,
                        amount: 10,
                        unit: '',
                        name: 'healthy smoothie recipes',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/cream-of-celery-soup.jpg',
                    },
                    {
                        id: 99184,
                        amount: 2,
                        unit: 'servings',
                        name: 'strawberry lemonade',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/lemonade.jpg',
                    },
                    {
                        id: 9176,
                        amount: 2,
                        unit: 'servings',
                        name: 'blueberry mango smoothie',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/mango.jpg',
                    },
                    {
                        id: 8121,
                        amount: 2,
                        unit: 'servings',
                        name: 'blueberry oatmeal smoothie',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/rolled-oats.jpg',
                    },
                    {
                        id: 19151,
                        amount: 2,
                        unit: 'servings',
                        name: 'chocolate peanut butter smoothie',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/reeses-pieces-or-peanut-butter-candies.png',
                    },
                    {
                        id: 16098,
                        amount: 2,
                        unit: 'servings',
                        name: 'peanut butter and jelly smoothie',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/peanut-butter.png',
                    },
                    {
                        id: 9266,
                        amount: 2,
                        unit: 'servings',
                        name: 'tropical pineapple smoothie',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/pineapple.jpg',
                    },
                    {
                        id: 11426,
                        amount: 2,
                        unit: 'servings',
                        name: 'pumpkin pie smoothie',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/pumpkin-puree.jpg',
                    },
                    {
                        id: 9302,
                        amount: 2,
                        unit: 'servings',
                        name: 'raspberry protein shake',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/raspberries.jpg',
                    },
                    {
                        id: 14355,
                        amount: 2,
                        unit: 'servings',
                        name: 'tea lemonade',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/tea-bags.jpg',
                    },
                    {
                        id: 19087,
                        amount: 2,
                        unit: 'servings',
                        name: 'chocolate vanilla latte',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/white-chocolate.jpg',
                    },
                ],
                usedIngredients: [
                    {
                        id: 9003,
                        amount: 2,
                        unit: 'servings',
                        name: 'cranberry apple smoothie',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/apple.jpg',
                    },
                    {
                        id: 1059003,
                        amount: 2,
                        unit: 'servings',
                        name: 'delicious apple pie smoothie',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/red-delicious-apples.png',
                    },
                ],
            },
            {
                id: 651701,
                title: 'Mexican Spiced Bahn Mi (Vietnamese Sandwiches)',
                image: 'https://spoonacular.com/recipeImages/651701-312x231.jpg',
                usedIngredientCount: 2,
                missedIngredientCount: 19,
                missedIngredients: [
                    {
                        id: 19912,
                        amount: 1,
                        unit: 'teaspoon',
                        name: 'agave nectar',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/agave.png',
                    },
                    {
                        id: 18033,
                        amount: 1,
                        unit: 'piece',
                        name: 'baguette',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/half-baguette.jpg',
                    },
                    {
                        id: 11080,
                        amount: 6,
                        unit: 'servings',
                        name: 'grate beet into a separate bowl',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/beets.jpg',
                    },
                    {
                        id: 99169,
                        amount: 6,
                        unit: 'servings',
                        name: 'refrigerate both bowls',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/bread-bowl.png',
                    },
                    {
                        id: 11124,
                        amount: 2,
                        unit: '',
                        name: 'carrots',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/sliced-carrot.png',
                    },
                    {
                        id: 11819,
                        amount: 1,
                        unit: '',
                        name: 'chile',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/red-chili.jpg',
                    },
                    {
                        id: 11165,
                        amount: 6,
                        unit: 'servings',
                        name: 'cilantro',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/cilantro.png',
                    },
                    {
                        id: 1002014,
                        amount: 1,
                        unit: 'tablespoon',
                        name: 'cumin',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/ground-cumin.jpg',
                    },
                    {
                        id: 11215,
                        amount: 1,
                        unit: 'clove',
                        name: 'garlic',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/garlic.png',
                    },
                    {
                        id: 98882,
                        amount: 6,
                        unit: 'servings',
                        name: 'assemble sandwiches',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/ice-cream-sandwich.jpg',
                    },
                    {
                        id: 9160,
                        amount: 0.5,
                        unit: '',
                        name: 'juice of lime',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/lime-juice.png',
                    },
                    {
                        id: 1009159,
                        amount: 1,
                        unit: '',
                        name: 'lime zest',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/zest-lime.jpg',
                    },
                    {
                        id: 4025,
                        amount: 6,
                        unit: 'servings',
                        name: 'take your baguette and add a little mayo',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/mayonnaise.png',
                    },
                    {
                        id: 1012034,
                        amount: 6,
                        unit: 'servings',
                        name: 'massage the rub into the steak',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/seasoning.png',
                    },
                    {
                        id: 23167,
                        amount: 0.75,
                        unit: 'pound',
                        name: 'skirt steak',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/skirt-steak.jpg',
                    },
                    {
                        id: 10011109,
                        amount: 6,
                        unit: 'servings',
                        name: 'make slaw',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/coleslaw.png',
                    },
                    {
                        id: 1012028,
                        amount: 1,
                        unit: 'tablespoon',
                        name: 'paprika',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/paprika.jpg',
                    },
                    {
                        id: 23232,
                        amount: 6,
                        unit: 'servings',
                        name: 'once steak is done',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/ribeye-raw.jpg',
                    },
                    {
                        id: 23584,
                        amount: 6,
                        unit: 'servings',
                        name: 'top',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/top-sirloin-steak.jpg',
                    },
                ],
                usedIngredients: [
                    {
                        id: 9003,
                        amount: 6,
                        unit: 'servings',
                        name: 'grate carrot & apple into a bowl',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/apple.jpg',
                    },
                    {
                        id: 1089003,
                        amount: 1,
                        unit: '',
                        name: 'granny smith apple',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/grannysmith-apple.png',
                    },
                ],
            },
            {
                id: 660261,
                title: 'Slow Cooked Applesauce',
                image: 'https://spoonacular.com/recipeImages/660261-312x231.jpg',
                usedIngredientCount: 1,
                missedIngredientCount: 2,
                missedIngredients: [
                    {
                        id: 2010,
                        amount: 0.5,
                        unit: 'teaspoon',
                        name: 'cinnamon',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/cinnamon.jpg',
                    },
                    {
                        id: 2025,
                        amount: 1,
                        unit: 'pinch',
                        name: 'nutmeg',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/ground-nutmeg.jpg',
                    },
                ],
                usedIngredients: [
                    {
                        id: 9003,
                        amount: 5,
                        unit: '',
                        name: 'apples from a local tree if possible',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/apple.jpg',
                    },
                ],
            },
            {
                id: 633547,
                title: 'Baked Cinnamon Apple Slices',
                image: 'https://spoonacular.com/recipeImages/633547-312x231.jpg',
                usedIngredientCount: 1,
                missedIngredientCount: 2,
                missedIngredients: [
                    {
                        id: 2010,
                        amount: 1.5,
                        unit: 'tablespoons',
                        name: 'cinnamon',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/cinnamon.jpg',
                    },
                    {
                        id: 9299,
                        amount: 0.5,
                        unit: 'cup',
                        name: 'raisins',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/raisins.jpg',
                    },
                ],
                usedIngredients: [
                    {
                        id: 9003,
                        amount: 4,
                        unit: '',
                        name: 'apples and - whatever type of apples i have in my refrigerator',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/apple.jpg',
                    },
                ],
            },
            {
                id: 716433,
                title: 'Easiest Breakfast Ever: Sunny Fruit Parfait',
                image: 'https://spoonacular.com/recipeImages/716433-312x231.jpg',
                usedIngredientCount: 1,
                missedIngredientCount: 3,
                missedIngredients: [
                    {
                        id: 9299,
                        amount: 1,
                        unit: 'serving',
                        name: 'raisins',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/raisins.jpg',
                    },
                    {
                        id: 12036,
                        amount: 1,
                        unit: 'serving',
                        name: 'sunflower seeds',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/sunflower-seeds.jpg',
                    },
                    {
                        id: 1001116,
                        amount: 1,
                        unit: 'serving',
                        name: 'yogurt',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/plain-yogurt.jpg',
                    },
                ],
                usedIngredients: [
                    {
                        id: 9003,
                        amount: 1,
                        unit: 'serving',
                        name: 'apple',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/apple.jpg',
                    },
                ],
            },
            {
                id: 658674,
                title: 'Roasted Sunchoke, Apple, and Onion Soup',
                image: 'https://spoonacular.com/recipeImages/658674-312x231.jpg',
                usedIngredientCount: 1,
                missedIngredientCount: 3,
                missedIngredients: [
                    {
                        id: 11226,
                        amount: 1.5,
                        unit: 'pounds',
                        name: 'sunchokes',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/jerusalem-artichoke.png',
                    },
                    {
                        id: 11294,
                        amount: 0.5,
                        unit: '',
                        name: 'onion',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/sweet-onion.png',
                    },
                    {
                        id: 6615,
                        amount: 12,
                        unit: 'servings',
                        name: 'vegetable stock',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/chicken-broth.png',
                    },
                ],
                usedIngredients: [
                    {
                        id: 9003,
                        amount: 1,
                        unit: '',
                        name: 'apple',
                        image: 'https://spoonacular.com/cdn/ingredients_100x100/apple.jpg',
                    },
                ],
            },
        ],
        total: 100,
        page: 1,
        size: 10,
        next: '/recipes/available?ingredients=apple&page=2&size=10',
        previous: null,
        first: null,
        last: '/recipes/available?ingredients=apple&page=10&size=10',
    };

    const getRecipesByIngredients = async () => {
        setIsLoading(true);
        const recipes = await fetchRecipesByIngredients(storedIngredients);
        setRecipes(recipes.results);
        setIsLoading(false);
    };

    useEffect(() => {
        if (storedIngredients.length) {
            getRecipesByIngredients();
        }
    }, [storedIngredients]);

    return (
        <MainLayout>
            <Recipes
                previos={mockup.previous}
                next={mockup.next}
                recipes={recipes}
                isLoading={isLoading}
            />
        </MainLayout>
    );
};

export default Home;
