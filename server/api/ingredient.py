"""Introduce ingredient routers"""

from fastapi import APIRouter

from ..spoonacular_services import get_list_ingredients

router = APIRouter(
    prefix='/ingredients',
    tags=['ingredients'],
)


@router.get("/")
def get_ingredients(key_word: str):
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
