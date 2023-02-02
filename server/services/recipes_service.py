"""File introduce helpers for recipe part of Spoonacular API"""

from typing import List

import requests
from loguru import logger
from pydantic.types import Json

from ..local_settings import SPOONCULAR_KEY


def get_all_available_recipes(ingredients: str) -> List:
    """
    Returns list of recipes which we are able to cook
    by ingredient which we have
    :param ingredients: String of ingredients
                        example: "boysenberries,honey,white wine vinegar"
    :return: List
    """
    response_json = _request_available_recipes_by_ingredients(ingredients)
    available_recipes = []
    for recipe in response_json:
        available_recipes.append(_filter_available_recipe_keys(recipe))
    return available_recipes


def _request_available_recipes_by_ingredients(ingredients: str) -> Json:
    """
    Returns json list founded recipes by ingredients
    using SpoonacularAPI
    :param ingredients: String of ingredients
                        example: "boysenberries,honey,white wine vinegar"
    :return: Json
    """
    try:
        response = requests.get(
            "https://api.spoonacular.com/"
            "recipes/findByIngredients"
            f"?ingredients={ingredients}"
            f"&number=5&apiKey={SPOONCULAR_KEY}"
        )

        return response.json()
    except Exception as ex:
        logger.warning(ex)


def _filter_available_recipe_keys(recipe: dict) -> dict:
    """
    Removes keys from recipe which we don`t need
    :param recipe: dict which we want to update
    :return: filtered dict
    """
    filter_keys = ["id", "title", "image",
                   "usedIngredientCount", "missedIngredientCount",
                   "missedIngredients", "usedIngredients"]
    available_recipe = {key: recipe[key] for key in filter_keys}

    available_recipe["missedIngredients"] = _filter_recipe_ingredient_keys(
        available_recipe["missedIngredients"]
    )
    available_recipe["usedIngredients"] = _filter_recipe_ingredient_keys(
        available_recipe["usedIngredients"]
    )

    return available_recipe


def _filter_recipe_ingredient_keys(ingredients: List) -> List:
    """
    Removes keys of ingredient from ingredients list
    which we don`t need
    :param ingredients: List of ingredients
    :return: filtered list of dicts
    """
    filter_keys = ["id", "amount", "unit",
                   "name", "image"]
    filtered_ingredients = []
    for ingredient in ingredients:
        filtered_ingredients.append({key: ingredient[key] for key in filter_keys})

    return filtered_ingredients
