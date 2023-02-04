"""Introduce recipe routers"""
from fastapi import APIRouter, Request
from fastapi_pagination import paginate, add_pagination

from ..services.recipes_service import (
    get_all_available_recipes,
    get_recipe_info,
)
from ..models.page import Page

router = APIRouter(
    prefix="/recipes",
    tags=["recipes"],
)


@router.get("/available",
            response_model=Page[dict])
def get_available_recipes(
        ingredients: str,
        request: Request,
):
    """
    Returns paginated list of found recipes, for example:
    `
        {

        "results": [

            {
                "id": 656729,
                "title": "Pork Chop with Honey, Mustard and Apples",
                "image": "https://spoonacular.com/recipeImages/656729-312x231.jpg",
                "usedIngredientCount": 1,
                "missedIngredientCount": 1,
                "missedIngredients": [

                    {
                        "id": 1032046,
                        "amount": 3,
                        "unit": "tsps",
                        "name": "dijon mustard",
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/dijon-mustard.jpg"
                    }
                ],
                "usedIngredients": [

                    {
                        "id": 9003,
                        "amount": 3,
                        "unit": "",
                        "name": "apples",
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/apple.jpg"
                    }]

            },
            {
                "id": 632480,
                "title": "Apple Brown Butter \"Doughnut\" Cakes With Cinnamon and Honey",
                "image": "https://spoonacular.com/recipeImages/632480-312x231.jpg",
                "usedIngredientCount": 1,
                "missedIngredientCount": 1,
                "missedIngredients": [
                    {
                        "id": 18369,
                        "amount": 1.5,
                        "unit": "teaspoons",
                        "name": "baking powder",
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/white-powder.jpg"
                    }
                ],
                "usedIngredients": [
                    {
                        "id": 9003,
                        "amount": 10,
                        "unit": "cups",
                        "name": "apples",
                        "image": "https://spoonacular.com/cdn/ingredients_100x100/apple.jpg"
                    }
                ]
            }
        ],
        "total": 100,
        "page": 4,
        "size": 2,
        "next": "/recipes/available?ingredients=apples%2Choney&page=5&size=2",
        "previous": "/recipes/available?ingredients=apples%2Choney&page=3&size=2",
        "first": "/recipes/available?ingredients=apples%2Choney&page=1&size=2",
        "last": "/recipes/available?ingredients=apples%2Choney&page=50&size=2"

        }`
    \f
    :param request: Request for taking params
    :param ingredients: Ingredients
    :return: List of recipes
    """
    return paginate(
        get_all_available_recipes(ingredients),
        additional_data={'request': request}
    )


@router.get("/detail/{recipe_id}")
def get_detail_recipe_info(
    recipe_id: int
):
    """
    Returns detail info of recipe
    with instruction by id
    for example:
    `

        {
            "id": 716276,
            "title": "Doughnuts",
            "image": "https://spoonacular.com/recipeImages/716276-556x370.jpg",
            "extendedIngredients": [
                {
                  "id": 20081,
                  "amount": 1.5,
                  "unit": "cups",
                  "name": "flour",
                  "image": "https://spoonacular.com/cdn/ingredients_100x100/flour.png"
                },
                {
                  "id": 19296,
                  "amount": 30,
                  "unit": "ml",
                  "name": "honey",
                  "image": "https://spoonacular.com/cdn/ingredients_100x100/honey.png"
                },
            ],
            "instruction": [
                {
                  "number": 1,
                  "step": "In a bowl mix the water with the yeast and honey"
                },
                {
                  "number": 2,
                  "step": "Heat up your oil and fry the doughnuts"
                }
            ],
        }
    `
    \f
    :param recipe_id: int
    :return: Json
    """
    return get_recipe_info(recipe_id)


add_pagination(router)

