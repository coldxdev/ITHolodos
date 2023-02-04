"""File introduce helpers for recipe part of Spoonacular API"""

from typing import List, Optional

import requests
from loguru import logger
from pydantic.types import Json
from fastapi import (
    HTTPException,
    status,
)

from ..config import SPOONCULAR_KEY
from ..local_settings import SPOONCULAR_KEY
from ..services.helpers import (
    filter_keys,
    check_404_message_json,
    is_url,
    update_img_link,
)


def get_recipe_info(recipe_id: int) -> dict:
    """
    Returns detail info of recipe with instruction
    :param recipe_id: int id of recipe
    :return: dict
    """
    response_json = _request_recipe_info_by_id(recipe_id)
    if response_json is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND)

    keys_for_filtering = ["id", "title", "image",
                          "extendedIngredients"]
    recipe = filter_keys(keys_for_filtering, response_json)
    recipe["extendedIngredients"] = _filter_recipe_ingredient_keys(recipe["extendedIngredients"])

    instruction = get_recipe_instruction(recipe_id)
    recipe["instruction"] = instruction

    return recipe


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


def get_recipe_instruction(recipe_id: int) -> List:
    """
    Returns parsed instruction for certain recipe
    by id
    :param recipe_id: int id of recipe
    :return: Json
    """
    response_json = _request_recipe_instruction_by_id(recipe_id)
    if response_json is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND)

    instruction = _parse_instruction(response_json)

    return instruction


def _request_recipe_info_by_id(recipe_id: int) -> Optional[Json]:
    """
    Returns json of detail info for recipe by id
    using SpoonacularAPI
    :param recipe_id: int id of recipe
    :return: Json or None if recipe doesn't exist
    """
    try:
        response = requests.get(
            "https://api.spoonacular.com/recipes"
            f"/{recipe_id}/information"
            "?includeNutrition=false"
            f"&number=100&apiKey={SPOONCULAR_KEY}"
        )

        if check_404_message_json(response):
            return None
        else:
            return response.json()

    except Exception as ex:
        logger.warning(ex)


def _request_recipe_instruction_by_id(recipe_id: int) -> Optional[Json]:
    """
    Returns json of instruction of recipe by id
    using SpoonacularAPI
    :param recipe_id: int id of recipe
    :return: Json
    """
    try:
        response = requests.get(
            "https://api.spoonacular.com/recipes"
            f"/{recipe_id}/analyzedInstructions"
            f"?apiKey={SPOONCULAR_KEY}"
        )

        if check_404_message_json(response):
            return None
        else:
            return response.json()

    except Exception as ex:
        logger.warning(ex)


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
            "&ranking=1"
            f"&number=100&apiKey={SPOONCULAR_KEY}"
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
    keys_for_filtering = ["id", "title", "image",
                          "usedIngredientCount", "missedIngredientCount",
                          "missedIngredients", "usedIngredients"]
    available_recipe = filter_keys(keys_for_filtering, recipe)

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
    keys_for_filtering = ["id", "amount", "unit",
                          "name", "image"]
    filtered_ingredients = []
    for ingredient in ingredients:
        if not is_url(ingredient["image"]):
            ingredient["image"] = update_img_link(
                ingredient.get("image"),
                "https://spoonacular.com/cdn/ingredients_100x100/{img_name}"
            )
        filtered_ingredients.append(filter_keys(keys_for_filtering, ingredient))

    return filtered_ingredients


def _parse_instruction(instruction: Json) -> List:
    """
    Parses instruction json list for
    numbers and steps for cooking
    :param instruction: dict
    :return: List of steps
    """
    parsed_instruction = []
    step_counter = 1
    for part in instruction:
        for step in part["steps"]:
            parsed_instruction.append({
                "number": step_counter,
                "step": step.get("step")
            })
            step_counter += 1
    return parsed_instruction
