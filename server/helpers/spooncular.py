"""Spooncular API services"""

from typing import Optional

import requests
from loguru import logger

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


def check_404_message_json(obj: Json) -> bool:
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


def update_img_link(img_name: str) -> str:
    """
    Updates image link by image name
    :param img_name: Image name
    :return: Image url
    """
    _img_link = "https://spoonacular.com/cdn/ingredients_500x500/{img_name}"
    return _img_link.format(img_name=img_name)
