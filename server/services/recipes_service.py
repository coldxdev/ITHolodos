"""File introduce helpers for recipe part of Spoonacular API"""

from typing import List, Optional

from fastapi import (
    HTTPException,
    status,
)

from ..helpers.spooncular import (
    filter_keys,
    request_recipe_info_by_id,
    request_recipe_instruction_by_id,
    request_available_recipes_by_ingredients,
    parse_instruction,
    filter_available_recipe_keys,
    filter_recipe_ingredient_keys,
    request_random_recipes,
)


def get_recipe_info(recipe_id: int) -> dict:
    """
    Returns detail info of recipe with instruction
    :param recipe_id: int id of recipe
    :return: dict
    """
    if response_json := request_recipe_info_by_id(recipe_id):
        keys_for_filtering = ["id", "title", "image",
                              "extendedIngredients"]
        recipe = filter_keys(keys_for_filtering, response_json)
        recipe["extendedIngredients"] = filter_recipe_ingredient_keys(recipe["extendedIngredients"])

        instruction = get_recipe_instruction(recipe_id)
        recipe["instruction"] = instruction

        return recipe

    else:
        raise HTTPException(status.HTTP_404_NOT_FOUND)


def get_all_available_recipes(ingredients: str) -> List:
    """
    Returns list of recipes which we are able to cook
    by ingredient which we have
    :param ingredients: String of ingredients
                        example: "boysenberries,honey,white wine vinegar"
    :return: List
    """
    available_recipes = []
    if response_json := request_available_recipes_by_ingredients(ingredients):
        for recipe in response_json:
            available_recipes.append(filter_available_recipe_keys(recipe))
    return available_recipes


def get_recipe_instruction(recipe_id: int) -> List:
    """
    Returns parsed instruction for certain recipe
    by id
    :param recipe_id: int id of recipe
    :return: Json
    """
    if response_json := request_recipe_instruction_by_id(recipe_id):
        instruction = parse_instruction(response_json)
        return instruction

    else:
        raise HTTPException(status.HTTP_404_NOT_FOUND)


def get_recipes_random(number: int) -> List:
    """
    Returns List of random filtered recipes
    :param number: number of random recipes
    :return: List of random recipes
    """
    recipes = []
    keys_for_filtering = ["id", "title", "image",
                          "extendedIngredients"]
    if response_json := request_random_recipes(number):
        for recipe in response_json:
            filtered_recipe = filter_keys(keys_for_filtering, recipe)
            filtered_recipe["extendedIngredients"] = filter_recipe_ingredient_keys(recipe["extendedIngredients"])
            recipes.append(filtered_recipe)

    return recipes

