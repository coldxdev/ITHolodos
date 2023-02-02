"""File introduce helpers for ingredient part of Spoonacular API"""


from typing import List, Optional

import requests
from loguru import logger

from pydantic.types import Json
from fastapi import (
    HTTPException,
    status,
)

from ..local_settings import SPOONCULAR_KEY
from ..models.spoonacular_api import Message404JsonSchema


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


def get_ingredient_information(pk: int) -> dict:
    """
    Returns Dict of ingredient information founded by id
    :param pk: Ingredient id
    :return: Dict
    """
    response_json = _request_ingredient_info_by_id_api(pk)
    if response_json is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND)

    filter_keys = ["id", "name", "possibleUnits",
                   "categoryPath", "image"]
    ingredient = {key: response_json[key] for key in filter_keys}
    ingredient["image"] = _update_img_link(ingredient.get("image"))
    return ingredient


def get_ingredients_auto_complete(
        name: str,
        number: int
) -> List:
    """
    Returns filtered list of ingredients founded by name
    :param name: string
    :param number: int
    :return: List
    """
    response_json = _request_ingredient_autocomplete_by_name(name,
                                                             number)
    list_ingredients = []
    for ingredient in response_json:
        ingredient["image"] = _update_img_link(ingredient.get("image"))
        list_ingredients.append(ingredient)

    return list_ingredients


def _request_ingredient_autocomplete_by_name(
        name: str,
        number: int
) -> Json:
    """
    Returns Json list of ingredients founded by name
    using autocomplete with SpoonacularAPI
    :param name: string name of ingredient
    :param number: int number of ingredients
    :return: Json
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


def _request_ingredient_info_by_id_api(pk: int) -> Optional[Json]:
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
        if _check_404_message_json(response):
            return None
        else:
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
            "https://api.spoonacular.com/food/"
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


def _check_404_message_json(obj: Json) -> bool:
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
