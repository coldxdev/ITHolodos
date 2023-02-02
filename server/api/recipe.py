"""Introduce recipe routers"""
from fastapi import APIRouter

from ..services.recipes_service import get_all_available_recipes

router = APIRouter(
    prefix="/recipes",
    tags=["recipes"],
)


@router.get("/available")
def get_available_recipes(
        ingredients: str
):
    """
    Returns list of found recipes, for example:
   `[{
      "id": 673463,
      "title": "Slow Cooker Apple Pork Tenderloin",
      "image": "https://spoonacular.com/recipeImages/673463-312x231.jpg",
      "usedIngredientCount": 1,
      "missedIngredientCount": 0,
      "missedIngredients": [],
      "usedIngredients": [
       {
         "id": 1069003,
         "amount": 2,
         "unit": "",
         "name": "apples",
         "image": "https://spoonacular.com/cdn/ingredients_100x100/grannysmith-apple.png"
       }]
      },
     {
       "id": 633547,
       "title": "Baked Cinnamon Apple Slices",
       "image": "https://spoonacular.com/recipeImages/633547-312x231.jpg",
       "usedIngredientCount": 1,
       "missedIngredientCount": 1,
       "missedIngredients": [
        {
         "id": 2010,
         "amount": 1.5,
         "unit": "tablespoons",
         "name": "cinnamon",
         "image": "https://spoonacular.com/cdn/ingredients_100x100/cinnamon.jpg"
        }],
       "usedIngredients": [
        {
         "id": 9003,
         "amount": 4,
         "unit": "",
         "name": "apples and - whatever type of apples i have in my refrigerator",
         "image": "https://spoonacular.com/cdn/ingredients_100x100/apple.jpg"
        }]
    }]`
    \f
    :param ingredients: Ingredients
    :return: List of recipes
    """
    return get_all_available_recipes(ingredients)
