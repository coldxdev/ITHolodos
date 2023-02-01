"""File introduce helpers for working with Spoonacular API"""


from typing import List, Dict

import requests
from loguru import logger

from pydantic.types import Json

from .local_settings import SPOONCULAR_KEY


def get_list_ingredients(name: str) -> List:
    """
    Returns list of ingredients founded by name
    :param name: Name(part of the name) ingredient
    :return: List
    """
    response_json = _request_ingredient_by_name_api(name)
    list_ingredients = []
    if response_json.get("totalResults") > 0:
        for ingredient in response_json.get("results"):
            ingredient["image"] = _update_img_link(ingredient.get("image"))
            list_ingredients.append(ingredient)
    return list_ingredients


def get_ingredient_by_id(id: int) -> Dict:
    """
    Returns Dict of ingredient information founded by id
    :param id: Ingredient id
    :return: Dict
    """
    response_json = _request_ingredient_information_by_id_api(id)
    filter_keys = ['id', 'name', 'possibleUnits',
                   'categoryPath', 'image']
    ingredient = {key: response_json[key] for key in filter_keys}
    ingredient["image"] = _update_img_link(ingredient.get("image"))
    return ingredient


def _request_ingredient_information_by_id_api(id: int) -> Json:
    """
    Returns json of ingredient information founded by id
    using SpoonacularAPI
    :param name: Id of ingredient
    :return: Json
    """
    try:
        response = requests.get(
            f"https://api.spoonacular.com/food/"
            f"ingredients/{id}/information"
            f"?apiKey={SPOONCULAR_KEY}"
        )
        return response.json()
    except Exception as ex:
        logger.warning(ex)


def _request_ingredient_by_name_api(name: str) -> Json:
    """
    Returns json list founded ingredients by name
    using SpoonacularAPI
    :param name: Name(part of the name) ingredient
    :return: Json
    """
    try:
        response = requests.get(
            f"https://api.spoonacular.com/food/"
            f"ingredients/search?query={name}"
            f"&number=5&apiKey={SPOONCULAR_KEY}",
        )
        return response.json()
    except Exception as ex:
        logger.warning(ex)


def _update_img_link(img_name: str) -> str:
    """
    Updates image link by image name
    :param img_name: Image name
    :return: Image url
    """
    _img_link = "https://spoonacular.com/cdn/ingredients_500x500/{img_name}"
    return _img_link.format(img_name=img_name)
