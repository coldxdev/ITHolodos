"""Introduce ingredient routers"""
from typing import List

from fastapi import APIRouter

from ..spoonacular_services import (
    get_list_ingredients,
    get_ingredient_information,
)

from ..models.ingredient import (
    IngredientExtendedInfo,
    IngredientBaseInfo,
)

router = APIRouter(
    prefix='/ingredients',
    tags=['ingredients'],
)


@router.get("/",
            response_model=List[IngredientBaseInfo])
def get_ingredients(
        key_word: str
):
    """
    Returns list of found ingredients, for example:
    `[
      {
        "id": 9003,
        "name": "apple",
        "image": "https://spoonacular.com/cdn/ingredients_500x500/apple.jpg"
      },
      {
        "id": 9019,
        "name": "applesauce",
        "image": "https://spoonacular.com/cdn/ingredients_500x500/applesauce.png"
      },
    ]`
    \f
    :param key_word: Key ingredient word
    :return: List found ingredients
    """
    return get_list_ingredients(key_word)


@router.get("/{ingredient_id}",
            response_model=IngredientExtendedInfo)
def get_ingredient_info(
        ingredient_id: int
):
    """
    Returns Json of ingredient with information:
    `{
        "id": 9266,
        "name": "pineapples",
        "possibleUnits":
            [
              "piece",
              "slice",
              "fruit",
              "g",
              "oz",
              "cup",
              "serving"
            ],
        "categoryPath":
            [
                "tropical fruit",
                "fruit"
            ],
        "image": "https://spoonacular.com/cdn/ingredients_500x500/pineapple.jpg"
    }`
    \f
    :param ingredient_id: Ingredient id
    :return: Json with detailed info of our ingredient
    """
    return get_ingredient_information(ingredient_id)
