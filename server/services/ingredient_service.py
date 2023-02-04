"""File introduce helpers for ingredient part of Spoonacular API"""


from typing import List

from fastapi import (
    status,
    HTTPException,
)

from ..helpers.spooncular import (
    update_img_link,
    request_ingredient_by_name_api,
    request_ingredient_autocomplete,
    request_ingredient_info_by_id_api,
)


def get_list_ingredients(name: str) -> List:
    """
    Returns list of ingredients founded by name
    :param name: Name(part of the name) ingredient
    :return: List
    """
    list_ingredients = []
    if response_json := request_ingredient_by_name_api(name):
        if response_json.get("totalResults") > 0:
            for ingredient in response_json.get("results"):
                ingredient["image"] = update_img_link(ingredient.get("image"))
                list_ingredients.append(ingredient)
    return list_ingredients


def get_ingredient_information(pk: int) -> dict:
    """
    Returns Dict of ingredient information founded by id
    :param pk: Ingredient id
    :return: Dict
    """
    if response_json := request_ingredient_info_by_id_api(pk):
        filter_keys = ["id", "name", "possibleUnits", "categoryPath", "image"]
        ingredient = {key: response_json[key] for key in filter_keys}
        ingredient["image"] = update_img_link(ingredient.get("image"))
        return ingredient
    raise HTTPException(status.HTTP_404_NOT_FOUND)


def get_ingredients_auto_complete(name: str, number: int) -> List:
    """
    Returns filtered list of ingredients founded by name
    :param name: string
    :param number: int
    :return: List
    """
    list_ingredients = []
    if response_json := request_ingredient_autocomplete(name, number):
        for ingredient in response_json:
            ingredient["image"] = update_img_link(ingredient.get("image"))
            list_ingredients.append(ingredient)
    return list_ingredients
