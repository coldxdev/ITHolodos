"""Spooncular API services"""

from typing import Optional, List, Union
from urllib.parse import urlparse

import requests
from loguru import logger
from fastapi import (
    HTTPException,
    status,
)
from pydantic.types import Json

from ..config import SPOONCULAR_KEY
from ..models.spoonacular_api import Message404JsonSchema


def request_ingredient_autocomplete(
        name: str,
        number: int,
) -> Optional[Json]:
    """
    Returns Json list of ingredients founded by name
    using autocomplete with SpoonacularAPI
    :param name: string name of ingredient
    :param number: int number of ingredients
    :return: Json or None
    """
    try:
        response = requests.get(
            "https://api.spoonacular.com/food"
            "/ingredients/autocomplete"
            f"?query={name}&number={number}"
            f"&apiKey={SPOONCULAR_KEY}",
        )
        return response.json()
    except Exception as ex:
        logger.warning(ex)


def request_ingredient_info_by_id_api(pk: int) -> Optional[Json]:
    """
    Returns json of ingredient information founded by id
    using SpoonacularAPI
    :param pk: id of ingredient
    :return: Json or None if Json is not valid
    """
    try:
        response = requests.get(
            "https://api.spoonacular.com/food/"
            f"ingredients/{pk}/information"
            f"?apiKey={SPOONCULAR_KEY}"
        )
        if check_404_message_json(response):
            return None
        else:
            return response.json()
    except Exception as ex:
        logger.warning(ex)


def request_ingredient_by_name_api(name: str) -> Json:
    """
    Returns json list founded ingredients by name
    using SpoonacularAPI
    :param name: Name(part of the name) ingredient
    :return: Json
    """
    try:
        response = requests.get(
            "https://api.spoonacular.com/food/"
            f"ingredients/search?query={name}"
            f"&number=5&apiKey={SPOONCULAR_KEY}",
        )
        return response.json()
    except Exception as ex:
        logger.warning(ex)


def request_recipe_info_by_id(recipe_id: int) -> Optional[Json]:
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


def request_recipe_instruction_by_id(recipe_id: int) -> Optional[Json]:
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
            raise HTTPException(status.HTTP_404_NOT_FOUND)
        else:
            return response.json()

    except Exception as ex:
        logger.warning(ex)


def request_available_recipes_by_ingredients(ingredients: str) -> Json:
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

        if check_404_message_json(response):
            return None
        else:
            return response.json()

    except Exception as ex:
        logger.warning(ex)


def request_random_recipes(number: int) -> Json:
    """
    Returns json list founded random recipes
    using SpoonacularAPI
    :param number: number of recipes
    :return: Json
    """
    try:
        response = requests.get(
            "https://api.spoonacular.com/"
            "recipes/random"
            f"?number={number}"
            f"&apiKey={SPOONCULAR_KEY}",
        )
        return response.json().get("recipes")
    except Exception as ex:
        logger.warning(ex)


def check_404_message_json(obj: Union[Json, List]) -> bool:
    """
    Checks if a JSON is a valid Message404JsonSchema
    :param obj: Json which we want to check
    :return: bool
    """
    try:
        Message404JsonSchema.parse_obj(obj.json())
        return True
    except Exception as ex:
        logger.debug(ex)
        return False


def update_img_link(img_name: str,
                    img_link_pattern: str) -> str:
    """
    Updates image link by image
    name and img_link_pattern
    :param img_link_pattern: pattern for url
    :param img_name: Image name
    :return: Image url
    """
    return img_link_pattern.format(img_name=img_name)


def filter_keys(keys: List[str], target: Json) -> dict:
    """
    Filters dict from unnecessary keys
    :param keys: Listr[str] keys which we want to remain
    :param target:
    :return:
    """
    result = {}
    for key in keys:
        try:
            result[key] = target[key]
        except Exception as ex:
            result[key] = None
            logger.debug(ex)

    return result


def is_url(url: str) -> bool:
    """
    Checks if a string is valid url
    :param url: str
    :return: bool
    """
    try:
        result = urlparse(url)
        return all([result.scheme, result.netloc])
    except ValueError:
        return False


def parse_instruction(instruction: Json) -> List:
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


def filter_available_recipe_keys(recipe: dict) -> dict:
    """
    Removes keys from recipe which we don`t need
    :param recipe: dict which we want to update
    :return: filtered dict
    """
    keys_for_filtering = ["id", "title", "image",
                          "usedIngredientCount", "missedIngredientCount",
                          "missedIngredients", "usedIngredients"]
    available_recipe = filter_keys(keys_for_filtering, recipe)

    available_recipe["missedIngredients"] = filter_recipe_ingredient_keys(
        available_recipe["missedIngredients"]
    )
    available_recipe["usedIngredients"] = filter_recipe_ingredient_keys(
        available_recipe["usedIngredients"]
    )

    return available_recipe


def filter_recipe_ingredient_keys(ingredients: List) -> List:
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
        filtered_ingredient = filter_keys(keys_for_filtering, ingredient)
        conditions = [not is_url(filtered_ingredient["image"]),
                      filtered_ingredient["image"] is not None]
        if all(conditions):
            filtered_ingredient["image"] = update_img_link(
                filtered_ingredient.get("image"),
                "https://spoonacular.com/cdn/ingredients_100x100/{img_name}"
            )
        filtered_ingredients.append(filtered_ingredient)

    return filtered_ingredients
